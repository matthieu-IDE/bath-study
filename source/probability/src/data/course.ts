import type { Chapter, Concept } from './types';
import { CH1 } from './concepts/ch1';
import { CH2 } from './concepts/ch2';
import { CH3 } from './concepts/ch3';
import { CH4 } from './concepts/ch4';
import { CH5 } from './concepts/ch5';
import { CH6 } from './concepts/ch6';
import { CH7 } from './concepts/ch7';

export const CONCEPTS: Concept[] = [...CH1, ...CH2, ...CH3, ...CH4, ...CH5, ...CH6, ...CH7];
export const CONCEPT_MAP: Record<string, Concept> = Object.fromEntries(CONCEPTS.map(c => [c.id, c]));

export const CHAPTERS: Chapter[] = [
  { n: 1, title: 'Foundations of Probability', icon: '', pdfPages: [7, 19], examinable: true,
    conceptIds: CH1.map(c => c.id) },
  { n: 2, title: 'Classical Probability & Counting', icon: '', pdfPages: [20, 30], examinable: true,
    conceptIds: CH2.map(c => c.id) },
  { n: 3, title: 'Conditional Probability & Independence', icon: '', pdfPages: [31, 41], examinable: true,
    conceptIds: CH3.map(c => c.id) },
  { n: 4, title: 'Discrete Random Variables', icon: '', pdfPages: [41, 63], examinable: true,
    conceptIds: CH4.map(c => c.id) },
  { n: 5, title: 'Continuous Random Variables', icon: '', pdfPages: [63, 78], examinable: true,
    conceptIds: CH5.map(c => c.id) },
  { n: 6, title: 'Expectation & Variance', icon: '', pdfPages: [78, 92], examinable: true,
    conceptIds: CH6.map(c => c.id) },
  { n: 7, title: 'Indicators & Applications', icon: '', pdfPages: [93, 98], examinable: false,
    conceptIds: CH7.map(c => c.id) },
];

/* ---------------- 98-page map: file page → contents ----------------
   File page = printed page + 3. Labels quote the actual notes structure. */

export interface PageInfo {
  page: number;
  label: string;
  concepts: string[];
  examinable: boolean;
  chapter: number; // 0 = front matter
}

const P = (page: number, label: string, concepts: string[], chapter: number, examinable = true): PageInfo =>
  ({ page, label, concepts, chapter, examinable });

