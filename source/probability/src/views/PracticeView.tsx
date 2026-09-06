import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../store';
import { CHAPTERS, CONCEPT_MAP, CONCEPTS } from '../data/course';
import type { GeneratedQuestion } from '../data/types';
import { generateFor, methodQuestion, mutate } from '../engine/questions';
import { makeSpotError, type SpotErrorQ } from '../engine/spotError';
import { QuestionPlayer } from '../components/QuestionPlayer';
import { Rich } from '../components/Math';
import { masteryBand } from '../engine/mastery';
import { MasteryDot } from '../components/Icon';
import { sfx } from '../lib/sound';

type Tab = 'adaptive' | 'method' | 'spot' | 'mixed';

export function PracticeView() {
  const { viewParam, conceptStates, nav } = useApp();
  const [tab, setTab] = useState<Tab>(viewParam === '__method' ? 'method' : 'adaptive');
  const [conceptId, setConceptId] = useState<string | null>(viewParam && viewParam !== '__method' ? viewParam : null);
  const [q, setQ] = useState<GeneratedQuestion | null>(null);
  const [spot, setSpot] = useState<SpotErrorQ | null>(null);
  const [nDone, setNDone] = useState(0);

  useEffect(() => {
    if (viewParam && viewParam !== '__method') { setConceptId(viewParam); setTab('adaptive'); }
    if (viewParam === '__method') setTab('method');
  }, [viewParam]);

  const pickMixed = (): string => {
    const seen = CONCEPTS.filter(c => c.examinable && conceptStates[c.id]?.attempts);
    const pool = seen.length >= 3 ? seen : CONCEPTS.filter(c => c.examinable && c.chapter <= 3);
    return pool[Math.floor(Math.random() * pool.length)].id;
  };

  const newQuestion = (cid?: string | null) => {
    const id = tab === 'mixed' ? pickMixed() : (cid ?? conceptId ?? pickMixed());
    const gen = tab === 'method' ? methodQuestion() : generateFor(id, conceptStates[id]);
    setQ(gen);
  };

  useEffect(() => {
    if (tab === 'spot') { setSpot(makeSpotError()); return; }
    newQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, conceptId]);

  const concept = conceptId ? CONCEPT_MAP[conceptId] : null;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">Practice</div>
          <h2>{tab === 'method' ? 'Method trainer' : tab === 'spot' ? 'Spot the error' : tab === 'mixed' ? 'Mixed practice' : concept ? concept.title : 'Adaptive practice'}</h2>
        </div>
        <div className="seg">
          <button className={tab === 'adaptive' ? 'active' : ''} onClick={() => setTab('adaptive')}>Adaptive</button>
          <button className={tab === 'mixed' ? 'active' : ''} onClick={() => setTab('mixed')}>Mixed</button>
          <button className={tab === 'method' ? 'active' : ''} onClick={() => setTab('method')}>Method</button>
          <button className={tab === 'spot' ? 'active' : ''} onClick={() => setTab('spot')}>Spot the error</button>
        </div>
      </div>

      {tab === 'adaptive' && (
        <div className="row mb" style={{ gap: 6, flexWrap: 'wrap' }}>
          {CHAPTERS.filter(c => c.examinable).map(ch => (
            <details key={ch.n} style={{ position: 'relative' }}>
              <summary className="chip clickable" style={{ listStyle: 'none' }}>Ch {ch.n}</summary>
              <div className="card card-pad" style={{ position: 'absolute', zIndex: 40, marginTop: 4, width: 270, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {ch.conceptIds.map(id => (
                  <button key={id} className="nav-btn" onClick={e => {
                    setConceptId(id);
                    (e.currentTarget.closest('details') as HTMLDetailsElement).open = false;
                  }}>
                    <MasteryDot band={masteryBand(conceptStates[id])} /> {CONCEPT_MAP[id].title}
                  </button>
                ))}
              </div>
            </details>
          ))}
          {concept && <button className="chip clickable" onClick={() => { const c = concept; useApp.getState().setPdfPage(c.pdfPages[0]); useApp.getState().focusConcept(c.id); nav('study'); }}>Read p{concept.pdfPages[0]}–{concept.pdfPages[1]}</button>}
        </div>
      )}

      {tab !== 'spot' && q && (
        <QuestionPlayer
          q={q} mode="practice"
          onNext={() => { setNDone(n => n + 1); newQuestion(); }}
          extraActions={
            <span className="row" style={{ gap: 4 }}>
              {mutBtn('New story', () => setQ(mutate(q, 'story', conceptStates[q.conceptId]) ?? q))}
              {mutBtn('Harder', () => setQ(mutate(q, 'harder', conceptStates[q.conceptId]) ?? q))}
              {mutBtn('Easier', () => setQ(mutate(q, 'easier', conceptStates[q.conceptId]) ?? q))}
            </span>
          }
        />
      )}

      {tab === 'spot' && spot && <SpotErrorPlayer key={spot.id} sq={spot} onNext={() => setSpot(makeSpotError())} />}

      {nDone > 0 && <div className="tiny faint mt" style={{ textAlign: 'center' }}>{nDone} question{nDone > 1 ? 's' : ''} this session — every answer reshapes your plan</div>}
    </div>
  );
}

function mutBtn(label: string, fn: () => void) {
  return <button className="btn sm ghost" onClick={fn}>{label}</button>;
}

export function SpotErrorPlayer({ sq, onNext }: { sq: SpotErrorQ; onNext?: () => void }) {
  const { recordAttempt } = useApp();
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const correct = picked === sq.wrongLine;

  const submit = async () => {
    if (picked === null) return;
    setDone(true);
    picked === sq.wrongLine ? sfx.correct() : sfx.wrong();
    const fakeQ: GeneratedQuestion = {
      id: sq.id, conceptId: sq.conceptId, templateId: 'spot-error', difficulty: 3, prompt: sq.prompt,
      kind: 'mc', choices: [], hints: ['', '', ''], solution: [sq.explain], seed: 0, source: 'extra',
    };
    await recordAttempt(fakeQ, picked === sq.wrongLine, null, 0, 0, 'practice', `line ${picked + 1}`, picked === sq.wrongLine ? undefined : sq.errorId);
  };

  return (
    <div className="q-card fade-up">
      <div className="row mb"><span className="chip warn">Find the first wrong line</span>
        <span className="chip known">{CONCEPT_MAP[sq.conceptId]?.title}</span></div>
      <div className="q-prompt"><Rich text={sq.prompt} /></div>
      <div className="choices">
        {sq.lines.map((ln, i) => {
          let cls = 'choice';
          if (done) {
            if (i === sq.wrongLine) cls += ' wrong';
            else if (picked === i) cls += ' picked';
          } else if (picked === i) cls += ' picked';
          return (
            <button key={i} className={cls} disabled={done} onClick={() => setPicked(i)}>
              <span className="tiny faint" style={{ marginRight: 8 }}>line {i + 1}</span>
              <Rich text={ln} />
            </button>
          );
        })}
      </div>
      {!done ? (
        <div className="row mt">
          <button className="btn primary" disabled={picked === null} onClick={submit}>That line is wrong</button>
        </div>
      ) : (
        <div className="fade-up">
          <div className={`feedback-banner ${correct ? 'ok' : 'no'}`}>
            {correct ? '✓ Caught it — checking skill is what separates 70% from 95%.' : `✗ The first wrong line was line ${sq.wrongLine + 1}.`}
          </div>
          <div className="sol-box mt"><Rich text={sq.explain} /></div>
          {onNext && <button className="btn primary mt" onClick={onNext}>Next →</button>}
        </div>
      )}
    </div>
  );
}
