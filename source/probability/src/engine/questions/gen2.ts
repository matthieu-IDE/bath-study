import type { QuestionTemplate } from '../../data/types';
import { binomPmf, expCdf, fmt, fracTex, geomPmf, nCr, pick, poisPmf, poisCdf, randInt, simplify, sum } from '../../lib/utils';
import { mcQuestion, numQuestion, pickName, rngFor } from './helpers';

/* Generators for chapters 4–6. All answers computed exactly. */

const T: QuestionTemplate[] = [];

/* ---------- pmf: find the constant ---------- */
T.push({
  id: 'pmf-constant', conceptId: 'pmf', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = randInt(rng, 3, 5);
    const mode = d >= 2 ? pick(rng, ['linear', 'square']) : 'linear';
    const vals = Array.from({ length: n }, (_, i) => i + 1);
    const weights = vals.map(v => (mode === 'linear' ? v : v * v));
    const W = sum(weights);
    const kAsk = randInt(rng, 2, n);
    const tailW = sum(weights.filter((_, i) => vals[i] >= kAsk));
    const [tn, td] = simplify(tailW, W);
    if (d <= 2) {
      return numQuestion(`pmfc-${seed}`, 'pmf-constant', 'pmf', d, seed, {
        prompt: `A discrete rv X has pmf $P(X=x) = c\\,${mode === 'linear' ? 'x' : 'x^2'}$ for $x \\in \\{1,\\ldots,${n}\\}$ (0 otherwise). Find **c** (fraction or 4 dp).`,
        answer: 1 / W, answerTex: `$${fracTex(1, W)}$`,
        hints: ['What must every pmf sum to?',
          `Σ P(X=x) = c(${weights.join('+')}) = 1.`,
          `c = 1/${W}.`],
        solution: [`Σ over the support: c·${W} = 1 (pmf property, Def 4.4), so c = $${fracTex(1, W)}$.`],
        markScheme: ['M1: Σ = 1 imposed', 'A1: c'],
        methodTag: 'pmf',
      });
    }
    return numQuestion(`pmfc-${seed}`, 'pmf-constant', 'pmf', d, seed, {
      prompt: `X has pmf $P(X=x) = c\\,${mode === 'linear' ? 'x' : 'x^2'}$ on $\\{1,\\ldots,${n}\\}$. Find $P(X \\ge ${kAsk})$ (fraction or 4 dp).`,
      answer: tailW / W, answerTex: `$${fracTex(tn, td)}$`,
      hints: ['First find c by making the pmf sum to 1.',
        `c = 1/${W}. Now add the masses for x = ${kAsk},…,${n}.`,
        `(${weights.filter((_, i) => vals[i] >= kAsk).join('+')})/${W}.`],
      solution: [`c = 1/${W} (Σ=1).`, `P(X≥${kAsk}) = ${tailW}/${W} = $${fracTex(tn, td)}$.`],
      markScheme: ['M1: c found', 'A1: tail sum'],
      methodTag: 'pmf',
    });
  },
});

/* ---------- binomial ---------- */
T.push({
  id: 'binom-prob', conceptId: 'binomial', difficulties: [1, 2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { trial: 'penalty kicks', success: 'scores', taker: pickName(rng) },
      { trial: 'multiple-choice guesses', success: 'is right', taker: pickName(rng) },
      { trial: 'components tested', success: 'is defective', taker: 'the batch' },
      { trial: 'seeds planted', success: 'germinates', taker: 'the packet' },
    ]);
    const n = d <= 1 ? randInt(rng, 3, 5) : randInt(rng, 5, 10);
    const p = pick(rng, d >= 2 ? [0.2, 0.25, 0.3, 0.4, 0.6, 0.75] : [0.25, 0.5, 0.75]);
    if (d <= 2) {
      const k = randInt(rng, 1, n - 1);
      const ans = binomPmf(n, p, k);
      return numQuestion(`bin-${seed}`, 'binom-prob', 'binomial', d, seed, {
        prompt: `Each of ${n} independent ${ctx.trial} ${ctx.success} with probability ${fmt(p)}. Let X count the successes. Find $P(X = ${k})$, to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$\\binom{${n}}{${k}}(${fmt(p)})^{${k}}(${fmt(1 - p)})^{${n - k}} = ${fmt(ans, 4)}$`,
        hints: ['Fixed number of independent identical trials, counting successes — name the distribution.',
          `X ~ Bin(${n}, ${fmt(p)}). Write its pmf.`,
          `C(${n},${k})·${fmt(p)}^${k}·${fmt(1 - p)}^${n - k}.`],
        solution: [`X ~ Bin(${n}, ${fmt(p)}) — independent identical trials (Def 4.7).`,
          `P(X=${k}) = C(${n},${k}) ${fmt(p)}^${k} ${fmt(1 - p)}^${n - k} = ${nCr(n, k)}·${fmt(p ** k, 5)}·${fmt((1 - p) ** (n - k), 5)} = $${fmt(ans, 4)}$.`],
        markScheme: ['B1: Bin(n,p) named with parameters', 'M1: pmf substituted', 'A1: 4 dp'],
        methodTag: 'binomial',
      });
    }
    // d>=3: at least / at most via complement
    const k = randInt(rng, 1, 2);
    const ans = 1 - Array.from({ length: k + 1 }, (_, i) => binomPmf(n, p, i)).reduce((a, b) => a + b, 0);
    return numQuestion(`bin-${seed}`, 'binom-prob', 'binomial', d, seed, {
      prompt: `${ctx.taker} makes ${n} independent ${ctx.trial}; each ${ctx.success} with probability ${fmt(p)}. Find P(**more than ${k}** successes), to 4 dp.`,
      answer: ans, tol: 1e-3, answerTex: `$1-\\sum_{i=0}^{${k}}\\binom{${n}}{i}p^i(1-p)^{${n}-i} = ${fmt(ans, 4)}$`,
      hints: ['"More than k" has many cases — but its complement has few.',
        `P(X>${k}) = 1 − P(X≤${k}) = 1 − [${Array.from({ length: k + 1 }, (_, i) => `P(X=${i})`).join(' + ')}].`,
        `Each term: C(${n},i)(${fmt(p)})^i(${fmt(1 - p)})^{${n}−i}.`],
      solution: [`X ~ Bin(${n},${fmt(p)}).`,
        Array.from({ length: k + 1 }, (_, i) => `P(X=${i}) = ${fmt(binomPmf(n, p, i), 5)}`).join('; ') + '.',
        `P(X>${k}) = 1 − ${fmt(1 - ans, 5)} = $${fmt(ans, 4)}$.`],
      markScheme: ['B1: distribution', 'M1: complement of at-most', 'A1: terms', 'A1: final'],
      methodTag: 'binomial',
    });
  },
});

