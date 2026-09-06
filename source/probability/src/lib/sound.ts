/* Quiet, refined feedback sounds: filtered sine tones with soft attack and long
   exponential decay — closer to a felt piano than an arcade. All muteable. */
let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(m: boolean) { muted = m; }
export function isMuted() { return muted; }

function ac(): AudioContext | null {
  if (muted) return null;
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
}

/** One soft note: sine + a whisper of a 2nd harmonic through a gentle lowpass. */
function note(freq: number, t0: number, dur: number, peak = 0.028) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime + t0;
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = freq * 3.2;
  lp.Q.value = 0.4;
  const master = c.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(peak, now + 0.018);
  master.gain.exponentialRampToValueAtTime(0.00005, now + dur);
  lp.connect(master); master.connect(c.destination);
  for (const [mult, amp] of [[1, 1], [2, 0.16]] as const) {
    const o = c.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq * mult, now);
    const g = c.createGain();
    g.gain.value = amp;
    o.connect(g); g.connect(lp);
    o.start(now); o.stop(now + dur + 0.05);
  }
}

/** A barely-there tactile tick (filtered noise burst). */
function tick(t0 = 0, peak = 0.012) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime + t0;
  const len = 0.018;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * len), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** 2;
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass'; bp.frequency.value = 2100; bp.Q.value = 1.2;
  const g = c.createGain(); g.gain.value = peak;
  src.connect(bp); bp.connect(g); g.connect(c.destination);
  src.start(now);
}

/** A soft paper swish: shaped noise through a falling bandpass sweep. */
function swish(len = 0.3, peak = 0.02) {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * len), c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const t = i / d.length;
    d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) ** 2;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass'; bp.Q.value = 0.7;
  bp.frequency.setValueAtTime(3400, now);
  bp.frequency.exponentialRampToValueAtTime(850, now + len);
  const g = c.createGain(); g.gain.value = peak;
  src.connect(bp); bp.connect(g); g.connect(c.destination);
  src.start(now);
}

export const sfx = {
  /* gentle major third — approval without fanfare */
  correct() { note(659.3, 0, 0.5); note(830.6, 0.09, 0.6, 0.022); },
  /* paper sliding — plays with the page-turn animation */
  page() { swish(); },
  /* one low soft tone, no buzzer */
  wrong() { note(196, 0, 0.55, 0.022); },
  /* rising three-note arc, still quiet */
  mastery() { note(523.3, 0, 0.45, 0.02); note(659.3, 0.11, 0.5, 0.022); note(784, 0.22, 0.85, 0.024); },
  flip() { tick(0, 0.01); },
  click() { tick(0, 0.008); },
  coin() { note(1046.5, 0, 0.3, 0.014); },
  dice() { tick(0, 0.01); tick(0.05, 0.007); },
};
