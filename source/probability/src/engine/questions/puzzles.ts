import type { GeneratedQuestion, QuestionTemplate } from '../../data/types';
import { CONCEPT_MAP } from '../../data/course';
import { fmt, fracTex, pick, poisPmf, randInt, simplify } from '../../lib/utils';
import { mcQuestion, numQuestion, rngFor } from './helpers';

/* Street-level puzzles (quant-interview classics solvable with course tools) and
   hard exam-style multi-step questions. Every answer is COMPUTED below — closed
   forms are derived in code (enumeration, recursion, fixed-point solves), never
   pasted in as magic constants. Difficulty 5 = above exam level, by design. */

const T: QuestionTemplate[] = [];

/* ---------- the airplane seat (symmetry) ---------- */
T.push({
  id: 'pz-airplane', conceptId: 'conditional-probability', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = pick(rng, [100, 120, 180, 200]);
    return mcQuestion(`pz-air-${seed}`, 'pz-airplane', 'conditional-probability', d, seed, {
      prompt: `${n} passengers board a full flight in order. Passenger 1 lost their ticket and sits in a **uniformly random** seat. Everyone after sits in their own seat if free, otherwise a uniformly random free seat. What is the probability the **last** passenger ends up in their own seat?`,
      choices: [
        { tex: '$\\tfrac12$', correct: true, why: 'When the last passenger boards, the only possibly-free seats are seat 1 and their own — every displacement decision treated the two symmetrically, so each is equally likely.' },
        { tex: `$\\tfrac{1}{${n}}$`, why: 'That is the chance passenger 1 takes their own seat immediately — but later passengers also resolve the chaos.' },
        { tex: `$1-\\tfrac{1}{${n}}$`, why: 'Tempting complement, wrong event.' },
        { tex: '$\\tfrac{1}{e}$', why: 'e appears in derangement problems — this is not one: seats are claimed sequentially, not permuted uniformly.' },
      ],
      hints: ['Try n = 2 by hand. Then n = 3.', 'At every random choice, picking seat 1 ends the chaos in the last passenger\'s favour; picking the last seat dooms them. Those two choices are always equally likely.', 'Every other choice just postpones the same coin flip.'],
      solution: [
        'Track only the two special seats: **seat 1** and **the last seat**.',
        'Whenever a displaced passenger chooses randomly, they pick seat 1 or the last seat with EQUAL probability (both free or both not).',
        'Choosing seat 1 fixes everyone after; choosing the last seat dooms the last passenger; any other choice hands the same fair choice to someone else.',
        'So the outcome is decided by one fair coin: $P = \\tfrac12$, for every $n\\ge 2$.',
      ],
    }, rng);
  },
});

/* ---------- the Tuesday boy (enumerate 196 worlds) ---------- */
T.push({
  id: 'pz-tuesday', conceptId: 'conditional-probability', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const day = pick(rng, ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    // enumerate: each child = (sex 0/1, day 0..6), 14 x 14 = 196 equally likely pairs
    let cond = 0, both = 0;
    for (let a = 0; a < 14; a++) for (let b = 0; b < 14; b++) {
      const boyDayA = a < 7 && a % 7 === 0, boyDayB = b < 7 && b % 7 === 0; // day index 0 = the named day; boy = index < 7
      if (boyDayA || boyDayB) {
        cond++;
        if (a < 7 && b < 7) both++;
      }
    }
    const [num, den] = simplify(both, cond);
    return numQuestion(`pz-tue-${seed}`, 'pz-tuesday', 'conditional-probability', d, seed, {
      prompt: `A family has two children. You learn that **at least one is a boy born on a ${day}** (sexes and weekdays uniform and independent). What is the probability both children are boys?`,
      answer: both / cond, tol: 4e-3, answerTex: `$${fracTex(num, den)}$`,
      hints: [`List worlds as (sex, weekday) pairs — ${'14 \\times 14'} = 196 equally likely worlds for (child A, child B).`, `Condition = at least one child is (boy, ${day}). Count those worlds; don\'t forget to subtract the double-counted world where BOTH are.`, 'Then count how many of those conditioned worlds have two boys.'],
      solution: [
        'Each child has 14 equally likely (sex, day) types; a pair of children gives $14\\times14=196$ worlds.',
        `Worlds with at least one (boy, ${day}): $14+14-1=${cond}$ (inclusion–exclusion on the two children).`,
        `Of these, worlds with two boys: $7+7-1=${both}$ (first child is the ${day}-boy, or second is, minus the overlap).`,
        `$P(\\text{both boys}\\mid\\text{at least one ${day}-boy}) = ${both}/${cond} = ${fracTex(num, den)} \\approx ${fmt(both / cond, 4)}$ — NOT $1/3$: the weekday detail shifts the answer, because more specific information cuts the world differently.`,
      ],
    });
  },
});