/* ---------- geometric ---------- */
T.push({
  id: 'geom-wait', conceptId: 'geometric', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { trial: 'rolls a fair dice, hunting a six', p: 1 / 6, pTex: '\\tfrac16' },
      { trial: 'fires arrows that hit gold with probability 0.2', p: 0.2, pTex: '0.2' },
      { trial: 'rings a helpline that connects with probability 0.3', p: 0.3, pTex: '0.3' },
      { trial: 'plays a claw machine that wins with probability 0.1', p: 0.1, pTex: '0.1' },
    ]);
    const name = pickName(rng);
    if (d <= 1) {
      const k = randInt(rng, 2, 4);
      const ans = geomPmf(ctx.p, k);
      return mcQuestion(`geo-${seed}`, 'geom-wait', 'geometric', d, seed, {
        prompt: `${name} repeatedly ${ctx.trial} (independent attempts). Let X be the attempt on which the **first** success occurs. What is $P(X = ${k})$?`,
        choices: [
          { tex: `$(1-${ctx.pTex})^{${k - 1}}\\,${ctx.pTex} = ${fmt(ans, 4)}$`, correct: true },
          { tex: `$(1-${ctx.pTex})^{${k}}\\,${ctx.pTex} = ${fmt((1 - ctx.p) ** k * ctx.p, 4)}$`, errorId: 'geom-convention', why: 'Off by one: exactly k−1 failures come before the success on attempt k.' },
          { tex: `$${ctx.pTex}^{${k}} = ${fmt(ctx.p ** k, 4)}$`, errorId: 'wrong-distribution', why: 'That would be k successes in a row — not first success at attempt k.' },
          { tex: `$(1-${ctx.pTex})^{${k - 1}} = ${fmt((1 - ctx.p) ** (k - 1), 4)}$`, errorId: 'geom-convention', why: 'Forgot the final success factor p.' },
        ],
        hints: ['Tell the story of the sequence: what happens on attempts 1..k?',
          `Attempts 1..${k - 1} fail, attempt ${k} succeeds. Independence multiplies.`,
          `(1−p)^{k−1}·p with p = ${fmt(ctx.p, 3)}.`],
        solution: [`X ~ Geom(${fmt(ctx.p, 3)}), support {1,2,…} (Def 4.8 — this course counts the success attempt).`,
          `P(X=${k}) = (1−p)^{${k - 1}}p = $${fmt(ans, 4)}$.`],
        markScheme: ['B1: Geom identified with course convention', 'A1: value'],
        methodTag: 'geometric',
      }, rng);
    }
    if (d === 2) {
      const nn = randInt(rng, 3, 8);
      const ans = (1 - ctx.p) ** nn;
      return numQuestion(`geo-${seed}`, 'geom-wait', 'geometric', d, seed, {
        prompt: `${name} repeatedly ${ctx.trial}. Find P(the first success takes **more than ${nn} attempts**), to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$(1-p)^{${nn}} = ${fmt(ans, 4)}$`,
        hints: ['"More than n attempts" describes the first n attempts how?',
          'All of the first n attempts failed.',
          `(1−${fmt(ctx.p, 3)})^${nn}.`],
        solution: [`{X > ${nn}} = "no success in the first ${nn} trials" so P = (1−p)^${nn} = $${fmt(ans, 4)}$ (Example 4.10 — no sums needed!).`],
        markScheme: ['M1: survival interpretation', 'A1: value'],
        methodTag: 'geometric',
      });
    }
    const m = randInt(rng, 2, 4), extra = randInt(rng, 2, 4);
    const ans = (1 - ctx.p) ** extra;
    return numQuestion(`geo-${seed}`, 'geom-wait', 'geometric', d, seed, {
      prompt: `${name} repeatedly ${ctx.trial}. Given that the first ${m} attempts all failed, find P(the first success takes more than ${m + extra} attempts in total), to 4 dp.`,
      answer: ans, tol: 1e-3, answerTex: `$(1-p)^{${extra}} = ${fmt(ans, 4)}$`,
      hints: ['Conditional probability — write P(X > m+e | X > m) as a ratio.',
        `P(X>${m + extra})/P(X>${m}) = (1−p)^{${m + extra}}/(1−p)^{${m}}.`,
        'The past cancels: geometric is memoryless.'],
      solution: [`P(X>${m + extra} | X>${m}) = (1−p)^{${m + extra}}/(1−p)^{${m}} = (1−p)^{${extra}} = $${fmt(ans, 4)}$.`,
        'Memorylessness: the failed past does not change the future — the discrete twin of Exp\'s Example 5.5.'],
      markScheme: ['M1: conditional as ratio of survivals', 'A1: cancellation', 'A1: value'],
      methodTag: 'geometric',
    });
  },
});