export const PAGE_MAP: PageInfo[] = [
  P(1, 'Cover page', [], 0, false),
  P(2, 'Title & contents', [], 0, false),
  P(3, 'Contents (continued)', [], 0, false),
  P(4, 'Overview: content & learning outcomes', [], 0, false),
  P(5, 'Organisation · assessment · MA10211 past papers', [], 0, false),
  P(6, 'FAQ: probability vs statistics', [], 0, false),
  P(7, '§1.1 Sets: sample spaces & events (Defs 1.1–1.3)', ['sample-space'], 1),
  P(8, 'Subsets, Venn · set operations (Def 1.4)', ['sample-space', 'set-operations'], 1),
  P(9, 'Union, intersection, difference (Figs 2–4)', ['set-operations'], 1),
  P(10, 'Complement · disjoint events (Def 1.5)', ['set-operations'], 1),
  P(11, 'Laws of set theory · De Morgan (Thm 1.1)', ['set-laws'], 1),
  P(12, 'De Morgan proof · collections of sets', ['set-laws'], 1),
  P(13, 'Pairwise disjoint · power set · σ-algebras (Def 1.7)', ['set-laws', 'sigma-algebra'], 1),
  P(14, 'σ-algebra closure lemmas (Lemmas 1.1–1.2)', ['sigma-algebra'], 1),
  P(15, 'Kolmogorov\'s axioms (Def 1.8) · P(∅)=0', ['kolmogorov-axioms'], 1),
  P(16, 'Finite additivity · complements (Cor 1.1)', ['kolmogorov-axioms', 'probability-rules'], 1),
  P(17, 'Partition & containment rules · inclusion–exclusion', ['probability-rules', 'inclusion-exclusion'], 1),
  P(18, 'Cluedo worked example (Ex 1.9)', ['inclusion-exclusion'], 1),
  P(19, 'Double counting · specifying probabilities (Thm 1.3)', ['inclusion-exclusion', 'kolmogorov-axioms'], 1),
  P(20, '§2 Classical probability (Def 2.1) · 3 coins', ['classical-probability'], 2),
  P(21, 'Two dice table · cycle/swim Venn (Ex 2.3–2.4)', ['classical-probability'], 2),
  P(22, '§2.2 Multiplication principle', ['multiplication-principle'], 2),
  P(23, 'Multiplication principle proof · coin+dice+card', ['multiplication-principle', 'permutations'], 2),
  P(24, 'Permutations: nʳ and n!/(n−r)! · PIN codes', ['permutations'], 2),
  P(25, 'Picture cards example · combinations C(n,r)', ['permutations', 'combinations'], 2),
  P(26, 'Lottery · full house (Ex 2.8–2.9)', ['combinations'], 2),
  P(27, 'Stars & bars · THE sampling table', ['combinations', 'sampling-table'], 2),
  P(28, 'METHODS/ALGEBRA · cards in order (Ex 2.11–2.13)', ['permutations', 'combinations'], 2),
  P(29, 'Urn first-red-ball · random walk paths (Ex 2.14–2.15)', ['combinations', 'random-walk-intro'], 2),
  P(30, 'Random walk at 0 · Stirling (non-exam)', ['random-walk-intro'], 2),
  P(31, '§3.1 Conditional probability (Def 3.1) · three tails', ['conditional-probability'], 3),
  P(32, 'Two aces · chain rule (Thm 3.1) · fuses', ['conditional-probability', 'chain-rule'], 3),
  P(33, '§3.2 Partitions · law of total probability (Thm 3.2)', ['total-probability'], 3),
  P(34, 'Traders example · Bayes\' theorem (Thm 3.3)', ['total-probability', 'bayes'], 3),
  P(35, 'Bayes on losses · independence (Def 3.3)', ['bayes', 'independence'], 3),
  P(36, 'Ace independent · complements · disjoint≠independent!', ['independence', 'independence-warnings'], 3),
  P(37, 'Mutual independence: 4 equations · counterexamples', ['independence-warnings'], 3),
  P(38, 'Three missiles · switch circuit (Ex 3.12–3.13)', ['independence-warnings', 'complement-trick'], 3),
  P(39, 'Circuit fig · random walk recurrence (non-exam)', ['random-walk-intro'], 3, false),
  P(40, 'Prosecutor\'s fallacy: Sally Clark (non-exam)', ['bayes'], 3, false),
  P(41, 'Sally Clark Bayes analysis · §4.1 random variables', ['bayes', 'random-variable'], 4),
  P(42, 'X(ω) table · Fig 14 · discrete rvs (Def 4.2)', ['random-variable'], 4),
  P(43, 'Continuous rvs · pmf (Def 4.4)', ['random-variable', 'pmf'], 4),
  P(44, '§4.2 CDFs (Def 4.5) · staircase Fig 15', ['cdf'], 4),
  P(45, 'CDF properties (Thm 4.1) · intervals (Thm 4.2)', ['cdf'], 4),
  P(46, 'pmf from cdf jumps · Bernoulli (Def 4.6)', ['cdf', 'bernoulli'], 4),
  P(47, 'Bernoulli cdf · Binomial (Def 4.7)', ['bernoulli', 'binomial'], 4),
  P(48, 'Binomial pmfs n=100 (Fig 16)', ['binomial'], 4),
  P(49, 'Binomial remarks · Geometric (Def 4.8)', ['binomial', 'geometric'], 4),
  P(50, 'Geometric pmfs (Fig 17)', ['geometric'], 4),
  P(51, 'Geom sums to 1 · P(X>n)=(1−p)ⁿ (Ex 4.9–4.10)', ['geometric'], 4),
  P(52, 'Billy Forgetful · Poisson (Def 4.9)', ['geometric', 'poisson'], 4),
  P(53, 'Poisson pmfs (Fig 18)', ['poisson'], 4),
  P(54, 'Freddie\'s sneezes · Poisson≈Binomial (Ex 4.12–4.13)', ['poisson'], 4),
  P(55, 'Westminster accidents · §4.4 joint distributions', ['poisson', 'joint-discrete'], 4),
  P(56, 'Joint pmf (Def 4.10) · marginals', ['joint-discrete'], 4),
  P(57, 'Joint table (Ex 4.17) · joint cdf (Def 4.11)', ['joint-discrete'], 4),
  P(58, '§4.4.2 Independence of rvs (Def 4.12, Thm 4.5)', ['independence-rvs'], 4),
  P(59, 'Dice independent · geometric factorisation (Ex 4.18–4.19)', ['independence-rvs'], 4),
  P(60, 'Interval formulation proof (Thm 4.6)', ['independence-rvs'], 4),
  P(61, 'Proof of Thm 4.5 · convolution (Thm 4.7)', ['independence-rvs', 'convolution'], 4),
  P(62, 'Pois+Pois · Bin+Bin (Ex 4.20–4.21)', ['convolution'], 4),
  P(63, 'Vandermonde proofs · §5 continuous rvs intro', ['convolution', 'pdf'], 5),
  P(64, '§5.1.1 Uniform distribution (Def 5.1, Fig 20)', ['uniform'], 5),
  P(65, 'Unif examples · Exponential (Def 5.2) · Max the Mechanic', ['uniform', 'exponential'], 5),
  P(66, 'Exp cdfs · memoryless (Ex 5.5) · Normal (Def 5.3)', ['exponential', 'normal'], 5),
  P(67, 'Standard normal cdf Φ · §5.2 pdfs intro', ['normal', 'pdf'], 5),
  P(68, 'Normal cdfs varying μ (Fig 23)', ['normal'], 5),
  P(69, 'Normal cdfs varying σ² · pdf (Def 5.4) · area=prob', ['normal', 'pdf'], 5),
  P(70, 'Fig 25 area · Unif/Exp pdfs (Thms 5.1–5.2)', ['pdf', 'uniform'], 5),
  P(71, 'Normal pdf (Thm 5.3) · gallery Fig 26 · Ex 5.7', ['pdf', 'normal'], 5),
  P(72, 'Shaded area Fig 27 · accidents fit · §5.3 joint pdfs', ['pdf', 'joint-continuous'], 5),
  P(73, 'Joint pdf (Def 5.5) · Fubini discussion', ['joint-continuous'], 5),
  P(74, 'Double integral example (Ex 5.9) · rectangles', ['joint-continuous'], 5),
  P(75, 'Marginal pdf (Eq 59) · rectangular events', ['joint-continuous'], 5),
  P(76, 'Non-rectangular fig · independence (Thm 5.4)', ['joint-continuous', 'independence-continuous'], 5),
  P(77, '2e^{−x−2y} example · separability (Thm 5.5)', ['independence-continuous'], 5),
  P(78, 'P(X=x)=0 (Thm 5.6) · §6 expectation intro', ['independence-continuous', 'expectation-discrete'], 6),
  P(79, 'Dice mean 7/2 · Geom mean 1/p · §6.2 continuous', ['expectation-discrete', 'expectation-continuous'], 6),
  P(80, 'Exp mean 1/λ · §6.3 LOTUS (Thm 6.3)', ['expectation-continuous', 'lotus'], 6),
  P(81, 'LOTUS proof · E[X²], E[XY] (Ex 6.4)', ['lotus'], 6),
  P(82, 'Linearity of expectation (Thm 6.4)', ['linearity'], 6),
  P(83, 'E[3X−Y+5] · Bin mean np two ways (Ex 6.5–6.6)', ['linearity', 'binomial'], 6),
  P(84, 'Normal mean μ · monotonicity · products (Thm 6.5)', ['linearity', 'product-independence'], 6),
  P(85, '"Independence means multiplication" · variance (Def 6.3)', ['product-independence', 'variance'], 6),
  P(86, 'Var=E[X²]−(E[X])² · Geom & Unif variances', ['variance'], 6),
  P(87, 'Var=0 iff constant · Var(aX+b)=a²Var', ['variance'], 6),
  P(88, '§6.4.1 Covariance & correlation (Def 6.4)', ['covariance'], 6),
  P(89, 'Bilinearity of Cov · §6.4.2 Var of sums (Thm 6.10)', ['covariance', 'variance-sums'], 6),
  P(90, 'Bienaymé (Cors 6.6–6.7)', ['variance-sums'], 6),
  P(91, 'Bin variance · summary box · §6.5 LLN', ['variance-sums', 'lln'], 6),
  P(92, 'Sample averages concentrate (Fig 32) · WLLN (Thm 6.11)', ['lln'], 6),
  P(93, '2000-toss realisation · §7 extension intro', ['lln', 'indicators'], 6),
  P(94, 'Indicators (Def 7.1) · Markov\'s inequality (Thm 7.1)', ['indicators', 'markov-chebyshev'], 7, false),
  P(95, 'Chebyshev (Cor 7.1) · WLLN proved! (Ex 7.4)', ['markov-chebyshev'], 7, false),
  P(96, 'Tail-sum formula (Thm 7.2, Cor 7.2)', ['expectation-tail'], 7, false),
  P(97, 'Exp & Geom means again · §7.4 return time', ['expectation-tail', 'random-walk-return'], 7, false),
  P(98, 'Reflection principle · E[T]=∞', ['random-walk-return'], 7, false),
];

