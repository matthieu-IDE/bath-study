import { useMemo, useState } from 'react';
import { fracTex, simplify } from '../../lib/utils';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* Two-dice sample space: the 6×6 grid IS the lesson. Pick events, see counts. */

type EventDef = { id: string; label: string; test: (r: number, b: number) => boolean };

const EVENTS: EventDef[] = [
  { id: 'sum6', label: 'total = 6', test: (r, b) => r + b === 6 },
  { id: 'sum7', label: 'total = 7', test: (r, b) => r + b === 7 },
  { id: 'sumge10', label: 'total ≥ 10', test: (r, b) => r + b >= 10 },
  { id: 'one6', label: 'at least one 6', test: (r, b) => r === 6 || b === 6 },
  { id: 'doubles', label: 'doubles', test: (r, b) => r === b },
  { id: 'redEven', label: 'red is even', test: r => r % 2 === 0 },
  { id: 'maxle3', label: 'max ≤ 3', test: (r, b) => Math.max(r, b) <= 3 },
];

export function DiceLab() {
  const [sel, setSel] = useState<string[]>(['sum6']);
  const [mode, setMode] = useState<'union' | 'intersect'>('union');
  const evs = EVENTS.filter(e => sel.includes(e.id));

  const inEvent = (r: number, b: number) =>
    evs.length === 0 ? false : mode === 'union' ? evs.some(e => e.test(r, b)) : evs.every(e => e.test(r, b));

  const count = useMemo(() => {
    let c = 0;
    for (let r = 1; r <= 6; r++) for (let b = 1; b <= 6; b++) if (inEvent(r, b)) c++;
    return c;
  }, [sel, mode]);

  const [n, d] = simplify(count, 36);
  const toggle = (id: string) => {
    sfx.click();
    setSel(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id].slice(-2)));
  };

  return (
    <div className="lab">
      <h4>Two-dice sample space <span className="lab-sub">every cell is one equally likely world</span></h4>
      <div className="row" style={{ alignItems: 'flex-start', gap: 16 }}>
        <svg viewBox="0 0 232 232" style={{ width: 232, flex: '0 0 auto' }}>
          {Array.from({ length: 6 }, (_, i) => i + 1).map(r =>
            Array.from({ length: 6 }, (_, j) => j + 1).map(b => {
              const hit = inEvent(r, b);
              return (
                <g key={`${r}-${b}`}>
                  <rect x={28 + (b - 1) * 34} y={28 + (r - 1) * 34} width={31} height={31} rx={6}
                    fill={hit ? 'var(--good)' : 'var(--bg2)'} opacity={hit ? 0.9 : 1}
                    stroke={hit ? 'var(--good)' : 'var(--line)'} style={{ transition: 'fill .3s' }} />
                  <text x={28 + (b - 1) * 34 + 15.5} y={28 + (r - 1) * 34 + 20} textAnchor="middle" fontSize="11"
                    fontWeight="700" fill={hit ? '#fff' : 'var(--muted)'}>{r + b}</text>
                </g>
              );
            }),
          )}
          {Array.from({ length: 6 }, (_, i) => (
            <text key={`r${i}`} x={14} y={28 + i * 34 + 20} fontSize="11" fontWeight="800" fill="var(--bad)" textAnchor="middle">{i + 1}</text>
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <text key={`b${i}`} x={28 + i * 34 + 15.5} y={16} fontSize="11" fontWeight="800" fill="var(--known)" textAnchor="middle">{i + 1}</text>
          ))}
          <text x={6} y={12} fontSize="9" fill="var(--faint)">red↓ blue→</text>
        </svg>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
            {EVENTS.map(e => (
              <button key={e.id} className={`chip clickable ${sel.includes(e.id) ? 'good' : ''}`} onClick={() => toggle(e.id)}>
                {e.label}
              </button>
            ))}
          </div>
          {sel.length === 2 && (
            <div className="seg mt">
              <button className={mode === 'union' ? 'active' : ''} onClick={() => setMode('union')}>∪ or</button>
              <button className={mode === 'intersect' ? 'active' : ''} onClick={() => setMode('intersect')}>∩ and</button>
            </div>
          )}
          <div className="mt" style={{ fontSize: '1.2em' }}>
            <Tex tex={`P(E)=\\frac{|E|}{|\\Omega|}=\\frac{${count}}{36}${count > 0 && d !== 36 ? `=${fracTex(n, d)}` : ''}`} display />
          </div>
          <div className="tiny muted">
            {sel.length === 2 && mode === 'union'
              ? 'Union: watch for cells that satisfy BOTH — they are only counted once (inclusion–exclusion, live).'
              : 'Choosing the grid of ordered pairs makes every world equally likely — that is why |E|/|Ω| is legal here.'}
          </div>
        </div>
      </div>
    </div>
  );
}
