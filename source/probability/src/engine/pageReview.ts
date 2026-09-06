export type RecallGrade = 'again' | 'hard' | 'good';
export interface PageReview {
  page: number; due: number; interval: number; reviews: number; grade: RecallGrade;
  draft: string; updated: number;
}
export const REVIEW_KEY = 'bath-probability-page-reviews-v1';
const DAY = 86400000;
export function schedulePage(previous: PageReview | undefined, page: number, grade: RecallGrade, draft: string, at = Date.now()): PageReview {
  const interval = grade === 'again' ? 10 / 1440 : grade === 'hard' ? 1
    : Math.min(30, !previous || previous.grade === 'again' ? 1 : Math.max(3, Math.round(previous.interval * 2.5)));
  return { page, due: at + interval * DAY, interval, reviews: (previous?.reviews ?? 0) + 1, grade, draft, updated: at };
}
export function readPageReviews(raw: string | null): Record<number, PageReview> {
  try {
    const parsed: unknown = JSON.parse(raw ?? '{}');
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([key, v]) => {
      const r = v as PageReview;
      return r && Number(key) === r.page && Number.isInteger(r.page) && r.page >= 1 && r.page <= 98
        && Number.isFinite(r.due) && Number.isFinite(r.updated) && Number.isFinite(r.interval)
        && r.interval > 0 && Number.isInteger(r.reviews) && r.reviews > 0
        && ['again', 'hard', 'good'].includes(r.grade) && typeof r.draft === 'string';
    }));
  } catch { return {}; }
}
