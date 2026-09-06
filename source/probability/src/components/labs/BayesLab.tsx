import { useMemo, useState } from 'react';
import { fmt } from '../../lib/utils';
import { Tex } from '../Math';

/* Bayes with populations, not formulas: 1000 people, prior/sensitivity/false-positive
   sliders, posterior emerges as a filtered fraction. Colours follow the app language. */

export function BayesLab() {
  const [prior, setPrior] = useState(0.05); // P(condition)
  const [sens, setSens] = useState(0.9); // P(+|condition)
  const [fpr, setFpr] = useState(0.08); // P(+|healthy)
  const [showPositivesOnly, setShowPositivesOnly] = useState(false);

  const N = 1000;
  const sick = Math.round(N * prior);
  const healthy = N - sick;
  const tp = Math.round(sick * sens);
  const fp = Math.round(healthy * fpr);
  const posterior = tp + fp > 0 ? tp / (tp + fp) : 0;

  const cells = useMemo(() => {
    const arr: { kind: 'tp' | 'fn' | 'fp' | 'tn' }[] = [];
    for (let i = 0; i < tp; i++) arr.push({ kind: 'tp' });
    for (let i = 0; i < sick - tp; i++) arr.push({ kind: 'fn' });
    for (let i = 0; i < fp; i++) arr.push({ kind: 'fp' });
    for (let i = 0; i < N - sick - fp; i++) arr.push({ kind: 'tn' });
    return arr;
  }, [tp, fp, sick]);

  const color = (k: string) => (k === 'tp' ? 'var(--good)' : k === 'fn' ? 'var(--bad)' : k === 'fp' ? 'var(--warn)' : 'var(--known)');
  const visible = (k: string) => !showPositivesOnly || k === 'tp' || k === 'fp';

  return (
    <div className="lab">
      <h4>Bayes without tears <span className="lab-sub">1000 people take a test</span></h4>
      <div className="lab-controls" style={{ marginTop: 0 }}>
        <div className="slider-row"><label>base rate</label><input type="range" min={1} max={30} value={prior * 100} onChange={e => setPrior(+e.target.value / 100)} /><output>{fmt(prior * 100, 0)}%</output></div>
        <div className="slider-row"><label>detects</label><input type="range" min={50} max={100} value={sens * 100} onChange={e => setSens(+e.target.value / 100)} /><output>{fmt(sens * 100, 0)}%</output></div>
        <div className="slider-row"><label>false +</label><input type="range" min={0} max={30} value={fpr * 100} onChange={e => setFpr(+e.target.value / 100)} /><output>{fmt(fpr * 100, 0)}%</output></div>
      </div>
      <svg viewBox="0 0 250 102" style={{ maxWidth: 520, marginTop: 8 }}>
        {cells.map((c, i) => {
          const x = 3 + (i % 50) * 4.95, y = 4 + Math.floor(i / 50) * 4.9;
          return <rect key={i} x={x} y={y} width={3.9} height={3.9} rx={1}
            fill={color(c.kind)} opacity={visible(c.kind) ? 0.92 : 0.07}
            style={{ transition: 'opacity .45s' }} />;
        })}
      </svg>
      <div className="row" style={{ gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
        <span className="chip good">has it, test + ({tp})</span>
        <span className="chip bad">has it, test − ({sick - tp})</span>
        <span className="chip warn">healthy, test + ({fp})</span>
        <span className="chip known">healthy, test − ({N - sick - fp})</span>
      </div>
      <div className="lab-controls">
        <button className={`btn ${showPositivesOnly ? '' : 'primary'}`} onClick={() => setShowPositivesOnly(v => !v)}>
          {showPositivesOnly ? 'Show everyone' : 'Condition: keep only the positive tests'}
        </button>
        {showPositivesOnly && (
          <div className="pop">
            <div className="row" style={{ alignItems: 'baseline', gap: 14 }}>
              <span style={{ fontSize: '1.15em' }}>
                <Tex tex={`P(\\text{condition}\\mid +)=\\frac{${tp}}{${tp}+${fp}}=${fmt(posterior, 3)}`} />
              </span>
              <span className={`chip ${posterior < 0.5 ? 'warn' : 'good'}`}>{posterior < 0.5 ? 'more likely a false alarm!' : 'probably real'}</span>
            </div>
            <div className="bar-rail mt" style={{ height: 14 }}>
              <div className="bar-fill" style={{ width: `${posterior * 100}%`, background: 'var(--good)' }} />
            </div>
            <div className="tiny muted mt">
              The green {tp} true positives compete with the orange {fp} false alarms.
              With a rare condition, the huge healthy population manufactures false positives faster than the tiny sick population makes true ones.
              This IS Bayes' theorem: <Tex tex={'P(E\\mid F)=\\frac{P(E)P(F\\mid E)}{P(E)P(F\\mid E)+P(E^c)P(F\\mid E^c)}'} /> — numerator green, denominator green+orange (Thm 3.3).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
