import { useMemo, useState } from 'react';
import { binomPmf, fmt } from '../../lib/utils';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* Labs for the concepts that previously fell back to a formula explorer.
   Same conventions as the original labs: .lab card, slider rows, SVG charts, CSS-var colours. */

/* ---------- tiny shared pieces ---------- */

function Slider({ label, min, max, step = 1, value, onChange, out }: {
  label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void; out?: string;
}) {
  return (
    <div className="slider-row">
      <label>{label}</label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} />
      {out !== undefined && <output>{out}</output>}
    </div>
  );
}

function MiniBars({ values, labels, height = 110, color = 'var(--known)', highlight }: {
  values: number[]; labels?: string[]; height?: number; color?: string; highlight?: number;
}) {
  const W = 340, pad = 18;
  const n = values.length;
  const bw = (W - pad * 2) / Math.max(1, n);
  const vMax = Math.max(...values, 1e-9);
  const scale = (height - 30) / vMax;
  return (
    <svg viewBox={`0 0 ${W} ${height}`} style={{ maxWidth: 460 }}>
      {values.map((v, i) => (
        <g key={i}>
          <rect x={pad + i * bw + bw * 0.18} y={height - 20 - v * scale} width={bw * 0.64} height={Math.max(0.5, v * scale)}
            fill={highlight === i ? 'var(--warn)' : color} opacity={0.9} rx={2} style={{ transition: 'height .2s, y .2s' }} />
          {labels && n <= 14 && <text x={pad + i * bw + bw / 2} y={height - 7} textAnchor="middle" fontSize={8.5} fill="var(--muted)">{labels[i]}</text>}
        </g>
      ))}
    </svg>
  );
}

/* ---------- 1 · σ-algebra closure game (sigma-algebra) ---------- */

const SUBSET_LABELS = ['∅', '{1}', '{2}', '{3}', '{1,2}', '{1,3}', '{2,3}', 'Ω'];
const SUBSET_MASKS = [0, 1, 2, 4, 3, 5, 6, 7];

export function SigmaClosureLab() {
  const [fam, setFam] = useState<Set<number>>(() => new Set([0, 7]));
  const missing = useMemo(() => {
    const need = new Set<number>();
    if (!fam.has(0)) need.add(0);
    if (!fam.has(7)) need.add(7);
    for (const s of fam) if (!fam.has(7 ^ s)) need.add(7 ^ s);
    for (const s of fam) for (const t of fam) if (!fam.has(s | t)) need.add(s | t);
    return [...need];
  }, [fam]);
  const toggle = (m: number) => {
    const f = new Set(fam);
    f.has(m) ? f.delete(m) : f.add(m);
    setFam(f); sfx.click();
  };
  const closeUp = () => {
    const f = new Set(fam);
    for (const m of missing) f.add(m);
    setFam(f);
    sfx.correct();
  };
  return (
    <div className="lab">
      <h4>Build a σ-algebra <span className="lab-sub">Ω = {'{1,2,3}'} — click subsets in or out of your family F</span></h4>
      <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
        {SUBSET_MASKS.map((m, i) => (
          <button key={m} className={`chip clickable ${fam.has(m) ? 'known' : ''}`} onClick={() => toggle(m)}>{SUBSET_LABELS[i]}</button>
        ))}
      </div>
      {missing.length === 0 ? (
        <div className="feedback-banner ok mt">Closed! F has {fam.size} members ({fam.size === 2 ? 'the trivial σ-algebra' : fam.size === 8 ? 'the full power set' : 'a genuine in-between σ-algebra'}) — ∅ inside, complements inside, unions inside.</div>
      ) : (
        <div className="hint-box mt">
          Not a σ-algebra yet — the axioms force you to also admit:{' '}
          {missing.slice(0, 6).map(m => SUBSET_LABELS[SUBSET_MASKS.indexOf(m)]).join(', ')}
          <div className="row mt"><button className="btn sm primary" onClick={closeUp}>Add what the axioms demand</button></div>
        </div>
      )}
      <div className="tiny muted mt">Try starting from just {'{1}'}: watch closure drag in {'{2,3}'}, then unions, until the family stabilises. Every σ-algebra on 3 points has 2, 4 or 8 members.</div>
    </div>
  );
}

