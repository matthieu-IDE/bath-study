import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../store';
import { CONCEPT_MAP, conceptsOnPage } from '../../data/course';
import { MNEMONICS } from '../../data/mnemonics';
import type { Concept, WorkedExample } from '../../data/types';
import { generateFor } from '../../engine/questions';
import { puzzleFor } from '../../engine/questions/puzzles';
import { weakestPrereq } from '../../engine/mastery';
import { LABS } from '../labs';
import { FormulaExplorer } from '../FormulaExplorer';
import { QuestionPlayer } from '../QuestionPlayer';
import { Rich, Tex } from '../Math';
import { PAGE_VISUALS, VIS, type PageVisual } from '../visuals';
import { PAGE_NOTES } from '../../data/pageNotes';
import { Icon } from '../Icon';
import { sfx } from '../../lib/sound';
import { Masterclass } from './Masterclass';

type Stage = 'watch' | 'play' | 'maths' | 'questions';
const STAGES: { id: Stage; label: string }[] = [
  { id: 'watch', label: 'Watch' },
  { id: 'play', label: 'Play' },
  { id: 'maths', label: 'The maths' },
  { id: 'questions', label: 'Questions' },
];

export function TeacherPanel() {
  const { pdfPage, teacherFocus, focusConcept, conceptStates, nav } = useApp();
  const pageConcepts = conceptsOnPage(pdfPage);
  // the tutor always follows the page: a pinned concept only holds while it lives on this page
  const focusId = teacherFocus && pageConcepts.some(c => c.id === teacherFocus)
    ? teacherFocus
    : pageConcepts[0]?.id ?? null;
  const concept = focusId ? CONCEPT_MAP[focusId] : null;

  useEffect(() => {
    if (teacherFocus && !pageConcepts.some(c => c.id === teacherFocus)) focusConcept(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfPage]);

  if (!concept) return <div className="teach-pane"><Masterclass key={pdfPage} page={pdfPage}/></div>;
  return (
    <div className="teach-pane">
      <Masterclass key={pdfPage} page={pdfPage} deepContent={pageConcepts.map(c => <div key={c.id}>
        {c.proof && <details className="mc-detail"><summary>Reconstruct a proof · {c.proof.name}</summary><ProofExplorer concept={c}/></details>}
        {c.worked?.map(w => <details className="mc-detail" key={w.id}><summary>Worked reasoning · {w.title}</summary><WorkedPlayer w={w}/></details>)}
      </div>)}>
        <div className="mc-actions">{pageConcepts.map(c => <button className="btn sm" aria-pressed={concept.id === c.id} key={c.id} onClick={() => focusConcept(c.id)}>{c.title}</button>)}</div>
        <QuestionsStage key={concept.id} concept={concept} state={conceptStates[concept.id]} onFocus={focusConcept} onNavPractice={() => nav('practice', concept.id)}/>
        <button className="btn" onClick={() => nav('practice', concept.id)}>Open full practice</button>
      </Masterclass>
    </div>
  );
}

export function ConceptLesson({ concept, page, onNavPractice, states, pageConcepts, onFocus, initialStage = 'watch' }: {
  initialStage?: Stage;
  concept: Concept;
  page: number;
  onNavPractice: () => void;
  states: Record<string, any>;
  pageConcepts: Concept[];
  onFocus: (id: string) => void;
}) {
  const [stage, setStage] = useState<Stage>(initialStage);
  const [visited, setVisited] = useState<Set<Stage>>(new Set(['watch']));
  const [whyCare, setWhyCare] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);
  const visuals = PAGE_VISUALS[page] ?? [];
  const noteSpot = useApp(s => s.noteSpot);
  const spot = noteSpot && noteSpot.page === page ? noteSpot : null;

  // a PDF selection asked for a specific decode line — jump to it
  useEffect(() => {
    if (spot) {
      setStage('maths');
      setVisited(v => new Set(v).add('maths'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot?.k]);

  const state = states[concept.id];
  const gap = weakestPrereq(concept.id, states);
  const lab = concept.lab ? LABS[concept.lab] : null;
  const mn = MNEMONICS[concept.id];
  const stageIdx = STAGES.findIndex(s => s.id === stage);

  const goStage = (s: Stage) => {
    setStage(s);
    setVisited(v => new Set(v).add(s));
    sfx.click();
    headRef.current?.closest('.teach-pane')?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const next = () => { if (stageIdx < STAGES.length - 1) goStage(STAGES[stageIdx + 1].id); };

  return (
    <div className="teach-inner" ref={headRef}>
      {/* header */}
      <div className="lesson-head" style={{ paddingBottom: 6 }}>
        <h3 style={{ fontSize: 19 }}>{concept.title}</h3>
        {!concept.examinable && (
          <div className="notice warn">Not examinable — the lecturer added this after the exam. Depth only.</div>
        )}
        {gap && (
          <div className="notice violet">
            Likely blocker: your <strong>{CONCEPT_MAP[gap].title}</strong> is shaky.
            <div><button className="btn sm mt" onClick={() => onFocus(gap)}>Fix that first</button></div>
          </div>
        )}
        <div className="stage-tabs">
          {STAGES.map(s => (
            <button key={s.id} className={`stage-tab ${stage === s.id ? 'active' : visited.has(s.id) ? 'visited' : ''}`}
              onClick={() => goStage(s.id)}>
              {s.label}
            </button>
          ))}
          <span className="stage-ind" style={{ left: `${stageIdx * 25}%` }} />
        </div>
      </div>

      {/* ---------------- STAGE 1: watch — this page, animated ---------------- */}
      {stage === 'watch' && (
        <div className="fade-up">
          <div className="analogy-card" style={{ marginTop: 10, padding: '13px 16px', fontSize: 14 }}>
            <Rich text={concept.levels.eli5} emphasize={concept.keywords} />
          </div>
          <PredictGate key={page} visuals={visuals}>
            {visuals.map((v, i) => {
              const C = VIS[v.vis];
              if (!C) return null;
              return (
                <div key={`${page}-${i}`} className="visual-frame">
                  <C {...(v.props ?? {})} />
                  <div className="visual-cap">{v.caption}</div>
                  {v.tex && <div className="visual-tex"><Tex tex={v.tex} display /></div>}
                </div>
              );
            })}
          </PredictGate>
          {mn && (
            <div className="picture-line">
              <Icon name="eye" size={15} style={{ color: 'var(--cond)', marginTop: 2 }} />
              <span><strong>Remember it:</strong> {mn.hook}</span>
            </div>
          )}
          <div className="row mt">
            <button className="btn sm ghost" onClick={() => setWhyCare(v => !v)}>Why care?</button>
            {whyCare && <span className="small muted pop">{concept.whyCare}</span>}
          </div>
        </div>
      )}

      {/* ---------------- STAGE 2: play ---------------- */}
      {stage === 'play' && (
        <div className="fade-up">
          <p className="small muted" style={{ margin: '10px 0 0' }}>
            {lab ? 'Don\'t read — touch. Change things and predict what happens before it does.' : 'Explore each piece of the formula — hover the parts.'}
          </p>
          {lab ? <lab.C /> : concept.formulas.slice(0, 1).map(f => <FormulaExplorer key={f.id} formula={f} />)}
        </div>
      )}

      {/* ---------------- STAGE 3: the maths ---------------- */}
      {stage === 'maths' && (
        <div className="fade-up">
          <PageNotes page={page} keywords={concept.keywords} spot={spot} />
          <details className="disclosure">
            <summary><span className="chev"><Icon name="right" size={13} /></span><Icon name="user" size={14} style={{ color: 'var(--muted)' }} /> Plain English first</summary>
            <div className="disclosure-body level-body"><Rich text={concept.levels.human} emphasize={concept.keywords} /></div>
          </details>
          <div className="section">
            <div className="section-title">Formally, as the notes say it</div>
            <div className="level-body"><Rich text={concept.levels.uni} emphasize={concept.keywords} /></div>
          </div>
          {concept.formulas.map(f => <FormulaExplorer key={f.id} formula={f} />)}
          <details className="disclosure">
            <summary><span className="chev"><Icon name="right" size={13} /></span><Icon name="brain" size={14} style={{ color: 'var(--muted)' }} /> Why it works — the deep version</summary>
            <div className="disclosure-body level-body"><Rich text={concept.levels.deep} emphasize={concept.keywords} /></div>
          </details>
          {concept.proof && <ProofExplorer concept={concept} />}
          {concept.worked?.map(w => <WorkedPlayer key={w.id} w={w} />)}
        </div>
      )}

      {/* ---------------- STAGE 4: questions (gated) ---------------- */}
      {stage === 'questions' && <QuestionsStage concept={concept} state={state} onFocus={onFocus} onNavPractice={onNavPractice} />}

      {/* nav */}
      <div className="lesson-nav">
        {stage !== 'questions' ? (
          <button className="btn primary lesson-next" onClick={next}>
            {stage === 'maths' ? 'I\'ve got it — questions' : 'Next'} <Icon name="right" size={14} />
          </button>
        ) : (
          <button className="btn primary lesson-next" onClick={onNavPractice}>Full practice mode</button>
        )}
      </div>

      {pageConcepts.length > 1 && (
        <div className="row" style={{ paddingTop: 12 }}>
          {pageConcepts.filter(c => c.id !== concept.id).map(c => (
            <button key={c.id} className="chip clickable" onClick={() => onFocus(c.id)}>{c.title}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- everything printed on this PDF page, decoded item by item ---- */
function PageNotes({ page, keywords, spot }: { page: number; keywords: string[]; spot: { idx: number; k: number } | null }) {
  const { noteTicks, toggleNoteTick, showToast } = useApp();
  const notes = PAGE_NOTES[page] ?? [];
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spot) return;
    const el = listRef.current?.querySelector(`[data-idx="${spot.idx}"]`);
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spot ? spot.k : -1, page]);

  if (!notes.length) return null;
  const doneCount = notes.reduce((a, _, i) => a + (noteTicks[`${page}:${i}`] ? 1 : 0), 0);

  const tick = (i: number) => {
    const turningOn = !noteTicks[`${page}:${i}`];
    toggleNoteTick(page, i);
    if (turningOn && doneCount === notes.length - 1) {
      sfx.correct();
      showToast(`Page ${page} fully decoded`);
    } else sfx.click();
  };

  return (
    <div className="section" style={{ borderTop: 'none', paddingTop: 10 }} ref={listRef}>
      <div className="section-title">
        <Icon name="book" size={13} /> This page, line by line
        <span className="tiny faint" style={{ marginLeft: 'auto', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
          {doneCount === notes.length ? 'complete' : `${doneCount}/${notes.length}`}
        </span>
      </div>
      {notes.map((n, i) => {
        const on = !!noteTicks[`${page}:${i}`];
        const isSpot = spot?.idx === i;
        return (
          <div key={isSpot ? `${page}-${i}-${spot!.k}` : `${page}-${i}`} data-idx={i}
            className={`pagenote ${isSpot ? 'spot' : ''} ${on ? 'done' : ''}`}>
            <span className="pagenote-ref">{n.ref}</span>
            <div className="pagenote-body level-body">
              <Rich text={n.what} emphasize={keywords} />
              {n.tex && <div className="pagenote-tex"><Tex tex={n.tex} display /></div>}
            </div>
            <button className={`note-tick ${on ? 'on' : ''}`}
              title={on ? 'Understood — click to untick' : 'Mark understood'}
              onClick={() => tick(i)}>
              <Icon name="check" size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ---- predict-before-reveal: commit to an answer, then watch ---- */
const PREDICT_ANSWERED = new Set<string>();

function PredictGate({ visuals, children }: { visuals: PageVisual[]; children: React.ReactNode }) {
  const spec = visuals.find(v => v.predict)?.predict;
  const q = spec?.q ?? '';
  const [picked, setPicked] = useState<number | null>(null);
  const [open, setOpen] = useState(() => !!spec && !PREDICT_ANSWERED.has(q));

  if (!spec || !open) return <>{children}</>;
  const answered = picked !== null;
  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    PREDICT_ANSWERED.add(q);
    i === spec.correct ? sfx.correct() : sfx.wrong();
  };

  return (
    <>
      <div className="predict-card" style={{ marginTop: 10 }}>
        <div className="predict-k">Predict first</div>
        <div className="small bold" style={{ marginTop: 4 }}><Rich text={spec.q} /></div>
        <div className="row" style={{ gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {spec.options.map((o, i) => {
            let cls = 'btn sm';
            if (answered) {
              if (i === spec.correct) cls += ' predict-right';
              else if (i === picked) cls += ' predict-wrong';
            }
            return <button key={i} className={cls} disabled={answered} onClick={() => pick(i)}><Rich text={o} /></button>;
          })}
          {!answered && (
            <button className="btn sm ghost" onClick={() => { PREDICT_ANSWERED.add(q); setOpen(false); sfx.click(); }}>
              Just show me
            </button>
          )}
        </div>
        {answered && (
          <div className="small" style={{ marginTop: 9 }}>
            <span style={{ color: picked === spec.correct ? 'var(--good)' : 'var(--bad)', fontWeight: 650 }}>
              {picked === spec.correct ? 'Called it. ' : 'Not quite — '}
            </span>
            <span className="muted"><Rich text={spec.why} /></span>
          </div>
        )}
      </div>
      {answered && children}
    </>
  );
}

/* ---- questions stage: gentle first, then climb into street-level puzzles ---- */
function QuestionsStage({ concept, state, onFocus, onNavPractice }: {
  concept: Concept; state: any; onFocus: (id: string) => void; onNavPractice: () => void;
}) {
  const usedPuzzles = useRef<Set<string>>(new Set());
  // prefer a standard generator while ramping; puzzles are earned via the streak slot
  const gen = (level: number) => {
    for (let i = 0; i < 4; i++) {
      const g = generateFor(concept.id, state, level as any);
      if (g && !g.templateId.startsWith('pz-')) return g;
    }
    return generateFor(concept.id, state, level as any);
  };
  const [q, setQ] = useState(() => gen(1) ?? puzzleFor(concept.id));
  const [count, setCount] = useState(0);
  const [streak, setStreak] = useState(0);
  void onFocus; void onNavPractice;
  const isPuzzle = !!q && q.templateId.startsWith('pz-');

  const advance = (correct: boolean) => {
    const c = count + 1;
    const s = correct ? streak + 1 : 0;
    setCount(c); setStreak(s);
    // two in a row correct → every other question is a street-level puzzle
    if (s >= 2 && c % 2 === 0) {
      const p = puzzleFor(concept.id, usedPuzzles.current);
      if (p) { usedPuzzles.current.add(p.templateId); setQ(p); return; }
    }
    const level = correct ? Math.min(5, c + 1) : 2;
    setQ(gen(level) ?? puzzleFor(concept.id, usedPuzzles.current));
  };

  return (
    <div className="fade-up">
      {q ? (
        <div className="section" style={{ borderTop: 'none', paddingTop: 12 }}>
          {q.conceptId !== concept.id && <p className="muted small">Related chapter practice · {CONCEPT_MAP[q.conceptId]?.title ?? q.conceptId}. Use this page’s Challenge for its specific transfer problem.</p>}
          {isPuzzle && <div className="puzzle-tag">Street level — above the exam</div>}
          <QuestionPlayer q={q} mode="practice" compact askConfidence={count > 0}
            onNext={r => advance(r.correct)} />
        </div>
      ) : (
        <p className="small muted mt">No generator for this concept yet — use Full practice for neighbouring topics.</p>
      )}
    </div>
  );
}

/* ---- worked example: reveal one step at a time ---- */
function WorkedPlayer({ w }: { w: WorkedExample }) {
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const done = step >= w.steps.length;
  return (
    <div className="section">
      <div className="section-title"><Icon name="play" size={13} /> Worked example {w.fromPdf ? `· ${w.fromPdf}` : ''}</div>
      <div className="small"><Rich text={w.prompt} /></div>
      {w.steps.slice(0, step).map((s, i) => (
        <div key={i} className="mt" style={{ borderTop: '1px dashed var(--line)', paddingTop: 8 }}>
          <div className="tiny muted">Step {i + 1} · {s.ask}</div>
          <div className="small mt"><Rich text={s.answerTex ?? ''} /></div>
          {s.explain && <div className="tiny muted mt">{s.explain}</div>}
          {s.markNote && <div className="tiny mt" style={{ color: 'var(--known)' }}>{s.markNote}</div>}
        </div>
      ))}
      {!done && (
        <div className="mt" style={{ borderTop: '1px dashed var(--line)', paddingTop: 8 }}>
          <div className="small bold">Step {step + 1}: {w.steps[step].ask}</div>
          {!revealed ? (
            <button className="btn sm primary mt" onClick={() => setRevealed(true)}>Reveal</button>
          ) : (
            <div className="pop">
              <div className="small mt sol-box"><Rich text={w.steps[step].answerTex ?? ''} /></div>
              {w.steps[step].explain && <div className="tiny muted mt">{w.steps[step].explain}</div>}
              {w.steps[step].markNote && <div className="tiny mt" style={{ color: 'var(--known)' }}>{w.steps[step].markNote}</div>}
              <button className="btn sm mt" onClick={() => { setStep(s => s + 1); setRevealed(false); sfx.click(); }}>
                {step + 1 >= w.steps.length ? 'Finish' : 'Next step'}
              </button>
            </div>
          )}
        </div>
      )}
      {done && <div className="feedback-banner ok mt">Complete — the Questions stage asks it with different numbers.</div>}
    </div>
  );
}

/* ---- proof explorer ---- */
function ProofExplorer({ concept }: { concept: Concept }) {
  const p = concept.proof!;
  const [depth, setDepth] = useState(0);
  const [guessShown, setGuessShown] = useState(false);
  const hidden = p.missingStepIdx ?? 1;
  return (
    <div className="section">
      <div className="section-title"><Icon name="map" size={13} /> Proof · {p.name}</div>
      <div className="small"><strong>Big idea:</strong> {p.bigIdea}</div>
      {p.visual && depth >= 1 && <div className="tiny muted mt">{p.visual}</div>}
      {depth >= 1 && (
        <ol className="small mt" style={{ paddingLeft: 20, margin: 0 }}>
          {p.skeleton.map((s, i) => (
            <li key={i} style={{ marginBottom: 5 }}>
              {depth === 2 && i === hidden && !guessShown
                ? <em style={{ color: 'var(--warn)' }}>your turn — what goes here?</em>
                : <Rich text={s} />}
            </li>
          ))}
        </ol>
      )}
      <div className="row mt">
        {depth === 0 && <button className="btn sm" onClick={() => setDepth(1)}>Show skeleton</button>}
        {depth === 1 && <button className="btn sm" onClick={() => { setDepth(2); setGuessShown(false); }}>Hide a step — test me</button>}
        {depth === 2 && !guessShown && <button className="btn sm primary" onClick={() => setGuessShown(true)}>Reveal step {hidden + 1}</button>}
        {depth >= 1 && <span className="tiny faint">full proof: notes p{p.pdfPage}</span>}
      </div>
    </div>
  );
}
