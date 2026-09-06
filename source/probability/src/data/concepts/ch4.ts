import type { Concept } from '../types';

/* Chapter 4 — Discrete random variables (file pages 41–63) */

export const CH4: Concept[] = [
  {
    id: 'random-variable', title: 'Random variables', icon: '', chapter: 4, pdfPages: [41, 43],
    prereqs: ['sample-space'], examinable: true, lab: 'rvmap',
    whyCare: 'Turns raw outcomes into NUMBERS you can add, average and compare. Despite the name: neither random nor a variable — it\'s a function.',
    keywords: ['random variable', 'support', 'function', 'discrete', 'continuous', 'x(w)'],
    levels: {
      eli5: 'The experiment produces a story ("head, tail, head"); the random variable is a counting machine that turns each story into a number ("2 heads"). Different machines can read the same story.',
      human: 'A random variable X is a function X: Ω → S ⊆ ℝ assigning a number to each outcome. S is the support. Events like {X=2} secretly mean {ω : X(ω)=2} — a set of outcomes. Discrete: finite or countable support. Continuous: uncountable support (an interval). Many rvs can live on ONE sample space (heads count X, tails count Y=3−X, …).',
      uni: 'Definition 4.1: $X:\\Omega\\to S\\subseteq\\mathbb R$; $S$ is the support. Notation: capital $X$ for the rv, lower-case $x$ for values; $\\{X=x\\}=\\{\\omega\\in\\Omega: X(\\omega)=x\\}$, and $P(X\\in A)=P(\\{\\omega:X(\\omega)\\in A\\})$. Definition 4.2/4.3: discrete iff $S$ finite or countably infinite; continuous iff $S$ uncountable (e.g. $[0,\\infty)$).',
      deep: 'Why functions? Because the 2ⁿ-outcome coin space is unwieldy, but "number of heads" compresses exactly the information you need. The rv PUSHES the measure P forward onto the number line: P_X(A)=P(X∈A) — a new probability measure on numbers, called the distribution/law of X. All of chapters 4–6 studies these pushed-forward measures while Ω fades politely into the background.',
    },
    formulas: [
      { id: 'f-rv', name: 'A random variable is a function', tex: 'X:\\Omega\\to S\\subseteq\\mathbb R,\\qquad \\{X=x\\}=\\{\\omega\\in\\Omega: X(\\omega)=x\\}', source: 'course', pdfPage: 41 },
    ],
    examples: {
      simple: 'Three tosses, X = number of heads: X(HHT)=2, X(TTT)=0.',
      everyday: 'Your commute is the outcome; X = minutes late is the number the world extracts from it.',
      mathematical: 'On Ω={HHH,…,TTT}: X=#heads, Y=3−X, Z=#heads in last two tosses — three rvs, one space (Example 4.1).',
      exam: '"Write down the support of X" — an easy mark students drop by not reading which values are actually attainable.',
    },
    connections: [
      { to: 'pmf', how: 'A discrete rv is fully described by its pmf: the probability of each support point.' },
      { to: 'cdf', how: 'ANY rv (discrete or continuous) is fully described by its cdf.' },
    ],
    errorIds: ['binom-support'],
  },
  {
    id: 'pmf', title: 'Probability mass functions', icon: '', chapter: 4, pdfPages: [43, 43],
    prereqs: ['random-variable'], examinable: true, lab: 'pmfcdf',
    whyCare: 'The complete DNA of a discrete random variable: a bar per value. Everything (cdf, expectation, variance) is computed from it.',
    keywords: ['pmf', 'probability mass function', 'mass', 'fx'],
    levels: {
      eli5: 'A row of jars, one per possible number, each holding that number\'s share of the probability sand. All the sand together weighs exactly 1.',
      human: 'fX(x) = P(X=x). Two health checks: every value ≥ 0, and the values sum to 1 over the support. From the pmf you can get any probability: P(X∈A) = Σ_{x∈A} fX(x). For 3 coin tosses: f(0)=1/8, f(1)=3/8, f(2)=3/8, f(3)=1/8.',
      uni: 'Definition 4.4: $f_X:\\mathbb R\\to[0,1]$, $f_X(x)=P(X=x)$; $f_X(x)=0$ for $x\\notin S$ and $\\sum_{x\\in S}f_X(x)=1$. The pmf induces the distribution (law) $P_X$ of $X$ on $S$ via Theorem 1.3 — a genuine probability measure on the number line.',
      deep: 'The pmf is Theorem 1.3 re-badged: non-negative numbers summing to 1 define a measure. "Σ=1" is not bureaucracy — exam questions hide a constant c in the pmf and expect you to find it by imposing the sum. The pmf idea DIES for continuous rvs (all masses are 0), which forces the cdf/pdf technology of chapter 5.',
    },
    formulas: [
      { id: 'f-pmf', name: 'PMF and its two checks', tex: 'f_X(x)=P(X=x),\\qquad f_X(x)\\ge0,\\qquad \\sum_{x\\in S}f_X(x)=1', source: 'course', pdfPage: 43 },
    ],
    examples: {
      simple: 'Fair dice: fX(x)=1/6 for x=1,…,6.',
      everyday: 'Number of goals your team scores Saturday: f(0)=0.35, f(1)=0.33, f(2)=0.2, … — a bookmaker\'s pmf.',
      mathematical: 'X=#heads in 3 tosses: (1/8, 3/8, 3/8, 1/8) on {0,1,2,3} (Example 4.4).',
      exam: '"The pmf is f(x)=cx for x=1,2,3,4. Find c." — impose Σ=1: c(1+2+3+4)=1, c=1/10. Classic opener.',
    },
    connections: [
      { to: 'cdf', how: 'Cdf = running total of the pmf; pmf = jump sizes of the cdf.' },
      { to: 'expectation-discrete', how: 'E[X] = Σ x·f(x): the pmf is the weights.' },
    ],
    errorIds: ['sum-to-one', 'pmf-pdf'],
  },
  {
    id: 'cdf', title: 'Cumulative distribution functions', icon: '', chapter: 4, pdfPages: [44, 46],
    prereqs: ['pmf'], examinable: true, lab: 'pmfcdf',
    whyCare: 'The ONE description that works for every random variable, discrete or continuous. Interval probabilities are just two cdf values subtracted.',
    keywords: ['cdf', 'cumulative', 'distribution function', 'staircase', 'right-continuous', 'jump'],
    levels: {
      eli5: 'Walk along the number line from far left, scooping up probability sand as you pass each jar. F(x) is how much sand your bucket holds when you reach x. The bucket only ever fills up — from 0 to 1.',
      human: 'FX(x) = P(X ≤ x). Properties (Theorem 4.1): non-decreasing; → 0 at −∞; → 1 at +∞; right-continuous. Discrete rvs give a STAIRCASE: flat between support points, jumping by P(X=x) at each x. Interval trick (Theorem 4.2): P(a < X ≤ b) = F(b) − F(a). Recover the pmf from a staircase: jump height at x = P(X=x).',
      uni: 'Definition 4.5: $F_X(x)=P(X\\le x)$. Theorem 4.1: $F_X$ non-decreasing, $\\lim_{x\\to-\\infty}F_X=0$, $\\lim_{x\\to\\infty}F_X=1$, right-continuous. Theorem 4.2: $P(X\\in(a,b])=F_X(b)-F_X(a)$. Theorem 4.3: ANY function with these properties is the cdf of some rv — so cdfs are a complete, universal language for distributions.',
      deep: 'Note the ≤ convention: it makes F right-continuous, and it makes the interval formula work for half-open (a,b]. At a jump, the pmf lives in the GAP between the left limit and F(x). Theorem 4.3 is quietly profound: to build a random variable you need not construct Ω at all — write down any valid F and a random variable exists with that law. Chapter 5 exploits exactly this to DEFINE Unif, Exp and Normal by their cdfs.',
    },
    formulas: [
      { id: 'f-cdf', name: 'CDF and the interval formula', tex: 'F_X(x)=P(X\\le x),\\qquad P(a<X\\le b)=F_X(b)-F_X(a)',
        parts: [
          { sym: 'F_X(b)', meaning: 'everything up to b', color: 'known' },
          { sym: 'F_X(a)', meaning: 'remove everything up to a', color: 'bad' },
        ], source: 'course', pdfPage: 44,
        rederive: '{X≤b} splits as {X≤a} ⊔ {a<X≤b}; subtract.' },
    ],
    examples: {
      simple: 'One toss, X=#heads: F(x)=0 for x<0, ½ for 0≤x<1, 1 for x≥1.',
      everyday: '"What fraction of students scored ≤ 60?" — an empirical cdf question.',
      mathematical: '3 tosses: F(2) = P(X≤2) = 7/8 (Example 4.5); pmf recovered from jumps (Example 4.6).',
      exam: '"Sketch FX and find P(1 < X ≤ 3)" — draw the staircase with solid dots on the left of each jump, subtract two values.',
    },
    connections: [
      { to: 'pdf', how: 'For continuous rvs the pdf is (essentially) the derivative of the cdf.' },
      { to: 'geometric', how: 'P(X>n)=(1−p)ⁿ is one minus the geometric cdf — the survival form.' },
    ],
    errorIds: ['cdf-direction', 'binom-support'],
  },
  {
    id: 'bernoulli', title: 'Bernoulli distribution', icon: '', chapter: 4, pdfPages: [46, 47],
    prereqs: ['pmf'], examinable: true, lab: 'binomial',
    whyCare: 'The atom of randomness: one yes/no trial. Binomial, geometric — even indicator variables — are all built from Bernoulli bricks.',
    keywords: ['bernoulli', 'trial', 'success', 'failure', 'ber(p)'],
    levels: {
      eli5: 'One coin flip with a sticker: 1 if it worked, 0 if it didn\'t. That\'s the whole distribution.',
      human: 'X ~ Ber(p): P(X=1) = p (success), P(X=0) = 1−p (failure). Flipping labels: 1−X ~ Ber(1−p). Mean p, variance p(1−p) (maximised at p=½ — a fair coin is the most unpredictable).',
      uni: 'Definition 4.6: $X\\sim\\mathrm{Ber}(p)$, $p\\in[0,1]$: $f_X(1)=p$, $f_X(0)=1-p$. Cdf: $0$ for $x<0$; $1-p$ for $0\\le x<1$; $1$ for $x\\ge1$. Moments: $E[X]=p$, $E[X^2]=p$, $\\mathrm{Var}(X)=p(1-p)$. $\\mathrm{Bin}(1,p)=\\mathrm{Ber}(p)$.',
      deep: 'E[X]=p because only the x=1 term survives the sum — which is exactly why indicator functions (chapter 7) satisfy E[1_A]=P(A), converting probabilities into expectations. Any event you can phrase as yes/no is secretly a Bernoulli rv; sums of them build every counting distribution in this course.',
    },
    formulas: [
      { id: 'f-ber', name: 'Bernoulli pmf', tex: 'P(X=1)=p,\\quad P(X=0)=1-p,\\qquad E[X]=p,\\ \\mathrm{Var}(X)=p(1-p)', source: 'course', pdfPage: 46 },
    ],
    examples: {
      simple: 'Fair coin, success = heads: Ber(½).',
      everyday: 'Your penalty kick: scores with p = 0.76 → Ber(0.76).',
      mathematical: 'X~Ber(p) ⟹ 1−X~Ber(1−p) — relabelling success and failure (p47).',
      exam: 'Rarely asked alone; appears as the building block: "write Y = ΣXᵢ with Xᵢ~Ber(p) independent" is the expected phrase.',
    },
    connections: [
      { to: 'binomial', how: 'Sum of n independent Ber(p) = Bin(n,p).' },
      { to: 'indicators', how: 'The indicator 1_A is a Bernoulli rv with p = P(A).' },
    ],
    errorIds: [],
  },
  {
    id: 'binomial', title: 'Binomial distribution', icon: '', chapter: 4, pdfPages: [47, 49],
    prereqs: ['bernoulli', 'combinations'], examinable: true, lab: 'binomial',
    whyCare: 'Counts successes in n independent identical trials — the most-used discrete model in the course and in exams.',
    keywords: ['binomial', 'bin(n,p)', 'successes', 'trials', 'n choose x'],
    levels: {
      eli5: 'Shoot 10 free throws. The binomial tells you the chance of exactly 0, 1, 2, … 10 going in — one number per bar, tallest near what usually happens.',
      human: 'X ~ Bin(n,p) = number of successes in n independent Bernoulli(p) trials. P(X=x) = C(n,x)pˣ(1−p)ⁿ⁻ˣ: choose WHICH x trials succeed (C(n,x) ways), each such pattern has probability pˣ(1−p)ⁿ⁻ˣ. E[X]=np, Var(X)=np(1−p). Also: X+Y with independent Bin(n,p), Bin(m,p) is Bin(n+m,p); failures n−X ~ Bin(n,1−p).',
      uni: 'Definition 4.7: $f_X(x)=\\binom{n}{x}p^x(1-p)^{n-x}$, $x\\in\\{0,\\dots,n\\}$. Sums to 1 by the binomial expansion of $(p+(1-p))^n$. If $Y_i\\sim\\mathrm{Ber}(p)$ independent then $\\sum_{i=1}^n Y_i\\sim\\mathrm{Bin}(n,p)$. $E[X]=np$ (linearity — Example 6.6), $\\mathrm{Var}(X)=np(1-p)$ (independence — Example 6.12).',
      deep: 'The pmf is a story in three factors: a COUNT of arrangements × probability of successes × probability of failures. Deriving E[X]=np by linearity (write X as a sum of Bernoullis) versus grinding the pmf sum (Example 6.6 does both) is the course\'s clearest advert for structural thinking. As n grows with np fixed, the binomial morphs into the Poisson; that limit is the bridge to chapter 4\'s last act.',
    },
    formulas: [
      { id: 'f-bin', name: 'Binomial pmf', tex: 'P(X=x)=\\binom{n}{x}p^x(1-p)^{n-x}',
        parts: [
          { sym: '\\binom{n}{x}', meaning: 'which x of the n trials succeed', color: 'known' },
          { sym: 'p^x', meaning: 'those x successes', color: 'good' },
          { sym: '(1-p)^{n-x}', meaning: 'the n−x failures', color: 'bad' },
        ], source: 'course', pdfPage: 47,
        rederive: 'One specific success-pattern has probability pˣ(1−p)ⁿ⁻ˣ; count the patterns with C(n,x).' },
      { id: 'f-bin-mv', name: 'Mean & variance', tex: 'E[X]=np,\\qquad \\mathrm{Var}(X)=np(1-p)', source: 'course', pdfPage: 83,
        rederive: 'X = ΣXᵢ (Bernoullis): means add always; variances add by independence.' },
    ],
    examples: {
      simple: '3 coin tosses: P(exactly 2 heads) = C(3,2)(½)³ = 3/8.',
      everyday: '20 penalty kicks at p=0.75: P(score exactly 15) = C(20,15)(0.75)¹⁵(0.25)⁵.',
      mathematical: 'Components defective w.p. ¼: P(X≥2 of 3) = 3·(1/4)²(3/4) + (1/4)³ = 5/32 (Example 4.7).',
      exam: '"State the distribution of X, with parameters, and find P(X≥2)" — name Bin(n,p), justify (independent identical trials), then complement: 1−P(0)−P(1).',
    },
    connections: [
      { to: 'poisson', how: 'Bin(n,p) ≈ Pois(np) for large n, small p — the rare-events limit.' },
      { to: 'convolution', how: 'Bin(n,p)+Bin(m,p)=Bin(n+m,p); comparing pmfs proves Vandermonde\'s identity.' },
      { to: 'lln', how: 'X̄ = X/n concentrates on p — how you estimate an unknown p.' },
    ],
    errorIds: ['binom-support', 'wrong-distribution', 'complement-forgot'],
  },
  {
    id: 'geometric', title: 'Geometric distribution', icon: '', chapter: 4, pdfPages: [49, 52],
    prereqs: ['bernoulli'], examinable: true, lab: 'geometric',
    whyCare: 'How long until the first success? Waiting-time questions (and their lovely survival trick P(X>n)=(1−p)ⁿ) are exam regulars.',
    keywords: ['geometric', 'waiting', 'first success', 'geom(p)', 'trials until'],
    levels: {
      eli5: 'Keep rolling until you get a six. Maybe first roll! Probably not. The geometric says how likely each waiting time is — short waits common, long waits fading away but never impossible.',
      human: 'X ~ Geom(p) = number of trials UP TO AND INCLUDING the first success (support 1,2,3,…). P(X=k) = (1−p)^(k−1)p: k−1 failures then a success. The star identity: P(X>n) = (1−p)ⁿ — "no success in the first n trials" — giving the cdf 1−(1−p)ⁿ instantly. E[X]=1/p (p=1/6 → expect 6 rolls). BEWARE the other textbook convention counting failures from 0; this course starts at 1.',
      uni: 'Definition 4.8: $f_X(k)=(1-p)^{k-1}p$, $k\\in\\{1,2,\\dots\\}$, $p\\in(0,1]$. Sums to 1 by the geometric series $\\sum_{i\\ge0}r^i=\\frac1{1-r}$ (Theorem 4.4). $P(X>n)=(1-p)^n$, $F_X(x)=1-(1-p)^{\\lfloor x\\rfloor}$ for $x\\ge1$ (Eq. 44). $E[X]=1/p$ (Example 6.2), $\\mathrm{Var}(X)=(1-p)/p^2$ (Example 6.8).',
      deep: 'Geometric is the discrete memoryless distribution: given no success so far, the future looks exactly like a fresh start — visible in P(X>m+n | X>m) = (1−p)ⁿ. Its continuous twin is the exponential (chapter 5 calls it "a continuous counterpart"). The E[X]=1/p derivation by differentiating the geometric series is a classic trick; the tail-sum formula of chapter 7 gets it with almost no work.',
    },
    formulas: [
      { id: 'f-geom', name: 'Geometric pmf', tex: 'P(X=k)=(1-p)^{k-1}\\,p\\quad (k=1,2,\\ldots)',
        parts: [
          { sym: '(1-p)^{k-1}', meaning: 'k−1 failures first', color: 'bad' },
          { sym: 'p', meaning: 'then the first success', color: 'good' },
        ], source: 'course', pdfPage: 49,
        rederive: 'Spell the story: fail, fail, …, fail (k−1 times), succeed. Independence multiplies.' },
      { id: 'f-geom-tail', name: 'Survival / cdf', tex: 'P(X>n)=(1-p)^n,\\qquad P(X\\le n)=1-(1-p)^n', source: 'course', pdfPage: 51,
        rederive: '"Still waiting after n" = "first n trials all failed".' },
      { id: 'f-geom-mv', name: 'Mean & variance', tex: 'E[X]=\\frac1p,\\qquad \\mathrm{Var}(X)=\\frac{1-p}{p^2}', source: 'course', pdfPage: 79 },
    ],
    examples: {
      simple: 'Fair coin: P(first head on toss 3) = (½)²(½) = 1/8.',
      everyday: 'Job applications with a 10% hit rate: expected number until first interview = 1/0.1 = 10.',
      mathematical: 'Geom(1/4): P(X>2) = (3/4)² = 9/16 (Example 4.9).',
      exam: 'Billy Forgetful attends w.p. 0.3: P(X>5) = 0.7⁵ ≈ 0.168 (Example 4.11). State the convention (first success counted) before computing.',
    },
    connections: [
      { to: 'exponential', how: 'Exponential = geometric\'s continuous twin; both are memoryless.' },
      { to: 'complement-trick', how: 'P(X>n)=(1−p)ⁿ IS "no success in n trials" — the complement trick as a distribution fact.' },
    ],
    errorIds: ['geom-convention', 'wrong-distribution', 'cdf-direction'],
  },
  {
    id: 'poisson', title: 'Poisson distribution', icon: '', chapter: 4, pdfPages: [52, 55],
    prereqs: ['binomial'], examinable: true, lab: 'poisson',
    whyCare: 'Counts events arriving at a rate — sneezes, buses, road accidents, WWII bombs. Also the official approximation to Bin(n,p) for rare events.',
    keywords: ['poisson', 'rate', 'lambda', 'pois', 'arrivals', 'approximation'],
    levels: {
      eli5: 'Raindrops ping a tin roof about 3 times a minute, but randomly. Poisson tells you the chance of exactly 0, 1, 2, … pings this minute — 3-ish most likely, 12 very unlikely, never impossible.',
      human: 'X ~ Pois(λ): P(X=x) = λˣe^(−λ)/x!, x = 0,1,2,… — λ is BOTH the mean and the variance. Model for counts of events at constant rate over a fixed window (rescale λ to the window: rate 1.2/min for 20 min → λ=24, Example 4.12). Approximates Bin(n,p) when n large, p small, λ=np (typesetter: Bin(1500,1/500) ≈ Pois(3), answers agree to 3dp).',
      uni: 'Definition 4.9: $f_X(x)=\\frac{\\lambda^x}{x!}e^{-\\lambda}$, $x\\in\\{0,1,2,\\dots\\}$, $\\lambda>0$. Sums to 1 by $\\sum_x \\lambda^x/x! = e^{\\lambda}$. $E[X]=\\mathrm{Var}(X)=\\lambda$. Additivity: independent $\\mathrm{Pois}(\\lambda)+\\mathrm{Pois}(\\mu)\\sim\\mathrm{Pois}(\\lambda+\\mu)$ (Example 4.20). Poisson limit: $\\mathrm{Bin}(n,p)\\approx\\mathrm{Pois}(np)$ for large $n$, small $p$.',
      deep: 'Why e? Slice the time window into n tiny slots, each an almost-Bernoulli(λ/n): Bin(n,λ/n) → the (1−λ/n)ⁿ factor → e^(−λ). Poisson is what Binomial becomes when trials are infinitely many and individually negligible. Rates add for merged independent streams (the Example 4.20 convolution) — that\'s why "arrivals at a till" is Poisson even though customers come from many sources. Clarke\'s 1946 flying-bomb analysis used exactly this fit to show the hits were random, not aimed.',
    },
    formulas: [
      { id: 'f-pois', name: 'Poisson pmf', tex: 'P(X=x)=\\frac{\\lambda^x}{x!}e^{-\\lambda}',
        parts: [
          { sym: '\\lambda', meaning: 'expected number of events in the window (mean AND variance)', color: 'known' },
          { sym: 'e^{-\\lambda}', meaning: 'chance of an empty window; the normaliser', color: 'cond' },
          { sym: 'x!', meaning: 'events are indistinguishable — divide out their orderings', color: 'warn' },
        ], source: 'course', pdfPage: 52 },
      { id: 'f-pois-add', name: 'Rates add', tex: 'X\\sim\\mathrm{Pois}(\\lambda),\\ Y\\sim\\mathrm{Pois}(\\mu)\\ \\text{indep}\\ \\Rightarrow\\ X+Y\\sim\\mathrm{Pois}(\\lambda+\\mu)', source: 'course', pdfPage: 62 },
    ],
    examples: {
      simple: 'λ=1: P(no events) = e⁻¹ ≈ 0.37.',
      everyday: 'A café gets 4 orders/min at lunch. P(exactly 6 next minute) = 4⁶e⁻⁴/6!.',
      mathematical: 'Freddie sneezes at 1.2/min; P(zero sneezes in 20 min) = e⁻²⁴ (Example 4.12 — poor Freddie).',
      exam: 'Typesetter: 1 error per 500 words, 5 pages × 300 words: exact Bin(1500,1/500) vs Pois(3) → P(X≤2) ≈ 0.423 both ways (Example 4.13). Exams reward doing BOTH and comparing.',
    },
    connections: [
      { to: 'binomial', how: 'The n→∞, p→0, np=λ limit of the binomial.' },
      { to: 'exponential', how: 'If counts are Pois(λt), the wait for the first event is Exp(λ) — same process, two views (Example 5.3).' },
      { to: 'convolution', how: 'The additivity proof is the course\'s showpiece discrete convolution.' },
    ],
    errorIds: ['poisson-rate', 'wrong-distribution'],
  },
  {
    id: 'joint-discrete', title: 'Joint & marginal distributions', icon: '', chapter: 4, pdfPages: [55, 57],
    prereqs: ['pmf', 'total-probability'], examinable: true, lab: 'jointtable',
    whyCare: 'Two random variables on one experiment: the joint table holds EVERYTHING — marginals fall out by summing rows and columns. Guaranteed exam territory.',
    keywords: ['joint', 'marginal', 'joint pmf', 'table', 'two variables'],
    levels: {
      eli5: 'A bingo grid: rows are values of X, columns are values of Y, each cell holds the chance of that exact pair. Add along a row to forget Y; add down a column to forget X.',
      human: 'Joint pmf: f_{X,Y}(x,y) = P(X=x, Y=y); all cells ≥ 0 and sum to 1. Marginal of X: sum the joint over all y (law of total probability with the partition {Y=y}). The joint table with row/column totals in the margins (that\'s literally why they\'re called "marginals") is the standard exam presentation (Example 4.17).',
      uni: 'Definition 4.10: $f_{X,Y}(x,y)=P(X=x,Y=y)$, $\\sum_x\\sum_y f_{X,Y}=1$. Marginals: $f_X(x)=\\sum_{y\\in S_Y}f_{X,Y}(x,y)$ and symmetrically for $Y$. Joint cdf (Definition 4.11): $F_{X,Y}(x,y)=P(X\\le x, Y\\le y)$; non-decreasing in each coordinate, $F(\\infty,\\infty)=1$, $F(-\\infty,y)=F(x,-\\infty)=0$.',
      deep: 'The joint contains strictly MORE information than both marginals: many different joints share the same marginals (correlation lives in the joint, not the margins). Summing out a variable is total probability in disguise — the partition {Y=y₁},{Y=y₂},… slices the world. When later you meet Cov(X,Y), it will be computed from exactly this table.',
    },
    formulas: [
      { id: 'f-joint', name: 'Joint pmf and marginals', tex: 'f_{X,Y}(x,y)=P(X=x,Y=y),\\qquad f_X(x)=\\sum_{y\\in S_Y}f_{X,Y}(x,y)',
        parts: [
          { sym: 'f_{X,Y}(x,y)', meaning: 'one cell of the table', color: 'known' },
          { sym: '\\sum_{y\\in S_Y}', meaning: 'sum the row: forget Y', color: 'cond' },
        ], source: 'course', pdfPage: 56 },
    ],
    examples: {
      simple: 'Two dice, X=first, Y=second: every cell 1/36; marginals 1/6 each.',
      everyday: 'X = coffees you buy, Y = hours you sleep — a joint table would reveal their (negative?) relationship; the marginals alone can\'t.',
      mathematical: 'f(x,y)=(2x+y)/36 on {0,1,2}×{1,2,3}: marginals (x+1)/6 and (2+y)/12 (Example 4.17).',
      exam: '"Complete the joint table, find both marginals, and determine whether X and Y are independent" — the classic three-parter.',
    },
    connections: [
      { to: 'independence-rvs', how: 'Independence ⟺ every cell = product of its marginals.' },
      { to: 'covariance', how: 'Cov(X,Y)=E[XY]−E[X]E[Y] is computed straight off the joint table.' },
    ],
    errorIds: ['marginal-mix', 'sum-to-one'],
  },
  {
    id: 'independence-rvs', title: 'Independence of random variables', icon: '', chapter: 4, pdfPages: [58, 61],
    prereqs: ['joint-discrete', 'independence'], examinable: true, lab: 'jointtable',
    whyCare: 'When the joint factorises into marginals, everything simplifies: products of expectations, adding variances, convolution formulas.',
    keywords: ['independent random variables', 'factorise', 'joint factorisation'],
    levels: {
      eli5: 'Two spinners that don\'t touch: the chance of "red AND 7" is just chance-of-red times chance-of-7. Every combination, every time.',
      human: 'X ⊥ Y iff P(X=x, Y=y) = P(X=x)P(Y=y) for ALL pairs (discrete; Theorem 4.5), equivalently the joint cdf factorises (the general definition 4.12). One non-factorising cell breaks independence — e.g. X=first roll, Z=sum: P(X=1, Z=12)=0 ≠ P(X=1)P(Z=12) (Example 4.18). Shortcut (Theorem 5.5): if the joint pmf splits as g(x)h(y), they\'re independent — no need to normalise first.',
      uni: 'Definition 4.12: $X\\perp Y \\iff P(X\\le x, Y\\le y)=P(X\\le x)P(Y\\le y)\\ \\forall x,y$. Theorem 4.5 (discrete): $\\iff f_{X,Y}(x,y)=f_X(x)f_Y(y)$ on the supports. Theorem 4.6: equivalent interval formulation. Theorem 5.5(a): factorisation into ANY $g(x)h(y)$ suffices (the marginals are then proportional to $g$ and $h$).',
      deep: 'The g(x)h(y) trick is beautiful: independence is a structural property (separability), not a numerical one — the normalising constants sort themselves out because the total must be 1. Example 4.19 uses it: 3ˣ/4^{x+y} = (3/4)ˣ · (1/4)ʸ separates, so the pair is independent and the marginals turn out geometric. Non-negative separability failing ANYWHERE (a single zero cell in an otherwise positive table) kills independence instantly — zeros are the fastest disproof.',
    },
    formulas: [
      { id: 'f-indep-rv', name: 'Independence (discrete)', tex: 'P(X=x,\\,Y=y)=P(X=x)\\,P(Y=y)\\quad\\forall x,y', source: 'course', pdfPage: 58 },
    ],
    examples: {
      simple: 'Two dice rolls: 1/36 = (1/6)(1/6) for every pair ✓ (Example 4.18).',
      everyday: 'Your phone battery % and today\'s rainfall: plausibly independent — every combination\'s chance is the product.',
      mathematical: 'f(x,y)=3ˣ/4^{x+y} factorises → X⊥Y with geometric marginals (Example 4.19).',
      exam: '"Are X and Y independent?" from a table: find ONE cell where joint ≠ product (often a 0 cell) — a single counterexample is full marks.',
    },
    connections: [
      { to: 'product-independence', how: 'Gives E[XY]=E[X]E[Y] and Cov=0.' },
      { to: 'convolution', how: 'The sum formula P(X+Y=k)=ΣP(X=x)P(Y=k−x) needs exactly this factorisation.' },
      { to: 'independence-continuous', how: 'Same story with pdfs in chapter 5.' },
    ],
    errorIds: ['marginal-mix', 'product-expectation'],
  },
  {
    id: 'convolution', title: 'Sums of independent rvs', icon: '', chapter: 4, pdfPages: [61, 63],
    prereqs: ['independence-rvs'], examinable: true, lab: 'convolve',
    whyCare: 'What distribution does X+Y have? The convolution formula answers it — and proves the famous Poisson and Binomial addition rules.',
    keywords: ['convolution', 'sum of random variables', 'x+y', 'vandermonde'],
    levels: {
      eli5: 'To land a total of 7 with two dice, pair up every way: 1&6, 2&5, 3&4… Add up the chances of all the pairs. That pairing-and-adding is convolution.',
      human: 'For independent discrete X, Y: P(X+Y=k) = Σₓ P(X=x)P(Y=k−x) — sweep over what X contributed, Y must supply the rest. Two showpieces: Pois(λ)+Pois(μ) = Pois(λ+μ) ("rates add"), and Bin(n,p)+Bin(m,p) = Bin(n+m,p) (pool the trials) — comparing the two computations proves Vandermonde\'s identity C(n+m,k) = Σ C(n,x)C(m,k−x).',
      uni: 'Theorem 4.7: $P(X+Y=k)=\\sum_{x\\in S_X}P(X=x)P(Y=k-x)$. Example 4.20: Poisson sum via the binomial theorem: $\\sum_{i=0}^k \\binom{k}{i}\\lambda^i\\mu^{k-i}=(\\lambda+\\mu)^k$. Example 4.21: Binomial sum by interpretation (pool $n+m$ trials) AND by pmf calculation, yielding Vandermonde: $\\binom{n+m}{k}=\\sum_x\\binom{n}{x}\\binom{m}{k-x}$.',
      deep: 'Proving a combinatorial identity by computing one probability two ways (Example 4.21) is a taste of the probabilistic method: interpretation is a proof technique, not a heuristic. Notice both showpieces need the SAME p (binomial) or free λ, μ (Poisson) — adding Bin(n,p)+Bin(m,q) with p≠q gives nothing nameable. Closure under addition is special, not automatic.',
    },
    formulas: [
      { id: 'f-conv', name: 'Discrete convolution', tex: 'P(X+Y=k)=\\sum_{x\\in S_X}P(X=x)\\,P(Y=k-x)',
        parts: [
          { sym: 'P(X=x)', meaning: 'X contributes x…', color: 'known' },
          { sym: 'P(Y=k-x)', meaning: '…so Y must contribute k−x', color: 'cond' },
        ], source: 'course', pdfPage: 61,
        rederive: 'Partition {X+Y=k} by the value of X; independence factorises each piece.' },
    ],
    examples: {
      simple: 'Two dice: P(total 7) = Σₓ (1/6)(1/6) over x=1..6 = 6/36.',
      everyday: 'Emails/hour from two independent mailing lists at rates 2 and 3 → combined stream Pois(5).',
      mathematical: 'Pois(λ)+Pois(μ) ~ Pois(λ+μ) (Example 4.20).',
      exam: '"Show that X+Y ~ Pois(λ+μ)" — a bookwork derivation: write the convolution, factor out e^{−(λ+μ)}/k!, spot the binomial theorem.',
    },
    connections: [
      { to: 'poisson', how: 'Explains why merging independent event streams stays Poisson.' },
      { to: 'variance-sums', how: 'Distribution of the sum is hard in general; mean and variance of the sum are easy — chapter 6\'s consolation prize.' },
    ],
    errorIds: ['algebra', 'binom-support'],
  },
];
