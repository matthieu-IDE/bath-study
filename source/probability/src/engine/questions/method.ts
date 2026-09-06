import type { QuestionTemplate } from '../../data/types';
import { pick, shuffle } from '../../lib/utils';
import { mcQuestion, rngFor } from './helpers';

/* Method-choosing trainer: rapid-fire "which tool?" — recognition before calculation. */

interface Scenario {
  text: string;
  tool: string;
  conceptId: string;
  why: string;
}

const TOOLS = [
  'Complement (1 − P(none))', 'Permutations (ordered)', 'Combinations (unordered)',
  'Conditional probability', 'Law of total probability', "Bayes' theorem",
  'Binomial distribution', 'Geometric distribution', 'Poisson distribution',
  'Inclusion–exclusion', 'Linearity of expectation', 'Memoryless property',
];

const SCENARIOS: Scenario[] = [
  { text: 'P(at least one of 12 independent sensors triggers)', tool: 'Complement (1 − P(none))', conceptId: 'complement-trick', why: '"At least one" over many independent events → 1 − product of failure probs.' },
  { text: 'How many ways can a 5-song setlist be ordered from 20 songs?', tool: 'Permutations (ordered)', conceptId: 'permutations', why: 'Setlist ORDER matters, no repeats → n!/(n−r)!.' },
  { text: 'How many 6-player teams can be picked from 15?', tool: 'Combinations (unordered)', conceptId: 'combinations', why: 'A team is an unordered group → C(15,6).' },
  { text: 'P(a randomly chosen defective item came from Factory B), knowing each factory\'s output share and defect rate', tool: "Bayes' theorem", conceptId: 'bayes', why: 'Reversing a conditional (defective→factory) with a partition → Bayes.' },
  { text: 'P(an item is defective), knowing each factory\'s output share and defect rate', tool: 'Law of total probability', conceptId: 'total-probability', why: 'Forward direction over a partition of sources → weighted average.' },
  { text: 'P(exactly 7 of 10 penalty kicks score), kicks independent', tool: 'Binomial distribution', conceptId: 'binomial', why: 'Fixed n independent identical trials, count successes → Bin(10,p).' },
  { text: 'P(the first faulty bulb is the 5th one tested), tests independent', tool: 'Geometric distribution', conceptId: 'geometric', why: 'Waiting for the FIRST success → Geom(p) at k=5.' },
  { text: 'P(exactly 3 buses pass in 20 minutes, buses at 6/hour)', tool: 'Poisson distribution', conceptId: 'poisson', why: 'Events at a rate over a window → Pois(λ=2).' },
  { text: 'P(a student does maths or music), given P(maths), P(music), P(both)', tool: 'Inclusion–exclusion', conceptId: 'inclusion-exclusion', why: 'Union of overlapping events → add, subtract the overlap.' },
  { text: 'Expected number of matching birthdays across 30 people', tool: 'Linearity of expectation', conceptId: 'linearity', why: 'Sum of (dependent!) indicators — linearity needs no independence.' },
  { text: 'P(the second card is an ace GIVEN the first was an ace)', tool: 'Conditional probability', conceptId: 'conditional-probability', why: 'Information shrinks the deck → conditional counting.' },
  { text: 'A machine has already run 100 hours without failing; P(it survives 50 more), lifetime exponential', tool: 'Memoryless property', conceptId: 'exponential', why: 'Exp forgets elapsed time → P(X>50) regardless of the 100 hours.' },
  { text: 'P(you win a raffle at least once in 8 weekly draws)', tool: 'Complement (1 − P(none))', conceptId: 'complement-trick', why: '"At least once" → 1 − P(lose all 8).' },
  { text: 'Number of distinct anagram arrangements of a word with repeated letters', tool: 'Permutations (ordered)', conceptId: 'permutations', why: 'Ordered arrangements, then divide by repeats k!.' },
  { text: 'P(a positive doping test is a false alarm), given prevalence and test accuracy', tool: "Bayes' theorem", conceptId: 'bayes', why: 'Posterior from prior + likelihood → Bayes.' },
  { text: 'P(more than 4 typos on a page, typos at 1.2/page)', tool: 'Poisson distribution', conceptId: 'poisson', why: 'Rate over an exposure → Poisson tail.' },
  { text: 'Expected total from rolling 7 dice', tool: 'Linearity of expectation', conceptId: 'linearity', why: '7 × 3.5 — no distributions needed.' },
  { text: 'P(you need more than 10 job applications for your first offer), each independent with success 0.15', tool: 'Geometric distribution', conceptId: 'geometric', why: 'P(Geom > n) = (1−p)ⁿ.' },
  { text: 'How many ways to share 10 identical sweets among 4 children?', tool: 'Combinations (unordered)', conceptId: 'combinations', why: 'Unordered WITH repetition → stars and bars C(n−1+r, r).' },
  { text: 'P(rain tomorrow), given P(rain|windy), P(rain|calm) and P(windy)', tool: 'Law of total probability', conceptId: 'total-probability', why: 'Partition {windy, calm} → weighted average.' },
];

export const METHOD_TEMPLATE: QuestionTemplate = {
  id: 'method-choice', conceptId: 'sampling-table', difficulties: [1, 2],
  generate(seed, d) {
    const rng = rngFor(seed);
    const sc = pick(rng, SCENARIOS);
    const wrongs = shuffle(rng, TOOLS.filter(t => t !== sc.tool)).slice(0, 3);
    return mcQuestion(`meth-${seed}`, 'method-choice', sc.conceptId, d, seed, {
      prompt: `**Method only — don't solve it.** Which tool cracks this?\n\n> ${sc.text}`,
      choices: [
        { tex: sc.tool, correct: true, why: sc.why },
        ...wrongs.map(w => ({ tex: w, errorId: 'wrong-distribution', why: undefined as string | undefined })),
      ],
      hints: ['What is the QUESTION SHAPE — waiting? counting successes? reversing a conditional? a union?',
        'Match trigger phrases: "at least one"→complement; "given that"→conditional/Bayes; "rate"→Poisson; "first success"→geometric.',
        sc.why],
      solution: [`**${sc.tool}.** ${sc.why}`],
      methodTag: 'method',
    }, rng);
  },
};
