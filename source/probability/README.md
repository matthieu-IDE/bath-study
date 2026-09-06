# Bath Probability & Statistics 1A — Study Studio

A personal study app around Matt Roberts’ September 2024 MA10211 lecture notes (98 PDF pages). The PDF remains visible beside a page-specific teaching companion.

## Run and verify

```sh
npm ci
npm run dev
node scripts/verify-study.mjs
npm run build
npm run preview
```

Open http://localhost:3020/#study/7 during development. Individual lesson links use `#study/1` through `#study/98`. The production build uses relative asset paths and can be hosted under `/probability/`.

## Study flow

- **Understand:** page-specific reasoning, decoded PDF references, deeper concept explanations, formulas with symbol definitions, proof reconstruction and worked examples.
- **Experiment:** page animations with pause, speed and single-second steps; course labs; new weighted-event, dependence and density experiments.
- **Challenge:** one original transfer problem per PDF page, a separate saved answer draft, and step-by-step solution reveals.
- **Recall:** a fresh teach-back draft, comparison checklist and explicit self-assessment. Again schedules 10 minutes, Hard one day, and Good increases spacing up to 30 days.
- **Practice:** existing automatically marked generated questions and full practice mode.

The right teaching panel has more space, with PDF-only and tutor-only focus layouts. The notation dictionary is searchable and can show either nearby symbols or the whole course. Reduced-motion preferences disable initial autoplay in the study experiments.

## Source map

- `src/data/masterclass/`: all 98 additional lessons, transfer problems, solutions and notation.
- `src/data/pageNotes/`: explanations of the original PDF references.
- `src/data/concepts/`: conceptual levels, formulas, proofs and worked examples.
- `src/components/teacher/`: teaching interface and new assumption experiments.
- `src/components/visuals/`, `src/components/labs/`: existing canvas/SVG visualisations and interactive labs.
- `src/engine/pageReview.ts`: page recall scheduling and storage validation.
- `src/engine/questions/`: generated question bank.
- `public/course.pdf`: original course notes.

## Scope and storage

New transfer problems and teaching explanations are authored study material, not official past-paper questions. The 2024 notes describe Chapter 7 as written after that exam; check current module guidance before using this as assessment scope. Page 93 also finishes the LLN discussion. No app progress or self-assessment score predicts an exam grade.

Existing progress and annotations use IndexedDB. New challenge/recall drafts and review schedules use versioned localStorage keys. They stay in that browser and origin; clearing browser data removes them. These new reviews are self-assessed and do not increase the automatically marked mastery score.

The study update corrects several misleading explanations, including power-set counts, atoms versus densities, Bernoulli CDF jumps, skew direction, independence on null sets, and misplaced PDF references. Additional lessons explicitly discuss the PDF’s power-set and LLN-bound typos and the return-time reindexing.

React · TypeScript · Vite · PDF.js · KaTeX · Dexie · Zustand.
