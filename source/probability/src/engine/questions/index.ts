import type { ConceptState, Difficulty, GeneratedQuestion, QuestionTemplate } from '../../data/types';
import { CONCEPT_MAP } from '../../data/course';
import { retainedMastery } from '../mastery';
import { GEN1 } from './gen1';
import { GEN2 } from './gen2';
import { METHOD_TEMPLATE } from './method';
import { PUZZLES } from './puzzles';

export const TEMPLATES: QuestionTemplate[] = [...GEN1, ...GEN2, ...PUZZLES, METHOD_TEMPLATE];
export const TEMPLATE_MAP: Record<string, QuestionTemplate> = Object.fromEntries(TEMPLATES.map(t => [t.id, t]));

/** Templates that can serve a concept (directly or via its chapter neighbours). */
export function templatesFor(conceptId: string): QuestionTemplate[] {
  const direct = TEMPLATES.filter(t => t.conceptId === conceptId);
  if (direct.length) return direct;
  // fall back to templates whose generated questions sometimes target this concept,
  // then to same-chapter templates
  const c = CONCEPT_MAP[conceptId];
  if (!c) return [];
  const related = TEMPLATES.filter(t => {
    const tc = CONCEPT_MAP[t.conceptId];
    return tc && tc.chapter === c.chapter;
  });
  return related;
}

/** Difficulty chosen from mastery: weak → easy; strong → push harder. */
export function adaptiveDifficulty(state: ConceptState | undefined, available: Difficulty[]): Difficulty {
  const m = state ? retainedMastery(state) : 0;
  const target = m < 0.2 ? 1 : m < 0.4 ? 2 : m < 0.65 ? 3 : m < 0.85 ? 4 : 5;
  // clamp to available
  const sorted = [...available].sort((a, b) => a - b);
  let best = sorted[0];
  for (const d of sorted) if (d <= target) best = d;
  return best;
}

let seedCounter = Math.floor(Math.random() * 1e9);

export function generateFor(conceptId: string, state?: ConceptState, forceDifficulty?: Difficulty, forceTemplate?: string): GeneratedQuestion | null {
  let pool = forceTemplate && TEMPLATE_MAP[forceTemplate] ? [TEMPLATE_MAP[forceTemplate]] : templatesFor(conceptId);
  if (!pool.length) return null;
  const t = pool[Math.floor(Math.random() * pool.length)];
  const d = forceDifficulty !== undefined
    ? (t.difficulties.includes(forceDifficulty) ? forceDifficulty : t.difficulties[Math.min(t.difficulties.length - 1, Math.max(0, t.difficulties.findIndex(x => x >= forceDifficulty)))] ?? t.difficulties[t.difficulties.length - 1])
    : adaptiveDifficulty(state, t.difficulties);
  const seed = seedCounter++ * 2654435761 % 2 ** 31;
  try {
    return t.generate(seed, (d ?? t.difficulties[0]) as Difficulty);
  } catch (e) {
    console.error('question generation failed', t.id, e);
    return null;
  }
}

/** Mutations (same idea new story / harder / easier). */
export function mutate(q: GeneratedQuestion, kind: 'story' | 'harder' | 'easier', state?: ConceptState): GeneratedQuestion | null {
  const t = TEMPLATE_MAP[q.templateId];
  if (!t) return null;
  if (kind === 'story') return generateFor(q.conceptId, state, q.difficulty, q.templateId);
  const ds = [...t.difficulties].sort((a, b) => a - b);
  const idx = ds.indexOf(q.difficulty);
  const next = kind === 'harder' ? ds[Math.min(ds.length - 1, idx + 1)] : ds[Math.max(0, idx - 1)];
  if (next === q.difficulty && kind === 'harder') {
    // escalate to a harder template in the same chapter if any
    const c = CONCEPT_MAP[q.conceptId];
    const alts = TEMPLATES.filter(x => CONCEPT_MAP[x.conceptId]?.chapter === c?.chapter && Math.max(...x.difficulties) > q.difficulty);
    if (alts.length) {
      const alt = alts[Math.floor(Math.random() * alts.length)];
      return generateFor(alt.conceptId, state, Math.max(...alt.difficulties) as Difficulty, alt.id);
    }
  }
  return generateFor(q.conceptId, state, next, q.templateId);
}

export function methodQuestion(): GeneratedQuestion {
  const seed = seedCounter++ * 40503 % 2 ** 31;
  return METHOD_TEMPLATE.generate(seed, 1);
}
