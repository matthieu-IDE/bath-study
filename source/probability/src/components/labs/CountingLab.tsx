import { useState } from 'react';
import { nCr, nPr } from '../../lib/utils';
import { Tex } from '../Math';

/* The sampling table, alive: four modes, four anchor stories, live formula values. */

type Cell = 'podium' | 'pin' | 'lotto' | 'doughnut';

const CELLS: Record<Cell, { title: string; ordered: boolean; replace: boolean; story: string; formula: (n: number, r: number) => string; value: (n: number, r: number) => number }> = {
  podium: { title: 'Podium', ordered: true, replace: false, story: 'r medals to n athletes — order matters, nobody wins twice', formula: (n, r) => `\\frac{${n}!}{(${n}-${r})!}`, value: nPr },
  pin: { title: 'PIN code', ordered: true, replace: true, story: 'r digits from n symbols — order matters, repeats fine', formula: (n, r) => `${n}^{${r}}`, value: (n, r) => n ** r },
  lotto: { title: 'Lotto', ordered: false, replace: false, story: 'r balls from n — a set of numbers, no order, no repeats', formula: (n, r) => `\\binom{${n}}{${r}}`, value: nCr },
  doughnut: { title: 'Doughnuts', ordered: false, replace: true, story: 'r doughnuts from n kinds — repeats fine, order irrelevant', formula: (n, r) => `\\binom{${n - 1}+${r}}{${r}}`, value: (n, r) => nCr(n - 1 + r, r) },
};

export function CountingLab() {
  const [cell, setCell] = useState<Cell>('podium');
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const c = CELLS[cell];
  const rMax = c.replace ? 8 : Math.min(8, n);
  const rr = Math.min(r, rMax);
  const value = c.value(n, rr);

  return (
    <div className="lab">
      <h4>Which counting machine? <span className="lab-sub">two questions decide everything</span></h4>
      <div className="grid2" style={{ gap: 8 }}>
        {(Object.keys(CELLS) as Cell[]).map(k => (
          <button key={k} className="card card-pad" onClick={() => setCell(k)}
            style={{ textAlign: 'left', borderColor: cell === k ? 'var(--known)' : undefined, borderWidth: cell === k ? 2 : 1, background: cell === k ? 'var(--known-soft)' : undefined }}>
            <div className="bold">{CELLS[k].title}</div>
            <div className="tiny muted">{CELLS[k].ordered ? 'order matters' : 'order irrelevant'} · {CELLS[k].replace ? 'repeats allowed' : 'no repeats'}</div>
          </button>
        ))}
      </div>
      <div className="lab-controls">
        <div className="slider-row"><label>n = {n}</label><input type="range" min={3} max={12} value={n} onChange={e => setN(+e.target.value)} /><output>options</output></div>
        <div className="slider-row"><label>r = {rr}</label><input type="range" min={1} max={rMax} value={rr} onChange={e => setR(+e.target.value)} /><output>chosen</output></div>
        <div className="row spread" style={{ background: 'var(--card2)', borderRadius: 10, padding: '10px 14px' }}>
          <span className="small muted">{c.story}</span>
          <span style={{ fontSize: '1.15em' }}><Tex tex={`${c.formula(n, rr)} = ${c.value(n, rr).toLocaleString()}`} /></span>
        </div>
        {/* visual: tokens */}
        <TokenViz cell={cell} n={n} r={rr} />
        <div className="tiny muted">
          Compare cells with the same n, r: podium {nPr(n, rr).toLocaleString()} vs lotto {nCr(n, rr).toLocaleString()} —
          the factor between them is exactly r! = {[1, 1, 2, 6, 24, 120, 720, 5040, 40320][rr].toLocaleString()} (un-ordering divides by the orderings).
        </div>
      </div>
    </div>
  );
}

function TokenViz({ cell, n, r }: { cell: Cell; n: number; r: number }) {
  const cols = ['var(--known)', 'var(--good)', 'var(--warn)', 'var(--bad)', 'var(--cond)', 'var(--accent)', '#7f8fa6', '#c56cf0', '#f78fb3', '#3ae374', '#67e6dc', '#ffb142'];
  return (
    <svg viewBox={`0 0 340 74`} style={{ maxWidth: 420 }}>
      <text x={4} y={13} fontSize={10} fill="var(--faint)">the n options</text>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={16 + i * 26} cy={30} r={10} fill={cols[i % cols.length]} opacity={0.85} />
      ))}
      <text x={4} y={57} fontSize={10} fill="var(--faint)">{cell === 'podium' ? 'ordered slots (swap = different!)' : cell === 'pin' ? 'ordered slots, repeats OK' : cell === 'lotto' ? 'an unordered handful' : 'an unordered bag, repeats OK'}</text>
      {Array.from({ length: r }, (_, i) => (
        <g key={i}>
          <rect x={8 + i * 30} y={60} width={24} height={12} rx={4} fill="var(--bg2)" stroke="var(--line2)" />
          {cell === 'podium' && <text x={20 + i * 30} y={70} textAnchor="middle" fontSize={9} fontWeight={800} fill="var(--muted)">{i + 1}</text>}
          {cell === 'pin' && <text x={20 + i * 30} y={70} textAnchor="middle" fontSize={9} fill="var(--muted)">any</text>}
          {(cell === 'lotto' || cell === 'doughnut') && <circle cx={20 + i * 30} cy={66} r={4} fill="var(--faint)" opacity={0.6} />}
        </g>
      ))}
    </svg>
  );
}
