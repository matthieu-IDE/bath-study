import { useMemo, useState } from 'react';
import { dueCards, useApp } from '../store';
import { CONCEPT_MAP, EXAM_INFO } from '../data/course';
import { buildMission, chapterReadiness, courseMastery, fadingSoon, planSession, topWeaknesses } from '../engine/session';
import { calibration, dangerousConcepts, retainedMastery } from '../engine/mastery';
import { computeRatings, ratingBand } from '../engine/rating';
import { ERROR_MAP } from '../data/errors';
import { Icon } from '../components/Icon';

export function DashboardView() {
  const { conceptStates, mistakes, cardStates, attempts, nav, missionDone, markMission, focusConcept, setPdfPage } = useApp();
  const [sessionLen, setSessionLen] = useState<10 | 25 | 45 | 90>(25);

  const mistakesDue = mistakes.filter(m => !m.resolved && m.nextReview <= Date.now()).length;
  const cardsDue = dueCards(cardStates, 50).length;
  const mission = useMemo(() => buildMission(conceptStates, mistakesDue, cardsDue), [conceptStates, mistakesDue, cardsDue]);
  const mastery = courseMastery(conceptStates);
  const readiness = chapterReadiness(conceptStates);
  const weaknesses = topWeaknesses(conceptStates);
  const fading = fadingSoon(conceptStates);
  const calib = calibration(conceptStates);
  const dangerous = dangerousConcepts(conceptStates);
  const plan = planSession(sessionLen, conceptStates);

  const streak = useMemo(() => {
    const days = new Set(attempts.map(a => new Date(a.at).toISOString().slice(0, 10)));
    let s = 0;
    const d = new Date();
    for (;;) {
      const key = d.toISOString().slice(0, 10);
      if (days.has(key)) { s++; d.setDate(d.getDate() - 1); }
      else if (s === 0 && key === new Date().toISOString().slice(0, 10)) { d.setDate(d.getDate() - 1); }
      else break;
      if (s > 400) break;
    }
    return s;
  }, [attempts]);

  const breakthrough = useMemo(() => {
    const byErr: Record<string, { old: number; recent: number }> = {};
    const cutoff = Date.now() - 3 * 86400_000;
    for (const a of attempts) {
      if (!a.errorId) continue;
      const b = (byErr[a.errorId] ??= { old: 0, recent: 0 });
      a.at < cutoff ? b.old++ : b.recent++;
    }
    const fixed = Object.entries(byErr).filter(([, v]) => v.old >= 2 && v.recent === 0);
    return fixed.length ? ERROR_MAP[fixed[0][0]] : null;
  }, [attempts]);

  const missionMinutes = mission.reduce((a, m) => a + m.minutes, 0);
  const go = (item: { kind: string; conceptId?: string }) => {
    if (item.kind === 'cards') nav('cards');
    else if (item.kind === 'mistake') nav('mistakes');
    else if (item.kind === 'method') nav('practice', '__method');
    else if (item.kind === 'learn' && item.conceptId) {
      const c = CONCEPT_MAP[item.conceptId];
      setPdfPage(c.pdfPages[0]);
      focusConcept(item.conceptId);
      nav('study');
    } else nav('practice', item.conceptId ?? null);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">{EXAM_INFO.code} · {EXAM_INFO.title}</div>
          <h2>Dashboard</h2>
        </div>
        <div className="row">
          {streak > 0 && <span className="chip warn">{streak}-day streak</span>}
          <RatingChip />
          <span className="chip known">Mastery {Math.round(mastery * 100)}%</span>
        </div>
      </div>

      <div className="grid2" style={{ alignItems: 'start' }}>
        <div className="card card-pad">
          <div className="row spread">
            <div className="section-title" style={{ marginBottom: 0 }}><Icon name="target" size={14} /> Today's mission</div>
            <span className="tiny faint">{missionMinutes} min</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 10 }}>
            {mission.map(m => (
              <button key={m.id} className={`list-item ${missionDone[m.id] ? 'done' : ''}`} onClick={() => { markMission(m.id); go(m); }}>
                <span className="li-icon"><Icon name={m.icon || 'edit'} size={14} /></span>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: 550 }}>{m.label}</span>
                <span className="tiny faint">{m.minutes}m</span>
              </button>
            ))}
          </div>
          {breakthrough && (
            <div className="feedback-banner ok mt">Breakthrough — the "{breakthrough.label}" mistake has stopped appearing.</div>
          )}
        </div>

        <div className="card card-pad">
          <div className="row spread">
            <div className="section-title" style={{ marginBottom: 0 }}><Icon name="bolt" size={14} /> Smart session</div>
            <div className="seg">
              {([10, 25, 45, 90] as const).map(m => (
                <button key={m} className={sessionLen === m ? 'active' : ''} onClick={() => setSessionLen(m)}>{m}m</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 10 }}>
            {plan.steps.map((s, i) => (
              <button key={i} className="list-item" onClick={() => go(s)}>
                <span className="li-icon"><Icon name={s.icon || 'edit'} size={14} /></span>
                <span style={{ flex: 1, fontSize: 13 }}>{s.label}</span>
                <span className="tiny faint">{s.minutes}m</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card card-pad mt">
        <div className="row spread">
          <div className="section-title" style={{ marginBottom: 0 }}><Icon name="chart" size={14} /> Exam readiness</div>
          <span className="tiny faint">{EXAM_INFO.when} · {EXAM_INFO.marks} marks · pass {EXAM_INFO.pass}</span>
        </div>
        <div className="mt" style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {readiness.map(r => (
            <div key={r.chapter} className="row" style={{ gap: 10 }}>
              <span style={{ width: 230, fontSize: 13, fontWeight: 550, flexShrink: 0 }} className={r.examinable ? '' : 'faint'}>
                {r.chapter}. {r.title}{!r.examinable && ' — no exam'}
              </span>
              <div className="bar-rail" style={{ flex: 1 }}>
                <div className="bar-fill" style={{
                  width: `${Math.round(r.readiness * 100)}%`,
                  background: r.readiness < 0.3 ? 'var(--bad)' : r.readiness < 0.6 ? 'var(--warn)' : 'var(--good)',
                }} />
              </div>
              <span className="tiny muted" style={{ width: 36, textAlign: 'right' }}>{Math.round(r.readiness * 100)}%</span>
              {r.examinable
                ? <button className="btn sm" style={{ width: 58 }} onClick={() => nav('exam', `topic-${r.chapter}`)}>Test</button>
                : <span style={{ width: 58 }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid3 mt" style={{ alignItems: 'start' }}>
        <div className="card card-pad">
          <div className="section-title"><Icon name="target" size={14} /> Weaknesses</div>
          {weaknesses.length === 0 && <p className="small muted">Answer a few questions first.</p>}
          {weaknesses.map(w => (
            <button key={w.conceptId} className="list-item" onClick={() => nav('practice', w.conceptId)}>
              <span style={{ flex: 1, fontSize: 13, textAlign: 'left' }}>{CONCEPT_MAP[w.conceptId].title}</span>
              <span className="tiny" style={{ color: 'var(--bad)' }}>{Math.round(w.mastery * 100)}%</span>
            </button>
          ))}
          {dangerous.length > 0 && (
            <div className="notice warn mt">
              Confident-but-wrong on <strong>{CONCEPT_MAP[dangerous[0]].title}</strong> — the riskiest kind of gap.
              <div><button className="btn sm mt" onClick={() => nav('practice', dangerous[0])}>Target it</button></div>
            </div>
          )}
        </div>

        <div className="card card-pad">
          <div className="section-title"><Icon name="clock" size={14} /> Fading soon</div>
          {fading.length === 0 && <p className="small muted">Nothing is slipping right now.</p>}
          {fading.map(id => {
            const r = retainedMastery(conceptStates[id]);
            return (
              <button key={id} className="list-item" onClick={() => nav('practice', id)}>
                <span style={{ flex: 1, fontSize: 13, textAlign: 'left', opacity: 0.45 + r }}>{CONCEPT_MAP[id].title}</span>
                <span className="tiny faint">{Math.round(r * 100)}%</span>
              </button>
            );
          })}
        </div>

        <div className="card card-pad">
          <div className="section-title"><Icon name="compass" size={14} /> Calibration</div>
          {calib.total === 0 ? <p className="small muted">Rate confidence before answers to map this.</p> : (
            <div className="grid2" style={{ gap: 8 }}>
              <CalTile label="Right, confident" n={calib.cc} color="var(--good)" note="mastery" />
              <CalTile label="Right, unsure" n={calib.cu} color="var(--known)" note="reinforce" />
              <CalTile label="Wrong, unsure" n={calib.wu} color="var(--warn)" note="normal gap" />
              <CalTile label="Wrong, confident" n={calib.wc} color="var(--bad)" note="misconception" />
            </div>
          )}
        </div>
      </div>

      <ErrorFingerprint />
    </div>
  );
}

function RatingChip() {
  const { attempts, nav } = useApp();
  const ratings = useMemo(() => computeRatings(attempts), [attempts]);
  const b = ratingBand(ratings.overall);
  return (
    <button className="chip clickable" title="Chess-style rating — open the brain map" onClick={() => nav('map')}>
      <Icon name="trophy" size={12} style={{ color: b.color }} />
      <strong>{ratings.overall}</strong>&nbsp;{b.label}
      {ratings.delta7d !== 0 && <span className="tiny" style={{ color: ratings.delta7d > 0 ? 'var(--good)' : 'var(--bad)' }}>&nbsp;{ratings.delta7d > 0 ? '+' : ''}{ratings.delta7d}</span>}
    </button>
  );
}

function CalTile({ label, n, color, note }: { label: string; n: number; color: string; note: string }) {
  return (
    <div style={{ padding: '8px 10px', borderRadius: 9, background: 'var(--card2)', border: '1px solid var(--line)' }}>
      <div className="tiny muted">{label}</div>
      <div style={{ fontSize: 19, fontWeight: 700, color }}>{n}</div>
      <div className="tiny faint">{note}</div>
    </div>
  );
}

function ErrorFingerprint() {
  const { attempts, nav } = useApp();
  const stats = useMemo(() => {
    const by: Record<string, number> = {};
    let total = 0;
    for (const a of attempts) {
      if (a.errorId && !a.correct) { by[a.errorId] = (by[a.errorId] ?? 0) + 1; total++; }
    }
    const rows = Object.entries(by).map(([id, n]) => ({ e: ERROR_MAP[id], n })).filter(r => r.e);
    rows.sort((a, b) => b.n - a.n);
    return { rows: rows.slice(0, 6), total };
  }, [attempts]);
  if (stats.total < 2) return null;
  const max = stats.rows[0]?.n ?? 1;
  const catColor = { conceptual: 'var(--bad)', method: 'var(--warn)', careless: 'var(--known)' } as const;
  return (
    <div className="card card-pad mt">
      <div className="row spread">
        <div className="section-title" style={{ marginBottom: 0 }}><Icon name="eye" size={14} /> Error fingerprint</div>
        <span className="tiny faint">
          <span style={{ color: 'var(--bad)' }}>■</span> conceptual · <span style={{ color: 'var(--warn)' }}>■</span> method · <span style={{ color: 'var(--known)' }}>■</span> careless
        </span>
      </div>
      <div className="mt" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {stats.rows.map(r => (
          <div key={r.e.id} className="row" style={{ gap: 10 }}>
            <span style={{ width: 250, fontSize: 12.5, fontWeight: 550, flexShrink: 0 }}>{r.e.label}</span>
            <div className="bar-rail" style={{ flex: 1 }}>
              <div className="bar-fill" style={{ width: `${(r.n / max) * 100}%`, background: catColor[r.e.category] }} />
            </div>
            <span className="tiny muted" style={{ width: 22, textAlign: 'right' }}>{r.n}</span>
          </div>
        ))}
      </div>
      <button className="btn sm mt" onClick={() => nav('mistakes')}>Open the mistake bank</button>
    </div>
  );
}