/* ---------- 2 · axiom cake (kolmogorov-axioms) ---------- */

export function AxiomLab() {
  const [w, setW] = useState([1, 1, 1, 1, 1, 1]);
  const total = w.reduce((a, b) => a + b, 0);
  const p = w.map(x => x / total);
  const P = (faces: number[]) => faces.reduce((a, f) => a + p[f - 1], 0);
  const pE = P([2, 4, 6]), pF = P([5, 6]), pEF = P([6]), pEuF = P([2, 4, 5, 6]);
  const setFace = (i: number, v: number) => setW(ws => ws.map((x, j) => (j === i ? v : x)));
  return (
    <div className="lab">
      <h4>One cake of belief <span className="lab-sub">shape any die you like — the axioms hold themselves</span></h4>
      <div className="lab-controls">
        {w.map((x, i) => (
          <Slider key={i} label={`face ${i + 1}`} min={0} max={10} value={x} onChange={v => setFace(i, v)} out={fmt(p[i], 3)} />
        ))}
      </div>
      <MiniBars values={p} labels={['1', '2', '3', '4', '5', '6']} />
      <div className="small mt">
        E = even = {'{2,4,6}'}, F = high = {'{5,6}'}:
      </div>
      <div className="tiny muted mt">
        <Tex tex={`P(E)=${fmt(pE, 3)},\\ P(F)=${fmt(pF, 3)},\\ P(E\\cap F)=${fmt(pEF, 3)}`} />
      </div>
      <div className="tiny mt" style={{ color: 'var(--good)', fontWeight: 600 }}>
        <Tex tex={`P(E\\cup F)=${fmt(pEuF, 3)}=${fmt(pE, 3)}+${fmt(pF, 3)}-${fmt(pEF, 3)}`} /> — inclusion–exclusion survives every reshape, because it is derived from the three axioms.
      </div>
    </div>
  );
}

/* ---------- 3 · at-least-one complement trick (complement-trick) ---------- */

export function AtLeastOneLab() {
  const [n, setN] = useState(5);
  const [p, setP] = useState(0.2);
  const atLeast = 1 - Math.pow(1 - p, n);
  const naive = n * p;
  const curve = Array.from({ length: 20 }, (_, i) => 1 - Math.pow(1 - p, i + 1));
  return (
    <div className="lab">
      <h4>The "at least one" machine <span className="lab-sub">1 − P(all miss) — and why adding is a trap</span></h4>
      <div className="lab-controls">
        <Slider label={`n = ${n}`} min={1} max={20} value={n} onChange={setN} out="tries" />
        <Slider label={`p = ${fmt(p)}`} min={5} max={95} value={p * 100} onChange={v => setP(v / 100)} out="each" />
      </div>
      <MiniBars values={curve} highlight={n - 1} height={100} />
      <div className="small mt">
        <Tex tex={`P(\\text{at least one})=1-(1-${fmt(p)})^{${n}}=${fmt(atLeast, 4)}`} />
      </div>
      <div className={`tiny mt ${naive > 1 ? '' : 'muted'}`} style={naive > 1 ? { color: 'var(--bad)', fontWeight: 600 } : undefined}>
        Naive adding gives np = {fmt(naive, 2)}{naive > 1 ? ' — a "probability" above 1. Adding only works for disjoint events, and these overlap.' : ' — close only while overlaps are rare.'}
      </div>
    </div>
  );
}

/* ---------- 4 · chain rule on the deck (chain-rule) ---------- */

