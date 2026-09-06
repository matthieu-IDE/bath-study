import { PdfViewer } from '../components/pdf/PdfViewer';
import { TeacherPanel } from '../components/teacher/TeacherPanel';
import { useEffect, useState } from 'react';
import { useApp } from '../store';

/* The core interface: the real Bath PDF on the left, the live tutor on the right. */
export function StudyView() {
  const [layout, setLayout] = useState('split');
  const page = useApp(s => s.pdfPage);
  useEffect(() => { history.replaceState(null, '', '#study/' + page); }, [page]);
  return (
    <div className={'study-workspace layout-' + layout}>
    <div className="study-layout" aria-label="Study layout"><span>STUDY STUDIO</span>{['split', 'tutor', 'notes'].map(l => <button key={l} aria-pressed={layout === l} onClick={() => setLayout(l)}>{l === 'split' ? 'Side by side' : l === 'tutor' ? 'Focus on teaching' : 'Focus on PDF'}</button>)}</div>
    <div className="study">
      <PdfViewer />
      <TeacherPanel />
    </div>
    </div>
  );
}
