export interface PageLesson {
  title: string;
  goal: string;
  reasoning: string[];
  trap: string;
  question: string;
  solution: string[];
  correction?: string;
}

// Original teaching and transfer exercises, checked against the bundled PDF.
// File page numbers are used throughout; extension exercises are not past-paper questions.
export const lesson = (title: string, goal: string, reasoning: string[], trap: string, question: string, solution: string[], correction?: string): PageLesson =>
  ({ title, goal, reasoning, trap, question, solution, correction });