export function ChainLab() {
  const [k, setK] = useState(2);
  const terms = Array.from({ length: k }, (_, i) => ({ top: 4 - i, bot: 52 - i }));
  const prob = terms.reduce((a, t) => a * (t.top / t.bot), 1);
  return (
    <div className="lab">
      <h4>Chain the story <span className="lab-sub">draw k cards — all aces? Each factor conditions on the story so far</span></h4>
      <div className="lab-controls">
        <Slider label={`k = ${k}`} min={1} max={4} value={k} onChange={v => { setK(v); sfx.click(); }} out="cards" />
      </div>
      <div className="row mt" style={{ gap: 4, alignItems: 'center', flexWrap: 'wrap' }}>
        {terms.map((t, i) => (
          <span key={i} className="row" style={{ gap: 4 }}>
            {i > 0 && <span className="muted">×</span>}
            <span className="chip known" title={`after ${i} aces are gone`}>{t.top}/{t.bot}</span>
          </span>
        ))}
        <span className="muted">=</span>
        <span className="bold small">{prob.toExponential(2)}</span>
      </div>
      <div className="tiny muted mt">
        Each fraction is a CONDITIONAL: {k > 1 ? `by draw ${k}, ${k - 1} aces and ${k - 1} cards are gone.` : 'the first draw sees the full deck.'} The chain rule multiplies the story in order — no combinations needed.
      </div>
      <div className="tiny muted mt"><Tex tex={'P(A_1\\cap A_2\\cap\\cdots)=P(A_1)\\,P(A_2\\mid A_1)\\,P(A_3\\mid A_1\\cap A_2)\\cdots'} /></div>
    </div>
  );
}

/* ---------- 5 · independence traps (independence-warnings) ---------- */

export function IndepTrapLab() {
  const [pE, setPE] = useState(0.5);
  const [pF, setPF] = useState(0.4);
  const lo = Math.max(0, pE + pF - 1), hi = Math.min(pE, pF);
  const [inter, setInter] = useState(0.2);
  const x = Math.min(hi, Math.max(lo, inter));
  const prod = pE * pF;
  const indep = Math.abs(x - prod) < 0.004;
  const disjoint = x < 0.004;
  return (
    <div className="lab">
      <h4>The two traps <span className="lab-sub">slide the overlap — independence is ONE exact value of it</span></h4>
      <div className="lab-controls">
        <Slider label={`P(E) = ${fmt(pE)}`} min={10} max={90} value={pE * 100} onChange={v => setPE(v / 100)} />
        <Slider label={`P(F) = ${fmt(pF)}`} min={10} max={90} value={pF * 100} onChange={v => setPF(v / 100)} />
        <Slider label={`P(E∩F) = ${fmt(x, 3)}`} min={Math.round(lo * 100)} max={Math.round(hi * 100)} value={x * 100} onChange={v => setInter(v / 100)} />
      </div>
      <div className="row mt" style={{ gap: 8 }}>
        <button className="btn sm" onClick={() => { setInter(prod); sfx.click(); }}>Make them independent</button>
        <button className="btn sm" onClick={() => { setInter(0); sfx.click(); }} disabled={lo > 0}>Make them disjoint</button>
      </div>
      <div className={`feedback-banner mt ${indep ? 'ok' : 'no'}`}>
        <Tex tex={`P(E\\cap F)=${fmt(x, 3)}\\quad \\text{vs}\\quad P(E)P(F)=${fmt(prod, 3)}`} />
        {indep ? ' — equal: independent.' : ' — unequal: dependent.'}
      </div>
      {disjoint && !indep && (
        <div className="tiny mt" style={{ color: 'var(--bad)', fontWeight: 600 }}>
          Trap 1: disjoint yet NOT independent — knowing E happened tells you F certainly did not. Maximum information, zero independence.
        </div>
      )}
      <div className="tiny muted mt">Trap 2 (from the notes): pairwise independence of three events does not give mutual independence — the triple product is a separate, fourth check.</div>
    </div>
  );
}

/* ---------- 6 · joint table (joint-discrete, independence-rvs, product-independence) ---------- */

