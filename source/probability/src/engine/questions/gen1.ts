import type { Difficulty, QuestionTemplate } from '../../data/types';
import { fracTex, fmt, nCr, nPr, pick, randInt, simplify } from '../../lib/utils';
import { mcQuestion, numQuestion, pickName, rngFor } from './helpers';

/* Generators for chapters 1–3. Every answer is computed; every distractor encodes a
   classified error. Difficulty scales structure, not just numbers. */

const T: QuestionTemplate[] = [];

/* ---------- 1. Venn / inclusion-exclusion ---------- */
T.push({
  id: 'venn-count', conceptId: 'inclusion-exclusion', difficulties: [0, 1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { total: 'students', A: 'take Analysis', B: 'take Algebra', place: 'a first-year cohort' },
      { total: 'people', A: 'own a bike', B: 'own a car', place: 'a survey' },
      { total: 'gym members', A: 'lift weights', B: 'attend classes', place: 'a gym' },
      { total: 'customers', A: 'order coffee', B: 'order food', place: 'a café' },
    ]);
    const both = randInt(rng, 8, 30);
    const onlyA = randInt(rng, 10, 40);
    const onlyB = randInt(rng, 10, 40);
    const neither = randInt(rng, 5, 35);
    const N = both + onlyA + onlyB + neither;
    const nA = onlyA + both, nB = onlyB + both, nUnion = onlyA + onlyB + both;

    if (d <= 1) {
      // ask union directly from counts
      const [an, ad] = simplify(nUnion, N);
      return mcQuestion(`venn-${seed}`, 'venn-count', 'inclusion-exclusion', d, seed, {
        prompt: `In ${ctx.place} of **${N} ${ctx.total}**, ${nA} ${ctx.A}, ${nB} ${ctx.B}, and ${both} do both. One is chosen at random. What is P(${ctx.A} **or** ${ctx.B})?`,
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true, why: `P(A∪B) = (${nA}+${nB}−${both})/${N} = ${nUnion}/${N}.` },
          { tex: `$${fracTex(nA + nB, N)}$`, errorId: 'union-add', why: 'Added without subtracting the overlap — those who do both were counted twice.' },
          { tex: `$${fracTex(both, N)}$`, errorId: 'union-intersection', why: 'That is P(A **and** B), the intersection.' },
          { tex: `$${fracTex(neither, N)}$`, errorId: 'complement-forgot', why: 'That is P(neither) — the complement of what was asked.' },
        ],
        hints: ['Draw the two-circle Venn diagram and fill in the three regions.',
          `"${ctx.A} or ${ctx.B}" is the UNION. Careful: ${nA}+${nB} double-counts somebody.`,
          `|A∪B| = |A|+|B|−|A∩B| = ${nA}+${nB}−${both} = ${nUnion}. Divide by ${N}.`],
        solution: [`|A∪B| = ${nA} + ${nB} − ${both} = ${nUnion} (inclusion–exclusion, Cor 1.5).`,
          `P(A∪B) = ${nUnion}/${N} = $${fracTex(an, ad)}$.`],
        markScheme: ['M1: inclusion–exclusion (or region counts from a Venn diagram)', 'A1: correct simplified probability'],
        methodTag: 'inclusion-exclusion',
      }, rng);
    }
    // d>=2: give P's, ask for a derived quantity (rearranged I-E or difference)
    const mode = pick(rng, d >= 3 ? ['findB', 'onlyA', 'neither'] : ['onlyA', 'neither']);
    if (mode === 'findB') {
      const [an, ad] = simplify(nB, N);
      return numQuestion(`venn-${seed}`, 'venn-count', 'inclusion-exclusion', d, seed, {
        prompt: `In ${ctx.place}, P(${ctx.A}) = ${fmt(nA / N, 4)}, P(${ctx.A} or ${ctx.B}) = ${fmt(nUnion / N, 4)} and P(both) = ${fmt(both / N, 4)}. Find **P(${ctx.B})** (4 dp or an exact fraction).`,
        answer: nB / N, answerTex: `$${fracTex(an, ad)} = ${fmt(nB / N, 4)}$`,
        hints: ['Write inclusion–exclusion and look at which quantity is unknown.',
          'P(A∪B) = P(A) + P(B) − P(A∩B). Rearrange for P(B).',
          `P(B) = P(A∪B) + P(A∩B) − P(A) = ${fmt(nUnion / N, 4)} + ${fmt(both / N, 4)} − ${fmt(nA / N, 4)}.`],
        solution: [`Rearrange Cor 1.5: P(B) = P(A∪B) + P(A∩B) − P(A) = $${fracTex(an, ad)}$ (this is Example 2.4's cycling trick).`],
        markScheme: ['M1: inclusion–exclusion rearranged', 'A1: value'],
        methodTag: 'inclusion-exclusion',
      });
    }
    const target = mode === 'onlyA' ? onlyA : neither;
    const label = mode === 'onlyA' ? `${ctx.A} but NOT ${ctx.B}` : `NEITHER ${ctx.A} nor ${ctx.B}`;
    const [an, ad] = simplify(target, N);
    return mcQuestion(`venn-${seed}`, 'venn-count', 'inclusion-exclusion', d, seed, {
      prompt: `Of **${N} ${ctx.total}**: ${nA} ${ctx.A}, ${nB} ${ctx.B}, ${both} do both. Find P(${label}).`,
      choices: [
        { tex: `$${fracTex(an, ad)}$`, correct: true },
        { tex: `$${fracTex(mode === 'onlyA' ? nA : N - nA, N)}$`, errorId: mode === 'onlyA' ? 'union-intersection' : 'demorgan', why: mode === 'onlyA' ? 'That is P(A) including the overlap — "but not B" removes A∩B.' : 'That is P(not A) alone; "neither" needs BOTH to fail (De Morgan).' },
        { tex: `$${fracTex(mode === 'onlyA' ? both : N - nUnion + both, N)}$`, errorId: 'union-intersection' },
        { tex: `$${fracTex(Math.max(1, N - target), N)}$`, errorId: 'complement-forgot', why: 'This is the complement of the required event.' },
      ],
      hints: ['Fill the four Venn regions: only-A, both, only-B, neither.',
        mode === 'onlyA' ? 'A but not B = A∩Bᶜ = A minus the overlap.' : 'Neither = (A∪B)ᶜ. De Morgan: both must fail.',
        `The region count is ${target} out of ${N}.`],
      solution: [mode === 'onlyA'
        ? `|A∩Bᶜ| = |A| − |A∩B| = ${nA} − ${both} = ${onlyA}; P = $${fracTex(an, ad)}$.`
        : `|A∪B| = ${nUnion}, so |neither| = ${N} − ${nUnion} = ${neither}; P = $${fracTex(an, ad)}$.`],
      markScheme: ['M1: correct region identified via set operations', 'A1: probability'],
      methodTag: 'inclusion-exclusion',
    }, rng);
  },
});

