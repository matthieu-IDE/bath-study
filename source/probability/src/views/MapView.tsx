import { useMemo, useState } from 'react';
import { useApp } from '../store';
import { CHAPTERS, CONCEPT_MAP, CONCEPTS, PAGE_MAP } from '../data/course';
import { BAND_LABEL, masteryBand, pageMastery, retainedMastery } from '../engine/mastery';
import { chapterReadiness } from '../engine/session';
import { computeRatings, ratingBand } from '../engine/rating';
import { Rich } from '../components/Math';
import { BAND_COLORS, Icon, MasteryDot } from '../components/Icon';

type Tab = 'brain' | 'web' | 'graph' | 'pages';

/* Chapter cluster centres inside the brain silhouette (viewBox 0 0 720 520). */
const CLUSTERS: Record<number, { x: number; y: number }> = {
  1: { x: 168, y: 248 },
  2: { x: 272, y: 148 },
  3: { x: 398, y: 118 },
  4: { x: 516, y: 168 },
  5: { x: 574, y: 272 },
  6: { x: 452, y: 330 },
  7: { x: 316, y: 330 },
};

function neuronPos(chapter: number, i: number): { x: number; y: number } {
  const c = CLUSTERS[chapter] ?? { x: 360, y: 260 };
  if (i === 0) return c;
  const angle = i * 2.39996; // golden angle spiral
  const r = 16 + Math.sqrt(i) * 17;
  return { x: c.x + Math.cos(angle) * r, y: c.y + Math.sin(angle) * r * 0.82 };
}

