import { cycle, easeInOut, hash, roundRect, seg, useAnimCanvas, withAlpha } from '../../lib/anim';

/* Animated maths visuals — chapters 5–7. */

const F = (px: number) => `${px}px 'Segoe UI', system-ui, sans-serif`;
const FB = (px: number) => `600 ${px}px 'Segoe UI', system-ui, sans-serif`;

type Dist = 'unif' | 'exp' | 'norm';

export function AnimArea({ dist = 'norm' }: { dist?: Dist }) {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const left = 30, right = w - 30, baseY = h - 34;
    const X = (u: number) => left + u * (right - left);          // u in 0..1
    const pdf = (u: number): number => {
      if (dist === 'unif') return u > 0.15 && u < 0.85 ? 0.55 : 0;
      if (dist === 'exp') return Math.exp(-4.2 * u) * 1.05;
      const mu = 0.5 + 0.1 * Math.sin(t * 0.55);
      const sd = 0.11 + 0.035 * Math.sin(t * 0.34 + 1);
      return Math.exp(-((u - mu) ** 2) / (2 * sd * sd)) * 0.3 / sd * 0.28;
    };
    const Y = (v: number) => baseY - v * (h - 62);
    // sweeping interval
    const p = cycle(t, 6);
    const c0 = 0.5 + 0.32 * Math.sin(p * Math.PI * 2);
    const halfW = 0.1 + 0.06 * Math.sin(t * 0.9);
    const a = Math.max(0.02, c0 - halfW), b = Math.min(0.98, c0 + halfW);
    // area fill
    ctx.beginPath();
    ctx.moveTo(X(a), baseY);
    let area = 0;
    for (let u = a; u <= b; u += 0.008) { ctx.lineTo(X(u), Y(pdf(u))); area += pdf(u) * 0.008; }
    ctx.lineTo(X(b), baseY);
    ctx.closePath();
    ctx.fillStyle = withAlpha(P.good, 0.4); ctx.fill();
    // curve
    ctx.beginPath();
    for (let u = 0; u <= 1.0001; u += 0.006) { const x = X(u), y = Y(pdf(u)); u === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.strokeStyle = P.known; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.strokeStyle = P.line; ctx.beginPath(); ctx.moveTo(left - 8, baseY + 0.5); ctx.lineTo(right + 8, baseY + 0.5); ctx.stroke();
    // handles
    for (const u of [a, b]) {
      ctx.fillStyle = P.cond; ctx.beginPath(); ctx.arc(X(u), baseY, 4.5, 0, 7); ctx.fill();
    }
    // normalise the printed area per dist (rough scale for display)
    const total = (() => { let s = 0; for (let u = 0; u <= 1; u += 0.008) s += pdf(u) * 0.008; return s; })();
    ctx.fillStyle = P.text; ctx.font = FB(12); ctx.textAlign = 'center';
    ctx.fillText(`P(a < X ≤ b) = shaded area = ${(area / total).toFixed(2)}`, w / 2, 20);
    ctx.fillStyle = P.muted; ctx.font = F(10.5);
    const cap = dist === 'unif' ? 'flat density: only the LENGTH of the interval matters'
      : dist === 'exp' ? 'watch the tail: P(X > t) = e^(−λt) shrinks fast'
      : 'μ slides the bell, σ breathes it wider — area stays 1';
    ctx.fillText(cap, w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimMemoryless() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const left = 34, right = w - 26, baseY = h - 36;
    const X = (u: number) => left + u * (right - left);
    const S = (u: number) => Math.exp(-3.4 * u);
    const Y = (v: number) => baseY - v * (h - 64);
    // survival curve
    ctx.beginPath();
    for (let u = 0; u <= 1; u += 0.01) { const x = X(u), y = Y(S(u)); u === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.strokeStyle = P.known; ctx.lineWidth = 2.2; ctx.stroke();
    // the waiting marker walks along
    const p = cycle(t, 7);
    const m = 0.05 + 0.5 * easeInOut(seg(p, 0.05, 0.6));
    ctx.strokeStyle = P.cond; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(X(m), baseY); ctx.lineTo(X(m), Y(S(m))); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = P.cond; ctx.beginPath(); ctx.arc(X(m), baseY, 5, 0, 7); ctx.fill();
    ctx.font = F(10); ctx.fillStyle = P.cond; ctx.textAlign = 'center';
    ctx.fillText('you, still waiting', X(m), baseY + 16);
    // rescaled future = identical fresh curve, drawn ghosted from the marker
    const show = seg(p, 0.55, 0.8);
    if (show > 0) {
      ctx.globalAlpha = show;
      ctx.beginPath();
      for (let u = 0; u <= 1 - m; u += 0.01) {
        const x = X(m + u), y = Y(S(u) * S(m) / S(m)); // fresh curve, same shape
        u === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = P.good; ctx.lineWidth = 2.2; ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = P.good; ctx.font = FB(11);
      ctx.fillText('the future: a brand-new Exp(λ)', X(Math.min(0.72, m + 0.28)), Y(1) + 8);
    }
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText('however long you have waited, the wait ahead looks identical', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimJointTent() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 9);
    const N = 9;
    const cx = w / 2 - 30, cy = h / 2 + 26;
    const ix = 13, iy = 6.5, iz = 34;
    const squash = easeInOut(seg(p, 0.6, 0.85)) * (1 - easeInOut(seg(p, 0.95, 1)));
    const fz = (i: number, j: number) => {
      const u = (i - N / 2) / (N / 2), v = (j - N / 2) / (N / 2);
      return Math.exp(-(u * u + v * v) * 1.4);
    };
    for (let j = N - 1; j >= 0; j--) for (let i = 0; i < N; i++) {
      const zz = fz(i, j) * iz * (1 - squash * (Math.abs(j - N / 2) > 0 ? 1 : 0));
      const x = cx + (i - j) * ix;
      const y = cy + (i + j) * iy - (i + j) * 0.4;
      const grow = seg(p, 0.05 + (i + j) * 0.012, 0.2 + (i + j) * 0.012);
      const zh = zz * grow;
      const hue = fz(i, j);
      ctx.fillStyle = withAlpha(P.known, 0.25 + hue * 0.65);
      ctx.fillRect(x - 5, y - zh, 10, Math.max(1, zh));
      ctx.fillStyle = withAlpha(P.cond, 0.25 + hue * 0.5);
      ctx.fillRect(x - 5, y - zh - 2.5, 10, 2.5);
    }
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText(squash > 0.4 ? 'squash one direction flat = the MARGINAL density' : 'a tent of probability — volume above a patch = its probability', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimBalance() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const masses = [[1, 0.15], [2, 0.2], [3, 0.15], [4, 0.3], [6, 0.2]] as const;
    const EX = masses.reduce((a, [x, m]) => a + x * m, 0);
    const left = 50, right = w - 50, baseY = h / 2 + 20;
    const X = (v: number) => left + ((v - 0.5) / 6) * (right - left);
    // pivot slides toward E[X]
    const pv = 2 + (EX - 2) * easeInOut(seg(p, 0.25, 0.6));
    const tilt = Math.max(-0.09, Math.min(0.09, (EX - pv) * 0.055)) * (1 - seg(p, 0.6, 0.75));
    ctx.save();
    ctx.translate(X(pv), baseY);
    ctx.rotate(tilt);
    ctx.strokeStyle = P.text; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(X(0.6) - X(pv), 0); ctx.lineTo(X(6.4) - X(pv), 0); ctx.stroke();
    masses.forEach(([x, m]) => {
      const px = X(x) - X(pv);
      ctx.fillStyle = P.known;
      ctx.beginPath(); ctx.arc(px, -9 - m * 26, 6 + m * 26, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = FB(10); ctx.textAlign = 'center';
      ctx.fillText(String(x), px, -6 - m * 26 + 1);
    });
    ctx.restore();
    // pivot triangle
    ctx.fillStyle = P.warn;
    ctx.beginPath(); ctx.moveTo(X(pv), baseY + 2); ctx.lineTo(X(pv) - 9, baseY + 20); ctx.lineTo(X(pv) + 9, baseY + 20); ctx.closePath(); ctx.fill();
    ctx.font = FB(12); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(seg(p, 0.6, 0.75) > 0 ? `balances at E[X] = ${EX.toFixed(2)}` : 'find the balance point…', w / 2, h - 10);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimLotusLens() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 2;
    const vals = [1, 2, 3, 4];
    const probs = [0.4, 0.3, 0.2, 0.1];
    const i = Math.floor(t / period) % 4;
    const p = (t % period) / period;
    const y = h / 2 - 8;
    const lensX = w / 2;
    // travelling value ball: size = probability (the weight), label transforms at the lens
    const x = 40 + (w - 80) * easeInOut(p);
    const through = x > lensX;
    const r = 8 + probs[i] * 26;
    ctx.fillStyle = through ? P.good : P.known;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = FB(11.5); ctx.textAlign = 'center';
    ctx.fillText(through ? String(vals[i] ** 2) : String(vals[i]), x, y + 4);
    // the lens
    ctx.strokeStyle = P.cond; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.ellipse(lensX, y, 13, 34, 0, 0, 7); ctx.stroke();
    ctx.fillStyle = P.cond; ctx.font = FB(12);
    ctx.fillText('g(x) = x²', lensX, y - 44);
    ctx.fillStyle = P.muted; ctx.font = F(10.5);
    ctx.fillText('values transform · weights (sizes) never change', w / 2, h - 22);
    ctx.fillStyle = P.text; ctx.font = FB(11.5);
    ctx.fillText('E[g(X)] = Σ g(x) · P(X = x) — never g(E[X])', w / 2, h - 6);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimDeviation() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const meanY = h / 2 - 6;
    const pts = [-2.2, -1.1, -0.4, 0.9, 1.6, 2.6];
    ctx.strokeStyle = P.good; ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(26, meanY); ctx.lineTo(w - 26, meanY); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = P.good; ctx.font = FB(10.5);
    ctx.fillText('E[X]', 28, meanY - 6);
    const grow = easeInOut(seg(p, 0.25, 0.6));
    const shrink = 1 - easeInOut(seg(p, 0.9, 1));
    pts.forEach((d, i) => {
      const x = 50 + i * ((w - 100) / 5);
      const y = meanY - d * 16;
      // deviation arrow
      ctx.strokeStyle = withAlpha(P.bad, 0.8); ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(x, meanY); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = P.known; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill();
      // literal square on the deviation
      const s = Math.abs(d) * 16 * grow * shrink;
      if (s > 1) {
        ctx.fillStyle = withAlpha(P.warn, 0.3);
        ctx.strokeStyle = withAlpha(P.warn, 0.9);
        ctx.fillRect(x + 3, Math.min(y, meanY), s, s);
        ctx.strokeRect(x + 3.5, Math.min(y, meanY) + 0.5, s, s);
      }
    });
    ctx.font = FB(11.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(grow > 0.9 ? 'variance = the AVERAGE of these squares' : 'deviations from the mean… now square them', w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimCovarCloud() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const rho = Math.sin(t * 0.5);
    const cx = w / 2, cy = h / 2 - 8;
    const sx = 92, sy = 52;
    ctx.strokeStyle = P.line;
    ctx.beginPath(); ctx.moveTo(cx - sx - 12, cy); ctx.lineTo(cx + sx + 12, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - sy - 8); ctx.lineTo(cx, cy + sy + 8); ctx.stroke();
    for (let i = 0; i < 70; i++) {
      const z1 = (hash(i * 3 + 1) + hash(i * 7 + 2) + hash(i * 11 + 3) - 1.5) * 1.4;
      const z2 = (hash(i * 5 + 4) + hash(i * 13 + 5) + hash(i * 17 + 6) - 1.5) * 1.4;
      const X = z1;
      const Yv = rho * z1 + Math.sqrt(Math.max(0, 1 - rho * rho)) * z2;
      const same = X * Yv >= 0;
      ctx.fillStyle = withAlpha(same ? P.good : P.bad, 0.65);
      ctx.beginPath(); ctx.arc(cx + X * sx * 0.55, cy - Yv * sy * 0.75, 3, 0, 7); ctx.fill();
    }
    // covariance meter
    const mw = 120, mx = w / 2 - mw / 2, my = h - 26;
    ctx.strokeStyle = P.line; ctx.strokeRect(mx, my, mw, 8);
    ctx.fillStyle = rho >= 0 ? P.good : P.bad;
    ctx.fillRect(mx + mw / 2, my, (mw / 2) * rho, 8);
    ctx.font = FB(11); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(`ρ = ${rho.toFixed(2)}  —  green agrees, red disagrees`, w / 2, my - 6);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimLLNLine() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 10;
    const seedI = Math.floor(t / period);
    const p = (t % period) / period;
    const muY = h / 2 - 4;
    const N = 260;
    const shown = Math.max(2, Math.floor(p * N));
    ctx.strokeStyle = P.good; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(24, muY); ctx.lineTo(w - 24, muY); ctx.stroke(); ctx.setLineDash([]);
    // shrinking band ~ 1/sqrt(n)
    ctx.fillStyle = withAlpha(P.good, 0.1);
    ctx.beginPath();
    for (let i = 2; i <= N; i++) {
      const x = 24 + (Math.log(i) / Math.log(N)) * (w - 48);
      const band = 46 / Math.sqrt(i);
      i === 2 ? ctx.moveTo(x, muY - band) : ctx.lineTo(x, muY - band);
    }
    for (let i = N; i >= 2; i--) {
      const x = 24 + (Math.log(i) / Math.log(N)) * (w - 48);
      ctx.lineTo(x, muY + 46 / Math.sqrt(i));
    }
    ctx.closePath(); ctx.fill();
    // running average path
    let sum = 0;
    ctx.strokeStyle = P.known; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 1; i <= shown; i++) {
      sum += hash(seedI * 131 + i) < 0.5 ? 0 : 1;
      const avg = sum / i;
      const x = 24 + (Math.log(Math.max(2, i)) / Math.log(N)) * (w - 48);
      const y = muY - (avg - 0.5) * 130;
      i === 1 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.font = FB(11.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(`n = ${shown}   —   wobble dies like σ/√n`, w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimBulbs() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 2.2;
    const trial = Math.floor(t / period);
    const probs = [0.8, 0.5, 0.3, 0.6, 0.4];
    const y = h / 2 - 12;
    let lit = 0;
    probs.forEach((pr, i) => {
      const on = hash(trial * 37 + i) < pr;
      if (on) lit++;
      const x = 42 + i * ((w - 84) / 4);
      const g = ctx.createRadialGradient(x, y, 2, x, y, 16);
      g.addColorStop(0, withAlpha(on ? P.warn : P.faint, on ? 0.95 : 0.3));
      g.addColorStop(1, withAlpha(on ? P.warn : P.faint, 0.05));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fill();
      ctx.fillStyle = on ? P.warn : P.bg2;
      ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill();
      ctx.strokeStyle = on ? P.warn : P.line; ctx.stroke();
      ctx.fillStyle = P.text; ctx.font = FB(10); ctx.textAlign = 'center';
      ctx.fillText(on ? '1' : '0', x, y + 3.5);
      ctx.fillStyle = P.faint; ctx.font = F(9);
      ctx.fillText(`P=${pr}`, x, y + 30);
    });
    const E = probs.reduce((a, b) => a + b, 0);
    ctx.font = FB(12); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(`this trial: count = ${lit}    ·    E[count] = ΣP = ${E.toFixed(1)}`, w / 2, h - 10);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimTailBound() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const left = 34, right = w - 30, baseY = h - 36;
    const X = (u: number) => left + u * (right - left);
    const pdf = (u: number) => Math.exp(-3.2 * u) * 1;
    const Y = (v: number) => baseY - v * (h - 66);
    const thr = 0.35 + 0.25 * Math.sin(t * 0.7) ** 2;
    // curve + tail fill
    ctx.beginPath(); ctx.moveTo(X(thr), baseY);
    let tail = 0, total = 0, mean = 0;
    for (let u = 0; u <= 1; u += 0.008) { total += pdf(u) * 0.008; mean += u * pdf(u) * 0.008; }
    for (let u = thr; u <= 1; u += 0.008) { ctx.lineTo(X(u), Y(pdf(u))); tail += pdf(u) * 0.008; }
    ctx.lineTo(X(1), baseY); ctx.closePath();
    ctx.fillStyle = withAlpha(P.bad, 0.35); ctx.fill();
    ctx.beginPath();
    for (let u = 0; u <= 1; u += 0.008) { const x = X(u), y = Y(pdf(u)); u === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.strokeStyle = P.known; ctx.lineWidth = 2.2; ctx.stroke();
    // threshold + bound lever
    ctx.strokeStyle = P.warn; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(X(thr), baseY); ctx.lineTo(X(thr), Y(1)); ctx.stroke(); ctx.setLineDash([]);
    const bound = (mean / total) / thr;
    ctx.font = FB(11.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(`tail = ${(tail / total).toFixed(2)}   ≤   E[X]/x = ${Math.min(9.99, bound).toFixed(2)}`, w / 2, 20);
    ctx.fillStyle = P.muted; ctx.font = F(10.5);
    ctx.fillText('the mean is a leash: it caps how much probability can sit far out', w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimSlabs() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const left = 40, baseY = h - 34, cw = w * 0.5;
    const S = (u: number) => Math.exp(-2.6 * u);
    const X = (u: number) => left + u * cw;
    const Y = (v: number) => baseY - v * (h - 60);
    ctx.beginPath();
    for (let u = 0; u <= 1; u += 0.01) { const x = X(u), y = Y(S(u)); u === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.strokeStyle = P.known; ctx.lineWidth = 2.2; ctx.stroke();
    ctx.fillStyle = P.faint; ctx.font = F(10);
    ctx.fillText('P(X ≥ x)', left + 4, Y(1) - 4);
    // slabs peel off and stack into the E[X] column
    const NS = 7;
    const colX = w * 0.72;
    let stackY = baseY;
    for (let k = 0; k < NS; k++) {
      const v0 = k / NS, v1 = (k + 1) / NS;
      const uEnd = -Math.log((v0 + v1) / 2) / 2.6;
      const slabW = Math.min(1, Math.max(0, uEnd)) * cw;
      const sh = (Y(v0) - Y(v1)) * 0.92;
      const move = easeInOut(seg(p, 0.15 + k * 0.07, 0.35 + k * 0.07));
      const x = left + (colX - left) * move;
      const y = Y(v1) + (stackY - sh - Y(v1)) * move;
      ctx.fillStyle = withAlpha(P.good, 0.28 + 0.5 * (k / NS));
      ctx.fillRect(x, y, Math.max(6, slabW * (1 - move * 0.4)), sh);
      stackY -= sh * (move >= 1 ? 1 : 0) * 0 + sh; // fixed stack positions
    }
    ctx.font = FB(11.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText('E[X] = area under the survival curve — stack the slabs', w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimReturnWalk() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 12;
    const seedI = Math.floor(t / period);
    const p = (t % period) / period;
    const midY = h / 2 - 8;
    const N = 150;
    const shown = Math.floor(p * N);
    ctx.strokeStyle = P.line;
    ctx.beginPath(); ctx.moveTo(20, midY); ctx.lineTo(w - 20, midY); ctx.stroke();
    let y = 0, firstReturn = -1;
    ctx.strokeStyle = P.known; ctx.lineWidth = 1.8;
    ctx.beginPath(); ctx.moveTo(20, midY);
    for (let i = 1; i <= shown; i++) {
      y += hash(seedI * 211 + i) < 0.5 ? 1 : -1;
      if (y === 0 && firstReturn < 0) firstReturn = i;
      ctx.lineTo(20 + (i / N) * (w - 40), midY - y * 5);
    }
    ctx.stroke();
    if (firstReturn > 0 && shown >= firstReturn) {
      const fx = 20 + (firstReturn / N) * (w - 40);
      ctx.fillStyle = P.good;
      ctx.beginPath(); ctx.arc(fx, midY, 5, 0, 7); ctx.fill();
      ctx.font = FB(10.5); ctx.fillStyle = P.good; ctx.textAlign = 'center';
      ctx.fillText(`home after ${firstReturn * 2} steps`, fx, midY + 22);
    }
    ctx.font = FB(11.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText('return is CERTAIN — but some trips are so long the average wait is infinite', w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}