/* ---------- poisson ---------- */
T.push({
  id: 'pois-count', conceptId: 'poisson', difficulties: [1, 2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    const ctx = pick(rng, [
      { events: 'emails', unit: 'hour', units: 'hours' },
      { events: 'goals in the league', unit: 'match', units: 'matches' },
      { events: 'customers', unit: 'minute', units: 'minutes' },
      { events: 'shooting stars', unit: 'hour', units: 'hours' },
    ]);
    const rate = pick(rng, [0.5, 1, 1.5, 2, 2.5, 3]);
    const windowN = d >= 2 ? randInt(rng, 2, 4) : 1;
    const lam = rate * windowN;
    if (d <= 2) {
      const k = randInt(rng, 0, Math.min(4, Math.round(lam + 1)));
      const ans = poisPmf(lam, k);
      return numQuestion(`poi-${seed}`, 'pois-count', 'poisson', d, seed, {
        prompt: `${ctx.events[0].toUpperCase() + ctx.events.slice(1)} arrive at a constant rate of ${fmt(rate)} per ${ctx.unit}. Find P(exactly ${k} arrive in ${windowN} ${windowN === 1 ? ctx.unit : ctx.units}), to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$\\frac{${fmt(lam)}^{${k}}}{${k}!}e^{-${fmt(lam)}} = ${fmt(ans, 4)}$`,
        hints: ['Events at a constant rate over a window — which distribution, and what parameter?',
          `Scale the rate to the window: λ = ${fmt(rate)} × ${windowN} = ${fmt(lam)} (Freddie's-sneezes move).`,
          `P(X=${k}) = λ^${k} e^{−λ} / ${k}!.`],
        solution: [`X ~ Pois(λ) with λ = ${fmt(rate)}·${windowN} = ${fmt(lam)} (rate × window, Ex 4.12).`,
          `P(X=${k}) = ${fmt(lam)}^${k} e^{−${fmt(lam)}}/${k}! = $${fmt(ans, 4)}$.`],
        markScheme: ['B1: Poisson with λ rescaled to the window', 'M1: pmf', 'A1: value'],
        methodTag: 'poisson',
      });
    }
    if (d === 3) {
      const ans = 1 - poisCdf(lam, 1);
      return numQuestion(`poi-${seed}`, 'pois-count', 'poisson', d, seed, {
        prompt: `${ctx.events[0].toUpperCase() + ctx.events.slice(1)} arrive at rate ${fmt(rate)} per ${ctx.unit}. Find P(**at least 2** arrive in ${windowN} ${ctx.units}), to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$1-e^{-${fmt(lam)}}(1+${fmt(lam)}) = ${fmt(ans, 4)}$`,
        hints: ['λ first: rescale to the window. Then spot "at least".',
          `λ = ${fmt(lam)}. P(X≥2) = 1 − P(X=0) − P(X=1).`,
          `= 1 − e^{−λ} − λe^{−λ}.`],
        solution: [`λ = ${fmt(rate)}·${windowN} = ${fmt(lam)}.`,
          `P(X≥2) = 1 − e^{−${fmt(lam)}} − ${fmt(lam)}e^{−${fmt(lam)}} = $${fmt(ans, 4)}$.`],
        markScheme: ['B1: λ', 'M1: complement with both terms', 'A1: value'],
        methodTag: 'poisson',
      });
    }
    // d=4: binomial → Poisson approximation (typesetter pattern)
    const nBig = pick(rng, [500, 1000, 1500, 2000]);
    const pSmall = pick(rng, [1 / 500, 1 / 250, 1 / 1000]);
    const lam2 = nBig * pSmall;
    const kk = randInt(rng, 0, 2);
    const exact = poisCdf(lam2, kk);
    return numQuestion(`poi-${seed}`, 'pois-count', 'poisson', d, seed, {
      prompt: `A process involves ${nBig} independent trials each "failing" with tiny probability ${fmt(pSmall, 4)}. Using the **Poisson approximation**, find P(at most ${kk} failures), to 4 dp.`,
      answer: exact, tol: 2e-3, answerTex: `$\\sum_{i=0}^{${kk}}\\frac{${fmt(lam2)}^i}{i!}e^{-${fmt(lam2)}} = ${fmt(exact, 4)}$`,
      hints: ['Large n, small p — which approximation does the course allow, with which parameter?',
        `λ = np = ${nBig}·${fmt(pSmall, 4)} = ${fmt(lam2)}.`,
        `Sum the Poisson pmf for i = 0..${kk}.`],
      solution: [`Bin(${nBig}, ${fmt(pSmall, 4)}) ≈ Pois(${fmt(lam2)}) since n large, p small (the typesetter pattern, Ex 4.13).`,
        `P(X≤${kk}) ≈ ${Array.from({ length: kk + 1 }, (_, i) => fmt(poisPmf(lam2, i), 4)).join(' + ')} = $${fmt(exact, 4)}$.`],
      markScheme: ['M1: Poisson approx justified (n large, p small)', 'B1: λ=np', 'A1: value'],
      methodTag: 'poisson',
    });
  },
});

/* ---------- joint tables ---------- */
T.push({
  id: 'joint-table', conceptId: 'joint-discrete', difficulties: [2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    // build a 2x3 joint table with integer 36ths
    const xs = [0, 1], ys = [1, 2, 3];
    let cells: number[][];
    let W = 36;
    do {
      cells = xs.map(() => ys.map(() => randInt(rng, 1, 9)));
      W = sum(cells.flat());
    } while (W === 0);
    const P = (i: number, j: number) => cells[i][j] / W;
    const rowSum = (i: number) => sum(cells[i]) / W;
    const colSum = (j: number) => sum(cells.map(r => r[j])) / W;
    const tableTex = `$$\\begin{array}{c|ccc} & Y=1 & Y=2 & Y=3\\\\\\hline X=0 & ${cells[0].map(c => `\\tfrac{${c}}{${W}}`).join(' & ')}\\\\ X=1 & ${cells[1].map(c => `\\tfrac{${c}}{${W}}`).join(' & ')} \\end{array}$$`;

    if (d === 2) {
      const j = randInt(rng, 0, 2);
      const [an, ad] = simplify(sum(cells.map(r => r[j])), W);
      return mcQuestion(`jt-${seed}`, 'joint-table', 'joint-discrete', d, seed, {
        prompt: `X and Y have joint pmf ${tableTex} Find the **marginal** $P(Y = ${ys[j]})$.`,
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true },
          { tex: `$${fracTex(cells[0][j], W)}$`, errorId: 'marginal-mix', why: 'That is one CELL P(X=0, Y=…) — a joint value, not the marginal.' },
          { tex: `$${fracTex(sum(cells[0]), W)}$`, errorId: 'marginal-mix', why: 'That is the marginal of X (a row total), not of Y.' },
          { tex: `$${fracTex(cells[1][j], W)}$`, errorId: 'marginal-mix' },
        ],
        hints: ['Marginal of Y: which direction do you sum?',
          `Sum the COLUMN for Y=${ys[j]} over all values of X.`,
          `(${cells[0][j]} + ${cells[1][j]})/${W}.`],
        solution: [`P(Y=${ys[j]}) = Σₓ P(X=x, Y=${ys[j]}) = (${cells[0][j]}+${cells[1][j]})/${W} = $${fracTex(an, ad)}$ (marginals = column sums).`],
        markScheme: ['M1: column sum', 'A1: value'],
        methodTag: 'joint',
      }, rng);
    }
    if (d === 3) {
      // E[XY]
      let exy = 0;
      xs.forEach((x, i) => ys.forEach((y, j) => { exy += x * y * P(i, j); }));
      return numQuestion(`jt-${seed}`, 'joint-table', 'covariance', d, seed, {
        prompt: `X and Y have joint pmf ${tableTex} Compute $E[XY]$ (fraction or 4 dp).`,
        answer: exy, tol: 1e-3, answerTex: `$${fmt(exy, 4)}$`,
        hints: ['Bivariate LOTUS: sum xy times the cell probability over ALL cells.',
          'Cells with x = 0 contribute nothing.',
          `E[XY] = ${ys.map((y, j) => `1·${y}·${cells[1][j]}/${W}`).join(' + ')}.`],
        solution: [`E[XY] = ΣΣ xy·P(X=x,Y=y) = (${ys.map((y, j) => `${y}·${cells[1][j]}`).join(' + ')})/${W} = $${fmt(exy, 4)}$ (LOTUS, Ex 6.4).`],
        markScheme: ['M1: bivariate LOTUS over cells', 'A1: value'],
        methodTag: 'joint',
      });
    }
    // d=4: check independence via a cell
    let indep = true;
    outer: for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) {
      if (Math.abs(P(i, j) - rowSum(i) * colSum(j)) > 1e-9) { indep = false; break outer; }
    }
    // find witness cell if dependent
    let wi = 0, wj = 0;
    if (!indep) {
      for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) if (Math.abs(P(i, j) - rowSum(i) * colSum(j)) > 1e-9) { wi = i; wj = j; }
    }
    return mcQuestion(`jt-${seed}`, 'joint-table', 'independence-rvs', d, seed, {
      prompt: `X and Y have joint pmf ${tableTex} Are X and Y independent?`,
      choices: [
        { tex: indep ? 'Yes — every cell equals the product of its marginals' : `No — e.g. $P(X{=}${xs[wi]},Y{=}${ys[wj]}) \\ne P(X{=}${xs[wi]})P(Y{=}${ys[wj]})$`, correct: true },
        { tex: indep ? 'No — X and Y take related values' : 'Yes — all cells are positive', errorId: 'marginal-mix', why: 'Positivity is irrelevant; the test is cell = product of marginals, for EVERY cell (Thm 4.5).' },
        { tex: 'Cannot tell from a joint table', errorId: 'marginal-mix', why: 'The joint table is exactly the full information needed.' },
        { tex: indep ? 'No — the rows are not identical' : 'Yes — rows are proportional', errorId: 'marginal-mix', why: 'Actually proportional rows ⟺ independence… check the arithmetic with the marginals, not by eye.' },
      ],
      hints: ['State the test: P(X=x,Y=y) = P(X=x)P(Y=y) for ALL (x,y).',
        'Compute both marginals first (row and column sums).',
        indep ? 'Check each cell: they all factor.' : `Try the cell (X=${xs[wi]}, Y=${ys[wj]}).`],
      solution: indep
        ? ['All six cells equal the product of their marginals ⟹ independent (Thm 4.5).']
        : [`P(X=${xs[wi]},Y=${ys[wj]}) = ${fmt(P(wi, wj), 4)} but P(X=${xs[wi]})P(Y=${ys[wj]}) = ${fmt(rowSum(wi) * colSum(wj), 4)}.`,
          'One failing cell is a complete disproof — X and Y are dependent.'],
      markScheme: ['M1: marginals computed', 'M1: product test', 'A1: verdict with witness'],
      methodTag: 'joint',
    }, rng);
  },
});

