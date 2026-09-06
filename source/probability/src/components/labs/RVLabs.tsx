import { useState } from 'react';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* RV mapping lab (the notes' Figure 14, interactive) and pmf ↔ cdf staircase lab. */

const OMEGA = ['HHH', 'HHT', 'HTH', 'THH', 'HTT', 'THT', 'TTH', 'TTT'];
const heads = (w: string) => w.split('').filter(c => c === 'H').length;

export function RVMapLab() {
  const [sel, setSel] = useState<string | null>(null);
  const [rv, setRv] = useState<'X' | 'Y' | 'Z'>('X');
  const val = (w: string) => (rv === 'X' ? heads(w) : rv === 'Y' ? 3 - heads(w) : heads(w.slice(1)));
  const targets = rv === 'Z' ? [0, 1, 2] : [0, 1, 2, 3];
  const selVal = sel ? val(sel) : null;

  return (
    <div className="lab">
      <h4>A random variable is a FUNCTION <span className="lab-sub">click an outcome ω</span></h4>
      <div className="seg">
        <button className={rv === 'X' ? 'active' : ''} onClick={() => setRv('X')}>X = # heads</button>
        <button className={rv === 'Y' ? 'active' : ''} onClick={() => setRv('Y')}>Y = # tails</button>
        <button className={rv === 'Z' ? 'active' : ''} onClick={() => setRv('Z')}>Z = heads in last two</button>
      </div>
      <svg viewBox="0 0 340 190" style={{ maxWidth: 480, marginTop: 8 }}>
        <text x={50} y={14} fontSize={11} fontWeight={700} fill="var(--muted)" textAnchor="middle">Ω (8 outcomes)</text>
        <text x={290} y={14} fontSize={11} fontWeight={700} fill="var(--muted)" textAnchor="middle">values in ℝ</text>
        {OMEGA.map((w, i) => {
          const y = 32 + i * 20;
          const active = sel === w;
          return (
            <g key={w} style={{ cursor: 'pointer' }} onClick={() => { setSel(w); sfx.click(); }}>
              <rect x={16} y={y - 12} width={70} height={17} rx={6}
                fill={active ? 'var(--known)' : 'var(--bg2)'} stroke={active ? 'var(--known)' : 'var(--line)'} />
              <text x={51} y={y} fontSize={10.5} fontWeight={700} textAnchor="middle" fill={active ? '#fff' : 'var(--muted)'}>{w}</text>
            </g>
          );
        })}
        {targets.map(t => {
          const y = 40 + t * (rv === 'Z' ? 52 : 38);
          const hot = selVal === t;
          return (
            <g key={t}>
              <circle cx={290} cy={y} r={14} fill={hot ? 'var(--good)' : 'var(--bg2)'} stroke={hot ? 'var(--good)' : 'var(--line2)'} strokeWidth={1.6} />
              <text x={290} y={y + 4} fontSize={12} fontWeight={800} textAnchor="middle" fill={hot ? '#fff' : 'var(--muted)'}>{t}</text>
            </g>
          );
        })}
        {OMEGA.map((w, i) => {
          const y1 = 32 + i * 20 - 3;
          const t = val(w);
          const y2 = 40 + t * (rv === 'Z' ? 52 : 38);
          const hot = sel === w;
          return <path key={w} d={`M88,${y1} C 180,${y1} 200,${y2} 274,${y2}`} fill="none"
            stroke={hot ? 'var(--good)' : 'var(--line2)'} strokeWidth={hot ? 2.4 : 0.8} opacity={hot ? 1 : 0.5} />;
        })}
      </svg>
      <div className="small muted">
        {sel
          ? <span className="pop"><Tex tex={`${rv}(\\text{${sel}}) = ${selVal}`} /> — the outcome flows through the function to a number. {`{${rv} = ${selVal}}`} collects ALL outcomes landing there: {OMEGA.filter(w => val(w) === selVal).join(', ')} → P = {OMEGA.filter(w => val(w) === selVal).length}/8.</span>
          : 'The rv is the arrows, not the randomness: Ω stays random, the function is fixed (Def 4.1 / Figure 14).'}
      </div>
    </div>
  );
}

export function PmfCdfLab() {
  const [hover, setHover] = useState<number | null>(null);
  const masses = [1, 3, 3, 1]; // eighths — 3 coin tosses
  const W = 350, H = 150;
  const cum = masses.map((_, i) => masses.slice(0, i + 1).reduce((a, b) => a + b, 0));
  return (
    <div className="lab">
      <h4>pmf ↔ cdf <span className="lab-sub">bars become stairs — hover a value</span></h4>
      <div className="row" style={{ gap: 4, alignItems: 'flex-start' }}>
        <svg viewBox={`0 0 ${W / 2} ${H}`} style={{ width: '48%' }}>
          <text x={8} y={12} fontSize={10} fontWeight={700} fill="var(--muted)">pmf: P(X = x)</text>
          {masses.map((m, i) => (
            <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
              <rect x={22 + i * 36} y={H - 24 - m * 26} width={22} height={m * 26} rx={3}
                fill={hover === i ? 'var(--good)' : 'var(--known)'} opacity={0.9} style={{ transition: 'fill .15s' }} />
              <text x={33 + i * 36} y={H - 10} fontSize={10} textAnchor="middle" fill="var(--muted)">{i}</text>
              <text x={33 + i * 36} y={H - 28 - m * 26} fontSize={8.5} textAnchor="middle" fill="var(--faint)">{m}/8</text>
            </g>
          ))}
        </svg>
        <svg viewBox={`0 0 ${W / 2} ${H}`} style={{ width: '48%' }}>
          <text x={8} y={12} fontSize={10} fontWeight={700} fill="var(--muted)">cdf: P(X ≤ x)</text>
          <line x1={6} y1={H - 24} x2={20} y2={H - 24} stroke="var(--known)" strokeWidth={2.2} />
          {cum.map((c, i) => {
            const y = H - 24 - c * 12.5;
            const yPrev = i === 0 ? H - 24 : H - 24 - cum[i - 1] * 12.5;
            const x = 22 + i * 36;
            return (
              <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
                <line x1={x} y1={yPrev} x2={x} y2={y} stroke={hover === i ? 'var(--good)' : 'var(--line2)'} strokeWidth={hover === i ? 3 : 1.4} strokeDasharray={hover === i ? undefined : '2 2'} />
                <line x1={x} y1={y} x2={x + 36} y2={y} stroke="var(--known)" strokeWidth={2.2} />
                <circle cx={x} cy={y} r={3.2} fill="var(--known)" />
                <circle cx={x} cy={yPrev} r={3.2} fill="var(--card)" stroke="var(--known)" strokeWidth={1.4} />
                <text x={x + 18} y={y - 5} fontSize={8.5} textAnchor="middle" fill="var(--faint)">{c}/8</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="small muted" style={{ minHeight: 22 }}>
        {hover !== null
          ? <span className="pop">The bar P(X={hover}) = {masses[hover]}/8 IS the jump height at x={hover}: <Tex tex={`F(${hover})-F(${hover}^-)=${cum[hover]}/8-${hover === 0 ? 0 : cum[hover - 1]}/8`} />.</span>
          : 'X = heads in 3 tosses (the notes\' Figure 15). Solid dot = value AT the jump (right-continuity); open dot = the limit from the left.'}
      </div>
    </div>
  );
}
