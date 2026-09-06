import { create } from 'zustand';
import { db, kvGet, kvSet } from './db/db';
import type { Annotation, Attempt, CardState, Confidence, ConceptState, GeneratedQuestion, ImportedPaper, MistakeRecord, PastPaperQuestion } from './data/types';
import { DECK } from './data/flashcards';
import { applyAttempt, freshCardState, freshConceptState, gradeCard, type Grade } from './engine/mastery';
import { setMuted } from './lib/sound';
import { DAY, now, uid } from './lib/utils';

export type View = 'dashboard' | 'study' | 'practice' | 'cards' | 'map' | 'exam' | 'mistakes' | 'sheets' | 'quick' | 'papers';

interface Settings {
  theme: 'light' | 'dark';
  sound: boolean;
  name: string;
  sidebarCollapsed: boolean;
  v2?: boolean;
}

interface AppState {
  ready: boolean;
  view: View;
  viewParam: string | null;
  settings: Settings;
  conceptStates: Record<string, ConceptState>;
  cardStates: Record<string, CardState>;
  annotations: Annotation[];
  mistakes: MistakeRecord[];
  attempts: Attempt[];
  papers: ImportedPaper[];
  paperQuestions: PastPaperQuestion[];
  pdfPage: number;
  teacherFocus: string | null;   // concept id the teacher panel focuses
  noteTicks: Record<string, boolean>;                          // "page:idx" → understood
  noteSpot: { page: number; idx: number; k: number } | null;   // PDF selection → light up this decode line
  missionDone: Record<string, boolean>;
  toast: string | null;

  init(): Promise<void>;
  nav(view: View, param?: string | null): void;
  setTheme(t: 'light' | 'dark'): void;
  setSound(on: boolean): void;
  setSidebar(collapsed: boolean): void;
  setPdfPage(p: number): void;
  focusConcept(id: string | null): void;
  toggleNoteTick(page: number, idx: number): void;
  spotNote(page: number, idx: number): void;
  recordAttempt(q: GeneratedQuestion, correct: boolean, confidence: Confidence | null, hintsUsed: number, timeMs: number, mode: Attempt['mode'], yourAnswer: string, errorId?: string): Promise<void>;
  resolveMistake(id: number, success: boolean): Promise<void>;
  gradeFlashcard(cardId: string, g: Grade): Promise<void>;
  addAnnotation(a: Omit<Annotation, 'id' | 'at'>): Promise<Annotation>;
  removeAnnotation(id: string): Promise<void>;
  markMission(id: string): void;
  addPaper(p: ImportedPaper, blob: Blob): Promise<void>;
  removePaper(id: string): Promise<void>;
  addPaperQuestion(q: PastPaperQuestion): Promise<void>;
  removePaperQuestion(id: string): Promise<void>;
  showToast(msg: string): void;
  logSession(kind: string, minutes: number, items: number, correct: number): Promise<void>;
}