export function JointTableLab() {
  // weights over X∈{0,1,2} × Y∈{1,2,3}
  const [w, setW] = useState<number[][]>([[1, 2, 3], [3, 4, 5], [5, 6, 7]]);
  const total = w.flat().reduce((a, b) => a + b, 0) || 1;
  const f = w.map(row => row.map(v => v / total));
  const fx = f.map(row => row.reduce((a, b) => a + b, 0));
  const fy = [0, 1, 2].map(j => f.reduce((a, row) => a + row[j], 0));
  const indep = f.every((row, i) => row.every((v, j) => Math.abs(v - fx[i] * fy[j]) < 1e-9));
  let exy = 0, ex = 0, ey = 0;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) exy += i * (j + 1) * f[i][j];
  for (let i = 0; i < 3; i++) ex += i * fx[i];
  for (let j = 0; j < 3; j++) ey += (j + 1) * fy[j];
  const bump = (i: number, j: number) => {
    setW(ws => ws.map((row, a) => row.map((v, b) => (a === i && b === j ? (v + 1) % 8 : v))));
    sfx.click();
  };
  const makeIndep = () => { setW([[1, 2, 1], [2, 4, 2], [3, 6, 3]]); sfx.correct(); };
  return (
    <div className="lab">
      <h4>The joint table <span className="lab-sub">click cells to pump mass in — marginals live in the margins</span></h4>
      <table className="joint-tbl">
        <tbody>
          <tr><td className="jt-corner">X\Y</td>{[1, 2, 3].map(y => <td key={y} className="jt-h">{y}</td>)}<td className="jt-h jt-m">fX</td></tr>
          {f.map((row, i) => (
            <tr key={i}>
              <td className="jt-h">{i}</td>
              {row.map((v, j) => (
                <td key={j}>
                  <button className="jt-cell" onClick={() => bump(i, j)}
                    style={{ background: `rgba(53, 86, 224, ${Math.min(0.75, v * 4)})`, color: v * 4 > 0.4 ? '#fff' : 'var(--text)' }}>
                    {fmt(v, 2)}
                  </button>
                </td>
              ))}
              <td className="jt-m small">{fmt(fx[i], 2)}</td>
            </tr>
          ))}
          <tr><td className="jt-h jt-m">fY</td>{fy.map((v, j) => <td key={j} className="jt-m small">{fmt(v, 2)}</td>)}<td className="jt-m tiny">1</td></tr>
        </tbody>
      </table>
      <div className={`feedback-banner mt ${indep ? 'ok' : 'no'}`}>
        {indep ? 'Independent: every cell = row marginal × column marginal.' : 'Dependent: at least one cell ≠ row × column.'}
      </div>
      <div className="tiny muted mt">
        <Tex tex={`E[XY]=${fmt(exy, 3)}\\quad \\text{vs}\\quad E[X]E[Y]=${fmt(ex * ey, 3)}`} />
        {' '}— {Math.abs(exy - ex * ey) < 1e-9 ? 'equal here (independence makes products split).' : 'unequal: products only split under independence.'}
      </div>
      <div className="row mt"><button className="btn sm" onClick={makeIndep}>Snap to an independent table</button></div>
    </div>
  );
}

/* ---------- 7 · convolution (convolution) ---------- */