export function MapView() {
  const { conceptStates, attempts, nav, setPdfPage, focusConcept } = useApp();
  const [sel, setSel] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('brain');

  const ratings = useMemo(() => computeRatings(attempts), [attempts]);
  const readiness = useMemo(() => chapterReadiness(conceptStates), [conceptStates]);
  const positions = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    for (const ch of CHAPTERS) ch.conceptIds.forEach((id, i) => { pos[id] = neuronPos(ch.n, i); });
    return pos;
  }, []);

  const selected = sel ? CONCEPT_MAP[sel] : null;
  const selState = sel ? conceptStates[sel] : undefined;
  const overallBand = ratingBand(ratings.overall);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">Your course, as a living brain</div>
          <h2>Brain map</h2>
        </div>
        <div className="row">
          <span className="chip" title={`${ratings.games} rated answers`}>
            <Icon name="trophy" size={13} style={{ color: overallBand.color }} />
            <strong>{ratings.overall}</strong>&nbsp;{overallBand.label}
            {ratings.delta7d !== 0 && <span className="tiny" style={{ color: ratings.delta7d > 0 ? 'var(--good)' : 'var(--bad)' }}>&nbsp;{ratings.delta7d > 0 ? '+' : ''}{ratings.delta7d} / 7d</span>}
          </span>
          <div className="seg">
            <button className={tab === 'brain' ? 'active' : ''} onClick={() => setTab('brain')}>Brain</button>
            <button className={tab === 'web' ? 'active' : ''} onClick={() => setTab('web')}>Skills web</button>
            <button className={tab === 'graph' ? 'active' : ''} onClick={() => setTab('graph')}>Graph</button>
            <button className={tab === 'pages' ? 'active' : ''} onClick={() => setTab('pages')}>98 pages</button>
          </div>
        </div>
      </div>

      {tab === 'brain' && (
        <>
          <div className="row mb tiny muted" style={{ gap: 14 }}>
            {BAND_LABEL.map((l, i) => <span key={i} className="row" style={{ gap: 5 }}><MasteryDot band={i} size={8} /> {l}</span>)}
            <span className="faint">bright glow = retained · pulsing amber = weakness · click a neuron</span>
          </div>
          <div className="map-wrap" style={{ padding: 8 }}>
            <svg viewBox="0 0 720 520" style={{ width: '100%', minWidth: 640 }}>
              <defs>
                <filter id="neuronGlow" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="7" />
                </filter>
              </defs>
              {/* brain silhouette */}
              <path d="M168 352 C 92 336 58 252 88 186 C 112 116 200 66 300 56 C 410 40 520 58 588 118 C 650 170 672 252 640 314 C 616 366 556 402 478 410 C 448 462 366 474 322 428 C 282 452 218 440 198 396 C 182 382 174 368 168 352 Z"
                fill="var(--card)" stroke="var(--line2)" strokeWidth="2" />
              <path d="M478 410 C 500 430 540 434 560 416 C 580 398 578 372 560 360" fill="none" stroke="var(--line2)" strokeWidth="2" />
              <path d="M330 60 C 320 130 330 200 316 262 M 430 52 C 440 130 430 210 452 262 M 200 120 C 240 170 260 220 250 268 M 560 140 C 530 190 520 240 540 286"
                fill="none" stroke="var(--line)" strokeWidth="1.4" opacity="0.7" />
              {/* chapter labels */}
              {CHAPTERS.map(ch => (
                <text key={ch.n} x={CLUSTERS[ch.n].x} y={CLUSTERS[ch.n].y - (ch.n === 1 ? 54 : 44)} textAnchor="middle"
                  fontSize="10" fontWeight={650} fill={ch.examinable ? 'var(--faint)' : 'var(--line2)'}>
                  Ch{ch.n}
                </text>
              ))}
              {/* synapses (prerequisites) */}
              {CONCEPTS.flatMap(c => c.prereqs.map(p => {
                const a = positions[p], b = positions[c.id];
                if (!a || !b) return null;
                const hot = sel === c.id || sel === p;
                const mx = (a.x + b.x) / 2 + (a.y - b.y) * 0.18;
                const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.18;
                return (
                  <path key={`${p}->${c.id}`} className="synapse"
                    d={`M${a.x},${a.y} Q ${mx},${my} ${b.x},${b.y}`}
                    fill="none" stroke={hot ? 'var(--cond)' : 'var(--line2)'}
                    strokeWidth={hot ? 1.8 : 0.8} opacity={hot ? 0.95 : 0.4} />
                );
              }))}
              {/* neurons */}
              {CONCEPTS.map(c => {
                const p = positions[c.id];
                const st = conceptStates[c.id];
                const band = masteryBand(st);
                const ret = st ? retainedMastery(st) : 0;
                const weak = band === 1 || (st?.confMatrix?.wc ?? 0) > 0;
                return (
                  <g key={c.id} className="map-node" onClick={() => setSel(c.id === sel ? null : c.id)}>
                    <title>{c.title} — {BAND_LABEL[band]}</title>
                    {band > 0 && (
                      <circle cx={p.x} cy={p.y} r={13} fill={BAND_COLORS[band]}
                        opacity={0.16 + ret * 0.55} filter="url(#neuronGlow)" />
                    )}
                    <circle cx={p.x} cy={p.y} r={sel === c.id ? 9 : 6.5}
                      fill={BAND_COLORS[band]} className={weak && band > 0 ? 'neuron-weak' : ''}
                      stroke={sel === c.id ? 'var(--cond)' : c.examinable ? 'var(--card)' : 'var(--line2)'}
                      strokeWidth={sel === c.id ? 2.5 : 1.5}
                      opacity={c.examinable ? 1 : 0.55} />
                  </g>
                );
              })}
            </svg>
          </div>
        </>
      )}

      {tab === 'web' && (
        <div className="grid2" style={{ alignItems: 'start' }}>
          <div className="card card-pad">
            <div className="section-title"><Icon name="web" size={14} /> Skills web — readiness by chapter</div>
            <SkillsRadar readiness={readiness} />
          </div>
          <div className="card card-pad">
            <div className="section-title"><Icon name="trophy" size={14} /> Ratings — every question is an opponent</div>
            <div className="row mt" style={{ gap: 14 }}>
              <div className="stat-tile" style={{ flex: 1 }}>
                <div className="lbl">overall</div>
                <div className="val" style={{ color: overallBand.color }}>{ratings.overall}</div>
                <div className="tiny faint">{overallBand.label} · {ratings.games} rated answers</div>
              </div>
              <div className="stat-tile" style={{ flex: 1 }}>
                <div className="lbl">last 7 days</div>
                <div className="val" style={{ color: ratings.delta7d >= 0 ? 'var(--good)' : 'var(--bad)' }}>{ratings.delta7d >= 0 ? '+' : ''}{ratings.delta7d}</div>
                <div className="tiny faint">beat harder questions to climb faster</div>
              </div>
            </div>
            <div className="mt" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {CHAPTERS.filter(c => c.examinable).map(ch => {
                const r = ratings.byChapter[ch.n] ?? 800;
                const b = ratingBand(r);
                return (
                  <div key={ch.n} className="row" style={{ gap: 10 }}>
                    <span style={{ width: 210, fontSize: 12.5, fontWeight: 550, flexShrink: 0 }}>Ch{ch.n} · {ch.title}</span>
                    <div className="bar-rail" style={{ flex: 1 }}>
                      <div className="bar-fill" style={{ width: `${Math.min(100, ((r - 700) / 1300) * 100)}%`, background: b.color }} />
                    </div>
                    <span className="tiny" style={{ width: 92, textAlign: 'right', color: b.color, fontWeight: 650 }}>{r} · {b.label}</span>
                  </div>
                );
              })}
            </div>
            <p className="tiny muted mt">Ratings follow a chess formula: an L5 question plays at ~2250. Reach the 95% club by beating them.</p>
          </div>
        </div>
      )}

      {tab === 'graph' && (
        <ColumnsGraph conceptStates={conceptStates} sel={sel} setSel={setSel} />
      )}

      {tab === 'pages' && (
        <>
          <div className="row mb tiny muted" style={{ gap: 14 }}>
            {BAND_LABEL.map((l, i) => <span key={i} className="row" style={{ gap: 5 }}><MasteryDot band={i} size={8} /> {l}</span>)}
            <span className="faint">dashed = not examinable · click to open</span>
          </div>
          <div className="pagegrid">
            {PAGE_MAP.map(p => {
              const band = pageMastery(p.page, conceptStates);
              return (
                <div key={p.page} className="pagecell" title={`p${p.page}: ${p.label}`}
                  style={{
                    background: BAND_COLORS[band],
                    color: band === 0 ? 'var(--muted)' : '#fff',
                    outline: p.examinable ? undefined : '2px dashed var(--line2)',
                  }}
                  onClick={() => { setPdfPage(p.page); nav('study'); }}>
                  {p.page}
                </div>
              );
            })}
          </div>
        </>
      )}

      {selected && (tab === 'brain' || tab === 'graph') && (
        <div className="card card-pad mt fade-up">
          <div className="row spread">
            <h3 style={{ fontSize: 16 }}>{selected.title}</h3>
            <span className="chip"><MasteryDot band={masteryBand(selState)} /> {BAND_LABEL[masteryBand(selState)]}</span>
          </div>
          <div className="row mt tiny muted" style={{ gap: 14 }}>
            <span>p{selected.pdfPages[0]}–{selected.pdfPages[1]}</span>
            <span>{selState?.attempts ?? 0} attempts · {selState?.correct ?? 0} correct</span>
            {!selected.examinable && <span className="chip warn">not examinable</span>}
          </div>
          <p className="small muted mt"><Rich text={selected.whyCare} /></p>
          {selected.prereqs.length > 0 && (
            <div className="row mt">
              <span className="tiny muted">needs</span>
              {selected.prereqs.map(p => (
                <button key={p} className="chip clickable" onClick={() => setSel(p)}>
                  <MasteryDot band={masteryBand(conceptStates[p])} size={7} /> {CONCEPT_MAP[p].title}
                </button>
              ))}
            </div>
          )}
          <div className="row mt">
            <button className="btn primary sm" onClick={() => { setPdfPage(selected.pdfPages[0]); focusConcept(selected.id); nav('study'); }}>Open in notes</button>
            <button className="btn sm" onClick={() => nav('practice', selected.id)}>Practise</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* lichess-style radar over the six examinable chapters */
function SkillsRadar({ readiness }: { readiness: ReturnType<typeof chapterReadiness> }) {
  const axes = readiness.filter(r => r.examinable);
  const N = axes.length;
  const cx = 200, cy = 185, R = 130;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const ring = (v: number) => axes.map((_, i) => pt(i, v).map(n => n.toFixed(1)).join(',')).join(' ');
  const valuePoly = axes.map((r, i) => pt(i, Math.max(0.04, r.readiness)).map(n => n.toFixed(1)).join(',')).join(' ');
  return (
    <svg viewBox="0 0 400 385" style={{ maxWidth: 460, margin: '0 auto', display: 'block' }}>
      {[0.25, 0.5, 0.75, 1].map(v => (
        <polygon key={v} points={ring(v)} fill="none" stroke="var(--line)" strokeWidth={v === 1 ? 1.5 : 1} />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--line)" strokeWidth={1} />;
      })}
      <polygon points={valuePoly} fill="color-mix(in srgb, var(--cond) 26%, transparent)" stroke="var(--cond)" strokeWidth={2} strokeLinejoin="round" />
      {axes.map((r, i) => {
        const [x, y] = pt(i, Math.max(0.04, r.readiness));
        return <circle key={i} cx={x} cy={y} r={3.6} fill="var(--cond)" />;
      })}
      {axes.map((r, i) => {
        const [x, y] = pt(i, 1.22);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize="11" fontWeight={650} fill="var(--text)">
            Ch{r.chapter}
            <tspan x={x} dy="12" fontSize="9" fontWeight={450} fill="var(--faint)">{Math.round(r.readiness * 100)}%</tspan>
          </text>
        );
      })}
    </svg>
  );
}