/* ---------- cdf reading ---------- */
T.push({
  id: 'cdf-read', conceptId: 'cdf', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    // staircase on {0,1,2,3} with random pmf in eighths/tenths
    const W = pick(rng, [8, 10, 12]);
    let masses: number[];
    do {
      masses = [randInt(rng, 1, W - 3), 0, 0, 0];
      masses[1] = randInt(rng, 1, W - masses[0] - 2);
      masses[2] = randInt(rng, 1, W - masses[0] - masses[1] - 1);
      masses[3] = W - masses[0] - masses[1] - masses[2];
    } while (masses.some(m => m <= 0));
    const F = (x: number) => sum(masses.slice(0, x + 1)) / W;
    const cdfTex = `$$F_X(x)=\\begin{cases}0 & x<0\\\\ ${[0, 1, 2].map(k => `${fracTex(sum(masses.slice(0, k + 1)), W)} & ${k}\\le x<${k + 1}\\\\`).join(' ')} 1 & x\\ge 3\\end{cases}$$`;
    if (d <= 2) {
      const k = randInt(rng, 1, 3);
      const [an, ad] = simplify(masses[k], W);
      return mcQuestion(`cdf-${seed}`, 'cdf-read', 'cdf', d, seed, {
        prompt: `A discrete rv X has cdf ${cdfTex} Find $P(X = ${k})$.`,
        choices: [
          { tex: `$${fracTex(an, ad)}$`, correct: true, why: `The jump height at ${k}.` },
          { tex: `$${fracTex(sum(masses.slice(0, k + 1)), W)}$`, errorId: 'cdf-direction', why: `That is F(${k}) = P(X ≤ ${k}), the cumulative value.` },
          { tex: `$${fracTex(W - sum(masses.slice(0, k + 1)), W)}$`, errorId: 'cdf-direction', why: `That is P(X > ${k}).` },
          { tex: `$${fracTex(sum(masses.slice(0, k)), W)}$`, errorId: 'cdf-direction', why: `That is F(${k}−) = P(X < ${k}).` },
        ],
        hints: ['For a discrete rv, where does P(X=k) live on the cdf staircase?',
          `P(X=${k}) = F(${k}) − F(${k}−): the jump at ${k}.`,
          `${fracTex(sum(masses.slice(0, k + 1)), W)} − ${fracTex(sum(masses.slice(0, k)), W)}.`],
        solution: [`P(X=${k}) = F(${k}) − lim_{x↑${k}}F(x) = ${fracTex(sum(masses.slice(0, k + 1)), W)} − ${fracTex(sum(masses.slice(0, k)), W)} = $${fracTex(an, ad)}$ (Example 4.6's jump-reading).`],
        markScheme: ['M1: jump = pmf', 'A1: value'],
        methodTag: 'cdf',
      }, rng);
    }
    const a = 0, b = randInt(rng, 1, 2);
    const ans = F(b) - F(a);
    const [an, ad] = simplify(sum(masses.slice(1, b + 1)), W);
    return numQuestion(`cdf-${seed}`, 'cdf-read', 'cdf', d, seed, {
      prompt: `X has the cdf ${cdfTex} Find $P(${a} < X \\le ${b})$ (fraction or 4 dp).`,
      answer: ans, answerTex: `$${fracTex(an, ad)}$`,
      hints: ['There is a one-line formula for interval probabilities from the cdf.',
        `P(a < X ≤ b) = F(b) − F(a) (Thm 4.2).`,
        `F(${b}) − F(${a}) = ${fracTex(sum(masses.slice(0, b + 1)), W)} − ${fracTex(masses[0], W)}.`],
      solution: [`P(${a}<X≤${b}) = F(${b})−F(${a}) = $${fracTex(an, ad)}$.`],
      markScheme: ['M1: F(b)−F(a)', 'A1: value'],
      methodTag: 'cdf',
    });
  },
});

