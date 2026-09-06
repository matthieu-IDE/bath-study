import { useMemo, useState } from 'react';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* Interactive Venn diagram: 4 regions toggle; expression quiz; De Morgan checker. */

type Region = 'onlyA' | 'both' | 'onlyB' | 'neither';
const ALL: Region[] = ['onlyA', 'both', 'onlyB', 'neither'];

const EXPRESSIONS: { tex: string; regions: Region[] }[] = [
  { tex: 'E\\cup F', regions: ['onlyA', 'both', 'onlyB'] },
  { tex: 'E\\cap F', regions: ['both'] },
  { tex: 'E^c', regions: ['onlyB', 'neither'] },
  { tex: 'E\\setminus F', regions: ['onlyA'] },
  { tex: '(E\\cup F)^c', regions: ['neither'] },
  { tex: 'E^c\\cap F^c', regions: ['neither'] },
  { tex: '(E\\cap F)^c', regions: ['onlyA', 'onlyB', 'neither'] },
  { tex: 'E^c\\cup F^c', regions: ['onlyA', 'onlyB', 'neither'] },
  { tex: '(E\\cap F^c)\\cup(E^c\\cap F)', regions: ['onlyA', 'onlyB'] },
];

export function VennLab() {
  const [on, setOn] = useState<Set<Region>>(new Set(['both']));
  const [quiz, setQuiz] = useState<number | null>(null);
  const [result, setResult] = useState<'right' | 'wrong' | null>(null);

  const toggle = (r: Region) => {
    sfx.click();
    setResult(null);
    setOn(prev => {
      const s = new Set(prev);
      s.has(r) ? s.delete(r) : s.add(r);
      return s;
    });
  };

  const matched = useMemo(
    () => EXPRESSIONS.filter(e => e.regions.length === on.size && e.regions.every(r => on.has(r))),
    [on],
  );

  const startQuiz = () => {
    const i = Math.floor(Math.random() * EXPRESSIONS.length);
    setQuiz(i);
    setOn(new Set());
    setResult(null);
  };
  const checkQuiz = () => {
    if (quiz === null) return;
    const target = EXPRESSIONS[quiz];
    const ok = target.regions.length === on.size && target.regions.every(r => on.has(r));
    setResult(ok ? 'right' : 'wrong');
    ok ? sfx.correct() : sfx.wrong();
  };

  const fill = (r: Region) => (on.has(r) ? 'var(--known)' : 'var(--bg2)');
  const fillOp = (r: Region) => (on.has(r) ? 0.55 : 1);

  return (
    <div className="lab">
      <h4>Venn playground <span className="lab-sub">click regions to shade them</span></h4>
      <svg viewBox="0 0 340 200" style={{ width: '100%', maxWidth: 420 }}>
        <rect x="4" y="4" width="332" height="192" rx="12" fill={fill('neither')} opacity={fillOp('neither')}
          stroke="var(--line2)" style={{ cursor: 'pointer', transition: 'fill .25s' }} onClick={() => toggle('neither')} />
        <defs>
          <clipPath id="clipA"><circle cx="135" cy="100" r="72" /></clipPath>
          <clipPath id="clipB"><circle cx="205" cy="100" r="72" /></clipPath>
        </defs>
        {/* only A */}
        <g clipPath="url(#clipA)">
          <rect x="0" y="0" width="205" height="200" fill={fill('onlyA')} opacity={fillOp('onlyA')} style={{ transition: 'fill .25s' }} />
          <rect x="133" y="0" width="210" height="200" fill={fill('onlyA')} opacity={fillOp('onlyA')} style={{ transition: 'fill .25s' }} />
        </g>
        <circle cx="135" cy="100" r="72" fill={fill('onlyA')} opacity={on.has('onlyA') ? 0.5 : 0.9}
          style={{ cursor: 'pointer', transition: 'fill .25s' }} onClick={() => toggle('onlyA')} />
        <circle cx="205" cy="100" r="72" fill={fill('onlyB')} opacity={on.has('onlyB') ? 0.5 : 0.9}
          style={{ cursor: 'pointer', transition: 'fill .25s' }} onClick={() => toggle('onlyB')} />
        {/* lens = both */}
        <g clipPath="url(#clipA)">
          <circle cx="205" cy="100" r="72" fill={on.has('both') ? 'var(--cond)' : 'var(--card2)'} opacity={0.85}
            style={{ cursor: 'pointer', transition: 'fill .25s' }} onClick={() => toggle('both')} />
        </g>
        <circle cx="135" cy="100" r="72" fill="none" stroke="var(--known)" strokeWidth="2.5" pointerEvents="none" />
        <circle cx="205" cy="100" r="72" fill="none" stroke="var(--good)" strokeWidth="2.5" pointerEvents="none" />
        <text x="76" y="46" fontSize="17" fontWeight="800" fill="var(--known)" pointerEvents="none">E</text>
        <text x="255" y="46" fontSize="17" fontWeight="800" fill="var(--good)" pointerEvents="none">F</text>
        <text x="14" y="22" fontSize="13" fontWeight="700" fill="var(--muted)" pointerEvents="none">Ω</text>
      </svg>

      {quiz === null ? (
        <div className="lab-controls">
          <div className="row" style={{ minHeight: 30 }}>
            <span className="small muted">Shaded =</span>
            {matched.length ? matched.map((m, i) => <span key={i} className="chip known"><Tex tex={m.tex} /></span>)
              : <span className="small faint">{on.size === 0 ? '∅ — nothing shaded' : 'no simple name — try combinations!'}</span>}
          </div>
          <div className="row">
            <button className="btn sm primary" onClick={startQuiz}>Quiz me: shade an expression</button>
            <button className="btn sm ghost" onClick={() => { setOn(new Set()); setResult(null); }}>Clear</button>
          </div>
        </div>
      ) : (
        <div className="lab-controls">
          <div className="predict-banner row spread">
            <span>Shade exactly: <strong style={{ fontSize: '1.1em' }}><Tex tex={EXPRESSIONS[quiz].tex} /></strong></span>
            <span className="row">
              <button className="btn sm good" onClick={checkQuiz}>check</button>
              <button className="btn sm ghost" onClick={() => { setQuiz(null); setResult(null); }}>exit</button>
            </span>
          </div>
          {result === 'right' && <div className="feedback-banner ok pop">✓ Exactly right. <button className="btn sm" onClick={startQuiz}>Another</button></div>}
          {result === 'wrong' && <div className="feedback-banner no pop">✗ Not quite — say the expression aloud in English, then re-shade.</div>}
        </div>
      )}
    </div>
  );
}
