import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../store';
import { CHAPTERS, CONCEPT_MAP, CONCEPTS, EXAM_INFO } from '../data/course';
import type { Difficulty, GeneratedQuestion } from '../data/types';
import { generateFor } from '../engine/questions';
import { QuestionPlayer, type PlayResult } from '../components/QuestionPlayer';
import { ERROR_MAP } from '../data/errors';
import { retainedMastery } from '../engine/mastery';
import { computeRatings, ratingBand } from '../engine/rating';
import { chapterReadiness } from '../engine/session';
import { Icon } from '../components/Icon';
import { sfx } from '../lib/sound';

/* Exam mode: strip the scaffolding. Mock builder: n questions, timed, marked,
   with a marks-lost-by-topic and conceptual-vs-careless breakdown. */

type Phase = 'setup' | 'running' | 'results';
interface MockItem { q: GeneratedQuestion; result?: PlayResult; marks: number }

const TOPIC_RAMP: Difficulty[] = [1, 2, 2, 3, 3, 3, 4, 4, 5, 5];

export function ExamView() {
  const { conceptStates, attempts, viewParam, nav, logSession } = useApp();
  const [phase, setPhase] = useState<Phase>('setup');
  const [variant, setVariant] = useState<'mock' | 'topic'>('mock');
  const [topicChapter, setTopicChapter] = useState<number | null>(null);
  const [items, setItems] = useState<MockItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState(6);
  const [level, setLevel] = useState<'standard' | 'exam' | '95'>('exam');
  const [chapters, setChapters] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ratings = useMemo(() => computeRatings(attempts), [attempts]);

  /* Topic test: one chapter, difficulty ramp 1→5, weak concepts weighted,
     the last questions deliberately nasty — train past the exam level. */
  const startTopic = (chN: number) => {
    const ch = CHAPTERS.find(c => c.n === chN);
    if (!ch) return;
    const pool = ch.conceptIds.map(id => CONCEPT_MAP[id]).filter(c => c.examinable);
    if (!pool.length) return;
    const sorted = [...pool].sort((a, b) =>
      (conceptStates[a.id] ? retainedMastery(conceptStates[a.id]) : 0) - (conceptStates[b.id] ? retainedMastery(conceptStates[b.id]) : 0));
    const qs: MockItem[] = [];
    TOPIC_RAMP.forEach((d, i) => {
      // early questions round-robin the chapter; later ones bias to weakest
      const c = i < 5 ? pool[i % pool.length] : sorted[Math.floor(Math.random() * Math.min(3, sorted.length))];
      const q = generateFor(c.id, conceptStates[c.id], d);
      if (q) qs.push({ q, marks: Math.max(2, Math.min(6, q.difficulty + 2)) });
    });
    if (!qs.length) return;
    setVariant('topic');
    setTopicChapter(chN);
    setItems(qs);
    setIdx(0);
    setPhase('running');
    setSecondsLeft(0); // topic tests are untimed — depth over speed
    sfx.click();
  };

  useEffect(() => {
    if (viewParam?.startsWith('topic-')) {
      const n = +viewParam.slice(6);
      if (n >= 1 && n <= 6) startTopic(n);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewParam]);

  const start = () => {
    setVariant('mock');
    setTopicChapter(null);
    const pool = CONCEPTS.filter(c => c.examinable && chapters.includes(c.chapter));
    // weight towards weaker concepts in 95-mode, uniform otherwise
    const qs: MockItem[] = [];
    const used = new Set<string>();
    let guard = 0;
    while (qs.length < size && guard++ < 200) {
      let c = pool[Math.floor(Math.random() * pool.length)];
      if (level === '95') {
        const sorted = [...pool].sort((a, b) => (conceptStates[a.id] ? retainedMastery(conceptStates[a.id]) : 0) - (conceptStates[b.id] ? retainedMastery(conceptStates[b.id]) : 0));
        c = sorted[Math.floor(Math.random() * Math.min(6, sorted.length))];
      }
      const d: Difficulty = level === 'standard' ? 2 : level === 'exam' ? 3 : (Math.random() < 0.5 ? 4 : 5) as Difficulty;
      const q = generateFor(c.id, conceptStates[c.id], d);
      if (q && !used.has(q.templateId + q.conceptId) ) {
        used.add(q.templateId + q.conceptId);
        qs.push({ q, marks: Math.max(2, Math.min(6, q.difficulty + 2)) });
      } else if (q) {
        qs.push({ q, marks: Math.max(2, Math.min(6, q.difficulty + 2)) });
      }
    }
    setItems(qs);
    setIdx(0);
    setPhase('running');
    const totalSec = qs.reduce((a, i) => a + i.marks, 0) * 90; // ~1.5 min per mark
    setSecondsLeft(totalSec);
    timerRef.current = setInterval(() => setSecondsLeft(s => {
      if (s <= 1) { clearInterval(timerRef.current!); finish(); return 0; }
      return s - 1;
    }), 1000);
    sfx.click();
  };

  const finish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('results');
    sfx.mastery();
  };
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const onDone = (r: PlayResult) => {
    setItems(its => its.map((it, i) => (i === idx ? { ...it, result: r } : it)));
  };
  const next = () => {
    if (idx + 1 >= items.length) {
      finish();
      const got = items.filter(i => i.result?.correct).length;
      void logSession(variant, Math.round(items.reduce((a, i) => a + i.marks, 0) * 1.5), items.length, got);
    } else setIdx(i => i + 1);
  };

  if (phase === 'setup') {
    const readiness = chapterReadiness(conceptStates);
    return (
      <div className="page">
        <div className="page-head">
          <div><div className="kicker">No hints · marked · rated</div><h2>Tests & exams</h2></div>
        </div>

        <div className="card card-pad mb">
          <div className="row spread">
            <div className="section-title" style={{ marginBottom: 0 }}><Icon name="target" size={14} /> Topic tests — deep, one chapter at a time</div>
            <span className="tiny faint">10 questions, ramping L1 → L5 · untimed · last ones deliberately nasty</span>
          </div>
          <div className="grid3 mt" style={{ gap: 10 }}>
            {CHAPTERS.filter(c => c.examinable).map(ch => {
              const r = ratings.byChapter[ch.n] ?? 800;
              const b = ratingBand(r);
              const ready = readiness.find(x => x.chapter === ch.n)?.readiness ?? 0;
              return (
                <button key={ch.n} className="card card-pad" style={{ textAlign: 'left', cursor: 'pointer' }} onClick={() => startTopic(ch.n)}>
                  <div className="row spread">
                    <span className="bold small">Ch{ch.n} · {ch.title.split(' ')[0]}</span>
                    <span className="tiny" style={{ color: b.color, fontWeight: 650 }}>{r}</span>
                  </div>
                  <div className="bar-rail mt" style={{ height: 5 }}>
                    <div className="bar-fill" style={{ width: `${Math.round(ready * 100)}%`, background: ready < 0.3 ? 'var(--bad)' : ready < 0.6 ? 'var(--warn)' : 'var(--good)' }} />
                  </div>
                  <div className="tiny faint mt" style={{ marginTop: 6 }}>Start test</div>
                </button>
              );
            })}
          </div>
          <p className="tiny muted mt">The tail of every topic test runs past exam level on purpose: train against L5 puzzles and the real paper feels easy.</p>
        </div>

        <div className="card card-pad" style={{ maxWidth: 640 }}>
          <h3 style={{ fontSize: 16 }}>Build a mock</h3>
          <div className="mt">
            <div className="tiny bold muted">MODE</div>
            <div className="seg mt" style={{ marginTop: 4 }}>
              <button className={level === 'standard' ? 'active' : ''} onClick={() => setLevel('standard')}>Standard · L2</button>
              <button className={level === 'exam' ? 'active' : ''} onClick={() => setLevel('exam')}>Bath exam · L3</button>
              <button className={level === '95' ? 'active' : ''} onClick={() => setLevel('95')}>95% mode · L4–5</button>
            </div>
            {level === '95' && <div className="hint-box mt tiny">95% mode hunts the small mistakes separating 70% from 95%: it draws hard variants from YOUR weakest topics and marks method steps strictly. Compare each answer against the mark scheme afterwards.</div>}
          </div>
          <div className="mt">
            <div className="tiny bold muted">LENGTH</div>
            <div className="seg mt" style={{ marginTop: 4 }}>
              {[4, 6, 10, 14].map(n => <button key={n} className={size === n ? 'active' : ''} onClick={() => setSize(n)}>{n} questions</button>)}
            </div>
          </div>
          <div className="mt">
            <div className="tiny bold muted">CHAPTERS</div>
            <div className="row mt" style={{ marginTop: 4 }}>
              {CHAPTERS.filter(c => c.examinable).map(ch => (
                <button key={ch.n} className={`chip clickable ${chapters.includes(ch.n) ? 'known' : ''}`}
                  onClick={() => setChapters(cs => cs.includes(ch.n) ? cs.filter(x => x !== ch.n) : [...cs, ch.n])}>
                  Ch {ch.n}
                </button>
              ))}
            </div>
          </div>
          <button className="btn primary mt" onClick={start} disabled={chapters.length === 0}>Start mock</button>
          <p className="tiny muted mt">Timing ≈ 1.5 min per mark, mirroring the real paper's density ({EXAM_INFO.marks} marks / {EXAM_INFO.when}). Real Bath past papers live behind the library login — import them in the Papers tab and practise alongside.</p>
        </div>
      </div>
    );
  }

  if (phase === 'running') {
    const it = items[idx];
    const mm = Math.floor(secondsLeft / 60), ss = secondsLeft % 60;
    const ch = topicChapter ? CHAPTERS.find(c => c.n === topicChapter) : null;
    return (
      <div className="page">
        <div className="page-head">
          <div>
            <div className="kicker">Question {idx + 1} of {items.length} · {it.marks} marks · L{it.q.difficulty}</div>
            <h2>{variant === 'topic' ? `Topic test — Ch${topicChapter} ${ch?.title ?? ''}` : 'Mock in progress'}</h2>
          </div>
          <div className="row">
            {variant === 'mock'
              ? <span className={`chip ${secondsLeft < 120 ? 'bad' : ''}`} style={{ fontFamily: 'var(--mono)' }}>{mm}:{String(ss).padStart(2, '0')}</span>
              : <span className="chip">untimed — think properly</span>}
            <button className="btn sm ghost" onClick={finish}>end early</button>
          </div>
        </div>
        <QuestionPlayer key={it.q.id} q={it.q} mode="mock" allowHints={false} askConfidence={true}
          onDone={onDone} onNext={next} />
        <div className="row mt" style={{ justifyContent: 'center', gap: 4 }}>
          {items.map((x, i) => (
            <span key={i} style={{
              width: 10, height: 10, borderRadius: 5,
              background: i === idx ? 'var(--cond)' : x.result ? (x.result.correct ? 'var(--good)' : 'var(--bad)') : 'var(--line2)',
            }} />
          ))}
        </div>
      </div>
    );
  }

  return <Results items={items} onAgain={() => setPhase('setup')} />;
}