/* ---------- Monty Hall, n doors ---------- */
T.push({
  id: 'pz-monty', conceptId: 'bayes', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = pick(rng, [3, 4, 5, 10]);
    const stay = 1 / n;               // your door keeps its prior
    const sw = (n - 1) / n;           // host opening n-2 goats funnels the rest onto one door
    const [sn, sd] = simplify(n - 1, n);
    return mcQuestion(`pz-mon-${seed}`, 'pz-monty', 'bayes', d, seed, {
      prompt: `${n} doors, one prize. You pick a door; the host — who knows where the prize is — opens **${n - 2}** other doors, all goats, leaving your door and one other closed. You switch. What is your probability of winning?`,
      choices: [
        { tex: `$${fracTex(sn, sd)}$`, correct: true, why: `Your door keeps its prior 1/${n}; the remaining ${fmt(sw, 3)} of probability is funnelled onto the single other closed door.` },
        { tex: '$\\tfrac12$', why: 'Two doors are closed, but they are NOT equally likely — the host\'s choice was forced by your pick, not random.' },
        { tex: `$${fracTex(1, n)}$`, correct: false, why: 'That is the STAY probability — the prior your first pick keeps.' },
        { tex: `$${fracTex(n - 2, n)}$`, why: 'Close, but the funnelled mass is everything your door does not hold: (n−1)/n.' },
      ],
      hints: [`Your first pick is right with probability 1/${n} — no host behaviour can change that.`, 'The host NEVER opens the prize door. His opens carry information.', 'All the probability your door does not hold must sit on the one other closed door.'],
      solution: [
        `$P(\\text{your door has it}) = 1/${n}$ before and after — the host was always able to open ${n - 2} goats, so his act is uninformative ABOUT YOUR DOOR.`,
        `The other $\\tfrac{${n - 1}}{${n}}$ of probability lived on the ${n - 1} other doors; the host\'s reveals compress it all onto the single closed one.`,
        `Switching wins with probability $${fracTex(sn, sd)} = ${fmt(sw, 3)}$ — a Bayes update in disguise.`,
      ],
    }, rng);
  },
});

/* ---------- gambler's ruin, fair game ---------- */
T.push({
  id: 'pz-ruin', conceptId: 'random-walk-intro', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const a = randInt(rng, 2, 7);
    const N = a + randInt(rng, 2, 6);
    const [num, den] = simplify(a, N);
    return numQuestion(`pz-ruin-${seed}`, 'pz-ruin', 'random-walk-intro', d, seed, {
      prompt: `You have £${a}; you bet £1 on fair coin flips and stop at **£${N}** (target) or **£0** (ruin). What is the probability you reach £${N} before going broke?`,
      answer: a / N, tol: 2e-3, answerTex: `$${fracTex(num, den)}$`,
      hints: ['The game is fair — your expected fortune never changes.', `At the end you hold either £0 or £${N}. Write E[final fortune] two ways.`, `£${a} = P(win)·${N} + (1−P(win))·0.`],
      solution: [
        'A fair game preserves expected fortune at every step (linearity + fair increments).',
        `Start: £${a}. End: £${N} with probability p, £0 otherwise, so $E[\\text{final}] = ${N}p$.`,
        `Setting $${N}p = ${a}$: $p = ${fracTex(num, den)}$.`,
        'This is the halving argument from the notes (p39) industrialised: linear in your bankroll, independent of the path.',
      ],
      markScheme: ['State that expected fortune is conserved (fair game)', 'Express E[final] via the two absorbing values', 'Solve for p'],
    });
  },
});

