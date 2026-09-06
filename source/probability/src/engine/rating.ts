import type { Attempt } from '../data/types';
import { CHAPTERS, CONCEPT_MAP } from '../data/course';

/* Chess-style rating. You start at 800; every question is an opponent whose
   strength comes from its difficulty. Beat hard questions → rating climbs fast;
   lose to easy ones → it falls. Replayed deterministically from the attempt log. */

const START = 800;
const K = 26;
const qRating = (difficulty: number) => 850 + difficulty * 280;   // L0 850 … L5 2250

function expected(r: number, qr: number) {
  return 1 / (1 + 10 ** ((qr - r) / 400));
}

export interface Ratings {
  overall: number;
  delta7d: number;
  byChapter: Record<number, number>;
  games: number;
}

export function computeRatings(attempts: Attempt[]): Ratings {
  // attempts are stored newest-first; replay oldest-first
  const seq = [...attempts].reverse();
  let overall = START;
  const byChapter: Record<number, number> = {};
  for (const ch of CHAPTERS) byChapter[ch.n] = START;
  let weekAgoRating = START;
  const weekCutoff = Date.now() - 7 * 86400_000;
  let counted = 0;

  for (const a of seq) {
    const qr = qRating(a.difficulty);
    // hints soften a win, confident-wrong hardens a loss slightly
    const score = a.correct ? Math.max(0.6, 1 - a.hintsUsed * 0.15) : 0;
    overall = overall + K * (score - expected(overall, qr));
    const ch = CONCEPT_MAP[a.conceptId]?.chapter;
    if (ch) byChapter[ch] = byChapter[ch] + K * (score - expected(byChapter[ch], qr));
    counted++;
    if (a.at <= weekCutoff) weekAgoRating = overall;
  }
  return {
    overall: Math.round(overall),
    delta7d: Math.round(overall - weekAgoRating),
    byChapter: Object.fromEntries(Object.entries(byChapter).map(([k, v]) => [k, Math.round(v)])),
    games: counted,
  };
}

export function ratingBand(r: number): { label: string; color: string } {
  if (r < 900) return { label: 'Novice', color: 'var(--faint)' };
  if (r < 1050) return { label: 'Improver', color: 'var(--warn)' };
  if (r < 1250) return { label: 'Solid', color: 'var(--accent)' };
  if (r < 1450) return { label: 'Strong', color: 'var(--good)' };
  if (r < 1650) return { label: 'Advanced', color: 'var(--known)' };
  if (r < 1900) return { label: 'Expert', color: 'var(--cond)' };
  return { label: '95% club', color: 'var(--text)' };
}
