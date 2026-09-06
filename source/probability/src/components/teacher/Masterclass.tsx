import { useEffect, useRef, useState, type ReactNode } from 'react';
import { PAGE_LESSONS } from '../../data/masterclass';
import { NOTATION } from '../../data/masterclass/notation';
import { PAGE_NOTES } from '../../data/pageNotes';
import { conceptsOnPage } from '../../data/course';
import { useApp } from '../../store';
import { Rich, Tex } from '../Math';
import { LABS } from '../labs';
import { PAGE_VISUALS, VIS } from '../visuals';
import { AnimationControlContext } from '../../lib/anim';
import { readPageReviews, schedulePage, REVIEW_KEY, type RecallGrade } from '../../engine/pageReview';
import './masterclass.css';
import { AssumptionLab } from './AssumptionLab';

const stages = ['Understand', 'Experiment', 'Challenge', 'Recall', 'Practice'] as const;
export function Masterclass({ page, children, deepContent }: { page: number; children?: ReactNode; deepContent?: ReactNode }) {
  const lesson = PAGE_LESSONS[page];
  const root = useRef<HTMLElement>(null);
  const concepts = conceptsOnPage(page);
  const [stage, setStage] = useState<typeof stages[number]>('Understand');
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState('');
  const [allSymbols, setAllSymbols] = useState(false);
  const [playing, setPlaying] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [speed, setSpeed] = useState(1);
  const [seek, setSeek] = useState(0);
  const [reviews, setReviews] = useState(() => { try { return readPageReviews(localStorage.getItem(REVIEW_KEY)); } catch { return {}; } });
  const [draft, setDraft] = useState(reviews[page]?.draft ?? '');
  const [answer, setAnswer] = useState('');
  const [graded, setGraded] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [reveal, setReveal] = useState(false);
  const noteSpot = useApp(s => s.noteSpot);
  useEffect(() => {
    root.current?.closest('.teach-pane')?.scrollTo({ top: 0 });
  }, [page, stage]);
  useEffect(() => {
    if (noteSpot?.page === page) root.current?.querySelector('[data-note="' + noteSpot.idx + '"]')?.scrollIntoView({ block: 'center' });
  }, [noteSpot, page, stage]);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bath-page-draft-v1-' + page) ?? '{}');
      if (typeof saved.recall === 'string') setDraft(saved.recall);
      if (typeof saved.answer === 'string') setAnswer(saved.answer);
    } catch { /* an invalid draft does not prevent studying */ }
  }, [page]);
  const saveDraft = (value: string, kind: 'answer' | 'recall') => {
    if (kind === 'answer') setAnswer(value); else { setDraft(value); setGraded(false); }
    try {
      localStorage.setItem('bath-page-draft-v1-' + page, JSON.stringify({
        answer: kind === 'answer' ? value : answer, recall: kind === 'recall' ? value : draft,
      }));
      setSaveError(false);
    } catch { setSaveError(true); }
  };
  useEffect(() => { if (noteSpot?.page === page) setStage('Understand'); }, [noteSpot, page]);
  const due = Object.values(reviews).filter(r => r.due <= Date.now()).sort((a,b) => a.due-b.due);
  const grade = (g: RecallGrade) => {
    let current = reviews;
    try { current = { ...reviews, ...readPageReviews(localStorage.getItem(REVIEW_KEY)) }; } catch { /* session fallback */ }
    const updated = { ...current, [page]: schedulePage(current[page], page, g, draft) };
    setReviews(updated); setGraded(true);
    try { localStorage.setItem(REVIEW_KEY, JSON.stringify(updated)); } catch { setSaveError(true); }
  };
  const visuals = PAGE_VISUALS[page] ?? [];
  const labs = [...new Set(concepts.map(c => c.lab).filter(Boolean))];
  return <article className="masterclass" ref={root}>
    <header className="mc-head">
      <div className="mc-eyebrow">YOUR PAGE COMPANION <span>PDF {page} / 98 {page >= 4 && ('· printed ' + (page-3))}</span></div>
      <h2>{lesson.title}</h2><Rich text={lesson.goal}/>
      <div className="mc-page-controls"><button className="btn sm" disabled={page === 1} onClick={() => useApp.getState().setPdfPage(page-1)}>← Previous</button>
        <label>Page <select aria-label="Lesson page" value={page} onChange={e => useApp.getState().setPdfPage(Number(e.target.value))}>{Object.entries(PAGE_LESSONS).map(([p,l]) => <option key={p} value={p}>{p} · {l.title}</option>)}</select></label>
        <button className="btn sm" disabled={page === 98} onClick={() => useApp.getState().setPdfPage(page+1)}>Next →</button></div>
      {page >= 93 && <div className="notice">The 2024 notes mark Chapter 7 as extension material. Page 93 also finishes the LLN discussion; check your current module guidance.</div>}
      <nav className="mc-stages" aria-label="Learning stages">{stages.map((s,i) => <button key={s} aria-current={stage === s ? 'step' : undefined} onClick={() => setStage(s)}><small>0{i+1}</small>{s}</button>)}</nav>
    </header>
    <div className="mc-body" key={stage}>
    {stage === 'Understand' && <>
      <div className="mc-label">BUILD THE IDEA</div>
      {lesson.reasoning.map((r,i) => <section className="mc-reason" key={i}><span className="mc-number">{i+1}</span><Rich text={r}/></section>)}
      {lesson.correction && <div className="mc-correction"><strong>Read the PDF carefully</strong><Rich text={lesson.correction}/></div>}
      <h3>Decode this page, line by line</h3>
      {(PAGE_NOTES[page] ?? []).map((n,i) => <details className="mc-detail" data-note={i} key={i} open={noteSpot?.page === page && noteSpot.idx === i || undefined}><summary>{n.ref}</summary><Rich text={n.what}/>{n.tex && <Tex tex={n.tex} display/>}</details>)}
      {concepts.map(c => <details className="mc-detail" key={c.id}><summary>Go deeper · {c.title}</summary><Rich text={c.levels.human}/><h4>University reasoning</h4><Rich text={c.levels.uni}/><h4>Beyond the page</h4><Rich text={c.levels.deep}/>{c.formulas.map(f => <div className="mc-formula" key={f.id}><strong>{f.name}</strong><Tex tex={f.tex} display/>{f.parts?.map((p,i) => <p key={i}><Tex tex={p.sym}/> — {p.meaning}</p>)}{f.note && <Rich text={f.note}/>}</div>)}</details>)}
      {deepContent}
      <div className="mc-trap"><strong>A mistake to catch</strong><Rich text={lesson.trap}/></div>
      <details className="mc-detail"><summary>Symbol dictionary · read every sign</summary><input aria-label="Search notation" placeholder="Search a symbol or meaning…" value={query} onChange={e => setQuery(e.target.value)}/><label className="mc-check"><input type="checkbox" checked={allSymbols} onChange={e => setAllSymbols(e.target.checked)}/> Include the whole course</label>{NOTATION.filter(n => (allSymbols || page >= n.from && page <= n.to) && (n.name + n.symbol + n.meaning).toLowerCase().includes(query.toLowerCase())).map(n => <details className="mc-symbol" key={n.symbol}><summary><Tex tex={n.symbol}/> · {n.name}</summary><p>{n.meaning}</p><Rich text={n.example}/></details>)}</details>
      <button className="btn primary" onClick={() => setStage('Experiment')}>Make the idea move →</button>
    </>}
    {stage === 'Experiment' && <>
      <div className="mc-label">PREDICT → CHANGE → EXPLAIN</div><p>Before touching a control, predict what will change. Then explain why the result agrees or disagrees with your prediction.</p>
      {visuals.length > 0 && <><div className="mc-animation-controls"><button className="btn sm" onClick={() => setPlaying(!playing)}>{playing ? 'Pause animations' : 'Play animations'}</button><button className="btn sm" onClick={() => { setSeek(seek+1); setPlaying(false); }}>Step +1s</button><label>Speed <select value={speed} onChange={e => setSpeed(Number(e.target.value))}><option value={0.5}>½×</option><option value={1}>1×</option><option value={2}>2×</option></select></label></div>
      <AnimationControlContext.Provider value={{playing,speed,seek}}>{visuals.map((v,i) => { const C = VIS[v.vis]; return C ? <figure className="mc-visual" key={i}><C {...(v.props ?? {})}/><figcaption>{v.caption}</figcaption>{v.tex && <Tex tex={v.tex} display/>}</figure> : null; })}</AnimationControlContext.Provider></>}
      <AssumptionLab page={page}/>{labs.map(id => { const lab = LABS[id!]; return lab ? <section className="mc-lab" key={id}><h3>{lab.title}</h3><lab.C/></section> : null; })}
      {!labs.length && <div className="mc-trap"><strong>Try a thought experiment</strong><Rich text={lesson.question}/><p>Change one assumption. Which step of your argument stops working?</p></div>}
      <button className="btn primary" onClick={() => setStage('Challenge')}>Try a transfer problem →</button>
    </>}
    {stage === 'Challenge' && <>
      <div className="mc-label">AN ORIGINAL TRANSFER PROBLEM</div><h3>Can you use it without a template?</h3><Rich text={lesson.question}/>
      <label className="mc-answer">Your reasoning<textarea rows={6} value={answer} onChange={e => saveDraft(e.target.value, 'answer')} placeholder="State the model, justify your method, then calculate. This answer is self-assessed."/></label>
      <p className="muted small">{saveError ? 'Browser storage unavailable; keep a separate copy before leaving.' : 'Your draft saves locally as you type.'}</p>
      <p className="muted small">Reveal one step at a time and compare the reasoning, not just the final number.</p>
      {lesson.solution.slice(0,step).map((s,i) => <section className="mc-reason" key={i}><span className="mc-number">{i+1}</span><Rich text={s}/></section>)}
      <div className="mc-actions"><button className="btn primary" disabled={step === lesson.solution.length} onClick={() => setStep(step+1)}>Reveal step {Math.min(step+1,lesson.solution.length)} / {lesson.solution.length}</button><button className="btn" onClick={() => { setStage('Recall'); setReveal(false); }}>Recall from memory →</button></div>
    </>}
    {stage === 'Recall' && <>
      <div className="mc-label">CLOSE THE NOTES. RETRIEVE THE IDEA.</div><h3>Teach this page back</h3><p>Explain the central idea, define its symbols, state the assumptions, and give a counterexample to a tempting mistake.</p>
      <label className="mc-answer">Your explanation<textarea rows={8} value={draft} onChange={e => saveDraft(e.target.value, 'recall')} placeholder="Write from memory before showing the checklist…"/></label>
      <button className="btn" onClick={() => setReveal(!reveal)}>{reveal ? 'Hide checklist' : 'Show comparison checklist'}</button>
      {reveal && <div className="mc-trap"><Rich text={lesson.goal}/><Rich text={lesson.trap}/><p>Did you justify the method, use the right assumptions, and explain each symbol? Revisit Understand if any part is missing.</p></div>}
      <h4>Schedule another attempt</h4><p className="muted small">This is your self-assessment, not an exam score. Saved locally in this browser when you choose a rating.</p>
      <div className="mc-actions">{(['again','hard','good'] as const).map((g,i) => <button className="btn" key={g} disabled={graded || !draft.trim() || !reveal} onClick={() => grade(g)}>{['Again · 10 min','Hard · tomorrow','Good · spaced review'][i]}</button>)}</div>
      {graded && <p role="status">{saveError ? 'Storage unavailable: kept for this session only.' : ('Saved. Next review: ' + new Date(reviews[page].due).toLocaleString() + '.')}</p>}
      <h4>Due for retrieval · {due.length}</h4>{due.slice(0,8).map(r => <button className="btn sm" key={r.page} onClick={() => useApp.getState().setPdfPage(r.page)}>Page {r.page}</button>)}{!due.length && <p className="muted">No saved reviews are due yet.</p>}
    </>}
    {stage === 'Practice' && <><div className="mc-label">AUTOMATICALLY MARKED PRACTICE</div><p>Use generated questions to check accuracy. Combine this with written proofs and timed course questions.</p>{children ?? <p>The mathematical question bank starts on page 7.</p>}</>}
    </div>
  </article>;
}

