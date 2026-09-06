/* One-screen visual chapter summaries: formulas, decision trees, traps, micro-examples. */

export interface SheetItem {
  kind: 'formula' | 'decision' | 'trap' | 'mini' | 'compare';
  title: string;
  tex?: string;
  lines?: string[];       // decision-tree lines / bullets, $tex$ allowed
}
export interface CheatSheet {
  chapter: number;
  title: string;
  unlockMastery: number;  // avg chapter mastery to unlock
  items: SheetItem[];
}

export const SHEETS: CheatSheet[] = [
  {
    chapter: 1, title: 'Foundations', unlockMastery: 0.35,
    items: [
      { kind: 'formula', title: 'Axioms', tex: 'P(E)\\ge0\\quad P(\\Omega)=1\\quad P\\big(\\textstyle\\bigcup_i E_i\\big)=\\sum_i P(E_i)\\ \\text{(disjoint)}' },
      { kind: 'formula', title: 'The toolkit', tex: 'P(E^c)=1-P(E)\\qquad P(F)=P(F\\cap E)+P(F\\cap E^c)\\qquad P(E\\cup F)=P(E)+P(F)-P(E\\cap F)' },
      { kind: 'formula', title: 'De Morgan', tex: '(E\\cup F)^c=E^c\\cap F^c\\qquad(E\\cap F)^c=E^c\\cup F^c' },
      { kind: 'decision', title: 'P(E∪F)?', lines: ['Disjoint? → **add**: $P(E)+P(F)$', 'Overlap? → **inclusion–exclusion**: subtract $P(E\\cap F)$', '"At least one of many"? → **complement**: $1-P(\\text{none})$'] },
      { kind: 'trap', title: 'Traps', lines: ['Union is NOT addition (only for disjoint)', 'σ-algebra: ∅ ∈ F, closed under ᶜ and countable ∪', 'Everything else (P(∅)=0, P≤1, …) is a THEOREM — cite axioms in proofs'] },
      { kind: 'mini', title: '10-second check', lines: ['Cluedo: $P(M\\cup R)=\\tfrac{12}{27}+\\tfrac9{27}-\\tfrac4{27}=\\tfrac{17}{27}$'] },
    ],
  },
  {
    chapter: 2, title: 'Counting', unlockMastery: 0.35,
    items: [
      { kind: 'decision', title: 'WHICH counting formula?', lines: [
        '**Does order matter?**',
        'YES → replacement? YES → $n^r$ (PIN) · NO → $\\frac{n!}{(n-r)!}$ (podium)',
        'NO → replacement? YES → $\\binom{n-1+r}{r}$ (doughnuts) · NO → $\\binom{n}{r}$ (lotto)'] },
      { kind: 'formula', title: 'Classical probability', tex: 'P(E)=\\frac{|E|}{|\\Omega|}\\quad\\text{(equally likely outcomes ONLY)}' },
      { kind: 'formula', title: 'Stages multiply', tex: '\\#(\\text{stage}_1\\cdots\\text{stage}_k)=n_1n_2\\cdots n_k' },
      { kind: 'trap', title: 'Traps', lines: ['Wrong Ω: {0,1,2,3} heads is NOT equally likely — use sequences', 'Repeated letters: ALGEBRA = 7!/2!', 'Count |E| and |Ω| the SAME way (both ordered or both unordered)'] },
      { kind: 'mini', title: '10-second checks', lines: ['Full house: $\\frac{13\\binom43\\cdot12\\binom42}{\\binom{52}5}$', 'Walk at 0 after n (even): $\\binom{n}{n/2}2^{-n}$'] },
    ],
  },
  {
    chapter: 3, title: 'Conditioning & Independence', unlockMastery: 0.35,
    items: [
      { kind: 'formula', title: 'The core four', tex: 'P(E|F)=\\frac{P(E\\cap F)}{P(F)}\\qquad P(E\\cap F)=P(F)P(E|F)' },
      { kind: 'formula', title: 'Total probability → Bayes', tex: 'P(F)=\\sum_i P(E_i)P(F|E_i)\\qquad P(E_j|F)=\\frac{P(E_j)P(F|E_j)}{\\sum_i P(E_i)P(F|E_i)}' },
      { kind: 'decision', title: 'Which tool?', lines: [
        'Told F happened, want E → **conditional** (shrink to F)',
        'Cases split the world → **total probability** (weighted average)',
        'Want to REVERSE P(F|E) → **Bayes** (prior × likelihood ÷ evidence)',
        'Sequential no-replacement → **chain rule**'] },
      { kind: 'compare', title: 'Disjoint vs independent', lines: ['Disjoint: $P(E\\cap F)=0$ — can\'t co-occur → knowing one KILLS the other (dependent!)', 'Independent: $P(E\\cap F)=P(E)P(F)$ — knowing one changes NOTHING'] },
      { kind: 'trap', title: 'Traps', lines: ['Pairwise ≠ mutual: 3 events need 4 equations', 'P(A|B) ≠ P(B|A) — prosecutor\'s fallacy', 'Bayes denominator = ALL branches (total probability)'] },
    ],
  },
  {
    chapter: 4, title: 'Discrete Random Variables', unlockMastery: 0.35,
    items: [
      { kind: 'compare', title: 'The five distributions', lines: [
        '**Ber(p)**: one yes/no · E=p · Var=p(1−p)',
        '**Bin(n,p)**: #successes in n trials · $\\binom nx p^x(1-p)^{n-x}$ · E=np · Var=np(1−p)',
        '**Geom(p)**: trials TO first success (from 1!) · $(1-p)^{k-1}p$ · E=1/p · Var=(1−p)/p²',
        '**Pois(λ)**: #events at rate λ · $\\frac{\\lambda^x}{x!}e^{-\\lambda}$ · E=Var=λ'] },
      { kind: 'decision', title: 'Which distribution?', lines: [
        'Fixed n trials, count successes → **Binomial**',
        'Waiting for FIRST success → **Geometric**',
        'Events at a rate over time/space → **Poisson** (rescale λ to window!)',
        'n huge, p tiny → **Poisson approx**, λ=np'] },
      { kind: 'formula', title: 'Survival & sums', tex: 'P(\\mathrm{Geom}>n)=(1-p)^n\\qquad \\mathrm{Pois}(\\lambda)+\\mathrm{Pois}(\\mu)\\sim\\mathrm{Pois}(\\lambda+\\mu)' },
      { kind: 'formula', title: 'Joint → marginal', tex: 'f_X(x)=\\sum_y f_{X,Y}(x,y)\\qquad X\\perp Y\\iff f_{X,Y}=f_Xf_Y\\ \\forall x,y' },
      { kind: 'trap', title: 'Traps', lines: ['Geometric here starts at k=1', 'cdf jumps: P(X=x) = jump height; F(x)=P(X≤x) with ≤', 'One non-factorising cell (esp. a zero) kills independence'] },
    ],
  },
  {
    chapter: 5, title: 'Continuous Random Variables', unlockMastery: 0.35,
    items: [
      { kind: 'formula', title: 'Probability = area', tex: 'P(a<X\\le b)=\\int_a^b f(u)\\,du=F(b)-F(a)\\qquad \\int_{-\\infty}^{\\infty}f=1' },
      { kind: 'compare', title: 'The three distributions', lines: [
        '**Unif(a,b)**: flat $\\frac1{b-a}$ · only LENGTH matters · E=(a+b)/2 · Var=(b−a)²/12',
        '**Exp(λ)**: $f=\\lambda e^{-\\lambda x}$, $P(X>x)=e^{-\\lambda x}$ · memoryless · E=1/λ',
        '**N(μ,σ²)**: bell at μ, width σ · cdf has no formula (Φ for N(0,1)) · E=μ'] },
      { kind: 'decision', title: 'Continuous strategy', lines: [
        'Find a constant c → impose total area 1',
        'P(interval) → integrate pdf or difference the cdf',
        'P(X > x) for Exp → jump straight to $e^{-\\lambda x}$',
        'min of independent Exps → rates ADD'] },
      { kind: 'trap', title: 'Traps', lines: ['f(x) can exceed 1 — only areas are probabilities', 'P(X = x) = 0 for continuous X; < vs ≤ is free', 'Joint: this course = rectangles only; marginal = integrate the other var out'] },
    ],
  },
  {
    chapter: 6, title: 'Expectation & Variance', unlockMastery: 0.35,
    items: [
      { kind: 'formula', title: 'Definitions', tex: 'E[X]=\\sum xP(X=x)\\ /\\ \\int xf\\,dx\\qquad \\mathrm{Var}(X)=E[X^2]-(E[X])^2' },
      { kind: 'formula', title: 'The summary box (p91) — LEARN THIS', tex: 'E\\big[\\sum a_iX_i\\big]=\\sum a_iE[X_i]\\qquad \\mathrm{Var}\\big(\\sum a_iX_i\\big)=\\sum a_i^2\\mathrm{Var}(X_i)+2\\!\\!\\sum_{i<j}\\!a_ia_j\\mathrm{Cov}(X_i,X_j)' },
      { kind: 'formula', title: 'Covariance', tex: '\\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]\\qquad \\rho=\\frac{\\mathrm{Cov}}{\\sqrt{\\mathrm{Var}\\cdot\\mathrm{Var}}}\\in[-1,1]' },
      { kind: 'compare', title: 'Linear vs not', lines: [
        '**E is linear ALWAYS** (dependence irrelevant): E[aX+bY]=aE[X]+bE[Y]',
        '**Var is NOT**: Var(aX+b)=a²Var(X); cross-terms 2abCov unless independent',
        '**Products need independence**: E[XY]=E[X]E[Y] only if X⊥Y'] },
      { kind: 'decision', title: 'Hard expectation?', lines: ['Can you split it into a SUM of simple rvs? (Bin = n Bernoullis)', 'Need E[g(X)]? → LOTUS: Σ g(x)p(x), never g(E[X])', 'Sample mean: E[X̄]=μ, Var(X̄)=σ²/n → LLN'] },
      { kind: 'trap', title: 'Traps', lines: ['Var(X−Y) = Var+Var−2Cov: PLUS Var(Y)', 'Cov=0 does NOT imply independent', 'Negative variance = arithmetic error, always'] },
    ],
  },
  {
    chapter: 7, title: 'Indicators & Inequalities (non-examinable)', unlockMastery: 0.3,
    items: [
      { kind: 'formula', title: 'Indicators', tex: '\\mathbb 1_A\\in\\{0,1\\}\\qquad E[\\mathbb 1_A]=P(A)\\qquad \\mathbb 1_{A\\cap B}=\\mathbb 1_A\\mathbb 1_B' },
      { kind: 'formula', title: 'Tail bounds', tex: 'P(X\\ge x)\\le\\frac{E[X]}{x}\\ (X\\ge0)\\qquad P(|X-E[X]|\\ge x)\\le\\frac{\\mathrm{Var}(X)}{x^2}' },
      { kind: 'formula', title: 'Tail-sum formula', tex: 'E[X]=\\int_0^\\infty P(X\\ge x)dx\\qquad E[X]=\\sum_{j\\ge1}P(X\\ge j)\\ \\ (X\\in\\{0,1,\\dots\\})' },
      { kind: 'mini', title: 'The story', lines: ['Chebyshev + Var(X̄)=σ²/n ⇒ **WLLN in two lines**', 'Random walk: returns to 0 with prob 1, but E[return time]=∞'] },
      { kind: 'trap', title: 'Remember', lines: ['The lecturer wrote §7 AFTER the exam — zero exam marks here. Depth only.'] },
    ],
  },
];