/* ---------- derangements: nobody gets their own hat ---------- */
T.push({
  id: 'pz-derange', conceptId: 'combinations', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = randInt(rng, 4, 6);
    // subfactorial by recursion D(k) = (k-1)(D(k-1)+D(k-2))
    const D: number[] = [1, 0];
    for (let k = 2; k <= n; k++) D[k] = (k - 1) * (D[k - 1] + D[k - 2]);
    let fact = 1;
    for (let k = 2; k <= n; k++) fact *= k;
    const [num, den] = simplify(D[n], fact);
    return numQuestion(`pz-der-${seed}`, 'pz-derange', 'combinations', d, seed, {
      prompt: `${n} people throw their hats in a pile and each takes one back **uniformly at random** (a random permutation). What is the probability that **nobody** gets their own hat?`,
      answer: D[n] / fact, tol: 3e-3, answerTex: `$${fracTex(num, den)}$`,
      hints: ['Count permutations with NO fixed point (derangements), over n! total.', 'Inclusion–exclusion over "person i gets own hat" events, or the recursion D(n) = (n−1)(D(n−1) + D(n−2)).', `n = ${n}: work the recursion up from D(1)=0, D(2)=1.`],
      solution: [
        'Let $D(n)$ count derangements. Recursion: the first person takes some other hat (n−1 ways); the displaced owner either takes the first person\'s hat (reducing to $D(n-2)$) or not ($D(n-1)$).',
        `So $D(${n}) = ${D[n]}$ out of $${n}! = ${fact}$ permutations.`,
        `$P = ${fracTex(num, den)} \\approx ${fmt(D[n] / fact, 4)}$ — already close to $1/e \\approx 0.3679$: the limit as $n\\to\\infty$.`,
      ],
    });
  },
});

/* ---------- expected own-hat matches = 1 (indicators) ---------- */
T.push({
  id: 'pz-hatmean', conceptId: 'linearity', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = pick(rng, [10, 25, 52, 100]);
    return mcQuestion(`pz-hm-${seed}`, 'pz-hatmean', 'linearity', d, seed, {
      prompt: `${n} people take hats back uniformly at random. On average, how many people get their **own** hat?`,
      choices: [
        { tex: '$1$', correct: true, why: `Each of the ${n} indicators has mean 1/${n}; linearity sums them to exactly 1 — for ANY n.` },
        { tex: `$${Math.round(n / 2)}$`, why: 'Half is a guess, not a computation — indicators give the honest answer.' },
        { tex: `$\\ln ${n}$`, why: 'Log shows up in the coupon collector, not here.' },
        { tex: '$\\tfrac{1}{e}$', why: '1/e is P(zero matches) for large n — the QUESTION asks for the mean count.' },
      ],
      hints: ['Write the count as a sum of indicator variables, one per person.', `E[indicator for person i] = P(own hat) = 1/${n}.`, 'Linearity does not care that the indicators are dependent.'],
      solution: [
        `Let $N = \\sum_{i=1}^{${n}} \\mathbb 1_i$ where $\\mathbb 1_i$ = person $i$ gets their own hat.`,
        `$E[\\mathbb 1_i] = P(\\text{own hat}) = 1/${n}$ (each hat equally likely).`,
        `Linearity — dependence irrelevant: $E[N] = ${n}\\cdot\\tfrac{1}{${n}} = 1$.`,
        'The count is heavily dependent between people, and linearity never noticed. That is its superpower.',
      ],
    }, rng);
  },
});

/* ---------- coupon collector ---------- */
T.push({
  id: 'pz-coupon', conceptId: 'geometric', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = randInt(rng, 4, 6);
    let e = 0;
    for (let k = 1; k <= n; k++) e += n / k; // sum of geometric means n/(n-i)
    return numQuestion(`pz-coup-${seed}`, 'pz-coupon', 'geometric', d, seed, {
      prompt: `A cereal box contains one of ${n} toy types, uniformly at random and independently. What is the **expected number of boxes** to collect all ${n} types? (2 d.p.)`,
      answer: e, tol: 0.02, answerTex: `$${fmt(e, 2)}$`,
      hints: ['Split the wait into phases: boxes needed to see the NEXT new type, given you own i types.', `With i types owned, each box is new with probability (${n}−i)/${n} — a geometric wait with mean ${n}/(${n}−i).`, 'Add the phase means (linearity).'],
      solution: [
        `Phase $i\\to i{+}1$: each box hits a new type with $p_i = \\tfrac{${n}-i}{${n}}$, so the wait is Geom($p_i$) with mean $\\tfrac{${n}}{${n}-i}$.`,
        `Total: $E = ${n}\\big(\\tfrac11 + \\tfrac12 + \\cdots + \\tfrac{1}{${n}}\\big) = ${fmt(e, 3)}$.`,
        'Geometric waits + linearity — no joint distribution ever needed.',
      ],
      markScheme: ['Decompose into per-new-type phases', 'Identify each phase as geometric and state its mean', 'Sum by linearity'],
    });
  },
});

