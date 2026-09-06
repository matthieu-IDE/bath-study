import type { ConceptState } from '../data/types';
import { CHAPTERS, CONCEPT_MAP, CONCEPTS } from '../data/course';
import { now } from '../lib/utils';
import { dangerousConcepts, retainedMastery } from './mastery';

/* Smart session planner: builds Today's Mission and timed sessions from
   dependencies, decay, weaknesses and available time. */

export interface MissionItem {
  id: string;
  icon: string;
  label: string;
  kind: 'recall' | 'learn' | 'practice' | 'mistake' | 'cards' | 'method' | 'lab';
  conceptId?: string;
  minutes: number;
  done: boolean;
}

/** Next unlearned concept whose prerequisites are all reasonably mastered. */
export function nextFrontier(states: Record<string, ConceptState>): string | null {
  for (const ch of CHAPTERS) {
    if (!ch.examinable) continue;
    for (const id of ch.conceptIds) {
      const s = states[id];
      const m = s ? retainedMastery(s) : 0;
      if (m < 0.55) {
        const c = CONCEPT_MAP[id];
        const ready = c.prereqs.every(p => (states[p] ? retainedMastery(states[p]) : 0) >= 0.35 || !CONCEPT_MAP[p]?.examinable);
        if (ready || c.prereqs.length === 0) return id;
      }
    }
  }
  // everything examinable strong → push non-examinable depth
  for (const ch of CHAPTERS.filter(c => !c.examinable)) {
    for (const id of ch.conceptIds) {
      if ((states[id] ? retainedMastery(states[id]) : 0) < 0.5) return id;
    }
  }
  return null;
}

/** Concepts due for review (decayed or scheduled), weakest-first. */
export function dueForReview(states: Record<string, ConceptState>, limit = 6): string[] {
  const t = now();
  return Object.values(states)
    .filter(s => s.attempts > 0 && (s.due <= t || retainedMastery(s) < 0.45))
    .sort((a, b) => retainedMastery(a) - retainedMastery(b))
    .slice(0, limit)
    .map(s => s.conceptId);
}

