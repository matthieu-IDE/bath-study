import { useState } from 'react';
import { Tex } from '../Math';

/** Small exact models: controls change the assumptions, not only the picture. */
export function AssumptionLab({ page }: { page: number }) {
  return page < 7 ? null : page <= 30 ? <EventWorkshop/> : page >= 64 && page <= 71 ? <DensityWorkshop/> : <DependenceWorkshop/>;
}
function EventWorkshop() {
  const [e, setE] = useState([2,4,6]);
  const [f, setF] = useState([5,6]);
  const [operation, setOperation] = useState('intersection');
  const [weighted, setWeighted] = useState(false);
  const toggle = (a: number[], n: number) => a.includes(n) ? a.filter(x => x !== n) : [...a,n];
  const contains = (n: number) => operation === 'union' ? e.includes(n) || f.includes(n) : operation === 'difference' ? e.includes(n) && !f.includes(n) : operation === 'exactly one' ? e.includes(n) !== f.includes(n) : e.includes(n) && f.includes(n);
  const outcomes = [1,2,3,4,5,6], selected = outcomes.filter(contains);
  const denominator = weighted ? 21 : 6;
  const numerator = selected.reduce((s,n) => s + (weighted ? n : 1),0);
  return <section className="mc-lab"><div className="mc-label">CHANGE THE MODEL</div><h3>Build an event. Give it a probability.</h3>
    <p>Click outcomes to change the two sets. Predict the resulting event before choosing an operation.</p>
    {(['E','F'] as const).map(name => <div className="mc-outcomes" key={name}><strong>{name}</strong>{outcomes.map(n => <button className="btn" key={n} aria-pressed={(name === 'E' ? e : f).includes(n)} onClick={() => name === 'E' ? setE(toggle(e,n)) : setF(toggle(f,n))}>{n}</button>)}</div>)}
    <label>Event operation <select value={operation} onChange={v => setOperation(v.target.value)}>{['intersection','union','difference','exactly one'].map(o => <option key={o}>{o}</option>)}</select></label>
    <label className="mc-check"><input type="checkbox" checked={weighted} onChange={v => setWeighted(v.target.checked)}/> Weight outcome n by n, instead of a fair die</label>
    <div className="mc-prob-bars" aria-label="Probability of each outcome">{outcomes.map(n => <div key={n}><div className={'mc-prob-bar ' + (contains(n) ? 'selected' : '')} style={{height: (weighted ? n * 17 : 60) + 'px'}}/><small>{n}<br/>{weighted ? n : 1}/{denominator}</small></div>)}</div>
    <div className="mc-result" aria-live="polite">Selected outcomes: {'{' + selected.join(', ') + '}'}<br/>Probability = {numerator}/{denominator} = {(numerator/denominator).toFixed(4)}</div>
    <p><strong>Explain the difference:</strong> changing the weights changes probability, but leaves set membership unchanged. Counting selected outcomes only works when the outcomes are equally likely.</p>
  </section>;
}
function DependenceWorkshop() {
  const [q, setQ] = useState(0.25);
  const [condition, setCondition] = useState(false);
  const probabilities = [q,0.5-q,0.5-q,q];
  const independent = Math.abs(q-0.25) < 1e-8;
  return <section className="mc-lab"><div className="mc-label">BREAK AN ASSUMPTION</div><h3>Same marginals. Different joint behaviour.</h3>
    <p>X and Y each have a 50% chance of being 1. Does that tell you how often both are 1? Move the slider and test the product rule.</p>
    <label>Joint probability q = P(X=1, Y=1): <strong>{q.toFixed(2)}</strong><input aria-label="Joint probability q" type="range" min="0" max="0.5" step="0.01" value={q} onChange={e => setQ(Number(e.target.value))}/></label>
    <label className="mc-check"><input type="checkbox" checked={condition} onChange={e => setCondition(e.target.checked)}/> Condition on Y = 1: discard Y = 0 and renormalise</label>
    <div className="mc-joint">{probabilities.map((p,i) => <div key={i} style={{opacity:condition && i%2 === 0 ? 0.25 : 1}}><span>X={Math.floor(i/2)}, Y={i%2}</span><div className="mc-joint-fill" style={{width:(p*200)+'%'}}/><strong>{condition ? (i%2 === 0 ? 'excluded' : (2*p).toFixed(2)) : p.toFixed(2)}</strong></div>)}</div>
    <div className="mc-result" aria-live="polite">P(X=1)P(Y=1) = 0.25 · P(X=1,Y=1) = {q.toFixed(2)}<br/><strong>{independent ? 'Independent: all four cells factorise.' : 'Dependent: the joint probability fails the product test.'}</strong><br/>P(X=1 | Y=1) = {(2*q).toFixed(2)}</div>
    <Tex tex={'\\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]=q-\\tfrac14'} display/>
    <p>Here covariance is {(q-0.25).toFixed(2)} and Var(X+Y) is {(2*q).toFixed(2)}. At q=0, X+Y is always 1. At q=½ they move together. The individual distributions stay fixed throughout.</p>
    <button className="btn sm" onClick={() => setQ(0.25)}>Restore independence</button>
  </section>;
}
function DensityWorkshop() {
  const [rate, setRate] = useState(1);
  const [cut, setCut] = useState(1);
  const points = Array.from({length:121},(_,i) => { const x=i/20; return [x*50,150-rate*Math.exp(-rate*x)*45]; });
  const polygon = [[0,150], ...points.filter(p => p[0] <= cut*50), [cut*50,150]];
  const area=1-Math.exp(-rate*cut);
  return <section className="mc-lab"><div className="mc-label">HEIGHT IS NOT PROBABILITY</div><h3>Build a CDF from shaded area</h3>
    <label>Exponential rate λ: {rate.toFixed(1)}<input aria-label="Exponential rate" type="range" min="0.2" max="3" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))}/></label>
    <label>Cutoff t: {cut.toFixed(1)}<input aria-label="Density cutoff" type="range" min="0" max="6" step="0.1" value={cut} onChange={e => setCut(Number(e.target.value))}/></label>
    <svg viewBox="-10 0 325 180" role="img" aria-label={'Exponential density, shaded from 0 to '+cut+'. Shaded probability '+area.toFixed(3)}><polygon points={polygon.map(p => p.join(',')).join(' ')} fill="var(--known)" opacity=".2"/><polyline points={points.map(p => p.join(',')).join(' ')} fill="none" stroke="var(--known)" strokeWidth="2.5"/><path d="M0 0V150H300" fill="none" stroke="var(--muted)"/><text x="0" y="168" fill="var(--text)">0</text><text x="285" y="168" fill="var(--text)">6</text><line x1={cut*50} x2={cut*50} y1="0" y2="150" stroke="var(--cond)" strokeDasharray="3 4"/></svg>
    <div className="mc-result" aria-live="polite">Height f(t) = {(rate*Math.exp(-rate*cut)).toFixed(3)}<br/>Area F(t) = P(X≤t) = {area.toFixed(3)}<br/>Point probability P(X=t) = 0</div>
    <Tex tex="F(t)=\int_0^t \lambda e^{-\lambda x}\,dx=1-e^{-\lambda t}" display/>
    <p>Raise λ above 1: the density starts above 1, which is allowed. The total area is still 1; the graph continues beyond the displayed interval.</p>
  </section>;
}