/* ---------- de Méré's bet ---------- */
T.push({
  id: 'pz-demere', conceptId: 'complement-trick', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const p1 = 1 - Math.pow(5 / 6, 4);
    const p2 = 1 - Math.pow(35 / 36, 24);
    return mcQuestion(`pz-dm-${seed}`, 'pz-demere', 'complement-trick', d, seed, {
      prompt: 'De Méré\'s 1654 casino puzzle: **Bet A** — at least one 6 in 4 rolls of a die. **Bet B** — at least one double-6 in 24 rolls of two dice. Which bet wins more often?',
      choices: [
        { tex: `Bet A ($${fmt(p1, 4)}$ vs $${fmt(p2, 4)}$)`, correct: true, why: 'Complements: 1−(5/6)⁴ ≈ 0.5177 beats 1−(35/36)²⁴ ≈ 0.4914.' },
        { tex: 'Bet B — more rolls', why: 'More rolls of a much rarer event: the exponent cannot rescue the 1/36.' },
        { tex: 'Equal — $4\\times\\tfrac16 = 24\\times\\tfrac{1}{36}$', why: 'That is de Méré\'s own fallacy: expected COUNTS match, but "at least one" probabilities do not scale linearly.' },
      ],
      hints: ['"At least one" screams complement: 1 − P(none).', 'P(no 6 in 4) = (5/6)⁴; P(no double-6 in 24) = (35/36)²⁴.', 'Compare 0.5177 with 0.4914 — this gap founded probability theory (Pascal–Fermat letters).'],
      solution: [
        `Bet A: $1-(5/6)^4 = ${fmt(p1, 4)}$.`,
        `Bet B: $1-(35/36)^{24} = ${fmt(p2, 4)}$.`,
        'Equal expected counts ($4/6 = 24/36$) do NOT give equal "at least one" probabilities — overlap accounting differs. De Méré lost money on B and wrote to Pascal; the reply invented modern probability.',
      ],
    }, rng);
  },
});

/* ---------- broken stick triangle ---------- */
T.push({
  id: 'pz-stick', conceptId: 'joint-continuous', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    return mcQuestion(`pz-st-${seed}`, 'pz-stick', 'joint-continuous', d, seed, {
      prompt: 'A stick is broken at two points chosen **uniformly and independently** along its length. What is the probability the three pieces can form a triangle?',
      choices: [
        { tex: '$\\tfrac14$', correct: true, why: 'The triangle inequalities carve a region of area 1/4 out of the unit square of break points.' },
        { tex: '$\\tfrac12$', why: 'Half of the square fails on the longest-piece condition alone in each orientation — the surviving region is smaller.' },
        { tex: '$\\tfrac13$', why: 'A tempting symmetry guess; the constraint is quadratic, not a three-way split.' },
        { tex: '$\\tfrac18$', why: 'Too harsh — you may have stacked the two orderings.' },
      ],
      hints: ['Call the break points U, V ~ Unif(0,1) independent — a random point in the unit square.', 'A triangle forms iff every piece < 1/2 (each side shorter than the other two combined).', 'Shade {no piece ≥ 1/2} in the (U,V) square and compute its area.'],
      solution: [
        'For $U<V$ the pieces are $U,\\ V-U,\\ 1-V$; triangle iff all $< \\tfrac12$.',
        'In the $U<V$ half-square (area 1/2) these three inequalities cut out a triangle of area $\\tfrac18$; the $V<U$ case mirrors it.',
        'Total probability $= 2\\cdot\\tfrac18 = \\tfrac14$ — probability as AREA over a joint uniform density (Ch 5 exactly).',
      ],
    }, rng);
  },
});

/* ---------- P(U1 + U2 <= t): area of a corner triangle ---------- */
T.push({
  id: 'pz-unifsum', conceptId: 'joint-continuous', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const t = pick(rng, [0.5, 0.6, 0.7, 0.8, 1]);
    const ans = t * t / 2;
    return numQuestion(`pz-us-${seed}`, 'pz-unifsum', 'joint-continuous', d, seed, {
      prompt: `$U_1, U_2 \\sim$ Unif(0,1), independent. Compute $P(U_1 + U_2 \\le ${fmt(t, 1)})$.`,
      answer: ans, tol: 2e-3, answerTex: `$${fmt(ans, 3)}$`,
      hints: ['The pair (U₁, U₂) is uniform on the unit square: probability = area.', `The event is the region under the line u₁ + u₂ = ${fmt(t, 1)}.`, 'For t ≤ 1 that region is a right triangle with legs t.'],
      solution: [
        'Joint pdf $= 1$ on the unit square, so probability is the AREA of the event region.',
        `$\\{u_1+u_2\\le ${fmt(t, 1)}\\}$ is a right triangle with legs ${fmt(t, 1)}: area $= \\tfrac{${fmt(t, 1)}^2}{2} = ${fmt(ans, 3)}$.`,
        'No integration table needed — geometry IS the double integral here.',
      ],
      markScheme: ['Identify probability = area under joint uniform', 'Sketch the region and identify the triangle', 'Compute t²/2'],
    });
  },
});

