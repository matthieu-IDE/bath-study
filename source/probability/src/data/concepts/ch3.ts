import type { Concept } from '../types';

/* Chapter 3 — Conditional probability and independence (file pages 31–41) */

export const CH3: Concept[] = [
  {
    id: 'conditional-probability', title: 'Conditional probability', icon: '', chapter: 3, pdfPages: [31, 32],
    prereqs: ['probability-rules', 'classical-probability'], examinable: true, lab: 'cond',
    whyCare: 'Information changes probability. Conditioning is HOW it changes — shrink the world to what you now know, then renormalise.',
    keywords: ['conditional', 'given', 'p(e|f)', 'shrink', 'renormalise', 'new sample space'],
    levels: {
      eli5: 'We had a big box of possibilities. Someone whispers "the thing that happened is in THIS corner". So we throw away every possibility outside the corner and share the chances out again inside it.',
      human: 'P(E|F) = "probability of E, given that F happened" = P(E∩F)/P(F). Why: F becomes the new sample space; the only part of E that can still happen is E∩F; divide by P(F) so the new world\'s total is 1. Careful: WHAT you condition on matters enormously — P(3 tails | ≥2 tails) = 1/4 but P(3 tails | first two are tails) = 1/2 (Example 3.1).',
      uni: 'Definition 3.1: for $P(F)>0$, $$P(E\\mid F)=\\frac{P(E\\cap F)}{P(F)}.$$ Key facts: $P(\\cdot\\mid F)$ satisfies Kolmogorov\'s axioms (so every rule — complements, inclusion–exclusion — holds conditionally); if $E\\cap F=\\varnothing$ then $P(E\\mid F)=0$; rearranging gives the multiplication rule $P(E\\cap F)=P(F)P(E\\mid F)$ (Eq. 23).',
      deep: 'Conditioning is re-weighting, not time travel: nothing "changes" in the world — YOUR information changed, so your measure updates. Since P(·|F) is itself a probability measure, the entire theory nests inside itself: you can condition, then condition again (that is exactly how the chain rule and the Sally Clark analysis work). The two-tails example shows conditional probability is exquisitely sensitive to the PRECISE information received.',
    },
    formulas: [
      { id: 'f-cond', name: 'Conditional probability', tex: 'P(E\\mid F)=\\frac{P(E\\cap F)}{P(F)}',
        parts: [
          { sym: 'F', meaning: 'the world we now know we are inside', color: 'cond' },
          { sym: 'E\\cap F', meaning: 'the part of that world where E also happens', color: 'good' },
          { sym: 'P(F)', meaning: 'renormaliser: makes the new world total 1', color: 'known' },
        ], source: 'course', pdfPage: 31,
        rederive: 'Shrink Ω to F. Only E∩F survives of E. Rescale by P(F) so probabilities sum to 1 again.' },
      { id: 'f-mult-rule', name: 'Multiplication rule', tex: 'P(E\\cap F)=P(F)\\,P(E\\mid F)', source: 'course', pdfPage: 31,
        rederive: 'Just the definition rearranged — useful when the conditional is the easy thing to know.' },
    ],
    examples: {
      simple: 'Dice landed even. P(it\'s a 6 | even) = (1/6)/(3/6) = 1/3.',
      everyday: 'P(match wins | star striker plays) vs P(match wins) — team sheets are conditioning information.',
      mathematical: 'P(3 tails | at least 2 tails) = (1/8)/(4/8) = 1/4 — NOT 1/2 (Example 3.1).',
      exam: 'Two cards, no replacement: P(both aces) = P(A₁)P(A₂|A₁) = (4/52)(3/51) = 1/221 (Example 3.2).',
    },
    connections: [
      { to: 'total-probability', how: 'Partition rule + multiplication rule = law of total probability.' },
      { to: 'bayes', how: 'Write P(E∩F) both ways round and divide: Bayes falls out in one line.' },
      { to: 'independence', how: 'Independence is exactly "conditioning changes nothing": P(E|F)=P(E).' },
    ],
    errorIds: ['condition-wrong-event', 'transposed-conditional'],
    worked: [
      {
        id: 'w-fuses', title: 'Testing fuses without replacement', fromPdf: 'Example 3.3, p32', pdfPage: 32, source: 'course',
        prompt: 'A toolbox has 5 good and 2 bad fuses. Fuses are tested one by one at random without replacement. (1) P(first two tested are both defective)? (2) P(the second defective is found on the third test)?',
        steps: [
          { ask: 'Name the events and the tool for (1).', answerTex: '$D_i$ = "$i$th fuse defective". $P(D_1\\cap D_2)=P(D_1)P(D_2\\mid D_1)$', explain: 'The multiplication rule — conditionals are easy because we can just count remaining fuses.', markNote: 'M1: multiplication rule stated.' },
          { ask: 'Fill in the numbers.', answerTex: '$\\tfrac27\\times\\tfrac16=\\tfrac1{21}$', explain: '2 bad of 7; then 1 bad of the 6 remaining.', markNote: 'A1.' },
          { ask: 'For (2): which sequences put the second defective exactly at test 3?', answerTex: '$E=(G_1\\cap D_2\\cap D_3)\\cup(D_1\\cap G_2\\cap D_3)$', explain: 'Exactly one of the first two is defective AND the third is defective. The two sequences are disjoint.', markNote: 'M1: decompose into disjoint sequences — the step most students miss.' },
          { ask: 'Chain each sequence and add.', answerTex: '$\\left(\\tfrac57\\cdot\\tfrac26\\cdot\\tfrac15\\right)+\\left(\\tfrac27\\cdot\\tfrac56\\cdot\\tfrac15\\right)=\\tfrac2{21}$', explain: 'Theorem 3.1 chain rule on each branch; add because disjoint.', markNote: 'A1: both branches; A1: total.' },
        ],
      },
    ],
  },
  {
    id: 'chain-rule', title: 'Chain rule for intersections', icon: '', chapter: 3, pdfPages: [32, 32],
    prereqs: ['conditional-probability'], examinable: true, lab: 'chain',
    whyCare: 'Multi-stage experiments (cards, fuses, anything without replacement) factorise into a chain of easy conditionals.',
    keywords: ['chain rule', 'multiplication', 'sequence', 'without replacement', 'intersection of many'],
    levels: {
      eli5: 'Story time: chance the FIRST thing happens, times chance the second happens GIVEN the first did, times the third given the first two… multiply the story together.',
      human: 'P(E₁∩E₂∩⋯∩Eₙ) = P(E₁)·P(E₂|E₁)·P(E₃|E₁∩E₂)⋯P(Eₙ|E₁∩⋯∩Eₙ₋₁). Each factor conditions on everything before it. In draw-without-replacement problems every factor is a simple count of what remains.',
      uni: 'Theorem 3.1: if $P(E_1\\cap\\cdots\\cap E_{n-1})>0$ then $$P\\left(\\bigcap_{i=1}^n E_i\\right)=P(E_1)\\,P(E_2\\mid E_1)\\cdots P(E_n\\mid E_1\\cap\\cdots\\cap E_{n-1}).$$ Proof: write each conditional as a ratio and telescope — everything cancels except the full intersection.',
      deep: 'The proof is a telescoping product: P(E₁)·[P(E₁∩E₂)/P(E₁)]·[P(E₁∩E₂∩E₃)/P(E₁∩E₂)]⋯ — numerators and denominators annihilate pairwise. The containment rule guarantees no division by zero along the way. This "peel one event at a time" pattern is how probabilists tame ANY sequential experiment.',
    },
    formulas: [
      { id: 'f-chain', name: 'Chain rule', tex: 'P(E_1\\cap\\cdots\\cap E_n)=P(E_1)P(E_2\\mid E_1)\\cdots P(E_n\\mid E_1\\cap\\cdots\\cap E_{n-1})', source: 'course', pdfPage: 32,
        rederive: 'Write each factor as a fraction of intersections; the product telescopes.' },
    ],
    examples: {
      simple: 'P(two aces) = (4/52)(3/51).',
      everyday: 'P(win a 3-round cup run) = P(win R1)·P(win R2 | through)·P(win final | in it).',
      mathematical: 'Fuses: P(G₁∩D₂∩D₃) = (5/7)(2/6)(1/5) (Example 3.3).',
      exam: 'Any "drawn one after another without replacement" question: chain rule is the expected method.',
    },
    connections: [
      { to: 'conditional-probability', how: 'n=2 case IS the multiplication rule.' },
      { to: 'independence', how: 'Under independence every conditional collapses to its unconditional value: the chain becomes a plain product.' },
    ],
    errorIds: ['condition-wrong-event', 'arithmetic'],
  },
  {
    id: 'total-probability', title: 'Partitions & the law of total probability', icon: '', chapter: 3, pdfPages: [33, 34],
    prereqs: ['conditional-probability', 'probability-rules'], examinable: true, lab: 'bayes',
    whyCare: 'Compute a hard P(F) by splitting the world into cases. Also: it IS the denominator of Bayes — master it once, use it twice.',
    keywords: ['partition', 'total probability', 'cases', 'weighted average', 'tree diagram'],
    levels: {
      eli5: 'Cut the world into puzzle pieces that don\'t overlap and cover everything. To find the chance of rain, ask each piece "how likely is rain in YOUR piece?" and blend the answers by piece size.',
      human: 'A partition E₁,…,Eₙ: pairwise disjoint, non-empty, union = Ω (e.g. {E, Eᶜ}). Law of total probability: P(F) = Σᵢ P(Eᵢ)P(F|Eᵢ) — a weighted average of the conditional probabilities, weights = how likely each case is. It\'s the maths behind every tree diagram you drew at school.',
      uni: 'Definition 3.2 (partition) + Theorem 3.2: if $\\{E_1,\\dots,E_n\\}$ partitions $\\Omega$ with $P(E_i)>0$, then for any $F$: $$P(F)=\\sum_{i=1}^n P(E_i)\\,P(F\\mid E_i).$$ Proof: $F=F\\cap\\Omega=\\bigcup_i (F\\cap E_i)$ disjointly (distributive law), add, then apply the multiplication rule to each piece. Extends to countable partitions.',
      deep: 'This is "divide and conquer" as a theorem. The proof shows its anatomy: distributive law slices F along the partition; additivity adds the slices; the multiplication rule converts each slice into prior × conditional. When a probability seems to depend on hidden context ("which trader made the deal?"), the law says: enumerate contexts, weight, sum. Choosing the RIGHT partition is the entire skill.',
    },
    formulas: [
      { id: 'f-ltp', name: 'Law of total probability', tex: 'P(F)=\\sum_{i=1}^{n}P(E_i)\\,P(F\\mid E_i)',
        parts: [
          { sym: 'P(E_i)', meaning: 'how big each case is (prior weights)', color: 'known' },
          { sym: 'P(F\\mid E_i)', meaning: 'how likely F is inside each case', color: 'cond' },
        ], source: 'course', pdfPage: 33,
        rederive: 'Slice F by the partition (distributive law), add the disjoint slices, expand each with the multiplication rule.' },
    ],
    examples: {
      simple: 'Two coins: one fair, one double-headed; pick one at random and toss. P(H) = ½·½ + ½·1 = ¾.',
      everyday: 'P(bus late) = P(rain)P(late|rain) + P(dry)P(late|dry).',
      mathematical: 'Traders: P(>£1m) = (3/10)(1/2) + (5/10)(1/3) + (2/10)(1/4) = 11/30 (Example 3.5).',
      exam: 'Almost every Bayes exam question has a part (a): "find P(F)" — that is total probability, and it becomes your Bayes denominator in part (b).',
    },
    connections: [
      { to: 'bayes', how: 'Total probability provides Bayes\' denominator: P(F)=ΣP(Eᵢ)P(F|Eᵢ).' },
      { to: 'probability-rules', how: 'The n=2 case with {E,Eᶜ} is the humble partition rule from Chapter 1.' },
      { to: 'joint-discrete', how: 'Marginal pmfs are total probability: sum the joint over the other variable\'s partition.' },
    ],
    errorIds: ['bayes-denominator', 'sum-to-one'],
  },
  {
    id: 'bayes', title: "Bayes' theorem", icon: '', chapter: 3, pdfPages: [34, 35],
    prereqs: ['total-probability'], examinable: true, lab: 'bayes',
    whyCare: 'Reverses conditionals: from P(symptoms|disease), which medicine knows, to P(disease|symptoms), which you actually want. Misusing it convicts innocent people.',
    keywords: ['bayes', 'posterior', 'prior', 'reverse conditioning', 'inverse probability'],
    levels: {
      eli5: 'A test says "you have the rare dragon-pox!" But dragon-pox is super rare, and the test cries wolf sometimes. Bayes weighs "rare thing, test right" against "common thing, test wrong" — and often the false alarm wins.',
      human: 'Bayes: P(E|F) = P(E)P(F|E)/P(F), where P(F) usually comes from total probability. It converts prior belief P(E) + likelihood P(F|E) into posterior P(E|F). The classic setting: P(disease|positive test) needs the disease\'s base rate, the test\'s sensitivity AND its false-positive rate — intuition ignores the base rate; Bayes doesn\'t.',
      uni: 'Theorem 3.3: for a partition $\\{E_1,\\dots,E_n\\}$, $P(E_i)>0$, $P(F)>0$: $$P(E_j\\mid F)=\\frac{P(E_j)\\,P(F\\mid E_j)}{\\sum_{i=1}^{n}P(E_i)\\,P(F\\mid E_i)}.$$ Derivation (one line): $P(E\\cap F)=P(F)P(E|F)=P(E)P(F|E)$, divide by $P(F)$, expand $P(F)$ by total probability. Two-case form uses the partition $\\{E,E^c\\}$.',
      deep: 'The numerator is one branch of the tree; the denominator is ALL branches leading to the observation F. So Bayes literally answers: "of all the ways F could have happened, what fraction came via E?" The Sally Clark case (p39–41) shows both catastrophic failure modes: assuming independence falsely (squaring 1/8500) and transposing the conditional (P(evidence|innocent) read as P(innocent|evidence)). A correct Bayes analysis flips "1 in 73 million" into "more likely innocent than not".',
    },
    formulas: [
      { id: 'f-bayes', name: "Bayes' theorem", tex: 'P(E\\mid F)=\\frac{P(E)\\,P(F\\mid E)}{P(F)}',
        parts: [
          { sym: 'P(E)', meaning: 'prior: belief before the evidence', color: 'known' },
          { sym: 'P(F\\mid E)', meaning: 'likelihood: how well E explains the evidence', color: 'cond' },
          { sym: 'P(F)', meaning: 'total probability of the evidence, every route counted', color: 'warn' },
        ], source: 'course', pdfPage: 34,
        rederive: 'P(E∩F) two ways: P(F)P(E|F) = P(E)P(F|E). Divide by P(F).' },
      { id: 'f-bayes-2', name: 'Two-case form', tex: 'P(E\\mid F)=\\frac{P(E)P(F\\mid E)}{P(E)P(F\\mid E)+P(E^c)P(F\\mid E^c)}', source: 'course', pdfPage: 34 },
    ],
    examples: {
      simple: 'Bag A (2 red, 0 blue), Bag B (1 red, 1 blue). Pick a bag, draw red. P(bag A | red) = (½·1)/(½·1+½·½) = 2/3.',
      everyday: 'Spam filter: P(spam | contains "FREE") built from P("FREE"|spam), P("FREE"|ham) and the spam base rate.',
      mathematical: 'Traders: P(Buster | loss) = (3/10·1/4)/((3/10·1/4)+(5/10·1/8)+(2/10·1/16)) = 1/2 (Example 3.6).',
      exam: 'Medical-test style: given base rate + sensitivity + false-positive rate, find P(disease|positive). Show the tree, name the theorem, keep fractions.',
    },
    connections: [
      { to: 'total-probability', how: 'The denominator IS the law of total probability.' },
      { to: 'conditional-probability', how: 'Bayes is nothing but the definition of conditioning written both ways round.' },
      { to: 'independence', how: 'If E and F are independent, Bayes returns P(E|F)=P(E) — evidence that changes nothing.' },
    ],
    errorIds: ['transposed-conditional', 'forgot-prior', 'bayes-denominator'],
    worked: [
      {
        id: 'w-traders', title: 'Which trader made the losing deal?', fromPdf: 'Examples 3.5–3.6, p34–35', pdfPage: 34, source: 'course',
        prompt: 'Buster, Rich and Owen made 30%, 50%, 20% of deals. Of their deals, 1/4, 1/8, 1/16 respectively made a loss. A randomly chosen deal made a loss. Find P(it was Buster\'s).',
        steps: [
          { ask: 'Set up: what partitions the sample space, and what is observed?', answerTex: 'Partition $\\{B,R,W\\}$ with $P(B)=\\tfrac3{10},P(R)=\\tfrac5{10},P(W)=\\tfrac2{10}$; observed event $L$ = "deal made a loss".', markNote: 'M1: partition identified.' },
          { ask: 'Which theorem, and what do we need first?', answerTex: 'Bayes. First $P(L)$ by total probability: $P(L)=\\tfrac3{10}\\cdot\\tfrac14+\\tfrac5{10}\\cdot\\tfrac18+\\tfrac2{10}\\cdot\\tfrac1{16}$', explain: 'Every Bayes computation runs total probability in its denominator.', markNote: 'M1: LTP set up with all three branches.' },
          { ask: 'Evaluate P(L).', answerTex: '$P(L)=\\tfrac{3}{40}+\\tfrac{5}{80}+\\tfrac{2}{160}=\\tfrac{12+10+2}{160}=\\tfrac{24}{160}=\\tfrac3{20}$', markNote: 'A1: exact fraction (don\'t decimalise early).' },
          { ask: 'Now apply Bayes for Buster.', answerTex: '$P(B\\mid L)=\\dfrac{P(B)P(L\\mid B)}{P(L)}=\\dfrac{3/40}{3/20}=\\tfrac12$', explain: 'Numerator = Buster\'s branch; denominator = all branches. Half of all losses trace back to Buster.', markNote: 'M1: Bayes; A1: 1/2.' },
        ],
      },
    ],
  },
  {
    id: 'independence', title: 'Independence', icon: '', chapter: 3, pdfPages: [35, 36],
    prereqs: ['conditional-probability'], examinable: true, lab: 'cond',
    whyCare: 'Independence means "knowing one tells you nothing about the other" — and it is what lets probabilities multiply. NOT the same as disjoint!',
    keywords: ['independent', 'independence', 'multiply', 'no information', 'dependent'],
    levels: {
      eli5: 'The coin in my left hand doesn\'t care what the coin in my right hand did. Peeking at one gives zero gossip about the other.',
      human: 'E and F are independent iff P(E∩F) = P(E)P(F). Equivalently (when defined): P(E|F) = P(E) — learning F doesn\'t move the needle. Surprises: physically-related events CAN be independent (ace & hearts share one card yet are independent, Example 3.8). And DISJOINT events with positive probability are NEVER independent — knowing one happened tells you the other certainly didn\'t.',
      uni: 'Definition 3.3: $E\\perp F \\iff P(E\\cap F)=P(E)P(F)$. If $P(E),P(F)>0$ this is equivalent to $P(E|F)=P(E)$ and to $P(F|E)=P(F)$; the product form is preferred as it is symmetric and handles zero-probability events ($P(E)=0\\Rightarrow E$ independent of everything). Theorem 3.4: independence passes to complements: $E\\perp F \\Rightarrow E\\perp F^c,\\ E^c\\perp F,\\ E^c\\perp F^c$.',
      deep: 'Independence is a statement about the MEASURE, not about physical separation — that\'s why the ace/hearts example works: the 52-card deck happens to make the proportions match perfectly (1/52 = 1/13 × 1/4). Deform the deck (remove one card) and independence shatters. The complement theorem\'s proof is a lovely partition-rule computation worth reproducing: P(E∩Fᶜ) = P(E) − P(E∩F) = P(E)(1−P(F)).',
    },
    formulas: [
      { id: 'f-indep', name: 'Independence', tex: 'P(E\\cap F)=P(E)\\,P(F)',
        parts: [
          { sym: 'P(E\\cap F)', meaning: 'both happen', color: 'good' },
          { sym: 'P(E)P(F)', meaning: 'the product — multiplication is the signature of independence', color: 'known' },
        ], source: 'course', pdfPage: 35 },
    ],
    examples: {
      simple: 'Two fair coin tosses: P(H₁∩H₂) = ¼ = ½·½ ✓ independent (Example 3.7).',
      everyday: 'Your bus being late and your friend\'s train in another city being late: (usually) independent. Same storm hitting both: dependent!',
      mathematical: 'Draw one card: "ace" and "hearts" are independent: 1/52 = (1/13)(1/4) (Example 3.8).',
      exam: '"Are E and F independent? Justify." — compute all three of P(E), P(F), P(E∩F) and CHECK the product. Never argue by vibes.',
    },
    connections: [
      { to: 'independence-warnings', how: 'Disjoint ≠ independent, and pairwise ≠ mutual — the two classic traps.' },
      { to: 'independence-rvs', how: 'Random variables inherit the idea: joint pmf/pdf factorises.' },
      { to: 'product-independence', how: 'Independence is why E[XY]=E[X]E[Y] and why variances add.' },
    ],
    errorIds: ['disjoint-independent', 'pairwise-mutual'],
    proof: {
      id: 'p-indep-comp', name: 'Theorem 3.4: independence extends to complements', pdfPage: 36,
      bigIdea: 'Use the partition rule to convert a question about Fᶜ into one about F, then factor.',
      skeleton: [
        'Partition rule: P(E) = P(E∩F) + P(E∩Fᶜ), so P(E∩Fᶜ) = P(E) − P(E∩F).',
        'By independence, P(E∩F) = P(E)P(F).',
        'So P(E∩Fᶜ) = P(E) − P(E)P(F) = P(E)(1−P(F)).',
        'And 1−P(F) = P(Fᶜ), hence P(E∩Fᶜ) = P(E)P(Fᶜ). ∎ (Symmetry gives the other parts.)',
      ],
      missingStepIdx: 2,
    },
  },
  {
    id: 'independence-warnings', title: 'Independence: the two traps', icon: '', chapter: 3, pdfPages: [36, 38],
    prereqs: ['independence'], examinable: true, lab: 'indeptrap',
    whyCare: 'Two mistakes cost more marks than any others in this chapter: "disjoint = independent" and "pairwise = mutual". The notes devote worked counterexamples to each.',
    keywords: ['mutually exclusive', 'disjoint', 'pairwise independent', 'mutual independence', 'counterexample'],
    levels: {
      eli5: 'Trap 1: "they can\'t happen together, so they don\'t affect each other" — backwards! If they can\'t happen together, seeing one SCREAMS the other didn\'t. Trap 2: friends who agree in pairs can still disagree as a trio.',
      human: 'Trap 1: disjoint events with positive probability are always DEPENDENT: P(E∩F)=0 ≠ P(E)P(F)>0. Trap 2: for many events, independence requires the product rule for EVERY sub-collection. Three events need 4 equations (3 pairs + triple). Pairwise can hold while the triple fails (Example 3.11: two coins + "same side"); the triple can hold while pairs fail (Example 3.10: rigged card events).',
      uni: 'Definition 3.4: $E_1,\\dots,E_n$ independent iff for every $k\\ge2$ and every $i_1<\\cdots<i_k$: $P(E_{i_1}\\cap\\cdots\\cap E_{i_k})=\\prod_j P(E_{i_j})$. Example 3.11: $E,F$ = heads on toss 1, 2; $G$ = same side. Pairwise: each pair independent. But $P(E\\cap F\\cap G)=\\tfrac14\\ne\\tfrac18=P(E)P(F)P(G)$. Theorem 3.5: independent families stay independent when members are replaced by complements, intersections, or unions of disjoint groups.',
      deep: 'Why 4 equations for 3 events? Because independence is a claim about ALL possible information flows: no sub-collection may inform the rest. G = "same side" is a parity bit — determined by E and F jointly but by neither alone. Parity is precisely how pairwise independence coexists with total triple-wise dependence, and it\'s the standard counterexample generator in probability.',
    },
    formulas: [
      { id: 'f-mutual', name: 'Mutual independence (3 events = 4 checks)', tex: '\\begin{aligned}&P(E_1\\cap E_2)=P(E_1)P(E_2),\\quad P(E_1\\cap E_3)=P(E_1)P(E_3),\\\\&P(E_2\\cap E_3)=P(E_2)P(E_3),\\quad P(E_1\\cap E_2\\cap E_3)=P(E_1)P(E_2)P(E_3)\\end{aligned}', source: 'course', pdfPage: 37 },
    ],
    examples: {
      simple: 'Dice: E={1,2}, F={5,6} disjoint. Knowing E happened ⟹ F didn\'t. Dependent!',
      everyday: '"I\'m either at the gym or at the library" — the two are mutually exclusive, so spotting me at the gym fully determines the library question.',
      mathematical: 'Two tosses + G="same side": pairwise independent, not mutually independent (Example 3.11).',
      exam: '"E and F are disjoint with P(E),P(F)>0. Can they be independent?" — No: P(E∩F)=0<P(E)P(F). State it in one line for the marks.',
    },
    connections: [
      { to: 'independence', how: 'These traps are why the formal definition quantifies over ALL sub-collections.' },
      { to: 'bayes', how: 'Sally Clark: falsely assuming independence of two SIDS deaths squared a probability that should not be squared.' },
    ],
    errorIds: ['disjoint-independent', 'pairwise-mutual'],
  },
];
