import { useMemo, useState } from 'react';
import { dueCards, useApp } from '../store';
import { DECK, DECK_MAP } from '../data/flashcards';
import { CONCEPT_MAP } from '../data/course';
import type { Grade } from '../engine/mastery';
import { Rich } from '../components/Math';
import { sfx } from '../lib/sound';
import { fmt } from '../lib/utils';

export function CardsView() {
  const { cardStates, gradeFlashcard } = useApp();
  const [queue, setQueue] = useState<string[]>(() => dueCards(useApp.getState().cardStates, 20));
  const [flipped, setFlipped] = useState(false);
  const [doneCount, setDoneCount] = useState(0);
  const [browse, setBrowse] = useState(false);

  const cardId = queue[0];
  const card = cardId ? DECK_MAP[cardId] : null;
  const totals = useMemo(() => {
    const t = { new: 0, due: 0, later: 0 };
    const nowT = Date.now();
    for (const c of DECK) {
      const s = cardStates[c.id];
      if (!s || s.reps === 0) t.new++;
      else if (s.due <= nowT) t.due++;
      else t.later++;
    }
    return t;
  }, [cardStates]);

  const grade = async (g: Grade) => {
    if (!card) return;
    sfx.flip();
    await gradeFlashcard(card.id, g);
    setFlipped(false);
    setDoneCount(c => c + 1);
    setQueue(qs => (g === 'again' ? [...qs.slice(1), card.id] : qs.slice(1)));
  };

  if (browse) return <BrowseDeck onBack={() => setBrowse(false)} />;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">Spaced repetition</div>
          <h2>Flashcards</h2>
        </div>
        <div className="row">
          <span className="chip good">{totals.due} due</span>
          <span className="chip known">{totals.new} new</span>
          <span className="chip">{totals.later} scheduled</span>
          <button className="btn sm" onClick={() => setBrowse(true)}>browse deck</button>
        </div>
      </div>

      {!card ? (
        <div className="card card-pad" style={{ textAlign: 'center', padding: 44 }}>
          <h3>Queue clear</h3>
          <p className="muted small">{doneCount > 0 ? `${doneCount} reviewed. ` : ''}Cards resurface as your memory curve predicts fading.</p>
          <button className="btn primary mt" onClick={() => setQueue(dueCards(useApp.getState().cardStates, 20))}>Check again</button>
        </div>
      ) : (
        <div className="fc-stage">
          <div className="row spread mb">
            <span className="chip known">{CONCEPT_MAP[card.conceptId]?.title ?? card.conceptId}</span>
            <span className="chip">{card.kind}</span>
          </div>
          <div className={`fc-card ${flipped ? 'flipped' : ''}`} onClick={() => { setFlipped(f => !f); sfx.flip(); }}>
            <div className="fc-face">
              <div style={{ fontSize: 15.5, lineHeight: 1.55 }}><Rich text={card.front} /></div>
              <div className="tiny faint">tap to flip</div>
            </div>
            <div className="fc-face back">
              <div style={{ fontSize: 15, lineHeight: 1.55, maxHeight: 300, overflowY: 'auto' }}><Rich text={card.back} /></div>
              {card.pdfPage && <div className="tiny faint">notes p{card.pdfPage}</div>}
            </div>
          </div>
          {flipped && (
            <div className="fc-grade pop">
              <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => grade('again')}>Again<br /><span className="tiny faint">&lt;10m</span></button>
              <button className="btn" style={{ color: 'var(--warn)' }} onClick={() => grade('hard')}>Hard<br /><span className="tiny faint">{nextIvl(card.id, 'hard')}</span></button>
              <button className="btn" style={{ color: 'var(--good)' }} onClick={() => grade('good')}>Good<br /><span className="tiny faint">{nextIvl(card.id, 'good')}</span></button>
              <button className="btn" style={{ color: 'var(--known)' }} onClick={() => grade('easy')}>Easy<br /><span className="tiny faint">{nextIvl(card.id, 'easy')}</span></button>
            </div>
          )}
          <div className="tiny faint mt" style={{ textAlign: 'center' }}>{queue.length} in queue · {doneCount} done</div>
        </div>
      )}
    </div>
  );
}

function nextIvl(cardId: string, g: Grade): string {
  const s = useApp.getState().cardStates[cardId];
  const ease = s?.ease ?? 2.5;
  const iv = s?.intervalDays ?? 0;
  const next = g === 'hard' ? Math.max(1, iv * 1.2) : g === 'good' ? (iv <= 0 ? 1 : iv * ease) : (iv <= 0 ? 3 : iv * ease * 1.35);
  return next < 1.5 ? '1d' : `${Math.round(next)}d`;
}

function BrowseDeck({ onBack }: { onBack: () => void }) {
  const { cardStates, gradeFlashcard } = useApp();
  const [filter, setFilter] = useState('');
  const cards = DECK.filter(c =>
    !filter || c.front.toLowerCase().includes(filter.toLowerCase()) || (CONCEPT_MAP[c.conceptId]?.title ?? '').toLowerCase().includes(filter.toLowerCase()));
  const suspend = async (id: string) => {
    const s = useApp.getState().cardStates[id] ?? { cardId: id, due: 0, intervalDays: 0, ease: 2.5, reps: 0, lapses: 0, suspended: false };
    const next = { ...s, suspended: !s.suspended };
    await (await import('../db/db')).db.cards.put(next);
    useApp.setState(st => ({ cardStates: { ...st.cardStates, [id]: next } }));
  };
  return (
    <div className="page">
      <div className="page-head">
        <div><div className="kicker">Deck</div><h2>{DECK.length} cards</h2></div>
        <div className="row">
          <input type="text" placeholder="filter…" value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 180 }} />
          <button className="btn sm" onClick={onBack}>← review</button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cards.slice(0, 60).map(c => {
          const s = cardStates[c.id];
          return (
            <div key={c.id} className="card card-pad row spread" style={{ gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="tiny muted">{c.kind} · {CONCEPT_MAP[c.conceptId]?.title}</div>
                <div className="small" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}><Rich text={c.front.split('\n')[0]} /></div>
              </div>
              <div className="row" style={{ flexShrink: 0 }}>
                {s?.reps ? <span className="tiny faint">{s.reps} reps · {fmt(s.intervalDays, 0)}d</span> : <span className="tiny faint">new</span>}
                <button className="btn sm ghost" onClick={() => suspend(c.id)}>{s?.suspended ? 'unsuspend' : 'suspend'}</button>
              </div>
            </div>
          );
        })}
        {cards.length > 60 && <div className="tiny faint">…{cards.length - 60} more (refine the filter)</div>}
      </div>
    </div>
  );
}