/* ---------- 2. Dice / classical sample space ---------- */
T.push({
  id: 'dice-classical', conceptId: 'classical-probability', difficulties: [0, 1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    if (d <= 1) {
      const k = randInt(rng, 5, 9);
      let count = 0;
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b === k) count++;
      const [an, ad] = simplify(count, 36);
      return mcQuestion(`dice-${seed}`, 'dice-classical', 'classical-probability', d, seed, {
        prompt: `Two fair dice are rolled. What is P(total = ${k})?`,
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true },
          { tex: `$${fracTex(1, 11)}$`, errorId: 'wrong-sample-space', why: 'Treating the 11 possible totals {2,…,12} as equally likely — they are not!' },
          { tex: `$${fracTex(count, 12)}$`, errorId: 'denominator', why: 'Wrong |Ω|: ordered pairs give 36 outcomes, not 12.' },
          { tex: `$${fracTex(Math.max(1, count - 1), 36)}$`, errorId: 'arithmetic', why: 'Miscounted the pairs — tabulate them.' },
        ],
        hints: ['Use ORDERED pairs (r, b) so all outcomes are equally likely.',
          '|Ω| = 6 × 6 = 36. Now count pairs summing to the target.',
          `Pairs summing to ${k}: ${count} of them (list them: (${Math.max(1, k - 6)},${k - Math.max(1, k - 6)}), …).`],
        solution: [`|Ω| = 36 ordered pairs (Example 2.3's table).`, `${count} pairs sum to ${k}, so P = ${count}/36 = $${fracTex(an, ad)}$.`],
        markScheme: ['M1: equally likely ordered pairs, |Ω|=36', 'A1: count and simplify'],
        methodTag: 'classical',
      }, rng);
    }
    const mode = pick(rng, d >= 3 ? ['atleastone6', 'doubles-or-big', 'max'] : ['atleastone6', 'doubles-or-big']);
    if (mode === 'atleastone6') {
      const [an, ad] = simplify(11, 36);
      return mcQuestion(`dice-${seed}`, 'dice-classical', 'classical-probability', d, seed, {
        prompt: 'Two fair dice are rolled. What is P(at least one shows a 6)?',
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true, why: '1 − (5/6)² = 11/36, or count 11 pairs.' },
          { tex: `$${fracTex(12, 36)}$`, errorId: 'union-add', why: '6 pairs with red 6 plus 6 with blue 6 double-counts (6,6).' },
          { tex: `$${fracTex(1, 36)}$`, errorId: 'union-intersection', why: 'That is P(BOTH show 6).' },
          { tex: `$${fracTex(25, 36)}$`, errorId: 'complement-forgot', why: 'That is P(NO six) — you forgot to subtract from 1.' },
        ],
        hints: ['"At least one" — which trick does that phrase trigger?',
          'Complement: P(at least one 6) = 1 − P(no sixes).',
          'P(no sixes) = (5/6)(5/6) = 25/36.'],
        solution: ['P(no sixes) = (5/6)² = 25/36 (independent dice).', 'P(at least one) = 1 − 25/36 = 11/36.'],
        markScheme: ['M1: complement of "none"', 'A1: 11/36'],
        methodTag: 'complement',
      }, rng);
    }
    if (mode === 'max') {
      const m = randInt(rng, 3, 5);
      const count = 2 * m - 1;
      const [an, ad] = simplify(count, 36);
      return numQuestion(`dice-${seed}`, 'dice-classical', 'classical-probability', d, seed, {
        prompt: `Two fair dice are rolled. Find P(the **maximum** of the two scores equals ${m}). Give a fraction or 4 dp.`,
        answer: count / 36, answerTex: `$${fracTex(an, ad)}$`,
        hints: ['Try P(max ≤ m) first — both dice must be ≤ m.',
          `P(max ≤ ${m}) = (${m}/6)² and P(max ≤ ${m - 1}) = (${m - 1}/6)².`,
          'P(max = m) = P(max ≤ m) − P(max ≤ m−1).'],
        solution: [`P(max ≤ ${m}) = ${m * m}/36; P(max ≤ ${m - 1}) = ${(m - 1) * (m - 1)}/36.`,
          `P(max = ${m}) = ${m * m - (m - 1) * (m - 1)}/36 = $${fracTex(an, ad)}$ — the cdf-difference idea in disguise.`],
        markScheme: ['M1: express via P(max ≤ m)', 'A1: value'],
        methodTag: 'classical',
      });
    }
    // doubles or big total
    const t = randInt(rng, 9, 11);
    let big = 0; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (a + b >= t) big++;
    let overlap = 0; for (let a = 1; a <= 6; a++) if (a + a >= t) overlap++;
    const count = 6 + big - overlap;
    const [an, ad] = simplify(count, 36);
    return numQuestion(`dice-${seed}`, 'dice-classical', 'classical-probability', d, seed, {
      prompt: `Two fair dice are rolled. Find P(doubles **or** total ≥ ${t}). Fraction or 4 dp.`,
      answer: count / 36, answerTex: `$${fracTex(an, ad)}$`,
      hints: ['Two overlapping events — name the formula before counting.',
        `Count doubles (6), count totals ≥ ${t} (${big}), count doubles with total ≥ ${t} (${overlap}).`,
        `${6} + ${big} − ${overlap} = ${count}; divide by 36.`],
      solution: [`P(doubles) = 6/36, P(total ≥ ${t}) = ${big}/36, overlap = ${overlap}/36.`,
        `Inclusion–exclusion: (6 + ${big} − ${overlap})/36 = $${fracTex(an, ad)}$.`],
      markScheme: ['M1: inclusion–exclusion', 'A1: counts', 'A1: final'],
      methodTag: 'inclusion-exclusion',
    });
  },
});

