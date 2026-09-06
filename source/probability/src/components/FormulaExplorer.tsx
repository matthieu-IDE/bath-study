import { useState } from 'react';
import type { Formula } from '../data/types';
import { Tex } from './Math';

/* Interactive formula explorer: big formula + hoverable legend of parts.
   Hovering a legend item highlights it; each part is colour-coded semantically. */

const COLORS: Record<string, string> = {
  known: 'var(--known)', cond: 'var(--cond)', good: 'var(--good)', bad: 'var(--bad)', warn: 'var(--warn)', accent: 'var(--accent)',
};

export function FormulaExplorer({ formula, compact }: { formula: Formula; compact?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const [showRederive, setShowRederive] = useState(false);
  return (
    <div className="formula-box">
      <div className="row spread" style={{ marginBottom: 4 }}>
        <span className="tiny bold" style={{ color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {formula.name}
        </span>
        <span className="tiny faint">{formula.source === 'course' ? `Notes${formula.pdfPage ? ` p${formula.pdfPage}` : ''}` : 'Extra'}</span>
      </div>
      <div style={{ fontSize: compact ? '1em' : '1.15em', textAlign: 'center', padding: '6px 0' }}>
        <Tex tex={formula.tex} display />
      </div>
      {formula.parts && !compact && (
        <div className="fx-legend">
          {formula.parts.map((p, i) => (
            <div
              key={i}
              className={`fx-legend-item ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ borderLeft: `3px solid ${COLORS[p.color]}`, background: active === i ? 'var(--bg2)' : undefined }}
            >
              <span className="fx-sym" style={{ color: COLORS[p.color] }}><Tex tex={p.sym} /></span>
              <span className="small muted">{p.meaning}</span>
            </div>
          ))}
        </div>
      )}
      {formula.note && <div className="tiny muted mt">{formula.note}</div>}
      {formula.rederive && !compact && (
        <div className="mt">
          <button className="btn sm ghost" onClick={() => setShowRederive(v => !v)}>
            {showRederive ? '▾' : '▸'} Forgot it? Rebuild it
          </button>
          {showRederive && <div className="small muted" style={{ padding: '6px 4px' }}>{formula.rederive}</div>}
        </div>
      )}
    </div>
  );
}