/* ---------- uniform & exponential ---------- */
T.push({
  id: 'unif-exp', conceptId: 'exponential', difficulties: [1, 2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    if (rng() < 0.4) {
      const a = 0, b = pick(rng, [10, 12, 20, 30]);
      const u = randInt(rng, 1, b / 2), v = randInt(rng, u + 1, b - 1);
      const ans = (v - u) / (b - a);
      const [an, ad] = simplify(v - u, b - a);
      return numQuestion(`ue-${seed}`, 'unif-exp', 'uniform', d, seed, {
        prompt: `A tram arrives at a uniformly random time in a ${b}-minute window: $X \\sim \\mathrm{Unif}(0, ${b})$. Find $P(${u} < X \\le ${v})$ (fraction or 4 dp).`,
        answer: ans, answerTex: `$${fracTex(an, ad)}$`,
        hints: ['For Uniform, what does an interval\'s probability depend on?',
          'Only its LENGTH over the total length.',
          `(${v} − ${u})/${b}.`],
        solution: [`P = (v−u)/(b−a) = ${v - u}/${b} = $${fracTex(an, ad)}$ — only length matters (p64 remark).`],
        markScheme: ['M1: length ratio', 'A1: value'],
        methodTag: 'uniform',
      });
    }
    const ctx = pick(rng, [
      { thing: 'the next customer arrives', unit: 'minutes' },
      { thing: 'a lightbulb fails', unit: 'months' },
      { thing: 'the next bus appears', unit: 'minutes' },
    ]);
    const lam = pick(rng, [0.5, 1, 2, 0.25]);
    if (d <= 2) {
      const t = randInt(rng, 1, 4);
      const ans = 1 - expCdf(lam, t);
      return numQuestion(`ue-${seed}`, 'unif-exp', 'exponential', d, seed, {
        prompt: `The time until ${ctx.thing} is $X \\sim \\mathrm{Exp}(${fmt(lam)})$ (${ctx.unit}). Find $P(X > ${t})$, to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$e^{-${fmt(lam)}\\cdot${t}} = ${fmt(ans, 4)}$`,
        hints: ['The exponential\'s survival probability has a one-line form.',
          'P(X > t) = 1 − F(t) = e^{−λt}.',
          `e^{−${fmt(lam)}·${t}}.`],
        solution: [`P(X>${t}) = e^{−λt} = e^{−${fmt(lam * t)}} = $${fmt(ans, 4)}$ (Def 5.2).`],
        markScheme: ['M1: survival form', 'A1: value'],
        methodTag: 'exponential',
      });
    }
    const s = randInt(rng, 1, 3), t = randInt(rng, 1, 3);
    const ans = Math.exp(-lam * t);
    return mcQuestion(`ue-${seed}`, 'unif-exp', 'exponential', d, seed, {
      prompt: `$X \\sim \\mathrm{Exp}(${fmt(lam)})$ is the time (${ctx.unit}) until ${ctx.thing}. You have already waited ${s} ${ctx.unit}. What is P(you wait **more than ${t} additional** ${ctx.unit})?`,
      choices: [
        { tex: `$e^{-${fmt(lam)}\\cdot${t}} = ${fmt(ans, 4)}$`, correct: true, why: 'Memoryless: the elapsed wait is irrelevant.' },
        { tex: `$e^{-${fmt(lam)}\\cdot${s + t}} = ${fmt(Math.exp(-lam * (s + t)), 4)}$`, errorId: 'condition-wrong-event', why: 'That is the UNCONDITIONAL P(X > s+t); you were told X > s already.' },
        { tex: `$e^{-${fmt(lam)}\\cdot${t}} - e^{-${fmt(lam)}\\cdot${s}}$`, errorId: 'cdf-direction' },
        { tex: `$1 - e^{-${fmt(lam)}\\cdot${t}} = ${fmt(1 - ans, 4)}$`, errorId: 'complement-forgot', why: 'That is P(X ≤ t) — the complement of the asked event.' },
      ],
      hints: ['Which special property of Exp deals with "already waited"?',
        'Memorylessness (Ex 5.5): P(X > s+t | X > s) = P(X > t).',
        `So the answer is e^{−λt} — the ${s} ${ctx.unit} of waiting vanish.`],
      solution: [`P(X>s+t|X>s) = e^{−λ(s+t)}/e^{−λs} = e^{−λt} = $${fmt(ans, 4)}$ — the memoryless property.`],
      markScheme: ['M1: memorylessness cited or derived', 'A1: value'],
      methodTag: 'exponential',
    }, rng);
  },
});

