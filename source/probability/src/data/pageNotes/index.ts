import type { PageNote } from './types';
import { NOTES1 } from './part1';
import { NOTES2 } from './part2';
import { NOTES3 } from './part3';

export type { PageNote } from './types';

/* Every content page (7–98) → line-by-line decode of what is printed on it. */
export const PAGE_NOTES: Record<number, PageNote[]> = { ...NOTES1, ...NOTES2, ...NOTES3 };
