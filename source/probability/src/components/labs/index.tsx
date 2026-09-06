import type { ComponentType } from 'react';
import { VennLab } from './VennLab';
import { DiceLab } from './DiceLab';
import { CountingLab } from './CountingLab';
import { CondLab } from './CondLab';
import { BayesLab } from './BayesLab';
import { BinomialLab, GeometricLab, PoissonLab } from './DiscreteLabs';
import { ContinuousLab } from './ContinuousLab';
import { CovarianceLab, LLNLab, RandomWalkLab, VarianceLab } from './ExpectationLabs';
import { PmfCdfLab, RVMapLab } from './RVLabs';
import {
  AtLeastOneLab, AxiomLab, BulbLab, ChainLab, ConvolveLab, IndepTrapLab,
  JointTableLab, LinearityLab, LotusLab, RectLab, SigmaClosureLab, SlabLab, TailBoundLab, VarSumLab,
} from './MoreLabs';

export const LABS: Record<string, { title: string; C: ComponentType }> = {
  venn: { title: 'Venn playground', C: VennLab },
  dice: { title: 'Two-dice sample space', C: DiceLab },
  counting: { title: 'Counting machines', C: CountingLab },
  cond: { title: 'Shrink the world', C: CondLab },
  bayes: { title: 'Bayes with 1000 people', C: BayesLab },
  binomial: { title: 'Binomial machine', C: BinomialLab },
  geometric: { title: 'Waiting for success', C: GeometricLab },
  poisson: { title: 'Events at a rate', C: PoissonLab },
  continuous: { title: 'Probability is area', C: ContinuousLab },
  expectation: { title: 'Averages settle (LLN)', C: LLNLab },
  lln: { title: 'Averages settle (LLN)', C: LLNLab },
  variance: { title: 'Spread lab', C: VarianceLab },
  covariance: { title: 'Correlation cloud', C: CovarianceLab },
  walk: { title: 'Random walk arena', C: RandomWalkLab },
  rvmap: { title: 'RVs are functions', C: RVMapLab },
  pmfcdf: { title: 'pmf ↔ cdf', C: PmfCdfLab },
  closure: { title: 'Build a σ-algebra', C: SigmaClosureLab },
  axioms: { title: 'One cake of belief', C: AxiomLab },
  atleast: { title: 'The "at least one" machine', C: AtLeastOneLab },
  chain: { title: 'Chain the story', C: ChainLab },
  indeptrap: { title: 'The two independence traps', C: IndepTrapLab },
  jointtable: { title: 'The joint table', C: JointTableLab },
  convolve: { title: 'Convolution, visibly', C: ConvolveLab },
  rect: { title: 'Volume over a rectangle', C: RectLab },
  lotus: { title: 'LOTUS lens', C: LotusLab },
  linearity: { title: 'Linearity, unconditionally', C: LinearityLab },
  varsum: { title: 'Var(X ± Y)', C: VarSumLab },
  bulbs: { title: 'Indicator bulbs', C: BulbLab },
  tailbound: { title: 'Leash the tail', C: TailBoundLab },
  slabs: { title: 'Stack the survival slabs', C: SlabLab },
};