/* ---------- 3. Sampling table / counting ---------- */
T.push({
  id: 'counting-cell', conceptId: 'sampling-table', difficulties: [0, 1, 2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    type Cell = 'ord-rep' | 'ord-norep' | 'unord-norep' | 'unord-rep';
    const stories: { cell: Cell; text: (n: number, r: number) => string; nRange: [number, number]; rRange: [number, number] }[] = [
      { cell: 'ord-rep', text: (n, r) => `A door code has ${r} symbols, each chosen from ${n} available symbols (repeats allowed, order matters). How many codes are possible?`, nRange: [4, 10], rRange: [3, 5] },
      { cell: 'ord-norep', text: (n, r) => `${r} different prizes (gold, silver, bronze${r > 3 ? ', …' : ''}) are awarded among ${n} athletes, at most one prize each. How many ways?`, nRange: [6, 12], rRange: [3, 4] },
      { cell: 'unord-norep', text: (n, r) => `A team of ${r} players is chosen from a squad of ${n}. How many possible teams?`, nRange: [7, 14], rRange: [3, 5] },
      { cell: 'unord-rep', text: (n, r) => `You buy ${r} scoops of ice cream from ${n} flavours (repeats fine, order irrelevant). How many different orders?`, nRange: [3, 6], rRange: [3, 6] },
    ];
    const s = pick(rng, d >= 2 ? stories : stories.slice(0, 3));
    const n = randInt(rng, s.nRange[0], s.nRange[1]);
    const r = Math.min(randInt(rng, s.rRange[0], s.rRange[1]), n - 1);
    const vals: Record<Cell, number> = {
      'ord-rep': n ** r,
      'ord-norep': nPr(n, r),
      'unord-norep': nCr(n, r),
      'unord-rep': nCr(n - 1 + r, r),
    };
    const correct = vals[s.cell];
    const texFor: Record<Cell, string> = {
      'ord-rep': `$${n}^{${r}} = ${n ** r}$`,
      'ord-norep': `$\\frac{${n}!}{${n - r}!} = ${nPr(n, r)}$`,
      'unord-norep': `$\\binom{${n}}{${r}} = ${nCr(n, r)}$`,
      'unord-rep': `$\\binom{${n - 1 + r}}{${r}} = ${nCr(n - 1 + r, r)}$`,
    };
    const errFor = (cell: Cell): string => {
      const orderErr = (cell.startsWith('ord') !== s.cell.startsWith('ord'));
      return orderErr ? 'perm-comb' : 'replacement';
    };
    const cells: Cell[] = ['ord-rep', 'ord-norep', 'unord-norep', 'unord-rep'];
    if (d <= 3) {
      return mcQuestion(`count-${seed}`, 'counting-cell', 'sampling-table', d, seed, {
        prompt: s.text(n, r),
        choices: cells.map(c => ({
          tex: texFor[c], correct: c === s.cell,
          errorId: c === s.cell ? undefined : errFor(c),
          why: c === s.cell ? undefined : `That is the ${c.startsWith('ord') ? 'ordered' : 'unordered'}, ${c.endsWith('-rep') ? 'with' : 'without'}-replacement formula — wrong cell of the table.`,
        })),
        hints: ['Two questions: does ORDER matter? Can items REPEAT?',
          `Here: order ${s.cell.startsWith('ord') ? 'MATTERS' : 'does NOT matter'}; repeats ${s.cell.endsWith('rep') && !s.cell.endsWith('norep') ? 'ALLOWED' : 'NOT allowed'}. Which anchor example is this (podium/PIN/lotto/doughnuts)?`,
          `Use ${texFor[s.cell].split('=')[0]}.`],
        solution: [`Order ${s.cell.startsWith('ord') ? 'matters' : 'irrelevant'}, ${s.cell === 'ord-rep' || s.cell === 'unord-rep' ? 'with' : 'without'} replacement → ${texFor[s.cell]} (p27 sampling table).`],
        markScheme: ['M1: correct cell of the sampling table named', 'A1: evaluated'],
        methodTag: 'counting',
      }, rng);
    }
    // d=4: probability with two-stage counting (committee with constraint)
    const men = randInt(rng, 4, 7), women = randInt(rng, 4, 7), size = 4, minW = 2;
    let fav = 0;
    for (let w = minW; w <= Math.min(size, women); w++) fav += nCr(women, w) * nCr(men, size - w);
    const total = nCr(men + women, size);
    const [an, ad] = simplify(fav, total);
    return numQuestion(`count-${seed}`, 'counting-cell', 'combinations', d, seed, {
      prompt: `A committee of ${size} is chosen at random from ${women} women and ${men} men. Find P(the committee contains **at least ${minW} women**). Fraction or 4 dp.`,
      answer: fav / total, answerTex: `$${fracTex(an, ad)} = ${fmt(fav / total, 4)}$`,
      hints: ['Split by the exact number of women: w = 2, 3, 4.',
        `Each case: choose w women AND ${size}−w men — combinations multiplied (multiplication principle).`,
        `Total favourable = Σ C(${women},w)·C(${men},${size}−w) for w ≥ ${minW}; divide by C(${men + women},${size}).`],
      solution: [`|Ω| = C(${men + women}, ${size}) = ${total}.`,
        `Favourable = ${Array.from({ length: Math.min(size, women) - minW + 1 }, (_, i) => `C(${women},${minW + i})C(${men},${size - minW - i})`).join(' + ')} = ${fav}.`,
        `P = ${fav}/${total} = $${fracTex(an, ad)}$.`],
      markScheme: ['M1: case split over #women', 'M1: products of binomials', 'A1: total', 'A1: probability'],
      methodTag: 'counting',
    });
  },
});

