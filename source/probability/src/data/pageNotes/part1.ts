import type { PageNote } from './types';

/* Line-by-line decode of pages 7–30 (Chapters 1–2). Every definition, theorem,
   example and remark on each page, explained in plain language. */

export const NOTES1: Record<number, PageNote[]> = {
  7: [
    { ref: 'Example 1.1', what: 'The opening experiment: toss a coin 100 times and count heads. "Experiment" is the technical word for any process whose outcome is unknown in advance — and every probability question starts by listing what could happen.' },
    { ref: 'Definition 1.1', what: 'The **sample space** Ω is the set of ALL possible outcomes. The lower-case ω means one generic outcome, the way x means a generic real number.', tex: '\\Omega = \\{\\text{all possible outcomes}\\}' },
    { ref: 'Example 1.2', what: 'Three sizes of sample space: {0,…,100} heads is *finite*; tosses-until-first-head {1,2,3,…} is *countably infinite* (a list that never ends); waiting time for a sneeze [0,∞) is *uncountable* (a continuum — you cannot list it). The size of Ω decides which tools work later.' },
    { ref: 'Definition 1.2', what: 'An **event** is any collection (subset) of outcomes. The event "occurs" if the actual outcome ω lands inside it. So events are sets — which is why set algebra comes next.' },
    { ref: 'Example 1.3', what: 'Dice warm-up used all course: E₁ = {2,4,6} "even", E₂ = {5,6} "bigger than 4", E₃ = {1}. Rolling a 6 makes E₁ and E₂ occur but not E₃.' },
    { ref: 'Definition 1.3', what: 'E ⊆ F ("E is a subset of F") means: whenever E occurs, F must occur too — every ω in E is also in F. E = F means each contains the other. Note the convention footnote: ⊆ here ALLOWS E = F.' },
  ],
  8: [
    { ref: 'Figure 1', what: 'The first Venn picture: a small circle E inside a bigger F inside the box Ω. Every event is a subset of Ω, so E ⊆ Ω and F ⊆ Ω always.' },
    { ref: 'Empty set', what: 'The symbol ∅ is the event with NO outcomes. Logic quirk worth absorbing: "every point of ∅ is in E" is vacuously true, so ∅ ⊆ E ⊆ Ω holds for every event E.' },
    { ref: 'Definition 1.4', what: 'The four machines for combining events: **union** E∪F = "E or F (or both)", **intersection** E∩F = "both", **difference** E\\F = "E but not F", **complement** Eᶜ = "not E". These are the dictionary between English and set algebra.', tex: 'E\\cup F,\\quad E\\cap F,\\quad E\\setminus F,\\quad E^c' },
    { ref: 'Remarks', what: 'Handy identities the notes list here: Ω∪E = Ω and ∅∪E = E; Ω∩E = E and ∅∩E = ∅; the difference rewrites as E\\F = E∩Fᶜ; and the *splitting identity* E = (E∩F) ∪ (E∩Fᶜ) — "the part of E inside F plus the part outside". That last one grows into the partition rule and the law of total probability.' },
    { ref: 'Complement facts', what: 'Also: (Eᶜ)ᶜ = E, ∅ᶜ = Ω, E∪Eᶜ = Ω (something happens either way) and E∩Eᶜ = ∅ (an event and its opposite cannot co-occur).' },
  ],
  9: [
    { ref: 'Figure 2', what: 'Union E∪F shaded: it occurs whenever AT LEAST ONE of E, F occurs — possibly both. The word "or" in maths is always inclusive.' },
    { ref: 'Figure 3', what: 'Intersection E∩F: only the lens-shaped overlap. It occurs when both events happen simultaneously.' },
    { ref: 'Figure 4', what: 'Difference E\\F: the crescent of E with the overlap removed — E happens but F does not. Note it is NOT symmetric: E\\F ≠ F\\E.' },
  ],
  10: [
    { ref: 'Figure 5', what: 'Complement Eᶜ: everything in Ω outside E. Eᶜ occurs precisely when E does not.' },
    { ref: 'Example 1.4', what: 'The dice events again: E₁∪E₂ = {2,4,5,6}, E₁∩E₂ = {6}, E₁ᶜ = {1,3,5} = "odd". Check for yourself that E₁∪E₁ᶜ = Ω and E₁∩E₁ᶜ = ∅.' },
    { ref: 'Definition 1.5', what: '**Disjoint** (mutually exclusive) events cannot both occur: E∩F = ∅. Figure 6 shows two separated circles. This is THE condition that lets probabilities add later.', tex: 'E\\cap F = \\varnothing' },
  ],
  11: [
    { ref: 'Equivalent form', what: 'Disjointness rephrased: E∩F = ∅ is the same as E ⊆ Fᶜ ("all of E lives outside F"). The proof uses the splitting identity from p8.' },
    { ref: 'Theorem 1.1', what: 'The algebra rules for sets. Commutative: order of ∪/∩ is irrelevant. Associative: brackets are irrelevant when the operation repeats. **Distributive**: (E∩F)∪G = (E∪G)∩(F∪G) and its mirror — like multiplying out brackets. **De Morgan**: complements swap ∪ and ∩.', tex: '(E\\cup F)^c = E^c\\cap F^c,\\qquad (E\\cap F)^c = E^c\\cup F^c' },
    { ref: 'Advice', what: 'The lecturer\'s own tip: do NOT rote-learn these. Say them aloud ("not (E or F)" = "not E and not F") or draw the Venn diagram — the picture IS the proof.' },
    { ref: 'Figure 7', what: 'De Morgan proof, part 1: shade Eᶜ with wavy blue lines and Fᶜ with red stripes. The doubly-shaded region is Eᶜ∩Fᶜ.' },
  ],
  12: [
    { ref: 'Figure 8', what: 'De Morgan proof, part 2: the green-hatched region (E∪F)ᶜ is exactly the doubly-shaded region from Figure 7 — so the two expressions are equal.' },
    { ref: '§1.1.4.1', what: 'Unions and intersections scale up: ⋃ᵢEᵢ = "at least one Eᵢ occurs", ⋂ᵢEᵢ = "ALL of them occur" — defined for finite lists E₁,…,Eₙ and for infinite lists E₁,E₂,…. Associativity is what makes the bracket-free notation legal.', tex: '\\bigcup_{i=1}^{\\infty} E_i,\\qquad \\bigcap_{i=1}^{\\infty} E_i' },
    { ref: 'Equations (1),(2)', what: 'De Morgan for whole collections: the complement of a big union is the intersection of the complements (and vice versa) — for finitely or countably many events. "None occurred" = "each one failed".' },
  ],
  13: [
    { ref: 'Example 1.6', what: 'First-head-on-an-even-toss = {2}∪{4}∪{6}∪… — a countable union. Its complement, by De Morgan, is the countable INTERSECTION of the complements: the first head is not on toss 2, AND not on toss 4, and so on.' },
    { ref: '§1.1.4.3', what: '**Pairwise disjoint**: no two of the events can co-occur — Eᵢ∩Eⱼ = ∅ for every pair i ≠ j. Subtle trap the notes flag: the dice events E₁,E₂,E₃ have empty TRIPLE intersection but are NOT pairwise disjoint (E₁∩E₂ = {6}). Pairwise is the stronger, useful condition.' },
    { ref: 'Definition 1.6', what: "The power set is the set of all subsets. A finite sample space with m outcomes has 2^m events. The head-count model for 100 tosses has 101 outcomes and therefore 2^101 events; the full-sequence model has 2^100 outcomes and 2^(2^100) events. The count printed here is a typo. Every power set is a sigma-algebra. The subtle obstruction on the real line is extending usual uniform/length probabilities to every subset, not the existence of any probability measure on a power set." },
    { ref: 'Definition 1.7', what: 'A **σ-algebra** F is a collection of subsets obeying three closure rules: (1) ∅ ∈ F; (2) E ∈ F ⟹ Eᶜ ∈ F; (3) any countable union of members is a member. Only events inside F get probabilities.', tex: '\\varnothing\\in\\mathcal F;\\quad E\\in\\mathcal F\\Rightarrow E^c\\in\\mathcal F;\\quad \\bigcup_i E_i\\in\\mathcal F' },
  ],
  14: [
    { ref: 'Remark', what: 'Ω is automatically in every σ-algebra: ∅ ∈ F by rule 1, and Ω = ∅ᶜ, so rule 2 forces Ω ∈ F.' },
    { ref: 'Lemma 1.1', what: 'σ-algebras are also closed under countable INTERSECTIONS. Proof is pure De Morgan: complement each Eᵢ (rule 2), union them (rule 3), complement back (rule 2) — and (⋃Eᵢᶜ)ᶜ = ⋂Eᵢ. A two-line exam classic.' },
    { ref: 'Lemma 1.2', what: 'Finite unions/intersections are covered too, by a cheeky trick: pad the finite list with infinitely many ∅\'s (for unions) or Ω\'s (for intersections) to make it countable, then apply rule 3. E∪∅ = E and E∩Ω = E make the padding invisible. This padding trick returns on p15–16.' },
    { ref: 'Example 1.7', what: 'Three σ-algebras to know: the trivial {∅, Ω}; the four-element {∅, E, Eᶜ, Ω} built from one event (check the three rules!); and the full power set P(Ω), always a sigma-algebra, even when Ω is uncountable.' },
  ],
  15: [
    { ref: 'Definition 1.8', what: '**Kolmogorov\'s axioms** (1933): a probability measure P on (Ω, F) satisfies (A1) P(E) ≥ 0, (A2) P(Ω) = 1, and (A3) *countable additivity* — for pairwise disjoint events, the probability of the union is the sum. The triple (Ω, F, P) is a probability space. EVERYTHING else in the course is derived from these three lines.', tex: 'P\\Big(\\bigcup_{i=1}^{\\infty}E_i\\Big)=\\sum_{i=1}^{\\infty}P(E_i)\\ \\ \\text{(pairwise disjoint)}' },
    { ref: 'Lemma 1.3', what: 'P(∅) = 0 is NOT an axiom — it is proved: write Ω = Ω∪∅∪∅∪…, apply (A3), and subtract P(Ω); the leftover sum Σ P(∅) must be 0, and since P(∅) ≥ 0 by (A1), each term is 0.' },
  ],
  16: [
    { ref: 'Theorem 1.2', what: 'Finite additivity: for pairwise disjoint E₁,…,Eₙ, P(⋃Eᵢ) = Σ P(Eᵢ). Proof reuses the ∅-padding trick from Lemma 1.2 to turn the finite union into a countable one, then applies (A3) and P(∅) = 0.', tex: 'P(E\\cup F)=P(E)+P(F)\\quad (E\\cap F=\\varnothing)' },
    { ref: 'Example 1.8', what: 'Sanity-check with one coin toss: Ω = {H,T}, F = its power set. The axioms force P{H}+P{T} = 1, but any split p and 1−p is legal — FAIRNESS (p = ½) is a modelling choice, not a law of probability.' },
    { ref: 'Corollary 1.1', what: 'The complement rule: P(Eᶜ) = 1 − P(E). Proof: E and Eᶜ are disjoint with union Ω, so P(E)+P(Eᶜ) = P(Ω) = 1. You will use this on almost every question.', tex: 'P(E^c)=1-P(E)' },
  ],
  17: [
    { ref: 'Corollary 1.2', what: 'Probabilities live in [0,1]: from P(Eᶜ) = 1−P(E) ≥ 0 you get P(E) ≤ 1. Also "obvious", also a theorem.' },
    { ref: 'Corollary 1.3', what: 'The **partition rule**: P(F) = P(F∩E) + P(F∩Eᶜ) — split F by whether E happens. (Left as a problem-sheet exercise; the idea is the p8 splitting identity + finite additivity.) This is the seed of the law of total probability.', tex: 'P(F)=P(F\\cap E)+P(F\\cap E^c)' },
    { ref: 'Corollary 1.4', what: 'The **containment rule**: if E ⊆ F then P(F) = P(E) + P(F∩Eᶜ) ≥ P(E) — bigger events have bigger probability. Figure 9 shows why: F∩E is just E when E sits inside F.' },
    { ref: 'Warning', what: 'The notes\' explicit warning: union is NOT addition. P(E∪F) = P(E)+P(F) is only guaranteed for DISJOINT events. Otherwise you need…' },
    { ref: 'Corollary 1.5', what: '…**inclusion–exclusion**: P(E∪F) = P(E) + P(F) − P(E∩F). Adding both counts the overlap twice; subtract it once. "Check your intuition with a Venn diagram."', tex: 'P(E\\cup F)=P(E)+P(F)-P(E\\cap F)' },
  ],
  18: [
    { ref: 'Example 1.9 setup', what: 'Cluedo: one murderer (Mustard, Plum, Scarlett) × one weapon (Candlestick, Lead pipe, Rope) — a 9-outcome sample space with UNEQUAL probabilities: Mustard/Plum pairs get 4/27 each, Scarlett pairs 1/27. Real exams love non-uniform tables like this.' },
    { ref: 'Parts 1–2', what: 'P(Mustard) = 4/27+4/27+4/27 = 12/27 — a disjoint union of single outcomes, so plain addition is legal. P(Mustard or Plum) = 12/27+12/27 = 24/27 — legal again because ONE murderer means the events are disjoint.' },
    { ref: 'Parts 3–4', what: 'P(Mustard innocent) = 1 − 12/27 = 15/27 by the complement rule. P(Mustard OR rope): NOT disjoint (Mustard could use the rope!), so inclusion–exclusion: 12/27 + 9/27 − 4/27 = 17/27.' },
  ],
  19: [
    { ref: 'Double-count check', what: 'The page re-derives 17/27 by listing the five disjoint outcomes directly — showing that naive addition would have counted (Mustard, Rope) twice, and that the −P(E∩F) term removes exactly that duplicate. This is inclusion–exclusion made concrete.' },
    { ref: 'Theorem 1.3', what: '**Specifying probabilities**: give each outcome ωᵢ a weight pᵢ ≥ 0 with Σpᵢ = 1, define P(E) = Σ over the ωᵢ inside E — and this always satisfies the axioms (works for countably infinite Ω too). This is the licence to build measures from tables of numbers, and the pmf idea in embryo.', tex: 'P(E)=\\sum_{i:\\,\\omega_i\\in E}p_i' },
  ],
  20: [
    { ref: 'Definition 2.1', what: 'The **classical interpretation**: when all n outcomes are equally likely, P{ωᵢ} = 1/n and P(E) = |E|/|Ω| — favourable over total. Theorem 1.3 confirms this is a genuine measure. The whole of Chapter 2 is machinery for counting |E| and |Ω|.', tex: 'P(E)=\\frac{|E|}{|\\Omega|}' },
    { ref: 'Example 2.2', what: 'Three fair tosses, P(at least two heads): use the 8 equally likely SEQUENCES (HHH…TTT); the favourable ones are {HHH, HHT, HTH, THH}, so 4/8 = 1/2. **The note is the trap**: the summary space {0,1,2,3} heads is NOT equally likely — 1 head arises three ways, 0 heads only one. Choosing the right Ω is the entire skill.' },
  ],
  21: [
    { ref: 'Example 2.3', what: 'Two fair dice, P(total = 6): take ORDERED pairs (red, blue), |Ω| = 36, tabulate totals, count E = {(1,5),(2,4),(3,3),(4,2),(5,1)} → 5/36. Again the warning: totals {2,…,12} are not equally likely — the choice of sample space is crucial.' },
    { ref: 'Example 2.4', what: 'Survey Venn: 400 adults, |S| = 160 swim, |S∪C| = 300, |S∩C| = 120. Rearranged inclusion–exclusion gives P(C) = 3/4 + 3/10 − 2/5 = 13/20, then the complement rule gives P(no cycling) = 7/20. Figure 10 fills all four regions: 40 swim-only, 120 both, 140 cycle-only, 100 neither.' },
  ],
  22: [
    { ref: 'Setup', what: 'Counting pairs: choosing one element from A (n options) and one from B (m options) lays out as an n×m table of pairs — so there are n·m ways. Multiplication is the counting shadow of "and then".' },
  ],
  23: [
    { ref: 'Theorem 2.1', what: 'The **multiplication principle** for k stages: |A₁|·|A₂|⋯|Aₖ| total choices. Proof by induction: choices from i+1 sets = (choices from first i) × |Aᵢ₊₁|. Crucially the stage SIZES must be fixed; the actual options may depend on earlier picks.', tex: '\\#=\\prod_{i=1}^{k}n_i' },
    { ref: 'Example 2.5', what: 'Coin × dice × card: |Ω| = 2·6·52 = 624. Favourable: head (1) × {5,6} (2) × red picture cards (6) = 12. P = 12/624 = 1/52. Multi-stage counting in numerator AND denominator.' },
    { ref: '§2.3 intro', what: 'A **permutation** is an ordered arrangement. Two regimes: sampling WITH replacement (items reusable) vs WITHOUT (each item once). The next page handles both.' },
  ],
  24: [
    { ref: 'Corollary 2.1', what: 'Ordered, WITH replacement: n choices r times = nʳ. Example 2.6: 4-digit PINs = 10⁴ = 10000; PINs using only digits 0–6: 7⁴ = 2401, so P = 0.2401.', tex: 'n^r' },
    { ref: 'Definition 2.2', what: 'Factorials: m! = m·(m−1)⋯2·1, with the convention **0! = 1** (which makes later formulas seamless).' },
    { ref: 'Corollary 2.2', what: 'Ordered, WITHOUT replacement: n·(n−1)⋯(n−r+1) = n!/(n−r)! — the multiplication principle with shrinking stages.', tex: '\\frac{n!}{(n-r)!}' },
  ],
  25: [
    { ref: 'Example 2.7', what: 'Five cards dealt in a row, first three picture cards then two non-pictures: ordered without replacement gives |Ω| = 52·51·50·49·48 and |E| = (12·11·10)·(40·39), so P = 11/1666 ≈ 0.0066. There are 12 picture cards (J,Q,K × 4 suits).' },
    { ref: 'Lemma 2.1', what: 'k distinct objects have exactly k! orderings — Corollary 2.2 with r = n = k.' },
    { ref: 'Corollary 2.3', what: '**Combinations**: unordered, without replacement. Count ordered choices n!/(n−r)!, notice each unordered group was counted r! times (once per internal ordering), divide: C(n,r) = n!/(r!(n−r)!) — read "n choose r".', tex: '\\binom{n}{r}=\\frac{n!}{r!\\,(n-r)!}' },
  ],
  26: [
    { ref: 'Remarks', what: 'Symmetry: C(n,r) = C(n,n−r) — choosing r to take is the same as choosing n−r to leave.' },
    { ref: 'Example 2.8', what: 'UK lottery: 6 balls from 59, order irrelevant → C(59,6) = 45,057,474 tickets; P(jackpot) ≈ 2.2×10⁻⁸, about 1 in 45 million.' },
    { ref: 'Example 2.9', what: 'Full house (three of one rank + pair of another): 13 ways to pick the triple\'s rank × C(4,3) suit-choices × 12 remaining ranks for the pair × C(4,2) suits, over C(52,5). = 6/4165 ≈ 0.0014. Combinations GLUED TOGETHER by the multiplication principle — the standard exam pattern.' },
  ],
  27: [
    { ref: 'Ice-cream machine', what: 'Unordered WITH replacement, via the famous bijection: order r scoops from n flavours by pressing "scoop" r times and "move" n−1 times in some order — e.g. MMSMMSSMMSMMSM. Every choice = one arrangement of the presses = choosing which r of the n−1+r presses are scoops.' },
    { ref: 'Corollary 2.4', what: 'So the count is C(n−1+r, r). Example 2.10: buying 12 doughnuts from 4 kinds = C(15,12) = C(15,3) = 455.', tex: '\\binom{n-1+r}{r}' },
    { ref: 'THE table', what: 'The summary table to memorise via its anchors — ordered/without: podium n!/(n−r)!; ordered/with: PIN nʳ; unordered/without: lotto C(n,r); unordered/with: doughnuts C(n−1+r, r). Two questions (order? replacement?) route every counting problem.' },
  ],
  28: [
    { ref: 'Example 2.11', what: 'METHODS: 7 distinct letters → 7! = 5040 arrangements. ALGEBRA: the two A\'s are identical, so 7! double-counts every word — divide by 2!: 2520. In general divide by k! per group of k identical items.' },
    { ref: 'Example 2.12', what: 'P(five cards dealt are A,2,3,4,5 IN THAT ORDER): |Ω| = 52·51·50·49·48 ordered deals; each of the 5 ranks offers 4 suits, so |E| = 4⁵ = 1024; P ≈ 3×10⁻⁶.' },
    { ref: 'Example 2.13', what: 'Lottery, at least 5 matches: split into "exactly 6" (1 way) and "exactly 5" — choose which of your 6 numbers to NOT match (6 ways) and its replacement among the 53 unused balls: 6·53 = 318 ways. Total 319/45,057,474. Disjoint case-split + counting.' },
  ],
  29: [
    { ref: 'Example 2.14', what: 'Urn with r red, b blue, drawn without replacement: P(first red appears on pick k). Sample space = which positions the blue balls occupy: C(r+b, b). The event forces picks 1..k−1 blue and pick k red, leaving C(r+b−k, r−1) arrangements of the rest. Answer: C(r+b−k, r−1)/C(r+b, b).' },
    { ref: 'Example 2.15 setup', what: 'THE running example: the symmetric **random walk**, ±1 each step with probability ½. Figure 11 shows 43 real steps. Sample space = ordered ±1 sequences: |Ω| = 2ⁿ (ordered, with replacement).' },
  ],
  30: [
    { ref: 'Walk at 0', what: 'To be at 0 after n steps you need exactly n/2 up-steps: impossible if n is odd (parity!), and C(n, n/2) ways if n is even — unordered choice of WHICH steps go up. So P(Sₙ=0) = C(n,n/2)/2ⁿ. Two cells of the sampling table cooperating in one problem.', tex: 'P(S_n=0)=\\binom{n}{n/2}2^{-n}' },
    { ref: 'Stirling (non-exam)', what: 'How big is that? **Stirling\'s formula** n! ≈ nⁿe⁻ⁿ√(2πn) (non-examinable) collapses it to ≈ √(2/(πn)) — decaying slowly, never zero. Teasers the notes leave you with: does the walk hit 0 infinitely often? How long until it does? (Answered on p39 and p97–98.)' },
  ],
};
