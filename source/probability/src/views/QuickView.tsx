import { useMemo, useState } from 'react';
import { dueCards, useApp } from '../store';
import { DECK_MAP } from '../data/flashcards';
import { CONCEPTS } from '../data/course';
import { generateFor, methodQuestion } from '../engine/questions';
import type { GeneratedQuestion } from '../data/types';
import { QuestionPlayer } from '../components/QuestionPlayer';
import { Rich } from '../components/Math';
import { sfx } from '../lib/sound';
import type { Grade } from '../engine/mastery';

/* On-the-go mode: one thumb, one minute. A single card or micro-question at a time. */

type Item = { kind: 'card'; id: string } | { kind: 'q'; q: GeneratedQuestion };

export function QuickView() {
  const { cardStates, conceptStates, gradeFlashcard } = useApp();
  const [item, setItem] = useState<Item | null>(() => pickItem());
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);

  function pickItem(): Item | null {
    const cards = dueCards(useApp.getState().cardStates, 6);
    const useCard = cards.length > 0 && Math.random() < 0.5;
    if (useCard) return { kind: 'card', id: cards[Math.floor(Math.random() * cards.length)] };
    if (Math.random() < 0.25) return { kind: 'q', q: methodQuestion() };
    const seen = CONCEPTS.filter(c => c.examinable && useApp.getState().conceptStates[c.id]?.attempts);
    const pool = seen.length >= 2 ? seen : CONCEPTS.filter(c => c.examinable && c.chapter <= 2);
    const c = pool[Math.floor(Math.random() * pool.length)];
    const q = generateFor(c.id, useApp.getState().conceptStates[c.id], 1 as any);
    return q ? { kind: 'q', q } : (cards.length ? { kind: 'card', id: cards[0] } : null);
  }

  const next = () => { setFlipped(false); setDone(d => d + 1); setItem(pickItem()); };

  if (!item) return <div className="page"><div className="card card-pad">Nothing due — enjoy the bus ride.</div></div>;

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <div className="page-head">
        <div><div className="kicker">One-minute mode</div><h2>Quick fire</h2></div>
        <span className="chip good">{done} done</span>
      </div>

      {item.kind === 'card' ? (() => {
        const card = DECK_MAP[item.id];
        if (!card) return null;
        const grade = async (g: Grade) => { sfx.flip(); await gradeFlashcard(card.id, g); next(); };
        return (
          <div className="fc-stage">
            <div className={`fc-card ${flipped ? 'flipped' : ''}`} style={{ minHeight: 260 }} onClick={() => { setFlipped(f => !f); sfx.flip(); }}>
              <div className="fc-face"><div style={{ fontSize: 15 }}><Rich text={card.front} /></div><div className="tiny faint">tap to flip</div></div>
              <div className="fc-face back"><div style={{ fontSize: 14.5, maxHeight: 260, overflowY: 'auto' }}><Rich text={card.back} /></div></div>
            </div>
            {flipped && (
              <div className="fc-grade pop">
                <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => grade('again')}>Again</button>
                <button className="btn" style={{ color: 'var(--warn)' }} onClick={() => grade('hard')}>Hard</button>
                <button className="btn" style={{ color: 'var(--good)' }} onClick={() => grade('good')}>Good</button>
                <button className="btn" style={{ color: 'var(--known)' }} onClick={() => grade('easy')}>Easy</button>
              </div>
            )}
            <button className="btn ghost sm mt" style={{ width: '100%' }} onClick={next}>Skip</button>
          </div>
        );
      })() : (
        <QuestionPlayer q={item.q} mode="quick" askConfidence={false} allowHints={false} compact={false} onNext={next} />
      )}
    </div>
  );
}
