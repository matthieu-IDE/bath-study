import { FOUNDATIONS } from './foundations';
import { DISTRIBUTIONS } from './distributions';
import { CONTINUOUS } from './continuous';
import { MOMENTS } from './moments';
import type { PageLesson } from './types';
export const PAGE_LESSONS: Record<number, PageLesson> = { ...FOUNDATIONS, ...DISTRIBUTIONS, ...CONTINUOUS, ...MOMENTS };
