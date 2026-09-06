import type { PageNote } from './types';

/* Line-by-line decode of pages 31–62 (Chapters 3–4). */

export const NOTES2: Record<number, PageNote[]> = {
  31: [
    { ref: 'Definition 3.1', what: '**Conditional probability**: P(E|F) = P(E∩F)/P(F), defined only when P(F) > 0. Read it as world-shrinking: F becomes the new sample space, only the part of E inside F survives, and dividing by P(F) re-scales the new world\'s total to 1.', tex: 'P(E\\mid F)=\\frac{P(E\\cap F)}{P(F)}' },
    { ref: 'Example 3.1', what: 'The precision trap: three tosses, P(three tails | AT LEAST two tails) = (1/8)/(4/8) = **1/4**, but P(three tails | the FIRST TWO are tails) = (1/8)/(2/8) = **1/2**. Different information shrinks to different worlds — read the conditioning event exactly.' },
    { ref: 'Remarks', what: 'Three facts: (1) P(F|F) = 1 — F is the whole new world; (2) P(·|F) satisfies all three Kolmogorov axioms, so EVERY earlier rule (complements, inclusion–exclusion…) holds conditionally; (3) disjoint events give P(E|F) = 0.' },
    { ref: 'Equation (23)', what: 'Rearranged, the definition becomes the **multiplication rule** P(E∩F) = P(F)·P(E|F) — the tool for sequential experiments where the conditional is the easy thing to write down.', tex: 'P(E\\cap F)=P(F)\\,P(E\\mid F)' },
  ],
  32: [
    { ref: 'Example 3.2', what: 'Two cards without replacement, P(both aces) = P(A₁)·P(A₂|A₁) = (4/52)(3/51) = 1/221. The conditional is just counting what remains in the deck.' },
    { ref: 'Theorem 3.1', what: 'The **chain rule** for n events: P(E₁∩…∩Eₙ) = P(E₁)P(E₂|E₁)P(E₃|E₁∩E₂)⋯ — each factor conditions on everything before. Proof: write every factor as a ratio and watch the product telescope; the containment rule guarantees no division by zero.', tex: 'P(E_1\\cap\\cdots\\cap E_n)=P(E_1)\\,P(E_2|E_1)\\cdots P(E_n|E_1\\cap\\cdots\\cap E_{n-1})' },
    { ref: 'Example 3.3', what: 'Toolbox with 5 good, 2 bad fuses, tested without replacement. (1) P(first two bad) = (2/7)(1/6) = 1/21. (2) P(second bad found on test 3): the sequence must be GDD or DGD — two DISJOINT stories, each chained: (5/7·2/6·1/5)+(2/7·5/6·1/5) = 2/21. Decompose into disjoint sequences, chain each, add.' },
  ],
  33: [
    { ref: 'Definition 3.2', what: 'A **partition** of Ω: pairwise disjoint, non-empty events E₁,…,Eₙ covering everything (⋃Eᵢ = Ω). Their probabilities add to 1. Simplest example: {E, Eᶜ}.' },
    { ref: 'Theorem 3.2', what: 'The **law of total probability**: for any F, P(F) = Σᵢ P(Eᵢ)P(F|Eᵢ) — a weighted average of the per-case conditionals, weighted by case size. Proof: distribute F across the partition (F = ⋃(F∩Eᵢ), disjoint pieces), add, apply the multiplication rule to each piece. It is your school tree diagram, formalised.', tex: 'P(F)=\\sum_{i=1}^{n}P(E_i)\\,P(F\\mid E_i)' },
  ],
  34: [
    { ref: 'Remarks', what: 'The theorem extends to countably infinite partitions, and even to disjoint families that only cover F rather than all of Ω.' },
    { ref: 'Example 3.5', what: 'The traders: Buster 30%, Rich 50%, Owen 20% of deals; profit-over-£1m rates 1/2, 1/3, 1/4. P(random deal > £1m) = (3/10)(1/2)+(5/10)(1/3)+(2/10)(1/4) = **11/30**. Enumerate cases, weight, sum.' },
    { ref: 'Equation (28)', what: 'Write P(E∩F) both ways round and divide: **Bayes\' theorem** P(E|F) = P(E)P(F|E)/P(F) — the machine for REVERSING a conditional. Motivation given: medicine knows P(symptoms|disease); the patient wants P(disease|symptoms).', tex: 'P(E\\mid F)=\\frac{P(E)\\,P(F\\mid E)}{P(F)}' },
    { ref: 'Theorem 3.3', what: 'The full partition form: P(Eⱼ|F) = P(Eⱼ)P(F|Eⱼ) / Σᵢ P(Eᵢ)P(F|Eᵢ). The denominator is just the law of total probability — every route to the evidence F, with your favoured route on top.' },
  ],
  35: [
    { ref: 'Example 3.6', what: 'Bayes on the traders: loss rates 1/4, 1/8, 1/16. P(loss) = 3/40+5/80+2/160 = 3/20, and P(Buster | loss) = (3/40)/(3/20) = **1/2** — half of all losses trace back to Buster despite his 30% share, because his loss RATE is highest.' },
    { ref: 'Definition 3.3', what: '**Independence**: P(E∩F) = P(E)·P(F). When both probabilities are positive this is equivalent to P(E|F) = P(E) and to P(F|E) = P(F): learning one changes nothing about the other. The product form is preferred because it is symmetric and survives zero-probability events (P(E)=0 makes E independent of everything).', tex: 'P(E\\cap F)=P(E)\\,P(F)' },
  ],
  36: [
    { ref: 'Example 3.7', what: 'Two fair tosses, E = head first, F = head second: P(E∩F) = 1/4 = (1/2)(1/2) ✓. The formal check of the obvious.' },
    { ref: 'Example 3.8', what: 'The surprising one: draw ONE card; E = "ace", F = "hearts" are physically entangled in the same card — yet P(E∩F) = 1/52 = (1/13)(1/4), so they ARE independent. Independence is about the numbers, not physical separation: the deck\'s proportions make suit reveal nothing about rank.' },
    { ref: 'Theorem 3.4', what: 'Independence passes to complements: E⊥F implies E⊥Fᶜ, Eᶜ⊥F, Eᶜ⊥Fᶜ. Proof via the partition rule: P(E∩Fᶜ) = P(E)−P(E∩F) = P(E)(1−P(F)) = P(E)P(Fᶜ).' },
    { ref: 'WARNING', what: 'In bold in the notes: **disjoint events are typically NOT independent**. If P(E), P(F) > 0 and E∩F = ∅ then P(E∩F) = 0 ≠ P(E)P(F). Knowing a disjoint event occurred tells you the other did NOT — maximal information, the opposite of independence. Classic exam trap.' },
  ],
  37: [
    { ref: 'Definition 3.4', what: '**Mutual independence** of E₁,…,Eₙ: the product rule must hold for EVERY sub-collection, not just pairs. For three events that is four equations: three pairwise ones plus P(E₁∩E₂∩E₃) = P(E₁)P(E₂)P(E₃).' },
    { ref: 'Example 3.10', what: 'Triple-product-holds-but-pairs-fail: rigged card events where P(E₁∩E₂∩E₃) = 1/52 equals the triple product, yet E₃ ⊆ E₁ forces total dependence between that pair. Checking only the triple is NOT enough.' },
    { ref: 'Example 3.11', what: 'Pairs-hold-but-triple-fails: E, F = heads on each toss, G = "both tosses same". Each PAIR is independent, but P(E∩F∩G) = 1/4 ≠ 1/8. G is a parity bit — determined jointly by E and F though blind to each alone. Pairwise ≠ mutual.' },
    { ref: 'Theorem 3.5', what: 'Independent families stay independent when you replace members by complements, intersections, or unions of themselves — used constantly without comment, e.g. "all miss" = product of complement probabilities.' },
  ],
  38: [
    { ref: 'Example 3.12', what: 'Three missiles hit independently with 0.7, 0.8, 0.9. P(target hit) = 1 − P(all miss) = 1 − (0.3)(0.2)(0.1) = **0.994**. The "at least one" pattern: complement + De Morgan + independence-of-complements. One line instead of seven cases of inclusion–exclusion.' },
    { ref: 'Example 3.13', what: 'Switch circuit (Figure 13): signal passes if (E₁∩E₂)∪(E₃∩E₄) — two parallel branches of two series switches, each closed with probability p. Inclusion–exclusion + independence: p² + p² − p⁴ = p²(2−p²). Reliability engineering in miniature.' },
  ],
  39: [
    { ref: '§3.6.1', what: 'Pointer to the setosa.io/conditional animation — the visual "balls falling past shelves" model of conditioning (this app\'s Play tab does the same live).' },
    { ref: '§3.6.2 (non-exam)', what: 'Recurrence of the random walk, by a beautiful halving argument: from any position x, P(hit 0 before 2x) = 1/2 by symmetry; if you miss, try again from 2x with another fair coin-flip chance, forever. P(never return) ≤ (1/2)ᵏ for every k, hence = 0: **the walk returns to 0 with probability 1**, infinitely often. (Says nothing about how LONG it takes — p97 answers that.)' },
  ],
  40: [
    { ref: 'Sally Clark (non-exam)', what: 'The prosecutor\'s fallacy in court: an expert squared 1/8500 to claim "1 in 73 million" for two cot deaths — WRONG twice over. First error: the two deaths are not independent (SIDS risk runs in families; with P(second|first) ≈ 1/10 the honest figure is ≈ 1/85,000). Second error: the jury read P(evidence|innocent) as P(innocent|evidence) — a transposed conditional.' },
  ],
  41: [
    { ref: 'Proper analysis', what: 'Doing it right with Bayes: with P(G|E₁) ≤ 1/11 (most unexplained deaths are not murder) and P(E₂|E₁,innocent) ≈ 1/10, the posterior P(guilty | both deaths) comes out BELOW 1/2. From "1 in 73 million" to "probably innocent" — the cost of conditioning errors, in a real courtroom.' },
    { ref: 'Definition 4.1', what: 'Chapter 4 opens: a **random variable** is a function X: Ω → S ⊆ ℝ attaching a number to each outcome; S is its **support**. Despite the name it is neither random nor a variable — the randomness lives in ω, the function is fixed.', tex: 'X:\\Omega\\to S\\subseteq\\mathbb R' },
    { ref: 'Remarks', what: 'Conventions: capital X for the rv, lower-case x for its values. The compact {X = x} secretly means {ω ∈ Ω : X(ω) = x} — an EVENT, so it can be given a probability. Same for {X ≤ x} and {X ∈ A}.' },
  ],
  42: [
    { ref: 'Example 4.1', what: 'Three tosses, X = number of heads: the table maps all 8 outcomes (X(HHT) = 2 etc.), giving P(X=1) = 3/8, P(X≥2) = 1/2. Many rvs share one Ω: Y = 3−X counts tails, Z counts heads in the last two tosses, W counts alternations.' },
    { ref: 'Figure 14', what: 'The picture to internalise: outcomes on the left, ℝ on the right, arrows through the "function machine". This app\'s p42 animation is exactly this figure, moving.' },
    { ref: 'Definition 4.2', what: '**Discrete** rv: support finite ({0,1,2,3}) or countably infinite ({0,1,2,…}). Example 4.2: heads-count; meteorite strikes per year.' },
  ],
  43: [
    { ref: 'Definition 4.3', what: "The notes call an rv with uncountable support continuous. That broad definition does not imply that every point has probability zero: a mixture of an atom and a uniform variable is a counterexample. The distributions with densities studied in Chapter 5 do have zero probability at every individual point." },
    { ref: 'Definition 4.4', what: 'The **pmf** (probability mass function): fX(x) = P(X = x). Two health checks: fX ≥ 0 everywhere and Σₓ fX(x) = 1 over the support. Example 4.4 verifies the heads-count pmf (1/8, 3/8, 3/8, 1/8).', tex: 'f_X(x)=P(X=x),\\qquad \\sum_{x\\in S}f_X(x)=1' },
    { ref: 'Remark', what: 'The pmf pushes P forward to a new measure P_X on the number line (via Theorem 1.3) — called the **distribution** or **law** of X. For rvs with densities, point masses are all zero, so point probabilities cannot describe the law; the cdf works for every distribution.' },
  ],
  44: [
    { ref: 'Definition 4.5', what: 'The **cdf** (cumulative distribution function): FX(x) = P(X ≤ x), defined for EVERY random variable — discrete, continuous, or neither. This universality is its superpower.', tex: 'F_X(x)=P(X\\le x)' },
    { ref: 'Figure 15 / Example 4.5', what: 'For the heads-count: a STAIRCASE — flat between support points, jumping by P(X=x) at each x. FX(2) = 1/8+3/8+3/8 = 7/8. Filled dots on the left of each jump mark right-continuity.' },
  ],
  45: [
    { ref: 'Theorem 4.1', what: 'Every cdf: (1) is non-decreasing (via the containment rule); (2) → 1 as x → ∞; (3) → 0 as x → −∞; (4) is right-continuous (proof needs analysis — non-examinable, but the staircase picture shows it).' },
    { ref: 'Theorem 4.2', what: 'The interval formula: P(a < X ≤ b) = FX(b) − FX(a). Proof manipulates {X≤b} = {X≤a} ⊔ {a<X≤b} with complements and De Morgan. Note the half-open convention (a, b] matching the ≤ in the cdf.', tex: 'P(a<X\\le b)=F_X(b)-F_X(a)' },
  ],
  46: [
    { ref: 'Theorem 4.3', what: 'The converse: ANY function with properties 1–4 IS the cdf of some random variable. So you can define distributions purely by writing down a valid F — exactly how Uniform, Exponential and Normal are introduced in Chapter 5. No Ω required.' },
    { ref: 'Example 4.6', what: 'Reading a pmf back off a staircase: P(X=x) = jump height = F(x) − limit-from-the-left. Worked through the 4-step cdf to recover (1/8, 3/8, 3/8, 1/8).' },
    { ref: 'Definition 4.6', what: '**Bernoulli(p)**: one yes/no trial, P(X=1) = p, P(X=0) = 1−p. The atom from which the counting distributions are built. Flipping labels: 1−X ~ Ber(1−p). Its cdf jumps by 1−p at 0 and by p at 1 (one jump disappears in a degenerate case).', tex: 'X\\sim\\mathrm{Ber}(p)' },
  ],
  47: [
    { ref: 'Definition 4.7', what: '**Binomial(n, p)**: number of successes in n independent Bernoulli(p) trials. pmf C(n,x)pˣ(1−p)ⁿ⁻ˣ: choose WHICH x trials succeed, pay pˣ for the successes and (1−p)ⁿ⁻ˣ for the failures.', tex: 'P(X=x)=\\binom{n}{x}p^x(1-p)^{n-x}' },
    { ref: 'Example 4.7', what: 'Three components, each defective with probability 1/4 independently: P(at least 2 defective) = P(2)+P(3) = 3·(1/4)²(3/4) + (1/4)³ = **5/32**. Name the distribution, then complement/add the cases.' },
  ],
  48: [
    { ref: 'Figure 16', what: 'Bin(100, p) pmfs for p = 0.1, 0.5, 0.9: a mountain centred near np; p = 1/2 is symmetric, small p puts most mass near the left with a long right tail; large p has a long left tail. Sliding p in this app\'s Play tab reproduces the figure live.' },
  ],
  49: [
    { ref: 'Remarks 1–6', what: 'The binomial checklist: sums to 1 by the binomial expansion of (p + (1−p))ⁿ; Bin(1,p) = Ber(p); a sum of n independent Ber(p) IS Bin(n,p); the pmf story (choose the successful trials); failures n−X ~ Bin(n, 1−p); and the cdf is a sum of pmf terms up to ⌊x⌋ (no closed form).' },
    { ref: 'Definition 4.8', what: '**Geometric(p)**: number of trials UP TO AND INCLUDING the first success — support {1, 2, 3, …} starting at 1 in THIS course. pmf (1−p)^(k−1)p: k−1 failures then the success. (The alternative convention Y = X−1 counting failures is mentioned — do not mix them up.)', tex: 'P(X=k)=(1-p)^{k-1}p' },
    { ref: 'Theorem 4.4', what: 'The geometric series: Σᵢ₌₀ⁿ rⁱ = (1−rⁿ⁺¹)/(1−r), and for |r| < 1 the infinite sum is 1/(1−r). The engine behind every geometric-distribution calculation.', tex: '\\sum_{i=0}^{\\infty}r^i=\\frac{1}{1-r}\\quad(|r|<1)' },
  ],
  50: [
    { ref: 'Figure 17', what: 'Geom(p) pmfs for p = 0.1, 0.5, 0.9: bars decaying by the constant factor (1−p) — the geometric fingerprint. Small p = long slow tail (long waits likely); large p = success almost immediately.' },
  ],
  51: [
    { ref: 'Example 4.8', what: 'Verification that the Geom pmf sums to 1: factor out p, substitute j = k−1, apply the geometric series with r = 1−p.' },
    { ref: 'Examples 4.9–4.10', what: 'Geom(1/4): P(X > 2) = 9/16 = (3/4)² and P(X > 3) = (3/4)³ — spotting the pattern gives the general **survival identity** P(X > n) = (1−p)ⁿ ("no success in the first n trials"), hence the cdf F(n) = 1 − (1−p)ⁿ with no summation needed.', tex: 'P(X>n)=(1-p)^n' },
  ],
  52: [
    { ref: 'Example 4.11', what: 'Billy Forgetful attends each lecture with p = 0.3: P(X > 5) = 0.7⁵ ≈ 0.168, P(X ≤ 33) = 1 − 0.7³³ ≈ 0.99999. The survival identity doing all the work.' },
    { ref: 'Definition 4.9', what: '**Poisson(λ)**: counts of events happening at a constant rate over a window — queue arrivals, radioactive decays. pmf λˣe^(−λ)/x! on {0,1,2,…}, λ > 0.', tex: 'P(X=x)=\\frac{\\lambda^x}{x!}e^{-\\lambda}' },
  ],
  53: [
    { ref: 'Figure 18', what: 'Pois(λ) pmfs for λ = 1, 5, 10, 50: the mass sits near λ and spreads out as λ grows (mean AND variance both equal λ — proved in Chapter 6).' },
  ],
  54: [
    { ref: 'Sums to 1', what: 'Σ λˣe^(−λ)/x! = e^(−λ)·e^λ = 1, using the Taylor series of e^λ. The e^(−λ) factor exists precisely to normalise.' },
    { ref: 'Example 4.12', what: 'Freddie sneezes at rate 1.2/minute and needs 20 sneeze-free minutes to fall asleep: **rescale the rate to the window**, λ = 1.2 × 20 = 24, so P(asleep by 11:20) = P(X=0) = e⁻²⁴ — astronomically small. Poor Freddie. The λ-rescaling step is the one students forget.' },
    { ref: 'Poisson ≈ Binomial', what: 'For large n and small p, Bin(n,p) ≈ Pois(np). Example 4.13 (typesetter, 1 error per 500 words, 5 pages × 300 words): exact Bin(1500, 1/500) gives 0.4230; Pois(3) gives 0.4232. Nearly identical, far less arithmetic.' },
  ],
  55: [
    { ref: 'Remark + Figure 19', what: 'λ can be per area/volume, not just time: Clarke\'s 1946 analysis of V-1 bomb hits on London grid squares fit Pois(0.93) — evidence the hits were random, not aimed. Figure 19: Westminster road accidents per day in 2019 fit Pois(4.18) well.' },
    { ref: '§4.4 / Example 4.15', what: 'Two rvs on one experiment: roll two dice, X = sum, Y = product. P(X=4, Y=3) = P{(1,3),(3,1)} = 2/36. The **joint** behaviour is a new object beyond the two separate distributions.' },
  ],
  56: [
    { ref: 'Definition 4.10', what: 'The **joint pmf** f_{X,Y}(x,y) = P(X=x, Y=y); all values ≥ 0 and the double sum is 1.', tex: 'f_{X,Y}(x,y)=P(X=x,\\,Y=y)' },
    { ref: 'Marginals', what: 'The **marginal** pmf of X = sum the joint over all y — literally the law of total probability with the partition {Y = y}. "Marginal" is not a new kind of distribution, just THE distribution of X when it arrived via a joint. Example 4.16 extracts both marginals from a five-entry joint pmf.', tex: 'f_X(x)=\\sum_{y\\in S_Y}f_{X,Y}(x,y)' },
  ],
  57: [
    { ref: 'Example 4.17', what: 'Joint pmf f(x,y) = (2x+y)/36 on {0,1,2}×{1,2,3}: marginals work out to (6x+6)/36 = (x+1)/6 and (2+y)/12. The **joint distribution table** displays everything with marginals in the margins — the exam-standard format.' },
    { ref: 'Definition 4.11', what: 'The **joint cdf** F_{X,Y}(x,y) = P(X ≤ x, Y ≤ y); non-decreasing in each coordinate, → 1 at (+∞, +∞), → 0 if EITHER argument → −∞. (Careful, the notes warn: F(∞, y) is a marginal cdf value, not 1.)' },
  ],
  58: [
    { ref: 'Definition 4.12', what: '**Independence of random variables**: the joint cdf factorises, P(X≤x, Y≤y) = P(X≤x)P(Y≤y) for ALL x, y. A definition that works for every type of rv.' },
    { ref: 'Theorem 4.5', what: 'For discrete rvs this is equivalent to the joint pmf factorising: f_{X,Y}(x,y) = fX(x)·fY(y) at every point of the support. ONE failing cell disproves independence.', tex: 'f_{X,Y}(x,y)=f_X(x)\\,f_Y(y)' },
  ],
  59: [
    { ref: 'Example 4.18', what: 'Two dice rolls X, Y: every cell 1/36 = (1/6)(1/6) → independent. But X and Z = X+Y are NOT: P(X=1, Z=12) = 0 while P(X=1)P(Z=12) = 1/216 — a single zero cell is a complete disproof.' },
    { ref: 'Example 4.19', what: 'Joint pmf 3ˣ/4^(x+y) on {1,2,…}²: it separates as (3/4)ˣ·(1/4)ʸ, and summing shows X ~ Geom(1/4), Y ~ Geom(3/4), independent. Separability = independence (formalised on p77).' },
  ],
  60: [
    { ref: 'Theorem 4.6', what: 'Technical bridge: independence is equivalent to P(a<X≤b, c<Y≤d) = P(a<X≤b)·P(c<Y≤d) for all intervals. Proof splits {p < Z ≤ q} = {Z≤q}\\{Z≤p} repeatedly — bookkeeping with the interval formula.' },
  ],
  61: [
    { ref: 'Proof of 4.5', what: 'Finishing the pmf-characterisation proof: single points are squeezed as {xᵢ₋₁ < X ≤ xᵢ}, and conversely summing factorised cells rebuilds the factorised cdf.' },
    { ref: 'Theorem 4.7', what: '**Convolution**: for independent discrete X, Y, P(X+Y = k) = Σₓ P(X=x)·P(Y=k−x) — partition by what X contributed; Y must supply the rest. The master formula for sums.', tex: 'P(X+Y=k)=\\sum_{x\\in S_X}P(X=x)P(Y=k-x)' },
  ],
  62: [
    { ref: 'Example 4.20', what: '**Poisson addition**: X ~ Pois(λ), Y ~ Pois(μ) independent ⟹ X+Y ~ Pois(λ+μ). The convolution sum sprouts a binomial expansion of (λ+μ)ᵏ. Intuition: merging two independent event streams adds their rates.', tex: 'X+Y\\sim\\mathrm{Pois}(\\lambda+\\mu)' },
    { ref: 'Example 4.21 (start)', what: '**Binomial addition** (same p!): Bin(n,p) + Bin(m,p) = Bin(n+m,p) — instantly by interpretation (pool the n+m trials), and again by grinding the convolution…' },
  ],
};
