import type { Attempt, CardState, Confidence, ConceptState } from '../data/types';
import { CONCEPT_MAP, PAGE_MAP } from '../data/course';
import { clamp, DAY, MIN, now } from '../lib/utils';

/* ---------------- Concept mastery model ----------------
   mastery ∈ [0,1] updated as a difficulty- and confidence-weighted moving model.
   Spacing: correct answers grow the review interval; errors shrink it.
   Confidence matrix feeds calibration + "dangerous misconception" detection. */

export function freshConceptState(conceptId: string): ConceptState {
  return {
    conceptId, mastery: 0, attempts: 0, correct: 0, streak: 0,
    lastSeen: 0, due: 0, intervalDays: 0, ease: 2.3,
    confMatrix: { cc: 0, cu: 0, wu: 0, wc: 0 },
  };
}

export function applyAttempt(s: ConceptState, a: Pick<Attempt, 'correct' | 'difficulty' | 'confidence' | 'hintsUsed'>): ConceptState {
  const st = { ...s, confMatrix: { ...s.confMatrix } };
  st.attempts += 1;
  st.lastSeen = now();

  const confident = a.confidence === 'sure' || a.confidence === 'certain';
  if (a.correct && confident) st.confMatrix.cc += 1;
  else if (a.correct && !confident) st.confMatrix.cu += 1;
  else if (!a.correct && confident) st.confMatrix.wc += 1;
  else st.confMatrix.wu += 1;

  // difficulty weight: harder questions move mastery more when right, less when wrong
  const dw = 0.6 + 0.16 * a.difficulty; // 0.6 .. 1.4
  const hintPenalty = Math.min(0.5, a.hintsUsed * 0.18);

  if (a.correct) {
    st.correct += 1;
    st.streak = Math.max(1, st.streak + 1);
    const gain = 0.16 * dw * (1 - hintPenalty) * (a.confidence === 'certain' ? 1.1 : 1);
    st.mastery = clamp(st.mastery + gain * (1 - st.mastery) * 1.6, 0, 1);
    // spacing: expand interval
    st.ease = clamp(st.ease + (confident ? 0.06 : 0.02), 1.3, 2.8);
    st.intervalDays = st.intervalDays <= 0 ? 1 : st.intervalDays * st.ease * (1 - hintPenalty * 0.5);
    st.intervalDays = Math.min(st.intervalDays, 45);
    st.due = now() + st.intervalDays * DAY;
  } else {
    st.streak = Math.min(-1, st.streak - 1);
    // wrong+confident (dangerous misconception) hits mastery hardest
    const loss = (confident ? 0.32 : 0.2) * dw;
    st.mastery = clamp(st.mastery - loss * (0.3 + st.mastery), 0, 1);
    st.ease = clamp(st.ease - 0.18, 1.3, 2.8);
    st.intervalDays = 0;
    st.due = now() + 10 * MIN; // ask again within the session
  }
  return st;
}

/** Retention decay: mastery displayed/used decays with time since last seen. */
export function retainedMastery(s: ConceptState): number {
  if (!s.lastSeen) return 0;
  const days = (now() - s.lastSeen) / DAY;
  const halfLife = 4 + 26 * s.mastery + 3 * Math.max(0, s.streak); // strong knowledge decays slower
  return s.mastery * Math.exp(-Math.LN2 * Math.max(0, days - 0.5) / halfLife);
}

export type MasteryBand = 0 | 1 | 2 | 3 | 4; // unseen, learning, understood, mastered, retained

export function masteryBand(s: ConceptState | undefined): MasteryBand {
  if (!s || s.attempts === 0) return 0;
  const r = retainedMastery(s);
  if (r < 0.3) return 1;
  if (r < 0.6) return 2;
  if (r < 0.85) return 3;
  // retained long-term: mastered AND interval grown past a week
  return s.intervalDays >= 7 ? 4 : 3;
}

export const BAND_LABEL = ['unseen', 'learning', 'understood', 'mastered', 'retained'] as const;

/** Page mastery = weighted mastery of concepts on the page. */
export function pageMastery(page: number, states: Record<string, ConceptState>): MasteryBand {
  const info = PAGE_MAP[page - 1];
  if (!info || info.concepts.length === 0) return 0;
  const bands: number[] = info.concepts.map(id => masteryBand(states[id]));
  if (bands.every(b => b === 0)) return 0;
  return Math.round(bands.reduce((a, b) => a + b, 0) / bands.length) as MasteryBand;
}

/** Prerequisite gap: lowest-mastery prerequisite that is dragging this concept down. */
export function weakestPrereq(conceptId: string, states: Record<string, ConceptState>): string | null {
  const c = CONCEPT_MAP[conceptId];
  if (!c) return null;
  let worst: string | null = null;
  let worstVal = 0.45; // only report genuinely weak prereqs
  for (const p of c.prereqs) {
    const v = states[p] ? retainedMastery(states[p]) : 0;
    if (v < worstVal) { worstVal = v; worst = p; }
  }
  return worst;
}

/* ---------------- Card scheduling (SM-2 flavoured) ---------------- */

export function freshCardState(cardId: string): CardState {
  return { cardId, due: 0, intervalDays: 0, ease: 2.5, reps: 0, lapses: 0, suspended: false };
}

export type Grade = 'again' | 'hard' | 'good' | 'easy';

export function gradeCard(s: CardState, g: Grade): CardState {
  const st = { ...s };
  st.reps += 1;
  if (g === 'again') {
    st.lapses += 1;
    st.ease = clamp(st.ease - 0.2, 1.3, 2.8);
    st.intervalDays = 0;
    st.due = now() + 10 * MIN;
    return st;
  }
  const mult = g === 'hard' ? 1.2 : g === 'good' ? st.ease : st.ease * 1.35;
  st.ease = clamp(st.ease + (g === 'hard' ? -0.15 : g === 'easy' ? 0.12 : 0), 1.3, 2.9);
  if (st.intervalDays <= 0) st.intervalDays = g === 'easy' ? 3 : 1;
  else st.intervalDays = Math.min(60, st.intervalDays * mult);
  st.due = now() + st.intervalDays * DAY;
  return st;
}

/* ---------------- Confidence calibration summary ---------------- */

export function calibration(states: Record<string, ConceptState>) {
  let cc = 0, cu = 0, wu = 0, wc = 0;
  for (const s of Object.values(states)) {
    cc += s.confMatrix.cc; cu += s.confMatrix.cu; wu += s.confMatrix.wu; wc += s.confMatrix.wc;
  }
  const total = cc + cu + wu + wc;
  return { cc, cu, wu, wc, total };
}

/** Concepts with wrong+confident answers — dangerous misconceptions first. */
export function dangerousConcepts(states: Record<string, ConceptState>): string[] {
  return Object.values(states)
    .filter(s => s.confMatrix.wc > 0)
    .sort((a, b) => b.confMatrix.wc - a.confMatrix.wc)
    .map(s => s.conceptId);
}

export function confidenceLabel(c: Confidence): string {
  return c === 'guess' ? 'Guessing' : c === 'fifty' ? '50/50' : c === 'sure' ? 'Pretty sure' : 'Certain';
}