/* ---------- pdf with constant ---------- */
T.push({
  id: 'pdf-constant', conceptId: 'pdf', difficulties: [2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    const k = pick(rng, d >= 3 ? [1, 2, 3] : [1, 2]); // f = c x^k on [0,a]
    const a = randInt(rng, 1, 3);
    const c = (k + 1) / a ** (k + 1);
    if (d === 2) {
      return numQuestion(`pdfc-${seed}`, 'pdf-constant', 'pdf', d, seed, {
        prompt: `X has pdf $f(x) = c\\,x^{${k}}$ for $0 \\le x \\le ${a}$ (0 otherwise). Find **c** (fraction or 4 dp).`,
        answer: c, answerTex: `$${fracTex(k + 1, a ** (k + 1))}$`,
        hints: ['What must the total area under a pdf be?',
          `∫₀^${a} c x^${k} dx = c·${a}^${k + 1}/${k + 1} = 1.`,
          `c = ${k + 1}/${a ** (k + 1)}.`],
        solution: [`∫₀^${a} cx^${k}dx = c\\,${a}^{${k + 1}}/${k + 1} = 1 ⟹ c = $${fracTex(k + 1, a ** (k + 1))}$ (total area 1, p68).`],
        markScheme: ['M1: ∫f = 1', 'A1: c'],
        methodTag: 'pdf',
      });
    }
    if (d === 3) {
      const b = a / 2;
      const ans = 1 - (b / a) ** (k + 1);
      return numQuestion(`pdfc-${seed}`, 'pdf-constant', 'pdf', d, seed, {
        prompt: `X has pdf $f(x) = c\\,x^{${k}}$ on $[0, ${a}]$. Find $P(X > ${fmt(b)})$, to 4 dp.`,
        answer: ans, tol: 1e-3, answerTex: `$1-(${fmt(b)}/${a})^{${k + 1}} = ${fmt(ans, 4)}$`,
        hints: ['Find c first (area 1). Then probability = area over the interval.',
          `c = ${k + 1}/${a}^{${k + 1}}. P(X>${fmt(b)}) = ∫ from ${fmt(b)} to ${a}.`,
          `= 1 − (${fmt(b)}/${a})^{${k + 1}}.`],
        solution: [`c = ${k + 1}/${a}^{${k + 1}}.`,
          `P(X>${fmt(b)}) = ∫_{${fmt(b)}}^{${a}} cx^{${k}}dx = 1 − (${fmt(b)}/${a})^{${k + 1}} = $${fmt(ans, 4)}$.`],
        markScheme: ['M1: c', 'M1: correct integral', 'A1: value'],
        methodTag: 'pdf',
      });
    }
    const ex = ((k + 1) / (k + 2)) * a;
    return numQuestion(`pdfc-${seed}`, 'pdf-constant', 'expectation-continuous', d, seed, {
      prompt: `X has pdf $f(x) = c\\,x^{${k}}$ on $[0, ${a}]$. Find $E[X]$ (fraction or 4 dp).`,
      answer: ex, tol: 1e-3, answerTex: `$\\frac{${k + 1}}{${k + 2}}\\cdot ${a} = ${fmt(ex, 4)}$`,
      hints: ['c from area 1; then E[X] = ∫ x f(x) dx.',
        `E[X] = ∫₀^${a} x·cx^${k} dx = c·${a}^{${k + 2}}/${k + 2}.`,
        `Substitute c = ${k + 1}/${a}^{${k + 1}}.`],
      solution: [`c = ${k + 1}/${a}^{${k + 1}}.`,
        `E[X] = c∫₀^${a}x^{${k + 1}}dx = \\frac{${k + 1}}{${k + 2}}·${a} = $${fmt(ex, 4)}$ (Def 6.2). Sanity: inside [0,${a}] ✓.`],
      markScheme: ['M1: c', 'M1: ∫xf', 'A1: value'],
      methodTag: 'expectation',
    });
  },
});

/* ---------- expectation / LOTUS / variance from table ---------- */
T.push({
  id: 'expect-table', conceptId: 'expectation-discrete', difficulties: [1, 2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    const vals = d >= 2 ? [-2, 0, 1, 3].slice(0, 4) : [1, 2, 3, 4];
    const W = pick(rng, [8, 10]);
    let masses: number[];
    do {
      masses = [randInt(rng, 1, W - 3), 0, 0, 0];
      masses[1] = randInt(rng, 1, Math.max(1, W - masses[0] - 2));
      masses[2] = randInt(rng, 1, Math.max(1, W - masses[0] - masses[1] - 1));
      masses[3] = W - masses[0] - masses[1] - masses[2];
    } while (masses.some(m => m <= 0));
    const p = masses.map(m => m / W);
    const EX = sum(vals.map((v, i) => v * p[i]));
    const EX2 = sum(vals.map((v, i) => v * v * p[i]));
    const VX = EX2 - EX * EX;
    const tab = `$$\\begin{array}{c|cccc} x & ${vals.join(' & ')}\\\\\\hline P(X=x) & ${masses.map(m => `\\tfrac{${m}}{${W}}`).join(' & ')} \\end{array}$$`;
    if (d <= 1) {
      return numQuestion(`ext-${seed}`, 'expect-table', 'expectation-discrete', d, seed, {
        prompt: `X has pmf ${tab} Find $E[X]$ (fraction or 4 dp).`,
        answer: EX, tol: 1e-3, answerTex: `$${fmt(EX, 4)}$`,
        hints: ['Values × probabilities, added.',
          `E[X] = ${vals.map((v, i) => `${v}·${masses[i]}/${W}`).join(' + ')}.`,
          `= ${fmt(EX, 4)}.`],
        solution: [`E[X] = Σ xP(X=x) = ${fmt(EX, 4)} (Def 6.1).`],
        markScheme: ['M1: Σxp', 'A1: value'],
        methodTag: 'expectation',
      });
    }
    if (d === 2) {
      return mcQuestion(`ext-${seed}`, 'expect-table', 'lotus', d, seed, {
        prompt: `X has pmf ${tab} What is $E[X^2]$?`,
        choices: [
          { tex: `$${fmt(EX2, 4)}$`, correct: true },
          { tex: `$${fmt(EX * EX, 4)}$`, errorId: 'lotus', why: 'That is (E[X])² — the "law of the incompetent statistician". Square the VALUES, keep the weights.' },
          { tex: `$${fmt(Math.abs(EX), 4)}$`, errorId: 'lotus' },
          { tex: `$${fmt(EX2 - EX * EX, 4)}$`, errorId: 'variance-formula', why: 'That is Var(X) = E[X²] − (E[X])², not E[X²] itself.' },
        ],
        hints: ['LOTUS: transform the values, keep the probabilities.',
          `E[X²] = ${vals.map((v, i) => `${v}²·${masses[i]}/${W}`).join(' + ')}.`,
          `= ${fmt(EX2, 4)}.`],
        solution: [`E[X²] = Σ x²P(X=x) = ${fmt(EX2, 4)} (Thm 6.3 — never square E[X]).`],
        markScheme: ['M1: LOTUS', 'A1: value'],
        methodTag: 'expectation',
      }, rng);
    }
    if (d === 3) {
      return numQuestion(`ext-${seed}`, 'expect-table', 'variance', d, seed, {
        prompt: `X has pmf ${tab} Find $\\mathrm{Var}(X)$, to 4 dp.`,
        answer: VX, tol: 1e-3, answerTex: `$${fmt(EX2, 4)} - (${fmt(EX, 4)})^2 = ${fmt(VX, 4)}$`,
        hints: ['Moment form: two ingredients.',
          `E[X] = ${fmt(EX, 4)}; E[X²] by LOTUS = ${fmt(EX2, 4)}.`,
          'Var = E[X²] − (E[X])². Must be ≥ 0!'],
        solution: [`E[X] = ${fmt(EX, 4)}, E[X²] = ${fmt(EX2, 4)}.`,
          `Var(X) = ${fmt(EX2, 4)} − ${fmt(EX * EX, 4)} = $${fmt(VX, 4)}$ ≥ 0 ✓ (Thm 6.6).`],
        markScheme: ['M1: E[X]', 'M1: E[X²] LOTUS', 'A1: variance'],
        methodTag: 'variance',
      });
    }
    const aa = randInt(rng, 2, 4), bb = randInt(rng, 1, 6);
    const ans = aa * aa * VX;
    return mcQuestion(`ext-${seed}`, 'expect-table', 'variance', d, seed, {
      prompt: `X has pmf ${tab} (so $\\mathrm{Var}(X) = ${fmt(VX, 4)}$). What is $\\mathrm{Var}(${aa}X ${bb >= 0 ? '+' : '−'} ${Math.abs(bb)})$?`,
      choices: [
        { tex: `$${aa}^2\\cdot${fmt(VX, 4)} = ${fmt(ans, 4)}$`, correct: true },
        { tex: `$${aa}\\cdot${fmt(VX, 4)} + ${bb} = ${fmt(aa * VX + bb, 4)}$`, errorId: 'variance-linear', why: 'Variance is not linear: the constant vanishes and the coefficient SQUARES.' },
        { tex: `$${aa}\\cdot${fmt(VX, 4)} = ${fmt(aa * VX, 4)}$`, errorId: 'variance-linear', why: 'Coefficient must be squared: Var(aX+b) = a²Var(X).' },
        { tex: `$${aa}^2\\cdot${fmt(VX, 4)} + ${bb} = ${fmt(ans + bb, 4)}$`, errorId: 'variance-linear', why: 'Shifting by a constant does NOT shift the variance.' },
      ],
      hints: ['Does adding a constant change spread? Does scaling?',
        'Var(aX+b) = a²Var(X) (Thm 6.8).',
        `${aa}² × ${fmt(VX, 4)}.`],
      solution: [`Var(${aa}X±${Math.abs(bb)}) = ${aa}²Var(X) = $${fmt(ans, 4)}$ — shifts free, scales squared.`],
      markScheme: ['M1: a² rule', 'A1: value'],
      methodTag: 'variance',
    }, rng);
  },
});

