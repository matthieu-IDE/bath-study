import { cycle, easeInOut, easeOut, hash, roundRect, seg, useAnimCanvas, withAlpha } from '../../lib/anim';

/* Animated maths visuals — chapters 1–2. Ambient, looping, colourful, specific. */

const F = (px: number) => `${px}px 'Segoe UI', system-ui, sans-serif`;
const FB = (px: number) => `600 ${px}px 'Segoe UI', system-ui, sans-serif`;

export function AnimSets() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 9);
    const cx = w / 2, cy = h / 2 - 4, r = 46;
    // circles drift together then apart
    const gap = 30 + 26 * Math.cos(seg(p, 0, 0.22) * Math.PI) - 26 * (1 - Math.cos(seg(p, 0.82, 1) * Math.PI));
    const ax = cx - gap, bx = cx + gap;
    ctx.strokeStyle = P.line; ctx.strokeRect(14.5, 10.5, w - 29, h - 34);
    ctx.fillStyle = P.faint; ctx.font = FB(11); ctx.fillText('Ω', 21, 26);
    const phase = p < 0.35 ? 'union' : p < 0.62 ? 'inter' : p < 0.85 ? 'comp' : 'drift';
    // complement wash
    if (phase === 'comp') {
      const a = easeInOut(seg(p, 0.62, 0.7));
      ctx.fillStyle = withAlpha(P.bad, 0.16 * a);
      ctx.fillRect(15, 11, w - 30, h - 35);
    }
    // union / base fills
    for (const [x, col] of [[ax, P.known], [bx, P.good]] as const) {
      ctx.beginPath(); ctx.arc(x, cy, r, 0, 7);
      ctx.fillStyle = withAlpha(col, phase === 'union' ? 0.30 : phase === 'comp' ? 0.55 : 0.14);
      ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
    }
    // intersection lens
    if (gap < r) {
      ctx.save();
      ctx.beginPath(); ctx.arc(ax, cy, r, 0, 7); ctx.clip();
      ctx.beginPath(); ctx.arc(bx, cy, r, 0, 7);
      const glow = phase === 'inter' ? 0.55 + 0.2 * Math.sin(t * 5) : 0.22;
      ctx.fillStyle = withAlpha(P.cond, glow);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = P.text; ctx.font = FB(13); ctx.textAlign = 'center';
    ctx.fillText('E', ax - r * 0.55, cy - r * 0.62);
    ctx.fillText('F', bx + r * 0.55, cy - r * 0.62);
    ctx.font = FB(12.5);
    const label = phase === 'union' ? 'E ∪ F — either happens' : phase === 'inter' ? 'E ∩ F — both happen' : phase === 'comp' ? '(E ∪ F)ᶜ — neither' : 'two events, one world';
    ctx.fillStyle = phase === 'comp' ? P.bad : phase === 'inter' ? P.cond : P.known;
    ctx.fillText(label, cx, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimDeMorgan() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const draw = (cx: number, mode: 'lhs' | 'rhs', prog: number) => {
      const cy = h / 2 - 6, r = 27, gap = 16;
      ctx.strokeStyle = P.line; ctx.strokeRect(cx - 62.5, cy - 44.5, 125, 92);
      if (mode === 'lhs' && prog > 0) {
        // shade everything outside the union
        ctx.save();
        ctx.beginPath(); ctx.rect(cx - 62, cy - 44, 125 * prog, 91);
        ctx.clip();
        ctx.fillStyle = withAlpha(P.bad, 0.3);
        ctx.fillRect(cx - 62, cy - 44, 125, 91);
        ctx.globalCompositeOperation = 'destination-out';
        for (const x of [cx - gap, cx + gap]) { ctx.beginPath(); ctx.arc(x, cy, r, 0, 7); ctx.fill(); }
        ctx.restore();
      }
      if (mode === 'rhs') {
        // two hatch passes: Ec then Fc — the doubly hatched region is the answer
        for (const [i, x] of [cx - gap, cx + gap].entries()) {
          const pr = seg(prog, i * 0.5, i * 0.5 + 0.5);
          if (pr <= 0) continue;
          ctx.save();
          ctx.beginPath(); ctx.rect(cx - 62, cy - 44, 125, 91); ctx.clip();
          ctx.beginPath(); ctx.rect(cx - 62, cy - 44, 125, 91);
          ctx.arc(x, cy, r, 0, 7, true);
          ctx.clip();
          ctx.strokeStyle = withAlpha(i === 0 ? P.known : P.good, 0.75);
          ctx.lineWidth = 1.4;
          const n = Math.floor(26 * pr);
          for (let k = 0; k < n; k++) {
            const off = -100 + k * 9;
            ctx.beginPath();
            if (i === 0) { ctx.moveTo(cx - 70 + off, cy + 55); ctx.lineTo(cx - 20 + off, cy - 55); }
            else { ctx.moveTo(cx - 20 + off, cy - 55); ctx.lineTo(cx - 70 + off, cy + 55); ctx.moveTo(cx + off - 70, cy - 55); ctx.lineTo(cx + off - 20, cy + 55); }
            ctx.stroke();
          }
          ctx.restore();
        }
      }
      for (const [x, col] of [[cx - gap, P.known], [cx + gap, P.good]] as const) {
        ctx.beginPath(); ctx.arc(x, cy, r, 0, 7);
        ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.stroke();
      }
    };
    const lp = easeInOut(seg(p, 0.05, 0.35));
    const rp = seg(p, 0.4, 0.8);
    draw(w * 0.27, 'lhs', lp);
    draw(w * 0.73, 'rhs', rp);
    const eq = p > 0.82;
    ctx.fillStyle = eq ? P.cond : P.faint;
    ctx.font = FB(eq ? 20 + 3 * Math.sin(t * 6) : 18);
    ctx.textAlign = 'center';
    ctx.fillText('=', w / 2, h / 2);
    ctx.font = FB(11.5);
    ctx.fillStyle = P.text;
    ctx.fillText('(E ∪ F)ᶜ', w * 0.27, h - 6);
    ctx.fillText('Eᶜ ∩ Fᶜ', w * 0.73, h - 6);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimSigmaClub() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 7);
    const doorX = w / 2;
    // the club (right half)
    ctx.fillStyle = withAlpha(P.cond, 0.08);
    roundRect(ctx, doorX, 14, w - doorX - 12, h - 40, 10); ctx.fill();
    ctx.strokeStyle = P.cond; ctx.lineWidth = 1.6;
    roundRect(ctx, doorX, 14, w - doorX - 12, h - 40, 10); ctx.stroke();
    ctx.fillStyle = P.cond; ctx.font = FB(11);
    ctx.fillText('the σ-algebra  F', doorX + 12, 30);
    const chip = (x: number, y: number, label: string, col: string, alpha = 1) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = withAlpha(col, 0.16); roundRect(ctx, x - 22, y - 11, 44, 22, 8); ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 1.4; roundRect(ctx, x - 22, y - 11, 44, 22, 8); ctx.stroke();
      ctx.fillStyle = P.text; ctx.font = FB(11.5); ctx.textAlign = 'center';
      ctx.fillText(label, x, y + 4); ctx.textAlign = 'left';
      ctx.globalAlpha = 1;
    };
    // member already in: ∅
    chip(doorX + 40, 52, '∅', P.faint);
    // E slides in
    const eIn = easeInOut(seg(p, 0.05, 0.35));
    const ex = 40 + (doorX + 40 - 40) * eIn;
    chip(ex, 84, 'E', P.known);
    // its complement is dragged in automatically
    const cIn = easeInOut(seg(p, 0.3, 0.55));
    if (cIn > 0) chip(40 + (doorX + 100 - 40) * cIn, 84, 'Eᶜ', P.bad, Math.min(1, cIn * 2));
    // a union of members forms inside
    const uIn = easeInOut(seg(p, 0.6, 0.85));
    if (uIn > 0) chip(doorX + 70, 118, 'E ∪ Eᶜ = Ω', P.good, uIn);
    ctx.fillStyle = P.muted; ctx.font = F(11);
    ctx.textAlign = 'center';
    ctx.fillText(p < 0.35 ? 'an event joins…' : p < 0.6 ? '…its complement must join too' : 'and unions of members are members', w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimCake() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    const cx = w * 0.34, cy = h / 2 - 6, r = 48;
    const parts = [0.35, 0.25, 0.22, 0.18];
    const cols = [P.known, P.good, P.warn, P.cond];
    const explode = easeInOut(seg(p, 0.15, 0.45)) * (1 - easeInOut(seg(p, 0.85, 1)));
    let a0 = -Math.PI / 2;
    parts.forEach((frac, i) => {
      const a1 = a0 + frac * Math.PI * 2;
      const mid = (a0 + a1) / 2;
      const off = 7 * explode;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(mid) * off, cy + Math.sin(mid) * off);
      ctx.arc(cx + Math.cos(mid) * off, cy + Math.sin(mid) * off, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = withAlpha(cols[i], 0.8); ctx.fill();
      ctx.strokeStyle = P.card; ctx.lineWidth = 2; ctx.stroke();
      if (explode > 0.5) {
        ctx.fillStyle = P.card; ctx.font = FB(10); ctx.textAlign = 'center';
        ctx.fillText(frac.toFixed(2), cx + Math.cos(mid) * (off + r * 0.62), cy + Math.sin(mid) * (off + r * 0.62) + 3);
        ctx.textAlign = 'left';
      }
      a0 = a1;
    });
    // the sum bar
    const bx = w * 0.62, bw = w * 0.3, by = cy - 10;
    ctx.strokeStyle = P.line; ctx.strokeRect(bx, by, bw, 20);
    let acc = 0;
    const fillP = easeOut(seg(p, 0.45, 0.8));
    parts.forEach((frac, i) => {
      const seg_w = bw * frac * Math.min(1, fillP * parts.length - i);
      if (seg_w > 0) { ctx.fillStyle = cols[i]; ctx.fillRect(bx + acc, by, Math.max(0, Math.min(seg_w, bw * frac)), 20); }
      acc += bw * frac;
    });
    ctx.fillStyle = P.text; ctx.font = FB(12);
    ctx.fillText(fillP >= 1 ? '= 1  ✓' : 'Σ P(Eᵢ)', bx + bw + 6, by + 15);
    ctx.fillStyle = P.muted; ctx.font = F(11); ctx.textAlign = 'center';
    ctx.fillText('disjoint slices simply add — that is axiom (A3)', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimSpotlights() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 7);
    const cy = h / 2 + 4, r = 44;
    const ax = w / 2 - 28, bx = w / 2 + 28;
    const phase = p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.85 ? 2 : 3;
    const overlapGlow = phase === 1 ? 0.75 : phase === 2 ? 0.75 - 0.5 * easeInOut(seg(p, 0.55, 0.7)) : 0.25;
    for (const [x, col, on] of [[ax, P.known, phase >= 0], [bx, P.good, phase >= 1]] as const) {
      if (!on) continue;
      const g = ctx.createRadialGradient(x, cy, 4, x, cy, r);
      g.addColorStop(0, withAlpha(col, 0.5)); g.addColorStop(1, withAlpha(col, 0.06));
      ctx.beginPath(); ctx.arc(x, cy, r, 0, 7); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = col; ctx.lineWidth = 1.6; ctx.stroke();
    }
    if (phase >= 1) {
      ctx.save();
      ctx.beginPath(); ctx.arc(ax, cy, r, 0, 7); ctx.clip();
      ctx.beginPath(); ctx.arc(bx, cy, r, 0, 7);
      ctx.fillStyle = withAlpha(P.warn, overlapGlow); ctx.fill();
      ctx.restore();
    }
    ctx.font = FB(12.5); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    const msg = phase === 0 ? 'P(E)' : phase === 1 ? 'P(E) + P(F): the overlap is counted TWICE' : phase === 2 ? '− P(E ∩ F): remove the double count' : 'P(E ∪ F) — correct';
    ctx.fillStyle = phase === 1 ? P.warn : phase === 2 ? P.bad : P.text;
    ctx.fillText(msg, w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimTree() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 7);
    const x0 = 26, y0 = h / 2 - 8;
    const l1 = 3, l2 = 2;
    const cols = [P.known, P.good, P.warn];
    const g1 = easeOut(seg(p, 0.05, 0.3));
    const g2 = easeOut(seg(p, 0.35, 0.6));
    const count = seg(p, 0.62, 0.8);
    for (let i = 0; i < l1; i++) {
      const y1 = y0 + (i - 1) * 38;
      const x1 = x0 + 76 * g1;
      ctx.strokeStyle = cols[i]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0), y0 + (y1 - y0) * g1); ctx.stroke();
      if (g1 >= 1) {
        ctx.fillStyle = cols[i]; ctx.beginPath(); ctx.arc(x1, y1, 5, 0, 7); ctx.fill();
        for (let j = 0; j < l2; j++) {
          const y2 = y1 + (j - 0.5) * 22;
          const x2 = x1 + 66 * g2;
          ctx.strokeStyle = withAlpha(cols[i], 0.65); ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 + (x2 - x1), y1 + (y2 - y1) * g2); ctx.stroke();
          if (g2 >= 1) {
            ctx.fillStyle = P.card; ctx.strokeStyle = cols[i];
            ctx.beginPath(); ctx.arc(x2, y2, 4.5, 0, 7); ctx.fill(); ctx.stroke();
            if (count > 0) {
              const idx = i * l2 + j;
              const on = count * 6 >= idx + 1;
              if (on) { ctx.fillStyle = cols[i]; ctx.font = FB(10); ctx.fillText(String(idx + 1), x2 + 9, y2 + 3.5); }
            }
          }
        }
      }
    }
    ctx.fillStyle = P.text; ctx.beginPath(); ctx.arc(x0, y0, 5.5, 0, 7); ctx.fill();
    ctx.font = FB(12.5); ctx.textAlign = 'center';
    ctx.fillStyle = p > 0.8 ? P.cond : P.muted;
    ctx.fillText(p > 0.8 ? '3 × 2 = 6 routes' : 'choices multiply stage by stage', w / 2 + 30, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimPerm() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 6);
    const orders = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
    const k = Math.floor(p * 6) % 6;
    const frac = easeInOut((p * 6) % 1);
    const prev = orders[(k + 5) % 6], cur = orders[k];
    const cols = [P.known, P.good, P.warn];
    const slotX = (i: number) => w / 2 - 60 + i * 60;
    const cy = h / 2 - 8;
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = P.line; ctx.lineWidth = 1.5;
      roundRect(ctx, slotX(i) - 20, cy - 20, 40, 40, 9); ctx.stroke();
      ctx.fillStyle = P.faint; ctx.font = F(9.5); ctx.textAlign = 'center';
      ctx.fillText(['1st', '2nd', '3rd'][i], slotX(i), cy + 34);
    }
    for (let tok = 0; tok < 3; tok++) {
      const from = prev.indexOf(tok), to = cur.indexOf(tok);
      const x = slotX(from) + (slotX(to) - slotX(from)) * frac;
      const lift = Math.sin(frac * Math.PI) * (from !== to ? 16 : 0);
      ctx.fillStyle = cols[tok];
      ctx.beginPath(); ctx.arc(x, cy - lift, 13, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = FB(11);
      ctx.fillText('ABC'[tok], x, cy - lift + 4);
    }
    ctx.fillStyle = P.text; ctx.font = FB(12.5);
    ctx.fillText(`ordering ${k + 1} of 3! = 6`, w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimComb() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 8);
    // AB BA | AC CA | BC CB  →  collapse pairs into {A,B} {A,C} {B,C}
    const pairs = [['AB', 'BA'], ['AC', 'CA'], ['BC', 'CB']];
    const merged = ['{A,B}', '{A,C}', '{B,C}'];
    const cols = [P.known, P.good, P.warn];
    const m = easeInOut(seg(p, 0.3, 0.65));
    pairs.forEach((pair, i) => {
      const cx = w / 6 + (i * w) / 3 + 18;
      const topY = 34, botY = 78;
      const midY = (topY + botY) / 2;
      pair.forEach((lbl, j) => {
        const y = (j === 0 ? topY : botY) + (midY - (j === 0 ? topY : botY)) * m;
        const alpha = 1 - m * 0.55;
        ctx.globalAlpha = j === 1 ? alpha : 1;
        ctx.fillStyle = withAlpha(cols[i], 0.16);
        roundRect(ctx, cx - 24, y - 12, 48, 24, 8); ctx.fill();
        ctx.strokeStyle = cols[i]; ctx.lineWidth = 1.4; roundRect(ctx, cx - 24, y - 12, 48, 24, 8); ctx.stroke();
        ctx.fillStyle = P.text; ctx.font = FB(11); ctx.textAlign = 'center';
        ctx.fillText(m > 0.9 && j === 0 ? merged[i] : lbl, cx, y + 4);
        ctx.globalAlpha = 1;
      });
    });
    ctx.textAlign = 'center';
    ctx.fillStyle = m > 0.9 ? P.cond : P.muted; ctx.font = FB(12);
    ctx.fillText(m > 0.9 ? '6 ordered ÷ 2! = 3 unordered   —   C(3,2) = 3' : 'order collapses: AB and BA are the same choice', w / 2, h - 9);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimStars() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, 7);
    // 5 scoops + 2 bars = C(7,5) arrangements; animate one arrangement shuffling
    const seedI = Math.floor(t / 7);
    const items: ('S' | 'M')[] = ['S', 'S', 'S', 'S', 'S', 'M', 'M'];
    // deterministic shuffle by seed
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(hash(seedI * 31 + i) * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    const slide = easeOut(seg(p, 0.05, 0.4));
    const y = h / 2 - 12;
    let flavour = 0;
    const flavourCols = [P.known, P.good, P.warn];
    const counts = [0, 0, 0];
    items.forEach(it => { if (it === 'M') flavour++; else counts[Math.min(flavour, 2)]++; });
    flavour = 0;
    items.forEach((it, i) => {
      const x = 30 + i * ((w - 60) / 6) * slide + (1 - slide) * (w / 2 - 30);
      if (it === 'S') {
        ctx.fillStyle = flavourCols[Math.min(flavour, 2)];
        ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill();
      } else {
        flavour++;
        ctx.fillStyle = P.faint;
        roundRect(ctx, x - 3, y - 16, 6, 32, 3); ctx.fill();
      }
    });
    if (p > 0.5) {
      ctx.font = FB(11); ctx.textAlign = 'center';
      ctx.fillStyle = P.text;
      ctx.fillText(`flavours:  ${counts[0]} · ${counts[1]} · ${counts[2]}`, w / 2, y + 38);
    }
    ctx.fillStyle = P.muted; ctx.font = F(11); ctx.textAlign = 'center';
    ctx.fillText('scoops & dividers: every arrangement = one order — C(n−1+r, r)', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimGrid66({ mode = 'sum' }: { mode?: 'sum' | 'six' }) {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const p = cycle(t, mode === 'sum' ? 11 : 6);
    const cell = Math.min(19, (h - 46) / 6);
    const gx = w / 2 - cell * 3, gy = 12;
    let target = 2 + Math.floor(p * 11);
    let count = 0;
    for (let r = 1; r <= 6; r++) for (let b = 1; b <= 6; b++) {
      const hit = mode === 'sum' ? r + b === target : (r === 6 || b === 6);
      if (hit) count++;
      const x = gx + (b - 1) * cell, y = gy + (r - 1) * cell;
      ctx.fillStyle = hit ? withAlpha(mode === 'sum' ? P.good : P.warn, 0.85) : P.bg2;
      roundRect(ctx, x + 1, y + 1, cell - 2, cell - 2, 3); ctx.fill();
    }
    ctx.font = FB(12); ctx.textAlign = 'center'; ctx.fillStyle = P.text;
    ctx.fillText(mode === 'sum' ? `P(total = ${target}) = ${count}/36` : `P(at least one six) = ${count}/36`, w / 2, h - 8);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}

export function AnimWalkPath() {
  const ref = useAnimCanvas((ctx, t, w, h, P) => {
    const period = 9;
    const p = cycle(t, period);
    const seedI = Math.floor(t / period);
    const N = 60;
    const midY = h / 2 - 6;
    const stepX = (w - 40) / N;
    ctx.strokeStyle = P.line; ctx.beginPath(); ctx.moveTo(20, midY); ctx.lineTo(w - 20, midY); ctx.stroke();
    let y = 0;
    const shown = Math.floor(p * N);
    ctx.strokeStyle = P.known; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(20, midY);
    let lastX = 20, lastY = midY;
    for (let i = 1; i <= shown; i++) {
      y += hash(seedI * 97 + i) < 0.5 ? 1 : -1;
      lastX = 20 + i * stepX; lastY = midY - y * 7;
      ctx.lineTo(lastX, lastY);
      if (y === 0) { ctx.save(); ctx.fillStyle = withAlpha(P.good, 0.9); ctx.fillRect(lastX - 1.5, midY - 4, 3, 8); ctx.restore(); }
    }
    ctx.stroke();
    ctx.fillStyle = P.bad; ctx.beginPath(); ctx.arc(lastX, lastY, 4.5, 0, 7); ctx.fill();
    ctx.fillStyle = P.muted; ctx.font = F(11); ctx.textAlign = 'center';
    ctx.fillText('green ticks = back at zero — needs equal ups and downs', w / 2, h - 7);
    ctx.textAlign = 'left';
  });
  return <canvas ref={ref} className="anim-canvas" />;
}
