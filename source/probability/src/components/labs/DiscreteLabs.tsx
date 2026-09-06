import { useEffect, useRef, useState } from 'react';
import { binomPmf, fmt, geomPmf, poisPmf, sampleBinomial, sampleGeometric, samplePoisson } from '../../lib/utils';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* Binomial / Geometric / Poisson labs: sliders + live pmf + run-the-experiment. */

function Bars({ probs, counts, labels, mean, maxBars = 26 }: { probs: number[]; counts?: number[]; labels: (i: number) => string; mean?: number; maxBars?: number }) {
  const n = Math.min(probs.length, maxBars);
  const W = 340, H = 130, pad = 20;
  const bw = (W - pad * 2) / n;
  const pMax = Math.max(...probs.slice(0, n), 1e-9);
  const total = counts ? Math.max(1, counts.reduce((a, b) => a + b, 0)) : 0;
  const cMax = counts ? Math.max(...counts.slice(0, n).map(c => c / total), pMax) : pMax;
  const scale = (H - 34) / Math.max(pMax, cMax);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 480 }}>
      {probs.slice(0, n).map((p, i) => (
        <g key={i}>
          {counts && (
            <rect x={pad + i * bw + 1} y={H - 22 - (counts[i] / total) * scale} width={bw - 2} height={(counts[i] / total) * scale}
              fill="var(--warn)" opacity={0.55} rx={2} style={{ transition: 'height .2s, y .2s' }} />
          )}
          <rect x={pad + i * bw + bw * 0.22} y={H - 22 - p * scale} width={bw * 0.56} height={p * scale}
            fill="var(--known)" opacity={0.9} rx={2} style={{ transition: 'height .25s, y .25s' }} />
          {n <= 16 && <text x={pad + i * bw + bw / 2} y={H - 9} textAnchor="middle" fontSize={8.5} fill="var(--muted)">{labels(i)}</text>}
          {n > 16 && i % Math.ceil(n / 8) === 0 && <text x={pad + i * bw + bw / 2} y={H - 9} textAnchor="middle" fontSize={8.5} fill="var(--muted)">{labels(i)}</text>}
        </g>
      ))}
      {mean !== undefined && mean <= n && (
        <g>
          <line x1={pad + (mean + 0.5) * bw} y1={12} x2={pad + (mean + 0.5) * bw} y2={H - 22} stroke="var(--bad)" strokeWidth={1.6} strokeDasharray="4 3" />
          <text x={pad + (mean + 0.5) * bw + 4} y={19} fontSize={9} fill="var(--bad)" fontWeight={700}>E[X]</text>
        </g>
      )}
    </svg>
  );
}

