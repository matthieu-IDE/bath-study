import { useMemo, useRef, useState } from 'react';
import { useApp } from '../store';
import { CONCEPT_MAP, CONCEPTS, EXAM_INFO } from '../data/course';
import type { ImportedPaper, PastPaperQuestion } from '../data/types';
import { db } from '../db/db';
import { uid } from '../lib/utils';

/* Past papers: Bath keeps official papers behind SSO (verified Aug 2026), so this is an
   import-and-tag workspace with exact fetch instructions, provenance preserved. */

export function PapersView() {
  const { papers, paperQuestions, addPaper, removePaper, addPaperQuestion, removePaperQuestion, showToast, nav } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pendingKind, setPendingKind] = useState<'paper' | 'markscheme'>('paper');
  const [tagging, setTagging] = useState(false);
  const [form, setForm] = useState({ year: '', qnum: '', marks: '', topics: [] as string[], fileId: '', notes: '' });

  const onFile = async (f: File) => {
    const p: ImportedPaper = {
      id: uid(), name: f.name, kind: pendingKind,
      year: (f.name.match(/20\d\d/) ?? ['—'])[0], paperCode: EXAM_INFO.code,
      addedAt: Date.now(), size: f.size,
    };
    await addPaper(p, f);
    showToast(`Imported ${f.name}`);
  };

  const openPaper = async (id: string) => {
    const row = await db.paperBlobs.get(id);
    if (!row) return;
    const url = URL.createObjectURL(row.blob);
    window.open(url, '_blank');
  };

  const saveQuestion = async () => {
    if (!form.year || !form.qnum) { showToast('year + question number needed'); return; }
    const q: PastPaperQuestion = {
      id: uid(), year: form.year, paperCode: EXAM_INFO.code, questionNumber: form.qnum,
      marks: form.marks ? +form.marks : null, topicIds: form.topics,
      pdfPageLinks: form.topics.map(t => CONCEPT_MAP[t]?.pdfPages[0]).filter(Boolean) as number[],
      fileId: form.fileId || undefined, notes: form.notes || undefined,
    };
    await addPaperQuestion(q);
    setForm({ year: form.year, qnum: '', marks: '', topics: [], fileId: form.fileId, notes: '' });
    showToast('tagged ✓');
  };

  // topic frequency intelligence
  const freq = useMemo(() => {
    const by: Record<string, { n: number; marks: number }> = {};
    for (const q of paperQuestions) {
      for (const t of q.topicIds) {
        const b = (by[t] ??= { n: 0, marks: 0 });
        b.n++; b.marks += q.marks ?? 0;
      }
    }
    return Object.entries(by).map(([id, v]) => ({ c: CONCEPT_MAP[id], ...v })).filter(x => x.c).sort((a, b) => b.n - a.n);
  }, [paperQuestions]);
  const maxN = freq[0]?.n ?? 1;

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="kicker">Authentic {EXAM_INFO.code} questions — provenance preserved</div>
          <h2>Past papers</h2>
        </div>
        <div className="row">
          <div className="seg">
            <button className={pendingKind === 'paper' ? 'active' : ''} onClick={() => setPendingKind('paper')}>Paper</button>
            <button className={pendingKind === 'markscheme' ? 'active' : ''} onClick={() => setPendingKind('markscheme')}>Mark scheme</button>
          </div>
          <button className="btn primary" onClick={() => fileRef.current?.click()}>Import PDF</button>
          <input ref={fileRef} type="file" accept="application/pdf" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) void onFile(f); e.target.value = ''; }} />
        </div>
      </div>

      <div className="card card-pad mb">
        <h3 style={{ fontSize: 15 }}>Where the real papers live (checked Aug 2026)</h3>
        <p className="small muted">Official Bath past papers are <strong>not publicly downloadable</strong> — they sit behind the university's single sign-on, and this app won't bypass that. As a Bath student you can fetch them in two minutes:</p>
        <ol className="small muted" style={{ paddingLeft: 20, margin: '6px 0' }}>
          <li>Go to <strong>bath.ac.uk/services/past-exam-papers</strong> (or Library → "Past exam papers").</li>
          <li>Open the past-papers database (a SharePoint site) and sign in with your <strong>@bath.ac.uk</strong> account (MFA).</li>
          <li>Search department <strong>Mathematical Sciences</strong>, unit code <strong>MA10211</strong> — the code named on p5 of your lecture notes. The database keeps the <strong>last 5 years</strong>.</li>
          <li>If MA10211 is missing (the code family is migrating), check successor codes <strong>MA12002 / MA12005 / MA12012</strong> — your notes say this unit feeds exactly those — or ask <strong>library@bath.ac.uk</strong>. Moodle also carries specimen papers.</li>
          <li>Download the PDFs (papers + any solutions), then <strong>Import</strong> them here. They are stored locally in your browser only.</li>
        </ol>
      </div>

      {papers.length > 0 && (
        <div className="card card-pad mb">
          <h3 style={{ fontSize: 15 }}>Imported files</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
            {papers.map(p => (
              <div key={p.id} className="row spread" style={{ background: 'var(--card2)', borderRadius: 10, padding: '8px 12px' }}>
                <span className="small bold">{p.name}</span>
                <span className="row">
                  <span className="tiny faint">{p.year} · {(p.size / 1024 / 1024).toFixed(1)} MB</span>
                  <button className="btn sm" onClick={() => openPaper(p.id)}>Open</button>
                  <button className="btn sm" onClick={() => { setTagging(true); setForm(f => ({ ...f, fileId: p.id, year: p.year !== '—' ? p.year : f.year })); }}>Tag questions</button>
                  <button className="btn sm ghost" onClick={() => removePaper(p.id)}>✕</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(tagging || paperQuestions.length > 0) && (
        <div className="grid2" style={{ alignItems: 'start' }}>
          <div className="card card-pad">
            <h3 style={{ fontSize: 15 }}>Tag a question</h3>
            <p className="tiny muted">Work through the paper; tag each part so lessons can link to it and the analytics below fill up.</p>
            <div className="row mt">
              <input placeholder="year (e.g. 2023)" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} style={{ width: 110 }} />
              <input placeholder="Q (e.g. 3(b))" value={form.qnum} onChange={e => setForm(f => ({ ...f, qnum: e.target.value }))} style={{ width: 100 }} />
              <input placeholder="marks" type="number" value={form.marks} onChange={e => setForm(f => ({ ...f, marks: e.target.value }))} style={{ width: 80 }} />
            </div>
            <div className="row mt" style={{ gap: 5, flexWrap: 'wrap', maxHeight: 150, overflowY: 'auto' }}>
              {CONCEPTS.filter(c => c.examinable).map(c => (
                <button key={c.id} className={`chip clickable ${form.topics.includes(c.id) ? 'known' : ''}`}
                  onClick={() => setForm(f => ({ ...f, topics: f.topics.includes(c.id) ? f.topics.filter(t => t !== c.id) : [...f.topics, c.id] }))}>
                  {c.title}
                </button>
              ))}
            </div>
            <input className="mt" placeholder="trap / note (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
            <button className="btn primary mt" onClick={saveQuestion}>Save question</button>
          </div>

          <div className="card card-pad">
            <h3 style={{ fontSize: 15 }}>Past-paper intelligence</h3>
            {freq.length === 0 ? <p className="small muted">Tag a few questions and topic frequency, marks-per-topic and coverage appear here.</p> : (
              <>
                <div className="tiny muted mt">Topic frequency across {paperQuestions.length} tagged questions (historical evidence — not a promise about the next paper):</div>
                <div className="mt" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {freq.slice(0, 8).map(f => (
                    <div key={f.c.id} className="row" style={{ gap: 8 }}>
                      <span style={{ width: 160, fontSize: 12, flexShrink: 0 }}>{f.c.title}</span>
                      <div className="bar-rail" style={{ flex: 1 }}><div className="bar-fill" style={{ width: `${(f.n / maxN) * 100}%` }} /></div>
                      <span className="tiny muted" style={{ width: 70, textAlign: 'right' }}>{f.n}q · {f.marks}mk</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {paperQuestions.length > 0 && (
              <div className="mt" style={{ maxHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
                {paperQuestions.map(q => (
                  <div key={q.id} className="row spread tiny" style={{ background: 'var(--card2)', borderRadius: 8, padding: '6px 9px' }}>
                    <span><strong>{q.year} Q{q.questionNumber}</strong> {q.marks ? `(${q.marks})` : ''} — {q.topicIds.map(t => CONCEPT_MAP[t]?.title).join(', ')}{q.notes ? ` · ${q.notes}` : ''}</span>
                    <span className="row">
                      {q.topicIds[0] && <button className="btn sm ghost" onClick={() => nav('practice', q.topicIds[0])}>Practise topic</button>}
                      <button className="btn sm ghost" onClick={() => removePaperQuestion(q.id)}>✕</button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