/* ---------- covariance / variance of sums ---------- */
T.push({
  id: 'cov-sums', conceptId: 'variance-sums', difficulties: [2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    const vx = randInt(rng, 2, 9), vy = randInt(rng, 2, 9);
    const cov = randInt(rng, -3, 3);
    if (d === 2 || cov === 0) {
      const a = randInt(rng, 1, 3), b = randInt(rng, 1, 3);
      const ans = a * a * vx + b * b * vy;
      return numQuestion(`cov-${seed}`, 'cov-sums', 'variance-sums', d, seed, {
        prompt: `X and Y are **independent** with $\\mathrm{Var}(X) = ${vx}$ and $\\mathrm{Var}(Y) = ${vy}$. Find $\\mathrm{Var}(${a}X - ${b}Y)$.`,
        answer: ans, answerTex: `$${a}^2\\cdot${vx} + ${b}^2\\cdot${vy} = ${ans}$`,
        hints: ['Independent ⟹ what happens to the cross-term?',
          'Var(aX−bY) = a²Var(X) + b²Var(Y) (Cov = 0).',
          `${a * a}·${vx} + ${b * b}·${vy}. Note the PLUS.`],
        solution: [`Independence ⟹ Cov = 0 (Cor 6.4); Var(${a}X−${b}Y) = ${a}²·${vx} + ${b}²·${vy} = $${ans}$ (Cor 6.7).`,
          'Subtracting an independent noisy quantity still ADDS its variance.'],
        markScheme: ['M1: cross-term zero by independence', 'A1: a², b² and the + sign', 'A1: value'],
        methodTag: 'variance-sums',
      });
    }
    if (d === 3) {
      const ans = vx + vy - 2 * cov;
      return mcQuestion(`cov-${seed}`, 'cov-sums', 'variance-sums', d, seed, {
        prompt: `$\\mathrm{Var}(X) = ${vx}$, $\\mathrm{Var}(Y) = ${vy}$, $\\mathrm{Cov}(X,Y) = ${cov}$. Find $\\mathrm{Var}(X - Y)$.`,
        choices: [
          { tex: `$${vx} + ${vy} - 2(${cov}) = ${ans}$`, correct: true },
          { tex: `$${vx} - ${vy} = ${vx - vy}$`, errorId: 'variance-linear', why: 'Variances do not subtract!' },
          { tex: `$${vx} + ${vy} + 2(${cov}) = ${vx + vy + 2 * cov}$`, errorId: 'cov-sign', why: 'Sign slip: b = −1 makes the cross-term −2Cov.' },
          { tex: `$${vx} + ${vy} = ${vx + vy}$`, errorId: 'cov-sign', why: 'Cov ≠ 0 here — the cross-term cannot be dropped.' },
        ],
        hints: ['Write the general formula with a = 1, b = −1.',
          'Var(X−Y) = Var(X) + Var(Y) − 2Cov(X,Y).',
          `${vx} + ${vy} − ${2 * cov}.`],
        solution: [`Var(X−Y) = Var+Var−2Cov = ${vx}+${vy}−${2 * cov} = $${ans}$ (Ex 6.11).`],
        markScheme: ['M1: formula with signs', 'A1: value'],
        methodTag: 'variance-sums',
      }, rng);
    }
    const ans = vx - vy;
    return numQuestion(`cov-${seed}`, 'cov-sums', 'covariance', d, seed, {
      prompt: `$\\mathrm{Var}(X) = ${vx}$, $\\mathrm{Var}(Y) = ${vy}$, $\\mathrm{Cov}(X,Y) = ${cov}$. Compute $\\mathrm{Cov}(X+Y,\\ X-Y)$.`,
      answer: ans, answerTex: `$${vx} - ${vy} = ${ans}$`,
      hints: ['Expand with bilinearity, like multiplying brackets.',
        'Cov(X+Y, X−Y) = Cov(X,X) − Cov(X,Y) + Cov(Y,X) − Cov(Y,Y).',
        'The cross terms cancel (symmetry): Var(X) − Var(Y).'],
      solution: [`Bilinearity (Cor 6.5): Cov(X+Y,X−Y) = Var(X) − Cov(X,Y) + Cov(Y,X) − Var(Y) = Var(X) − Var(Y) = $${ans}$ (Example 6.13).`,
        'Neat: the answer ignores Cov(X,Y) entirely.'],
      markScheme: ['M1: bilinear expansion', 'A1: cancellation', 'A1: value'],
      methodTag: 'covariance',
    });
  },
});