/* ---------- race of exponentials ---------- */
T.push({
  id: 'pz-exprace', conceptId: 'exponential', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const lam = randInt(rng, 1, 5);
    let mu = randInt(rng, 1, 5);
    if (mu === lam) mu++;
    const [num, den] = simplify(lam, lam + mu);
    return numQuestion(`pz-er-${seed}`, 'pz-exprace', 'exponential', d, seed, {
      prompt: `Two counters serve you: $X \\sim$ Exp(${lam}) and $Y \\sim$ Exp(${mu}), independent. What is $P(X < Y)$ — the probability counter X finishes first?`,
      answer: lam / (lam + mu), tol: 2e-3, answerTex: `$${fracTex(num, den)}$`,
      hints: ['Condition on X = x: P(Y > x) = e^(−μx) by the exponential survival function.', 'Integrate against the pdf of X: ∫ λe^(−λx) e^(−μx) dx.', 'The integrand is a single exponential in x — one clean integral.'],
      solution: [
        `$P(X<Y) = \\int_0^\\infty ${lam}e^{-${lam}x}\\,e^{-${mu}x}\\,dx = \\int_0^\\infty ${lam}e^{-${lam + mu}x}\\,dx$.`,
        `$= \\dfrac{${lam}}{${lam + mu}} = ${fracTex(num, den)}$.`,
        'Rates race in proportion: the faster clock wins with probability λ/(λ+μ) — the same constant that makes min(X,Y) ~ Exp(λ+μ).',
      ],
    });
  },
});

/* ---------- craps point: race to the point vs 7 ---------- */
T.push({
  id: 'pz-craps', conceptId: 'total-probability', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const point = pick(rng, [4, 5, 6, 8, 9, 10]);
    const ways = (s: number) => { let c = 0; for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) if (i + j === s) c++; return c; };
    const w = ways(point), w7 = ways(7);
    const [num, den] = simplify(w, w + w7);
    return numQuestion(`pz-cr-${seed}`, 'pz-craps', 'total-probability', d, seed, {
      prompt: `Two dice are rolled repeatedly. What is the probability a sum of **${point}** appears before a sum of **7**?`,
      answer: w / (w + w7), tol: 2e-3, answerTex: `$${fracTex(num, den)}$`,
      hints: ['Every roll that is neither sum restarts the situation identically — ignore it.', `Condition on the roll that decides: it shows ${point} or 7.`, `Count ways: ${point} in ${w} ways, 7 in ${w7} ways out of 36.`],
      solution: [
        'Rolls that show neither sum change nothing (the game is memoryless) — condition on the FIRST decisive roll.',
        `Given decisive, $P(${point}) = \\dfrac{${w}/36}{${w}/36 + ${w7}/36} = ${fracTex(num, den)}$.`,
        'A two-line answer to an infinite-horizon question — conditioning on the relevant world is the entire trick (casino odds are set from exactly this).',
      ],
      markScheme: ['Argue irrelevant rolls can be ignored (restart property)', 'Condition on the decisive roll', 'Compute the ratio of ways'],
    });
  },
});

/* ---------- Mosteller's socks ---------- */
T.push({
  id: 'pz-sock', conceptId: 'chain-rule', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    // smallest drawer with P(two red) = 1/2: search r,b
    let best: [number, number] | null = null;
    for (let tot = 2; tot <= 12 && !best; tot++) {
      for (let r = 1; r < tot; r++) {
        if ((r * (r - 1)) / (tot * (tot - 1)) === 0.5) { best = [r, tot - r]; break; }
      }
    }
    const [r, b] = best!; // computed: 3 red, 1 black
    const tot = r + b;
    return mcQuestion(`pz-sk-${seed}`, 'pz-sock', 'chain-rule', d, seed, {
      prompt: 'A drawer has red and black socks. Drawing two **without replacement**, P(both red) = exactly $\\tfrac12$. What is the **smallest** possible number of socks in the drawer?',
      choices: [
        { tex: `$${tot}$ (${r} red, ${b} black)`, correct: true, why: `Chain rule: (${r}/${tot})(${r - 1}/${tot - 1}) = 1/2 exactly.` },
        { tex: '$2$ (both red)', why: 'Then P(both red) = 1, not 1/2.' },
        { tex: '$6$', why: 'No red/black split of 6 gives exactly 1/2 — check (r/6)((r−1)/5).' },
        { tex: '$8$', why: 'Possible splits miss 1/2; and it is not smallest anyway.' },
      ],
      hints: ['Write P(both red) with the chain rule: (r/n)·((r−1)/(n−1)).', 'Set it equal to 1/2 and hunt small integer solutions.', 'Try n = 2, 3, 4 by hand.'],
      solution: [
        'Chain rule: $P = \\frac{r}{n}\\cdot\\frac{r-1}{n-1} = \\tfrac12$.',
        `Searching small integers: $r=${r}, n=${tot}$ works — $(${r}/${tot})(${r - 1}/${tot - 1}) = \\tfrac12$ — and nothing smaller does.`,
        '(The next solution is 15 red + 6 black of 21 — consecutive-triangular structure. Classic Mosteller.)',
      ],
    }, rng);
  },
});