export function ConvolveLab() {
  const [die, setDie] = useState(6);
  const [k, setK] = useState(7);
  const px = Array.from({ length: die }, () => 1 / die);
  const sumP: number[] = Array(2 * die + 1).fill(0);
  for (let a = 1; a <= die; a++) for (let b = 1; b <= die; b++) sumP[a + b] += px[a - 1] * px[b - 1];
  const kk = Math.min(2 * die, Math.max(2, k));
  const pairs = [];
  for (let a = 1; a <= die; a++) { const b = kk - a; if (b >= 1 && b <= die) pairs.push([a, b]); }
  return (
    <div className="lab">
      <h4>Convolution, visibly <span className="lab-sub">every way of splitting the total contributes one product</span></h4>
      <div className="lab-controls">
        <Slider label={`faces = ${die}`} min={2} max={8} value={die} onChange={v => { setDie(v); setK(Math.min(2 * v, k)); }} />
        <Slider label={`k = ${kk}`} min={2} max={2 * die} value={kk} onChange={setK} out="target sum" />
      </div>
      <div className="row" style={{ gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
        {pairs.map(([a, b]) => <span key={a} className="chip known">{a}+{b}</span>)}
        <span className="tiny muted">— {pairs.length} split{pairs.length === 1 ? '' : 's'}, each worth (1/{die})²</span>
      </div>
      <MiniBars values={sumP.slice(2)} labels={sumP.slice(2).map((_, i) => `${i + 2}`)} highlight={kk - 2} />
      <div className="small mt">
        <Tex tex={`P(X+Y=${kk})=\\sum_x P(X=x)P(Y=${kk}-x)=${pairs.length}\\cdot\\tfrac{1}{${die * die}}=${fmt(pairs.length / (die * die), 4)}`} />
      </div>
      <div className="tiny muted mt">The triangle shape IS the convolution: middle totals have the most splits. This one sum rule powers Pois+Pois=Pois and Bin+Bin=Bin.</div>
    </div>
  );
}

/* ---------- 8 · joint pdf rectangle (joint-continuous, independence-continuous) ---------- */

export function RectLab() {
  const [ab, setAb] = useState([0.5, 1.5]);
  const [cd, setCd] = useState([0.25, 0.75]);
  const [a, b] = [Math.min(...ab), Math.max(...ab)];
  const [c, d] = [Math.min(...cd), Math.max(...cd)];
  const fxTerm = Math.exp(-a) - Math.exp(-b);
  const fyTerm = Math.exp(-2 * c) - Math.exp(-2 * d);
  const W = 300, H = 170, X0 = 34, Y0 = 14, XW = 250, YH = 130;
  const sx = (x: number) => X0 + (x / 4) * XW;
  const sy = (y: number) => Y0 + YH - (y / 2) * YH;
  const shade: React.ReactNode[] = [];
  for (let i = 0; i < 16; i++) for (let j = 0; j < 10; j++) {
    const x = (i / 16) * 4, y = (j / 10) * 2;
    shade.push(<rect key={`${i}-${j}`} x={sx(x)} y={sy(y + 0.2)} width={XW / 16} height={YH / 10}
      fill="var(--known)" opacity={0.55 * Math.exp(-x - 2 * y)} />);
  }
  return (
    <div className="lab">
      <h4>Volume over a rectangle <span className="lab-sub">f(x,y) = 2e^(−x−2y) — a separable tent</span></h4>
      <div className="lab-controls">
        <Slider label={`x ∈ (${fmt(a, 2)}, ${fmt(b, 2)}]`} min={0} max={400} value={ab[0] * 100} onChange={v => setAb([v / 100, ab[1]])} />
        <Slider label="…to" min={0} max={400} value={ab[1] * 100} onChange={v => setAb([ab[0], v / 100])} />
        <Slider label={`y ∈ (${fmt(c, 2)}, ${fmt(d, 2)}]`} min={0} max={200} value={cd[0] * 100} onChange={v => setCd([v / 100, cd[1]])} />
        <Slider label="…to" min={0} max={200} value={cd[1] * 100} onChange={v => setCd([cd[0], v / 100])} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ maxWidth: 420 }}>
        {shade}
        <rect x={sx(a)} y={sy(d)} width={Math.max(0, sx(b) - sx(a))} height={Math.max(0, sy(c) - sy(d))}
          fill="none" stroke="var(--warn)" strokeWidth={2} rx={2} />
        <text x={X0} y={H - 2} fontSize={9} fill="var(--muted)">x →</text>
        <text x={4} y={Y0 + 8} fontSize={9} fill="var(--muted)">y</text>
      </svg>
      <div className="small mt">
        <Tex tex={`P=\\underbrace{(e^{-${fmt(a, 2)}}-e^{-${fmt(b, 2)}})}_{X\\ \\text{factor}\\ =\\ ${fmt(fxTerm, 3)}}\\times\\underbrace{(e^{-${fmt(2 * c, 2)}}-e^{-${fmt(2 * d, 2)}})}_{Y\\ \\text{factor}\\ =\\ ${fmt(fyTerm, 3)}}=${fmt(fxTerm * fyTerm, 4)}`} />
      </div>
      <div className="tiny muted mt">The double integral splits into two one-dimensional factors because the density separates: X ~ Exp(1) ⟂ Y ~ Exp(2). Separable density ⟹ independent — and rectangle probabilities become products.</div>
    </div>
  );
}

/* ---------- 9 · LOTUS (lotus) ---------- */

