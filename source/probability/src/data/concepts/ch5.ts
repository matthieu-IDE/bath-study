import type { Concept } from '../types';

/* Chapter 5 — Continuous random variables (file pages 63–78) */

export const CH5: Concept[] = [
  {
    id: 'pdf', title: 'Probability density functions', icon: '', chapter: 5, pdfPages: [67, 71],
    prereqs: ['cdf'], examinable: true, lab: 'continuous',
    whyCare: 'For continuous rvs P(X=x)=0, so probability lives in AREAS under a curve. Get this picture right and chapter 5 becomes geometry.',
    keywords: ['pdf', 'density', 'area under curve', 'probability density'],
    levels: {
      eli5: 'Spread a kilogram of jam along a shelf. Nowhere does a single point hold any jam — but a STRETCH of shelf holds a weight of jam. The density curve says where the jam is thick.',
      human: 'A pdf f is a curve with f(x) ≥ 0 whose TOTAL area is 1; probabilities are areas: P(a < X ≤ b) = ∫ₐᵇ f(u)du = F(b)−F(a). The pdf is (essentially) the derivative of the cdf. Crucially f(x) is NOT a probability — densities can exceed 1 (Exp(10) starts at height 10); only areas are probabilities.',
      uni: 'Definition 5.4: $f$ is a pdf for $X$ if $F_X(x)=\\int_{-\\infty}^{x}f(u)\\,du$ for all $x$ (and $f=0$ off the support). Consequences: $P(X\\in(a,b])=\\int_a^b f(u)du$ (Eq. 53); $\\int_{-\\infty}^{\\infty}f=1$; $f\\approx F\'$ where differentiable (FTC caveat at kinks, e.g. Unif at $a,b$). Theorem 5.6: bounded pdf $\\Rightarrow P(X=x)=0$ for every $x$.',
      deep: 'Since single points carry no mass, ≤ versus < changes nothing for these rvs: P(a<X<b) = P(a≤X≤b). The pdf is a DERIVATIVE of probability — probability per unit length — which is why it can spike above 1 on narrow supports without breaking anything. The lecturer\'s footnote is exam gold: no difficult integrals will appear; hard ones would be given. Energy goes into SETTING UP the right integral, not grinding it.',
    },
    formulas: [
      { id: 'f-pdf', name: 'Probability = area', tex: 'P(a<X\\le b)=\\int_a^b f_X(u)\\,du = F_X(b)-F_X(a)',
        parts: [
          { sym: 'f_X(u)', meaning: 'density: probability per unit length — NOT itself a probability', color: 'warn' },
          { sym: '\\int_a^b', meaning: 'area over the interval = the probability', color: 'good' },
        ], source: 'course', pdfPage: 68 },
      { id: 'f-pdf-total', name: 'Total area & recovery', tex: '\\int_{-\\infty}^{\\infty} f_X(u)\\,du=1,\\qquad f_X \\approx F_X\'', source: 'course', pdfPage: 68 },
    ],
    examples: {
      simple: 'Unif(0,1): f = 1 on [0,1]; P(0.2 < X ≤ 0.5) = 0.3 — just the length.',
      everyday: 'Exact amount of rain tomorrow: P(exactly 4.000… mm) = 0; P(between 3 and 5 mm) is an area.',
      mathematical: 'X~Exp(1): P(X∈(1,2]) = e⁻¹−e⁻² ≈ 0.2325 (Example 5.7, Figure 27\'s shaded area).',
      exam: '"f(x)=cx² on [0,2]. Find c, then P(X>1)." — impose area 1 (c=3/8), then integrate the tail. The chapter\'s signature question.',
    },
    connections: [
      { to: 'cdf', how: 'pdf integrates to the cdf; cdf differentiates to the pdf.' },
      { to: 'pmf', how: 'The continuous replacement for the pmf: sums become integrals, bars become a curve.' },
      { to: 'expectation-continuous', how: 'E[X]=∫x f(x)dx — same weights-and-values idea with an integral.' },
    ],
    errorIds: ['pmf-pdf', 'cdf-direction', 'sum-to-one'],
  },
  {
    id: 'uniform', title: 'Uniform distribution', icon: '', chapter: 5, pdfPages: [64, 65],
    prereqs: ['pdf'], examinable: true, lab: 'continuous',
    whyCare: 'The continuous version of "equally likely": probability proportional to LENGTH. The simplest pdf, and the source of simulated randomness.',
    keywords: ['uniform', 'unif', 'flat', 'equally likely interval'],
    levels: {
      eli5: 'Spin a bottle: it\'s equally happy pointing anywhere on the circle. No direction is special — chance depends only on how wide a slice you ask about.',
      human: 'X ~ Unif(a,b): flat density 1/(b−a) on [a,b]; cdf ramps linearly from 0 at a to 1 at b. Interval probability depends ONLY on length: P(X∈(u,v]) = (v−u)/(b−a) — position is irrelevant. Mean (a+b)/2; Var (b−a)²/12 (Unif(0,1): mean ½, variance 1/12, Example 6.9).',
      uni: 'Definition 5.1 (by cdf!): $F_X(x)=\\frac{x-a}{b-a}$ on $a<x\\le b$ (0 below, 1 above). Theorem 5.1: pdf $f_X(x)=\\frac1{b-a}$ on $[a,b)$, 0 otherwise (three-case verification). Scaling: $X\\sim\\mathrm{Unif}(0,1)\\Rightarrow 360X\\sim\\mathrm{Unif}(0,360)$ (Example 5.2).',
      deep: 'Unif(0,1) is the mother of all randomness: computers generate U~Unif(0,1) and transform it into anything else (chapter mentions it "can be used for constructing more complicated random variables" — apply F⁻¹ and you sample from any cdf F; that\'s exactly how this app\'s simulations work). Note the pdf is discontinuous at a and b — the promised example of "pdf isn\'t QUITE the derivative of the cdf" at kink points.',
    },
    formulas: [
      { id: 'f-unif', name: 'Uniform cdf & pdf', tex: 'F_X(x)=\\frac{x-a}{b-a}\\ \\ (a<x\\le b),\\qquad f_X(x)=\\frac{1}{b-a}\\ \\ (a\\le x<b)', source: 'course', pdfPage: 64 },
      { id: 'f-unif-int', name: 'Only length matters', tex: 'P(X\\in(u,v])=\\frac{v-u}{b-a}', source: 'course', pdfPage: 64 },
    ],
    examples: {
      simple: 'Unif(0,10): P(X ≤ 3) = 0.3.',
      everyday: 'A bus arrives sometime uniformly in a 12-minute window: P(you wait under 4 min) = 4/12.',
      mathematical: 'X~Unif(0,1), Y=360X ~ Unif(0,360) — the spinner (Example 5.2).',
      exam: '"State the pdf of Unif(a,b) and compute P(u<X<v)" — free marks if you remember the flat picture.',
    },
    connections: [
      { to: 'classical-probability', how: 'Count/total becomes length/total-length — same symmetry idea, continuum version.' },
      { to: 'expectation-continuous', how: 'Var(Unif(0,1))=1/12 is a standard integral worth having done once.' },
    ],
    errorIds: ['pmf-pdf', 'binom-support'],
  },
  {
    id: 'exponential', title: 'Exponential distribution', icon: '', chapter: 5, pdfPages: [65, 66],
    prereqs: ['pdf', 'geometric', 'poisson'], examinable: true, lab: 'continuous',
    whyCare: 'THE waiting-time distribution: time until the next customer, decay, phone call. Memoryless — the only continuous distribution that forgets.',
    keywords: ['exponential', 'exp', 'memoryless', 'waiting time', 'rate'],
    levels: {
      eli5: 'Waiting for a shooting star: however long you\'ve already waited, the wait ahead looks exactly the same. The sky doesn\'t remember your patience.',
      human: 'X ~ Exp(λ): cdf 1−e^(−λx), pdf λe^(−λx) on x ≥ 0. λ is a RATE (events per unit time); E[X] = 1/λ — "higher rate, shorter wait" (rate 12 customers/min → expect 5 s). Two headline facts: memorylessness P(X ≤ x+y | X > x) = P(X ≤ y) (Example 5.5); and min of independent exponentials: min(Exp(λ), Exp(μ)) ~ Exp(λ+μ) (Example 5.4). Born from Poisson: if arrivals by time t are Pois(μt), the first-arrival time is Exp(μ) (Example 5.3).',
      uni: 'Definition 5.2: $F_X(x)=1-e^{-\\lambda x}$ ($x\\ge0$), $\\lambda>0$. Theorem 5.2: $f_X(x)=\\lambda e^{-\\lambda x}$. Example 5.3: $\\{T>t\\}=\\{N_t=0\\}\\Rightarrow P(T>t)=e^{-\\mu t}$. Example 5.4: $P(\\min>z)=P(X>z)P(Y>z)=e^{-(\\lambda+\\mu)z}$. Example 5.5 (memoryless): $\\frac{F(x+y)-F(x)}{1-F(x)}=1-e^{-\\lambda y}$. $E[X]=1/\\lambda$ (Example 6.3).',
      deep: 'Memorylessness characterises the exponential among continuous distributions (as geometric does among discrete) — survival satisfying P(X>x+y)=P(X>x)P(X>y) forces an exponential curve. The survival form P(X>t)=e^(−λt) is usually the fastest tool: the min-of-exponentials proof is two lines of survival multiplication. Exp is the continuum limit of Geom(p) with p=λ/n over time-slices of width 1/n — the two waiting-time distributions are one idea at two resolutions.',
    },
    formulas: [
      { id: 'f-exp', name: 'Exponential cdf/pdf/survival', tex: 'F(x)=1-e^{-\\lambda x},\\quad f(x)=\\lambda e^{-\\lambda x},\\quad P(X>x)=e^{-\\lambda x}',
        parts: [
          { sym: '\\lambda', meaning: 'rate: expected events per unit time; E[X]=1/λ', color: 'known' },
          { sym: 'e^{-\\lambda x}', meaning: 'survival: still waiting at time x', color: 'cond' },
        ], source: 'course', pdfPage: 65 },
      { id: 'f-exp-mem', name: 'Memoryless property', tex: 'P(X\\le x+y\\mid X>x)=P(X\\le y)', source: 'course', pdfPage: 66,
        rederive: 'Compute (F(x+y)−F(x))/(1−F(x)); the e^{−λx} factors cancel.' },
    ],
    examples: {
      simple: 'λ=1: P(X>1) = e⁻¹ ≈ 0.37.',
      everyday: 'Customers at 12/min: expected gap 1/12 min = 5 seconds (the "Fresh" queue, p80).',
      mathematical: 'min(Exp(λ), Exp(μ)) ~ Exp(λ+μ): first of two independent alarms (Example 5.4).',
      exam: '"Show the exponential is memoryless" — a 4-mark derivation to know cold: conditional as ratio, cancel exponentials.',
    },
    connections: [
      { to: 'geometric', how: 'Discrete twin: both memoryless, both "time to first event".' },
      { to: 'poisson', how: 'Poisson counts events; exponential times the gaps — two views of one process.' },
    ],
    errorIds: ['cdf-direction', 'poisson-rate', 'wrong-distribution'],
  },
  {
    id: 'normal', title: 'Normal distribution', icon: '', chapter: 5, pdfPages: [66, 69],
    prereqs: ['pdf'], examinable: true, lab: 'continuous',
    whyCare: 'The bell curve: μ slides it, σ² widens it. Universal because sums of many small effects look normal (CLT — next semester\'s headline).',
    keywords: ['normal', 'gaussian', 'bell curve', 'phi', 'standard normal', 'mu sigma'],
    levels: {
      eli5: 'Measure the heights of everyone in your school: a hill of people, most in the middle, few very short or very tall. Nature draws this hill again and again.',
      human: 'X ~ N(μ,σ²): symmetric bell centred at μ with spread σ. The cdf has NO closed formula — it\'s an integral, computed numerically; the standard normal N(0,1) cdf gets its own name Φ. E[X]=μ by symmetry (Example 6.7). Changing μ slides the curve; changing σ² squashes or flattens it (Figures 23–24).',
      uni: 'Definition 5.3: $F_X(x)=\\int_{-\\infty}^{x}\\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(u-\\mu)^2}{2\\sigma^2}}du$; Theorem 5.3: the integrand is the pdf. $\\int f=1$ is "technical, omitted". $\\mathrm N(0,1)$ cdf $=\\Phi$. $E[X]=\\mu$: substitute $y=x-\\mu$ and cancel the odd integrand (Example 6.7). Universality = Central Limit Theorem, semester 2.',
      deep: 'The pdf\'s anatomy: (x−μ)² makes it symmetric about μ; dividing by 2σ² sets the width; the exponential tames the tails; √(2πσ²) is exactly what forces total area 1 (the famous Gaussian integral). E[X]=μ needs no integration table — symmetry kills the odd part, a technique (exploit symmetry before integrating) worth stealing for exams. This course only needs the SHAPE and parameter roles; z-tables and CLT arrive in semester 2.',
    },
    formulas: [
      { id: 'f-norm', name: 'Normal pdf', tex: 'f_X(x)=\\frac{1}{\\sqrt{2\\pi\\sigma^2}}\\;e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
        parts: [
          { sym: '\\mu', meaning: 'centre: peak and mean', color: 'known' },
          { sym: '\\sigma^2', meaning: 'spread: bigger = flatter and wider', color: 'cond' },
          { sym: '\\sqrt{2\\pi\\sigma^2}', meaning: 'normaliser making total area 1', color: 'accent' },
        ], source: 'course', pdfPage: 70 },
    ],
    examples: {
      simple: 'N(0,1): symmetric around 0, so P(X≤0) = ½ — no tables needed.',
      everyday: 'Delivery times "30 ± 5 min" ≈ N(30, 25): most orders near 30, rare ones far out.',
      mathematical: 'E[X]=μ by the substitution y=x−μ and odd-function cancellation (Example 6.7).',
      exam: '"State the pdf of N(μ,σ²); what happens as σ² grows?" — sketchable understanding, not table lookups, is what this course tests.',
    },
    connections: [
      { to: 'lln', how: 'Averages concentrate (LLN); HOW they fluctuate around μ is normal (CLT, semester 2).' },
      { to: 'variance', how: 'σ² IS the variance — the parameter and the concept coincide.' },
    ],
    errorIds: ['pmf-pdf', 'variance-formula'],
  },
  {
    id: 'joint-continuous', title: 'Joint continuous distributions', icon: '', chapter: 5, pdfPages: [72, 75],
    prereqs: ['pdf', 'joint-discrete'], examinable: true, lab: 'rect',
    whyCare: 'Two continuous rvs share a joint density SURFACE; probabilities become volumes and marginals come from integrating one variable out.',
    keywords: ['joint pdf', 'double integral', 'marginal density', 'volume'],
    levels: {
      eli5: 'Instead of jam on a shelf, now it\'s a tent of jam over a table. The chance of landing in a rectangle of table is the jam VOLUME above that rectangle.',
      human: 'Joint pdf f_{X,Y}(x,y): non-negative surface with total volume 1. P(X∈(a,b], Y∈(c,d]) = ∫ₐᵇ∫꜀ᵈ f dy dx. Marginal density: integrate the other variable out, fX(x) = ∫f(x,y)dy. Order of integration doesn\'t matter for non-negative f (Fubini — stated, not proved). This course sticks to RECTANGULAR regions; discs and triangles wait for semester 2.',
      uni: 'Definition 5.5: $F_{X,Y}(x,y)=\\int_{-\\infty}^x\\int_{-\\infty}^y f(u,v)\\,dv\\,du$. Rectangle probability: $P(X\\in(a,b],Y\\in(c,d])=\\int_a^b\\int_c^d f_{X,Y}\\,dy\\,dx$ (Eqs 56–58). Marginal: $f_X(x)=\\int_{-\\infty}^{\\infty}f_{X,Y}(x,y)\\,dy$ (Eq. 59). Total volume $F(\\infty,\\infty)=1$.',
      deep: 'Everything from the discrete world transfers by the dictionary Σ→∫, table→surface, cell→patch of area. The Fubini caveat is the honest note: swapping integrals means swapping limits, which can fail in general — non-negativity is the safety certificate (Tonelli, if you meet measure theory). Example 5.9 demonstrates the swap giving 1 both ways.',
    },
    formulas: [
      { id: 'f-jpdf', name: 'Rectangle probability & marginal', tex: 'P(X\\in(a,b],Y\\in(c,d])=\\int_a^b\\!\\!\\int_c^d f_{X,Y}\\,dy\\,dx,\\qquad f_X(x)=\\int_{-\\infty}^{\\infty}f_{X,Y}(x,y)\\,dy', source: 'course', pdfPage: 74 },
    ],
    examples: {
      simple: 'Uniform on the unit square: f=1; P(X≤½, Y≤½) = ¼ — a quarter of the volume.',
      everyday: 'X = time you arrive, Y = time your friend arrives: "both within the first 10 minutes" is a rectangle of the joint density.',
      mathematical: 'g(x,y) = (3/16)x² + y/2 on [0,2]×[0,1] integrates to 1 either order (Example 5.9).',
      exam: '"Find the marginal density of X and P(X>1, Y<2)" — set up the double integral over the rectangle, integrate inner first.',
    },
    connections: [
      { to: 'joint-discrete', how: 'The Σ→∫ dictionary: same concepts, new machinery.' },
      { to: 'independence-continuous', how: 'Surface factorises into a product of curves ⟺ independent.' },
    ],
    errorIds: ['algebra', 'marginal-mix'],
  },
  {
    id: 'independence-continuous', title: 'Independence (continuous)', icon: '', chapter: 5, pdfPages: [75, 78],
    prereqs: ['joint-continuous', 'independence-rvs'], examinable: true, lab: 'rect',
    whyCare: 'Factorise the joint density and hard double integrals collapse into products of single integrals.',
    keywords: ['independent continuous', 'factorise density', 'product of densities'],
    levels: {
      eli5: 'If the jam tent is just "curve along x" times "curve along y", the two directions don\'t talk to each other — you can handle them one at a time.',
      human: 'X ⊥ Y ⟺ f_{X,Y}(x,y) = fX(x)fY(y). Then rectangle probabilities factor: P(X∈A, Y∈B) = P(X∈A)P(Y∈B). Shortcut (Theorem 5.5b): if the joint density separates into ANY g(x)h(y), independence holds — constants sort themselves out.',
      uni: 'Theorem 5.4: $f_{X,Y}=f_Xf_Y \\iff X\\perp Y$ (both directions proved by splitting the double integral). Example 5.10: independent Exp(1), Exp(2) have joint pdf $2e^{-x-2y}$. Example 5.11: $P(X\\in(1,2],Y\\in(1,2])=(e^{-1}-e^{-2})(e^{-2}-e^{-4})\\approx0.0272$. Theorem 5.5(b): separability $f_{X,Y}(x,y)=g(x)h(y)$ suffices.',
      deep: 'Separability is a geometric statement: every horizontal slice of the surface has the SAME SHAPE, just rescaled — knowing Y\'s value changes X\'s profile not at all. Watch the support: a joint density positive only on a triangle {x<y} can NEVER separate, however friendly its formula — support shape alone can prove dependence. (Rectangular support is necessary for independence, not sufficient.)',
    },
    formulas: [
      { id: 'f-indep-cont', name: 'Independence (continuous)', tex: 'f_{X,Y}(x,y)=f_X(x)\\,f_Y(y)\\quad\\forall x,y', source: 'course', pdfPage: 76 },
    ],
    examples: {
      simple: 'Unit square uniform: f = 1 = 1·1 ✓ independent.',
      everyday: 'Two independent bus waits: joint density of (yours, your friend\'s) = product of two exponentials.',
      mathematical: 'f(x,y) = 2e^{−x−2y} = (e^{−x})(2e^{−2y}) → X~Exp(1) ⊥ Y~Exp(2) (Example 5.10).',
      exam: '"Are X,Y with joint pdf f independent?" — attempt to separate g(x)h(y); check the support is a rectangle; then conclude.',
    },
    connections: [
      { to: 'product-independence', how: 'Delivers E[XY]=E[X]E[Y] in the continuous world too.' },
      { to: 'exponential', how: 'The min-of-exponentials trick multiplies survival functions — independence at work.' },
    ],
    errorIds: ['product-expectation', 'marginal-mix'],
  },
];