/* the original chapter-column dependency graph, kept as a tab */
function ColumnsGraph({ conceptStates, sel, setSel }: { conceptStates: Record<string, any>; sel: string | null; setSel: (s: string | null) => void }) {
  const layout = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const colW = 168, rowH = 52;
    CHAPTERS.forEach((ch, ci) => {
      ch.conceptIds.forEach((id, ri) => { pos[id] = { x: 30 + ci * colW, y: 66 + ri * rowH }; });
    });
    return { pos, W: 30 + CHAPTERS.length * colW, H: 66 + Math.max(...CHAPTERS.map(c => c.conceptIds.length)) * rowH + 20 };
  }, []);
  return (
    <div className="map-wrap" style={{ padding: 8 }}>
      <svg viewBox={`0 0 ${layout.W} ${layout.H}`} style={{ minWidth: 900, width: '100%' }}>
        {CHAPTERS.map((ch, ci) => (
          <g key={ch.n}>
            <text x={30 + ci * 168} y={24} fontSize={12.5} fontWeight={650} fill={ch.examinable ? 'var(--text)' : 'var(--faint)'}>
              {ch.n}. {ch.examinable ? '' : '(no exam) '}
            </text>
            <text x={30 + ci * 168} y={40} fontSize={9} fill="var(--faint)">{ch.title.slice(0, 26)}</text>
          </g>
        ))}
        {CONCEPTS.flatMap(c => c.prereqs.map(p => {
          const a = layout.pos[p], b = layout.pos[c.id];
          if (!a || !b) return null;
          const hot = sel === c.id || sel === p;
          return (
            <path key={`${p}->${c.id}`}
              d={`M${a.x + 128},${a.y + 14} C ${a.x + 160},${a.y + 14} ${b.x - 34},${b.y + 14} ${b.x - 2},${b.y + 14}`}
              fill="none" stroke={hot ? 'var(--cond)' : 'var(--line2)'} strokeWidth={hot ? 2 : 0.9} opacity={hot ? 1 : 0.5} />
          );
        }))}
        {CONCEPTS.map(c => {
          const p = layout.pos[c.id];
          const st = conceptStates[c.id];
          const band = masteryBand(st);
          const ret = st ? retainedMastery(st) : 0;
          return (
            <g key={c.id} className="map-node" onClick={() => setSel(c.id === sel ? null : c.id)}>
              <rect x={p.x} y={p.y} width={130} height={30} rx={8}
                fill="var(--card)" stroke={sel === c.id ? 'var(--cond)' : 'var(--line2)'}
                strokeWidth={sel === c.id ? 2 : 1}
                opacity={c.examinable ? 0.6 + 0.4 * Math.max(ret, 0.35) : 0.45} />
              <circle cx={p.x + 12} cy={p.y + 15} r={4} fill={BAND_COLORS[band]} />
              <text x={p.x + 22} y={p.y + 19} fontSize={10} fontWeight={600} fill="var(--text)">
                {c.title.length > 17 ? c.title.slice(0, 16) + '…' : c.title}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
