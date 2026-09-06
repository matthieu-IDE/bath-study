import type { CardDef } from './types';
import { CONCEPTS } from './course';
import { ERRORS } from './errors';

/* Flashcard deck: generated from the concept graph + curated extras.
   Formula cards ask front→TeX back; concept cards ask "why"; error cards diagnose. */

const cards: CardDef[] = [];

// ---- formula cards (from every concept formula that has a rederive or is core) ----
for (const c of CONCEPTS) {
  for (const f of c.formulas) {
    cards.push({
      id: `fc-formula-${f.id}`,
      conceptId: c.id,
      kind: 'formula',
      front: `**${f.name}**\n\nWrite down the formula.${f.rederive ? '\n\n*(If you forget it — can you rebuild it?)*' : ''}`,
      back: `$$${f.tex}$$${f.rederive ? `\n\n**Rebuild it:** ${f.rederive}` : ''}${f.note ? `\n\n*${f.note}*` : ''}`,
      pdfPage: f.pdfPage,
      source: f.source,
    });
  }
}

// ---- definition/concept cards ----
const defCards: [string, string, string, number?][] = [
  ['sample-space', 'Define: **sample space** and **event**.', 'The sample space $\\Omega$ is the set of ALL possible outcomes of an experiment (Def 1.1). An event is a subset $E\\subseteq\\Omega$; it *occurs* when the realised outcome $\\omega\\in E$ (Def 1.2).', 7],
  ['set-operations', 'Define **disjoint (mutually exclusive)** events. Give the equivalent subset condition.', '$E\\cap F=\\varnothing$ — they cannot both occur (Def 1.5). Equivalently $E\\subseteq F^c$.', 10],
  ['sigma-algebra', 'State the **three rules** a σ-algebra must satisfy.', '(1) $\\varnothing\\in\\mathcal F$; (2) closed under complements: $E\\in\\mathcal F\\Rightarrow E^c\\in\\mathcal F$; (3) closed under countable unions: $E_1,E_2,\\ldots\\in\\mathcal F\\Rightarrow\\bigcup_i E_i\\in\\mathcal F$ (Def 1.7).', 13],
  ['kolmogorov-axioms', "State **Kolmogorov's axioms** (A1)–(A3).", '(A1) $P(E)\\ge0$; (A2) $P(\\Omega)=1$; (A3) countable additivity: pairwise disjoint $E_i$ give $P(\\bigcup E_i)=\\sum P(E_i)$ (Def 1.8).', 15],
  ['conditional-probability', 'What does **conditioning on F** do to the sample space?', 'F becomes the NEW sample space: outcomes outside F are discarded and all probabilities are renormalised by $P(F)$, so $P(F|F)=1$. $P(\\cdot|F)$ satisfies all three axioms.', 31],
  ['total-probability', 'Define a **partition** of Ω.', 'Events $E_1,\\dots,E_n$: pairwise disjoint ($E_i\\cap E_j=\\varnothing$), non-empty, and covering: $\\bigcup_i E_i=\\Omega$ (Def 3.2). Example: $\\{E, E^c\\}$.', 33],
  ['independence', 'Define **independence** of two events. Why use the product form rather than $P(E|F)=P(E)$?', '$P(E\\cap F)=P(E)P(F)$ (Def 3.3). The product form is symmetric, needs no $P(F)>0$, and generalises to many events.', 35],
  ['random-variable', 'A random variable is neither random nor a variable. What IS it?', 'A function $X:\\Omega\\to S\\subseteq\\mathbb R$ assigning a number to each outcome (Def 4.1). $\\{X=x\\}$ abbreviates $\\{\\omega:X(\\omega)=x\\}$. $S$ is the support.', 41],
  ['pmf', 'Define the **pmf** and state its two defining properties.', '$f_X(x)=P(X=x)$ (Def 4.4). Properties: $f_X(x)\\ge0$ everywhere, and $\\sum_{x\\in S}f_X(x)=1$.', 43],
  ['cdf', 'State the **four properties** of any cdf (Thm 4.1).', '(1) non-decreasing; (2) $\\lim_{x\\to\\infty}F(x)=1$; (3) $\\lim_{x\\to-\\infty}F(x)=0$; (4) right-continuous (non-examinable proof).', 45],
  ['geometric', 'In THIS course, what does Geom(p) count? What is its support?', 'The number of trials **up to and including** the first success. Support $\\{1,2,3,\\dots\\}$ — it starts at 1, not 0 (Def 4.8). The other convention $Y=X-1$ counts failures before success.', 49],
  ['exponential', 'State the **memoryless property** of Exp(λ) in symbols.', '$P(X\\le x+y\\mid X>x)=P(X\\le y)$ (Ex 5.5): given you have waited $x$, the remaining wait is again Exp(λ).', 66],
  ['pdf', 'Why is a density value $f(x)=3$ not a contradiction?', 'A pdf is probability **per unit length**, not a probability. Only AREAS under the pdf are probabilities; tall thin densities (e.g. Exp(10) near 0) are fine as long as total area = 1.', 68],
  ['variance', 'Define **variance** two ways.', '$\\mathrm{Var}(X)=E[(X-E[X])^2]$ (definition) $=E[X^2]-(E[X])^2$ (moment form, Thm 6.6). Standard deviation $=\\sqrt{\\mathrm{Var}(X)}$.', 85],
  ['covariance', 'Interpret the **sign** of Cov(X,Y).', 'Positive: X above its mean when Y is above its mean (move together). Negative: opposite directions. $\\mathrm{Cov}(X,X)=\\mathrm{Var}(X)$; independence $\\Rightarrow$ Cov $=0$ (but NOT conversely).', 88],
  ['lln', 'State the **Weak Law of Large Numbers**.', 'For iid $X_i$ with mean $\\mu$, variance $\\sigma^2$: $\\forall\\varepsilon>0$, $P(|\\bar X_n-\\mu|>\\varepsilon)\\to0$ as $n\\to\\infty$ (Thm 6.11). Engine: $\\mathrm{Var}(\\bar X_n)=\\sigma^2/n\\to0$.', 92],
];
for (const [cid, front, back, page] of defCards) {
  cards.push({ id: `fc-def-${cid}`, conceptId: cid, kind: 'definition', front, back, pdfPage: page, source: 'course' });
}

