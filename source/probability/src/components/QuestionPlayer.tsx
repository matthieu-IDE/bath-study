import { useEffect, useMemo, useRef, useState } from 'react';
import type { Attempt, Confidence, GeneratedQuestion } from '../data/types';
import { ERROR_MAP } from '../data/errors';
import { CONCEPT_MAP } from '../data/course';
import { approxEqual, parseNumeric } from '../lib/utils';
import { sfx } from '../lib/sound';
import { useApp } from '../store';
import { Rich } from './Math';

export interface PlayResult {
  correct: boolean;
  errorId?: string;
  hintsUsed: number;
  confidence: Confidence | null;
}

interface Props {
  q: GeneratedQuestion;
  mode: Attempt['mode'];
  askConfidence?: boolean;
  allowHints?: boolean;
  record?: boolean;
  compact?: boolean;
  onDone?: (r: PlayResult) => void;
  onNext?: (r: PlayResult) => void;
  extraActions?: React.ReactNode;
}

const CONF: { id: Confidence; label: string }[] = [
  { id: 'guess', label: 'Guessing' },
  { id: 'fifty', label: '50/50' },
  { id: 'sure', label: 'Pretty sure' },
  { id: 'certain', label: 'Certain' },
];

export function QuestionPlayer({ q, mode, askConfidence = true, allowHints = true, record = true, compact, onDone, onNext, extraActions }: Props) {
  const { recordAttempt } = useApp();
  const [picked, setPicked] = useState<number | null>(null);
  const [numAnswer, setNumAnswer] = useState('');
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [submitted, setSubmitted] = useState<PlayResult | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  const start = useRef(Date.now());

  useEffect(() => {
    setPicked(null); setNumAnswer(''); setConfidence(null); setHintsUsed(0);
    setSubmitted(null); setShowSolution(false); setShowMarks(false);
    start.current = Date.now();
  }, [q.id]);

  const needConfidence = askConfidence && confidence === null;

  const submit = async () => {
    if (submitted) return;
    let correct = false;
    let errorId: string | undefined;
    let yourAnswer = '';
    if (q.kind === 'numeric') {
      const v = parseNumeric(numAnswer);
      yourAnswer = numAnswer || '(blank)';
      if (v === null) { correct = false; errorId = 'arithmetic'; }
      else {
        correct = approxEqual(v, q.numeric!.answer, q.numeric!.tol);
        if (!correct) {
          const target = q.numeric!.answer;
          if (approxEqual(v, 1 - target, q.numeric!.tol) && target <= 1) errorId = 'complement-forgot';
          else if (target !== 0 && approxEqual(v, -target, 1e-6)) errorId = 'cov-sign';
          else errorId = 'arithmetic';
        }
      }
    } else {
      if (picked === null) return;
      const ch = q.choices![picked];
      correct = !!ch.correct;
      errorId = ch.errorId;
      yourAnswer = ch.tex;
    }
    const res: PlayResult = { correct, errorId, hintsUsed, confidence };
    setSubmitted(res);
    correct ? sfx.correct() : sfx.wrong();
    if (record) {
      await recordAttempt(q, correct, confidence, hintsUsed, Date.now() - start.current, mode, yourAnswer, errorId);
    }
    onDone?.(res);
  };

  const err = submitted?.errorId ? ERROR_MAP[submitted.errorId] : null;
  const concept = CONCEPT_MAP[q.conceptId];
  const diffLabel = ['intuition', 'easy', 'standard', 'exam level', 'hard', 'distinction'][q.difficulty];
  const tileGrid = !!q.choices && q.choices.length <= 4 &&
    q.choices.every(c => c.tex.replace(/\$[^$]*\$/g, 'XXXX').length <= 30 && !c.tex.includes('\n'));

  return (
    <div className={compact ? '' : 'q-card fade-up'} key={q.id}>
      {!compact && (
        <div className="row spread mb" style={{ marginBottom: 8 }}>
          <span className="row" style={{ gap: 6 }}>
            {concept && <span className="chip known">{concept.title}</span>}
            <span className={`chip ${q.difficulty >= 4 ? 'bad' : q.difficulty >= 3 ? 'warn' : ''}`}>L{q.difficulty} · {diffLabel}</span>
          </span>
          <span className="tiny faint" title="Answer computed and verified by the app">verified</span>
        </div>
      )}

      <div className="q-prompt"><Rich text={q.prompt} /></div>

      {q.kind === 'numeric' ? (
        <div className="row mt">
          <input type="text" placeholder="answer (e.g. 0.25 or 3/8)" value={numAnswer}
            onChange={e => setNumAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !needConfidence && submit()}
            disabled={!!submitted}
            style={{ maxWidth: 220, fontFamily: 'var(--mono)' }} />
        </div>
      ) : (
        <div className={`choices ${tileGrid ? 'tile-grid' : ''}`}>
          {q.choices!.map((c, i) => {
            let cls = 'choice';
            if (submitted) {
              if (c.correct) cls += ' correct';
              else if (picked === i) cls += ' wrong';
            } else if (picked === i) cls += ' picked';
            return (
              <button key={i} className={cls} disabled={!!submitted} onClick={() => { setPicked(i); sfx.click(); }}>
                <Rich text={c.tex} />
                {submitted && (c.correct || picked === i) && c.why && (
                  <div className="tiny mt" style={{ color: c.correct ? 'var(--good)' : 'var(--bad)', fontWeight: 500 }}>{c.why}</div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {!submitted && askConfidence && (q.kind === 'numeric' ? numAnswer.trim() !== '' : picked !== null) && (
        <div className="conf-row">
          {CONF.map(c => (
            <button key={c.id} className={`conf-btn ${confidence === c.id ? 'on' : ''}`} onClick={() => setConfidence(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {!submitted && (
        <div className="row mt spread">
          <div className="row">
            <button className="btn primary" disabled={(q.kind === 'numeric' ? numAnswer.trim() === '' : picked === null) || needConfidence} onClick={submit}>
              Submit {needConfidence && '(rate confidence first)'}
            </button>
            {allowHints && hintsUsed < 3 && (
              <button className="btn" onClick={() => { setHintsUsed(h => h + 1); sfx.click(); }}>
                Hint{hintsUsed > 0 ? ` (${hintsUsed}/3)` : ''}
              </button>
            )}
          </div>
          {extraActions}
        </div>
      )}

      {allowHints && hintsUsed > 0 && !submitted && (
        <div>
          {q.hints.slice(0, hintsUsed).map((h, i) => (
            <div key={i} className="hint-box pop"><strong>Hint {i + 1}.</strong> <Rich text={h} /></div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="fade-up">
          <div className={`feedback-banner ${submitted.correct ? 'ok' : 'no'}`}>
            {submitted.correct
              ? <>✓ Correct{hintsUsed > 0 ? ` (with ${hintsUsed} hint${hintsUsed > 1 ? 's' : ''})` : ''}{confidence === 'certain' ? ' — and you knew it. Mastery.' : confidence === 'guess' ? ' — but you were guessing: worth a revisit.' : ''}</>
              : <>✗ Not this time{confidence === 'certain' || confidence === 'sure' ? ' — and you felt confident: that makes this a PRIORITY fix.' : ''}</>}
          </div>
          {!submitted.correct && err && (
            <div className="hint-box mt">
              <div className="bold">Diagnosis: {err.label}</div>
              <div className="small" style={{ marginTop: 4 }}>{err.description}</div>
              <div className="small mt"><strong>Fix:</strong> {err.fix}</div>
              {err.pdfPage && <div className="tiny muted mt">The notes warn about this on p{err.pdfPage}.</div>}
            </div>
          )}
          {q.kind === 'numeric' && !submitted.correct && (
            <div className="small mt">Correct answer: <Rich text={q.numeric!.answerTex} /></div>
          )}
          <div className="row mt">
            <button className="btn sm" onClick={() => setShowSolution(v => !v)}>{showSolution ? 'Hide solution' : 'Solution'}</button>
            {q.markScheme && <button className="btn sm" onClick={() => setShowMarks(v => !v)}>{showMarks ? 'Hide marks' : 'Mark scheme'}</button>}
          </div>
          {showSolution && (
            <div className="sol-box pop">
              {q.solution.map((s, i) => <div key={i} style={{ marginBottom: 5 }}><Rich text={s} /></div>)}
            </div>
          )}
          {showMarks && q.markScheme && (
            <div className="sol-box neutral pop">
              <div className="tiny bold" style={{ marginBottom: 5, color: 'var(--known)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Mark scheme — earn every step, not just the number</div>
              {q.markScheme.map((s, i) => <div key={i} className="small" style={{ marginBottom: 3 }}>• {s}</div>)}
            </div>
          )}
          {onNext && (
            <div className="row mt">
              <button className="btn primary" onClick={() => onNext(submitted)}>Next</button>
              {extraActions}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
