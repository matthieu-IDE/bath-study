import { createContext, useContext, useEffect, useRef } from 'react';
export const AnimationControlContext = createContext({ playing: true, speed: 1, seek: 0 });

/* Tiny canvas-animation engine for the per-page maths visuals.
   Each visual is a draw(ctx, t, w, h, P) function running on a rAF loop. */

export interface Palette {
  known: string; cond: string; good: string; bad: string; warn: string; accent: string;
  text: string; muted: string; faint: string; line: string; bg2: string; card: string; card2: string;
}

let cached: Palette | null = null;
let cachedTheme = '';
export function palette(): Palette {
  const theme = document.documentElement.dataset.theme ?? 'light';
  if (cached && cachedTheme === theme) return cached;
  const s = getComputedStyle(document.documentElement);
  const v = (n: string) => s.getPropertyValue(n).trim();
  cached = {
    known: v('--known'), cond: v('--cond'), good: v('--good'), bad: v('--bad'),
    warn: v('--warn'), accent: v('--accent'), text: v('--text'), muted: v('--muted'),
    faint: v('--faint'), line: v('--line'), bg2: v('--bg2'), card: v('--card'), card2: v('--card2'),
  };
  cachedTheme = theme;
  return cached;
}

export type DrawFn = (ctx: CanvasRenderingContext2D, t: number, w: number, h: number, P: Palette) => void;

/** Mounts a rAF-driven canvas. t is seconds since mount. */
export function useAnimCanvas(draw: DrawFn, height = 180) {
  const controls = useContext(AnimationControlContext);
  const controlsRef = useRef(controls);
  controlsRef.current = controls;
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;
    let previous = performance.now(), elapsed = 0, lastSeek = controlsRef.current.seek;
    let visible = true;
    const io = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    io.observe(canvas);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth;
      canvas.width = w * dpr;
      canvas.height = height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const frame = (t: number) => {
      const w = canvas.width / dpr, h = height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      try { drawRef.current(ctx, t, w, h, palette()); } catch { /* keep looping */ }
    };
    frame(0.01); // paint immediately — don't wait for the first rAF
    const loop = (now: number) => {
      const c = controlsRef.current;
      elapsed += c.seek - lastSeek;
      lastSeek = c.seek;
      if (c.playing && visible && !document.hidden) elapsed += Math.min(0.1, (now - previous) / 1000) * c.speed;
      previous = now;
      if (visible) frame(elapsed);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, [height]);
  return ref;
}

/* ---- easing + loop helpers ---- */
export const easeInOut = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);
export const easeOut = (x: number) => 1 - (1 - x) ** 3;
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** phase of a repeating cycle: 0..1 */
export const cycle = (t: number, period: number, offset = 0) => ((t + offset) % period) / period;
/** 0→1 during [a,b] of the cycle phase, clamped */
export const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
/** deterministic pseudo-random from an integer */
export const hash = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function withAlpha(hex: string, a: number): string {
  if (hex.startsWith('#') && (hex.length === 7 || hex.length === 4)) {
    let r: number, g: number, b: number;
    if (hex.length === 7) { r = parseInt(hex.slice(1, 3), 16); g = parseInt(hex.slice(3, 5), 16); b = parseInt(hex.slice(5, 7), 16); }
    else { r = parseInt(hex[1] + hex[1], 16); g = parseInt(hex[2] + hex[2], 16); b = parseInt(hex[3] + hex[3], 16); }
    return `rgba(${r},${g},${b},${a})`;
  }
  return hex;
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