/** Top-3 weaknesses among seen examinable concepts. */
export function topWeaknesses(states: Record<string, ConceptState>): { conceptId: string; mastery: number }[] {
  return Object.values(states)
    .filter(s => s.attempts >= 2 && CONCEPT_MAP[s.conceptId]?.examinable)
    .map(s => ({ conceptId: s.conceptId, mastery: retainedMastery(s) }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 3);
}

/** Predicted-to-fade soon: decent mastery but decaying past threshold within ~2 days. */
export function fadingSoon(states: Record<string, ConceptState>, limit = 4): string[] {
  return Object.values(states)
    .filter(s => {
      if (s.attempts === 0 || s.mastery < 0.5) return false;
      const r = retainedMastery(s);
      return r < s.mastery * 0.72 && r > 0.25;
    })
    .sort((a, b) => retainedMastery(a) / a.mastery - retainedMastery(b) / b.mastery)
    .slice(0, limit)
    .map(s => s.conceptId);
}

export function buildMission(states: Record<string, ConceptState>, mistakesDue: number, cardsDue: number): MissionItem[] {
  const items: MissionItem[] = [];
  const due = dueForReview(states, 2);
  for (const id of due) {
    items.push({ id: `recall-${id}`, icon: 'refresh', label: `Recall: ${CONCEPT_MAP[id].title}`, kind: 'recall', conceptId: id, minutes: 3, done: false });
  }
  const frontier = nextFrontier(states);
  if (frontier) {
    const c = CONCEPT_MAP[frontier];
    items.push({ id: `learn-${frontier}`, icon: c.lab ? 'flask' : 'book', label: `${c.lab ? 'Interactive:' : 'Learn:'} ${c.title}`, kind: 'learn', conceptId: frontier, minutes: 8, done: false });
    items.push({ id: `practice-${frontier}`, icon: 'edit', label: `Practise: ${c.title}`, kind: 'practice', conceptId: frontier, minutes: 6, done: false });
  }
  const danger = dangerousConcepts(states)[0];
  if (danger && !items.some(i => i.conceptId === danger)) {
    items.push({ id: `danger-${danger}`, icon: 'alert', label: `Fix misconception: ${CONCEPT_MAP[danger].title}`, kind: 'practice', conceptId: danger, minutes: 5, done: false });
  }
  if (mistakesDue > 0) items.push({ id: 'mistakes', icon: 'tool', label: `Redo ${Math.min(mistakesDue, 2)} old mistake${mistakesDue > 1 ? 's' : ''}`, kind: 'mistake', minutes: 4, done: false });
  if (cardsDue > 0) items.push({ id: 'cards', icon: 'layers', label: `${Math.min(cardsDue, 6)} flashcards due`, kind: 'cards', minutes: 3, done: false });
  if (items.length < 5) items.push({ id: 'method', icon: 'compass', label: 'Method trainer: 3 quick rounds', kind: 'method', minutes: 3, done: false });
  return items.slice(0, 6);
}

export interface SessionPlan {
  minutes: number;
  steps: { icon: string; label: string; kind: MissionItem['kind']; conceptId?: string; minutes: number }[];
}

export function planSession(minutes: 10 | 25 | 45 | 90, states: Record<string, ConceptState>): SessionPlan {
  const steps: SessionPlan['steps'] = [];
  const due = dueForReview(states, 3);
  const frontier = nextFrontier(states);
  const weak = topWeaknesses(states);
  if (minutes >= 10) {
    if (due[0]) steps.push({ icon: 'refresh', label: `Warm-up recall: ${CONCEPT_MAP[due[0]].title}`, kind: 'recall', conceptId: due[0], minutes: 3 });
    if (frontier) steps.push({ icon: 'flask', label: `Learn visually: ${CONCEPT_MAP[frontier].title}`, kind: 'learn', conceptId: frontier, minutes: minutes >= 25 ? 7 : 4 });
    steps.push({ icon: 'edit', label: `Guided practice${frontier ? `: ${CONCEPT_MAP[frontier].title}` : ''}`, kind: 'practice', conceptId: frontier ?? undefined, minutes: minutes >= 25 ? 7 : 3 });
  }
  if (minutes >= 25) {
    const hard = weak[0]?.conceptId ?? frontier;
    if (hard) steps.push({ icon: 'target', label: `One harder question: ${CONCEPT_MAP[hard].title}`, kind: 'practice', conceptId: hard, minutes: 5 });
    steps.push({ icon: 'layers', label: 'Retrieval: flashcards + summary', kind: 'cards', minutes: 3 });
  }
  if (minutes >= 45) {
    if (due[1]) steps.push({ icon: 'refresh', label: `Second recall: ${CONCEPT_MAP[due[1]].title}`, kind: 'recall', conceptId: due[1], minutes: 5 });
    steps.push({ icon: 'compass', label: 'Method trainer: mixed recognition', kind: 'method', minutes: 6 });
    steps.push({ icon: 'tool', label: 'Mistake bank: rework old errors', kind: 'mistake', minutes: 6 });
  }
  if (minutes >= 90) {
    steps.push({ icon: 'edit', label: 'Mixed practice across chapters', kind: 'practice', minutes: 20 });
    steps.push({ icon: 'layers', label: 'Full card review', kind: 'cards', minutes: 10 });
  }
  return { minutes, steps };
}

/** Overall exam readiness per chapter [0..1]. */
export function chapterReadiness(states: Record<string, ConceptState>): { chapter: number; title: string; icon: string; readiness: number; examinable: boolean }[] {
  return CHAPTERS.map(ch => {
    const ms = ch.conceptIds.map(id => (states[id] ? retainedMastery(states[id]) : 0));
    return { chapter: ch.n, title: ch.title, icon: ch.icon, readiness: ms.length ? ms.reduce((a, b) => a + b, 0) / ms.length : 0, examinable: ch.examinable };
  });
}

export function courseMastery(states: Record<string, ConceptState>): number {
  const ex = CONCEPTS.filter(c => c.examinable);
  const total = ex.reduce((a, c) => a + (states[c.id] ? retainedMastery(states[c.id]) : 0), 0);
  return ex.length ? total / ex.length : 0;
}