/* ---------- 4. Arrangements with repeats ---------- */
T.push({
  id: 'arrange-letters', conceptId: 'permutations', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const words = [
      { w: 'BANANA', dup: [3, 2] }, { w: 'STATISTICS', dup: [3, 3, 2] }, { w: 'PROBABILITY', dup: [2, 2] },
      { w: 'COFFEE', dup: [2, 2] }, { w: 'SUCCESS', dup: [3, 2] }, { w: 'ALGEBRA', dup: [2] }, { w: 'BUBBLE', dup: [3] },
    ].filter(x => (d >= 2 ? x.dup.length >= 2 || x.dup[0] >= 3 : true));
    const { w, dup } = pick(rng, words);
    let denom = 1; for (const k of dup) denom *= [1, 1, 2, 6, 24][k];
    let numer = 1; for (let i = 2; i <= w.length; i++) numer *= i;
    const ans = numer / denom;
    return mcQuestion(`arr-${seed}`, 'arrange-letters', 'permutations', d, seed, {
      prompt: `How many **distinct** arrangements are there of the letters of **${w}**?`,
      choices: [
        { tex: `$\\frac{${w.length}!}{${dup.map(k => `${k}!`).join('\\,')}} = ${ans}$`, correct: true },
        { tex: `$${w.length}! = ${numer}$`, errorId: 'overcount-identical', why: `Treats the repeated letters as distinguishable — arrangements that swap identical letters look the same.` },
        { tex: `$\\binom{${w.length}}{${dup[0]}} = ${nCr(w.length, dup[0])}$`, errorId: 'perm-comb', why: 'A combination counts subsets, not arrangements.' },
        { tex: `$\\frac{${w.length}!}{${dup.length}} = ${numer / dup.length}$`, errorId: 'overcount-identical', why: 'Divide by k! for EACH repeated group, not by the number of groups.' },
      ],
      hints: [`${w} has ${w.length} letters. Are they all different?`,
        `Repeated groups: ${dup.map(k => `a letter appearing ${k}×`).join(', ')}. Identical letters can be swapped invisibly.`,
        `Divide ${w.length}! by ${dup.map(k => `${k}!`).join(' and ')} (Example 2.11 ALGEBRA-style).`],
      solution: [`${w.length}! arrangements if letters were distinct = ${numer}.`,
        `Each distinct arrangement is counted ${dup.map(k => `${k}!`).join('·')} = ${denom} times (permuting identical letters).`,
        `Answer: ${numer}/${denom} = ${ans}.`],
      markScheme: ['M1: n!/(dividing by factorials of repeats)', 'A1: value'],
      methodTag: 'counting',
    }, rng);
  },
});