const GFNS: { id: string; label: string; tex: string; f: (x: number) => number; linear: boolean }[] = [
  { id: 'sq', label: 'x²', tex: 'g(x)=x^2', f: x => x * x, linear: false },
  { id: 'dev', label: '(x−3.5)²', tex: 'g(x)=(x-3.5)^2', f: x => (x - 3.5) ** 2, linear: false },
  { id: 'lin', label: '2x+1', tex: 'g(x)=2x+1', f: x => 2 * x + 1, linear: true },
  { id: 'inv', label: '1/x', tex: 'g(x)=1/x', f: x => 1 / x, linear: false },
];

export function LotusLab() {
  const [g, setG] = useState(GFNS[0]);
  const faces = [1, 2, 3, 4, 5, 6];
  const eg = faces.reduce((a, x) => a + g.f(x) / 6, 0);
  const ge = g.f(3.5);
  return (
    <div className="lab">
      <h4>LOTUS lens <span className="lab-sub">push the die through g — average AFTER transforming</span></h4>
      <div className="row" style={{ gap: 6 }}>
        {GFNS.map(fn => (
          <button key={fn.id} className={`chip clickable ${g.id === fn.id ? 'known' : ''}`} onClick={() => { setG(fn); sfx.click(); }}>{fn.label}</button>
        ))}
      </div>
      <MiniBars values={faces.map(x => g.f(x))} labels={faces.map(x => `g(${x})`)} />
      <div className="small mt">
        <Tex tex={`E[g(X)]=\\sum g(x)\\tfrac16=${fmt(eg, 3)}\\qquad g(E[X])=g(3.5)=${fmt(ge, 3)}`} />
      </div>
      <div className={`tiny mt ${g.linear ? '' : ''}`} style={{ color: g.linear ? 'var(--good)' : 'var(--bad)', fontWeight: 600 }}>
        {g.linear
          ? 'Equal — but ONLY because g is linear. That is linearity of expectation, not a general rule.'
          : `Different by ${fmt(Math.abs(eg - ge), 3)} — E[g(X)] ≠ g(E[X]). Averaging and transforming do not commute.`}
      </div>
      <div className="tiny muted mt">LOTUS: reuse the pmf of X, transform only the VALUES, never the probabilities. No need to find the distribution of g(X).</div>
    </div>
  );
}

/* ---------- 10 · linearity (linearity) ---------- */

export function LinearityLab() {
  const [a, setA] = useState(3);
  const [bb, setB] = useState(-1);
  const [c, setC] = useState(5);
  const [dependent, setDependent] = useState(false);
  // X = die; Y = coin(0/1) independent, or Y = parity of X (fully dependent)
  const ex = 3.5;
  const ey = 0.5;
  let direct = 0;
  for (let x = 1; x <= 6; x++) {
    if (dependent) direct += (a * x + bb * (x % 2) + c) / 6;
    else for (const y of [0, 1]) direct += (a * x + bb * y + c) / 12;
  }
  const viaLin = a * ex + bb * ey + c;
  return (
    <div className="lab">
      <h4>Linearity, unconditionally <span className="lab-sub">E[aX + bY + c] — try to break it with dependence</span></h4>
      <div className="lab-controls">
        <Slider label={`a = ${a}`} min={-4} max={4} value={a} onChange={setA} />
        <Slider label={`b = ${bb}`} min={-4} max={4} value={bb} onChange={setB} />
        <Slider label={`c = ${c}`} min={-6} max={6} value={c} onChange={setC} />
      </div>
      <div className="row mt">
        <button className={`chip clickable ${!dependent ? 'known' : ''}`} onClick={() => { setDependent(false); sfx.click(); }}>Y = independent coin</button>
        <button className={`chip clickable ${dependent ? 'known' : ''}`} onClick={() => { setDependent(true); sfx.click(); }}>Y = parity of X (dependent!)</button>
      </div>
      <div className="feedback-banner ok mt">
        <Tex tex={`\\text{direct}=${fmt(direct, 3)}\\qquad aE[X]+bE[Y]+c=${fmt(viaLin, 3)}`} />
      </div>
      <div className="tiny muted mt">
        Identical either way — even when Y is a deterministic function of X. Linearity NEVER asks for independence; that is what makes E[Bin] = np a one-line proof. (Products are the ones that need independence.)
      </div>
    </div>
  );
}

