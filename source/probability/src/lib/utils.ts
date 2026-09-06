/* Shared math + utility helpers. All question answers are computed here
   programmatically so every generated question ships with a verified answer. */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rng = () => number;

export const randInt = (rng: Rng, lo: number, hi: number) => lo + Math.floor(rng() * (hi - lo + 1));
export const pick = <T,>(rng: Rng, arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)];
export const shuffle = <T,>(rng: Rng, arr: readonly T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* ---------- exact combinatorics ---------- */
export function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
export function nPr(n: number, r: number): number {
  if (r > n || r < 0) return 0;
  let v = 1;
  for (let i = 0; i < r; i++) v *= n - i;
  return v;
}
export function nCr(n: number, r: number): number {
  if (r > n || r < 0) return 0;
  r = Math.min(r, n - r);
  let v = 1;
  for (let i = 0; i < r; i++) v = (v * (n - i)) / (i + 1);
  return Math.round(v);
}

/* ---------- distributions (pmf/pdf/cdf, exact where possible) ---------- */
export const binomPmf = (n: number, p: number, k: number) => (k < 0 || k > n ? 0 : nCr(n, k) * p ** k * (1 - p) ** (n - k));
export const binomCdf = (n: number, p: number, k: number) => {
  let s = 0;
  for (let i = 0; i <= Math.min(k, n); i++) s += binomPmf(n, p, i);
  return Math.min(1, s);
};
export const geomPmf = (p: number, k: number) => (k < 1 ? 0 : (1 - p) ** (k - 1) * p);
export const geomCdf = (p: number, k: number) => (k < 1 ? 0 : 1 - (1 - p) ** Math.floor(k));
export const poisPmf = (lam: number, k: number) => (k < 0 ? 0 : Math.exp(-lam + k * Math.log(lam) - lnFactorial(k)));
export const poisCdf = (lam: number, k: number) => {
  let s = 0;
  for (let i = 0; i <= k; i++) s += poisPmf(lam, i);
  return Math.min(1, s);
};
export function lnFactorial(n: number): number {
  if (n < 2) return 0;
  if (n < 171) return Math.log(factorial(n));
  // Stirling series for big n
  return n * Math.log(n) - n + 0.5 * Math.log(2 * Math.PI * n) + 1 / (12 * n);
}
export const expPdf = (lam: number, x: number) => (x < 0 ? 0 : lam * Math.exp(-lam * x));
export const expCdf = (lam: number, x: number) => (x < 0 ? 0 : 1 - Math.exp(-lam * x));
export const unifPdf = (a: number, b: number, x: number) => (x >= a && x < b ? 1 / (b - a) : 0);
export const unifCdf = (a: number, b: number, x: number) => (x <= a ? 0 : x >= b ? 1 : (x - a) / (b - a));
export const normPdf = (mu: number, s2: number, x: number) => Math.exp(-((x - mu) ** 2) / (2 * s2)) / Math.sqrt(2 * Math.PI * s2);
/** Standard normal cdf Φ via Abramowitz–Stegun 7.1.26 (|err| < 7.5e-8). */
export function phi(z: number): number {
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}
export const normCdf = (mu: number, s2: number, x: number) => phi((x - mu) / Math.sqrt(s2));

/* ---------- sampling ---------- */
export const sampleBernoulli = (rng: Rng, p: number) => (rng() < p ? 1 : 0);
export const sampleBinomial = (rng: Rng, n: number, p: number) => {
  let s = 0;
  for (let i = 0; i < n; i++) if (rng() < p) s++;
  return s;
};
export const sampleGeometric = (rng: Rng, p: number) => Math.max(1, Math.ceil(Math.log(1 - rng()) / Math.log(1 - p)));
export function samplePoisson(rng: Rng, lam: number): number {
  if (lam > 30) {
    // normal approx for speed at large λ
    const z = Math.sqrt(-2 * Math.log(1 - rng())) * Math.cos(2 * Math.PI * rng());
    return Math.max(0, Math.round(lam + Math.sqrt(lam) * z));
  }
  const L = Math.exp(-lam);
  let k = 0, p = 1;
  do { k++; p *= rng(); } while (p > L);
  return k - 1;
}
export const sampleExp = (rng: Rng, lam: number) => -Math.log(1 - rng()) / lam;
export const sampleNormal = (rng: Rng, mu = 0, sd = 1) => {
  const u = Math.max(rng(), 1e-12), v = rng();
  return mu + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
};

/* ---------- fractions & formatting ---------- */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b));
  while (b) [a, b] = [b, a % b];
  return a || 1;
}
export function simplify(num: number, den: number): [number, number] {
  const g = gcd(num, den);
  return [num / g, den / g];
}
export function fracTex(num: number, den: number): string {
  const [n, d] = simplify(num, den);
  return d === 1 ? String(n) : `\\frac{${n}}{${d}}`;
}
export function fmt(x: number, dp = 4): string {
  if (!isFinite(x)) return String(x);
  if (Number.isInteger(x) && Math.abs(x) < 1e12) return String(x);
  const r = x.toFixed(dp);
  return parseFloat(r).toString();
}
export function approxEqual(a: number, b: number, tol = 1e-4): boolean {
  if (!isFinite(a) || !isFinite(b)) return false;
  const scale = Math.max(1, Math.abs(b));
  return Math.abs(a - b) <= tol * scale;
}
/** Parse a user numeric answer: decimals, fractions "a/b", percentages, e^-x etc. kept simple. */
export function parseNumeric(s: string): number | null {
  const t = s.trim().replace(/\s+/g, '');
  if (!t) return null;
  const frac = t.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (frac) return parseFloat(frac[1]) / parseFloat(frac[2]);
  const pct = t.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (pct) return parseFloat(pct[1]) / 100;
  const v = parseFloat(t);
  return isNaN(v) ? null : v;
}

export const todayKey = () => new Date().toISOString().slice(0, 10);
export const now = () => Date.now();
export const DAY = 86400_000;
export const MIN = 60_000;

export const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
export const mean = (a: number[]) => (a.length ? sum(a) / a.length : 0);

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