/* ---------- 5. Conditional probability from populations ---------- */
T.push({
  id: 'cond-table', conceptId: 'conditional-probability', difficulties: [0, 1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { pop: 'students', A: 'study maths', B: 'play a sport' },
      { pop: 'commuters', A: 'cycle in', B: 'arrive before 9am' },
      { pop: 'films on a streaming site', A: 'are comedies', B: 'are under 100 minutes' },
      { pop: 'customers', A: 'pay by card', B: 'leave a tip' },
    ]);
    const ab = randInt(rng, 8, 25), aOnly = randInt(rng, 6, 25), bOnly = randInt(rng, 6, 25), none = randInt(rng, 5, 25);
    const N = ab + aOnly + bOnly + none;
    const nB = ab + bOnly, nA = ab + aOnly;
    const [an, ad] = simplify(ab, nB);
    if (d <= 2) {
      return mcQuestion(`cond-${seed}`, 'cond-table', 'conditional-probability', d, seed, {
        prompt: `Among **${N} ${ctx.pop}**: ${nA} ${ctx.A}, ${nB} ${ctx.B}, and ${ab} do both. Given that a randomly chosen one **${ctx.B}**, what is the probability they also **${ctx.A}**?`,
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true, why: `Shrink the world to the ${nB} who ${ctx.B}; of those, ${ab} also ${ctx.A}.` },
          { tex: `$${fracTex(ab, N)}$`, errorId: 'condition-wrong-event', why: 'That is the JOINT probability P(A∩B) over everyone — you did not shrink the sample space.' },
          { tex: `$${fracTex(ab, nA)}$`, errorId: 'transposed-conditional', why: 'That is P(B|A) — conditioned the wrong way round.' },
          { tex: `$${fracTex(nB, N)}$`, errorId: 'condition-wrong-event', why: 'That is just P(B).' },
        ],
        hints: ['Conditioning = throw away everyone outside the given event.',
          `Keep only the ${nB} who ${ctx.B}. They are your new denominator.`,
          `Of those ${nB}, how many also ${ctx.A}? That count over ${nB}.`],
        solution: [`P(A|B) = P(A∩B)/P(B) = (${ab}/${N})/(${nB}/${N}) = ${ab}/${nB} = $${fracTex(an, ad)}$.`,
          'Note how the N cancels — conditioning is just re-basing to the B-world.'],
        markScheme: ['M1: conditional probability definition or restricted count', 'A1: simplified'],
        methodTag: 'conditional',
      }, rng);
    }
    // d=3: sequential aces-style
    const suitN = randInt(rng, 3, 5);
    const total = randInt(rng, 9, 14);
    const num = suitN * (suitN - 1), den = total * (total - 1);
    const [sn, sd] = simplify(num, den);
    return numQuestion(`cond-${seed}`, 'cond-table', 'chain-rule', d, seed, {
      prompt: `A box holds ${total} chocolates, of which ${suitN} are caramels. ${pickName(rng)} eats two at random (no putting back!). Find P(**both** are caramels). Fraction or 4 dp.`,
      answer: num / den, answerTex: `$${fracTex(sn, sd)}$`,
      hints: ['Two draws without replacement — which rule chains them?',
        'P(C₁∩C₂) = P(C₁)·P(C₂|C₁).',
        `First: ${suitN}/${total}. Then ${suitN - 1} caramels remain of ${total - 1}.`],
      solution: [`P(C₁∩C₂) = P(C₁)P(C₂|C₁) = (${suitN}/${total})(${suitN - 1}/${total - 1}) = $${fracTex(sn, sd)}$ — the two-aces pattern (Example 3.2).`],
      markScheme: ['M1: multiplication rule', 'A1: value'],
      methodTag: 'conditional',
    });
  },
});