/* ---------- 11 · variance of sums (variance-sums) ---------- */

function corrCloud(rho: number, n = 240): [number, number][] {
  // deterministic pseudo-cloud so slider moves are smooth
  const pts: [number, number][] = [];
  let s = 12345;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const u1 = rnd(), u2 = rnd(), u3 = rnd(), u4 = rnd();
    const z1 = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
    const z2 = Math.sqrt(-2 * Math.log(u3 + 1e-9)) * Math.cos(2 * Math.PI * u4);
    pts.push([z1, rho * z1 + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2]);
  }
  return pts;
}

export function VarSumLab() {
  const [rho, setRho] = useState(0);
  const [minus, setMinus] = useState(false);
  const cov = rho; // unit variances
  const v = 2 + (minus ? -2 : 2) * cov;
  const pts = useMemo(() => corrCloud(rho), [rho]);
  const W = 190, H = 150;
  return (
    <div className="lab">
      <h4>Var(X ± Y) <span className="lab-sub">the cross-term is the whole story</span></h4>
      <div className="lab-controls">
        <Slider label={`ρ = ${fmt(rho, 2)}`} min={-95} max={95} value={rho * 100} onChange={v2 => setRho(v2 / 100)} />
      </div>
      <div className="row mt">
        <button className={`chip clickable ${!minus ? 'known' : ''}`} onClick={() => setMinus(false)}>X + Y</button>
        <button className={`chip clickable ${minus ? 'known' : ''}`} onClick={() => setMinus(true)}>X − Y</button>
      </div>
      <div className="row" style={{ alignItems: 'flex-start', gap: 14 }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: 190 }}>
          {pts.map(([x, y], i) => (
            <circle key={i} cx={W / 2 + x * 26} cy={H / 2 - y * 22} r={1.6}
              fill={x * y > 0 ? 'var(--good)' : 'var(--bad)'} opacity={0.55} />
          ))}
        </svg>
        <div style={{ flex: 1, minWidth: 150 }}>
          <MiniBars values={[1, 1, Math.abs((minus ? -2 : 2) * cov)]} labels={['Var X', 'Var Y', '|±2Cov|']} height={95}
            color="var(--known)" highlight={2} />
          <div className="small mt">
            <Tex tex={`\\mathrm{Var}(X${minus ? '-' : '+'}Y)=1+1${minus ? '-' : '+'}2(${fmt(cov, 2)})=${fmt(v, 2)}`} />
          </div>
        </div>
      </div>
      <div className="tiny muted mt">
        ρ = 0: variances simply add — even for X − Y. Positive ρ makes the SUM wilder and the DIFFERENCE calmer (shared noise cancels). Bienaymé: for independent sums, just add all the variances.
      </div>
    </div>
  );
}

/* ---------- 12 · indicators (indicators) ---------- */

export function BulbLab() {
  const [p, setP] = useState(0.3);
  const [lit, setLit] = useState<boolean[] | null>(null);
  const [hist, setHist] = useState<number[]>([]);
  const n = 20;
  const flip = () => {
    const L = Array.from({ length: n }, () => Math.random() < p);
    setLit(L);
    setHist(h => [...h, L.filter(Boolean).length].slice(-200));
    sfx.coin();
  };
  const avg = hist.length ? hist.reduce((a, b) => a + b, 0) / hist.length : null;
  return (
    <div className="lab">
      <h4>Indicator bulbs <span className="lab-sub">count = sum of 0/1 bulbs, so E[count] = sum of P(on)</span></h4>
      <div className="lab-controls">
        <Slider label={`p = ${fmt(p)}`} min={5} max={95} value={p * 100} onChange={v => setP(v / 100)} out="per bulb" />
      </div>
      <div className="row" style={{ gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={lit?.[i] ? 'dot-good' : 'dot-bad'} style={{ opacity: lit ? 1 : 0.3 }} />
        ))}
        {lit && <span className="small muted">→ {lit.filter(Boolean).length} on</span>}
      </div>
      <div className="row mt">
        <button className="btn sm primary" onClick={flip}>Flip all 20</button>
        {avg !== null && (
          <span className="tiny muted">
            average over {hist.length} runs: {fmt(avg, 2)} — theory says E[N] = Σ E[1ᵢ] = 20p = {fmt(20 * p, 2)}
          </span>
        )}
      </div>
      <div className="tiny muted mt"><Tex tex={'E[\\mathbb 1_A]=1\\cdot P(A)+0\\cdot P(A^c)=P(A)'} /> — expectations of indicators ARE probabilities; linearity then counts anything, dependent or not.</div>
    </div>
  );
}

