import { useState } from 'react';
import { useApp } from '../store';
import { CONCEPT_MAP } from '../data/course';
import { ERROR_MAP } from '../data/errors';
import { generateFor } from '../engine/questions';
import type { GeneratedQuestion } from '../data/types';
import { QuestionPlayer } from '../components/QuestionPlayer';
import { Rich } from '../components/Math';

export function MistakesView() {
  const { mistakes, conceptStates, resolveMistake } = useApp();
  const [redoQ, setRedoQ] = useState<{ q: GeneratedQuestion; mistakeId: number } | null>(null);
  const [showResolved, setShowResolved] = useState(false);

  const open = mistakes.filter(m => !m.resolved);
  const resolved = mistakes.filter(m => m.resolved);
  const due = open.filter(m => m.nextReview <= Date.now());
  const shown = showResolved ? resolved : open;

  const redo = (mistakeId: number, conceptId: string) => {
    const q = generateFor(conceptId, conceptStates[conceptId]);
    if (q) setRedoQ({ q, mistakeId });
  };

  if (redoQ) {
    return (
      <div className="page">
        <div className="page-head"><div><div className="kicker">Mistake rematch — same concept, fresh numbers</div><h2>Beat it this time</h2></div></div>
        <QuestionPlayer q={redoQ.q} mode="practice"
          onDone={r => void resolveMistake(redoQ.mistakeId, r.correct)}
          onNext={() => setRedoQ(null)} />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">Every mistake is a study object</div>
          <h2>Mistake bank</h2>
        </div>
        <div className="row">
          <span className="chip bad">{open.length} open</span>
          <span className="chip warn">{due.length} due for rematch</span>
          <button className="btn sm" onClick={() => setShowResolved(v => !v)}>{showResolved ? 'Show open' : `Victories (${resolved.length})`}</button>
        </div>
      </div>

      {shown.length === 0 && (
        <div className="card card-pad" style={{ textAlign: 'center', padding: 40 }}>
          <p className="muted">{showResolved ? 'No conquered mistakes yet — beat a rematch twice to move one here.' : 'No open mistakes. Go make some — that\'s how this works!'}</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.slice(0, 30).map(m => {
          const err = ERROR_MAP[m.errorId];
          const c = CONCEPT_MAP[m.conceptId];
          return (
            <div key={m.id} className="card card-pad">
              <div className="row spread">
                <span className="row">
                  <span className="chip known">{c?.title}</span>
                  {err && <span className={`chip ${err.category === 'careless' ? '' : 'bad'}`}>{err.label}</span>}
                </span>
                <span className="tiny faint">{new Date(m.at).toLocaleDateString()} {m.repeats > 0 && `· beaten ${m.repeats}×`}</span>
              </div>
              <div className="small mt" style={{ maxHeight: 72, overflow: 'hidden' }}><Rich text={m.prompt} /></div>
              <div className="row mt tiny" style={{ gap: 14 }}>
                <span style={{ color: 'var(--bad)' }}>you: <Rich text={m.yourAnswer} /></span>
                <span style={{ color: 'var(--good)' }}>correct: <Rich text={m.correctAnswer} /></span>
              </div>
              {!m.resolved && (
                <div className="row mt">
                  <button className="btn sm primary" onClick={() => redo(m.id!, m.conceptId)}>Rematch (new numbers)</button>
                  {m.nextReview <= Date.now() && <span className="chip warn">due now</span>}
                  {c && <span className="tiny faint">notes p{c.pdfPages[0]}–{c.pdfPages[1]}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
