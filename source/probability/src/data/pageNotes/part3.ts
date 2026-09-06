import type { PageNote } from './types';

/* Line-by-line decode of pages 63–98 (Chapters 5–7). */

export const NOTES3: Record<number, PageNote[]> = {
  63: [
    { ref: 'Example 4.21 (end)', what: 'Grinding the Bin+Bin convolution and comparing with the known answer proves **Vandermonde\'s identity** C(n+m,k) = Σₓ C(n,x)C(m,k−x) as a free by-product. Combinatorial reading: choose k from n+m by deciding how many come from the first group. (The alternative algebraic/combinatorial proofs are non-examinable.)', tex: '\\binom{n+m}{k}=\\sum_{x}\\binom{n}{x}\\binom{m}{k-x}' },
    { ref: '§5 opening', what: 'Chapter 5: for rvs with densities every single value has P(X = x) = 0, so a table of point-masses says nothing. The cdf survives (it was defined for all rvs), so continuous distributions are DEFINED through their cdfs, and Theorem 4.3 guarantees that any valid F really does define a random variable.' },
  ],
  64: [
    { ref: 'Definition 5.1', what: '**Uniform(a,b)**: "a completely random point of the interval (a,b)", defined by its cdf — 0 before a, then the FRACTION of the interval covered, then 1 after b. Check it climbs continuously from 0 to 1: valid by Theorem 4.3.', tex: 'F_X(x)=\\frac{x-a}{b-a}\\quad (a<x\\le b)' },
    { ref: 'Figure 20', what: 'The cdf picture: flat, then a straight ramp from (a,0) to (b,1), then flat. No jumps — the signature of a continuous rv.' },
    { ref: 'Remark', what: 'The interval formula gives P(X ∈ (u,v]) = (v−u)/(b−a) for any sub-interval: **only LENGTH matters**, not location. That is the precise meaning of "uniform".', tex: 'P(X\\in(u,v])=\\frac{v-u}{b-a}' },
  ],
  65: [
    { ref: 'Examples 5.1–5.2', what: 'Unif(0,1) — the canonical case, F(x) = x, P(X ≤ 1/2) = 1/2. And scaling: if X ~ Unif(0,1) then Y = 360X ~ Unif(0,360) — a random spinner angle. Rescaling a uniform gives a uniform.' },
    { ref: 'Definition 5.2', what: '**Exponential(λ)**: waiting time until an event that occurs "at constant rate λ" — radioactive decay, the next customer, the next sneeze. The continuous counterpart of the geometric. Defined by cdf 1 − e^(−λx) on x > 0.', tex: 'F_X(x)=1-e^{-\\lambda x}\\quad(x>0)' },
    { ref: 'Example 5.3', what: 'Max the Mechanic: if arrivals in (0,t] are Pois(μt), the FIRST arrival time T satisfies P(T ≤ t) = 1 − P(no arrival) = 1 − e^(−μt), i.e. T ~ Exp(μ). **Poisson counts ⟺ exponential waits** — two views of one process.' },
    { ref: 'Example 5.4', what: 'Minimum of independent exponentials: P(min > x) = e^(−λx)e^(−μx), so min(X,Y) ~ **Exp(λ+μ)**. Two independent alarm clocks racing: the first ring happens at the combined rate.' },
  ],
  66: [
    { ref: 'Figure 21', what: 'Exp cdfs for λ = 1/2, 1, 5, 10: all rise from 0 towards 1; bigger λ = faster rise = shorter waits. λ is a RATE (events per unit time), so mean wait will be 1/λ (proved p80).' },
    { ref: 'Example 5.5', what: 'The **memoryless property**: P(X ≤ x+y | X > x) = 1 − e^(−λy) = P(X ≤ y). Having already waited x minutes tells you NOTHING about the remaining wait — the process has no memory, no "due" events. Proof is two lines from the cdf. The geometric has the discrete version; these are the ONLY memoryless distributions.', tex: 'P(X\\le x+y\\mid X>x)=P(X\\le y)' },
    { ref: 'Definition 5.3', what: '**Normal N(μ, σ²)**: defined by a cdf that is an INTEGRAL of the famous bell-curve expression — no closed form exists; values come from tables or software. μ centres it, σ² spreads it.', tex: 'F_X(x)=\\int_{-\\infty}^{x}\\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(u-\\mu)^2}{2\\sigma^2}}\\,du' },
  ],
  67: [
    { ref: 'Standard normal', what: 'N(0,1) is the **standard normal**; its cdf gets the reserved letter Φ (Figure 22: S-shaped, Φ(0) = 1/2 by symmetry). Why care so much? The **Central Limit Theorem** (semester 2 teaser): centred, appropriately scaled sums of iid rvs with finite positive variance approach a standard normal law — that universality is why the bell curve is everywhere.' },
    { ref: '§5.2 pdf motivation', what: 'With points carrying zero probability, the discrete pmf must be replaced: enter the **pdf**, a density whose AREAS (not values) are probabilities.' },
    { ref: 'Definition 5.4', what: 'f is a pdf for X if the cdf is its running integral: FX(x) = ∫₋∞ˣ f(u)du. Every value of F is an accumulated area under f.', tex: 'F_X(x)=\\int_{-\\infty}^{x}f_X(u)\\,du' },
  ],
  68: [
    { ref: 'Figures 23–24', what: 'Normal cdf galleries: varying μ slides the S-curve left/right without changing shape; varying σ² tilts it — small σ² is a near-step (mass tightly packed at μ), large σ² a long slow climb. Play with both sliders in this app\'s Play tab.' },
  ],
  69: [
    { ref: 'Remarks on pdfs', what: 'Key consequences: (1) P(X ∈ (a,b]) = ∫ₐᵇ f — **probability IS area** under the density (Eq 53, Fig 25); (2) total area ∫f = 1; (3) f ≥ 0; (4) f is essentially the DERIVATIVE of the cdf where that derivative exists (FTC), which is how pdfs are found in practice; (5) pdfs are not unique — changing f at one point changes no integral, so no probability.', tex: 'P(a<X\\le b)=\\int_a^b f_X(u)\\,du' },
    { ref: 'WARNING', what: 'f(x) is NOT P(X = x) — that is 0. A pdf can exceed 1 (e.g. Unif(0, 1/2) has f = 2); only its integrals are probabilities.' },
  ],
  70: [
    { ref: 'Theorem 5.1', what: '**Uniform pdf**: differentiate the ramp cdf — f(x) = 1/(b−a) on (a,b), 0 outside. Constant height: equal lengths, equal areas, the "flat roof". Proof checks the integral in three cases (before a, inside, after b).', tex: 'f_X(x)=\\frac{1}{b-a}\\quad(a<x<b)' },
    { ref: 'Theorem 5.2', what: '**Exponential pdf**: f(x) = λe^(−λx) for x > 0 (differentiating 1 − e^(−λx); verification left as exercise). Starts at height λ, decays exponentially — most of the mass is EARLY.', tex: 'f_X(x)=\\lambda e^{-\\lambda x}\\quad(x>0)' },
  ],
  71: [
    { ref: 'Theorem 5.3', what: '**Normal pdf**: the bell curve itself — what sits inside the defining integral. Symmetric about μ, inflection points at μ±σ.', tex: 'f_X(x)=\\frac{1}{\\sqrt{2\\pi\\sigma^2}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}' },
    { ref: 'Figure 26', what: 'The gallery: cdf and pdf side by side for Unif(a,b), Exp(10), N(0,1). Learn to read both representations of each distribution — steep cdf ⟺ tall pdf.' },
    { ref: 'Examples 5.6–5.7', what: 'Using areas: for X ~ Exp(1), P(X ∈ (1,2]) = F(2) − F(1) = e^(−1) − e^(−2) ≈ 0.233 — computed from the cdf, VISUALISED as the shaded strip of area under the pdf between 1 and 2 (Figure 27).', tex: 'P(1<X\\le 2)=e^{-1}-e^{-2}\\approx 0.2325' },
  ],
  72: [
    { ref: 'Example 5.8', what: 'Real data: times BETWEEN Westminster road accidents in 2019, histogram vs fitted exponential density (Figure 28) — a good fit. Same dataset whose daily COUNTS fit Poisson on p55: counts Poisson ⟺ gaps exponential, the two faces of the same random process.' },
    { ref: 'Definition 5.5', what: '**Joint pdf** for a pair (X,Y): a surface f(x,y) ≥ 0 whose DOUBLE integral over a region gives the probability of landing there; total volume 1.', tex: 'P(X\\le x,\\,Y\\le y)=\\int_{-\\infty}^{x}\\!\\int_{-\\infty}^{y}f_{X,Y}(u,v)\\,dv\\,du' },
  ],
  73: [
    { ref: 'Fubini remark', what: 'The notes wave at **Fubini\'s theorem**: for well-behaved densities you may integrate in either order (x first or y first) — Figure 29\'s "tower of blocks" picture: slice the volume either way, same total. Taken on trust in this course.' },
    { ref: 'Example 5.9', what: 'g(x,y) = (3/16)x² + (1/2)y on its rectangle: integrating x-first and y-first BOTH give 1 — a worked Fubini check and a template for "verify this is a joint pdf" exam parts.' },
  ],
  74: [
    { ref: 'Rectangle probabilities', what: 'Derivation (Eqs 56–58): P(a < X ≤ b, c < Y ≤ d) = the double integral of the joint pdf over the rectangle — obtained from the joint cdf by the same add/subtract-corners trick as the 1-D interval formula. Probability = VOLUME under the density surface over the region.', tex: 'P(a<X\\le b,\\,c<Y\\le d)=\\int_a^b\\!\\int_c^d f_{X,Y}(u,v)\\,dv\\,du' },
  ],
  75: [
    { ref: 'Equation (59)', what: '**Marginal pdf**: integrate the partner variable out — fX(x) = ∫ f(x,y) dy. The continuous twin of "sum the rows": collapse the surface onto one axis (Figures 30–31).', tex: 'f_X(x)=\\int_{-\\infty}^{\\infty}f_{X,Y}(x,y)\\,dy' },
    { ref: 'Scope note', what: 'This course only computes probabilities of RECTANGULAR events for joint continuous rvs; non-rectangular regions (discs, triangles) wait for semester 2.' },
  ],
  76: [
    { ref: 'Theorem 5.4', what: '**Independence for continuous rvs**: X ⊥ Y ⟺ a version of the joint pdf factorises, f(x,y) = fX(x)·fY(y) almost everywhere. Altering a density on a set of area zero does not change its distribution. Same shape as the discrete rule, integrals replacing sums.', tex: 'f_{X,Y}(x,y)=f_X(x)\\,f_Y(y)' },
    { ref: 'Example 5.10', what: 'f(x,y) = 2e^(−x−2y) on the positive quadrant: marginals integrate out to e^(−x) and 2e^(−2y) — so X ~ Exp(1), Y ~ Exp(2), and since the product rebuilds the joint, they are independent.' },
  ],
  77: [
    { ref: 'Example 5.11', what: 'Then P(X ∈ (1,2], Y ∈ (1,2]) = (e^(−1) − e^(−2))(e^(−2) − e^(−4)) ≈ 0.027 — independence turns a double integral into a product of two one-dimensional cdf differences. Factorise first, integrate second: far less work.' },
    { ref: 'Theorem 5.5', what: 'The shortcut: if the joint pdf splits as ANY product g(x)h(y) — even when g, h are not themselves pdfs — then X and Y are independent, and the true marginals are just rescalings of g and h. Spot separability, skip the marginal integrals entirely. Proof: the normalising constants must multiply to 1.' },
  ],
  78: [
    { ref: 'Theorem 5.6 (non-exam)', what: 'If the pdf is bounded then P(X = x) = 0 for every point — squeezing the point inside shrinking intervals whose areas vanish. (Analysis proof, non-examinable.) Also a warning: not every continuous rv even HAS a pdf — beyond this course.' },
    { ref: '§6 opening', what: 'Chapter 6: **expectation** E[X] is the long-run average of X. Careful: for a fair die E[X] = 3.5, a value the die can NEVER show — the average is a property of the distribution, not a typical outcome. **Variance** will measure spread around it.' },
    { ref: 'Definition 6.1', what: 'Discrete expectation: E[X] = Σ x·P(X = x) — each value weighted by its probability. (Fine print: the sum must converge absolutely for E to exist; infinite-support rvs can have E[X] = ∞ — see p97 for a dramatic example.)', tex: 'E[X]=\\sum_{x\\in S}x\\,P(X=x)' },
  ],
  79: [
    { ref: 'Example 6.1', what: 'Fair die: E[X] = (1+2+⋯+6)/6 = **7/2**. The balance point of six equal masses.' },
    { ref: 'Example 6.2', what: '**Geometric mean**: E[X] = Σ k(1−p)^(k−1)p = **1/p**, by the derivative-of-the-geometric-series trick (differentiate Σrᵏ = 1/(1−r) term by term). Success chance 1/4 ⟹ expect 4 tries. Remember the trick, not just the answer — it reappears for the variance on p86.', tex: 'E[X]=\\frac{1}{p}' },
    { ref: 'Definition 6.2', what: 'Continuous expectation: same idea, integral instead of sum — E[X] = ∫ x f(x) dx (again requiring absolute convergence).', tex: 'E[X]=\\int_{-\\infty}^{\\infty}x\\,f_X(x)\\,dx' },
  ],
  80: [
    { ref: 'Example 6.3', what: '**Exponential mean**: E[X] = ∫₀^∞ x λe^(−λx) dx = **1/λ** by integration by parts. Rate λ = 10 per hour ⟹ mean wait 1/10 hour. Rate and mean are reciprocals.', tex: 'E[X]=\\frac{1}{\\lambda}' },
    { ref: 'Footnote (exam intel)', what: 'The lecturer promises: **no difficult integrals in the exam** — any non-trivial integral will be stated in the question. Learn the METHOD, not integral gymnastics.' },
    { ref: 'Theorems 6.1–6.2', what: 'Warm-up properties: X ≥ 0 ⟹ E[X] ≥ 0 (all terms non-negative), and E[a] = a for a constant (certainty has itself as average).' },
    { ref: 'Theorem 6.3', what: '**LOTUS** — the law of the unconscious statistician: E[g(X)] = Σ g(x)P(X = x) (or ∫ g(x)f(x)dx; four versions cover discrete/continuous, one/two variables). You do NOT need the distribution of g(X) itself — reuse X\'s, applying g to the values only, never the probabilities.', tex: 'E[g(X)]=\\sum_{x}g(x)\\,P(X=x)' },
  ],
  81: [
    { ref: 'WARNING', what: 'The "law of the incompetent statistician": **E[g(X)] ≠ g(E[X])** in general. Fair die: E[X²] = 91/6 ≈ 15.2 but (E[X])² = 12.25. Squaring first then averaging ≠ averaging then squaring. Lecturer-flagged trap.' },
    { ref: 'Proof of LOTUS', what: 'Discrete case: partition the outcomes by the VALUE of g — the sets A_y = {x : g(x) = y} — regroup the sum, done. The theorem is bookkeeping, which is why people use it "unconsciously".' },
    { ref: 'Example 6.4', what: 'The two LOTUS instances used constantly from here on: E[X²] = Σx²P(X=x) and E[XY] = ΣΣ xy·f_{X,Y}(x,y) — the raw ingredients of variance and covariance.' },
  ],
  82: [
    { ref: 'Theorem 6.4', what: '**Linearity of expectation**: E[aX + bY + c] = aE[X] + bE[Y] + c — ALWAYS, with **no independence needed**. Proved discrete and continuous via LOTUS on g(x,y) = ax+by+c. The single most-used fact in the chapter.', tex: 'E[aX+bY+c]=a\\,E[X]+b\\,E[Y]+c' },
    { ref: 'Remark (trap)', what: 'Linearity chains to any FINITE number of terms, but NOT to infinite sums — exchanging E with an infinite sum needs convergence conditions beyond this course. (Lecturer-flagged.)' },
  ],
  83: [
    { ref: 'Example 6.5', what: 'E[3X − Y + 5] with X ~ Geom(1/4), Y ~ Exp(1/2): = 3·4 − 2 + 5 = **15**. Plug in the standard means (1/p and 1/λ), no joint information needed.' },
    { ref: 'Example 6.6', what: '**Binomial mean two ways**. Direct pmf attack: an index-shifting binomial-theorem grind. Indicator route: X = Σ Berᵢ, so E[X] = Σ p = **np** — three symbols. Moral the lecturer spells out: decompose into simple pieces and use linearity; it also previews the variance computation on p91.', tex: 'E[X]=np' },
    { ref: 'Example 6.7 (start)', what: '**Normal mean**: E[X] = μ, by substituting u = x−μ and watching the odd part integrate to zero by symmetry — the bell is balanced at its centre.' },
  ],
  84: [
    { ref: 'Corollaries 6.1–6.2', what: 'Monotonicity: X ≤ Y ⟹ E[X] ≤ E[Y] (apply positivity to Y−X). And the triangle inequality for expectations: |E[X]| ≤ E|X|.' },
    { ref: 'Theorem 6.5', what: '**Products under independence**: X ⊥ Y ⟹ E[g(X)h(Y)] = E[g(X)]·E[h(Y)]. Proof: the joint pmf/pdf factorises, so the double sum splits into a product of sums. Special case: E[XY] = E[X]E[Y].', tex: 'E[XY]=E[X]\\,E[Y]\\quad(X\\perp Y)' },
    { ref: 'WARNING', what: 'Without independence E[XY] ≠ E[X]E[Y] in general — take Y = X with the die: E[X²] = 91/6 ≠ 49/4. **Sums always split (linearity); products only split under independence.**' },
  ],
  85: [
    { ref: 'Remark', what: 'The chapter\'s slogan: "**independence means multiplication**" — of joint pmfs/pdfs (Thm 4.5/5.4), of interval probabilities, of expectations of products (Thm 6.5). One idea in four costumes.' },
    { ref: 'Definition 6.3', what: '**Variance**: Var(X) = E[(X − E[X])²] — the average SQUARED distance from the mean; its square root is the **standard deviation** (same units as X). Squaring kills sign cancellation (average deviation is always 0) and punishes big misses.', tex: '\\mathrm{Var}(X)=E\\big[(X-E[X])^2\\big]' },
  ],
  86: [
    { ref: 'Theorem 6.6', what: 'The **moment form** — expand the square, apply linearity: Var(X) = E[X²] − (E[X])². This is the version you COMPUTE with; the definition is the version you INTERPRET with. ("Moments": E[Xᵏ] is the kth moment.)', tex: '\\mathrm{Var}(X)=E[X^2]-(E[X])^2' },
    { ref: 'Example 6.8', what: '**Geometric variance** (1−p)/p²: compute E[X(X−1)] with the SECOND-derivative-of-the-series trick, then Var = E[X(X−1)] + E[X] − (E[X])². Note the pattern: factorial moments tame discrete sums.', tex: '\\mathrm{Var}(X)=\\frac{1-p}{p^2}' },
    { ref: 'Example 6.9', what: '**Unif(0,1) variance**: E[X] = 1/2, E[X²] = 1/3, Var = 1/3 − 1/4 = **1/12**. The classic first continuous variance.', tex: '\\mathrm{Var}(X)=\\tfrac{1}{12}' },
  ],
  87: [
    { ref: 'Theorem 6.7', what: 'Var(X) = 0 ⟺ X is constant (with probability 1): zero spread means no randomness at all. (Discrete proof examinable; the general proof is not.)' },
    { ref: 'Theorem 6.8', what: '**Variance is NOT linear**: Var(aX + b) = a²·Var(X). Shifting by b moves every outcome AND the mean — deviations unchanged, b vanishes. Scaling by a scales deviations by a, squared deviations by a². Lecturer-flagged trap: no aVar, no +b.', tex: '\\mathrm{Var}(aX+b)=a^2\\,\\mathrm{Var}(X)' },
    { ref: 'Example 6.10', what: 'Y ~ Geom(1/2): Var(2Y − 5) = 4·Var(Y) = 4·(1/2)/(1/4) = **8**. The −5 contributes nothing.' },
  ],
  88: [
    { ref: 'Definition 6.4', what: '**Covariance**: Cov(X,Y) = E[(X−E[X])(Y−E[Y])] — do the deviations point the same way on average? Positive: move together; negative: opposite; zero: "uncorrelated". **Correlation** ρ = Cov/√(Var·Var) is the unit-free version, always in [−1, 1].', tex: '\\mathrm{Cov}(X,Y)=E\\big[(X-E[X])(Y-E[Y])\\big]' },
    { ref: 'Remarks', what: 'Immediate facts: symmetric in X,Y; Cov(X,X) = Var(X) — covariance generalises variance.' },
    { ref: 'Theorem 6.9', what: 'The computing form: Cov(X,Y) = E[XY] − E[X]E[Y] (expand and apply linearity, same trick as Thm 6.6).', tex: '\\mathrm{Cov}(X,Y)=E[XY]-E[X]\\,E[Y]' },
    { ref: 'Corollary 6.4', what: 'Independent ⟹ Cov = 0 (E[XY] factorises by Thm 6.5). The CONVERSE IS FALSE — uncorrelated but dependent examples exist on problem sheets; covariance only detects LINEAR association.' },
  ],
  89: [
    { ref: 'Corollary 6.5', what: '**Bilinearity**: Cov(aX+b, cY+d) = ac·Cov(X,Y) — constants slide out of each slot, shifts vanish. (The remark that covariance behaves like an inner product is non-examinable but explains the "bilinear" name.)' },
    { ref: 'Theorem 6.10', what: 'THE variance-of-sums formula: Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab·Cov(X,Y). Squaring a sum creates a cross term — that cross term IS the covariance. Two proofs given (direct expansion; via bilinearity of Cov).', tex: '\\mathrm{Var}(aX+bY)=a^2\\mathrm{Var}(X)+b^2\\mathrm{Var}(Y)+2ab\\,\\mathrm{Cov}(X,Y)' },
  ],
  90: [
    { ref: 'Example 6.11', what: 'The special cases to memorise: Var(X+Y) = Var+Var+2Cov and Var(X−Y) = Var+Var **−2Cov** — note that even for a DIFFERENCE the variances ADD. Lecturer-flagged sign trap.' },
    { ref: 'Corollaries 6.6–6.7', what: '**Bienaymé**: for a general sum, Var(ΣXᵢ) = ΣVar(Xᵢ) + all the pairwise covariance cross-terms; when the Xᵢ are (pairwise) independent all cross-terms die and **variances simply add**. The engine behind the LLN two pages later.', tex: '\\mathrm{Var}\\Big(\\sum X_i\\Big)=\\sum \\mathrm{Var}(X_i)\\quad(\\text{indep.})' },
  ],
  91: [
    { ref: 'Example 6.12', what: '**Binomial variance** np(1−p): write X as a sum of n independent Bernoullis; each has Var = p(1−p) = p − p²; independence adds them. Compare the direct-pmf horror show — decomposition wins again.', tex: '\\mathrm{Var}(X)=np(1-p)' },
    { ref: 'Example 6.13', what: 'Cov(X+Y, X−Y) = Var(X) − Var(Y) by bilinearity — the cross-covariances cancel. If Var(X) = Var(Y), the sum and difference are uncorrelated.' },
    { ref: 'Summary box', what: 'The page closes with the lecturer\'s summary of every sum formula: E[aX+bY+c], E[XY] under independence, Var(aX+b), Var(aX+bY), Cov expansions. This box is exam-revision gold — reproduce it from memory.' },
  ],
  92: [
    { ref: '§6.5 setup', what: '**Sample average** X̄ₙ = (X₁+⋯+Xₙ)/n of iid copies with mean μ, variance σ². Linearity: E[X̄ₙ] = μ (averaging is unbiased). Independence + Var(aX) = a²Var: Var(X̄ₙ) = **σ²/n** → 0. The spread of the average SHRINKS as data grows.', tex: 'E[\\bar X_n]=\\mu,\\qquad \\mathrm{Var}(\\bar X_n)=\\frac{\\sigma^2}{n}' },
    { ref: 'Theorem 6.11', what: 'The **Weak Law of Large Numbers**: for any tolerance ε > 0, P(|X̄ₙ − μ| > ε) → 0 as n → ∞. The sample average converges to the true mean — the bridge from probability to STATISTICS (estimate μ by averaging data). Stated without proof here; p95 proves it via Chebyshev.', tex: 'P\\big(|\\bar X_n-\\mu|>\\varepsilon\\big)\\to 0' },
    { ref: 'Examples 6.14–6.15', what: 'Coin-toss running averages wobble then settle at 1/2 (Figs 32–33, including a 2000-toss realisation). Historical footnote: Pearson really tossed 24,000 coins — 12,012 heads (0.5005).' },
  ],
  93: [
    { ref: 'Figure 33 / Example 6.15', what: 'A single 2000-toss realisation finishes the law-of-large-numbers discussion. Its observed head fraction is one random value, not a guarantee that each future run is closer to one half.' },
    { ref: 'Chapter 7 scope', what: 'The 2024 document marks Chapter 7 as material written after that exam. This is historical assessment guidance. The upper part of this page still belongs to the LLN discussion; check your current module scope.' },
  ],
  94: [
    { ref: 'Lemma 7.1', what: 'The bridge identity: **E[1_A] = P(A)** — expectations of indicators ARE probabilities. This one line powers both inequalities on the next two pages.', tex: 'E[\\mathbf 1_A]=P(A)' },
    { ref: 'Definition 7.1', what: '**Indicator function** 1_A: equals 1 when the outcome is in A, else 0 — a Bernoulli switch attached to an event. Example 7.1: coin flips.', tex: '\\mathbf 1_A(\\omega)=\\begin{cases}1&\\omega\\in A\\\\0&\\omega\\notin A\\end{cases}' },
    { ref: 'Theorem 7.1', what: '**Markov\'s inequality** (non-exam): for X ≥ 0, P(X ≥ x) ≤ E[X]/x. Proof in one line: x·1_{X≥x} ≤ X, take expectations. Knowing ONLY the mean bounds every tail.', tex: 'P(X\\ge x)\\le \\frac{E[X]}{x}' },
    { ref: 'Example 7.2', what: 'Bin(1000, 0.01): Markov gives P(X ≥ 35) ≤ 10/35 = 2/7 ≈ 0.29, while the truth is ≈ 4×10⁻¹⁰. Markov is WEAK but needs almost no information — its value is generality, not sharpness.' },
  ],
  95: [
    { ref: 'Corollary 7.1', what: '**Chebyshev\'s inequality** (non-exam): P(|X − E[X]| ≥ x) ≤ Var(X)/x². Proof: apply Markov to the non-negative rv (X−E[X])². Knowing mean AND variance bounds deviations from the centre.', tex: 'P\\big(|X-E[X]|\\ge x\\big)\\le \\frac{\\mathrm{Var}(X)}{x^2}' },
    { ref: 'Example 7.4', what: 'The payoff: apply Chebyshev to X̄ₙ (mean μ, variance σ²/n): P(|X̄ₙ − μ| > ε) ≤ σ²/(nε²) → 0 — **the Weak LLN, proved in two lines**. The mysterious theorem of p92 falls out of one inequality chain.' },
  ],
  96: [
    { ref: 'Theorem 7.2', what: '**Tail formula** for X ≥ 0: E[X] = ∫₀^∞ P(X ≥ x) dx — the mean is the AREA under the survival curve. (Discrete version, Cor 7.2: E[X] = Σⱼ≥₁ P(X ≥ j).) Proof swaps the order of a double integral of indicators.', tex: 'E[X]=\\int_0^\\infty P(X\\ge x)\\,dx' },
  ],
  97: [
    { ref: 'Examples 7.5–7.6', what: 'Sanity checks: Exp(λ) has ∫e^(−λx)dx = 1/λ ✓; Geom(p) has Σ(1−p)^(j−1) = 1/p ✓ — both means recovered WITHOUT the derivative/parts tricks of Chapter 6. Survival probabilities are often the easiest route to a mean.' },
    { ref: '§7.4 setup', what: 'The grand finale: the simple random walk\'s **return time** T = min{n ≥ 1 : Sₙ = 0}. From p39 we know P(T < ∞) = 1 — the walk ALWAYS comes home. Question: how long does the trip take on average?' },
    { ref: 'The argument', what: 'Via the **reflection principle** (counting paths that touch a level by flipping them) the tail probabilities P(T > n) are computed exactly — they decay like 1/√n.' },
  ],
  98: [
    { ref: 'The punchline', what: 'Feed the 1/√n tails into the tail formula: E[T] = Σ P(T ≥ j) ~ Σ 1/√j = **∞**. The walk returns with probability 1, yet the EXPECTED wait is infinite — "you might have to wait a very long time". (Stirling\'s formula, non-exam, powers the asymptotics.) A perfect closing paradox: probability 1 ≠ quick, and expectations can be infinite even for events that are certain.', tex: 'P(T<\\infty)=1\\quad\\text{but}\\quad E[T]=\\infty' },
  ],
};