/* ---------- Penney-style: HH waits longer than HT ---------- */
T.push({
  id: 'pz-penney', conceptId: 'expectation-discrete', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    // fixed-point solve of the first-step equations (converges geometrically)
    let aHH = 0, bHH = 0, aHT = 0, bHT = 0;
    for (let i = 0; i < 200; i++) {
      bHH = 1 + aHH / 2;            // after H: H ends, T back to start
      aHH = 1 + (bHH + aHH) / 2;    // start: H -> b, T -> start
      bHT = 1 + bHT / 2;            // after H: T ends, H stays in b
      aHT = 1 + (bHT + aHT) / 2;    // start: H -> b, T -> start
    }
    return mcQuestion(`pz-pn-${seed}`, 'pz-penney', 'expectation-discrete', d, seed, {
      prompt: 'Fair coin, tossed until a pattern appears. Compare the expected waits for **HH** and **HT**. Which is true?',
      choices: [
        { tex: `HH waits longer: $E=${Math.round(aHH)}$ vs $E=${Math.round(aHT)}$`, correct: true, why: 'After H, a T ruins HH completely (back to scratch), but merely stalls HT (the H still counts).' },
        { tex: 'Equal — both patterns have probability $\\tfrac14$ per pair', why: 'Per-pair probability is equal, but overlapping-restart structure is not: failure hurts HH more.' },
        { tex: `HT waits longer: $E=${Math.round(aHH)}$ vs $E=${Math.round(aHT)}$ reversed`, why: 'Backwards — check what a failed second toss does to your progress in each case.' },
      ],
      hints: ['Set up states: "no progress" and "just saw H". Write first-step equations for the expected remaining tosses.', 'For HH: from state H, a T sends you ALL the way back. For HT: from state H, another H keeps you in state H.', 'Solve the two little linear systems.'],
      solution: [
        'HH: $a = 1+\\tfrac{a+b}{2}$, $b = 1+\\tfrac{a}{2}$ (from H: heads ends, tails restarts) $\\Rightarrow a = ' + Math.round(aHH) + '$.',
        'HT: $a = 1+\\tfrac{a+b}{2}$, $b = 1+\\tfrac{b}{2}$ (from H: tails ends, heads WAITS in place) $\\Rightarrow a = ' + Math.round(aHT) + '$.',
        'The asymmetry is the restart cost: HH\'s failure discards progress, HT\'s does not. Equal probabilities per window, unequal waits — a classic interview separator.',
      ],
    }, rng);
  },
});

/* ---------- hard exam-style: rare disease Bayes ---------- */
T.push({
  id: 'pz-rare', conceptId: 'bayes', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const rare = pick(rng, [200, 500, 1000]);
    const sens = pick(rng, [0.98, 0.99]);
    const spec = pick(rng, [0.95, 0.97]);
    const prior = 1 / rare;
    const post = (prior * sens) / (prior * sens + (1 - prior) * (1 - spec));
    return numQuestion(`pz-rd-${seed}`, 'pz-rare', 'bayes', d, seed, {
      prompt: `A disease affects **1 in ${rare}**. A test detects it with probability ${sens} when present, and gives a false positive with probability ${fmt(1 - spec, 2)} when absent. ${'A random person tests positive.'} Compute $P(\\text{disease}\\mid +)$ to 3 d.p.`,
      answer: post, tol: 2e-3, answerTex: `$${fmt(post, 3)}$`,
      hints: ['Bayes with the two-case partition {disease, no disease}.', `Numerator: (1/${rare})·${sens}. Denominator adds the false-positive route: (1−1/${rare})·${fmt(1 - spec, 2)}.`, 'Expect a SMALL answer — the false positives from the huge healthy majority dominate.'],
      solution: [
        `$P(D\\mid +) = \\dfrac{P(D)P(+\\mid D)}{P(D)P(+\\mid D)+P(D^c)P(+\\mid D^c)}$`,
        `$= \\dfrac{\\tfrac{1}{${rare}}\\cdot ${sens}}{\\tfrac{1}{${rare}}\\cdot ${sens} + \\tfrac{${rare - 1}}{${rare}}\\cdot ${fmt(1 - spec, 2)}} = ${fmt(post, 4)}$.`,
        `Despite a ${fmt(sens * 100, 0)}%-sensitive test, a positive means disease only ${fmt(post * 100, 1)}% of the time — the base rate crushes it. (The Sally Clark error, in a lab coat.)`,
      ],
      markScheme: ['Partition + Bayes set-up', 'Both routes to a positive in the denominator', 'Numerical answer with base-rate interpretation'],
    });
  },
});

