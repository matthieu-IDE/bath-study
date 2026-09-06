/* Generator fuzz test: every template × difficulty × many seeds.
   Invariants: MC has exactly one correct choice + ≥2 choices; numeric answers finite;
   hints/solution present; prompts non-empty; no NaN/undefined leaking into text. */
import { TEMPLATES } from '../src/engine/questions/index';
import type { Difficulty } from '../src/data/types';

let n = 0, fails = 0;
const problems: string[] = [];

for (const t of TEMPLATES) {
  for (const d of t.difficulties) {
    for (let s = 0; s < 60; s++) {
      const seed = s * 7919 + d * 131 + 17;
      try {
        const q = t.generate(seed, d as Difficulty);
        n++;
        const bad = (msg: string) => { fails++; problems.push(`${t.id} d${d} seed${seed}: ${msg}`); };
        if (!q.prompt || q.prompt.length < 10) bad('empty prompt');
        if (/NaN|undefined|null/.test(q.prompt)) bad(`suspicious prompt: ${q.prompt.slice(0, 80)}`);
        if (q.kind === 'mc') {
          if (!q.choices || q.choices.length < 2) bad(`only ${q.choices?.length} choices`);
          const correct = q.choices!.filter(c => c.correct);
          if (correct.length !== 1) bad(`${correct.length} correct choices`);
          for (const c of q.choices!) if (/NaN|undefined/.test(c.tex)) bad(`bad choice tex: ${c.tex.slice(0, 60)}`);
        } else if (q.kind === 'numeric') {
          if (!isFinite(q.numeric!.answer)) bad(`non-finite answer ${q.numeric!.answer}`);
          if (/NaN|undefined/.test(q.numeric!.answerTex)) bad(`bad answerTex ${q.numeric!.answerTex}`);
        }
        if (!q.hints || q.hints.length !== 3 || q.hints.some(h => !h)) bad('hints missing');
        if (!q.solution?.length) bad('no solution');
        if (q.solution.some(l => /NaN|undefined/.test(l))) bad(`NaN in solution: ${q.solution.join(' | ').slice(0, 90)}`);
      } catch (e) {
        fails++;
        problems.push(`${t.id} d${d} seed${seed}: THREW ${(e as Error).message}`);
      }
    }
  }
}

console.log(`generated ${n} questions across ${TEMPLATES.length} templates`);
if (fails) {
  console.log(`FAILURES: ${fails}`);
  for (const p of [...new Set(problems)].slice(0, 25)) console.log('  -', p);
  process.exit(1);
} else {
  console.log('ALL INVARIANTS PASS ✅');
}