export function BinomialLab() {
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.5);
  const [counts, setCounts] = useState<number[]>(() => Array(41).fill(0));
  const [runs, setRuns] = useState(0);
  const [lastFlips, setLastFlips] = useState<boolean[] | null>(null);
  const probs = Array.from({ length: n + 1 }, (_, k) => binomPmf(n, p, k));

  const reset = (nn: number, pp: number) => { setCounts(Array(41).fill(0)); setRuns(0); setLastFlips(null); setN(nn); setP(pp); };
  const run = (times: number) => {
    const c = [...counts];
    let flips: boolean[] | null = null;
    for (let t = 0; t < times; t++) {
      if (times === 1) {
        flips = Array.from({ length: n }, () => Math.random() < p);
        c[flips.filter(Boolean).length]++;
      } else c[sampleBinomial(Math.random, n, p)]++;
    }
    setCounts(c); setRuns(runs + times); setLastFlips(flips);
    times === 1 ? sfx.coin() : sfx.dice();
  };

  return (
    <div className="lab">
      <h4>Binomial machine <span className="lab-sub">Bin(n, p) — bars are theory, orange is YOUR data</span></h4>
      <div className="lab-controls" style={{ marginTop: 0 }}>
        <div className="slider-row"><label>n = {n}</label><input type="range" min={1} max={40} value={n} onChange={e => reset(+e.target.value, p)} /><output>trials</output></div>
        <div className="slider-row"><label>p = {fmt(p)}</label><input type="range" min={5} max={95} value={p * 100} onChange={e => reset(n, +e.target.value / 100)} /><output>success</output></div>
      </div>
      <Bars probs={probs} counts={runs ? counts : undefined} labels={i => `${i}`} mean={n * p} />
      {lastFlips && (
        <div className="row" style={{ gap: 3, margin: '4px 0' }}>
          {lastFlips.map((f, i) => <span key={i} className={f ? 'dot-good' : 'dot-bad'} />)}
          <span className="small muted">→ {lastFlips.filter(Boolean).length} successes</span>
        </div>
      )}
      <div className="row mt">
        <button className="btn sm primary" onClick={() => run(1)}>Run once</button>
        <button className="btn sm" onClick={() => run(100)}>×100</button>
        <button className="btn sm" onClick={() => run(2000)}>×2000</button>
        {runs > 0 && <span className="tiny muted">{runs.toLocaleString()} experiments — watch orange hug blue as data grows (LLN preview)</span>}
      </div>
      <div className="tiny muted mt">
        <Tex tex={`E[X]=np=${fmt(n * p, 2)},\\quad \\mathrm{Var}(X)=np(1-p)=${fmt(n * p * (1 - p), 2)}`} />
        {' '}— dashes mark the mean. Slide p and watch the mountain lean.
      </div>
    </div>
  );
}

export function GeometricLab() {
  const [p, setP] = useState(1 / 6);
  const [counts, setCounts] = useState<number[]>(() => Array(30).fill(0));
  const [runs, setRuns] = useState(0);
  const [anim, setAnim] = useState<{ tries: number; step: number } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const probs = Array.from({ length: 24 }, (_, i) => geomPmf(p, i + 1));

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const runAnimated = () => {
    if (timer.current) clearInterval(timer.current);
    const tries = sampleGeometric(Math.random, p);
    setAnim({ tries, step: 0 });
    let s = 0;
    timer.current = setInterval(() => {
      s++;
      if (s >= tries) {
        clearInterval(timer.current!);
        sfx.correct();
        setCounts(c => { const cc = [...c]; cc[Math.min(tries, 29)]++; return cc; });
        setRuns(r => r + 1);
      } else sfx.click();
      setAnim({ tries, step: s });
    }, Math.min(240, 1400 / tries));
  };
  const runMany = (t: number) => {
    const c = [...counts];
    for (let i = 0; i < t; i++) c[Math.min(sampleGeometric(Math.random, p), 29)]++;
    setCounts(c); setRuns(runs + t); sfx.dice();
  };

  return (
    <div className="lab">
      <h4>Waiting for the first success <span className="lab-sub">Geom(p), support starts at 1</span></h4>
      <div className="slider-row"><label>p = {fmt(p, 3)}</label><input type="range" min={5} max={80} value={p * 100} onChange={e => { setP(+e.target.value / 100); setCounts(Array(30).fill(0)); setRuns(0); }} /><output>E[X]={fmt(1 / p, 1)}</output></div>
      {anim && (
        <div className="row" style={{ gap: 3, minHeight: 26, margin: '6px 0', flexWrap: 'wrap' }}>
          {Array.from({ length: anim.step + 1 }, (_, i) => (
            <span key={i} className={`pop ${i === anim.tries - 1 && anim.step === anim.tries ? 'dot-good' : i < anim.step ? 'dot-bad' : ''}`} style={i >= anim.step && !(i === anim.tries - 1 && anim.step === anim.tries) ? { width: 11, textAlign: 'center', color: 'var(--faint)' } : undefined}>{i >= anim.step && !(i === anim.tries - 1 && anim.step === anim.tries) ? '·' : ''}</span>
          ))}
          {anim.step >= anim.tries && <span className="small bold" style={{ color: 'var(--good)' }}>success on attempt {anim.tries}!</span>}
        </div>
      )}
      <Bars probs={probs} counts={runs ? counts.slice(1, 25) : undefined} labels={i => `${i + 1}`} mean={1 / p - 1} />
      <div className="row mt">
        <button className="btn sm primary" onClick={runAnimated}>Try until success</button>
        <button className="btn sm" onClick={() => runMany(500)}>×500</button>
        <span className="tiny muted">{runs ? `${runs} waits recorded` : 'each bar: P(first success on attempt k) = (1−p)^(k−1) p'}</span>
      </div>
      <div className="tiny muted mt">Every bar is the previous one × (1−p): the fingerprint of memorylessness. <Tex tex={`P(X>n)=(1-p)^n`} /> — no success yet, and the future doesn't care.</div>
    </div>
  );
}

