import { useMemo, useState } from 'react';
import { fracTex, mulberry32, simplify } from '../../lib/utils';
import { sfx } from '../../lib/sound';
import { Tex } from '../Math';

/* Conditional probability as world-shrinking: 100 people, condition, watch the
   irrelevant ones fade, see the denominator change. Includes Monty Hall predict-first. */

export function CondLab() {
  const [tab, setTab] = useState<'people' | 'monty'>('people');
  return (
    <div className="lab">
      <div className="row spread">
        <h4>Conditioning = shrinking the world</h4>
        <div className="seg">
          <button className={tab === 'people' ? 'active' : ''} onClick={() => setTab('people')}>100 people</button>
          <button className={tab === 'monty' ? 'active' : ''} onClick={() => setTab('monty')}>Monty Hall</button>
        </div>
      </div>
      {tab === 'people' ? <People /> : <Monty />}
    </div>
  );
}

function People() {
  const [conditioned, setConditioned] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 1e6));
  // 100 people; A = plays football (28), B = goes to the gym (40), both = 16
  const people = useMemo(() => {
    const rng = mulberry32(seed);
    const arr = Array.from({ length: 100 }, (_, i) => ({ i, A: false, B: false }));
    const idx = arr.map(p => p.i).sort(() => rng() - 0.5);
    idx.slice(0, 16).forEach(i => { arr[i].A = true; arr[i].B = true; });
    idx.slice(16, 28).forEach(i => { arr[i].A = true; });
    idx.slice(28, 52).forEach(i => { arr[i].B = true; });
    return arr;
  }, [seed]);
  const nA = 28, nB = 40, nAB = 16;
  const [pn, pd] = simplify(nA, 100);
  const [cn, cd] = simplify(nAB, nB);
  return (
    <div>
      <div className="row" style={{ margin: '8px 0' }}>
        <span className="chip known">Plays football (A) — {nA}</span>
        <span className="chip cond">Gym member (B) — {nB}</span>
        <span className="chip good">Both — {nAB}</span>
      </div>
      <svg viewBox="0 0 300 128" style={{ maxWidth: 480 }}>
        {people.map(p => {
          const x = 10 + (p.i % 20) * 14.5, y = 12 + Math.floor(p.i / 20) * 23;
          const gone = conditioned && !p.B;
          return (
            <g key={p.i} className={`person ${gone ? 'gone' : ''}`} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y - 3} r={3.4} fill={p.A ? 'var(--known)' : 'var(--faint)'} />
              <rect x={x - 3.4} y={y} width={6.8} height={9} rx={2.6}
                fill={p.A && p.B ? 'var(--good)' : p.A ? 'var(--known)' : p.B ? 'var(--cond)' : 'var(--faint)'} />
            </g>
          );
        })}
      </svg>
      <div className="lab-controls">
        <button className={`btn ${conditioned ? '' : 'primary'}`} onClick={() => { sfx.click(); setConditioned(v => !v); }}>
          {conditioned ? 'Restore everyone' : 'You learn: "they\'re a gym member" — condition on B'}
        </button>
        <div className="row" style={{ gap: 18 }}>
          <div>
            <div className="tiny muted">before</div>
            <Tex tex={`P(A)=\\frac{${nA}}{100}=${fracTex(pn, pd)}`} />
          </div>
          <div style={{ opacity: conditioned ? 1 : 0.25, transition: 'opacity .4s' }}>
            <div className="tiny muted">after — new world = the {nB} gym members</div>
            <Tex tex={`P(A\\mid B)=\\frac{|A\\cap B|}{|B|}=\\frac{${nAB}}{${nB}}=${fracTex(cn, cd)}`} />
          </div>
        </div>
        {conditioned && <div className="tiny muted pop">The 60 non-members faded away — they are no longer possible. Same footballers on top ({nAB} of them), NEW denominator ({nB}). That is the whole formula.</div>}
      </div>
    </div>
  );
}