function Results({ items, onAgain }: { items: MockItem[]; onAgain: () => void }) {
  const { nav } = useApp();
  const answered = items.filter(i => i.result);
  const marksGot = answered.reduce((a, i) => a + (i.result!.correct ? i.marks : 0), 0);
  const marksTotal = items.reduce((a, i) => a + i.marks, 0);
  const pct = marksTotal ? Math.round((marksGot / marksTotal) * 100) : 0;

  const byChapter = useMemo(() => {
    const m: Record<number, { lost: number; total: number }> = {};
    for (const it of items) {
      const ch = CONCEPT_MAP[it.q.conceptId]?.chapter ?? 0;
      const b = (m[ch] ??= { lost: 0, total: 0 });
      b.total += it.marks;
      if (!it.result?.correct) b.lost += it.marks;
    }
    return Object.entries(m).map(([ch, v]) => ({ ch: +ch, ...v })).sort((a, b) => b.lost - a.lost);
  }, [items]);

  const errSplit = useMemo(() => {
    let conceptual = 0, method = 0, careless = 0;
    for (const it of items) {
      if (it.result && !it.result.correct && it.result.errorId) {
        const cat = ERROR_MAP[it.result.errorId]?.category;
        if (cat === 'conceptual') conceptual += it.marks;
        else if (cat === 'method') method += it.marks;
        else careless += it.marks;
      }
    }
    return { conceptual, method, careless };
  }, [items]);

  const redo = items.filter(i => !i.result?.correct);

  return (
    <div className="page">
      <div className="page-head"><div><div className="kicker">Mock complete</div><h2>Results</h2></div></div>
      <div className="grid3">
        <div className="stat-tile"><div className="lbl">score</div><div className="val" style={{ color: pct >= 80 ? 'var(--good)' : pct >= 50 ? 'var(--warn)' : 'var(--bad)' }}>{marksGot}/{marksTotal}</div><div className="tiny faint">{pct}% {pct >= 95 ? '— the target' : pct >= 80 ? '— strong' : pct >= 40 ? '— pass zone, push on' : '— rebuild the basics first'}</div></div>
        <div className="stat-tile"><div className="lbl">marks lost: conceptual / method</div><div className="val" style={{ fontSize: 22 }}>{errSplit.conceptual + errSplit.method}</div><div className="tiny faint">fix with the teacher panel + labs</div></div>
        <div className="stat-tile"><div className="lbl">marks lost: careless</div><div className="val" style={{ fontSize: 22 }}>{errSplit.careless}</div><div className="tiny faint">fix with checking rituals (95% mode)</div></div>
      </div>
      <div className="card card-pad mt">
        <h3 style={{ fontSize: 15 }}>Marks lost by chapter</h3>
        {byChapter.map(b => (
          <div key={b.ch} className="row mt" style={{ gap: 10 }}>
            <span style={{ width: 200, fontSize: 13, flexShrink: 0 }}>Ch{b.ch} · {CHAPTERS.find(c => c.n === b.ch)?.title}</span>
            <div className="bar-rail" style={{ flex: 1 }}>
              <div className="bar-fill" style={{ width: `${b.total ? (b.lost / b.total) * 100 : 0}%`, background: 'var(--bad)' }} />
            </div>
            <span className="tiny muted" style={{ width: 60, textAlign: 'right' }}>−{b.lost}/{b.total}</span>
          </div>
        ))}
      </div>
      {redo.length > 0 && (
        <div className="card card-pad mt">
          <h3 style={{ fontSize: 15 }}>Questions to redo</h3>
          <div className="row mt">
            {redo.map((it, i) => (
              <button key={i} className="chip clickable bad" onClick={() => nav('practice', it.q.conceptId)}>
                {CONCEPT_MAP[it.q.conceptId]?.title}
              </button>
            ))}
          </div>
          <p className="tiny muted mt">They're logged in your mistake bank and will resurface on schedule.</p>
        </div>
      )}
      <div className="row mt">
        <button className="btn primary" onClick={onAgain}>Build another mock</button>
        <button className="btn" onClick={() => nav('mistakes')}>Mistake bank</button>
      </div>
    </div>
  );
}