export function PoissonLab() {
  const [rate, setRate] = useState(2);
  const [windowT, setWindowT] = useState(1);
  const [events, setEvents] = useState<number[] | null>(null);
  const [counts, setCounts] = useState<number[]>(() => Array(30).fill(0));
  const [runs, setRuns] = useState(0);
  const lam = rate * windowT;
  const probs = Array.from({ length: Math.min(26, Math.ceil(lam + 5 * Math.sqrt(lam) + 3)) }, (_, k) => poisPmf(lam, k));

  const drop = () => {
    const k = samplePoisson(Math.random, lam);
    const ev = Array.from({ length: k }, () => Math.random()).sort();
    setEvents(ev);
    setCounts(c => { const cc = [...c]; cc[Math.min(k, 29)]++; return cc; });
    setRuns(r => r + 1);
    sfx.dice();
  };
  const many = (t: number) => {
    const c = [...counts];
    for (let i = 0; i < t; i++) c[Math.min(samplePoisson(Math.random, lam), 29)]++;
    setCounts(c); setRuns(runs + t); sfx.dice();
  };

  return (
    <div className="lab">
      <h4>Events at a rate <span className="lab-sub">Pois(λ) — λ rescales with the window</span></h4>
      <div className="slider-row"><label>rate</label><input type="range" min={5} max={60} value={rate * 10} onChange={e => { setRate(+e.target.value / 10); setCounts(Array(30).fill(0)); setRuns(0); }} /><output>{fmt(rate, 1)}/unit</output></div>
      <div className="slider-row"><label>window</label><input type="range" min={1} max={5} value={windowT} onChange={e => { setWindowT(+e.target.value); setCounts(Array(30).fill(0)); setRuns(0); }} /><output>{windowT} unit{windowT > 1 ? 's' : ''}</output></div>
      <div className="row spread"><span className="chip cond">λ = {fmt(rate, 1)} × {windowT} = {fmt(lam, 1)}</span>
        <span className="tiny muted">E[X] = Var(X) = λ</span></div>
      {/* timeline */}
      <svg viewBox="0 0 340 34" style={{ maxWidth: 480, marginTop: 6 }}>
        <line x1={12} y1={22} x2={328} y2={22} stroke="var(--line2)" strokeWidth={2} />
        {events?.map((e, i) => (
          <g key={i} className="pop">
            <circle cx={12 + e * 316} cy={22} r={4.5} fill="var(--accent)" />
            <line x1={12 + e * 316} y1={10} x2={12 + e * 316} y2={17} stroke="var(--accent)" strokeWidth={1.5} />
          </g>
        ))}
        {events && <text x={328} y={10} fontSize={10} textAnchor="end" fill="var(--muted)">{events.length} events this window</text>}
      </svg>
      <Bars probs={probs} counts={runs ? counts.slice(0, probs.length) : undefined} labels={i => `${i}`} mean={lam} />
      <div className="row mt">
        <button className="btn sm primary" onClick={drop}>One window</button>
        <button className="btn sm" onClick={() => many(500)}>×500</button>
        <span className="tiny muted">{runs ? `${runs} windows` : 'dots rain onto the timeline; the histogram counts them'}</span>
      </div>
    </div>
  );
}