/* ---------- LLN / sample mean ---------- */
T.push({
  id: 'lln-mean', conceptId: 'lln', difficulties: [2, 3],
  generate(seed, d) {
    const rng = rngFor(seed);
    const s2 = pick(rng, [4, 9, 12, 25, 36]);
    if (d === 2) {
      const n = pick(rng, [25, 50, 100, 400]);
      return numQuestion(`lln-${seed}`, 'lln-mean', 'lln', d, seed, {
        prompt: `$X_1,\\ldots,X_{${n}}$ are iid with variance $\\sigma^2 = ${s2}$. Find $\\mathrm{Var}(\\bar X_{${n}})$, the variance of the sample average (fraction or 4 dp).`,
        answer: s2 / n, answerTex: `$${fracTex(s2, n)}$`,
        hints: ['X̄ = (1/n)ΣXᵢ — apply the variance rules with coefficients 1/n.',
          'Var(X̄) = (1/n²)·ΣVar(Xᵢ) by independence.',
          `= n·σ²/n² = σ²/n = ${s2}/${n}.`],
        solution: [`Var(X̄ₙ) = σ²/n = $${fracTex(s2, n)}$ — the LLN's engine (p91).`],
        markScheme: ['M1: 1/n² and independence', 'A1: σ²/n'],
        methodTag: 'lln',
      });
    }
    const target = pick(rng, [0.25, 0.1, 0.5, 0.04]);
    const ans = Math.ceil(s2 / target);
    return numQuestion(`lln-${seed}`, 'lln-mean', 'lln', d, seed, {
      prompt: `iid measurements have variance $\\sigma^2 = ${s2}$. How many measurements $n$ are needed so that the sample average satisfies $\\mathrm{Var}(\\bar X_n) \\le ${fmt(target)}$? (smallest integer n)`,
      answer: ans, tol: 0, answerTex: `$n = ${ans}$`,
      hints: ['Write Var(X̄ₙ) in terms of n and set up the inequality.',
        `σ²/n ≤ ${fmt(target)}.`,
        `n ≥ ${s2}/${fmt(target)} = ${fmt(s2 / target, 2)}; round up.`],
      solution: [`σ²/n ≤ ${fmt(target)} ⟺ n ≥ ${fmt(s2 / target, 1)} ⟹ n = $${ans}$.`,
        'This is how sample sizes are chosen: averaging beats noise at rate 1/n.'],
      markScheme: ['M1: σ²/n', 'M1: inequality solved', 'A1: integer round-up'],
      methodTag: 'lln',
    });
  },
});

/* ---------- random walk ---------- */
T.push({
  id: 'walk-zero', conceptId: 'random-walk-intro', difficulties: [2, 3, 4],
  generate(seed, d) {
    const rng = rngFor(seed);
    if (d <= 2) {
      const n = pick(rng, [4, 6, 8]);
      const ans = nCr(n, n / 2) / 2 ** n;
      const [an, ad] = simplify(nCr(n, n / 2), 2 ** n);
      return numQuestion(`walk-${seed}`, 'walk-zero', 'random-walk-intro', d, seed, {
        prompt: `A symmetric random walk steps ±1 with probability ½ each. Find P(the walk is back at 0 after ${n} steps) (fraction or 4 dp).`,
        answer: ans, answerTex: `$\\binom{${n}}{${n / 2}}2^{-${n}} = ${fracTex(nCr(n, n / 2), 2 ** n)}$`,
        hints: ['To finish at 0, how many of the n steps must be "up"?',
          `Exactly ${n / 2}. Count the sequences with that many ups.`,
          `C(${n},${n / 2}) out of 2^${n} equally likely paths.`],
        solution: [`|Ω| = 2^${n} paths; favourable = C(${n},${n / 2}) = ${nCr(n, n / 2)} (choose which steps go up).`,
          `P = $${fracTex(nCr(n, n / 2), 2 ** n)}$ ≈ ${fmt(ans, 4)} (Example 2.15).`],
        markScheme: ['M1: equal ups/downs', 'M1: C(n,n/2)/2ⁿ', 'A1: value'],
        methodTag: 'counting',
      });
    }
    if (d === 3) {
      const n = pick(rng, [5, 7, 9]);
      return mcQuestion(`walk-${seed}`, 'walk-zero', 'random-walk-intro', d, seed, {
        prompt: `A symmetric ±1 random walk starts at 0. What is P(it is at 0 after ${n} steps)?`,
        choices: [
          { tex: '$0$ — impossible', correct: true, why: `After an odd number of steps the walk is at an odd position; 0 is even.` },
          { tex: `$\\binom{${n}}{${(n - 1) / 2}}2^{-${n}}$`, errorId: 'binom-support', why: 'The formula only applies for even n — check parity first!' },
          { tex: `$2^{-${n}}$`, errorId: 'wrong-sample-space' },
          { tex: `$\\tfrac12$`, errorId: 'wrong-sample-space' },
        ],
        hints: ['Think parity: each step changes position by ±1.',
          `After ${n} steps, position has the same parity as ${n}.`,
          `${n} is odd ⟹ position is odd ⟹ cannot be 0.`],
        solution: [`Position after n steps ≡ n (mod 2). ${n} odd ⟹ walk is at an odd integer, never 0. P = 0.`,
          'The parity sentence alone earns the marks (Example 2.15\'s "why?").'],
        markScheme: ['B1: parity argument stated'],
        methodTag: 'counting',
      }, rng);
    }
    const n = pick(rng, [4, 6]);
    const target = 2;
    const up = (n + target) / 2;
    const ans = nCr(n, up) / 2 ** n;
    const [an, ad] = simplify(nCr(n, up), 2 ** n);
    return numQuestion(`walk-${seed}`, 'walk-zero', 'random-walk-intro', d, seed, {
      prompt: `A symmetric ±1 walk starts at 0. Find P(it is at position **+${target}** after ${n} steps) (fraction or 4 dp).`,
      answer: ans, answerTex: `$${fracTex(nCr(n, up), 2 ** n)}$`,
      hints: [`With u up-steps and ${n}−u down-steps, the position is u − (${n}−u).`,
        `Solve 2u − ${n} = ${target}: u = ${up}.`,
        `C(${n},${up})/2^${n}.`],
      solution: [`u − (n−u) = ${target} ⟹ u = ${up}.`, `P = C(${n},${up})/2^${n} = $${fracTex(nCr(n, up), 2 ** n)}$.`],
      markScheme: ['M1: solve for up-steps', 'A1: count', 'A1: value'],
      methodTag: 'counting',
    });
  },
});

export const GEN2 = T;
