import { useMemo, useRef, useState } from 'react';
import { expCdf, expPdf, fmt, normCdf, normPdf, unifCdf, unifPdf } from '../../lib/utils';
import { Tex } from '../Math';

/* Continuous distributions: pdf curve, DRAG the interval, probability = shaded area.
   Toggle cdf view to see the same probability as a height difference. */

type Dist = 'unif' | 'exp' | 'norm';

export function ContinuousLab() {
  const [dist, setDist] = useState<Dist>('exp');
  const [p1, setP1] = useState(1); // unif b / exp λ / norm μ
  const [p2, setP2] = useState(1); // norm σ²
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(2);
  const [showCdf, setShowCdf] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<'a' | 'b' | null>(null);

  const domain: [number, number] = dist === 'unif' ? [-0.4, p1 + 0.6] : dist === 'exp' ? [-0.2, 5] : [p1 - 3.6 * Math.sqrt(p2), p1 + 3.6 * Math.sqrt(p2)];
  const pdf = (x: number) => (dist === 'unif' ? unifPdf(0, p1, x) : dist === 'exp' ? expPdf(p1, x) : normPdf(p1, p2, x));
  const cdf = (x: number) => (dist === 'unif' ? unifCdf(0, p1, x) : dist === 'exp' ? expCdf(p1, x) : normCdf(p1, p2, x));

  const W = 360, H = 150, padL = 14, padB = 22;
  const xTo = (x: number) => padL + ((x - domain[0]) / (domain[1] - domain[0])) * (W - padL - 8);
  const xFrom = (px: number) => domain[0] + ((px - padL) / (W - padL - 8)) * (domain[1] - domain[0]);

  const { curve, yMax } = useMemo(() => {
    const pts: [number, number][] = [];
    let ym = 0;
    for (let i = 0; i <= 240; i++) {
      const x = domain[0] + (i / 240) * (domain[1] - domain[0]);
      const y = showCdf ? cdf(x) : pdf(x);
      ym = Math.max(ym, y);
      pts.push([x, y]);
    }
    return { curve: pts, yMax: Math.max(ym, 0.1) };
  }, [dist, p1, p2, showCdf]);

  const yTo = (y: number) => H - padB - (y / (yMax * 1.12)) * (H - padB - 10);
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const prob = Math.max(0, cdf(hi) - cdf(lo));

  const path = curve.map(([x, y], i) => `${i ? 'L' : 'M'}${xTo(x).toFixed(1)},${yTo(y).toFixed(1)}`).join('');
  const areaPts = curve.filter(([x]) => x >= lo && x <= hi);
  const areaPath = areaPts.length
    ? `M${xTo(lo).toFixed(1)},${yTo(0)} ` + areaPts.map(([x, y]) => `L${xTo(x).toFixed(1)},${yTo(y).toFixed(1)}`).join('') + ` L${xTo(hi).toFixed(1)},${yTo(0)} Z`
    : '';

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current || !svgRef.current) return;
    const r = svgRef.current.getBoundingClientRect();
    const x = xFrom(((e.clientX - r.left) / r.width) * W);
    const cl = Math.max(domain[0], Math.min(domain[1], x));
    dragging.current === 'a' ? setA(cl) : setB(cl);
  };

  const distTex = dist === 'unif' ? `X\\sim\\mathrm{Unif}(0,${fmt(p1, 1)})` : dist === 'exp' ? `X\\sim\\mathrm{Exp}(${fmt(p1, 1)})` : `X\\sim\\mathrm N(${fmt(p1, 1)},${fmt(p2, 1)})`;

  return (
    <div className="lab">
      <div className="row spread">
        <h4>Probability is area <span className="lab-sub">drag the handles</span></h4>
        <div className="seg">
          <button className={dist === 'unif' ? 'active' : ''} onClick={() => { setDist('unif'); setP1(2); setA(0.4); setB(1.2); }}>Uniform</button>
          <button className={dist === 'exp' ? 'active' : ''} onClick={() => { setDist('exp'); setP1(1); setA(0.5); setB(2); }}>Exponential</button>
          <button className={dist === 'norm' ? 'active' : ''} onClick={() => { setDist('norm'); setP1(0); setP2(1); setA(-1); setB(1); }}>Normal</button>
        </div>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 520, touchAction: 'none', cursor: dragging.current ? 'grabbing' : 'default' }}
        onPointerMove={onMove} onPointerUp={() => (dragging.current = null)} onPointerLeave={() => (dragging.current = null)}>
        <line x1={padL} y1={H - padB} x2={W - 6} y2={H - padB} stroke="var(--line2)" />
        {!showCdf && areaPath && <path d={areaPath} fill="var(--good)" opacity={0.4} />}
        <path d={path} fill="none" stroke="var(--known)" strokeWidth={2.4} />
        {showCdf && (
          <g>
            {[lo, hi].map((v, i) => (
              <g key={i}>
                <line x1={xTo(v)} y1={yTo(cdf(v))} x2={xTo(v)} y2={H - padB} stroke={i ? 'var(--good)' : 'var(--bad)'} strokeDasharray="3 3" strokeWidth={1.4} />
                <line x1={padL} y1={yTo(cdf(v))} x2={xTo(v)} y2={yTo(cdf(v))} stroke={i ? 'var(--good)' : 'var(--bad)'} strokeDasharray="3 3" strokeWidth={1.4} />
                <text x={padL + 2} y={yTo(cdf(v)) - 3} fontSize={9} fill={i ? 'var(--good)' : 'var(--bad)'}>F({fmt(v, 1)})={fmt(cdf(v), 3)}</text>
              </g>
            ))}
          </g>
        )}
        {/* handles */}
        {[['a', a] as const, ['b', b] as const].map(([k, v]) => (
          <g key={k} style={{ cursor: 'grab' }}
            onPointerDown={e => { dragging.current = k; (e.target as Element).setPointerCapture?.(e.pointerId); }}>
            <line x1={xTo(v)} y1={12} x2={xTo(v)} y2={H - padB} stroke="var(--cond)" strokeWidth={2} />
            <circle cx={xTo(v)} cy={H - padB} r={7} fill="var(--cond)" />
            <text x={xTo(v)} y={H - 6} fontSize={10} fontWeight={800} textAnchor="middle" fill="var(--cond)">{fmt(v, 1)}</text>
          </g>
        ))}
      </svg>
      <div className="lab-controls">
        {dist === 'unif' && <div className="slider-row"><label>b = {fmt(p1, 1)}</label><input type="range" min={10} max={40} value={p1 * 10} onChange={e => setP1(+e.target.value / 10)} /><output>height 1/{fmt(p1, 1)}</output></div>}
        {dist === 'exp' && <div className="slider-row"><label>λ = {fmt(p1, 1)}</label><input type="range" min={3} max={30} value={p1 * 10} onChange={e => setP1(+e.target.value / 10)} /><output>E=1/λ={fmt(1 / p1, 2)}</output></div>}
        {dist === 'norm' && (
          <>
            <div className="slider-row"><label>μ = {fmt(p1, 1)}</label><input type="range" min={-30} max={30} value={p1 * 10} onChange={e => setP1(+e.target.value / 10)} /><output>centre</output></div>
            <div className="slider-row"><label>σ² = {fmt(p2, 1)}</label><input type="range" min={2} max={40} value={p2 * 10} onChange={e => setP2(+e.target.value / 10)} /><output>spread</output></div>
          </>
        )}
        <div className="row spread">
          <span style={{ fontSize: '1.1em' }}>
            <Tex tex={`${distTex}:\\ P(${fmt(lo, 1)}<X\\le ${fmt(hi, 1)})=${showCdf ? `F(${fmt(hi, 1)})-F(${fmt(lo, 1)})=` : ''}${fmt(prob, 4)}`} />
          </span>
          <button className="btn sm" onClick={() => setShowCdf(v => !v)}>{showCdf ? 'show pdf (area)' : 'show cdf (heights)'}</button>
        </div>
        <div className="tiny muted">
          {showCdf
            ? 'Same probability, second view: the cdf climb between the two marks. P(a<X≤b) = F(b) − F(a) (Thm 4.2).'
            : dist === 'exp' && pdf(0) > 1
              ? `Notice f(0) = λ = ${fmt(p1, 1)} > 1 — densities may exceed 1; only AREAS are probabilities.`
              : dist === 'unif'
                ? 'Flat density: probability depends only on the interval LENGTH — slide the handles keeping the gap fixed.'
                : 'σ² wide → low and fat; σ² small → tall and narrow. Total area is always exactly 1.'}
        </div>
      </div>
    </div>
  );
}