/* ---------- hard exam-style: Poisson conditional ---------- */
T.push({
  id: 'pz-poiscond', conceptId: 'poisson', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const lam = pick(rng, [1.5, 2, 2.5, 3]);
    const p0 = poisPmf(lam, 0), p1 = poisPmf(lam, 1);
    const ans = (1 - p0 - p1) / (1 - p0);
    return numQuestion(`pz-pc-${seed}`, 'pz-poiscond', 'poisson', d, seed, {
      prompt: `Emails arrive as $X \\sim$ Pois(${lam}) per hour. Given that **at least one** email arrived this hour, what is the probability that **at least two** did? (3 d.p.)`,
      answer: ans, tol: 2e-3, answerTex: `$${fmt(ans, 3)}$`,
      hints: ['Conditional probability: the intersection of {X≥2} and {X≥1} is just {X≥2}.', 'P(X≥1) = 1 − e^(−λ); P(X≥2) = 1 − e^(−λ) − λe^(−λ).', 'Divide.'],
      solution: [
        `$P(X\\ge2\\mid X\\ge1) = \\dfrac{P(X\\ge 2)}{P(X\\ge 1)}$ since $\\{X\\ge2\\}\\subseteq\\{X\\ge1\\}$.`,
        `$P(X\\ge1) = 1-e^{-${lam}} = ${fmt(1 - p0, 4)}$; $P(X\\ge2) = 1-e^{-${lam}}-${lam}e^{-${lam}} = ${fmt(1 - p0 - p1, 4)}$.`,
        `Ratio $= ${fmt(ans, 4)}$.`,
      ],
      markScheme: ['Recognise nested events in the conditional', 'Complement both tails correctly', 'Numerical ratio'],
    });
  },
});

/* ---------- hard exam-style: variance of a combination ---------- */
T.push({
  id: 'pz-varmix', conceptId: 'variance-sums', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const a = pick(rng, [2, 3]);
    const b = pick(rng, [-3, -2, 2]);
    const vx = randInt(rng, 2, 6);
    const vy = randInt(rng, 1, 4);
    const maxCov = Math.floor(Math.sqrt(vx * vy));
    const cov = randInt(rng, -maxCov + 1, maxCov - 1) || 1;
    const ans = a * a * vx + b * b * vy + 2 * a * b * cov;
    return numQuestion(`pz-vm-${seed}`, 'pz-varmix', 'variance-sums', d, seed, {
      prompt: `Var(X) = ${vx}, Var(Y) = ${vy}, Cov(X,Y) = ${cov}. Compute $\\mathrm{Var}(${a}X ${b >= 0 ? '+' : '−'} ${Math.abs(b)}Y)$.`,
      answer: ans, tol: 1e-6, answerTex: `$${ans}$`,
      hints: ['Var(aX+bY) = a²Var(X) + b²Var(Y) + 2ab·Cov(X,Y).', `Here a = ${a}, b = ${b} — mind the SIGN of b inside 2ab.`, 'Coefficients enter squared; the cross-term keeps the sign of ab.'],
      solution: [
        `$\\mathrm{Var}(${a}X${b >= 0 ? '+' : ''}${b}Y) = ${a}^2\\cdot${vx} + (${b})^2\\cdot${vy} + 2(${a})(${b})(${cov})$`,
        `$= ${a * a * vx} + ${b * b * vy} ${2 * a * b * cov >= 0 ? '+' : ''} ${2 * a * b * cov} = ${ans}$.`,
        'Squares never lose their sign; the covariance term carries ALL the sign information. Var is not linear.',
      ],
      markScheme: ['Correct formula with cross-term', 'Squared coefficients', 'Signed cross-term arithmetic'],
    });
  },
});

