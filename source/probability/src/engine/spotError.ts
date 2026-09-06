import { fmt, fracTex, mulberry32, nCr, pick, randInt, simplify } from '../lib/utils';

/* "Spot the error": realistic fake solutions with one wrong line.
   Each is generated with computed correct values so the error line is genuinely wrong
   and every other line is genuinely right. */

export interface SpotErrorQ {
  id: string;
  prompt: string;
  lines: string[];       // solution lines, $tex$ allowed
  wrongLine: number;     // index of FIRST incorrect line
  errorId: string;
  explain: string;
  conceptId: string;
}

type Maker = (seed: number) => SpotErrorQ;

const makers: Maker[] = [
  // union added without I-E
  (seed) => {
    const rng = mulberry32(seed);
    const pa = randInt(rng, 3, 5) / 10, pb = randInt(rng, 3, 5) / 10, pab = randInt(rng, 1, 2) / 10;
    return {
      id: `se-union-${seed}`, conceptId: 'inclusion-exclusion', errorId: 'union-add',
      prompt: `A student computes P(E∪F) given P(E) = ${fmt(pa)}, P(F) = ${fmt(pb)}, P(E∩F) = ${fmt(pab)}. Find the FIRST wrong line.`,
      lines: [
        `We want the probability that E or F (or both) occurs, i.e. $P(E\\cup F)$.`,
        `Since both events can occur, $P(E\\cup F) = P(E) + P(F) = ${fmt(pa + pb)}$.`,
        `So the answer is ${fmt(pa + pb)}.`,
      ],
      wrongLine: 1,
      explain: `Line 2 adds overlapping events — the overlap ${fmt(pab)} is counted twice. Correct: $P(E\\cup F) = ${fmt(pa)} + ${fmt(pb)} − ${fmt(pab)} = ${fmt(pa + pb - pab)}$ (inclusion–exclusion). Plain addition needs DISJOINT events.`,
    };
  },
  // disjoint therefore independent
  (seed) => {
    const rng = mulberry32(seed);
    const pa = randInt(rng, 2, 4) / 10, pb = randInt(rng, 2, 4) / 10;
    return {
      id: `se-disj-${seed}`, conceptId: 'independence-warnings', errorId: 'disjoint-independent',
      prompt: `E and F are disjoint with P(E) = ${fmt(pa)}, P(F) = ${fmt(pb)}. A student computes P(E∩F). Find the FIRST wrong line.`,
      lines: [
        `E and F are disjoint, so they cannot both occur.`,
        `Disjoint events do not influence each other, so E and F are independent.`,
        `Therefore $P(E\\cap F) = P(E)P(F) = ${fmt(pa * pb)}$.`,
      ],
      wrongLine: 1,
      explain: `Line 2 is the classic trap: disjoint events with positive probability are always DEPENDENT — knowing one occurred tells you the other did not. And the conclusion contradicts line 1: disjoint means P(E∩F) = 0 directly.`,
    };
  },
  // permutation instead of combination
  (seed) => {
    const rng = mulberry32(seed);
    const n = randInt(rng, 7, 10), r = randInt(rng, 3, 4);
    let npr = 1; for (let i = 0; i < r; i++) npr *= n - i;
    return {
      id: `se-perm-${seed}`, conceptId: 'combinations', errorId: 'perm-comb',
      prompt: `How many ways can a committee of ${r} be chosen from ${n} people? Find the FIRST wrong line of this attempt.`,
      lines: [
        `We choose ${r} people from ${n} without replacement.`,
        `First pick: ${n} options; second: ${n - 1}; continuing gives $${Array.from({ length: r }, (_, i) => n - i).join(' \\times ')} = ${npr}$ ways.`,
        `A committee is an ordered selection, so the answer is ${npr}.`,
      ],
      wrongLine: 2,
      explain: `Line 3 is wrong: a committee has NO order — each group was counted ${r}! = ${[1, 1, 2, 6, 24][r]} times. Divide: $\\binom{${n}}{${r}} = ${nCr(n, r)}$. (Line 2's counting of ordered picks is itself correct.)`,
    };
  },
  // wrong sample space (totals)
  (seed) => {
    return {
      id: `se-ss-${seed}`, conceptId: 'classical-probability', errorId: 'wrong-sample-space',
      prompt: `Two fair dice are rolled. A student finds P(total = 7). Find the FIRST wrong line.`,
      lines: [
        `The possible totals are 2, 3, …, 12 — that is 11 outcomes.`,
        `Each total is equally likely, so each has probability 1/11.`,
        `Therefore P(total = 7) = 1/11.`,
      ],
      wrongLine: 1,
      explain: `Line 2 assumes the 11 totals are equally likely — they are not (7 arises 6 ways, 2 only one way). Use the 36 equally likely ordered pairs: P(total = 7) = 6/36 = 1/6 (Example 2.3's warning).`,
    };
  },
  // transposed conditional
  (seed) => {
    const rng = mulberry32(seed);
    const sens = pick(rng, [90, 95, 99]);
    return {
      id: `se-bayes-${seed}`, conceptId: 'bayes', errorId: 'transposed-conditional',
      prompt: `1% of athletes use a banned substance. A test detects users ${sens}% of the time and has a 5% false-positive rate. An athlete tests positive. Find the FIRST wrong line.`,
      lines: [
        `Let U = "uses the substance" and + = "tests positive". We are given P(+|U) = ${sens / 100} and P(+|Uᶜ) = 0.05.`,
        `Since the test is positive, P(U | +) = P(+ | U) = ${sens / 100}.`,
        `So the athlete is almost certainly a user.`,
      ],
      wrongLine: 1,
      explain: `Line 2 transposes the conditional — the prosecutor's fallacy. Bayes: $P(U|+) = \\frac{0.01\\times${sens / 100}}{0.01\\times${sens / 100} + 0.99\\times0.05} \\approx ${fmt((0.01 * sens / 100) / (0.01 * sens / 100 + 0.99 * 0.05), 2)}$ — the base rate makes false alarms dominate (Sally Clark's lesson, p40).`,
    };
  },
  // geometric off-by-one
  (seed) => {
    const rng = mulberry32(seed);
    const k = randInt(rng, 3, 5);
    return {
      id: `se-geom-${seed}`, conceptId: 'geometric', errorId: 'geom-convention',
      prompt: `A fair dice is rolled until the first six. Find P(the first six is on roll ${k}). Find the FIRST wrong line.`,
      lines: [
        `Let X be the number of rolls up to and including the first six; X ~ Geom(1/6).`,
        `The first six on roll ${k} means ${k} failures then a success.`,
        `So $P(X = ${k}) = (5/6)^{${k}}(1/6) = ${fmt((5 / 6) ** k / 6, 4)}$.`,
      ],
      wrongLine: 1,
      explain: `Line 2 miscounts: rolls 1..${k - 1} fail (that is ${k - 1} failures) and roll ${k} succeeds. Correct: $(5/6)^{${k - 1}}(1/6) = ${fmt((5 / 6) ** (k - 1) / 6, 4)}$ (Def 4.8's convention).`,
    };
  },
  // variance linear
  (seed) => {
    const rng = mulberry32(seed);
    const v = randInt(rng, 2, 6), a = randInt(rng, 2, 3), b = randInt(rng, 2, 8);
    return {
      id: `se-var-${seed}`, conceptId: 'variance', errorId: 'variance-linear',
      prompt: `X has Var(X) = ${v}. A student computes Var(${a}X + ${b}). Find the FIRST wrong line.`,
      lines: [
        `Variance measures spread around the mean.`,
        `Scaling by ${a} scales the variance, and shifting by ${b} shifts it: $\\mathrm{Var}(${a}X+${b}) = ${a}\\,\\mathrm{Var}(X) + ${b} = ${a * v + b}$.`,
        `So the variance is ${a * v + b}.`,
      ],
      wrongLine: 1,
      explain: `Line 2 breaks two rules: shifting changes NOTHING (deviations from the mean are unchanged) and scaling enters SQUARED. Correct: $\\mathrm{Var}(${a}X+${b}) = ${a}^2\\times${v} = ${a * a * v}$ (Thm 6.8).`,
    };
  },
  // E[X^2] = E[X]^2
  (seed) => {
    const rng = mulberry32(seed);
    const vals = [1, 2, 3];
    const W = 6;
    const m = [randInt(rng, 1, 3), randInt(rng, 1, 2), 0];
    m[2] = W - m[0] - m[1];
    if (m[2] <= 0) { m[0] = 2; m[1] = 2; m[2] = 2; }
    const EX = vals.reduce((a, v, i) => a + v * m[i] / W, 0);
    const EX2 = vals.reduce((a, v, i) => a + v * v * m[i] / W, 0);
    return {
      id: `se-lotus-${seed}`, conceptId: 'lotus', errorId: 'lotus',
      prompt: `X takes values 1, 2, 3 with probabilities ${m.map(x => `${x}/6`).join(', ')}. A student finds E[X²]. Find the FIRST wrong line.`,
      lines: [
        `First, $E[X] = ${vals.map((v, i) => `${v}\\cdot\\tfrac{${m[i]}}{6}`).join(' + ')} = ${fmt(EX, 3)}$.`,
        `Then $E[X^2] = (E[X])^2 = ${fmt(EX * EX, 3)}$.`,
        `So $E[X^2] = ${fmt(EX * EX, 3)}$.`,
      ],
      wrongLine: 1,
      explain: `Line 2 is the "law of the incompetent statistician" (p80). LOTUS: $E[X^2] = ${vals.map((v, i) => `${v * v}\\cdot\\tfrac{${m[i]}}{6}`).join(' + ')} = ${fmt(EX2, 3)}$. The gap ${fmt(EX2 - EX * EX, 3)} is exactly Var(X).`,
    };
  },
  // pmf doesn't sum to 1 / conditional denominator
  (seed) => {
    const rng = mulberry32(seed);
    const both = randInt(rng, 10, 20), aOnly = randInt(rng, 10, 25), bOnly = randInt(rng, 10, 25), none = randInt(rng, 5, 20);
    const N = both + aOnly + bOnly + none;
    const nB = both + bOnly;
    const [cn, cd] = simplify(both, nB);
    return {
      id: `se-cond-${seed}`, conceptId: 'conditional-probability', errorId: 'condition-wrong-event',
      prompt: `Of ${N} students, ${aOnly + both} do maths, ${nB} do music, ${both} do both. Given a student does music, find P(they do maths). Find the FIRST wrong line.`,
      lines: [
        `We want P(maths | music).`,
        `P(maths ∩ music) = ${both}/${N}.`,
        `So P(maths | music) = ${both}/${N} = $${fracTex(both, N)}$.`,
      ],
      wrongLine: 2,
      explain: `Line 3 forgot to divide by P(music): conditioning shrinks the world to the ${nB} musicians. $P(\\text{maths}|\\text{music}) = \\frac{${both}/${N}}{${nB}/${N}} = ${both}/${nB} = ${fracTex(cn, cd)}$.`,
    };
  },
];

let seCounter = Math.floor(Math.random() * 1e6);
export function makeSpotError(): SpotErrorQ {
  const mk = makers[Math.floor(Math.random() * makers.length)];
  return mk(seCounter++);
}