// ---- concept "why" cards ----
const whyCards: [string, string, string][] = [
  ['inclusion-exclusion', 'Why is $P(A\\cup B)=P(A)+P(B)$ **not always true**?', 'Adding counts the overlap $A\\cap B$ twice. It is only valid for disjoint events. In general subtract the overlap: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$ (Cor 1.5).'],
  ['independence-warnings', 'Disjoint events with positive probability — can they be independent?', 'Never. $P(E\\cap F)=0$ but $P(E)P(F)>0$. Intuition: seeing one tells you the other did NOT happen — maximal information, not none (p36 warning).'],
  ['independence-warnings', 'Three events are pairwise independent. Are they independent?', 'Not necessarily! Example 3.11: heads-on-1st, heads-on-2nd, "both same": every PAIR independent but $P(E\\cap F\\cap G)=\\tfrac14\\ne\\tfrac18$. Mutual independence needs ALL sub-collections (4 equations for 3 events).'],
  ['bayes', 'What is the **prosecutor\'s fallacy**?', 'Confusing $P(\\text{evidence}\\mid\\text{innocent})$ with $P(\\text{innocent}\\mid\\text{evidence})$. Sally Clark: "1 in 73 million" was the former (and wrongly assumed independence); Bayes with sensible priors gives $P(\\text{guilty}\\mid\\text{evidence})<\\tfrac12$ (p40–41).'],
  ['lotus', 'Why is $E[g(X)] \\ne g(E[X])$ in general? Give the canonical example.', 'Averaging then transforming ≠ transforming then averaging (the notes call the wrong version "the law of the incompetent statistician"). $E[X^2]-(E[X])^2=\\mathrm{Var}(X)>0$ for non-constant X.'],
  ['variance-sums', 'Why does Var(X−Y) have a **plus** Var(Y)?', '$\\mathrm{Var}(aX+bY)=a^2\\mathrm{Var}X+b^2\\mathrm{Var}Y+2ab\\mathrm{Cov}$; with $b=-1$, $b^2=+1$. Subtracting an independent noisy thing adds its noise.'],
  ['sampling-table', 'Order matters / order doesn\'t; with / without replacement. Name the four anchor examples.', 'Podium (ordered, w/o) → $\\frac{n!}{(n-r)!}$ · PIN (ordered, with) → $n^r$ · Lotto (unordered, w/o) → $\\binom nr$ · Doughnuts (unordered, with) → $\\binom{n-1+r}{r}$ (p27 table).'],
  ['poisson', 'When does Bin(n,p) ≈ Pois(λ), and with what λ?', 'Large $n$, small $p$: $\\lambda=np$. Typesetter: Bin(1500, 1/500) vs Pois(3) → 0.4230 vs 0.4232 (Ex 4.13).'],
  ['classical-probability', 'Three tosses. Why is Ω′={0,1,2,3} (number of heads) the WRONG sample space for |E|/|Ω|?', 'Its outcomes are not equally likely (1 head is 3× likelier than 0). The classical formula needs the 8 equally likely sequences HHH,…,TTT (Ex 2.2 note).'],
  ['convolution', 'Which distribution do you get from Pois(λ)+Pois(μ) (independent), and what is the intuition?', 'Pois(λ+μ): merging two independent event streams adds their rates (Ex 4.20).'],
];
whyCards.forEach(([cid, front, back], i) => {
  cards.push({ id: `fc-why-${i}`, conceptId: cid, kind: 'concept', front, back, source: 'course' });
});