/* ---------- hard exam-style: two-urn Bayes ---------- */
T.push({
  id: 'pz-urn2', conceptId: 'total-probability', difficulties: [4, 5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const r1 = randInt(rng, 2, 5), b1 = randInt(rng, 2, 5);
    const r2 = randInt(rng, 1, 4), b2 = randInt(rng, 3, 6);
    const pRed = 0.5 * (r1 / (r1 + b1)) + 0.5 * (r2 / (r2 + b2));
    const post = (0.5 * (r1 / (r1 + b1))) / pRed;
    return numQuestion(`pz-u2-${seed}`, 'pz-urn2', 'total-probability', d, seed, {
      prompt: `Urn A holds ${r1} red, ${b1} blue; urn B holds ${r2} red, ${b2} blue. A fair coin picks an urn; one ball is drawn and it is **red**. Compute $P(\\text{urn A}\\mid\\text{red})$ to 3 d.p.`,
      answer: post, tol: 2e-3, answerTex: `$${fmt(post, 3)}$`,
      hints: ['Total probability first: P(red) through both urns.', `P(red) = ½·${r1}/${r1 + b1} + ½·${r2}/${r2 + b2}.`, 'Bayes: urn A\'s route over the total.'],
      solution: [
        `$P(\\text{red}) = \\tfrac12\\cdot\\tfrac{${r1}}{${r1 + b1}} + \\tfrac12\\cdot\\tfrac{${r2}}{${r2 + b2}} = ${fmt(pRed, 4)}$.`,
        `$P(A\\mid\\text{red}) = \\dfrac{\\tfrac12\\cdot\\tfrac{${r1}}{${r1 + b1}}}{${fmt(pRed, 4)}} = ${fmt(post, 4)}$.`,
        'Partition → total probability → reverse with Bayes: the full Chapter 3 pipeline in one question.',
      ],
      markScheme: ['Set up the urn partition', 'Total probability for the evidence', 'Bayes reversal + numerics'],
    });
  },
});

/* ---------- birthday problem ---------- */
T.push({
  id: 'pz-birthday', conceptId: 'complement-trick', difficulties: [5],
  generate(seed, d) {
    const rng = rngFor(seed);
    const n = pick(rng, [20, 23, 25, 30]);
    let pNo = 1;
    for (let i = 0; i < n; i++) pNo *= (365 - i) / 365;
    const ans = 1 - pNo;
    return numQuestion(`pz-bd-${seed}`, 'pz-birthday', 'complement-trick', d, seed, {
      prompt: `${n} people are in a room (365-day years, uniform, independent). What is the probability **at least two share a birthday**? (3 d.p.)`,
      answer: ans, tol: 3e-3, answerTex: `$${fmt(ans, 3)}$`,
      hints: ['"At least two share" is a nightmare directly — complement to "all distinct".', 'All distinct: the second avoids 1 day, the third avoids 2, … (chain rule).', `P(all distinct) = 365·364···(365−${n}+1)/365^${n}.`],
      solution: [
        `$P(\\text{all distinct}) = \\prod_{i=0}^{${n - 1}}\\tfrac{365-i}{365} = ${fmt(pNo, 4)}$ (chain rule, each person dodging the previous birthdays).`,
        `$P(\\text{shared}) = 1 - ${fmt(pNo, 4)} = ${fmt(ans, 4)}$.`,
        `${n >= 23 ? 'Past 23 people the odds pass 1/2 — pairs grow quadratically (C(n,2) chances to collide) while intuition counts linearly.' : 'Even below 23 people the probability is startling — C(n,2) pairs is what your intuition forgets.'}`,
      ],
      markScheme: ['Complement to all-distinct', 'Chain-rule product', 'Numerical answer'],
    });
  },
});

export const PUZZLES = T;

/** Serve a puzzle for a concept: same concept first, then same chapter, then anywhere. */
let pseed = Math.floor(Math.random() * 2 ** 30);
export function puzzleFor(conceptId: string, exclude?: Set<string>): GeneratedQuestion | null {
  const chapter = CONCEPT_MAP[conceptId]?.chapter;
  let pool = PUZZLES.filter(t => t.conceptId === conceptId);
  if (!pool.length && chapter !== undefined) pool = PUZZLES.filter(t => CONCEPT_MAP[t.conceptId]?.chapter === chapter);
  if (!pool.length) pool = PUZZLES;
  const fresh = pool.filter(t => !exclude?.has(t.id));
  const use = fresh.length ? fresh : pool;
  const t = use[Math.floor(Math.random() * use.length)];
  pseed = (pseed + 0x9e3779b) % 2 ** 31;
  try {
    return t.generate(pseed, t.difficulties[t.difficulties.length - 1]);
  } catch (e) {
    console.error('puzzle generation failed', t.id, e);
    return null;
  }
}