/* ---------- 13 · Markov & Chebyshev (markov-chebyshev) ---------- */

export function TailBoundLab() {
  const [x, setX] = useState(3);
  // X ~ Bin(20, 0.3): E = 6, Var = 4.2
  const nB = 20, pB = 0.3, mean = 6, varr = 4.2;
  const tail = Array.from({ length: nB + 1 }, (_, k) => k).filter(k => k >= x).reduce((a, k) => a + binomPmf(nB, pB, k), 0);
  const markov = x > 0 ? Math.min(1, mean / x) : 1;
  const cheb = x > mean ? Math.min(1, varr / ((x - mean) ** 2)) : null;
  return (
    <div className="lab">
      <h4>Leash the tail <span className="lab-sub">Bin(20, 0.3): truth vs the two universal bounds</span></h4>
      <div className="lab-controls">
        <Slider label={`x = ${x}`} min={1} max={20} value={x} onChange={setX} out="threshold" />
      </div>
      <MiniBars values={[tail, markov, cheb ?? 0]} labels={['true P(X≥x)', 'Markov E[X]/x', x > mean ? 'Chebyshev' : '(needs x>mean)']} height={110} />
      <div className="small mt">
        <Tex tex={`P(X\\ge ${x})=${tail < 0.0001 ? tail.toExponential(1) : fmt(tail, 4)}\\ \\le\\ \\tfrac{6}{${x}}=${fmt(markov, 3)}${cheb !== null ? `\\ \\text{and}\\ \\le\\ \\tfrac{4.2}{(${x}-6)^2}=${fmt(cheb, 3)}` : ''}`} />
      </div>
      <div className="tiny muted mt">
        Markov needs only the mean; Chebyshev adds the variance and tightens the leash (once x is beyond the mean). Both can be wildly loose — their glory is working for EVERY distribution. Chebyshev applied to X̄ₙ proves the Law of Large Numbers.
      </div>
    </div>
  );
}

/* ---------- 14 · tail-sum formula (expectation-tail) ---------- */

export function SlabLab() {
  const [p, setP] = useState(0.3);
  const [upTo, setUpTo] = useState(8);
  const slabs = Array.from({ length: upTo }, (_, j) => Math.pow(1 - p, j)); // P(X ≥ j+1)
  const partial = slabs.reduce((a, b) => a + b, 0);
  return (
    <div className="lab">
      <h4>Stack the survival slabs <span className="lab-sub">Geom(p): E[X] = Σ P(X ≥ j), one slab per level</span></h4>
      <div className="lab-controls">
        <Slider label={`p = ${fmt(p)}`} min={10} max={80} value={p * 100} onChange={v => setP(v / 100)} />
        <Slider label={`slabs = ${upTo}`} min={1} max={25} value={upTo} onChange={setUpTo} />
      </div>
      <MiniBars values={slabs} labels={slabs.map((_, j) => `${j + 1}`)} height={100} />
      <div className="small mt">
        <Tex tex={`\\sum_{j=1}^{${upTo}}P(X\\ge j)=${fmt(partial, 3)}\\ \\longrightarrow\\ \\tfrac1p=${fmt(1 / p, 3)}`} />
      </div>
      <div className="tiny muted mt">
        Each slab is P(X ≥ j) = (1−p)^(j−1) — no x·pmf products, no derivative tricks, and the geometric mean 1/p appears anyway. The continuous twin: E[X] = ∫ P(X ≥ x) dx gives Exp(λ) mean 1/λ in one line.
      </div>
    </div>
  );
}
