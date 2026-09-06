import type { Concept } from '../types';

/* Chapter 7 — Indicator functions and applications (file pages 93–98).
   THE LECTURER STATES (p93): written after the exam — NOTHING from this section
   appears in the exam. Marked non-examinable throughout; study for depth, not marks. */

export const CH7: Concept[] = [
  {
    id: 'indicators', title: 'Indicator functions', icon: '', chapter: 7, pdfPages: [93, 94],
    prereqs: ['bernoulli', 'linearity'], examinable: false, lab: 'bulbs',
    examNote: 'Section 7 is explicitly non-examinable (p93) — bonus material for depth and later courses.',
    whyCare: 'A switch worth 1 when an event happens, 0 otherwise. E[1_A]=P(A) converts probabilities into expectations — unlocking slick counting arguments.',
    keywords: ['indicator', '1_a', 'indicator function', 'switch'],
    levels: {
      eli5: 'A little lightbulb for each event: ON (1) if it happened, OFF (0) if not. Counting lit bulbs counts events that happened.',
      human: '1_A(ω) = 1 if ω∈A, else 0. It\'s a Bernoulli rv with success probability P(A), so E[1_A] = P(A) (Lemma 7.1). Superpower: any count decomposes as a sum of indicators, and linearity of expectation needs NO independence — so expected counts are just sums of probabilities.',
      uni: 'Definition 7.1: $\\mathbb 1_A:\\Omega\\to\\{0,1\\}$, $\\mathbb 1_A(\\omega)=1\\iff \\omega\\in A$. Lemma 7.1: $E[\\mathbb 1_A]=0\\cdot P(\\mathbb 1_A=0)+1\\cdot P(\\mathbb 1_A=1)=P(A)$. Algebra: $\\mathbb 1_{A\\cap B}=\\mathbb 1_A\\mathbb 1_B$, $\\mathbb 1_{A^c}=1-\\mathbb 1_A$.',
      deep: 'Indicators are the bridge between the world of EVENTS (chapters 1–3) and the world of RANDOM VARIABLES (chapters 4–6): every set-theoretic operation becomes algebra (intersection→product, complement→1−x). The proof of Markov\'s inequality is one indicator comparison. In later courses, whole proofs run on "write it as a sum of indicators, take expectations".',
    },
    formulas: [
      { id: 'f-ind', name: 'Indicator & its expectation', tex: '\\mathbb 1_A(\\omega)=\\begin{cases}1 & \\omega\\in A\\\\ 0 & \\omega\\notin A\\end{cases}\\qquad E[\\mathbb 1_A]=P(A)', source: 'course', pdfPage: 94 },
    ],
    examples: {
      simple: 'Toss a coin; A = "head". 1_A ~ Ber(½), E[1_A] = ½ (Example 7.1).',
      everyday: 'Days you hit the gym this month = Σ (indicator per day); expected gym-days = Σ P(go that day) — even though motivation on consecutive days is correlated!',
      mathematical: 'X ~ Bin(n,p) is literally Σ 1_{trial i succeeds} — chapter 4\'s fact restated.',
      exam: 'Not examinable this year — but the technique reappears in every later probability course.',
    },
    connections: [
      { to: 'bernoulli', how: '1_A IS a Bernoulli(P(A)) random variable.' },
      { to: 'markov-chebyshev', how: 'Markov\'s proof: compare 1_{X≥x} with X/x and take expectations.' },
    ],
    errorIds: [],
  },
  {
    id: 'markov-chebyshev', title: 'Markov & Chebyshev inequalities', icon: '', chapter: 7, pdfPages: [94, 95],
    prereqs: ['indicators', 'variance'], examinable: false, lab: 'tailbound',
    examNote: 'Section 7 is explicitly non-examinable (p93).',
    whyCare: 'Universal tail bounds from almost no information: Markov needs only the mean; Chebyshev only mean + variance. They power the LLN proof.',
    keywords: ['markov inequality', 'chebyshev', 'tail bound', 'inequality'],
    levels: {
      eli5: 'If the class average is 10 sweets, at most 2 in 7 kids can hold 35+ sweets — else the average couldn\'t be 10. Knowing just the average already limits how many extremes exist.',
      human: 'Markov: for X ≥ 0 and x > 0, P(X ≥ x) ≤ E[X]/x. Chebyshev (Markov applied to |X−E[X]|²): P(|X−E[X]| ≥ x) ≤ Var(X)/x². Bounds are often loose (Bin(1000,0.01): Markov gives ≤ 2/7 where truth is ~4×10⁻¹⁰) but they need almost nothing and are universally valid — the point is generality, not sharpness.',
      uni: 'Theorem 7.1 (Markov): $X\\ge0, x>0\\Rightarrow P(X\\ge x)\\le E[X]/x$. Proof: $\\mathbb 1_{\\{X\\ge x\\}}\\le X/x$ pointwise; take expectations, use $E[\\mathbb 1_{\\{X\\ge x\\}}]=P(X\\ge x)$. Corollary 7.1 (Chebyshev): $E[X^2]<\\infty\\Rightarrow P(|X-E[X]|\\ge x)\\le \\mathrm{Var}(X)/x^2$ — apply Markov to the non-negative rv $|X-E[X]|^2$ at level $x^2$.',
      deep: 'The proof is a one-line pointwise comparison, and the pattern generalises magnificently: apply Markov to |X|ᵏ (higher moments) or to e^{tX} (exponential moments — Chernoff bounds, the gateway to large-deviations theory the notes namecheck). Chebyshev\'s x² decay is exactly enough to prove the WLLN: plug in Var(X̄ₙ)=σ²/n and the bound σ²/(ε²n) → 0. That two-line proof (Example 7.4) is one of the most satisfying moments in the notes.',
    },
    formulas: [
      { id: 'f-markov', name: "Markov's inequality", tex: 'X\\ge0,\\ x>0:\\quad P(X\\ge x)\\le\\frac{E[X]}{x}', source: 'course', pdfPage: 94,
        rederive: 'Note 1_{X≥x} ≤ X/x always (check both cases), then take E of both sides.' },
      { id: 'f-cheb', name: "Chebyshev's inequality", tex: 'P\\big(|X-E[X]|\\ge x\\big)\\le\\frac{\\mathrm{Var}(X)}{x^2}', source: 'course', pdfPage: 95,
        rederive: 'Markov applied to the non-negative rv |X−E[X]|² at threshold x².' },
    ],
    examples: {
      simple: 'X≥0 with E[X]=10: P(X ≥ 40) ≤ ¼, whatever the distribution.',
      everyday: 'Average queue 5 people ⟹ at most a third of the time can the queue be 15+.',
      mathematical: 'Bin(1000, 0.01): Chebyshev gives P(X≥36) ≤ 9.9/676 ≈ 0.015 — Markov gave 2/7 (Examples 7.2–7.3).',
      exam: 'Non-examinable here, but a staple of every later probability module — learn the one-line proofs now while they\'re fresh.',
    },
    connections: [
      { to: 'lln', how: 'Chebyshev + σ²/n proves the Weak Law of Large Numbers in two lines (Example 7.4).' },
      { to: 'variance', how: 'Chebyshev is the operational meaning of variance: small Var ⟹ concentration.' },
    ],
    errorIds: [],
  },
  {
    id: 'expectation-tail', title: 'Tail-sum formula for E[X]', icon: '', chapter: 7, pdfPages: [96, 97],
    prereqs: ['expectation-discrete', 'cdf'], examinable: false, lab: 'slabs',
    examNote: 'Section 7 is explicitly non-examinable (p93).',
    whyCare: 'A second route to expectations using survival probabilities — often dramatically easier (Geom and Exp means in one line each).',
    keywords: ['tail sum', 'survival', 'alternative expectation', 'e[x] tail'],
    levels: {
      eli5: 'Instead of asking "how tall is each kid?" and averaging, ask at every height "how many kids are at least this tall?" and stack those counts. Same answer, sneaky angle.',
      human: 'For non-negative X: E[X] = ∫₀^∞ P(X > x)dx; discrete on {0,1,2,…}: E[X] = Σ_{j≥1} P(X ≥ j). Payoffs: E[Exp(λ)] = ∫e^{−λx}dx = 1/λ without integration by parts; E[Geom(p)] = Σ(1−p)^{j−1} = 1/p without differentiating series.',
      uni: 'Theorem 7.2: $X\\ge0\\Rightarrow E[X]=\\int_0^\\infty P(X\\ge x)\\,dx$. Proof: $X=\\int_0^\\infty \\mathbb 1_{\\{x\\le X\\}}dx$; take expectations and swap $E$ with $\\int$ (allowed for non-negative integrands). Corollary 7.2: $S_X\\subseteq\\{0,1,2,\\dots\\}\\Rightarrow E[X]=\\sum_{j=1}^{\\infty}P(X\\ge j)$.',
      deep: 'Geometrically: E[X] is the area ABOVE the cdf (below the survival curve) — integrating vertically (values × density) or horizontally (tail slabs) measures the same region. The interchange of E and ∫ is Tonelli\'s theorem in embryo. This formula is the tool that cracks the random-walk return time next.',
    },
    formulas: [
      { id: 'f-tail', name: 'Tail-sum formula', tex: 'E[X]=\\int_0^\\infty P(X\\ge x)\\,dx\\qquad\\text{(discrete: } E[X]=\\sum_{j\\ge1}P(X\\ge j)\\text{)}', source: 'course', pdfPage: 96,
        rederive: 'Write X as the length of [0,X): X = ∫1_{x≤X}dx; take expectations; swap E and ∫.' },
    ],
    examples: {
      simple: 'X uniform on {1,2,3}: tails P(X≥1)+P(X≥2)+P(X≥3) = 1 + 2/3 + 1/3 = 2 = E[X] ✓.',
      everyday: '"Expected days your phone battery survives" = sum over days of P(still alive on day j).',
      mathematical: 'E[Geom(p)] = Σ_{j≥1}(1−p)^{j−1} = 1/p — one geometric series, no derivatives (Example 7.6).',
      exam: 'Non-examinable here; in later courses it\'s the standard trick for expectations of stopping times.',
    },
    connections: [
      { to: 'cdf', how: 'E[X] = area above the cdf: the two descriptions of a distribution meet.' },
      { to: 'random-walk-return', how: 'Supplies E[T] = 2 + 2ΣP(T ≥ 2j) in the return-time computation.' },
    ],
    errorIds: [],
  },
  {
    id: 'random-walk-return', title: 'Random walk: infinite expected return', icon: '', chapter: 7, pdfPages: [97, 98],
    prereqs: ['random-walk-intro', 'expectation-tail'], examinable: false, lab: 'walk',
    examNote: 'Section 7 is explicitly non-examinable (p93).',
    whyCare: 'A stunning finale: the walk returns to 0 with probability 1 — yet the EXPECTED waiting time is infinite. Certainty and patience are different things.',
    keywords: ['return time', 'recurrent', 'reflection principle', 'infinite expectation'],
    levels: {
      eli5: 'The wandering frog ALWAYS finds its way home — promise. But if you ask "how long on average?", the answer is: longer than any number you can name. Some trips are so epically long they break the average.',
      human: 'Let T = first return time to 0. From §3.6: P(T < ∞) = 1 (recurrence — the walk surely returns). But via the tail-sum formula and the reflection principle one finds P(T ≥ 2j) = P(S_{2j−2} = 0) ≈ 1/√(π(j−1)), and Σ 1/√n diverges — so E[T] = ∞. Sure return, unbounded average wait.',
      uni: 'Using Corollary 7.2: $E[T]=2+2\\sum_{j\\ge2}P(T\\ge 2j)$. The reflection principle converts "stays positive until $2j-2$" into a difference of endpoint probabilities, yielding the striking identity $P(T\\ge 2j)=P_0(S_{2j-2}=0)=\\binom{2j-2}{j-1}2^{-(2j-2)}\\sim\\frac1{\\sqrt{\\pi(j-1)}}$ (Stirling). The tail series diverges $\\Rightarrow E[T]=\\infty$.',
      deep: 'This is the canonical example of a heavy-tailed distribution: tails P(T≥2j) shrink like j^{−1/2} — slow enough that the mean diverges even though T is finite almost surely. Moral: "it will definitely happen" and "it happens soon on average" are separated by an infinite gulf. The reflection principle itself — count bad paths by flipping them at their first zero — is a gem of combinatorial probability.',
    },
    formulas: [
      { id: 'f-return', name: 'The punchline', tex: 'P(T<\\infty)=1\\quad\\text{but}\\quad E[T]=2+2\\sum_{n\\ge0} P_0(S_{2n}=0)=\\infty', source: 'course', pdfPage: 98 },
    ],
    examples: {
      simple: 'Fair coin, track (heads − tails): it certainly re-equalises, but the average wait to re-equalise is infinite.',
      everyday: 'A gambler betting £1 on fair coin flips WILL break even again eventually — but budgeting for "eventually" is impossible: its average is infinite.',
      mathematical: 'ΣP(S₂ₙ=0) ≈ Σ1/√(πn) diverges — a p-series with p = ½ (p97–98).',
      exam: 'Non-examinable — the notes literally say to skip it if you only want the exam. Read it anyway; it\'s the best story in the course.',
    },
    connections: [
      { to: 'random-walk-intro', how: 'Uses the path-counting C(n,n/2)/2ⁿ from chapter 2.' },
      { to: 'expectation-discrete', how: 'A concrete rv whose expectation genuinely fails to exist — the absolute-convergence caveat wasn\'t pedantry.' },
    ],
    errorIds: [],
  },
];