/* ---------- 6. Total probability ---------- */
T.push({
  id: 'total-prob', conceptId: 'total-probability', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { parts: ['Machine A', 'Machine B', 'Machine C'], item: 'components', bad: 'defective' },
      { parts: ['the early bus', 'the late bus', 'walking'], item: 'journeys', bad: 'late arrivals' },
      { parts: ['Chef Ana', 'Chef Bruno', 'Chef Carla'], item: 'dishes', bad: 'over-salted' },
    ]);
    const k = d <= 1 ? 2 : 3;
    let weights: number[] = [];
    let rem = 100;
    for (let i = 0; i < k - 1; i++) { const w = randInt(rng, 20, Math.min(60, rem - 10 * (k - 1 - i))); weights.push(w); rem -= w; }
    weights.push(rem);
    const probs = weights.map(() => randInt(rng, 1, 12) / 100);
    const totalP = weights.reduce((acc, w, i) => acc + (w / 100) * probs[i], 0);
    return numQuestion(`ltp-${seed}`, 'total-prob', 'total-probability', d, seed, {
      prompt: `${ctx.parts.slice(0, k).map((p, i) => `**${p}** produces ${weights[i]}% of all ${ctx.item}, of which ${fmt(probs[i] * 100, 1)}% are ${ctx.bad}`).join('. ')}. One of the ${ctx.item} is picked at random. Find P(it is ${ctx.bad}), to 4 dp.`,
      answer: totalP, tol: 1e-3, answerTex: `$${fmt(totalP, 4)}$`,
      hints: [`The sources partition all ${ctx.item}. Which law applies?`,
        'P(bad) = Σ P(source)·P(bad | source) — a weighted average.',
        weights.slice(0, k).map((w, i) => `${w / 100}×${fmt(probs[i], 3)}`).join(' + ') + '.'],
      solution: [`Law of total probability (Thm 3.2) over the partition {${ctx.parts.slice(0, k).join(', ')}}:`,
        `P = ${weights.slice(0, k).map((w, i) => `(${w / 100})(${fmt(probs[i], 3)})`).join(' + ')} = $${fmt(totalP, 4)}$.`],
      markScheme: ['M1: partition identified', 'M1: LTP with all branches', 'A1: value'],
      methodTag: 'total-probability',
    });
  },
});

