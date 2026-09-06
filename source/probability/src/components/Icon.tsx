/* Minimal stroke icon set — 1.5px stroke, 24px grid, currentColor. No emojis anywhere. */

const PATHS: Record<string, React.ReactNode> = {
  home: <><path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>,
  book: <><path d="M5 4h9a3 3 0 013 3v13H8a3 3 0 00-3 3z" transform="translate(1 -1.5)" /><path d="M6 3.5v15.8" /><path d="M6 19.3a2.2 2.2 0 000 4.4" opacity="0" /></>,
  edit: <><path d="M4 20l4.5-1L20 7.5a2.1 2.1 0 00-3-3L5.5 16z" /><path d="M14.5 6l3 3" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>,
  file: <><path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M10 13h5M10 16h5" /></>,
  map: <><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="9" r="2.4" /><circle cx="10" cy="18" r="2.4" /><path d="M8.2 7l7.5 1.6M16.6 11l-5 5M7 8.2l2 7.5" /></>,
  tool: <><path d="M14.5 6.5a4.5 4.5 0 00-6 5.6L4 16.6a2 2 0 002.8 2.8l4.5-4.5a4.5 4.5 0 005.6-6L14 11.8l-2.4-2.4z" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  folder: <><path d="M3.5 6.5a2 2 0 012-2h4l2 2.5h7a2 2 0 012 2v8.5a2 2 0 01-2 2h-13a2 2 0 01-2-2z" /></>,
  bolt: <><path d="M13 3L5 13.5h5L10.5 21l8-10.5h-5z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" /></>,
  moon: <path d="M20 13.5A8 8 0 0110.5 4 8 8 0 1020 13.5z" />,
  sound: <><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" /><path d="M15.5 9a4.2 4.2 0 010 6M17.8 6.8a7.5 7.5 0 010 10.4" /></>,
  mute: <><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" /><path d="M15.5 9.8l5 4.4M20.5 9.8l-5 4.4" /></>,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  bulb: <><path d="M9 18h6M10 21h4" /><path d="M8 13.5a5.5 5.5 0 118 0c-.9.9-1.4 1.6-1.5 2.5h-5c-.1-.9-.6-1.6-1.5-2.5z" /></>,
  left: <path d="M14.5 5.5L8 12l6.5 6.5" />,
  right: <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  up: <path d="M5.5 14.5L12 8l6.5 6.5" />,
  down: <path d="M5.5 9.5L12 16l6.5-6.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  bookmark: <path d="M7 3.5h10V21l-5-3.5L7 21z" />,
  flag: <><path d="M6 21V4" /><path d="M6 5h11l-2.5 3.5L17 12H6" /></>,
  pen: <path d="M12 19c-4 1.5-7 1-8 1 0-1-.5-4 1-8C7 7 13 3.5 19 5c1.5 6-2 12-7 14zM5 19L15 9" />,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15.5 15.5L21 21" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
  chart: <><path d="M4 20h16" /><path d="M6.5 20v-6M11 20V8M15.5 20v-9M20 20V5" transform="translate(-1 0)" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5.5l3.5 2" /></>,
  lock: <><rect x="5.5" y="10.5" width="13" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5" /></>,
  refresh: <><path d="M20 12a8 8 0 10-2.5 5.8" /><path d="M20 12V6.5M20 12h-5.5" transform="translate(0 6) scale(1 -1) translate(0 -18)" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  alert: <><path d="M12 4L2.8 19.5h18.4z" /><path d="M12 10v4M12 16.8v.4" /></>,
  flask: <><path d="M9.5 3.5h5" /><path d="M10.5 3.5v5L5 17.5a2 2 0 001.8 3h10.4a2 2 0 001.8-3L13.5 8.5v-5" /><path d="M7.5 14.5h9" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /></>,
  eye: <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="2.8" /></>,
  link: <><path d="M10 14a4 4 0 005.7 0l3-3A4 4 0 1013 5.3l-1.2 1.2" /><path d="M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 1011 18.7l1.2-1.2" /></>,
  play: <path d="M8 5.5v13l10-6.5z" />,
  dice: <><rect x="4" y="4" width="16" height="16" rx="3.5" /><circle cx="9" cy="9" r="1.15" fill="currentColor" stroke="none" /><circle cx="15" cy="15" r="1.15" fill="currentColor" stroke="none" /><circle cx="15" cy="9" r="1.15" fill="currentColor" stroke="none" /><circle cx="9" cy="15" r="1.15" fill="currentColor" stroke="none" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20a7 7 0 0114 0" /></>,
  zap: <path d="M13 3L5 13.5h5L10.5 21l8-10.5h-5z" />,
  magnify: <><circle cx="10.5" cy="10.5" r="6" /><path d="M15.5 15.5L21 21" /><path d="M10.5 8v5M8 10.5h5" /></>,
  brain: <><path d="M9.5 4.5A3 3 0 006 7.3a3.2 3.2 0 00-1.8 4.2A3.1 3.1 0 005 16.4c.2 1.9 1.6 3.1 3.4 3.1 1.3 0 2.4-.6 3.1-1.6.7 1 1.8 1.6 3.1 1.6 1.8 0 3.2-1.2 3.4-3.1a3.1 3.1 0 00.8-4.9A3.2 3.2 0 0018 7.3a3 3 0 00-3.5-2.8A3.1 3.1 0 0012 6a3.1 3.1 0 00-2.5-1.5z" /><path d="M12 6v12" /></>,
  web: <><path d="M12 3l7.8 5.7-3 9.1H7.2l-3-9.1z" /><path d="M12 7.2l4.6 3.3-1.8 5.4H9.2l-1.8-5.4z" opacity="0.55" /><path d="M12 3v4.2M19.8 8.7l-3.2 1.8M16.8 17.8l-2-2.9M7.2 17.8l2-2.9M4.2 8.7l3.2 1.8" /></>,
  trophy: <><path d="M8 4h8v5a4 4 0 01-8 0z" /><path d="M8 5H4.5c0 3 1.5 4.5 3.5 4.7M16 5h3.5c0 3-1.5 4.5-3.5 4.7" /><path d="M12 13v3M9 20h6M10 16.5h4l.6 3.5H9.4z" /></>,
  fit: <><path d="M4 9V5.5A1.5 1.5 0 015.5 4H9" /><path d="M15 4h3.5A1.5 1.5 0 0120 5.5V9" /><path d="M20 15v3.5a1.5 1.5 0 01-1.5 1.5H15" /><path d="M9 20H5.5A1.5 1.5 0 014 18.5V15" /></>,
  cursor: <path d="M6 4l12.5 7.5-5.4 1.4L15.5 19l-2.6 1.2-2.4-6.2L6.5 17z" />,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  shield: <><path d="M12 3l7 2.5v5.6c0 4.4-2.9 7.6-7 9.4-4.1-1.8-7-5-7-9.4V5.5z" /><path d="M8.2 9.3h7.6M8.6 12h6.8M9.4 14.7h5.2" /><circle cx="12" cy="6.9" r="1" fill="currentColor" stroke="none" /></>,
  doc: <><rect x="4.5" y="3.5" width="15" height="17" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  toc: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.6" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="4.6" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="4.6" cy="18" r="1" fill="currentColor" stroke="none" /></>,
};

export function Icon({ name, size = 17, className, style }: { name: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const p = PATHS[name];
  if (!p) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ flexShrink: 0, verticalAlign: '-0.18em', ...style }} aria-hidden>
      {p}
    </svg>
  );
}

/* Mastery dot: the 5 bands as coloured dots (replaces emoji circles). */
export const BAND_COLORS = ['var(--band0)', 'var(--band1)', 'var(--band2)', 'var(--band3)', 'var(--band4)'] as const;

export function MasteryDot({ band, size = 9 }: { band: number; size?: number }) {
  return (
    <span aria-hidden style={{
      display: 'inline-block', width: size, height: size, borderRadius: size,
      background: BAND_COLORS[band] ?? BAND_COLORS[0], flexShrink: 0,
      boxShadow: band === 0 ? 'inset 0 0 0 1.2px var(--line2)' : 'none',
    }} />
  );
}