// ---- error cards (diagnose the mistake) ----
const errPick = ['union-add', 'disjoint-independent', 'perm-comb', 'wrong-sample-space', 'transposed-conditional', 'lotus', 'variance-linear', 'geom-convention', 'pmf-pdf', 'poisson-rate'];
for (const eid of errPick) {
  const e = ERRORS.find(x => x.id === eid)!;
  cards.push({
    id: `fc-err-${eid}`,
    conceptId: eid === 'union-add' ? 'inclusion-exclusion'
      : eid === 'disjoint-independent' ? 'independence-warnings'
      : eid === 'perm-comb' ? 'sampling-table'
      : eid === 'wrong-sample-space' ? 'classical-probability'
      : eid === 'transposed-conditional' ? 'bayes'
      : eid === 'lotus' ? 'lotus'
      : eid === 'variance-linear' ? 'variance'
      : eid === 'geom-convention' ? 'geometric'
      : eid === 'pmf-pdf' ? 'pdf' : 'poisson',
    kind: 'error',
    front: `**Spot the trap:** ${e.description}\n\nWhat is the fix?`,
    back: `**${e.label}**\n\n${e.fix}`,
    pdfPage: e.pdfPage,
    source: 'course',
  });
}

// ---- proof skeleton cards ----
for (const c of CONCEPTS) {
  if (c.proof) {
    const p = c.proof;
    const hidden = p.missingStepIdx ?? Math.floor(p.skeleton.length / 2);
    const shown = p.skeleton.map((s, i) => (i === hidden ? `${i + 1}. **[missing step]**` : `${i + 1}. ${s}`)).join('\n');
    cards.push({
      id: `fc-proof-${p.id}`,
      conceptId: c.id,
      kind: 'proof',
      front: `**Proof skeleton — ${p.name}**\n\nBig idea: *${p.bigIdea}*\n\n${shown}\n\nSupply the missing step.`,
      back: `**Step ${hidden + 1}:** ${p.skeleton[hidden]}`,
      pdfPage: p.pdfPage,
      source: 'course',
    });
  }
}

export const DECK: CardDef[] = cards;
export const DECK_MAP: Record<string, CardDef> = Object.fromEntries(cards.map(c => [c.id, c]));
