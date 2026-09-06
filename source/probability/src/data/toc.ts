/* Table of contents of the lecture notes, by FILE page (printed page + 3). */

export interface TocChapter {
  label: string;
  page: number;
  examinable: boolean;
  items: { label: string; page: number }[];
}

export const TOC: TocChapter[] = [
  {
    label: 'Front matter', page: 4, examinable: false,
    items: [
      { label: 'Overview & learning outcomes', page: 4 },
      { label: 'Organisation, assessment, past papers', page: 5 },
      { label: 'Probability vs statistics', page: 6 },
    ],
  },
  {
    label: '1 · Probability spaces', page: 7, examinable: true,
    items: [
      { label: '1.1 Sets, sample spaces, events', page: 7 },
      { label: 'Operations of set theory', page: 8 },
      { label: 'Venn diagrams & disjointness', page: 9 },
      { label: 'Laws of set theory · De Morgan', page: 11 },
      { label: 'Collections of events', page: 12 },
      { label: '1.2 σ-algebras & the power set', page: 13 },
      { label: 'Kolmogorov\'s axioms', page: 15 },
      { label: 'Properties of P', page: 16 },
      { label: 'Cluedo · specifying probabilities', page: 17 },
    ],
  },
  {
    label: '2 · Classical probability & counting', page: 20, examinable: true,
    items: [
      { label: '2.1 Equally likely outcomes', page: 20 },
      { label: '2.2 Multiplication principle', page: 22 },
      { label: '2.3 Permutations', page: 23 },
      { label: '2.4 Combinations', page: 25 },
      { label: 'Stars & bars · the summary table', page: 26 },
      { label: 'Worked counting examples', page: 28 },
      { label: 'The random walk', page: 29 },
    ],
  },
  {
    label: '3 · Conditional probability', page: 31, examinable: true,
    items: [
      { label: '3.1 Conditioning · multiplication rule', page: 31 },
      { label: 'Chain rule', page: 32 },
      { label: '3.2 Partitions · total probability', page: 33 },
      { label: '3.3 Bayes\' theorem', page: 34 },
      { label: '3.4 Independence', page: 35 },
      { label: '3.5 Mutual independence', page: 36 },
      { label: 'Missiles & circuits', page: 38 },
      { label: 'Recurrence · prosecutor\'s fallacy', page: 39 },
    ],
  },
  {
    label: '4 · Discrete random variables', page: 41, examinable: true,
    items: [
      { label: '4.1 Random variables & pmfs', page: 41 },
      { label: '4.2 The cdf', page: 44 },
      { label: 'Bernoulli', page: 46 },
      { label: 'Binomial', page: 47 },
      { label: 'Geometric', page: 49 },
      { label: 'Poisson', page: 52 },
      { label: '4.4 Joint pmfs & marginals', page: 55 },
      { label: 'Independence of rvs', page: 58 },
      { label: 'Sums · convolution', page: 61 },
    ],
  },
  {
    label: '5 · Continuous random variables', page: 63, examinable: true,
    items: [
      { label: '5.1 Uniform', page: 64 },
      { label: 'Exponential · memorylessness', page: 65 },
      { label: 'Normal', page: 66 },
      { label: '5.2 The pdf — probability is area', page: 67 },
      { label: 'Uniform / Exp / Normal pdfs', page: 70 },
      { label: '5.3 Joint pdfs', page: 72 },
      { label: 'Marginals · independence', page: 75 },
    ],
  },
  {
    label: '6 · Expectation', page: 78, examinable: true,
    items: [
      { label: '6.1 Discrete expectation', page: 78 },
      { label: '6.2 Continuous expectation', page: 79 },
      { label: '6.3 LOTUS & properties', page: 80 },
      { label: 'Linearity', page: 82 },
      { label: 'Products & independence', page: 84 },
      { label: '6.4 Variance', page: 85 },
      { label: 'Covariance & correlation', page: 88 },
      { label: 'Variance of sums', page: 89 },
      { label: '6.5 Law of Large Numbers', page: 91 },
    ],
  },
  {
    label: '7 · Extras', page: 93, examinable: false,
    items: [
      { label: '7.1 Indicator functions', page: 93 },
      { label: '7.2 Markov & Chebyshev', page: 94 },
      { label: '7.3 Tail-sum formula', page: 96 },
      { label: '7.4 Return time of the walk', page: 97 },
    ],
  },
];
