import { useEffect } from 'react';
import { useApp, type View } from './store';
import { Icon } from './components/Icon';
import { DashboardView } from './views/DashboardView';
import { StudyView } from './views/StudyView';
import { PracticeView } from './views/PracticeView';
import { CardsView } from './views/CardsView';
import { MapView } from './views/MapView';
import { ExamView } from './views/ExamView';
import { MistakesView } from './views/MistakesView';
import { SheetsView } from './views/SheetsView';
import { QuickView } from './views/QuickView';
import { PapersView } from './views/PapersView';

const NAV: { id: View; icon: string; label: string }[] = [
  { id: 'dashboard', icon: 'home', label: 'Dashboard' },
  { id: 'study', icon: 'book', label: 'Study' },
  { id: 'practice', icon: 'edit', label: 'Practice' },
  { id: 'cards', icon: 'layers', label: 'Flashcards' },
  { id: 'exam', icon: 'file', label: 'Tests & exams' },
  { id: 'map', icon: 'brain', label: 'Brain map' },
  { id: 'mistakes', icon: 'tool', label: 'Mistake bank' },
  { id: 'sheets', icon: 'grid', label: 'Cheat sheets' },
  { id: 'papers', icon: 'folder', label: 'Past papers' },
  { id: 'quick', icon: 'bolt', label: 'On-the-go' },
];

const MOBILE_NAV: View[] = ['dashboard', 'study', 'practice', 'quick', 'cards'];

function BathMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M16 2.5l10 3.6v8c0 6.3-4.1 10.9-10 13.4C10.1 25 6 20.4 6 14.1v-8z" fill="#123b6d" />
      <circle cx="16" cy="9.2" r="2.6" fill="#f0b43c" />
      <g stroke="#f0b43c" strokeWidth="1" strokeLinecap="round">
        <path d="M16 4.6v1.6M20 6.4l-1.1 1.1M12 6.4l1.1 1.1M20.6 9.2h-1.6M13 9.2h-1.6" />
      </g>
      <g stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M10.5 15.5q2.75-1.6 5.5 0t5.5 0" />
        <path d="M10.5 19q2.75-1.6 5.5 0t5.5 0" />
        <path d="M12 22.4q2-1.3 4 0t4 0" />
      </g>
    </svg>
  );
}

export default function App() {
  const { ready, view, nav, init, settings, setTheme, setSound, setSidebar, toast } = useApp();
  const collapsed = settings.sidebarCollapsed;

  useEffect(() => { void init(); }, []);
  useEffect(() => {
    if (!ready) return;
    const followLessonLink = () => {
      const match = location.hash.match(/^#study\/(\d+)$/);
      if (match && Number(match[1]) >= 1 && Number(match[1]) <= 98) {
        useApp.getState().setPdfPage(Number(match[1]));
        nav('study');
      }
    };
    followLessonLink();
    window.addEventListener('hashchange', followLessonLink);
    return () => window.removeEventListener('hashchange', followLessonLink);
  }, [ready, nav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = '1234567890'.indexOf(e.key);
      if (idx >= 0 && idx < NAV.length && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        nav(NAV[idx].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nav]);

  if (!ready) {
    return (
      <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
        <div className="muted small">Loading…</div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-top">
          <button className="btn sm ghost burger" title={collapsed ? 'Expand menu' : 'Collapse menu'} onClick={() => setSidebar(!collapsed)}>
            <Icon name="menu" size={17} />
          </button>
          {!collapsed && (
            <div className="logo">
              <BathMark size={30} />
              <div>
                <h1>Your Tutor</h1>
                <small>University of Bath · Prob 1A</small>
              </div>
            </div>
          )}
        </div>
        {collapsed && <div style={{ display: 'grid', placeItems: 'center', padding: '2px 0 10px' }}><BathMark size={26} /></div>}
        {NAV.map(n => (
          <button key={n.id} className={`nav-btn ${view === n.id ? 'active' : ''}`} data-tip={n.label} onClick={() => nav(n.id)}>
            <Icon name={n.icon} size={16} />
            <span className="nav-label">{n.label}</span>
          </button>
        ))}
        <div className="nav-spacer" />
        <div className={collapsed ? '' : 'row'} style={collapsed ? { display: 'grid', placeItems: 'center', gap: 2 } : { padding: '0 6px', gap: 4 }}>
          <button className="btn sm ghost" data-tip="Theme" onClick={() => setTheme(settings.theme === 'dark' ? 'light' : 'dark')}>
            <Icon name={settings.theme === 'dark' ? 'sun' : 'moon'} size={15} />
          </button>
          <button className="btn sm ghost" data-tip="Sound" onClick={() => setSound(!settings.sound)}>
            <Icon name={settings.sound ? 'sound' : 'mute'} size={15} />
          </button>
        </div>
      </aside>

      <main className={`main ${view === 'study' ? 'no-scroll' : ''}`}>
        {view === 'dashboard' && <DashboardView />}
        {view === 'study' && <StudyView />}
        {view === 'practice' && <PracticeView />}
        {view === 'cards' && <CardsView />}
        {view === 'exam' && <ExamView />}
        {view === 'map' && <MapView />}
        {view === 'mistakes' && <MistakesView />}
        {view === 'sheets' && <SheetsView />}
        {view === 'papers' && <PapersView />}
        {view === 'quick' && <QuickView />}
      </main>

      <nav className="tabbar">
        {MOBILE_NAV.map(id => {
          const n = NAV.find(x => x.id === id)!;
          return (
            <button key={id} className={view === id ? 'active' : ''} onClick={() => nav(id)}>
              <Icon name={n.icon} size={18} />
              {n.label.split(' ')[0]}
            </button>
          );
        })}
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
