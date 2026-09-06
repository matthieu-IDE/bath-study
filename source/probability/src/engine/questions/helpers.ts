import type { Choice, Difficulty, GeneratedQuestion } from '../../data/types';
import { fmt, mulberry32, type Rng, shuffle } from '../../lib/utils';

export interface RawMC {
  prompt: string;
  choices: { tex: string; correct?: boolean; errorId?: string; why?: string }[];
  hints: [string, string, string];
  solution: string[];
  markScheme?: string[];
  methodTag?: string;
}
export interface RawNumeric {
  prompt: string;
  answer: number;
  tol?: number;
  answerTex?: string;
  hints: [string, string, string];
  solution: string[];
  markScheme?: string[];
  methodTag?: string;
}

export function mcQuestion(
  id: string, templateId: string, conceptId: string, difficulty: Difficulty, seed: number, raw: RawMC, rng: Rng,
): GeneratedQuestion {
  // dedupe choices by tex (a distractor may collide with the right answer for some parameters)
  const seen = new Set<string>();
  const unique: Choice[] = [];
  for (const ch of raw.choices) {
    if (seen.has(ch.tex)) {
      if (ch.correct) {
        const prev = unique.find(u => u.tex === ch.tex)!;
        prev.correct = true; prev.errorId = undefined;
      }
      continue;
    }
    seen.add(ch.tex);
    unique.push({ ...ch });
  }
  return {
    id, templateId, conceptId, difficulty, seed, source: 'extra',
    prompt: raw.prompt, kind: 'mc',
    choices: shuffle(rng, unique),
    hints: raw.hints, solution: raw.solution, markScheme: raw.markScheme, methodTag: raw.methodTag,
  };
}

export function numQuestion(
  id: string, templateId: string, conceptId: string, difficulty: Difficulty, seed: number, raw: RawNumeric,
): GeneratedQuestion {
  return {
    id, templateId, conceptId, difficulty, seed, source: 'extra',
    prompt: raw.prompt, kind: 'numeric',
    numeric: { answer: raw.answer, tol: raw.tol ?? 2e-3, answerTex: raw.answerTex ?? fmt(raw.answer) },
    hints: raw.hints, solution: raw.solution, markScheme: raw.markScheme, methodTag: raw.methodTag,
  };
}

export const rngFor = (seed: number) => mulberry32(seed);

/** simple name pools for varied stories */
export const NAMES = ['Amara', 'Ben', 'Chloe', 'Dev', 'Ella', 'Freya', 'George', 'Hana', 'Isaac', 'Jess', 'Kofi', 'Lena', 'Marco', 'Nadia'];
export const pickName = (rng: Rng) => NAMES[Math.floor(rng() * NAMES.length)];
