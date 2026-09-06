import { useState } from 'react';
import { useApp } from '../store';
import { SHEETS } from '../data/cheatsheets';
import { CHAPTERS } from '../data/course';
import { chapterReadiness } from '../engine/session';
import { Rich, Tex } from '../components/Math';
import { Icon } from '../components/Icon';

export function SheetsView() {
  const { conceptStates } = useApp();
  const readiness = chapterReadiness(conceptStates);
  const [open, setOpen] = useState<number>(1);
  const sheet = SHEETS.find(s => s.chapter === open)!;
  const r = readiness.find(x => x.chapter === open)?.readiness ?? 0;
  const unlocked = r >= sheet.unlockMastery;

  const kindColor: Record<string, string> = {
    trap: 'var(--warn)', decision: 'var(--cond)', compare: 'var(--accent)', mini: 'var(--good)', formula: 'var(--known)',
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">One screen per chapter — earned, not given</div>
          <h2>Cheat sheets</h2>
        </div>
        <div className="seg">
          {SHEETS.map(s => {
            const rr = readiness.find(x => x.chapter === s.chapter)?.readiness ?? 0;
            const locked = rr < s.unlockMastery;
            return (
              <button key={s.chapter} className={open === s.chapter ? 'active' : ''} onClick={() => setOpen(s.chapter)}>
                {locked && <Icon name="lock" size={11} style={{ marginRight: 3 }} />}Ch {s.chapter}
              </button>
            );
          })}
        </div>
      </div>

      {!unlocked ? (
        <div className="card card-pad" style={{ textAlign: 'center', padding: 44 }}>
          <Icon name="lock" size={30} style={{ color: 'var(--faint)' }} />
          <h3 className="mt">Locked — {Math.round(r * 100)}% of {Math.round(sheet.unlockMastery * 100)}% chapter mastery</h3>
          <p className="muted small" style={{ maxWidth: 400, margin: '8px auto' }}>
            A summary you haven't earned is one you can't use. Practise a little and this unlocks.
          </p>
          <button className="btn primary mt" onClick={() => useApp.getState().nav('practice', CHAPTERS[open - 1].conceptIds[0])}>Practise Ch {open}</button>
        </div>
      ) : (
        <div className="grid2" style={{ alignItems: 'start' }}>
          {sheet.items.map((item, i) => (
            <div key={i} className="card card-pad">
              <div className="tiny bold" style={{ textTransform: 'uppercase', letterSpacing: '0.07em', color: kindColor[item.kind] ?? 'var(--muted)', marginBottom: 8 }}>
                {item.title}
              </div>
              {item.tex && <div style={{ overflowX: 'auto' }}><Tex tex={item.tex} display /></div>}
              {item.lines && item.lines.map((l, j) => (
                <div key={j} className="small" style={{ marginBottom: 5, paddingLeft: item.kind === 'decision' && j > 0 ? 10 : 0 }}>
                  <Rich text={l} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
