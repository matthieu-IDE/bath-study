import type { Concept } from '../types';

/* Chapter 6 — Expectation and variance (file pages 78–92) */

export const CH6: Concept[] = [
  {
    id: 'expectation-discrete', title: 'Expectation (discrete)', icon: '', chapter: 6, pdfPages: [78, 79],
    prereqs: ['pmf'], examinable: true, lab: 'expectation',
    whyCare: 'The long-run average of a random quantity — the single most important number attached to a distribution.',
    keywords: ['expectation', 'expected value', 'mean', 'e[x]', 'average'],
    levels: {
      eli5: 'Play the game a zillion times and average your scores. The wobble washes out and the average settles on one number — that number is the expectation.',
      human: 'E[X] = Σ x·P(X=x): each value weighted by its probability. A fair dice: E[X] = 3.5 — note the "expected" value can be IMPOSSIBLE to roll; it\'s a long-run average, not a prediction. For infinite supports we need Σ|x|P(X=x) < ∞ so the sum is well-defined. E[Geom(p)] = 1/p.',
      uni: 'Definition 6.1: $E[X]=\\sum_{x\\in S}xP(X=x)$, provided $\\sum_{x\\in S}|x|P(X=x)<\\infty$ (absolute convergence — reordering an infinite sum must not change it). Example 6.1: dice $E[X]=7/2$. Example 6.2: $X\\sim\\mathrm{Geom}(p)\\Rightarrow E[X]=1/p$ by differentiating the geometric series.',
      deep: 'E[X] is the centre of mass: put weights P(X=x) at positions x and the pivot balances at E[X]. The absolute-convergence small print is real: distributions exist with no expectation (heavy tails — the random walk return time in §7.4 has E[T]=∞!). The geometric-series-derivative trick (spot the series, differentiate term by term) reappears for Var(Geom) and is worth owning.',
    },
    formulas: [
      { id: 'f-exp-d', name: 'Expectation (discrete)', tex: 'E[X]=\\sum_{x\\in S}x\\,P(X=x)',
        parts: [
          { sym: 'x', meaning: 'each possible value…', color: 'known' },
          { sym: 'P(X=x)', meaning: '…weighted by how likely it is', color: 'cond' },
        ], source: 'course', pdfPage: 78 },
    ],
    examples: {
      simple: 'Fair dice: (1+2+…+6)/6 = 3.5 (Example 6.1).',
      everyday: 'Raffle: 1000 tickets, one £500 prize. E[winnings per £1 ticket] = 500/1000 = 50p — the raffle keeps the other 50p.',
      mathematical: 'Geom(p): E[X] = 1/p — expect 6 rolls for a six (Example 6.2).',
      exam: '"Find E[X] from this pmf table" — multiply, add, keep fractions. Show the Σ x·p(x) line for the method mark.',
    },
    connections: [
      { to: 'lotus', how: 'E[g(X)] uses the same weights on transformed values.' },
      { to: 'lln', how: 'The LLN is the theorem that sample averages actually converge to E[X].' },
    ],
    errorIds: ['arithmetic', 'sum-to-one'],
  },
  {
    id: 'expectation-continuous', title: 'Expectation (continuous)', icon: '', chapter: 6, pdfPages: [79, 80],
    prereqs: ['pdf', 'expectation-discrete'], examinable: true, lab: 'expectation',
    whyCare: 'Same balancing-point idea, with an integral. E[Exp(λ)] = 1/λ is the fact you\'ll use most.',
    keywords: ['continuous expectation', 'integral', 'mean of exponential'],
    levels: {
      eli5: 'The jam-shelf again: E[X] is where the shelf would balance on one finger.',
      human: 'E[X] = ∫x·f(x)dx — the pdf is the weight. E[Exp(λ)] = 1/λ (rate 12/min → wait 5 s on average). E[N(μ,σ²)] = μ by symmetry. The lecturer promises: no nasty integrals in the exam — hard ones would be stated.',
      uni: 'Definition 6.2: $E[X]=\\int_{-\\infty}^{\\infty}x f_X(x)\\,dx$ provided $\\int|x|f_X(x)dx<\\infty$. Example 6.3: $E[\\mathrm{Exp}(\\lambda)]=\\int_0^\\infty x\\lambda e^{-\\lambda x}dx=1/\\lambda$ (integration by parts). Example 6.7: $E[\\mathrm N(\\mu,\\sigma^2)]=\\mu$ (substitute $y=x-\\mu$, odd integrand cancels).',
      deep: 'Both definitions are one idea — integrate values against the probability measure; discrete sums are just integrals against point masses. The chapter-7 tail formula E[X]=∫P(X>x)dx often beats integration by parts (it computes E[Exp] in one line), a nice example of choosing REPRESENTATION before computation.',
    },
    formulas: [
      { id: 'f-exp-c', name: 'Expectation (continuous)', tex: 'E[X]=\\int_{-\\infty}^{\\infty}x\\,f_X(x)\\,dx', source: 'course', pdfPage: 79 },
      { id: 'f-exp-exp', name: 'Exponential mean', tex: 'X\\sim\\mathrm{Exp}(\\lambda)\\Rightarrow E[X]=\\frac1\\lambda', source: 'course', pdfPage: 80,
        rederive: 'Integrate xλe^{−λx} by parts — or use the tail formula ∫₀^∞e^{−λx}dx=1/λ.' },
    ],
    examples: {
      simple: 'Unif(0,1): E[X] = ∫₀¹x dx = ½.',
      everyday: 'Buses at rate 4/hour: expected wait 15 minutes.',
      mathematical: 'E[N(μ,σ²)] = μ by symmetry, no integral tables (Example 6.7).',
      exam: '"Find E[X] for f(x)=2x on [0,1]" → ∫2x²dx = 2/3. Set up, integrate, sanity-check it lies in the support\'s range.',
    },
    connections: [
      { to: 'exponential', how: '1/λ quantifies "higher rate, shorter wait".' },
      { to: 'expectation-tail', how: 'The tail formula ∫P(X>x)dx is often the faster route.' },
    ],
    errorIds: ['algebra', 'pmf-pdf'],
  },
  {
    id: 'lotus', title: 'LOTUS: E[g(X)]', icon: '', chapter: 6, pdfPages: [80, 82],
    prereqs: ['expectation-discrete'], examinable: true, lab: 'lotus',
    whyCare: 'How to average a FUNCTION of X (like X²) without finding its distribution. Also the origin of the #1 expectation error.',
    keywords: ['lotus', 'unconscious statistician', 'e[g(x)]', 'e[x^2]'],
    levels: {
      eli5: 'Everyone in class wrote a number. To average the SQUARES you don\'t need a new class — square each person\'s number, then average. Don\'t average first and square after: that gives the wrong thing!',
      human: 'Law of the unconscious statistician: E[g(X)] = Σ g(x)P(X=x) (or ∫g(x)f(x)dx) — keep the weights, transform the values. The trap the notes name "the law of the incompetent statistician": E[g(X)] ≠ g(E[X]) in general. E[X²] ≠ (E[X])² — their gap is precisely Var(X).',
      uni: 'Theorem 6.3: $E[g(X)]=\\sum_{x\\in S}g(x)P(X=x)$, resp. $\\int g(x)f_X(x)dx$; multivariate versions sum/integrate $g(x_1,\\dots,x_n)$ against the joint. Proof (discrete): partition $S$ into level sets $A_y=\\{x:g(x)=y\\}$ and regroup. Why it needs proof: the DEFINITION of $E[g(X)]$ would require the pmf of $Y=g(X)$; LOTUS says you may skip finding it.',
      deep: 'The proof is pure bookkeeping — group the x\'s by their g-value — but the theorem is the workhorse of every moment computation in the course: E[X²] for variances, E[XY] for covariances (bivariate LOTUS). Jensen\'s inequality (later courses) sharpens the ≠ into an inequality for convex g: E[g(X)] ≥ g(E[X]) — for g(x)=x², the excess is the variance, which is why variance is never negative.',
    },
    formulas: [
      { id: 'f-lotus', name: 'LOTUS', tex: 'E[g(X)]=\\sum_{x\\in S}g(x)\\,P(X=x)\\quad\\text{or}\\quad \\int_{-\\infty}^{\\infty}g(x)f_X(x)\\,dx',
        parts: [
          { sym: 'g(x)', meaning: 'transform the values…', color: 'good' },
          { sym: 'P(X=x)', meaning: '…keep the original weights', color: 'cond' },
        ], source: 'course', pdfPage: 80 },
    ],
    examples: {
      simple: 'Dice: E[X²] = (1+4+9+16+25+36)/6 = 91/6 ≈ 15.17 ≠ 3.5² = 12.25.',
      everyday: 'Average electricity bill isn\'t the bill at average usage when pricing is nonlinear — tariffs are a g(X).',
      mathematical: 'E[XY] = ΣΣ xy·P(X=x,Y=y) — bivariate LOTUS (Example 6.4).',
      exam: '"Find E[X²] and hence Var(X)" — LOTUS then moment form. Writing E[X²]=(E[X])² scores zero; examiners hunt for it.',
    },
    connections: [
      { to: 'variance', how: 'Var(X)=E[X²]−(E[X])² needs E[X²] via LOTUS.' },
      { to: 'covariance', how: 'E[XY] is bivariate LOTUS against the joint pmf.' },
    ],
    errorIds: ['lotus', 'variance-formula'],
  },
  {
    id: 'linearity', title: 'Linearity of expectation', icon: '', chapter: 6, pdfPages: [82, 84],
    prereqs: ['expectation-discrete'], examinable: true, lab: 'linearity',
    whyCare: 'E[aX+bY] = aE[X]+bE[Y] — ALWAYS, independence not required. The most powerful "free lunch" in probability.',
    keywords: ['linearity', 'linear expectation', 'sum of expectations'],
    levels: {
      eli5: 'The average of (your score + my score) is (your average) + (my average) — even if we cheat by copying each other. Averages don\'t care about teamwork.',
      human: 'E[aX+bY] = aE[X]+bE[Y] for ANY rvs — dependent or not. Chains to any finite sum. Two cautions: it does NOT extend to infinite sums automatically, and it says nothing about products (E[XY] needs independence). Showpiece: E[Bin(n,p)] = np instantly, by writing the binomial as a sum of n Bernoullis — versus a page of pmf algebra (Example 6.6 does both; linearity wins).',
      uni: 'Theorem 6.4: $E[aX+bY]=aE[X]+bE[Y]$; by induction $E[\\sum_i a_iX_i]=\\sum_i a_iE[X_i]$. Proof: bivariate LOTUS + linearity of sums/integrals, marginalising each term. Corollaries: monotonicity ($X\\ge Y\\Rightarrow E[X]\\ge E[Y]$, Cor 6.1); $|E[X]|\\le E|X|$ (Cor 6.2). Also $E[a]=a$ (Thm 6.2) and $X\\ge0\\Rightarrow E[X]\\ge0$ (Thm 6.1).',
      deep: 'Linearity holds under dependence because expectation is an integral, and integrals are linear — full stop. This is what makes the indicator method (chapter 7) devastating: ANY counting rv splits into indicator crumbs whose expectations are plain probabilities, dependence be damned. If a hard expectation appears in an exam, the first question to ask is always: "can I write this as a sum of simpler things?"',
    },
    formulas: [
      { id: 'f-lin', name: 'Linearity', tex: 'E\\left[\\sum_{i=1}^n a_iX_i\\right]=\\sum_{i=1}^n a_iE[X_i]\\quad\\text{(no independence needed!)}', source: 'course', pdfPage: 82 },
    ],
    examples: {
      simple: 'E[X+Y] for two dice = 3.5 + 3.5 = 7. No 36-cell table needed.',
      everyday: 'Expected total minutes of ads across 6 YouTube videos = 6 × expected ads per video — even though ad lengths correlate.',
      mathematical: 'E[3X−Y+5] = 3·4 − 2 + 5 = 15 for X~Geom(¼), Y~Exp(½) (Example 6.5).',
      exam: '"Find E[Bin(n,p)]" the smart way: X=ΣXᵢ, E[Xᵢ]=p, so np. State linearity by name — it earns the method mark.',
    },
    connections: [
      { to: 'binomial', how: 'E[Bin]=np falls out in one line.' },
      { to: 'variance-sums', how: 'Variance is NOT linear — the contrast to internalise.' },
      { to: 'indicators', how: 'Linearity + indicators = expected counts of anything.' },
    ],
    errorIds: ['product-expectation', 'variance-linear'],
  },
  {
    id: 'product-independence', title: 'Products & independence', icon: '', chapter: 6, pdfPages: [84, 85],
    prereqs: ['linearity', 'independence-rvs'], examinable: true, lab: 'jointtable',
    whyCare: 'E[XY] = E[X]E[Y] holds ONLY under independence — the gateway to covariance and to adding variances.',
    keywords: ['product of expectations', 'e[xy]', 'independence multiplication'],
    levels: {
      eli5: 'Sums always split. Products only split when the two things genuinely ignore each other.',
      human: 'If X ⊥ Y then E[g(X)h(Y)] = E[g(X)]·E[h(Y)] — in particular E[XY] = E[X]E[Y]. WITHOUT independence this fails (take Y=X: E[X²] ≠ (E[X])² unless X is constant). "Independence means multiplication" — for probabilities, for pmfs, and now for expectations.',
      uni: 'Theorem 6.5: $X\\perp Y$, $E|g(X)|,E|h(Y)|<\\infty$ $\\Rightarrow E[g(X)h(Y)]=E[g(X)]E[h(Y)]$. Proof: bivariate LOTUS, factorise the joint pmf by Theorem 4.5, split the double sum into a product of sums. Extends to $n$ independent rvs.',
      deep: 'The proof is one move: a double sum of products with SEPARABLE terms factors into two sums. Independence is exactly the hypothesis making the joint separable. The failure gap E[XY]−E[X]E[Y] is not garbage — it gets a name (covariance) and becomes chapter 6\'s measuring stick for dependence.',
    },
    formulas: [
      { id: 'f-prod', name: 'Product rule (independent only!)', tex: 'X\\perp Y\\ \\Rightarrow\\ E[XY]=E[X]\\,E[Y]', source: 'course', pdfPage: 84 },
    ],
    examples: {
      simple: 'Two dice: E[XY] = 3.5 × 3.5 = 12.25 ✓ (independent).',
      everyday: 'Expected (hours streamed × snacks eaten) ≠ product of expectations — those two are NOT independent on your sofa.',
      mathematical: 'Y=X (maximal dependence): E[X·X] = E[X²] > (E[X])² for non-constant X.',
      exam: '"Justify E[XY]=E[X]E[Y]" — you MUST cite independence. Uncited, the examiner assumes you believe it always holds (error flagged in the notes with three exclamation marks).',
    },
    connections: [
      { to: 'covariance', how: 'Cov(X,Y) = E[XY] − E[X]E[Y] measures exactly the failure of this rule.' },
      { to: 'variance-sums', how: 'Cov=0 under independence is why variances then add.' },
    ],
    errorIds: ['product-expectation'],
  },
  {
    id: 'variance', title: 'Variance & standard deviation', icon: '', chapter: 6, pdfPages: [85, 87],
    prereqs: ['lotus'], examinable: true, lab: 'variance',
    whyCare: 'Two games can share an average and feel utterly different. Variance measures the spread — the risk, the wobble, the surprise.',
    keywords: ['variance', 'standard deviation', 'spread', 'var(x)', 'moment'],
    levels: {
      eli5: 'Two archers both average the bullseye. One clusters arrows tight, one sprays the target. Same average, different scatter — variance is the scatter score.',
      human: 'Var(X) = E[(X−E[X])²]: average SQUARED distance from the mean. Computing form (Theorem 6.6): Var(X) = E[X²] − (E[X])² — "mean of square minus square of mean". Standard deviation = √Var, back in X\'s units. Rules: Var ≥ 0 always; Var(X)=0 ⟺ X constant; Var(aX+b) = a²Var(X) — shifts free, scales squared.',
      uni: 'Definition 6.3 + Theorem 6.6: $\\mathrm{Var}(X)=E[(X-E[X])^2]=E[X^2]-(E[X])^2$ (expand the square, use linearity). Theorem 6.7: $\\mathrm{Var}(X)=0\\iff P(X=a)=1$. Theorem 6.8: $\\mathrm{Var}(aX+b)=a^2\\mathrm{Var}(X)$. Examples: $\\mathrm{Var(Unif}(0,1))=\\tfrac13-\\tfrac14=\\tfrac1{12}$ (6.9); $\\mathrm{Var(Geom}(p))=(1-p)/p^2$ (6.8); $\\mathrm{Var(Bin)}=np(1-p)$ (6.12).',
      deep: 'Why SQUARE the deviations? Squaring kills sign (deviations would cancel to 0 — E[X−E[X]]=0 identically), punishes big misses, and — decisively — makes variance ADD over independent rvs, which |X−E[X]| would not. The b-invariance in Var(aX+b)=a²Var(X) says spread doesn\'t care where you stand; the a² says units of variance are units². That\'s why standard deviation exists: √ brings it home.',
    },
    formulas: [
      { id: 'f-var', name: 'Variance (both forms)', tex: '\\mathrm{Var}(X)=E\\big[(X-E[X])^2\\big]=E[X^2]-(E[X])^2',
        parts: [
          { sym: '(X-E[X])^2', meaning: 'squared distance from the mean', color: 'cond' },
          { sym: 'E[X^2]', meaning: 'mean of the square (LOTUS)…', color: 'known' },
          { sym: '(E[X])^2', meaning: '…minus square of the mean', color: 'bad' },
        ], source: 'course', pdfPage: 85,
        rederive: 'Expand (X−μ)² = X² − 2μX + μ², take E, use linearity: E[X²] − 2μ² + μ².' },
      { id: 'f-var-lin', name: 'Scaling law', tex: '\\mathrm{Var}(aX+b)=a^2\\,\\mathrm{Var}(X)', source: 'course', pdfPage: 87,
        rederive: 'The +b shifts the mean equally, so deviations are unchanged; a scales deviations, squaring scales variance.' },
    ],
    examples: {
      simple: 'Fair dice: Var = 91/6 − 49/4 = 35/12 ≈ 2.92.',
      everyday: 'Two bus routes, both 20 min on average: route A always 19–21, route B 5 or 45. Same mean; wildly different variance. You choose A.',
      mathematical: 'Var(2Y+5) = 4·Var(Y) = 8 for Y~Geom(½) (Example 6.10).',
      exam: '"Find Var(X)": compute E[X], then E[X²] by LOTUS, subtract. Negative variance = instant red flag you\'d be expected to catch.',
    },
    connections: [
      { to: 'covariance', how: 'Cov(X,X)=Var(X) — covariance generalises variance to pairs.' },
      { to: 'lln', how: 'Var(X̄)=σ²/n → 0 is the engine of the LLN.' },
      { to: 'chebyshev', how: 'Chebyshev converts variance into tail bounds.' },
    ],
    errorIds: ['variance-formula', 'variance-linear', 'lotus'],
  },
  {
    id: 'covariance', title: 'Covariance & correlation', icon: '', chapter: 6, pdfPages: [88, 89],
    prereqs: ['variance', 'product-independence'], examinable: true, lab: 'covariance',
    whyCare: 'Do X and Y move together or in opposition? Covariance signs it; correlation standardises it to [−1,1].',
    keywords: ['covariance', 'correlation', 'cov', 'corr', 'rho', 'joint variability'],
    levels: {
      eli5: 'Height and shoe size: tall people usually have big feet — when one is above average the other tends to be too. That "tends to move together" is positive covariance.',
      human: 'Cov(X,Y) = E[(X−E[X])(Y−E[Y])] = E[XY] − E[X]E[Y]. Positive: above-average together. Negative: one up, other down. Cov(X,X) = Var(X). Correlation ρ = Cov/√(Var·Var) strips the units. Independent ⟹ Cov = 0 (Corollary 6.4). Covariance is bilinear: Cov(aX+bY, Z) = aCov(X,Z)+bCov(Y,Z).',
      uni: 'Definition 6.4 + Theorem 6.9: $\\mathrm{Cov}(X,Y)=E[(X-\\mu_X)(Y-\\mu_Y)]=E[XY]-E[X]E[Y]$; $\\rho_{XY}=\\frac{\\mathrm{Cov}(X,Y)}{\\sqrt{\\mathrm{Var}(X)\\mathrm{Var}(Y)}}$. Corollary 6.4: independence $\\Rightarrow\\mathrm{Cov}=0$. Corollary 6.5 (bilinearity): $\\mathrm{Cov}(aX+bY,Z)=a\\mathrm{Cov}(X,Z)+b\\mathrm{Cov}(Y,Z)$. Example 6.13: $\\mathrm{Cov}(X+Y,X-Y)=\\mathrm{Var}(X)-\\mathrm{Var}(Y)$.',
      deep: 'Covariance is almost an inner product on random variables (symmetric, bilinear, positive semi-definite — the notes flag this, non-examinably), and correlation is the cosine of the "angle" between the centred rvs — that\'s WHY |ρ|≤1. Mind the one-way street: independence kills covariance, but Cov=0 does NOT imply independence (dependence can hide in nonlinearity — X uniform on {−1,0,1} and Y=X² have Cov 0 but are totally dependent).',
    },
    formulas: [
      { id: 'f-cov', name: 'Covariance', tex: '\\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]',
        parts: [
          { sym: 'E[XY]', meaning: 'how products behave jointly', color: 'known' },
          { sym: 'E[X]E[Y]', meaning: 'what independence would predict', color: 'cond' },
        ], source: 'course', pdfPage: 88,
        rederive: 'Expand E[(X−μX)(Y−μY)] with linearity; three of the four terms collapse.' },
      { id: 'f-corr', name: 'Correlation', tex: '\\rho_{XY}=\\frac{\\mathrm{Cov}(X,Y)}{\\sqrt{\\mathrm{Var}(X)\\,\\mathrm{Var}(Y)}}\\in[-1,1]', source: 'course', pdfPage: 88 },
    ],
    examples: {
      simple: 'Y = X: Cov = Var(X) > 0, ρ = 1. Y = −X: ρ = −1.',
      everyday: 'Ice-cream sales & drowning incidents: positive correlation (via summer!) — moving together is not causation.',
      mathematical: 'Cov(X+Y, X−Y) = Var(X) − Var(Y) by bilinearity (Example 6.13).',
      exam: '"From the joint table compute Cov(X,Y) and state whether X,Y are independent" — Cov≠0 proves dependent; Cov=0 proves NOTHING. Say so.',
    },
    connections: [
      { to: 'variance-sums', how: 'The cross-term 2abCov(X,Y) in Var(aX+bY).' },
      { to: 'joint-discrete', how: 'E[XY] is computed straight from the joint table.' },
      { to: 'independence-rvs', how: 'Independence ⇒ Cov=0; converse FALSE.' },
    ],
    errorIds: ['cov-sign', 'product-expectation'],
  },
  {
    id: 'variance-sums', title: 'Variance of sums', icon: '', chapter: 6, pdfPages: [89, 91],
    prereqs: ['covariance'], examinable: true, lab: 'varsum',
    whyCare: 'Var(X±Y) has a cross-term; it vanishes under independence. Get the signs right or lose easy marks.',
    keywords: ['variance of sum', 'bienayme', 'cross term', 'var(x+y)'],
    levels: {
      eli5: 'Stack two wobbly towers. If they wobble in sync, the stack wobbles extra. If they wobble independently, the wobbles just pile up. And a tower\'s wobble MINUS another\'s wobble still wobbles MORE, not less!',
      human: 'Var(aX+bY) = a²Var(X) + b²Var(Y) + 2abCov(X,Y). Special cases: Var(X+Y) = Var+Var+2Cov; Var(X−Y) = Var+Var−2Cov — note PLUS Var(Y) even when subtracting. Independent: cross-terms die, Var(ΣXᵢ) = ΣVar(Xᵢ) (Bienaymé). Powers Var(Bin(n,p)) = np(1−p) via n Bernoulli bricks.',
      uni: 'Theorem 6.10: $\\mathrm{Var}(aX+bY)=a^2\\mathrm{Var}(X)+b^2\\mathrm{Var}(Y)+2ab\\,\\mathrm{Cov}(X,Y)$ (proof: expand, or bilinearity of Cov). Corollary 6.6: $\\mathrm{Var}(\\sum a_iX_i)=\\sum a_i^2\\mathrm{Var}(X_i)+2\\sum_{i<j}a_ia_j\\mathrm{Cov}(X_i,X_j)$. Corollary 6.7 (independent): $\\mathrm{Var}(\\sum b_iX_i)=\\sum b_i^2\\mathrm{Var}(X_i)$.',
      deep: 'Cleanest proof: Var(Z)=Cov(Z,Z) plus bilinearity — expanding Cov(aX+bY, aX+bY) like brackets gives all four terms at once. The summary box on p91 (E, Cov, Var of sums) is the single most valuable half-page of the course to memorise: nearly every chapter-6 exam part is an instance of it.',
    },
    formulas: [
      { id: 'f-varsum', name: 'Variance of a sum', tex: '\\mathrm{Var}(aX+bY)=a^2\\mathrm{Var}(X)+b^2\\mathrm{Var}(Y)+2ab\\,\\mathrm{Cov}(X,Y)',
        parts: [
          { sym: 'a^2\\mathrm{Var}(X)', meaning: 'coefficients come out SQUARED', color: 'known' },
          { sym: '2ab\\,\\mathrm{Cov}(X,Y)', meaning: 'the cross-term — zero iff uncorrelated', color: 'warn' },
        ], source: 'course', pdfPage: 89,
        rederive: 'Var(Z)=Cov(Z,Z); expand Cov(aX+bY,aX+bY) by bilinearity like multiplying brackets.' },
      { id: 'f-varsum-ind', name: 'Independent case (Bienaymé)', tex: 'X_i\\ \\text{indep}\\ \\Rightarrow\\ \\mathrm{Var}\\Big(\\sum_i b_iX_i\\Big)=\\sum_i b_i^2\\mathrm{Var}(X_i)', source: 'course', pdfPage: 90 },
    ],
    examples: {
      simple: 'Independent dice: Var(X+Y) = 35/12 + 35/12 = 35/6.',
      everyday: 'Portfolio risk: two correlated stocks\' combined variance includes 2Cov — diversification only works when Cov is small or negative.',
      mathematical: 'Var(Bin(n,p)) = Σ p(1−p) = np(1−p) (Example 6.12).',
      exam: '"Find Var(3X−2Y)" given variances and Cov: 9Var(X)+4Var(Y)−12Cov(X,Y). Sign of the cross-term = the mark separator.',
    },
    connections: [
      { to: 'lln', how: 'Var(X̄)=σ²/n comes from Bienaymé with bᵢ=1/n.' },
      { to: 'variance', how: 'Contrast with expectation: E is linear unconditionally; Var needs independence for niceness.' },
    ],
    errorIds: ['variance-linear', 'cov-sign'],
  },
  {
    id: 'lln', title: 'The Law of Large Numbers', icon: '', chapter: 6, pdfPages: [91, 92],
    prereqs: ['variance-sums'], examinable: true, lab: 'lln',
    whyCare: 'Why averaging works: sample means converge to the true mean. The theorem justifying every simulation, poll and estimate.',
    keywords: ['law of large numbers', 'lln', 'sample average', 'converge', 'weak law'],
    levels: {
      eli5: 'Flip a coin 10 times, you might see 70% heads — weird happens. Flip a million times, the heads fraction hugs 50% tight. Luck evens out when you play long enough.',
      human: 'For iid X₁,X₂,… with mean μ, variance σ²: the sample average X̄ₙ = (1/n)ΣXᵢ has E[X̄ₙ] = μ and Var(X̄ₙ) = σ²/n → 0. The Weak LLN: for any margin ε>0, P(|X̄ₙ−μ| > ε) → 0 as n → ∞. In practice: to estimate an unknown p, toss lots and take the observed proportion (2000 simulated tosses gave 0.4885 ≈ ½; Pearson really tossed 24 000 coins: 12 012 heads).',
      uni: 'Theorem 6.11 (WLLN): $X_i$ iid, $E[X_i]=\\mu$, $\\mathrm{Var}(X_i)=\\sigma^2$ $\\Rightarrow\\ \\forall\\varepsilon>0:\\ \\lim_{n\\to\\infty}P\\left(\\left|\\frac1n\\sum_{i=1}^nX_i-\\mu\\right|>\\varepsilon\\right)=0$. Engine: $E[\\bar X_n]=\\mu$ (linearity), $\\mathrm{Var}(\\bar X_n)=\\sigma^2/n$ (Bienaymé with $b_i=1/n$: $n\\cdot\\sigma^2/n^2$). Stated without proof here; §7 proves it in two lines from Chebyshev.',
      deep: 'The whole theorem is powered by one scaling fact: averaging n independent copies divides the variance by n (each 1/n coefficient contributes 1/n², n of them). Chebyshev then converts shrinking variance into shrinking tail probability — the §7 proof is genuinely two lines and worth knowing even though non-examinable. "Weak" refers to the MODE of convergence (in probability); the Strong LLN (almost-sure) is a later-year upgrade.',
    },
    formulas: [
      { id: 'f-lln', name: 'Weak LLN', tex: '\\lim_{n\\to\\infty}P\\left(\\left|\\bar X_n-\\mu\\right|>\\varepsilon\\right)=0\\quad\\text{for every }\\varepsilon>0',
        parts: [
          { sym: '\\bar X_n', meaning: 'sample average of n iid copies', color: 'known' },
          { sym: '\\varepsilon', meaning: 'ANY margin of error, however small', color: 'cond' },
        ], source: 'course', pdfPage: 92 },
      { id: 'f-lln-var', name: 'The engine', tex: 'E[\\bar X_n]=\\mu,\\qquad \\mathrm{Var}(\\bar X_n)=\\frac{\\sigma^2}{n}\\xrightarrow{n\\to\\infty}0', source: 'course', pdfPage: 91,
        rederive: 'Linearity for the mean; Bienaymé with coefficients 1/n for the variance: n·(σ²/n²).' },
    ],
    examples: {
      simple: 'Roll a dice forever: running average of scores → 3.5.',
      everyday: 'A casino doesn\'t gamble: over millions of bets the house edge (an expectation) becomes near-certain income.',
      mathematical: 'X̄₂₀₀₀ = 0.4885 for a fair coin — close to, but not exactly, ½ (Example 6.15, Figure 33).',
      exam: '"State the WLLN and identify E[X̄ₙ], Var(X̄ₙ)" — statement + the σ²/n computation are the expected marks.',
    },
    connections: [
      { to: 'chebyshev', how: 'Chebyshev + Var(X̄ₙ)=σ²/n proves the WLLN (Example 7.4).' },
      { to: 'expectation-discrete', how: 'LLN is what makes "expectation = long-run average" literally true.' },
    ],
    errorIds: ['variance-linear'],
  },
];
