import Dexie, { type Table } from 'dexie';
import type { Annotation, Attempt, CardState, ConceptState, ImportedPaper, MistakeRecord, PastPaperQuestion, SessionLog } from '../data/types';

export interface KV { key: string; value: unknown; }
export interface PaperBlob { id: string; blob: Blob; }

class SmartStudyDB extends Dexie {
  concepts!: Table<ConceptState, string>;
  attempts!: Table<Attempt, number>;
  mistakes!: Table<MistakeRecord, number>;
  cards!: Table<CardState, string>;
  annotations!: Table<Annotation, string>;
  sessions!: Table<SessionLog, number>;
  papers!: Table<ImportedPaper, string>;
  paperBlobs!: Table<PaperBlob, string>;
  paperQuestions!: Table<PastPaperQuestion, string>;
  kv!: Table<KV, string>;

  constructor() {
    super('bath-smartstudy');
    this.version(1).stores({
      concepts: 'conceptId, due, mastery',
      attempts: '++id, at, conceptId, mode',
      mistakes: '++id, at, conceptId, errorId, resolved, nextReview',
      cards: 'cardId, due, suspended',
      annotations: 'id, page, kind',
      sessions: '++id, at',
      papers: 'id, year',
      paperBlobs: 'id',
      paperQuestions: 'id, year, *topicIds',
      kv: 'key',
    });
  }
}

export const db = new SmartStudyDB();

export async function kvGet<T>(key: string, fallback: T): Promise<T> {
  const row = await db.kv.get(key);
  return row ? (row.value as T) : fallback;
}
export async function kvSet(key: string, value: unknown): Promise<void> {
  await db.kv.put({ key, value });
}