/* ---- Monty Hall: predict → experiment → surprise → explanation ---- */
function Monty() {
  const [phase, setPhase] = useState<'predict' | 'play' | 'result'>('predict');
  const [prediction, setPrediction] = useState<'switch' | 'stay' | 'same' | null>(null);
  const [stats, setStats] = useState({ switchW: 0, switchN: 0, stayW: 0, stayN: 0 });
  const [last, setLast] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);

  const playOnce = (strategy: 'switch' | 'stay') => {
    const car = Math.floor(Math.random() * 3);
    const pickIdx = Math.floor(Math.random() * 3);
    const win = strategy === 'stay' ? pickIdx === car : pickIdx !== car;
    setStats(s => strategy === 'switch'
      ? { ...s, switchW: s.switchW + (win ? 1 : 0), switchN: s.switchN + 1 }
      : { ...s, stayW: s.stayW + (win ? 1 : 0), stayN: s.stayN + 1 });
    setLast(`${strategy === 'switch' ? 'Switched' : 'Stayed'} → ${win ? 'car — win!' : 'goat'}`);
    win ? sfx.coin() : sfx.wrong();
  };
  const playMany = (n: number) => {
    let sw = 0, st = 0;
    for (let i = 0; i < n; i++) {
      if (Math.floor(Math.random() * 3) !== Math.floor(Math.random() * 3)) sw++;
      if (Math.floor(Math.random() * 3) === Math.floor(Math.random() * 3)) st++;
    }
    setStats(s => ({ switchW: s.switchW + sw, switchN: s.switchN + n, stayW: s.stayW + st, stayN: s.stayN + n }));
    setLast(`${n} games each way simulated`);
    sfx.dice();
  };

  if (phase === 'predict') {
    return (
      <div className="lab-controls">
        <div className="predict-banner">
          <div className="bold">Predict first</div>
          <p className="small">Three doors: one car, two goats. You pick a door. The host — who knows where the car is — opens a DIFFERENT door showing a goat, and offers a swap. Does switching help?</p>
          <div className="row">
            <button className="btn sm" onClick={() => { setPrediction('switch'); setPhase('play'); }}>Switch is better</button>
            <button className="btn sm" onClick={() => { setPrediction('stay'); setPhase('play'); }}>Stay is better</button>
            <button className="btn sm" onClick={() => { setPrediction('same'); setPhase('play'); }}>Makes no difference</button>
          </div>
        </div>
        <div className="tiny faint">Extra material — not in the Bath notes, but pure conditional probability.</div>
      </div>
    );
  }

  const swRate = stats.switchN ? stats.switchW / stats.switchN : null;
  const stRate = stats.stayN ? stats.stayW / stats.stayN : null;
  const enough = stats.switchN + stats.stayN >= 60;
  return (
    <div className="lab-controls">
      <div className="row">
        <button className="btn sm primary" onClick={() => playOnce('stay')}>Play once: stay</button>
        <button className="btn sm primary" onClick={() => playOnce('switch')}>Play once: switch</button>
        <button className="btn sm" onClick={() => playMany(100)}>Simulate 100 each</button>
        <button className="btn sm" onClick={() => playMany(1000)}>Simulate 1000 each</button>
      </div>
      {last && <div className="small muted">{last}</div>}
      <div className="grid2">
        <div className="stat-tile">
          <div className="lbl">STAY wins</div>
          <div className="val" style={{ color: 'var(--bad)' }}>{stRate === null ? '—' : `${(stRate * 100).toFixed(1)}%`}</div>
          <div className="tiny faint">{stats.stayW}/{stats.stayN}</div>
        </div>
        <div className="stat-tile">
          <div className="lbl">SWITCH wins</div>
          <div className="val" style={{ color: 'var(--good)' }}>{swRate === null ? '—' : `${(swRate * 100).toFixed(1)}%`}</div>
          <div className="tiny faint">{stats.switchW}/{stats.switchN}</div>
        </div>
      </div>
      {enough && (
        <div className="pop">
          <div className="feedback-banner ok">
            {prediction === 'switch' ? '✓ Your prediction was right!' : prediction === 'stay' ? '✗ Surprise! Your prediction said stay.' : '✗ Surprise! It very much makes a difference.'}
            {' '}Switching wins ≈ 2/3.
          </div>
          <button className="btn sm ghost mt" onClick={() => setReveal(v => !v)}>{reveal ? '▾' : '▸'} Why?</button>
          {reveal && (
            <div className="small muted" style={{ padding: '6px 4px' }}>
              Your first pick holds the car with probability <Tex tex={'\\tfrac13'} /> — and NOTHING the host does changes that (he can always open a goat door).
              So the OTHER unopened door carries the remaining <Tex tex={'\\tfrac23'} />. Conditioning done right: the host's reveal is information about
              <em> his</em> door, not yours. The reduced world {'{your door, other door}'} is NOT 50:50 — the classic wrong-sample-space trap.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
