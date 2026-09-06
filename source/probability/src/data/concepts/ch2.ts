import type { Concept } from '../types';

/* Chapter 2 — The Classical Interpretation of Probability (file pages 20–30) */

export const CH2: Concept[] = [
  {
    id: 'classical-probability', title: 'Equally likely outcomes', icon: '', chapter: 2, pdfPages: [20, 22],
    prereqs: ['sample-space', 'kolmogorov-axioms'], examinable: true, lab: 'dice',
    whyCare: 'When outcomes are symmetric, probability becomes pure counting: favourable over total. But it ONLY works with the right sample space.',
    keywords: ['classical', 'equally likely', 'favourable outcomes', 'counting probability'],
    levels: {
      eli5: 'If a bag has 10 marbles all the same except colour, the chance of red is just: how many reds, out of 10. Fair share for every marble.',
      human: 'For a finite Ω where every outcome is equally likely: P(E) = |E|/|Ω| — count the outcomes in E, divide by the total. THE trap: your chosen outcomes must actually be equally likely. "Number of heads in 3 tosses" ∈ {0,1,2,3} is NOT equally likely; the 8 sequences HHH…TTT are.',
      uni: 'Definition 2.1: for $\\Omega=\\{\\omega_1,\\dots,\\omega_n\\}$ with equally likely outcomes, $P(\\{\\omega_i\\})=\\frac1{|\\Omega|}$ and for any $E\\subseteq\\Omega$, $P(E)=\\frac{|E|}{|\\Omega|}$. Theorem 1.3 confirms this defines a valid probability measure ($p_i=\\frac1n\\ge0$, sum $=1$).',
      deep: 'Symmetry is doing the real work: the coin/dice/deck has no reason to prefer one outcome, so the ONLY consistent assignment is uniform. Every counting formula in this chapter exists purely to compute |E| and |Ω| when the sets are too big to list. If a question feels hard, ask first: "what exactly are my equally likely outcomes?"',
    },
    formulas: [
      { id: 'f-classical', name: 'Classical probability', tex: 'P(E)=\\frac{|E|}{|\\Omega|}=\\frac{\\#\\text{ ways } E \\text{ can occur}}{\\#\\text{ total outcomes}}',
        parts: [
          { sym: '|E|', meaning: 'favourable outcomes — count them', color: 'good' },
          { sym: '|\\Omega|', meaning: 'ALL equally likely outcomes — the trap lives here', color: 'warn' },
        ], source: 'course', pdfPage: 20 },
    ],
    examples: {
      simple: 'Fair dice: P(even) = |{2,4,6}|/6 = 1/2.',
      everyday: 'Random Spotify shuffle of a 40-song playlist: P(your favourite plays first) = 1/40.',
      mathematical: 'Three tosses, P(≥2 heads) = |{HHH,HHT,HTH,THH}|/8 = 1/2 (Example 2.2).',
      exam: 'Two dice, P(total = 6): use ordered pairs, |Ω|=36, E={(1,5),(2,4),(3,3),(4,2),(5,1)}, so 5/36 (Example 2.3).',
    },
    connections: [
      { to: 'multiplication-principle', how: 'Counting |Ω| for multi-stage experiments needs the multiplication principle.' },
      { to: 'uniform', how: 'Unif(a,b) is the continuous analogue: probability proportional to length instead of count.' },
    ],
    errorIds: ['wrong-sample-space', 'denominator'],
  },
  {
    id: 'multiplication-principle', title: 'Multiplication principle', icon: '', chapter: 2, pdfPages: [22, 23],
    prereqs: ['classical-probability'], examinable: true, lab: 'counting',
    whyCare: 'Choices in stages multiply. This one principle generates every permutation and combination formula in the course.',
    keywords: ['multiplication principle', 'product rule', 'stages', 'choices multiply'],
    levels: {
      eli5: '3 t-shirts and 2 shorts make 3×2 = 6 outfits: for EACH shirt you can pick either short.',
      human: 'Choosing one element from each of k sets with n₁,…,n_k elements can be done n₁×n₂×⋯×n_k ways. Picture an n×m grid of pairs (aᵢ,bⱼ) — the grid has nm cells. Proof is induction on k (Theorem 2.1).',
      uni: 'Theorem 2.1: for sets $A_1,\\dots,A_k$ with $|A_i|=n_i$, the number of ways to choose one element from each is $\\prod_{i=1}^{k}n_i$. Applies whenever an outcome decomposes into independent-CHOICE stages (the sets of options must not depend on earlier choices in SIZE — order of size matters, not content).',
      deep: 'The subtle power: the available options may CHANGE with earlier choices, as long as their COUNT doesn\'t (choosing without replacement: n, then n−1, then n−2 — different sets each time, fixed sizes). That observation is exactly what derives n!/(n−r)! next. Multiplication is the counting shadow of "and": stages joined by "and then" multiply.',
    },
    formulas: [
      { id: 'f-mult', name: 'Multiplication principle', tex: '\\#(\\text{stage}_1\\text{ and }\\cdots\\text{ and stage}_k)=n_1\\times n_2\\times\\cdots\\times n_k', source: 'course', pdfPage: 23 },
    ],
    examples: {
      simple: 'Coin then dice: 2×6 = 12 outcomes.',
      everyday: 'Meal deal: 5 sandwiches × 4 snacks × 6 drinks = 120 lunches.',
      mathematical: 'Coin + dice + card: |Ω| = 2·6·52 = 624; P(H, ≥5, red picture card) = (1·2·6)/624 = 1/52 (Example 2.5).',
      exam: 'Count |E| and |Ω| stage-by-stage, then divide — the standard two-line structure examiners reward.',
    },
    connections: [
      { to: 'permutations', how: 'Permutations = multiplication principle with shrinking (or constant) stage sizes.' },
      { to: 'independence', how: 'Probabilities of independent events multiply — the measure-level echo of counting stages.' },
    ],
    errorIds: ['denominator'],
  },
  {
    id: 'permutations', title: 'Ordered choice: permutations', icon: '', chapter: 2, pdfPages: [23, 25],
    prereqs: ['multiplication-principle'], examinable: true, lab: 'counting',
    whyCare: 'When the ORDER of chosen items matters (podium, PIN, sequence of cards), these two formulas count the arrangements.',
    keywords: ['permutation', 'ordered', 'factorial', 'arrangement', 'npr', 'with replacement', 'without replacement'],
    levels: {
      eli5: 'Lining up teddy bears on a shelf: first spot has lots of choices, next spot one fewer, and so on. Gold-silver-bronze is different from bronze-silver-gold!',
      human: 'Ordered selection of r from n: WITH replacement (same item reusable, like PIN digits) → nʳ. WITHOUT replacement (podium) → n×(n−1)×⋯×(n−r+1) = n!/(n−r)!. Special case r=n: n! ways to arrange n distinct objects. Repeated letters? Divide by k! per repeated group (ALGEBRA: 7!/2!).',
      uni: 'Corollary 2.1: ordered, with replacement: $n^r$. Definition 2.2: $m! = m(m-1)\\cdots 1$, $0!=1$. Corollary 2.2: ordered, without replacement: $n(n-1)\\cdots(n-r+1)=\\frac{n!}{(n-r)!}$. Lemma 2.1: $k$ objects have $k!$ orderings (take $n=r=k$).',
      deep: 'Both formulas are the multiplication principle with stage sizes (n,n,…,n) or (n,n−1,…,n−r+1). The 0!=1 convention is not arbitrary: it makes n!/(n−n)! = n! correct — "choose all n in order". Division by k! for repeats is a preview of the combinations logic: quotient out the rearrangements you can\'t tell apart.',
    },
    formulas: [
      { id: 'f-perm-rep', name: 'Ordered, with replacement', tex: 'n^r', note: 'PIN codes: 10⁴ = 10000', source: 'course', pdfPage: 24 },
      { id: 'f-perm-norep', name: 'Ordered, without replacement', tex: '\\frac{n!}{(n-r)!}=n(n-1)\\cdots(n-r+1)', note: 'Podium: first n choices, then n−1, …', source: 'course', pdfPage: 24,
        rederive: 'Multiplication principle with shrinking stages: n choices, then n−1, … r factors in total.' },
    ],
    examples: {
      simple: '3 runners on a 2-place podium: 3×2 = 6 orderings.',
      everyday: '4-digit phone PIN: 10⁴ = 10 000 codes; only digits 0–6 gives 7⁴ = 2401, so P = 0.2401 (Example 2.6).',
      mathematical: 'ALGEBRA has 7!/2! = 2520 distinct arrangements — the two As are interchangeable (Example 2.11).',
      exam: 'Five cards dealt in a row, P(first three are pictures) = (12·11·10·40·39)/(52·51·50·49·48) = 11/1666 (Example 2.7).',
    },
    connections: [
      { to: 'combinations', how: 'Forget the order: divide the r! orderings out of n!/(n−r)! and you get C(n,r).' },
      { to: 'binomial', how: 'The C(n,x) in the binomial pmf counts WHICH trials succeed — combinations inside a distribution.' },
    ],
    errorIds: ['perm-comb', 'replacement', 'overcount-identical'],
  },
  {
    id: 'combinations', title: 'Unordered choice: combinations', icon: '', chapter: 2, pdfPages: [25, 27],
    prereqs: ['permutations'], examinable: true, lab: 'counting',
    whyCare: 'Choosing a GROUP (lottery numbers, poker hands, committee) where order is irrelevant — the workhorse of exam counting questions.',
    keywords: ['combination', 'choose', 'ncr', 'binomial coefficient', 'unordered', 'stars and bars'],
    levels: {
      eli5: 'Picking 3 pizza toppings: mushroom-then-cheese is the SAME pizza as cheese-then-mushroom. Count the groups, not the orderings.',
      human: 'Choosing r from n distinct items, order irrelevant, no repeats: C(n,r) = n!/(r!(n−r)!) — read "n choose r". Where it comes from: count ordered choices n!/(n−r)!, notice every unordered group got counted r! times (once per ordering), divide. Bonus symmetric fact: C(n,r) = C(n,n−r). With replacement (doughnut orders): C(n−1+r, r) via the "stars and bars" scoop/move story.',
      uni: 'Corollary 2.3: $\\binom{n}{r}=\\frac{n!}{r!(n-r)!}$ counts unordered selections without replacement. Corollary 2.4 (unordered WITH replacement): $\\binom{n-1+r}{r}$ — the ice-cream machine argument: any order presses "scoop" $r$ times and "move" $n-1$ times, so choose which of the $n-1+r$ presses are scoops.',
      deep: 'The derivation pattern "count with order, then quotient by indistinguishable rearrangements" is a deep counting idea (group actions, if you meet them later). The vending-machine bijection is beautiful: an unordered multiset ↔ a binary string of S/M presses ↔ an ordinary combination. Turning a hard count into a bijection with an easy count is THE combinatorics move.',
    },
    formulas: [
      { id: 'f-comb', name: 'Combinations (no replacement)', tex: '\\binom{n}{r}=\\frac{n!}{r!\\,(n-r)!}',
        parts: [
          { sym: 'n!', meaning: 'arrange everything in order…', color: 'known' },
          { sym: 'r!', meaning: '…un-order the chosen r', color: 'bad' },
          { sym: '(n-r)!', meaning: '…and un-order the unchosen n−r', color: 'bad' },
        ], source: 'course', pdfPage: 25,
        rederive: 'Ordered count n!/(n−r)! over-counts each group r! times ⇒ divide by r!.' },
      { id: 'f-comb-rep', name: 'Unordered, with replacement', tex: '\\binom{n-1+r}{r}', note: 'Doughnuts: C(15,12)=455 ways to buy 12 of 4 kinds', source: 'course', pdfPage: 27,
        rederive: 'Ice-cream machine: r "scoop" + (n−1) "move" presses; choose which presses are scoops.' },
    ],
    examples: {
      simple: 'Choose 2 flavours from 4: C(4,2) = 6.',
      everyday: 'Pick 5 players for five-a-side from a squad of 9: C(9,5) = 126 teams.',
      mathematical: 'UK lottery: C(59,6) = 45 057 474, so P(jackpot) ≈ 1 in 45 million (Example 2.8).',
      exam: 'Full house: 13·C(4,3)·12·C(4,2)/C(52,5) = 6/4165 (Example 2.9) — multiplication principle + combinations together.',
    },
    connections: [
      { to: 'sampling-table', how: 'One cell of the 2×2 sampling table — know which cell you are in.' },
      { to: 'binomial', how: 'Bin(n,p) pmf = C(n,x) ways to place the successes × pˣ(1−p)ⁿ⁻ˣ.' },
      { to: 'random-walk-intro', how: 'Paths returning to 0 are counted by C(n, n/2) — combinations count paths.' },
    ],
    errorIds: ['perm-comb', 'replacement', 'denominator'],
    worked: [
      {
        id: 'w-fullhouse', title: 'Poker full house', fromPdf: 'Example 2.9, p26', pdfPage: 26, source: 'course',
        prompt: 'Five cards are dealt from a shuffled 52-card pack. Find the probability of a full house (three of one rank, two of another).',
        steps: [
          { ask: 'What is |Ω| — the number of possible hands (order irrelevant)?', answerTex: '$|\\Omega|=\\binom{52}{5}$', explain: 'A hand is an unordered choice of 5 distinct cards.', markNote: 'M1: unordered sample space.' },
          { ask: 'How many ways to pick WHICH rank forms the triple, and its suits?', answerTex: '$13\\times\\binom{4}{3}$', explain: '13 ranks; then choose 3 of the 4 suits of that rank.', markNote: 'M1: stage counting begins.' },
          { ask: 'Now the pair — how many rank choices remain, and suits?', answerTex: '$12\\times\\binom{4}{2}$', explain: 'The pair\'s rank must differ from the triple\'s: 12 left.', markNote: 'A1: 12 not 13 — examiners check this.' },
          { ask: 'Assemble the probability.', answerTex: '$P=\\dfrac{13\\binom43\\cdot 12\\binom42}{\\binom{52}{5}}=\\dfrac{6}{4165}\\approx 0.0014$', explain: 'Multiplication principle in the numerator, classical probability overall.', markNote: 'A1: final value simplified.' },
        ],
      },
    ],
  },
  {
    id: 'sampling-table', title: 'The sampling table (which formula?)', icon: '', chapter: 2, pdfPages: [27, 27],
    prereqs: ['permutations', 'combinations'], examinable: true, lab: 'counting',
    whyCare: 'Two questions — does order matter? can items repeat? — route every counting problem to one of four formulas. Method choice IS the exam skill.',
    keywords: ['sampling', 'ordered', 'unordered', 'replacement', 'table', 'which formula'],
    levels: {
      eli5: 'Four little machines: podium machine, PIN machine, lotto machine, doughnut machine. Ask two questions — "does the order matter?" and "can I reuse?" — and the right machine lights up.',
      human: 'The lecture notes\' own summary table: ordered+without = n!/(n−r)! (podium); ordered+with = nʳ (PIN code); unordered+without = C(n,r) (lotto); unordered+with = C(n−1+r,r) (buying doughnuts). Memorise the four ANCHOR EXAMPLES, not the formulas — the examples rebuild the formulas.',
      uni: 'Summary (p27): $$\\begin{array}{c|cc} & \\text{without repl.} & \\text{with repl.}\\\\\\hline \\text{ordered} & \\frac{n!}{(n-r)!} & n^r\\\\ \\text{unordered} & \\binom{n}{r} & \\binom{n-1+r}{r} \\end{array}$$ Anchors: podium · PIN · lotto · doughnuts.',
      deep: 'Notice the diagonal relationships: dividing the ordered column by r! gives the unordered one (without replacement); the with-replacement unordered cell is the odd one out, needing the stars-and-bars bijection. When a problem resists the table, it usually needs the multiplication principle to GLUE table-cells together (like the full house: two combination stages multiplied).',
    },
    formulas: [
      { id: 'f-table', name: 'The 2×2 table', tex: '\\underbrace{\\tfrac{n!}{(n-r)!}}_{\\text{podium}}\\quad \\underbrace{n^r}_{\\text{PIN}}\\quad \\underbrace{\\binom{n}{r}}_{\\text{lotto}}\\quad \\underbrace{\\binom{n-1+r}{r}}_{\\text{doughnuts}}', source: 'course', pdfPage: 27 },
    ],
    examples: {
      simple: 'Podium = order matters, no repeats. Pizza toppings = order doesn\'t matter.',
      everyday: 'Wordle guess = ordered with replacement (letters repeat): 26⁵. Fantasy-team pick = unordered without.',
      mathematical: 'Random walk: 2ⁿ paths (ordered, with replacement from {+1,−1}); C(n, n/2) of them end at 0.',
      exam: '"How many ways…" — always name the cell first ("order matters, without replacement, so…") to bank the method mark.',
    },
    connections: [
      { to: 'method-choice', how: 'This table is the prototype of method choice — the app drills it in the Method Trainer.' },
    ],
    errorIds: ['perm-comb', 'replacement'],
  },
  {
    id: 'random-walk-intro', title: 'Random walks (counting paths)', icon: '', chapter: 2, pdfPages: [29, 30],
    prereqs: ['combinations', 'classical-probability'], examinable: true, lab: 'walk',
    whyCare: 'The course\'s running example: a walker stepping ±1. Counting its paths is a beautiful stress-test of everything in this chapter.',
    keywords: ['random walk', 'paths', 'return to zero', 'stirling', 'symmetric'],
    levels: {
      eli5: 'A frog on a number line flips a coin each second: heads hop right, tails hop left. To be back home later, it must have hopped right exactly as often as left.',
      human: 'Steps are ±1 each with probability ½. After n steps there are 2ⁿ equally likely paths. To be at 0, exactly n/2 steps must be "+1": impossible for odd n, and C(n, n/2) ways for even n. So P(at 0 after n) = C(n,n/2)/2ⁿ. Stirling\'s formula (non-examinable) says this behaves like √(2/(πn)) — slowly shrinking, never zero.',
      uni: 'Example 2.15: $\\Omega=\\{\\pm1\\}^n$, $|\\Omega|=2^n$ (ordered with replacement); $E=\\{$exactly $n/2$ up-steps$\\}$, $|E|=\\binom{n}{n/2}$ (unordered without replacement — choose WHICH steps go up). For even $n$: $P(S_n=0)=\\binom{n}{n/2}2^{-n}\\sim\\sqrt{2/(\\pi n)}$ by Stirling $n!\\approx n^n e^{-n}\\sqrt{2\\pi n}$ (non-examinable).',
      deep: 'Two cells of the sampling table cooperate in one problem: the sample space is ordered-with-replacement, the favourable count is a combination. Later the course returns: the walk hits 0 infinitely often (recurrent, §3.6) yet the EXPECTED time to return is infinite (§7.4) — a paradox resolved by heavy tails. Random walks are the fruit fly of probability theory.',
    },
    formulas: [
      { id: 'f-walk0', name: 'Back at zero after n steps (n even)', tex: 'P(S_n=0)=\\binom{n}{n/2}\\frac{1}{2^n}',
        parts: [
          { sym: '\\binom{n}{n/2}', meaning: 'choose which n/2 of the steps go UP', color: 'good' },
          { sym: '2^n', meaning: 'all equally likely ±1 sequences', color: 'known' },
        ], source: 'course', pdfPage: 30 },
    ],
    examples: {
      simple: 'n=2: paths UU, UD, DU, DD. At 0: UD, DU → 2/4 = 1/2.',
      everyday: 'Your fantasy-league rank drifting up/down one place per week — how likely are you back where you started after 10 weeks?',
      mathematical: 'n=4: C(4,2)/16 = 6/16 = 3/8.',
      exam: '"Explain why P(S_n=0)=0 for odd n" — parity argument: equal up and down steps forces n even. Free marks for a sentence.',
    },
    connections: [
      { to: 'binomial', how: 'Number of up-steps in n steps is exactly Bin(n, ½) — the walk is a shifted binomial.' },
      { to: 'random-walk-return', how: 'Chapter 7 (non-examinable) shows the expected return time is infinite.' },
    ],
    errorIds: ['perm-comb', 'binom-support'],
  },
];
