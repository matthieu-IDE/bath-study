/* Content data model. Course data is separated from the UI and the learning engine.
   Everything traceable to the PDF carries pdfPages; app-created material is marked source:'extra'. */

export type Source = 'course' | 'extra';

export interface FormulaPart {
  /** TeX snippet to highlight (must appear inside tex via \htmlClass marker index) */
  sym: string; // display symbol (tex)
  meaning: string;
  color: 'known' | 'cond' | 'good' | 'bad' | 'warn' | 'accent';
}

export interface Formula {
  id: string;
  name: string;
  tex: string;
  parts?: FormulaPart[];
  note?: string;
  source: Source;
  pdfPage?: number;
  /** how to rebuild it if forgotten */
  rederive?: string;
}

export interface WorkedStep {
  ask: string; // question posed to the learner before revealing
  answerTex?: string; // the revealed line (tex allowed inline with $..$)
  explain?: string; // why that step is legal
  markNote?: string; // what earns the mark, Bath-style
}

export interface WorkedExample {
  id: string;
  title: string;
  fromPdf?: string; // e.g. "Example 3.5, p34"
  pdfPage?: number;
  prompt: string;
  steps: WorkedStep[];
  source: Source;
}

export interface ProofInfo {
  id: string;
  name: string;
  bigIdea: string; // one sentence
  visual?: string; // visual intuition description
  skeleton: string[]; // the major logical steps
  fullNote?: string; // pointer to PDF for the rigorous version
  pdfPage?: number;
  missingStepIdx?: number; // which skeleton step to hide in practice
}

export interface ConceptLevels {
  eli5: string; // explain to a 5-year-old (analogy)
  human: string; // normal human explanation
  uni: string; // university (proper notation, tex)
  deep: string; // deep intuition / why it works
}

export interface ConceptExamples {
  simple: string;
  everyday: string;
  mathematical: string;
  exam: string;
}

export interface Concept {
  id: string;
  title: string;
  icon: string;
  chapter: number;
  pdfPages: [number, number]; // file pages (1-98)
  prereqs: string[];
  whyCare: string; // ≤30 words
  levels: ConceptLevels;
  formulas: Formula[];
  examples?: ConceptExamples;
  connections: { to: string; how: string }[];
  errorIds: string[]; // linked common errors
  lab?: string; // interactive lab component id
  proof?: ProofInfo;
  worked?: WorkedExample[];
  examinable: boolean;
  examNote?: string;
  keywords: string[]; // for PDF-selection → concept matching
}

export interface Chapter {
  n: number;
  title: string;
  icon: string;
  pdfPages: [number, number];
  conceptIds: string[];
  examinable: boolean;
}

export interface ErrorType {
  id: string;
  label: string;
  category: 'conceptual' | 'method' | 'careless';
  description: string;
  fix: string; // how to avoid it
  pdfPage?: number; // where the lecturer warns about it
}

/* ---------- questions ---------- */
export type Difficulty = 0 | 1 | 2 | 3 | 4 | 5;

export interface Choice {
  tex: string; // rendered with inline math support
  correct?: boolean;
  errorId?: string; // which error this distractor diagnoses
  why?: string; // shown in review
}

export interface GeneratedQuestion {
  id: string;
  conceptId: string;
  templateId: string;
  difficulty: Difficulty;
  prompt: string; // markdown-ish with $tex$
  kind: 'mc' | 'numeric' | 'method';
  choices?: Choice[];
  numeric?: { answer: number; tol: number; unit?: string; answerTex: string };
  hints: [string, string, string];
  solution: string[]; // step lines, $tex$ allowed
  markScheme?: string[]; // what earns each mark
  methodTag?: string; // for the method trainer
  seed: number;
  source: Source;
}

export interface QuestionTemplate {
  id: string;
  conceptId: string;
  difficulties: Difficulty[];
  generate: (seed: number, difficulty: Difficulty) => GeneratedQuestion;
}

/* ---------- flashcards ---------- */
export type CardKind = 'definition' | 'formula' | 'concept' | 'visual' | 'error' | 'example' | 'proof';

export interface CardDef {
  id: string;
  conceptId: string;
  kind: CardKind;
  front: string;
  back: string;
  pdfPage?: number;
  source: Source;
}

/* ---------- past papers ---------- */
export interface PastPaperQuestion {
  id: string;
  year: string;
  paperCode: string;
  questionNumber: string;
  marks: number | null;
  topicIds: string[];
  pdfPageLinks: number[];
  notes?: string;
  fileId?: string; // imported pdf blob id
  filePage?: number;
}

export interface ImportedPaper {
  id: string;
  name: string;
  year: string;
  paperCode: string;
  kind: 'paper' | 'markscheme';
  addedAt: number;
  size: number;
}

/* ---------- persistence records ---------- */
export interface ConceptState {
  conceptId: string;
  mastery: number; // 0..1
  attempts: number;
  correct: number;
  streak: number;
  lastSeen: number;
  due: number; // next review timestamp
  intervalDays: number;
  ease: number;
  confMatrix: { cc: number; cu: number; wu: number; wc: number }; // correct/wrong × confident/unsure
}

export interface Attempt {
  id?: number;
  at: number;
  conceptId: string;
  templateId: string;
  difficulty: number;
  correct: boolean;
  confidence: Confidence | null;
  hintsUsed: number;
  errorId?: string;
  timeMs: number;
  mode: 'practice' | 'exam' | 'mock' | 'quick' | 'diagnostic';
}

export type Confidence = 'guess' | 'fifty' | 'sure' | 'certain';

export interface MistakeRecord {
  id?: number;
  at: number;
  conceptId: string;
  prompt: string;
  yourAnswer: string;
  correctAnswer: string;
  errorId: string;
  solution: string[];
  repeats: number;
  resolved: boolean;
  nextReview: number;
}

export interface CardState {
  cardId: string;
  due: number;
  intervalDays: number;
  ease: number;
  reps: number;
  lapses: number;
  suspended: boolean;
  edited?: { front: string; back: string };
}

export interface Annotation {
  id: string;
  page: number;
  kind: 'highlight' | 'note' | 'draw' | 'bookmark' | 'confusing';
  rects?: { x: number; y: number; w: number; h: number }[]; // fraction-of-page coords
  path?: { x: number; y: number }[][];
  color?: string;
  text?: string;
  at: number;
}

export interface SessionLog {
  id?: number;
  at: number;
  minutes: number;
  kind: string;
  items: number;
  correct: number;
}
