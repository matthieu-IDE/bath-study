import { cycle, easeInOut, easeOut, hash, roundRect, seg, useAnimCanvas, withAlpha } from '../../lib/anim';

/* Animated maths visuals — chapters 3–4. */

const F = (px: number) => `${px}px 'Segoe UI', system-ui, sans-serif`;
const FB = (px: number) => `600 ${px}px 'Segoe UI', system-ui, sans-serif`;

export function AnimShrinkWorld() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const cols = 12, rows = 5;
    const gx = w / 2 - cols * 11, gy = 16;
    const fade = easeInOut(seg(p, 0.2, 0.5)) * (1 - easeInOut(seg(p, 0.88, 1)));
    let inF = 0, inBoth = 0;
    for (let i = 0; i < cols * rows; i++) {
      const isF = hash(i * 7 + 1) < 0.45;           // conditioning event
      const isA = hash(i * 13 + 5) < 0.4;           // event of interest
      if (isF) { inF++; if (isA) inBoth++; }
      const x = gx + (i % cols) * 22, y = gy + Math.floor(i / cols) * 20;
      const gone = !isF;
      ctx.globalAlpha = gone ? 1 - fade * 0.92 : 1;
      const rr = gone ? 6 - fade * 2 : 6 + fade * 1.5;
      ctx.fillStyle = isA && isF ? P.good : isA ? withAlpha(P.good, 0.55) : isF ? P.cond : P.faint;
      ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.font = FB(12); ctx.textAlign = 'center';
    ctx.fillStyle = fade > 0.5 ? P.cond : P.muted;
    ctx.fillText(
      fade > 0.5 ? `new world = the ${inF} where F happened  →  P(A | F) = ${inBoth}/${inF}` : 'news arrives: “F happened” — watch the rest vanish',
      w / 2, h - 8,
    );
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimPartitionFlow() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const parts = [0.3, 0.5, 0.2];
    const like = [0.5, 0.33, 0.25];
    const cols = [P.known, P.good, P.warn];
    const bx = 26, bw = w - 52, by = 18, bh = 54;
    let acc = 0;
    const stripe = easeInOut(seg(p, 0.08, 0.3));
    const drop = easeInOut(seg(p, 0.4, 0.75));
    let total = 0;
    parts.forEach((f, i) => {
      const x = bx + acc * bw, cw = f * bw;
      ctx.fillStyle = withAlpha(cols[i], 0.2); ctx.fillRect(x, by, cw, bh);
      ctx.strokeStyle = cols[i]; ctx.strokeRect(x + 0.5, by + 0.5, cw - 1, bh - 1);
      ctx.fillStyle = cols[i]; ctx.font = FB(10.5); ctx.textAlign = 'center';
      ctx.fillText(`E${i + 1}`, x + cw / 2, by + 13);
      // F-stripe inside each case, height ∝ P(F|Ei)
      const sh = bh * 0.42 * like[i] * 2 * stripe;
      ctx.fillStyle = withAlpha(P.cond, 0.75);
      ctx.fillRect(x + 3, by + bh - 4 - sh, cw - 6, sh);
      // drop into the total bar
      const contrib = f * like[i];
      if (drop > 0) {
        const ty = by + bh + 34;
        const px_ = bx + total * bw * 2.2; // scaled for visibility
        ctx.fillStyle = withAlpha(P.cond, 0.85);
        const dw = contrib * bw * 2.2 * drop;
        ctx.fillRect(bx + total * bw * 2.2, ty, dw, 16);
        total += contrib;
        void px_;
      } else total += 0;
      acc += f;
    });
    const sum = parts.reduce((a, f, i) => a + f * like[i], 0);
    ctx.strokeStyle = P.line; ctx.strokeRect(bx + 0.5, by + bh + 34.5, sum * bw * 2.2, 16);
    ctx.font = FB(11.5); ctx.textAlign = 'left'; ctx.fillStyle = P.text;
    if (drop > 0.9) ctx.fillText(`P(F) = Σ P(Eᵢ)·P(F|Eᵢ) = ${sum.toFixed(2)}`, bx + sum * bw * 2.2 + 8, by + bh + 47);
    ctx.fillStyle = P.muted; ctx.font = F(11); ctx.textAlign = 'center';
    ctx.fillText('purple = F inside each case; the pieces stack into P(F)', w / 2, h - 6);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimBayesFlow() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 9);
    const prior = 0.15, sens = 0.9, fpr = 0.12;
    const x0 = 30, x1 = w * 0.46, x2 = w * 0.8;
    const flow = (yA: number, hA: number, yB: number, hB: number, col: string, alpha: number, prog: number) => {
      if (prog <= 0) return;
      const xEnd = x1 + (x2 - x1) * Math.min(1, prog);
      ctx.beginPath();
      ctx.moveTo(x1, yA);
      ctx.bezierCurveTo((x1 + xEnd) / 2, yA, (x1 + xEnd) / 2, yB, xEnd, yB);
      ctx.lineTo(xEnd, yB + hB);
      ctx.bezierCurveTo((x1 + xEnd) / 2, yB + hB, (x1 + xEnd) / 2, yA + hA, x1, yA + hA);
      ctx.closePath();
      ctx.fillStyle = withAlpha(col, alpha); ctx.fill();
    };
    const top = 20, H = h - 60;
    const sickH = H * prior, wellH = H * (1 - prior);
    // stage 1: split population
    const s1 = easeOut(seg(p, 0.03, 0.22));
    ctx.fillStyle = withAlpha(P.bad, 0.75); ctx.fillRect(x0, top, 16, sickH * s1);
    ctx.fillStyle = withAlpha(P.known, 0.55); ctx.fillRect(x0, top + sickH, 16, wellH * s1);
    ctx.font = FB(10); ctx.fillStyle = P.bad; ctx.fillText('has it', x0, top - 5);
    ctx.fillStyle = P.known; ctx.fillText('healthy', x0, top + sickH + wellH + 13);
    // stage 2: flows to test results
    const s2 = seg(p, 0.25, 0.55);
    const tpH = sickH * sens, fpH = wellH * fpr;
    // draw source bars at x1
    ctx.fillStyle = withAlpha(P.bad, 0.75); ctx.fillRect(x1 - 6, top, 6, sickH);
    ctx.fillStyle = withAlpha(P.known, 0.55); ctx.fillRect(x1 - 6, top + sickH, 6, wellH);
    flow(top, tpH, top + 6, tpH, P.bad, 0.55, s2);                              // true +
    flow(top + sickH, fpH, top + 10 + tpH, fpH, P.warn, 0.6, s2);               // false +
    // positive bucket
    if (s2 > 0.9) {
      const post = tpH / (tpH + fpH);
      const blink = seg(p, 0.6, 0.75);
      ctx.strokeStyle = P.cond; ctx.lineWidth = 1.6;
      ctx.strokeRect(x2 + 0.5, top + 3, 30, tpH + fpH + 10);
      ctx.font = FB(11); ctx.fillStyle = P.cond; ctx.textAlign = 'center';
      ctx.fillText('test +', x2 + 15, top - 5);
      if (blink > 0) {
        ctx.fillStyle = P.text; ctx.font = FB(12.5);
        ctx.fillText(`P(has it | +) = ${(post * 100).toFixed(0)}%`, w / 2, h - 24);
        ctx.fillStyle = P.muted; ctx.font = F(10.5);
        ctx.fillText('red flow ÷ (red + amber flows) — that IS Bayes', w / 2, h - 8);
      }
      ctx.textAlign = 'left';
    }
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimSpinners() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const cy = h / 2 - 10;
    const spin = (cx: number, speed: number, cols: [string, string], label: string) => {
      const a = t * speed;
      for (let i = 0; i < 2; i++) {
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 26, i * Math.PI, (i + 1) * Math.PI);
        ctx.closePath();
        ctx.fillStyle = withAlpha(cols[i], 0.8); ctx.fill();
      }
      ctx.strokeStyle = P.text; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * 24, cy + Math.sin(a) * 24); ctx.stroke();
      ctx.fillStyle = P.text; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, 7); ctx.fill();
      ctx.font = F(10); ctx.fillStyle = P.muted; ctx.textAlign = 'center';
      ctx.fillText(label, cx, cy + 42);
      return Math.sin(a) > 0 ? 1 : 0;
    };
    const a = spin(w * 0.22, 1.9, [P.known, P.bad], 'spinner 1');
    const b = spin(w * 0.5, 2.7, [P.good, P.warn], 'spinner 2');
    // product grid
    const gx = w * 0.68, gy = cy - 26, cell = 26;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const active = i === a && j === b;
      ctx.fillStyle = active ? withAlpha(P.cond, 0.85) : P.bg2;
      roundRect(ctx, gx + j * cell, gy + i * cell, cell - 2, cell - 2, 4); ctx.fill();
    }
    ctx.font = FB(11); ctx.fillStyle = P.text; ctx.textAlign = 'center';
    ctx.fillText('P(both) = P(A) × P(B)', w * 0.68 + cell, gy + cell * 2 + 16);
    ctx.fillStyle = P.muted; ctx.font = F(10.5);
    ctx.fillText('no gossip between spinners — probabilities multiply', w / 2, h - 6);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimRVMachine() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const outcomes = ['HHH', 'HHT', 'HTH', 'THH', 'HTT', 'THT', 'TTH', 'TTT'];
    const period = 1.4;
    const i = Math.floor(t / period) % 8;
    const p = (t % period) / period;
    const word = outcomes[i];
    const X = word.split('').filter(c => c === 'H').length;
    const boxX = w / 2 - 30, cy = 44;
    // chip travels into the box
    const chipX = 30 + (boxX - 30) * easeInOut(seg(p, 0, 0.4));
    ctx.fillStyle = withAlpha(P.known, 0.14); roundRect(ctx, chipX - 24, cy - 12, 48, 24, 8); ctx.fill();
    ctx.strokeStyle = P.known; roundRect(ctx, chipX - 24, cy - 12, 48, 24, 8); ctx.stroke();
    ctx.fillStyle = P.text; ctx.font = FB(11); ctx.textAlign = 'center';
    ctx.fillText(word, chipX, cy + 4);
    // the function box
    ctx.fillStyle = withAlpha(P.cond, 0.12);
    roundRect(ctx, boxX, cy - 20, 74, 40, 10); ctx.fill();
    ctx.strokeStyle = P.cond; ctx.lineWidth = 1.8; roundRect(ctx, boxX, cy - 20, 74, 40, 10); ctx.stroke();
    ctx.fillStyle = P.cond; ctx.font = FB(13);
    ctx.fillText('X(ω)', boxX + 37, cy + 5);
    // number ball drops to the bin
    const binW = (w - 80) / 4;
    const bx = 40 + X * binW + binW / 2;
    const drop = easeIn(seg(p, 0.45, 0.85));
    function easeIn(x: number) { return x * x; }
    if (p > 0.45) {
      const by = cy + (h - 58 - cy) * drop;
      ctx.fillStyle = P.good; ctx.beginPath(); ctx.arc(boxX + 90 + (bx - boxX - 90) * drop, by, 10, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = FB(11);
      ctx.fillText(String(X), boxX + 90 + (bx - boxX - 90) * drop, by + 4);
    }
    // bins
    for (let k = 0; k <= 3; k++) {
      const x = 40 + k * binW;
      ctx.strokeStyle = P.line; ctx.strokeRect(x + 6.5, h - 44.5, binW - 13, 24);
      ctx.fillStyle = P.faint; ctx.font = F(10); ctx.textAlign = 'center';
      ctx.fillText(String(k), x + binW / 2, h - 8);
      const mass = [1, 3, 3, 1][k];
      ctx.fillStyle = withAlpha(P.good, 0.35);
      ctx.fillRect(x + 7, h - 44 + 23 - mass * 5.5, binW - 14, mass * 5.5);
    }
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText('outcome → function → number: the rv is the machine, not the randomness', w / 2, h - 55);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimStaircase() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 7);
    const masses = [1, 3, 3, 1];
    const bx = 40, bw = (w - 150) / 4;
    const base = h - 34;
    // pmf bars on the left of each slot; cumulative staircase draws over
    let acc = 0;
    for (let k = 0; k < 4; k++) {
      const x = bx + k * bw;
      ctx.fillStyle = withAlpha(P.known, 0.35);
      ctx.fillRect(x, base - masses[k] * 11, 18, masses[k] * 11);
      ctx.fillStyle = P.faint; ctx.font = F(10); ctx.textAlign = 'center';
      ctx.fillText(String(k), x + 9, base + 14);
      const stepP = seg(p, 0.15 + k * 0.17, 0.32 + k * 0.17);
      if (stepP > 0) {
        const yPrev = base - acc * 11;
        acc += masses[k];
        const yNew = base - acc * 11;
        ctx.strokeStyle = P.cond; ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(x + 24, yPrev);
        ctx.lineTo(x + 24, yPrev + (yNew - yPrev) * easeOut(stepP));
        if (stepP >= 1) { ctx.lineTo(x + 24 + bw, yNew); }
        ctx.stroke();
        ctx.fillStyle = P.cond; ctx.beginPath(); ctx.arc(x + 24, yNew, 3, 0, 7);
        if (stepP >= 1) ctx.fill();
      } else acc += 0;
    }
    ctx.fillStyle = P.text; ctx.font = FB(11); ctx.textAlign = 'right';
    ctx.fillText('F(x) climbs by each bar — jump = P(X = x)', w - 14, 24);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimGalton() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const rows = 6, topY = 16, dy = 15;
    const cx = w / 2;
    // pegs
    ctx.fillStyle = P.faint;
    for (let r = 0; r < rows; r++) for (let k = 0; k <= r; k++) {
      ctx.beginPath(); ctx.arc(cx + (k - r / 2) * 18, topY + r * dy, 2, 0, 7); ctx.fill();
    }
    // balls
    const NB = 8;
    for (let b = 0; b < NB; b++) {
      const bt = (t * 0.9 + b * 0.55) % 3.2;
      const id = Math.floor((t * 0.9 + b * 0.55) / 3.2) * NB + b;
      const prog = bt / 2.2;
      if (prog < 1) {
        const r = prog * rows;
        const ri = Math.floor(r);
        let x = 0;
        for (let k = 0; k < ri; k++) x += hash(id * 13 + k) < 0.5 ? -0.5 : 0.5;
        const frac = r - ri;
        const nx = x + (hash(id * 13 + ri) < 0.5 ? -0.5 : 0.5) * frac;
        ctx.fillStyle = P.warn;
        ctx.beginPath(); ctx.arc(cx + nx * 18, topY + r * dy - 4, 4, 0, 7); ctx.fill();
      }
    }
    // bins shaped like Bin(6, 1/2)
    const binom = [1, 6, 15, 20, 15, 6, 1];
    const baseY = h - 26;
    binom.forEach((m, k) => {
      const x = cx + (k - 3) * 18;
      const bh = (m / 20) * 46 * (0.7 + 0.3 * Math.sin(t * 0.8) ** 2);
      ctx.fillStyle = withAlpha(P.known, 0.55);
      ctx.fillRect(x - 7, baseY - bh, 14, bh);
    });
    ctx.strokeStyle = P.line; ctx.beginPath(); ctx.moveTo(cx - 76, baseY + 0.5); ctx.lineTo(cx + 76, baseY + 0.5); ctx.stroke();
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText('n left/right choices pile into C(n,x)/2ⁿ — the binomial', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimGeomTrials() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 5.5;
    const seedI = Math.floor(t / period);
    const p = (t % period) / period;
    // predetermined success trial via geometric with p=1/4
    let successAt = 1;
    for (let i = 1; i < 12; i++) { if (hash(seedI * 51 + i) < 0.28) { successAt = i; break; } successAt = i + 1; }
    successAt = Math.min(successAt, 11);
    const shown = Math.floor(p * 13);
    const y = h / 2 - 14;
    for (let i = 1; i <= Math.min(shown, successAt); i++) {
      const x = 26 + (i - 1) * ((w - 52) / 11);
      const isS = i === successAt;
      ctx.fillStyle = isS ? P.good : withAlpha(P.bad, 0.18);
      ctx.beginPath(); ctx.arc(x, y, isS ? 11 + 2 * Math.sin(t * 6) : 8, 0, 7); ctx.fill();
      if (!isS) {
        ctx.strokeStyle = P.bad; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(x - 3.5, y - 3.5); ctx.lineTo(x + 3.5, y + 3.5);
        ctx.moveTo(x + 3.5, y - 3.5); ctx.lineTo(x - 3.5, y + 3.5); ctx.stroke();
      } else {
        ctx.strokeStyle = P.card; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x - 1, y + 3.5); ctx.lineTo(x + 4.5, y - 3.5); ctx.stroke();
      }
      ctx.fillStyle = P.faint; ctx.font = F(9); ctx.textAlign = 'center';
      ctx.fillText(String(i), x, y + 24);
    }
    ctx.font = FB(12); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    if (shown > successAt) ctx.fillText(`first success on trial ${successAt}:  (1−p)^${successAt - 1} · p`, w / 2, h - 10);
    else ctx.fillText('waiting for the first success…', w / 2, h - 10);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimPoisTimeline() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 10;
    const seedI = Math.floor(t / period);
    const p = (t % period) / period;
    const y = h / 2 - 8;
    ctx.strokeStyle = P.line; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(w - 24, y); ctx.stroke();
    // three windows
    const winW = (w - 48) / 3;
    let counts = [0, 0, 0];
    const NE = 11;
    for (let i = 0; i < NE; i++) {
      const ex = hash(seedI * 71 + i);
      if (ex > p) continue;
      const x = 24 + ex * (w - 48);
      const win = Math.min(2, Math.floor(ex * 3));
      counts[win]++;
      const age = Math.min(1, (p - ex) * 10);
      ctx.fillStyle = withAlpha(P.accent, 0.4 + 0.6 * age);
      ctx.beginPath(); ctx.arc(x, y, 4 + (1 - age) * 5, 0, 7); ctx.fill();
      ctx.strokeStyle = withAlpha(P.accent, 0.7);
      ctx.beginPath(); ctx.moveTo(x, y - 10); ctx.lineTo(x, y - 4); ctx.stroke();
    }
    for (let wI = 0; wI < 3; wI++) {
      const x = 24 + wI * winW;
      ctx.strokeStyle = withAlpha(P.faint, 0.6); ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(x, y - 26); ctx.lineTo(x, y + 26); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = P.text; ctx.font = FB(12); ctx.textAlign = 'center';
      ctx.fillText(String(counts[wI]), x + winW / 2, y + 42);
    }
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText('random pings at rate λ — each window catches a Pois(λ) count', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimJointGrid() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const vals = [[1, 2, 3], [3, 4, 5], [5, 6, 7]];
    const W = 36;
    const cell = 30;
    const gx = w / 2 - cell * 1.5 - 26, gy = 16;
    const rowP = easeOut(seg(p, 0.35, 0.6));
    const colP = easeOut(seg(p, 0.6, 0.85));
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
      const v = vals[r][c];
      const appear = seg(p, (r * 3 + c) * 0.03, (r * 3 + c) * 0.03 + 0.1);
      ctx.fillStyle = withAlpha(P.known, 0.12 + (v / W) * 1.6 * appear);
      roundRect(ctx, gx + c * cell, gy + r * cell, cell - 3, cell - 3, 4); ctx.fill();
      if (appear > 0.6) {
        ctx.fillStyle = P.text; ctx.font = F(9.5); ctx.textAlign = 'center';
        ctx.fillText(`${v}`, gx + c * cell + cell / 2 - 1, gy + r * cell + cell / 2 + 2);
      }
    }
    // margins
    for (let r = 0; r < 3; r++) {
      const sum = vals[r].reduce((a, b) => a + b, 0);
      const x = gx + 3 * cell + 8 * rowP;
      ctx.globalAlpha = rowP;
      ctx.fillStyle = withAlpha(P.good, 0.75);
      roundRect(ctx, x, gy + r * cell, cell - 3, cell - 3, 4); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = FB(10); ctx.textAlign = 'center';
      ctx.fillText(String(sum), x + cell / 2 - 1, gy + r * cell + cell / 2 + 2);
      ctx.globalAlpha = 1;
    }
    for (let c = 0; c < 3; c++) {
      const sum = vals[0][c] + vals[1][c] + vals[2][c];
      const y = gy + 3 * cell + 8 * colP;
      ctx.globalAlpha = colP;
      ctx.fillStyle = withAlpha(P.warn, 0.8);
      roundRect(ctx, gx + c * cell, y, cell - 3, cell - 3, 4); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = FB(10); ctx.textAlign = 'center';
      ctx.fillText(String(sum), gx + c * cell + cell / 2 - 1, y + cell / 2 + 2);
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = P.muted; ctx.font = F(10.5); ctx.textAlign = 'center';
    ctx.fillText('cells /36 = the joint · row & column sums = the marginals', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimConvolve() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 9);
    const die = [1, 1, 1, 1, 1, 1];
    const baseY = h - 30;
    const bw = 13;
    const k = 2 + Math.floor(seg(p, 0.1, 0.9) * 10.99); // target sum 2..12
    // result distribution accumulated so far
    for (let s = 2; s <= 12; s++) {
      const ways = 6 - Math.abs(s - 7);
      const on = s <= k;
      const x = 30 + (s - 2) * ((w - 60) / 10);
      ctx.fillStyle = on ? withAlpha(P.cond, s === k ? 0.95 : 0.45) : P.bg2;
      const bh = ways * 8 * (on ? 1 : 0.4);
      ctx.fillRect(x - bw / 2, baseY - bh, bw, bh);
      ctx.fillStyle = P.faint; ctx.font = F(9); ctx.textAlign = 'center';
      ctx.fillText(String(s), x, baseY + 12);
    }
    // the pairing readout for current k
    const pairs: string[] = [];
    for (let a = 1; a <= 6; a++) { const b = k - a; if (b >= 1 && b <= 6) pairs.push(`${a}+${b}`); }
    ctx.fillStyle = P.text; ctx.font = FB(11.5); ctx.textAlign = 'center';
    ctx.fillText(`P(total = ${k}) — pair every split:  ${pairs.join('  ')}`, w / 2, 20);
    ctx.fillStyle = P.muted; ctx.font = F(10.5);
    ctx.fillText('convolution: sweep what X gave, Y supplies the rest', w / 2, 36);
    ctx.textAlign = 'left';
    void die;
  });
  return <canvas ref={ref} className="anim-canvas" />;
}