/* ---------- 7. Bayes ---------- */
T.push({
  id: 'bayes-test', conceptId: 'bayes', difficulties: [1, 2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    if (d <= 3) {
      const ctx = pick(rng, [
        { E: 'has the condition', F: 'tests positive', prior: 'prevalence', story: (p: string, se: string, fp: string) => `A screening test for a rare condition: ${p} of the population has it. The test is positive for ${se} of those who have it, but also (falsely) positive for ${fp} of those who do not.` },
        { E: 'is spam', F: 'contains the word WINNER', prior: 'spam rate', story: (p: string, se: string, fp: string) => `${p} of incoming email is spam. The word "WINNER" appears in ${se} of spam emails but only ${fp} of genuine emails.` },
        { E: 'was made by the night shift', F: 'is faulty', prior: 'night-shift share', story: (p: string, se: string, fp: string) => `The night shift makes ${p} of all units; ${se} of night-shift units are faulty, compared with ${fp} of day-shift units.` },
      ]);
      const prior = pick(rng, [0.01, 0.02, 0.05, 0.1, 0.2]);
      const sens = pick(rng, [0.8, 0.9, 0.95, 0.99]);
      const fpr = pick(rng, [0.02, 0.05, 0.1, 0.15]);
      const num = prior * sens;
      const den = num + (1 - prior) * fpr;
      const post = num / den;
      const pct = (x: number) => `${fmt(x * 100, 1)}%`;
      if (d <= 2) {
        return mcQuestion(`bayes-${seed}`, 'bayes-test', 'bayes', d, seed, {
          prompt: `${ctx.story(pct(prior), pct(sens), pct(fpr))} An item ${ctx.F}. What is P(it ${ctx.E} | it ${ctx.F})? (nearest option)`,
          choices: [
            { tex: `$${fmt(post, 3)}$`, correct: true },
            { tex: `$${fmt(sens, 3)}$`, errorId: 'transposed-conditional', why: 'That is P(F|E) — the test\'s accuracy, not the reversed conditional you were asked for.' },
            { tex: `$${fmt(num, 3)}$`, errorId: 'bayes-denominator', why: 'That is only the numerator P(E)P(F|E) — you never divided by P(F).' },
            { tex: `$${fmt(Math.min(0.999, sens * (1 - fpr)), 3)}$`, errorId: 'forgot-prior', why: 'Combining the accuracies while ignoring the base rate entirely.' },
          ],
          hints: ['Which direction is given, and which is asked? They differ.',
            'Bayes: P(E|F) = P(E)P(F|E) / P(F), with P(F) by total probability over {E, Eᶜ}.',
            `Numerator ${fmt(prior, 3)}×${fmt(sens, 2)}; denominator adds (1−${fmt(prior, 3)})×${fmt(fpr, 2)}.`],
          solution: [`P(F) = ${fmt(prior, 3)}·${fmt(sens, 2)} + ${fmt(1 - prior, 3)}·${fmt(fpr, 2)} = ${fmt(den, 4)}.`,
            `P(E|F) = ${fmt(num, 4)}/${fmt(den, 4)} = $${fmt(post, 3)}$.`,
            post < 0.5 ? 'Note the punchline: despite a positive result, the condition is still more likely absent — the base rate dominates (the Bayes lesson).' : 'The strong prior/likelihood makes the posterior high here.'],
          markScheme: ['M1: Bayes stated', 'M1: total-probability denominator with BOTH branches', 'A1: value'],
          methodTag: 'bayes',
        }, rng);
      }
      return numQuestion(`bayes-${seed}`, 'bayes-test', 'bayes', d, seed, {
        prompt: `${ctx.story(pct(prior), pct(sens), pct(fpr))} An item ${ctx.F}. Compute P(it ${ctx.E} | it ${ctx.F}), to 3 dp.`,
        answer: post, tol: 2e-3, answerTex: `$${fmt(post, 4)}$`,
        hints: ['Tree diagram: two branches to the observed event.',
          'P(E|F) = P(E)P(F|E) / [P(E)P(F|E) + P(Eᶜ)P(F|Eᶜ)].',
          `= (${fmt(prior, 3)}·${fmt(sens, 2)}) / (${fmt(prior, 3)}·${fmt(sens, 2)} + ${fmt(1 - prior, 3)}·${fmt(fpr, 2)}).`],
        solution: [`Numerator ${fmt(num, 4)}; denominator ${fmt(den, 4)}; posterior $${fmt(post, 4)}$.`],
        markScheme: ['M1: Bayes', 'M1: LTP denominator', 'A1: 3 dp'],
        methodTag: 'bayes',
      });
    }
    // d=4: three-way partition (traders pattern)
    const shares = [randInt(rng, 2, 4) / 10, 0, 0];
    shares[1] = randInt(rng, 3, 5) / 10;
    shares[2] = Math.round((1 - shares[0] - shares[1]) * 10) / 10;
    const ls = [1 / randInt(rng, 2, 5), 1 / randInt(rng, 4, 8), 1 / randInt(rng, 8, 16)];
    const den = shares[0] * ls[0] + shares[1] * ls[1] + shares[2] * ls[2];
    const post = (shares[0] * ls[0]) / den;
    return numQuestion(`bayes-${seed}`, 'bayes-test', 'bayes', d, seed, {
      prompt: `Three friends run a market stall on different days: ${fmt(shares[0] * 100, 0)}%, ${fmt(shares[1] * 100, 0)}% and ${fmt(shares[2] * 100, 0)}% of sales happen on their days respectively. A sale gets refunded with probability ${fmt(ls[0], 3)}, ${fmt(ls[1], 3)}, ${fmt(ls[2], 3)} on those days. A refund request arrives for a random sale. Find P(it was the **first** friend's day), to 3 dp.`,
      answer: post, tol: 2e-3, answerTex: `$${fmt(post, 4)}$`,
      hints: ['This is the traders example (3.5/3.6) with a costume change.',
        'Bayes with a 3-part partition: denominator sums all three branches.',
        `${fmt(shares[0], 1)}·${fmt(ls[0], 3)} over the sum of all three products.`],
      solution: [`P(refund) = ${shares.map((s, i) => `${fmt(s, 1)}·${fmt(ls[i], 3)}`).join(' + ')} = ${fmt(den, 4)} (total probability).`,
        `Posterior = ${fmt(shares[0] * ls[0], 4)}/${fmt(den, 4)} = $${fmt(post, 4)}$ (Bayes, Thm 3.3).`],
      markScheme: ['M1: partition + LTP', 'M1: Bayes ratio', 'A1: value'],
      methodTag: 'bayes',
    });
  },
});

