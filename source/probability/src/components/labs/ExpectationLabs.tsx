import { useMemo, useRef, useState } from 'react';
import { fmt, mulberry32, sampleExp, sampleNormal } from '../../lib/utils';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* LLN convergence lab, variance-spread lab, covariance scatter lab, random walk lab. */

type Src = 'die' | 'coin' | 'exp';
const SRC: Record<Src, { label: string; mean: number; sample: (r: () => number) => number; tex: string }> = {
  die: { label: 'Dice score', mean: 3.5, sample: r => 1 + Math.floor(r() * 6), tex: 'E[X]=3.5' },
  coin: { label: 'Coin (1 = head)', mean: 0.5, sample: r => (r() < 0.5 ? 1 : 0), tex: 'E[X]=0.5' },
  exp: { label: 'Exp(1) wait', mean: 1, sample: r => sampleExp(r, 1), tex: 'E[X]=1' },
};

export function LLNLab() {
  const [src, setSrc] = useState<Src>('die');
  const [path, setPath] = useState<number[]>([]);
  const s = SRC[src];

  const run = (n: number) => {
    sfx.dice();
    const rng = Math.random;
    let sum = 0;
    const pts: number[] = [];
    const prevSum = path.length ? path[path.length - 1] * path.length : 0;
    sum = prevSum;
    for (let i = 0; i < n; i++) {
      sum += s.sample(rng);
      pts.push(sum / (path.length + i + 1));
    }
    setPath([...path, ...pts].slice(-100000));
  };
  const reset = (k: Src) => { setSrc(k); setPath([]); };

  const W = 360, H = 140;
  const n = path.length;
  const yMax = src === 'die' ? 6 : src === 'coin' ? 1 : 2.5;
  const seg = useMemo(() => {
    if (!n) return '';
    const step = Math.max(1, Math.floor(n / 300));
    const pts: string[] = [];
    for (let i = 0; i < n; i += step) {
      const x = 14 + (Math.log10(i + 1) / Math.log10(Math.max(n, 10))) * (W - 24);
      const y = H - 18 - (path[i] / yMax) * (H - 32);
      pts.push(`${pts.length ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join('');
  }, [path, n, yMax]);

  return (
    <div className="lab">
      <h4>Watch the average settle <span className="lab-sub">the Law of Large Numbers, live</span></h4>
      <div className="seg">
        {(Object.keys(SRC) as Src[]).map(k => (
          <button key={k} className={src === k ? 'active' : ''} onClick={() => reset(k)}>{SRC[k].label}</button>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 520, marginTop: 8 }}>
        <line x1={14} y1={H - 18 - (s.mean / yMax) * (H - 32)} x2={W - 10} y2={H - 18 - (s.mean / yMax) * (H - 32)}
          stroke="var(--good)" strokeWidth={1.6} strokeDasharray="5 4" />
        <text x={W - 12} y={H - 22 - (s.mean / yMax) * (H - 32)} fontSize={10} textAnchor="end" fill="var(--good)" fontWeight={700}>μ = {s.mean}</text>
        {seg && <path d={seg} fill="none" stroke="var(--known)" strokeWidth={1.8} />}
        <line x1={14} y1={H - 18} x2={W - 10} y2={H - 18} stroke="var(--line2)" />
        <text x={14} y={H - 5} fontSize={9} fill="var(--faint)">n (log scale)</text>
      </svg>
      <div className="row mt">
        <button className="btn sm primary" onClick={() => run(10)}>+10</button>
        <button className="btn sm primary" onClick={() => run(100)}>+100</button>
        <button className="btn sm primary" onClick={() => run(1000)}>+1,000</button>
        <button className="btn sm primary" onClick={() => run(100000)}>+100,000</button>
        <button className="btn sm ghost" onClick={() => setPath([])}>Reset</button>
      </div>
      <div className="row spread mt">
        <span className="small">n = {n.toLocaleString()} · running average = <strong>{n ? fmt(path[n - 1], 4) : '—'}</strong></span>
        <span className="tiny muted"><Tex tex={`\\mathrm{Var}(\\bar X_n)=\\sigma^2/n`} /> → wobble dies like 1/√n</span>
      </div>
      {n >= 1000 && <div className="tiny muted pop">Early chaos, later calm — luck averages out. That's Theorem 6.11, not magic.</div>}
    </div>
  );
}

export function VarianceLab() {
  const [spread, setSpread] = useState(1);
  const W = 360, H = 130;
  const curve = (s2: number, color: string, key: string) => {
    const pts: string[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = -4 + (i / 200) * 8;
      const y = Math.exp(-x * x / (2 * s2)) / Math.sqrt(2 * Math.PI * s2);
      pts.push(`${i ? 'L' : 'M'}${(14 + ((x + 4) / 8) * (W - 24)).toFixed(1)},${(H - 20 - y * 210).toFixed(1)}`);
    }
    return <path key={key} d={pts.join('')} fill="none" stroke={color} strokeWidth={2.2} />;
  };
  return (
    <div className="lab">
      <h4>Same mean, different story <span className="lab-sub">variance is the spread</span></h4>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 520 }}>
        <line x1={W / 2 + 2} y1={8} x2={W / 2 + 2} y2={H - 20} stroke="var(--good)" strokeDasharray="4 4" strokeWidth={1.4} />
        <text x={W / 2 + 6} y={16} fontSize={9.5} fill="var(--good)" fontWeight={700}>same mean</text>
        {curve(0.35, 'var(--known)', 'a')}
        {curve(spread, 'var(--warn)', 'b')}
        <line x1={10} y1={H - 20} x2={W - 8} y2={H - 20} stroke="var(--line2)" />
      </svg>
      <div className="slider-row"><label>Var</label><input type="range" min={35} max={400} value={spread * 100} onChange={e => setSpread(+e.target.value / 100)} /><output>{fmt(spread, 2)}</output></div>
      <div className="tiny muted mt">
        Blue: a reliable 20-min bus (Var 0.35). Orange: the risky route — same average, sd = {fmt(Math.sqrt(spread), 2)}.
        Averages hide risk; variance measures it. <Tex tex={'\\mathrm{Var}(X)=E[X^2]-(E[X])^2'} />.
      </div>
    </div>
  );
}

export function CovarianceLab() {
  const [rho, setRho] = useState(0.7);
  const [seed, setSeed] = useState(1);
  const pts = useMemo(() => {
    const rng = mulberry32(seed * 7919 + 13);
    return Array.from({ length: 120 }, () => {
      const z1 = sampleNormal(rng), z2 = sampleNormal(rng);
      return { x: z1, y: rho * z1 + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2 };
    });
  }, [rho, seed]);
  const W = 300, H = 190;
  const map = (v: number, size: number) => size / 2 + v * (size / 7);
  return (
    <div className="lab">
      <h4>Correlation playground <span className="lab-sub">ρ shapes the cloud</span></h4>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 380 }}>
        <line x1={W / 2} y1={4} x2={W / 2} y2={H - 4} stroke="var(--line)" />
        <line x1={4} y1={H / 2} x2={W - 4} y2={H / 2} stroke="var(--line)" />
        <text x={W - 8} y={H / 2 - 5} fontSize={9} textAnchor="end" fill="var(--faint)">X above mean →</text>
        <text x={W / 2 + 5} y={12} fontSize={9} fill="var(--faint)">Y above mean ↑</text>
        {pts.map((p, i) => {
          const sameSide = (p.x >= 0) === (p.y >= 0);
          return <circle key={i} cx={map(p.x, W)} cy={H - map(p.y, H)} r={3}
            fill={sameSide ? 'var(--good)' : 'var(--bad)'} opacity={0.65} />;
        })}
      </svg>
      <div className="slider-row"><label>ρ = {fmt(rho, 2)}</label><input type="range" min={-100} max={100} value={rho * 100} onChange={e => setRho(+e.target.value / 100)} /><output>{rho > 0.3 ? 'together' : rho < -0.3 ? 'opposed' : '≈ none'}</output></div>
      <div className="row mt">
        <button className="btn sm" onClick={() => setSeed(s => s + 1)}>New sample</button>
        <span className="tiny muted">green = deviations agree (push Cov +), red = disagree (push Cov −)</span>
      </div>
      <div className="tiny muted mt">
        <Tex tex={'\\mathrm{Cov}(X,Y)=E[(X-\\mu_X)(Y-\\mu_Y)]'} /> — literally "average of green-minus-red".
        ρ = ±1 is a perfect line; ρ = 0 means no LINEAR link (dependence can still hide in curves!).
      </div>
    </div>
  );
}

export function RandomWalkLab() {
  const [p, setP] = useState(0.5);
  const [steps, setSteps] = useState(40);
  const [paths, setPaths] = useState<number[][]>([]);
  const [walking, setWalking] = useState<number[] | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const genPath = () => {
    let pos = 0;
    const pts = [0];
    for (let i = 0; i < steps; i++) { pos += Math.random() < p ? 1 : -1; pts.push(pos); }
    return pts;
  };
  const walkOne = () => {
    if (timer.current) clearInterval(timer.current);
    const full = genPath();
    let i = 1;
    setWalking(full.slice(0, 1));
    timer.current = setInterval(() => {
      i++;
      setWalking(full.slice(0, i));
      if (i % 4 === 0) sfx.click();
      if (i >= full.length) {
        clearInterval(timer.current!);
        setPaths(ps => [...ps.slice(-59), full]);
        setWalking(null);
      }
    }, 42);
  };
  const walkMany = (k: number) => {
    const ps: number[][] = [];
    for (let i = 0; i < k; i++) ps.push(genPath());
    setPaths(prev => [...prev, ...ps].slice(-400));
    sfx.dice();
  };

  const W = 360, H = 160;
  const yScale = Math.max(8, Math.ceil(2.6 * Math.sqrt(steps)));
  const toXY = (i: number, v: number): string => `${(12 + (i / steps) * (W - 20)).toFixed(1)},${(H / 2 - (v / yScale) * (H / 2 - 8)).toFixed(1)}`;
  const zeros = paths.length ? paths.filter(pt => pt[steps] === 0).length : 0;

  return (
    <div className="lab">
      <h4>Random walk arena <span className="lab-sub">±1 each step</span></h4>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 520 }}>
        <line x1={10} y1={H / 2} x2={W - 6} y2={H / 2} stroke="var(--line2)" strokeWidth={1.4} />
        <text x={W - 8} y={H / 2 - 4} fontSize={9} textAnchor="end" fill="var(--faint)">0</text>
        {paths.slice(-120).map((pt, i) => (
          <path key={i} d={pt.map((v, j) => `${j ? 'L' : 'M'}${toXY(j, v)}`).join('')}
            fill="none" stroke={pt[steps] === 0 ? 'var(--good)' : 'var(--known)'} strokeWidth={pt[steps] === 0 ? 1.6 : 0.8}
            opacity={pt[steps] === 0 ? 0.85 : 0.18} />
        ))}
        {walking && (
          <g>
            <path d={walking.map((v, j) => `${j ? 'L' : 'M'}${toXY(j, v)}`).join('')} fill="none" stroke="var(--bad)" strokeWidth={2.2} />
            <circle cx={+toXY(walking.length - 1, walking[walking.length - 1]).split(',')[0]}
              cy={+toXY(walking.length - 1, walking[walking.length - 1]).split(',')[1]} r={5} fill="var(--bad)" />
          </g>
        )}
      </svg>
      <div className="lab-controls">
        <div className="slider-row"><label>p(up) = {fmt(p, 2)}</label><input type="range" min={10} max={90} value={p * 100} onChange={e => { setP(+e.target.value / 100); setPaths([]); }} /><output>{p === 0.5 ? 'symmetric' : p > 0.5 ? 'drift ↑' : 'drift ↓'}</output></div>
        <div className="slider-row"><label>steps = {steps}</label><input type="range" min={10} max={100} step={2} value={steps} onChange={e => { setSteps(+e.target.value); setPaths([]); }} /><output>n</output></div>
        <div className="row">
          <button className="btn sm primary" onClick={walkOne}>Walk one</button>
          <button className="btn sm" onClick={() => walkMany(50)}>×50</button>
          <button className="btn sm" onClick={() => walkMany(400)}>×400</button>
          <button className="btn sm ghost" onClick={() => setPaths([])}>Clear</button>
        </div>
        {paths.length > 0 && p === 0.5 && steps % 2 === 0 && (
          <div className="small muted">
            Ended at 0 (green): {zeros}/{paths.length} = {fmt(zeros / paths.length, 3)} · theory <Tex tex={`\\binom{${steps}}{${steps / 2}}2^{-${steps}}`} /> ≈ {fmt(Math.exp((() => { let s = 0; for (let i = 1; i <= steps; i++) s += Math.log(i); let h = 0; for (let i = 1; i <= steps / 2; i++) h += Math.log(i); return s - 2 * h - steps * Math.LN2; })()), 3)} — and ≈ √(2/πn) = {fmt(Math.sqrt(2 / (Math.PI * steps)), 3)} by Stirling.
          </div>
        )}
        {p !== 0.5 && paths.length > 0 && <div className="tiny muted">With drift, the cloud leans — the number of up-steps is Bin(n, p) in disguise.</div>}
      </div>
    </div>
  );
}
