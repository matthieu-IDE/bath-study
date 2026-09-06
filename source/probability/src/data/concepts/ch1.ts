import type { Concept } from '../types';

/* Chapter 1 — Foundations of Probability (file pages 7–19) */

export const CH1: Concept[] = [
  {
    id: 'sample-space', title: 'Sample spaces & events', icon: '', chapter: 1, pdfPages: [7, 8],
    prereqs: [], examinable: true, lab: 'dice',
    whyCare: 'Every probability question starts here: list what CAN happen before asking how LIKELY it is. Choosing the wrong Ω is the #1 source of wrong answers.',
    keywords: ['sample space', 'omega', 'event', 'outcome', 'experiment', 'subset'],
    levels: {
      eli5: 'Before a game, write down every way it could end — that pile of possibilities is the sample space Ω. An "event" is just a handful of those possibilities you care about, like "I roll something even".',
      human: 'The sample space Ω is the set of ALL possible outcomes of an experiment. An event E is any collection (subset) of those outcomes. E "occurs" when the actual outcome lands inside E. Sample spaces can be finite ({0,…,100} heads), countably infinite ({1,2,3,…} tosses until a head), or uncountable ([0,∞) waiting time).',
      uni: 'Definition 1.1: the set $\\Omega$ of all possible outcomes of an experiment is the **sample space**; $\\omega$ denotes a generic outcome. Definition 1.2: an **event** is a subset $E \\subseteq \\Omega$; $E$ occurs iff the realised $\\omega \\in E$. $E\\subseteq F$ means whenever $E$ occurs, $F$ occurs. $\\varnothing \\subseteq E \\subseteq \\Omega$ for every event $E$.',
      deep: 'Probability is measure theory in disguise: we never assign probability to a single "story", we assign it to SETS of outcomes. That is why set language (⊆, ∪, ∩) comes before any probability — the entire machinery (axioms, conditional probability, random variables) is built on functions whose inputs are subsets of Ω. Get fluent in the set layer and everything above it becomes translation.',
    },
    formulas: [
      { id: 'f-ss-dice', name: 'Dice events (Example 1.3)', tex: '\\Omega=\\{1,2,3,4,5,6\\},\\quad E_1=\\{2,4,6\\},\\ E_2=\\{5,6\\},\\ E_3=\\{1\\}', source: 'course', pdfPage: 7 },
    ],
    examples: {
      simple: 'Roll one dice: Ω = {1,2,3,4,5,6}. Event "even score" = {2,4,6}.',
      everyday: 'Tomorrow\'s weather for your walk to campus: Ω = {dry, drizzle, proper rain}. Event "need a coat" = {drizzle, proper rain}.',
      mathematical: 'Toss a coin until the first head: Ω = {1,2,3,…} — countably infinite (Example 1.2).',
      exam: 'Two fair dice are rolled. Write down a suitable sample space and the event "total is 6" — the exam wants Ω = ordered pairs (r,b), NOT the totals {2,…,12}, because pairs are equally likely.',
    },
    connections: [
      { to: 'classical-probability', how: 'Classical probability |E|/|Ω| only works when Ω is chosen so all outcomes are equally likely.' },
      { to: 'random-variable', how: 'A random variable is a function FROM the sample space to numbers — Ω never goes away, it just hides.' },
    ],
    errorIds: ['wrong-sample-space'],
  },
  {
    id: 'set-operations', title: 'Set operations: ∪ ∩ \\ ᶜ', icon: '', chapter: 1, pdfPages: [8, 10],
    prereqs: ['sample-space'], examinable: true, lab: 'venn',
    whyCare: 'Word problems arrive in English ("or", "and", "not", "but not"). Set operations are the dictionary that turns English into maths you can compute with.',
    keywords: ['union', 'intersection', 'complement', 'difference', 'venn', 'cup', 'cap'],
    levels: {
      eli5: 'Imagine two hula hoops on the floor with toys inside. Union ∪ = everything in EITHER hoop. Intersection ∩ = only toys in BOTH hoops (the overlap). Complement ᶜ = every toy OUTSIDE the hoop.',
      human: 'Four machines for combining events: E∪F ("at least one occurs"), E∩F ("both occur"), E\\F ("E but not F"), Eᶜ ("E does not occur"). Handy identities: E\\F = E∩Fᶜ, and any E splits as E = (E∩F) ∪ (E∩Fᶜ) — "the part of E inside F plus the part outside F".',
      uni: 'Definition 1.4: $E\\cup F=\\{\\omega: \\omega\\in E \\text{ or } \\omega\\in F\\}$, $E\\cap F=\\{\\omega:\\omega\\in E\\text{ and }\\omega\\in F\\}$, $E\\setminus F = E\\cap F^c$, $E^c=\\{\\omega:\\omega\\notin E\\}$. Useful facts: $\\Omega\\cup E=\\Omega$, $\\varnothing\\cup E=E$, $\\Omega\\cap E=E$, $\\varnothing\\cap E=\\varnothing$, $(E^c)^c=E$, $E\\cup E^c=\\Omega$, $E\\cap E^c=\\varnothing$. Disjoint (Definition 1.5): $E\\cap F=\\varnothing$, equivalently $E\\subseteq F^c$.',
      deep: 'Union behaves a bit like addition and intersection like multiplication (the distributive law even looks the same) — but only a bit: E∪E=E, not "2E". The lecturer\'s advice is gold: don\'t memorise identities, SAY them aloud or draw the Venn diagram. Every identity in Theorem 1.1 is a picture.',
    },
    formulas: [
      { id: 'f-ops', name: 'The four operations', tex: 'E\\cup F,\\quad E\\cap F,\\quad E\\setminus F=E\\cap F^c,\\quad E^c', source: 'course', pdfPage: 8 },
      { id: 'f-split', name: 'Splitting an event (used everywhere later)', tex: 'E=(E\\cap F)\\cup(E\\cap F^c)', note: 'The seed of the partition rule and the law of total probability.', source: 'course', pdfPage: 8 },
    ],
    examples: {
      simple: 'Dice: E₁={2,4,6}, E₂={5,6}. E₁∪E₂={2,4,5,6}, E₁∩E₂={6}, E₁ᶜ={1,3,5} (Example 1.4).',
      everyday: 'Spotify: E = "song is in your Liked", F = "song is by your favourite artist". E∩Fᶜ = liked songs by everyone else.',
      mathematical: 'First head on an even toss: E = {2}∪{4}∪{6}∪… — a countable union (Example 1.6).',
      exam: 'Express "exactly one of E, F occurs" in set notation: (E∩Fᶜ)∪(Eᶜ∩F). Classic 2-marker.',
    },
    connections: [
      { to: 'set-laws', how: 'De Morgan and the distributive laws are the algebra rules for these operations.' },
      { to: 'probability-rules', how: 'Each set identity becomes a probability identity: complement rule, partition rule, inclusion–exclusion.' },
    ],
    errorIds: ['union-intersection', 'demorgan'],
  },
  {
    id: 'set-laws', title: 'Laws of set theory & De Morgan', icon: '', chapter: 1, pdfPages: [11, 13],
    prereqs: ['set-operations'], examinable: true, lab: 'venn',
    whyCare: 'De Morgan converts "none happen" into "each fails" — the engine behind every "at least one" complement trick you will use all course.',
    keywords: ['de morgan', 'distributive', 'associative', 'commutative', 'laws'],
    levels: {
      eli5: 'If it\'s NOT true that (you had cake OR ice cream), then you had no cake AND no ice cream. Flipping a "not" over an "or" turns it into "and" — that\'s De Morgan\'s whole trick.',
      human: 'Theorem 1.1: ∪ and ∩ are commutative and associative; they distribute over each other; and De Morgan: (E∪F)ᶜ = Eᶜ∩Fᶜ, (E∩F)ᶜ = Eᶜ∪Fᶜ. All extend to finitely or countably many events. Don\'t rote-learn: say them aloud or draw Venn diagrams — that IS the proof technique the notes use.',
      uni: 'For any events $E,F,G$: distributive laws $(E\\cap F)\\cup G=(E\\cup G)\\cap(F\\cup G)$ and $(E\\cup F)\\cap G=(E\\cap G)\\cup(F\\cap G)$; De Morgan $(E\\cup F)^c=E^c\\cap F^c$, $(E\\cap F)^c=E^c\\cup F^c$. For collections: $\\left(\\bigcup_i E_i\\right)^c=\\bigcap_i E_i^c$ and $\\left(\\bigcap_i E_i\\right)^c=\\bigcup_i E_i^c$ (Equations (1),(2)).',
      deep: 'De Morgan is a duality: complementation swaps the roles of ∪ and ∩. This is why "at least one missile hits" is computed via "ALL miss" (Example 3.12), and why σ-algebras closed under unions are automatically closed under intersections (Lemma 1.1). One law, used on every problem sheet.',
    },
    formulas: [
      { id: 'f-demorgan', name: "De Morgan's Laws", tex: '(E\\cup F)^c=E^c\\cap F^c\\qquad (E\\cap F)^c=E^c\\cup F^c',
        parts: [
          { sym: '(E\\cup F)^c', meaning: '"neither E nor F happens"', color: 'bad' },
          { sym: 'E^c\\cap F^c', meaning: '"E fails AND F fails" — same thing!', color: 'known' },
        ], source: 'course', pdfPage: 11,
        rederive: 'Say it in English: "not (E or F)" means "not E and not F". The symbols follow.' },
    ],
    examples: {
      simple: 'Dice: (even ∪ big)ᶜ = odd ∩ small = {1,3}.',
      everyday: '"I didn\'t reply to either message" = "I didn\'t reply to the first AND didn\'t reply to the second".',
      mathematical: 'Eodd = (⋃ᵢ{2i})ᶜ = ⋂ᵢ{2i}ᶜ — the first head is not on toss 2, and not on toss 4, … (Example 1.6).',
      exam: 'P(at least one of three missiles hits) = 1 − P(all miss) — De Morgan + complement, worth easy marks (Example 3.12 pattern).',
    },
    connections: [
      { to: 'complement-trick', how: '"At least one" problems are De Morgan + the complement rule in disguise.' },
      { to: 'sigma-algebra', how: 'Lemma 1.1 uses De Morgan to show σ-algebras are closed under intersections too.' },
    ],
    errorIds: ['demorgan', 'union-intersection'],
    proof: {
      id: 'p-demorgan', name: 'De Morgan via Venn diagrams', pdfPage: 11,
      bigIdea: 'Shade Eᶜ one way and Fᶜ another; the doubly-shaded region is exactly the region outside E∪F.',
      visual: 'Figure 7 shades Eᶜ in wavy blue and Fᶜ in red stripes; Figure 8 shades (E∪F)ᶜ in green — they match.',
      skeleton: [
        'Draw Ω with overlapping E and F.',
        'Shade everything outside E (that is Eᶜ), then everything outside F (that is Fᶜ).',
        'The region shaded BOTH times is Eᶜ∩Fᶜ.',
        'Observe it is exactly the region outside E∪F, i.e. (E∪F)ᶜ. Hence equal.',
      ],
      missingStepIdx: 3,
    },
  },
  {
    id: 'sigma-algebra', title: 'σ-algebras', icon: '', chapter: 1, pdfPages: [13, 14],
    prereqs: ['set-operations'], examinable: true, lab: 'closure',
    whyCare: 'The rulebook for WHICH collections of events may receive probabilities. Three simple closure rules — and a favourite source of short exam proof questions.',
    keywords: ['sigma algebra', 'sigma-algebra', 'sigma field', 'closed under', 'power set', 'measurable'],
    levels: {
      eli5: 'A σ-algebra is a club for events with three rules: the empty event is a member; if an event is in the club, its opposite is too; and if you glue together a list of members, the glued thing is a member. No event gets a probability unless it joins the club.',
      human: 'A collection F of subsets of Ω is a σ-algebra if: (1) ∅∈F, (2) E∈F ⟹ Eᶜ∈F (closed under complements), (3) any countable union of members is a member. Consequences: Ω∈F always, and F is also closed under countable AND finite intersections and finite unions (Lemmas 1.1, 1.2). Examples: {∅,Ω} (trivial), {∅,E,Eᶜ,Ω}, and the power set P(Ω).',
      uni: 'Definition 1.7: $\\mathcal F\\subseteq \\mathcal P(\\Omega)$ is a σ-algebra if (1) $\\varnothing\\in\\mathcal F$; (2) $E\\in\\mathcal F\\Rightarrow E^c\\in\\mathcal F$; (3) $E_1,E_2,\\dots\\in\\mathcal F\\Rightarrow\\bigcup_{i=1}^{\\infty}E_i\\in\\mathcal F$. Lemma 1.1: closure under countable intersections (proof: De Morgan). Lemma 1.2: closure under finite unions/intersections (proof: pad the list with $\\varnothing$s, resp. $\\Omega$s).',
      deep: "For uncountable sample spaces such as [0,1], the power set is still a sigma-algebra. The obstruction is extending the usual uniform length measure to every subset while retaining countable additivity and translation invariance. A sigma-algebra restricts measurable events so the intended measure remains consistent. Arbitrary probability measures, such as a point mass, can exist on the full power set. The proof techniques in this course are De Morgan conversion and padding with empty or whole sets.",
    },
    formulas: [
      { id: 'f-sig', name: 'The three rules', tex: '(1)\\ \\varnothing\\in\\mathcal F\\quad (2)\\ E\\in\\mathcal F\\Rightarrow E^c\\in\\mathcal F\\quad (3)\\ E_1,E_2,\\ldots\\in\\mathcal F\\Rightarrow \\bigcup_{i=1}^{\\infty}E_i\\in\\mathcal F', source: 'course', pdfPage: 13 },
    ],
    examples: {
      simple: '{∅, Ω} is always a σ-algebra — the smallest possible one.',
      everyday: 'A yes/no question you can ask about the world ("did it rain?") drags in its negation and any combination of askable questions — askable questions form a σ-algebra.',
      mathematical: 'For any E⊆Ω, {∅, E, Eᶜ, Ω} is a σ-algebra (Example 1.7 — check the three rules!).',
      exam: '"Show that any σ-algebra is closed under countable intersections." — Lemma 1.1, a bookwork proof worth learning line by line.',
    },
    connections: [
      { to: 'kolmogorov-axioms', how: 'A probability measure is defined ON a σ-algebra — the axioms need rule (3) to even make sense.' },
      { to: 'set-laws', how: 'The closure proofs are pure De Morgan.' },
    ],
    errorIds: ['demorgan'],
    proof: {
      id: 'p-sigma-int', name: 'Lemma 1.1: closed under countable intersections', pdfPage: 14,
      bigIdea: 'Use De Morgan to turn the intersection into a union, then use the closure rules.',
      skeleton: [
        'Take E₁,E₂,… ∈ F. By rule (2), each Eᵢᶜ ∈ F.',
        'By rule (3), ⋃ᵢ Eᵢᶜ ∈ F.',
        'By rule (2) again, (⋃ᵢ Eᵢᶜ)ᶜ ∈ F.',
        'By De Morgan, (⋃ᵢ Eᵢᶜ)ᶜ = ⋂ᵢ Eᵢ. So ⋂ᵢ Eᵢ ∈ F. ∎',
      ],
      missingStepIdx: 2,
    },
  },
  {
    id: 'kolmogorov-axioms', title: "Kolmogorov's axioms", icon: '', chapter: 1, pdfPages: [15, 16],
    prereqs: ['sigma-algebra'], examinable: true, lab: 'axioms',
    whyCare: 'Three axioms generate EVERY probability fact you will ever use. Exam proofs are quotable chains of (A1)(A2)(A3) — know them by name and number.',
    keywords: ['axiom', 'kolmogorov', 'probability measure', 'probability space', 'countable additivity'],
    levels: {
      eli5: 'Probability is a way of sharing out 1 whole cake of belief. Rule 1: nobody gets negative cake. Rule 2: the whole world gets exactly the whole cake. Rule 3: if pieces don\'t overlap, the cake on their pile is just the pieces added up.',
      human: 'A probability measure P on (Ω, F) satisfies: (A1) P(E) ≥ 0; (A2) P(Ω) = 1; (A3) for pairwise disjoint E₁,E₂,…: P(⋃ᵢEᵢ) = ΣᵢP(Eᵢ) — "countable additivity". The triple (Ω, F, P) is a probability space. Everything else — P(∅)=0, complements, inclusion–exclusion — is a THEOREM derived from these three.',
      uni: 'Definition 1.8: $P:\\mathcal F\\to\\mathbb R$ with (A1) $P(E)\\ge 0\\ \\forall E\\in\\mathcal F$; (A2) $P(\\Omega)=1$; (A3) $E_1,E_2,\\ldots$ pairwise disjoint $\\Rightarrow P\\left(\\bigcup_{i=1}^\\infty E_i\\right)=\\sum_{i=1}^\\infty P(E_i)$. Lemma 1.3: $P(\\varnothing)=0$ (write $\\Omega=\\Omega\\cup\\varnothing\\cup\\varnothing\\cup\\cdots$ and subtract). Theorem 1.2: finite additivity follows by padding with $\\varnothing$s.',
      deep: 'Notice what is NOT an axiom: P(∅)=0, P(E)≤1, the complement rule — all consequences. The deep choice Kolmogorov made was COUNTABLE additivity (not just finite): that is exactly what lets probability interact with limits and infinite experiments ("toss until a head"). The pad-with-∅ trick that converts finite ↔ countable is a standard exam proof move.',
    },
    formulas: [
      { id: 'f-axioms', name: 'The axioms', tex: '\\text{(A1) } P(E)\\ge 0 \\qquad \\text{(A2) } P(\\Omega)=1 \\qquad \\text{(A3) } P\\Big(\\bigcup_{i=1}^{\\infty}E_i\\Big)=\\sum_{i=1}^{\\infty}P(E_i)',
        parts: [
          { sym: '\\text{(A1)}', meaning: 'no negative probabilities', color: 'known' },
          { sym: '\\text{(A2)}', meaning: 'something must happen: total belief = 1', color: 'good' },
          { sym: '\\text{(A3)}', meaning: 'ONLY for pairwise disjoint events — this is where people slip', color: 'warn' },
        ], source: 'course', pdfPage: 15 },
    ],
    examples: {
      simple: 'One coin: P{H}=p, P{T}=1−p works for any p∈[0,1]; fairness (p=½) is an extra assumption, not an axiom (Example 1.8).',
      everyday: 'A weather app must not say 60% rain + 55% dry: beliefs about disjoint options have to add to 1.',
      mathematical: 'Theorem 1.3: any non-negative p₁,…,pₙ summing to 1 defines a valid measure via P(E)=Σ_{ωᵢ∈E} pᵢ.',
      exam: '"Using the axioms, prove P(∅)=0" or "prove P(Eᶜ)=1−P(E)" — bookwork chains citing (A2), (A3).',
    },
    connections: [
      { to: 'probability-rules', how: 'Complement, containment, partition rules: each is a corollary of the axioms.' },
      { to: 'conditional-probability', how: 'P(·|F) satisfies the same three axioms — conditional probability IS a probability measure.' },
    ],
    errorIds: ['union-add', 'sum-to-one'],
    proof: {
      id: 'p-empty', name: 'Lemma 1.3: P(∅)=0', pdfPage: 15,
      bigIdea: 'Write Ω as Ω ∪ ∅ ∪ ∅ ∪ …, apply countable additivity, and see the extra P(∅)s must vanish.',
      skeleton: [
        'Let E₁=Ω and E₂=E₃=⋯=∅. These are pairwise disjoint and ⋃ᵢEᵢ=Ω.',
        'By (A3): P(Ω) = P(Ω) + Σᵢ₌₂ P(∅).',
        'Subtract P(Ω): Σᵢ₌₂^∞ P(∅) = 0.',
        'By (A1) P(∅)≥0; if P(∅)>0 the sum would be ∞. Hence P(∅)=0. ∎',
      ],
      missingStepIdx: 1,
    },
  },
  {
    id: 'probability-rules', title: 'Complement, containment & partition rules', icon: '', chapter: 1, pdfPages: [16, 17],
    prereqs: ['kolmogorov-axioms'], examinable: true, lab: 'venn',
    whyCare: 'The everyday toolkit: 1−P, monotonicity, and splitting events through a partition. Nearly every question uses at least one of these silently.',
    keywords: ['complement', 'containment', 'partition rule', 'monotone', 'corollary'],
    levels: {
      eli5: 'If there\'s a 30% chance of rain, there\'s a 70% chance of no rain — the two must share the whole cake. And a small piece of cake can never be bigger than the plate it sits on.',
      human: 'Corollary 1.1: P(Eᶜ)=1−P(E). Corollary 1.2: 0≤P(E)≤1. Corollary 1.3 (partition rule): P(F)=P(F∩E)+P(F∩Eᶜ) — split F by whether E happens. Corollary 1.4 (containment): if E⊆F then P(F)=P(E)+P(F∩Eᶜ)≥P(E) — bigger events have bigger probability.',
      uni: 'For any probability space $(\\Omega,\\mathcal F,P)$: $P(E^c)=1-P(E)$; $0\\le P(E)\\le 1$; $P(F)=P(F\\cap E)+P(F\\cap E^c)$; if $E\\subseteq F$ then $P(F)=P(E)+P(F\\cap E^c)\\ge P(E)$. Proofs: split into disjoint pieces, then finite additivity (Theorem 1.2).',
      deep: 'One idea powers all four: chop an event into DISJOINT pieces and add. The partition rule P(F)=P(F∩E)+P(F∩Eᶜ) looks humble here but it grows into the Law of Total Probability (Theorem 3.2), and with division by P(E) it becomes conditional probability. Learn to SEE the split E = (E∩F)∪(E∩Fᶜ) on a Venn diagram.',
    },
    formulas: [
      { id: 'f-comp', name: 'Complement rule', tex: 'P(E^c)=1-P(E)', source: 'course', pdfPage: 16,
        rederive: 'E and Eᶜ are disjoint with union Ω, so P(E)+P(Eᶜ)=P(Ω)=1.' },
      { id: 'f-part', name: 'Partition rule', tex: 'P(F)=P(F\\cap E)+P(F\\cap E^c)',
        parts: [
          { sym: 'P(F\\cap E)', meaning: 'the part of F where E also happens', color: 'known' },
          { sym: 'P(F\\cap E^c)', meaning: 'the part of F where E fails', color: 'cond' },
        ], source: 'course', pdfPage: 17, rederive: 'F = (F∩E) ∪ (F∩Eᶜ), disjoint. Add.' },
    ],
    examples: {
      simple: 'P(dice score ≠ 6) = 1 − 1/6 = 5/6.',
      everyday: 'P(bus late) = P(late ∩ raining) + P(late ∩ not raining) — split by the weather.',
      mathematical: 'E⊆F ⟹ P(F)≥P(E): "at least two heads" ⊆ "at least one head", so its probability is no bigger.',
      exam: 'Cluedo (Example 1.9): P(Mustard innocent) = 1 − 12/27 = 15/27 — complement rule on a non-uniform space.',
    },
    connections: [
      { to: 'total-probability', how: 'The partition rule with n pieces + conditional probability = Law of Total Probability.' },
      { to: 'complement-trick', how: '"At least one" questions: complement rule is the shortcut.' },
    ],
    errorIds: ['complement-forgot', 'union-add'],
  },
  {
    id: 'inclusion-exclusion', title: 'Inclusion–exclusion', icon: '', chapter: 1, pdfPages: [17, 19],
    prereqs: ['probability-rules'], examinable: true, lab: 'venn',
    whyCare: 'The correct way to add probabilities of overlapping events — subtract the overlap you double-counted. Union is NOT addition.',
    keywords: ['inclusion', 'exclusion', 'inclusion-exclusion', 'overlap', 'double count', 'union formula'],
    levels: {
      eli5: 'Count kids who like pizza, count kids who like ice cream, add them — oops, kids who like BOTH got counted twice. Take them away once and the count is right.',
      human: 'P(E∪F) = P(E) + P(F) − P(E∩F). The subtraction removes the double-counted overlap. Only when E and F are disjoint (overlap ∅) does it collapse to plain addition — that is Theorem 1.2, a special case.',
      uni: 'Corollary 1.5: for any events $E,F$: $P(E\\cup F)=P(E)+P(F)-P(E\\cap F)$. Rearranged, it computes any one of the four quantities from the other three — exam questions exploit every direction (Example 2.4: given $P(S), P(S\\cup C), P(S\\cap C)$, find $P(C)$).',
      deep: 'Proof idea: write E∪F as three DISJOINT slices: E\\F, E∩F, F\\E; adding P(E)+P(F) counts the middle slice twice (Example 1.9 shows this concretely with Cluedo cells). The pattern generalises to 3+ events with alternating signs — beyond this course, but the "correct the double count" instinct is what matters.',
    },
    formulas: [
      { id: 'f-ie', name: 'Inclusion–exclusion', tex: 'P(E\\cup F)=P(E)+P(F)-P(E\\cap F)',
        parts: [
          { sym: 'P(E)+P(F)', meaning: 'add both events…', color: 'known' },
          { sym: '-P(E\\cap F)', meaning: '…then remove the overlap counted twice', color: 'bad' },
        ], source: 'course', pdfPage: 17,
        rederive: 'Draw the Venn diagram: E∪F = (E\\F) ⊔ (E∩F) ⊔ (F\\E). Adding P(E)+P(F) counts E∩F twice.' },
    ],
    examples: {
      simple: 'Dice: P(even ∪ >4) = 3/6 + 2/6 − 1/6 = 4/6 (the 6 was double-counted).',
      everyday: 'Chance your parcel arrives Monday OR you\'re home Monday — overlapping events, subtract the "both" case.',
      mathematical: '400 adults: P(C) = P(S∪C) + P(S∩C) − P(S) = 3/4 + 3/10 − 2/5 = 13/20 (Example 2.4, rearranged use).',
      exam: 'Cluedo: P(Mustard ∪ Rope) = 12/27 + 9/27 − 4/27 = 17/27 (Example 1.9) — the exam loves non-uniform tables.',
    },
    connections: [
      { to: 'probability-rules', how: 'Disjoint case: overlap = 0 gives plain additivity back.' },
      { to: 'conditional-probability', how: 'Inclusion–exclusion survives conditioning: P(E∪G|F)=P(E|F)+P(G|F)−P(E∩G|F).' },
    ],
    errorIds: ['union-add', 'union-intersection'],
    worked: [
      {
        id: 'w-cluedo', title: 'Cluedo: murderers, weapons and overlaps', fromPdf: 'Example 1.9, p17–19', pdfPage: 17, source: 'course',
        prompt: 'A murder was committed by one of Mustard (M), Plum (P), Scarlett (S) with one of Candlestick (C), Lead pipe (L), Rope (R). Each (murderer, weapon) pair has probability 4/27, except Scarlett\'s pairs which have probability 1/27. Find (a) P(Mustard guilty), (b) P(Mustard or Plum), (c) P(Mustard innocent), (d) P(Mustard guilty or rope used).',
        steps: [
          { ask: 'The event "Mustard did it" is a union of which outcomes?', answerTex: '$M_{\\text{Mustard}}=\\{(M,C)\\}\\cup\\{(M,L)\\}\\cup\\{(M,R)\\}$ — three disjoint outcomes.', explain: 'Single outcomes are always pairwise disjoint, so their probabilities add (Theorem 1.2).', markNote: 'M1: identify the event as a disjoint union.' },
          { ask: 'So P(Mustard) = ?', answerTex: '$\\tfrac{4}{27}+\\tfrac{4}{27}+\\tfrac{4}{27}=\\tfrac{12}{27}$', markNote: 'A1: correct addition.' },
          { ask: 'Mustard and Plum can\'t both be the (single) murderer. What rule applies for (b)?', answerTex: 'Disjoint events: $P(M\\cup P)=\\tfrac{12}{27}+\\tfrac{12}{27}=\\tfrac{24}{27}$', explain: 'One murderer only ⟹ the events are disjoint ⟹ plain addition is legal here.', markNote: 'M1: justify disjointness before adding.' },
          { ask: '(c) Innocent = complement. Compute it.', answerTex: '$P(M^c)=1-\\tfrac{12}{27}=\\tfrac{15}{27}$', markNote: 'A1: complement rule.' },
          { ask: '(d) "Mustard OR rope": are these disjoint? Which formula?', answerTex: 'Not disjoint — Mustard could use rope. $P(M\\cup W_R)=\\tfrac{12}{27}+\\tfrac{9}{27}-\\tfrac{4}{27}=\\tfrac{17}{27}$', explain: 'P(rope)=4/27+4/27+1/27=9/27; the overlap {(M,R)} was counted twice, so subtract it once — inclusion–exclusion.', markNote: 'M1: inclusion–exclusion selected; A1: value.' },
        ],
      },
    ],
  },
  {
    id: 'complement-trick', title: 'The "at least one" complement trick', icon: '', chapter: 1, pdfPages: [16, 38],
    prereqs: ['probability-rules', 'set-laws'], examinable: true, lab: 'atleast',
    whyCare: 'Turns nightmare unions ("at least one of 20 things happens") into one easy product. The single most reused trick in the whole course.',
    keywords: ['at least one', 'complement trick', 'none', 'all miss'],
    levels: {
      eli5: 'Instead of counting all the ways SOMETHING good happens (millions of ways!), count the one sad way NOTHING happens, and take the rest.',
      human: 'P(at least one Eᵢ occurs) = 1 − P(none occur) = 1 − P(E₁ᶜ ∩ E₂ᶜ ∩ …). If the events are independent, the intersection factorises into a product. De Morgan justifies swapping "not(some occur)" for "all fail".',
      uni: 'By De Morgan and the complement rule: $P\\left(\\bigcup_i E_i\\right)=1-P\\left(\\bigcap_i E_i^c\\right)$. With independence (Theorem 3.5 extends independence to complements): $=1-\\prod_i P(E_i^c)=1-\\prod_i(1-P(E_i))$.',
      deep: 'Why does this beat inclusion–exclusion? For n events, inclusion–exclusion has 2ⁿ−1 terms; the complement gives ONE product. The trick works because intersections are "easy" under independence while unions are not. Recognising "at least one / at least once / some" as the trigger phrase is a genuine exam skill.',
    },
    formulas: [
      { id: 'f-atleast', name: '"At least one" for independent events', tex: 'P(\\text{at least one})=1-\\prod_{i=1}^n\\left(1-P(E_i)\\right)', source: 'course', pdfPage: 38,
        rederive: 'Complement of "at least one" is "none". Independence extends to complements, so "none" is a product.' },
    ],
    examples: {
      simple: 'Two coin tosses: P(at least one head) = 1 − P(TT) = 1 − 1/4 = 3/4.',
      everyday: 'P(at least one of your 4 revision alarms wakes you) = 1 − P(all four fail).',
      mathematical: 'Three missiles hitting with 0.7, 0.8, 0.9: P(target hit) = 1 − 0.3·0.2·0.1 = 0.994 (Example 3.12).',
      exam: '"Find the probability at least one of n components fails" — spot it, complement it, product it, 3 marks.',
    },
    connections: [
      { to: 'geometric', how: 'P(Geom > n) = (1−p)ⁿ is the same idea: "no success in n trials".' },
      { to: 'independence', how: 'The factorising step needs independence, extended to complements by Theorem 3.5.' },
    ],
    errorIds: ['complement-forgot', 'union-add'],
  },
];