/* ---------- 8. Independence checks ---------- */
T.push({
  id: 'indep-check', conceptId: 'independence', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    if (d <= 1) {
      return mcQuestion(`ind-${seed}`, 'indep-check', 'independence-warnings', d, seed, {
        prompt: 'E and F are **disjoint** events with P(E) = 0.3 and P(F) = 0.4. Are E and F independent?',
        choices: [
          { tex: 'No — P(E∩F) = 0 ≠ 0.12 = P(E)P(F)', correct: true, why: 'Disjoint events with positive probability are always dependent.' },
          { tex: 'Yes — they cannot influence each other', errorId: 'disjoint-independent', why: 'Backwards! If they cannot co-occur, seeing one tells you the other did NOT happen — maximal information.' },
          { tex: 'Yes — because P(E) + P(F) < 1', errorId: 'disjoint-independent' },
          { tex: 'Cannot tell without more information', errorId: 'disjoint-independent', why: 'We have all we need: the product test fails immediately.' },
        ],
        hints: ['Write down what disjoint means for P(E∩F).',
          'Independence requires P(E∩F) = P(E)P(F). Compare.',
          '0 ≠ 0.3×0.4. Done.'],
        solution: ['Disjoint ⟹ P(E∩F) = 0, but P(E)P(F) = 0.12 > 0. Not independent (p36 warning).',
          'Intuition: learning F occurred tells you E certainly did NOT — that is strong information.'],
        markScheme: ['M1: product test', 'A1: conclusion with reason'],
        methodTag: 'independence',
      }, rng);
    }
    // build a 2x2 joint that is or isn't independent
    const indep = rng() < 0.5;
    let pA = randInt(rng, 2, 6) / 10, pB = randInt(rng, 2, 6) / 10;
    let pAB = indep ? pA * pB : Math.min(pA, pB) * pick(rng, [0.5, 0.75, 1.3]);
    pAB = Math.round(pAB * 100) / 100;
    if (!indep && Math.abs(pAB - pA * pB) < 0.01) pAB += 0.05;
    pAB = Math.min(pAB, Math.min(pA, pB));
    const isInd = Math.abs(pAB - pA * pB) < 1e-9;
    return mcQuestion(`ind-${seed}`, 'indep-check', 'independence', d, seed, {
      prompt: `Events E, F have P(E) = ${fmt(pA)}, P(F) = ${fmt(pB)} and P(E∩F) = ${fmt(pAB)}. Are they independent?`,
      choices: [
        { tex: isInd ? `Yes: $${fmt(pAB)} = ${fmt(pA)}\\times${fmt(pB)}$` : `No: $${fmt(pAB)} \\ne ${fmt(pA)}\\times${fmt(pB)} = ${fmt(pA * pB)}$`, correct: true },
        { tex: isInd ? `No: $P(E)+P(F)\\ne1$` : `Yes: they can both occur`, errorId: 'disjoint-independent', why: 'Independence is tested by the PRODUCT, nothing else.' },
        { tex: isInd ? 'No: E and F overlap, so they are dependent' : 'Yes: P(E∩F) > 0', errorId: 'disjoint-independent', why: 'Overlapping ≠ dependent; disjoint ≠ independent. Only the product test decides.' },
        { tex: 'Cannot tell from these numbers', errorId: 'union-intersection', why: 'The three given numbers are exactly what the test needs.' },
      ],
      hints: ['One test decides: compare P(E∩F) with P(E)·P(F).',
        `P(E)·P(F) = ${fmt(pA * pB)}.`,
        `Compare with ${fmt(pAB)} and conclude.`],
      solution: [`P(E)P(F) = ${fmt(pA * pB)}; P(E∩F) = ${fmt(pAB)}. ${isInd ? 'Equal ⟹ independent (Def 3.3).' : 'Different ⟹ dependent.'}`],
      markScheme: ['M1: product test computed', 'A1: verdict'],
      methodTag: 'independence',
    }, rng);
  },
});

/* ---------- 9. At-least-one (independent components) ---------- */
T.push({
  id: 'atleast-one', conceptId: 'complement-trick', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const k = d <= 1 ? 2 : 3;
    const ctx = pick(rng, [
      { things: 'missiles', hit: 'hits its target' }, { things: 'free kicks', hit: 'scores' },
      { things: 'backup alarms', hit: 'goes off' }, { things: 'job applications', hit: 'gets an interview' },
    ]);
    const ps = Array.from({ length: k }, () => randInt(rng, 3, 9) / 10);
    const ans = 1 - ps.reduce((a, p) => a * (1 - p), 1);
    const addAns = Math.min(0.999, ps.reduce((a, p) => a + p, 0));
    return numQuestion(`alo-${seed}`, 'atleast-one', 'complement-trick', d, seed, {
      prompt: `There are ${k} independent ${ctx.things}; each ${ctx.hit} with probability ${ps.map(p => fmt(p, 1)).join(', ')} respectively. Find P(**at least one** ${ctx.hit}), to 3 dp. ${d >= 3 ? '(Then ask yourself why adding the probabilities would be wrong.)' : ''}`,
      answer: ans, tol: 1e-3, answerTex: `$${fmt(ans, 4)}$`,
      hints: ['"At least one" — the trigger phrase for which trick?',
        'Complement: 1 − P(none). Independence extends to complements (Thm 3.4).',
        `P(none) = ${ps.map(p => fmt(1 - p, 1)).join('×')} = ${fmt(ps.reduce((a, p) => a * (1 - p), 1), 4)}.`],
      solution: [`P(none) = ${ps.map(p => `(1−${fmt(p, 1)})`).join('')} = ${fmt(ps.reduce((a, p) => a * (1 - p), 1), 4)} (independence of complements).`,
        `P(at least one) = 1 − that = $${fmt(ans, 4)}$ (the missiles pattern, Example 3.12).`,
        `Adding would give ${fmt(addAns, 2)}${addAns >= 1 ? ' — bigger than 1, impossible!' : ', which double-counts overlaps.'}`],
      markScheme: ['M1: complement of "none"', 'M1: product via independence', 'A1: value'],
      methodTag: 'complement',
    });
  },
});

export const GEN1 = T;