export const useApp = create<AppState>((set, get) => ({
  ready: false,
  view: 'dashboard',
  viewParam: null,
  settings: { theme: 'light', sound: true, name: '', sidebarCollapsed: true, v2: true },
  conceptStates: {},
  cardStates: {},
  annotations: [],
  mistakes: [],
  attempts: [],
  papers: [],
  paperQuestions: [],
  pdfPage: 7,
  teacherFocus: null,
  noteTicks: {},
  noteSpot: null,
  missionDone: {},
  toast: null,

  async init() {
    let [settings, conceptRows, cardRows, annots, mistakes, attempts, papers, pq, page, missionDone, noteTicks] = await Promise.all([
      kvGet<Settings>('settings', get().settings),
      db.concepts.toArray(),
      db.cards.toArray(),
      db.annotations.toArray(),
      db.mistakes.toArray(),
      db.attempts.orderBy('at').reverse().limit(600).toArray(),
      db.papers.toArray(),
      db.paperQuestions.toArray(),
      kvGet<number>('pdfPage', 7),
      kvGet<Record<string, boolean>>(`mission-${new Date().toISOString().slice(0, 10)}`, {}),
      kvGet<Record<string, boolean>>('noteTicks', {}),
    ]);
    if (!settings.v2) {
      settings = { ...settings, sidebarCollapsed: true, v2: true };
      void kvSet('settings', settings);
    }
    const conceptStates: Record<string, ConceptState> = {};
    for (const r of conceptRows) conceptStates[r.conceptId] = r;
    const cardStates: Record<string, CardState> = {};
    for (const r of cardRows) cardStates[r.cardId] = r;
    document.documentElement.dataset.theme = settings.theme;
    setMuted(!settings.sound);
    set({ ready: true, settings, conceptStates, cardStates, annotations: annots, mistakes, attempts, papers, paperQuestions: pq, pdfPage: page, missionDone, noteTicks });
  },

  nav(view, param = null) {
    set({ view, viewParam: param ?? null });
    window.scrollTo(0, 0);
    const main = document.querySelector('.main');
    if (main) main.scrollTop = 0;
  },

  setTheme(t) {
    const settings = { ...get().settings, theme: t };
    document.documentElement.dataset.theme = t;
    set({ settings });
    void kvSet('settings', settings);
  },
  setSound(on) {
    const settings = { ...get().settings, sound: on };
    setMuted(!on);
    set({ settings });
    void kvSet('settings', settings);
  },
  setSidebar(collapsed) {
    const settings = { ...get().settings, sidebarCollapsed: collapsed };
    set({ settings });
    void kvSet('settings', settings);
  },
  setPdfPage(p) {
    set({ pdfPage: p, noteSpot: null });
    void kvSet('pdfPage', p);
  },
  focusConcept(id) { set({ teacherFocus: id }); },
  toggleNoteTick(page, idx) {
    const key = `${page}:${idx}`;
    const noteTicks = { ...get().noteTicks };
    if (noteTicks[key]) delete noteTicks[key];
    else noteTicks[key] = true;
    set({ noteTicks });
    void kvSet('noteTicks', noteTicks);
  },
  spotNote(page, idx) {
    set({ noteSpot: { page, idx, k: (get().noteSpot?.k ?? 0) + 1 } });
  },

  async recordAttempt(q, correct, confidence, hintsUsed, timeMs, mode, yourAnswer, errorId) {
    const prev = get().conceptStates[q.conceptId] ?? freshConceptState(q.conceptId);
    const next = applyAttempt(prev, { correct, difficulty: q.difficulty, confidence, hintsUsed });
    const attempt: Attempt = { at: now(), conceptId: q.conceptId, templateId: q.templateId, difficulty: q.difficulty, correct, confidence, hintsUsed, errorId, timeMs, mode };
    const conceptStates = { ...get().conceptStates, [q.conceptId]: next };
    set({ conceptStates, attempts: [attempt, ...get().attempts].slice(0, 600) });
    await Promise.all([db.concepts.put(next), db.attempts.add(attempt)]);

    if (!correct) {
      const correctAnswer = q.kind === 'numeric' ? q.numeric!.answerTex : (q.choices?.find(c => c.correct)?.tex ?? '');
      const rec: MistakeRecord = {
        at: now(), conceptId: q.conceptId, prompt: q.prompt, yourAnswer,
        correctAnswer, errorId: errorId ?? 'arithmetic', solution: q.solution,
        repeats: 0, resolved: false, nextReview: now() + DAY,
      };
      const id = await db.mistakes.add(rec);
      set({ mistakes: [{ ...rec, id: id as number }, ...get().mistakes] });
    }
  },

  async resolveMistake(id, success) {
    const m = get().mistakes.find(x => x.id === id);
    if (!m) return;
    const upd: MistakeRecord = success
      ? { ...m, repeats: m.repeats + 1, resolved: m.repeats + 1 >= 2, nextReview: now() + (m.repeats + 1) * 3 * DAY }
      : { ...m, repeats: 0, resolved: false, nextReview: now() + DAY };
    await db.mistakes.put(upd);
    set({ mistakes: get().mistakes.map(x => (x.id === id ? upd : x)) });
  },

  async gradeFlashcard(cardId, g) {
    const prev = get().cardStates[cardId] ?? freshCardState(cardId);
    const next = gradeCard(prev, g);
    set({ cardStates: { ...get().cardStates, [cardId]: next } });
    await db.cards.put(next);
  },

  async addAnnotation(a) {
    const full: Annotation = { ...a, id: uid(), at: now() };
    set({ annotations: [...get().annotations, full] });
    await db.annotations.put(full);
    return full;
  },
  async removeAnnotation(id) {
    set({ annotations: get().annotations.filter(a => a.id !== id) });
    await db.annotations.delete(id);
  },

  markMission(id) {
    const missionDone = { ...get().missionDone, [id]: true };
    set({ missionDone });
    void kvSet(`mission-${new Date().toISOString().slice(0, 10)}`, missionDone);
  },

  async addPaper(p, blob) {
    await Promise.all([db.papers.put(p), db.paperBlobs.put({ id: p.id, blob })]);
    set({ papers: [...get().papers, p] });
  },
  async removePaper(id) {
    await Promise.all([db.papers.delete(id), db.paperBlobs.delete(id)]);
    set({ papers: get().papers.filter(p => p.id !== id), paperQuestions: get().paperQuestions.filter(q => q.fileId !== id) });
    await db.paperQuestions.where('id').anyOf(get().paperQuestions.filter(q => q.fileId === id).map(q => q.id)).delete();
  },
  async addPaperQuestion(q) {
    await db.paperQuestions.put(q);
    set({ paperQuestions: [...get().paperQuestions, q] });
  },
  async removePaperQuestion(id) {
    await db.paperQuestions.delete(id);
    set({ paperQuestions: get().paperQuestions.filter(q => q.id !== id) });
  },

  showToast(msg) {
    set({ toast: msg });
    setTimeout(() => set(s => (s.toast === msg ? { toast: null } : {})), 2600);
  },

  async logSession(kind, minutes, items, correct) {
    await db.sessions.add({ at: now(), kind, minutes, items, correct });
  },
}));

/** Cards due now (or new). */
export function dueCards(cardStates: Record<string, CardState>, limit = 20): string[] {
  const t = now();
  const due: { id: string; due: number }[] = [];
  const fresh: string[] = [];
  for (const c of DECK) {
    const s = cardStates[c.id];
    if (s?.suspended) continue;
    if (!s || s.reps === 0) fresh.push(c.id);
    else if (s.due <= t) due.push({ id: c.id, due: s.due });
  }
  due.sort((a, b) => a.due - b.due);
  return [...due.map(d => d.id), ...fresh].slice(0, limit);
}