export const pageInfo = (page: number): PageInfo => PAGE_MAP[page - 1] ?? P(page, '—', [], 0, false);

export const conceptsOnPage = (page: number): Concept[] =>
  pageInfo(page).concepts.map(id => CONCEPT_MAP[id]).filter(Boolean);

/** Match selected PDF text to concepts by keyword. */
export function matchConcepts(text: string, page?: number): Concept[] {
  const t = text.toLowerCase();
  const scored = CONCEPTS.map(c => {
    let score = 0;
    for (const kw of c.keywords) if (t.includes(kw)) score += kw.length;
    if (t.includes(c.title.toLowerCase())) score += 20;
    if (page && page >= c.pdfPages[0] && page <= c.pdfPages[1]) score += 4;
    return { c, score };
  }).filter(s => s.score > 3);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.c);
}

export const EXAM_INFO = {
  code: 'MA10211',
  title: 'Probability & Statistics 1A',
  lecturer: 'Matt Roberts, University of Bath (Sept 2024)',
  marks: 60,
  pass: 24,
  when: 'January',
  weight: '40% of MA12002 / MA12005 / MA12012',
  notes: [
    'Section 7 (indicators, Markov/Chebyshev, tail formula, random-walk return) is explicitly NON-EXAMINABLE — the lecturer wrote it after the exam (p93).',
    '"You will not need to do any difficult integrals in the exam… Any non-trivial integrals required will be stated as part of the question." (footnote, p80)',
    'Past papers: Bath Library "Past exam papers" database, code MA10211 (login required).',
  ],
};
