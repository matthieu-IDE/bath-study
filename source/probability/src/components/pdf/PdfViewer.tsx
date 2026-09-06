import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useApp } from '../../store';
import { conceptsOnPage, matchConcepts, pageInfo } from '../../data/course';
import { ERROR_MAP } from '../../data/errors';
import { PAGE_NOTES } from '../../data/pageNotes';
import { TOC } from '../../data/toc';
import { resolveNotes, storeNotes } from '../../lib/notesPdf';
import { Icon } from '../Icon';
import { FormulaExplorer } from '../FormulaExplorer';
import { Rich } from '../Math';
import { sfx } from '../../lib/sound';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

type PDFDoc = pdfjsLib.PDFDocumentProxy;
type Mode = 'select' | 'lens' | 'draw';

interface SelPop {
  x: number; y: number; text: string;
  rects: { x: number; y: number; w: number; h: number }[];
}
interface ViewT { z: number; x: number; y: number }

const MAX_Z = 7;
const LENS_SIZE = 190;

export function PdfViewer() {
  const { pdfPage, setPdfPage, annotations, addAnnotation, removeAnnotation, focusConcept, conceptStates, showToast, spotNote } = useApp();
  const [doc, setDoc] = useState<PDFDoc | null>(null);
  const [fit, setFit] = useState({ w: 620, h: 850 });
  const [view, setView] = useState<ViewT>({ z: 1, x: 0, y: 0 });
  const [anim, setAnim] = useState(false);
  const [mode, setMode] = useState<Mode>('select');
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [rendering, setRendering] = useState(false);
  const [selPop, setSelPop] = useState<SelPop | null>(null);
  const [noteDraft, setNoteDraft] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [searchHits, setSearchHits] = useState<number[] | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [needNotes, setNeedNotes] = useState(false);
  const [turn, setTurn] = useState<{ src: string; dir: 1 | -1; key: number } | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const lensCanvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<pdfjsLib.PDFPageProxy | null>(null);
  const renderTask = useRef<pdfjsLib.RenderTask | null>(null);
  const pageTexts = useRef<Map<number, string>>(new Map());
  const fitRef = useRef(fit);
  const viewRef = useRef(view);
  const hiRes = useRef(false);
  const panState = useRef<{ startX: number; startY: number; ox: number; oy: number; moved: boolean } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStart = useRef<{ dist: number; view: ViewT; cx: number; cy: number } | null>(null);
  const currentStroke = useRef<{ x: number; y: number }[] | null>(null);
  const prevPageRef = useRef<number | null>(null);
  const turnKey = useRef(0);

  fitRef.current = fit;
  viewRef.current = view;

  const openBuffer = useCallback(async (buf: ArrayBuffer) => {
    // pdf.js takes ownership of the buffer, so hand it a copy we can re-open later
    const d = await pdfjsLib.getDocument({ data: buf.slice(0) }).promise;
    setDoc(d);
    setNeedNotes(false);
  }, []);

  useEffect(() => {
    let dead = false;
    (async () => {
      const buf = await resolveNotes();
      if (dead) return;
      if (!buf) { setNeedNotes(true); return; }
      try { await openBuffer(buf); } catch (e) { console.error('pdf load', e); if (!dead) setNeedNotes(true); }
    })();
    return () => { dead = true; };
  }, [openBuffer]);

  const pickNotes = async (file: File) => {
    try {
      const buf = await storeNotes(file);
      await openBuffer(buf);
      showToast('Notes loaded — saved on this device');
    } catch (e) {
      console.error('notes import failed', e);
      showToast('That file could not be read as a PDF');
    }
  };

  const pageAnnots = useMemo(() => annotations.filter(a => a.page === pdfPage), [annotations, pdfPage]);

  const clampView = useCallback((v: ViewT): ViewT => {
    const vp = viewportRef.current;
    if (!vp) return v;
    const vw = vp.clientWidth, vh = vp.clientHeight;
    const f = fitRef.current;
    const pw = f.w * v.z, ph = f.h * v.z;
    const x = pw <= vw ? (vw - pw) / 2 : Math.min(0, Math.max(vw - pw, v.x));
    const y = ph <= vh ? (vh - ph) / 2 : Math.min(0, Math.max(vh - ph, v.y));
    return { z: v.z, x, y };
  }, []);

  const zoomAt = useCallback((cx: number, cy: number, newZ: number, animate = false) => {
    const v = viewRef.current;
    const z = Math.min(MAX_Z, Math.max(1, newZ));
    const nx = cx - (cx - v.x) * (z / v.z);
    const ny = cy - (cy - v.y) * (z / v.z);
    if (animate) { setAnim(true); setTimeout(() => setAnim(false), 300); }
    setView(clampView({ z, x: nx, y: ny }));
  }, [clampView]);

  /* ---------- page render ---------- */
  const paintCanvas = useCallback(async (page: pdfjsLib.PDFPageProxy, fitScale: number, quality: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(fitScale * quality, 3600 / base.width);
    const vp = page.getViewport({ scale });
    canvas.width = vp.width;
    canvas.height = vp.height;
    renderTask.current?.cancel();
    const task = page.render({ canvasContext: canvas.getContext('2d')!, viewport: vp });
    renderTask.current = task;
    try { await task.promise; } catch { /* superseded */ }
  }, []);

  useEffect(() => {
    if (!doc) return;
    let dead = false;
    // snapshot the outgoing page so it can peel away over the incoming one
    const prev = prevPageRef.current;
    prevPageRef.current = pdfPage;
    const cv = canvasRef.current;
    if (prev !== null && prev !== pdfPage && cv && cv.width > 0) {
      try {
        const snap = document.createElement('canvas');
        const s = Math.min(1, 1100 / cv.width);
        snap.width = Math.round(cv.width * s);
        snap.height = Math.round(cv.height * s);
        snap.getContext('2d')!.drawImage(cv, 0, 0, snap.width, snap.height);
        turnKey.current += 1;
        setTurn({ src: snap.toDataURL('image/jpeg', 0.82), dir: pdfPage > prev ? 1 : -1, key: turnKey.current });
        sfx.page();
      } catch { /* snapshot failed — skip the flourish */ }
    }
    setRendering(true);
    hiRes.current = false;
    (async () => {
      try {
        const page = await doc.getPage(pdfPage);
        if (dead) return;
        pageRef.current = page;
        const base = page.getViewport({ scale: 1 });
        const vp = viewportRef.current;
        const vw = (vp?.clientWidth ?? 700) - 14;
        const vh = (vp?.clientHeight ?? 900) - 12;
        const fitScale = Math.max(0.4, Math.min(vw / base.width, vh / base.height));
        const f = { w: base.width * fitScale, h: base.height * fitScale };
        setFit(f);
        fitRef.current = f;
        setView(clampView({ z: 1, x: 0, y: 0 }));

        await paintCanvas(page, fitScale, 2.2);
        if (dead) return;

        // text layer at fit scale (CSS-aligned; the wrapper transform scales it)
        const tl = textRef.current;
        if (tl) {
          tl.innerHTML = '';
          const tvp = page.getViewport({ scale: fitScale });
          tl.style.setProperty('--scale-factor', String(tvp.scale));
          try {
            const TextLayerCtor = (pdfjsLib as any).TextLayer;
            const textLayer = new TextLayerCtor({ textContentSource: page.streamTextContent(), container: tl, viewport: tvp });
            await textLayer.render();
          } catch (err) {
            console.warn('TextLayer failed', err);
          }
        }
        drawStored();
      } catch (err) {
        console.error('pdf render failed', err);
      } finally {
        if (!dead) setRendering(false);
      }
    })();
    return () => { dead = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, pdfPage]);

  // safety: clear the turn overlay even if animationend never fires (hidden tab, reduced motion)
  useEffect(() => {
    if (!turn) return;
    const t = setTimeout(() => setTurn(cur => (cur && cur.key === turn.key ? null : cur)), 900);
    return () => clearTimeout(t);
  }, [turn]);

  // sharper re-render once zoomed in
  useEffect(() => {
    if (view.z > 2.3 && !hiRes.current && pageRef.current && !rendering) {
      hiRes.current = true;
      const base = pageRef.current.getViewport({ scale: 1 });
      void paintCanvas(pageRef.current, fit.w / base.width, 5);
    }
  }, [view.z, rendering, fit.w, paintCanvas]);

  // refit on container resize
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ro = new ResizeObserver(() => {
      const page = pageRef.current;
      if (!page) return;
      const base = page.getViewport({ scale: 1 });
      const fitScale = Math.max(0.4, Math.min((vp.clientWidth - 14) / base.width, (vp.clientHeight - 12) / base.height));
      const f = { w: base.width * fitScale, h: base.height * fitScale };
      setFit(f);
      fitRef.current = f;
      setView(v => clampView(v));
    });
    ro.observe(vp);
    return () => ro.disconnect();
  }, [clampView]);

  /* ---------- draw layer ---------- */
  const drawStored = useCallback(() => {
    const c = drawRef.current;
    if (!c) return;
    c.width = Math.round(fitRef.current.w);
    c.height = Math.round(fitRef.current.h);
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.strokeStyle = 'rgba(176, 104, 15, 0.85)';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (const a of pageAnnots.filter(x => x.kind === 'draw')) {
      for (const p of a.path ?? []) {
        if (p.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(p[0].x * c.width, p[0].y * c.height);
        for (const pt of p.slice(1)) ctx.lineTo(pt.x * c.width, pt.y * c.height);
        ctx.stroke();
      }
    }
  }, [pageAnnots]);

  useEffect(() => { drawStored(); }, [drawStored, fit]);

  /* ---------- wheel zoom (native, non-passive) ---------- */
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const factor = Math.exp(-e.deltaY * 0.0016);
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, viewRef.current.z * factor);
    };
    vp.addEventListener('wheel', onWheel, { passive: false });
    return () => vp.removeEventListener('wheel', onWheel);
  }, [zoomAt]);

  /* ---------- pointer: pan + pinch + lens + draw ---------- */
  const vpPoint = (e: { clientX: number; clientY: number }) => {
    const r = viewportRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const pagePoint = (e: { clientX: number; clientY: number }) => {
    const r = wrapRef.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (showSummary) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mode === 'draw' && e.button === 0) {
      currentStroke.current = [pagePoint(e)];
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
      return;
    }
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const r = viewportRef.current!.getBoundingClientRect();
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        view: viewRef.current,
        cx: (a.x + b.x) / 2 - r.left,
        cy: (a.y + b.y) / 2 - r.top,
      };
      panState.current = null;
      return;
    }
    const target = e.target as Element;
    const onText = !!target.closest('.textLayer') && mode === 'select';
    const onUi = !!target.closest('.note-pin, .hl-rect, .sbar');
    // right button (or middle) pans from anywhere — even over text; left pans from empty areas only
    const rightPan = e.button === 2 || e.button === 1;
    if (!onUi && (rightPan || (e.button === 0 && !onText))) {
      panState.current = { startX: e.clientX, startY: e.clientY, ox: viewRef.current.x, oy: viewRef.current.y, moved: false };
      (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (mode === 'lens') setLensPos(vpPoint(e));
    if (mode === 'draw' && currentStroke.current) {
      const p = pagePoint(e);
      currentStroke.current.push(p);
      const c = drawRef.current!;
      const ctx = c.getContext('2d')!;
      const pts = currentStroke.current;
      const a = pts[pts.length - 2] ?? p;
      ctx.strokeStyle = 'rgba(176, 104, 15, 0.85)';
      ctx.lineWidth = 2; ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(a.x * c.width, a.y * c.height);
      ctx.lineTo(p.x * c.width, p.y * c.height);
      ctx.stroke();
      return;
    }
    if (pinchStart.current && pointers.current.size >= 2) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const ps = pinchStart.current;
      zoomAt(ps.cx, ps.cy, ps.view.z * (dist / ps.dist));
      return;
    }
    if (panState.current) {
      const dx = e.clientX - panState.current.startX;
      const dy = e.clientY - panState.current.startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) panState.current.moved = true;
      setView(clampView({ z: viewRef.current.z, x: panState.current.ox + dx, y: panState.current.oy + dy }));
    }
  };

  const onPointerUp = async (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (mode === 'draw' && currentStroke.current) {
      const stroke = currentStroke.current;
      currentStroke.current = null;
      if (stroke.length > 2) await addAnnotation({ page: pdfPage, kind: 'draw', path: [stroke] });
      return;
    }
    panState.current = null;
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    if (mode !== 'select' && mode !== 'lens') return;
    e.preventDefault();
    window.getSelection()?.removeAllRanges();
    const p = vpPoint(e);
    const z = viewRef.current.z;
    if (z < 2.2) zoomAt(p.x, p.y, 2.6, true);
    else if (z < 4.2) zoomAt(p.x, p.y, 5, true);
    else { setAnim(true); setTimeout(() => setAnim(false), 300); setView(clampView({ z: 1, x: 0, y: 0 })); }
    sfx.click();
  };

  /* ---------- lens painting ---------- */
  useEffect(() => {
    if (mode !== 'lens' || !lensPos) return;
    const lc = lensCanvasRef.current, main = canvasRef.current;
    if (!lc || !main || main.width === 0) return;
    const v = viewRef.current, f = fitRef.current;
    const px = (lensPos.x - v.x) / v.z;
    const py = (lensPos.y - v.y) / v.z;
    if (px < 0 || py < 0 || px > f.w || py > f.h) { lc.getContext('2d')!.clearRect(0, 0, lc.width, lc.height); return; }
    const dpr = 2;
    lc.width = LENS_SIZE * dpr; lc.height = LENS_SIZE * dpr;
    lc.style.width = `${LENS_SIZE}px`; lc.style.height = `${LENS_SIZE}px`;
    const k = main.width / f.w;                       // canvas px per fit-CSS px
    const S = Math.min(Math.max(v.z * 2.2, 2.4), 9);  // magnification vs fit
    const srcW = (LENS_SIZE / S) * k;
    const ctx = lc.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, lc.width, lc.height);
    ctx.drawImage(main, px * k - srcW / 2, py * k - srcW / 2, srcW, srcW, 0, 0, lc.width, lc.height);
  }, [lensPos, mode, view]);

  /* ---------- selection popover ---------- */
  const onMouseUp = () => {
    if (mode !== 'select') return;
    if (panState.current?.moved) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !wrapRef.current) { setSelPop(null); return; }
    const text = sel.toString().trim();
    if (text.length < 2) { setSelPop(null); return; }
    const range = sel.getRangeAt(0);
    const rects = Array.from(range.getClientRects());
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const rel = rects
      .filter(r => r.width > 1 && r.height > 1)
      .map(r => ({
        x: (r.left - wrapRect.left) / wrapRect.width,
        y: (r.top - wrapRect.top) / wrapRect.height,
        w: r.width / wrapRect.width,
        h: r.height / wrapRect.height,
      }));
    const last = rects[rects.length - 1];
    if (!last) return;
    setSelPop({ x: Math.min(last.right, window.innerWidth - 280), y: last.bottom + 8, text, rects: rel });
  };

  const doHighlight = async (color: string) => {
    if (!selPop) return;
    await addAnnotation({ page: pdfPage, kind: 'highlight', rects: selPop.rects, color });
    setSelPop(null);
    window.getSelection()?.removeAllRanges();
    sfx.click();
  };
  const doExplain = () => {
    if (!selPop) return;
    const matches = matchConcepts(selPop.text, pdfPage);
    const target = matches[0] ?? conceptsOnPage(pdfPage)[0];
    if (target) focusConcept(target.id);
    // light up the best-matching line of the page decode on the right
    const notes = PAGE_NOTES[pdfPage] ?? [];
    let best = -1, bestScore = 1.1;
    if (notes.length) {
      const sel = selPop.text.toLowerCase();
      const tokens = [...new Set(sel.split(/[^a-z0-9.]+/).filter(w => w.length > 3))].slice(0, 40);
      notes.forEach((n, i) => {
        let s = 0;
        const ref = n.ref.toLowerCase();
        const num = ref.match(/\d+(?:\.\d+)?/)?.[0];
        const kind = ref.split(/[\s(]/)[0].replace(/s$/, '');
        if (num && sel.includes(num) && sel.includes(kind.slice(0, 5))) s += 6;
        const body = (n.what + ' ' + (n.tex ?? '')).toLowerCase();
        for (const t of tokens) if (body.includes(t)) s += t.length >= 6 ? 0.8 : 0.4;
        if (s > bestScore) { bestScore = s; best = i; }
      });
    }
    if (best >= 0) {
      spotNote(pdfPage, best);
      showToast(`${notes[best].ref} — decoded on the right`);
    } else if (target) showToast(`Teacher: ${target.title}`);
    else showToast('No match — select a key phrase');
    setSelPop(null);
    window.getSelection()?.removeAllRanges();
  };
  const saveNote = async () => {
    if (!selPop || noteDraft === null) return;
    await addAnnotation({ page: pdfPage, kind: 'note', rects: selPop.rects, text: noteDraft });
    setNoteDraft(null); setSelPop(null);
    window.getSelection()?.removeAllRanges();
    sfx.correct();
  };

  /* ---------- search ---------- */
  const runSearch = async () => {
    if (!doc || !search.trim()) { setSearchHits(null); return; }
    const q = search.trim().toLowerCase();
    const hits: number[] = [];
    for (let p = 1; p <= doc.numPages; p++) {
      let txt = pageTexts.current.get(p);
      if (txt === undefined) {
        const page = await doc.getPage(p);
        const tc = await page.getTextContent();
        txt = (tc.items as any[]).map(i => i.str).join(' ').toLowerCase();
        pageTexts.current.set(p, txt);
      }
      if (txt.includes(q)) hits.push(p);
      if (hits.length >= 40) break;
    }
    setSearchHits(hits);
    if (hits.length) setPdfPage(hits[0]);
    else showToast('No matches');
  };

  const isBookmarked = pageAnnots.some(a => a.kind === 'bookmark');
  const isConfusing = pageAnnots.some(a => a.kind === 'confusing');

  const togglePageFlag = async (kind: 'bookmark' | 'confusing') => {
    const existing = pageAnnots.find(a => a.kind === kind);
    if (existing) await removeAnnotation(existing.id);
    else await addAnnotation({ page: pdfPage, kind });
    sfx.click();
  };

  const resetFit = () => { setAnim(true); setTimeout(() => setAnim(false), 300); setView(clampView({ z: 1, x: 0, y: 0 })); };
  const zoomButtons = (dir: 1 | -1) => {
    const vp = viewportRef.current!;
    zoomAt(vp.clientWidth / 2, vp.clientHeight / 2, viewRef.current.z * (dir === 1 ? 1.45 : 1 / 1.45), true);
  };

  return (
    <div className="pdf-pane">
      <div className="pdf-main">
      <div
        ref={viewportRef}
        className={`pdf-viewport ${mode === 'lens' ? 'lens-mode' : ''} ${panState.current ? 'panning' : view.z > 1.01 && mode === 'select' ? 'can-pan' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => { setLensPos(null); pointers.current.clear(); pinchStart.current = null; }}
        onDoubleClick={onDoubleClick}
        onMouseUp={onMouseUp}
        onContextMenu={e => e.preventDefault()}
      >
        <div ref={wrapRef} className={`pdf-page-wrap ${anim ? 'anim' : ''}`}
          style={{ width: fit.w, height: fit.h, transform: `translate(${view.x}px, ${view.y}px) scale(${view.z})` }}>
          <canvas ref={canvasRef} className="pdf-canvas" />
          <div ref={textRef} className="textLayer" style={{ width: fit.w, height: fit.h }} />
          <div className="annot-layer">
            {pageAnnots.filter(a => a.kind === 'highlight').flatMap(a =>
              (a.rects ?? []).map((r, i) => (
                <div key={`${a.id}-${i}`} className="hl-rect" title="Double-click to remove"
                  onDoubleClick={ev => { ev.stopPropagation(); void removeAnnotation(a.id); }}
                  style={{
                    left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%`,
                    background: a.color ?? 'var(--warn)', pointerEvents: 'auto',
                  }} />
              )),
            )}
            {pageAnnots.filter(a => a.kind === 'note').map(a => {
              const r = a.rects?.[0];
              if (!r) return null;
              return (
                <div key={a.id} className="note-pin" title={a.text}
                  style={{ left: `${(r.x + r.w) * 100}%`, top: `${r.y * 100}%`, transform: `translate(-50%, -50%) scale(${1 / view.z})` }}
                  onDoubleClick={ev => { ev.stopPropagation(); void removeAnnotation(a.id); }}
                  onClick={() => showToast(a.text ?? '')}><Icon name="edit" size={11} /></div>
              );
            })}
          </div>
          <canvas ref={drawRef} className={`annot-layer ${mode === 'draw' ? 'drawing' : ''}`}
            style={{ width: fit.w, height: fit.h }} />
          {turn && (
            <div key={turn.key} className={`page-turn ${turn.dir === 1 ? 'fwd' : 'back'}`}>
              <div className="pt-clip" onAnimationEnd={() => setTurn(null)}>
                <img src={turn.src} alt="" draggable={false} />
              </div>
            </div>
          )}
        </div>

        {mode === 'lens' && lensPos && (
          <div className="lens" style={{ left: lensPos.x, top: lensPos.y }}>
            <canvas ref={lensCanvasRef} />
          </div>
        )}

        {view.z > 1.02 && <ScrollBars view={view} fit={fit} viewportRef={viewportRef} apply={v => setView(clampView(v))} />}
        {rendering && !needNotes && <div className="tiny faint" style={{ position: 'absolute', top: 8, left: 12 }}>rendering…</div>}
        {needNotes && (
          <div className="notes-gate">
            <div className="notes-card">
              <Icon name="doc" size={22} style={{ color: 'var(--muted)' }} />
              <h3 style={{ fontSize: 17, marginTop: 10 }}>Notes could not be loaded</h3>
              <p className="small muted" style={{ marginTop: 6, lineHeight: 1.65 }}>
                The lecture notes that ship with this site did not load &mdash; you may be offline mid-download.
                Reload the page, or pick your own copy of the PDF and it will be kept in this browser.
              </p>
              <label className="btn primary" style={{ marginTop: 14, display: 'inline-flex', cursor: 'pointer' }}>
                Choose PDF
                <input type="file" accept="application/pdf,.pdf" style={{ display: 'none' }}
                  onChange={e => { const f = e.target.files?.[0]; if (f) void pickNotes(f); }} />
              </label>
              <div className="tiny faint" style={{ marginTop: 12 }}>
                Nothing is uploaded anywhere &mdash; the file never leaves your device.
              </div>
            </div>
          </div>
        )}
      </div>
      <PageStrip />
      </div>

      {/* vertical control rail on the pdf/tutor border */}
      <div className="pdf-rail">
        <div className="rail-group">
          <button className={`rail-btn ${tocOpen ? 'on' : ''}`} data-tip="Contents" aria-label="Contents" onClick={() => { setTocOpen(v => !v); setSearchOpen(false); }}><Icon name="toc" size={14} /></button>
          <button className="rail-btn" data-tip="Previous page" aria-label="Previous page" onClick={() => setPdfPage(Math.max(1, pdfPage - 1))} disabled={pdfPage <= 1}><Icon name="up" size={15} /></button>
          <input className="rail-num" type="number" value={pdfPage} min={1} max={98} aria-label="Page number"
            onChange={e => setPdfPage(Math.min(98, Math.max(1, +e.target.value || 1)))} />
          <button className="rail-btn" data-tip="Next page" aria-label="Next page" onClick={() => setPdfPage(Math.min(98, pdfPage + 1))} disabled={pdfPage >= 98}><Icon name="down" size={15} /></button>
        </div>
        <div className="rail-group">
          <button className="rail-btn" data-tip="Zoom in" aria-label="Zoom in" onClick={() => zoomButtons(1)}><Icon name="plus" size={14} /></button>
          <span className="rail-cap">{Math.round(view.z * 100)}%</span>
          <button className="rail-btn" data-tip="Zoom out" aria-label="Zoom out" onClick={() => zoomButtons(-1)}><Icon name="minus" size={14} /></button>
          <button className="rail-btn" data-tip="Fit whole page" aria-label="Fit whole page" onClick={resetFit}><Icon name="fit" size={14} /></button>
        </div>
        <div className="rail-group">
          <button className={`rail-btn ${mode === 'select' ? 'on' : ''}`} data-tip="Select & pan" aria-label="Select & pan" onClick={() => { setMode('select'); setLensPos(null); }}><Icon name="cursor" size={14} /></button>
          <button className={`rail-btn ${mode === 'lens' ? 'on' : ''}`} data-tip="Magnifier lens" aria-label="Magnifier lens" onClick={() => setMode('lens')}><Icon name="magnify" size={14} /></button>
          <button className={`rail-btn ${mode === 'draw' ? 'on' : ''}`} data-tip="Draw on the page" aria-label="Draw on the page" onClick={() => { setMode('draw'); setLensPos(null); }}><Icon name="pen" size={14} /></button>
        </div>
        <div className="rail-group">
          <button className={`rail-btn ${isBookmarked ? 'on' : ''}`} data-tip="Bookmark page" aria-label="Bookmark page" onClick={() => togglePageFlag('bookmark')}><Icon name="bookmark" size={14} /></button>
          <button className={`rail-btn ${isConfusing ? 'on' : ''}`} data-tip="Mark confusing" aria-label="Mark confusing" onClick={() => togglePageFlag('confusing')}><Icon name="flag" size={14} /></button>
          <button className="rail-btn" data-tip="Page summary" aria-label="Page summary" onClick={() => setShowSummary(true)}><Icon name="doc" size={14} /></button>
          <button className={`rail-btn ${searchOpen ? 'on' : ''}`} data-tip="Search the notes" aria-label="Search the notes" onClick={() => { setSearchOpen(v => !v); setTocOpen(false); }}><Icon name="search" size={14} /></button>
        </div>
      </div>

      {tocOpen && <TocPop pdfPage={pdfPage} go={setPdfPage} onClose={() => setTocOpen(false)} />}

      {searchOpen && (
        <div className="rail-pop pop">
          <input autoFocus type="text" placeholder="Search all 98 pages" value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') void runSearch(); if (e.key === 'Escape') setSearchOpen(false); }} />
          {searchHits && (
            <div className="row" style={{ gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
              <span className="tiny faint">{searchHits.length} page{searchHits.length === 1 ? '' : 's'}</span>
              {searchHits.slice(0, 8).map(p => (
                <button key={p} className="chip clickable" onClick={() => setPdfPage(p)}>{p}</button>
              ))}
              <button className="btn sm ghost" onClick={() => { setSearchHits(null); setSearch(''); }}>✕</button>
            </div>
          )}
        </div>
      )}

      {selPop && (
        <div className="sel-popover pop" style={{ left: Math.max(8, selPop.x - 220), top: Math.min(selPop.y, window.innerHeight - 120) }}>
          {noteDraft === null ? (
            <>
              <button className="btn sm primary" onClick={doExplain}>Explain</button>
              <button className="swatch" title="Highlight" style={{ background: 'var(--warn)' }} onClick={() => doHighlight('var(--warn)')} />
              <button className="swatch" title="Highlight green" style={{ background: 'var(--good)' }} onClick={() => doHighlight('var(--good)')} />
              <button className="btn sm" onClick={() => setNoteDraft('')}>Note</button>
              <button className="btn sm ghost" onClick={() => setSelPop(null)}>✕</button>
            </>
          ) : (
            <>
              <input autoFocus type="text" placeholder="Your note" value={noteDraft}
                onChange={e => setNoteDraft(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveNote()}
                style={{ width: 200 }} />
              <button className="btn sm primary" onClick={saveNote}>Save</button>
              <button className="btn sm ghost" onClick={() => setNoteDraft(null)}>✕</button>
            </>
          )}
        </div>
      )}

      {showSummary && <PageSummary page={pdfPage} onClose={() => setShowSummary(false)} />}
    </div>
  );
}

/* ---------- dynamic overlay scrollbars (shown when zoomed) ---------- */
function ScrollBars({ view, fit, viewportRef, apply }: {
  view: ViewT; fit: { w: number; h: number };
  viewportRef: React.RefObject<HTMLDivElement>;
  apply: (v: ViewT) => void;
}) {
  const drag = useRef<{ axis: 'x' | 'y'; start: number; ox: number; oy: number } | null>(null);
  const vp = viewportRef.current;
  if (!vp) return null;
  const vw = vp.clientWidth, vh = vp.clientHeight;
  const pw = fit.w * view.z, ph = fit.h * view.z;
  const fx = Math.min(1, vw / pw), fy = Math.min(1, vh / ph);
  const trackW = vw - 22, trackH = vh - 22;
  const thumbW = Math.max(34, trackW * fx);
  const thumbH = Math.max(34, trackH * fy);
  const posX = pw > vw ? (-view.x / (pw - vw)) * (trackW - thumbW) : 0;
  const posY = ph > vh ? (-view.y / (ph - vh)) * (trackH - thumbH) : 0;

  const onDown = (axis: 'x' | 'y') => (e: React.PointerEvent) => {
    e.stopPropagation();
    drag.current = { axis, start: axis === 'x' ? e.clientX : e.clientY, ox: view.x, oy: view.y };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    e.stopPropagation();
    const d = drag.current;
    if (d.axis === 'x') {
      const delta = (e.clientX - d.start) * ((pw - vw) / Math.max(1, trackW - thumbW));
      apply({ z: view.z, x: d.ox - delta, y: view.y });
    } else {
      const delta = (e.clientY - d.start) * ((ph - vh) / Math.max(1, trackH - thumbH));
      apply({ z: view.z, x: view.x, y: d.oy - delta });
    }
  };
  const onUp = () => { drag.current = null; };

  return (
    <>
      {fx < 1 && (
        <div className="sbar h" onPointerMove={onMove} onPointerUp={onUp}>
          <div className="thumb" style={{ left: posX, width: thumbW }} onPointerDown={onDown('x')} />
        </div>
      )}
      {fy < 1 && (
        <div className="sbar v" onPointerMove={onMove} onPointerUp={onUp}>
          <div className="thumb" style={{ top: posY, height: thumbH }} onPointerDown={onDown('y')} />
        </div>
      )}
    </>
  );
}

/* ---------- contents popover: the notes' structure, click to jump ---------- */
function TocPop({ pdfPage, go, onClose }: { pdfPage: number; go: (p: number) => void; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  // current position = the last outline item at or before this page
  let current = -1;
  for (const ch of TOC) for (const it of ch.items) if (it.page <= pdfPage) current = it.page;
  return (
    <div className="rail-pop toc-pop pop">
      {TOC.map(ch => (
        <div key={ch.page} className="toc-ch">
          <button className="toc-h" onClick={() => go(ch.page)}>
            {ch.label}
            {!ch.examinable && ch.page > 6 && <span className="toc-flag">not in exam</span>}
          </button>
          {ch.items.map(it => (
            <button key={`${it.page}-${it.label}`} className={`toc-it ${it.page === current ? 'here' : ''}`} onClick={() => { go(it.page); sfx.click(); }}>
              {it.label}
              <span className="toc-pg">{it.page}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- 92-cell reading-progress strip under the page ---------- */
function PageStrip() {
  const { pdfPage, setPdfPage, noteTicks } = useApp();
  const cells: { p: number; done: number; total: number }[] = [];
  for (let p = 7; p <= 98; p++) {
    const notes = PAGE_NOTES[p] ?? [];
    let done = 0;
    for (let i = 0; i < notes.length; i++) if (noteTicks[`${p}:${i}`]) done++;
    cells.push({ p, done, total: notes.length });
  }
  return (
    <div className="page-strip" aria-label="Reading progress across the notes">
      {cells.map(c => {
        const frac = c.total ? c.done / c.total : 0;
        const info = pageInfo(c.p);
        return (
          <button key={c.p}
            className={`strip-cell ${c.p === pdfPage ? 'here' : frac === 1 ? 'full' : frac > 0 ? 'part' : ''}`}
            title={`p${c.p} · ${info.label} — ${c.done}/${c.total} decoded${info.examinable ? '' : ' · not examinable'}`}
            onClick={() => setPdfPage(c.p)} />
        );
      })}
    </div>
  );
}

/* ---------- page summary popup: key formulas, definitions, traps, notes ---------- */
function PageSummary({ page, onClose }: { page: number; onClose: () => void }) {
  const { annotations, focusConcept, nav } = useApp();
  const info = pageInfo(page);
  const concepts = conceptsOnPage(page);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const formulas = useMemo(() => {
    const near = concepts.flatMap(c => c.formulas.filter(f => f.pdfPage !== undefined && Math.abs(f.pdfPage - page) <= 1));
    if (near.length) return near.slice(0, 4);
    return concepts.flatMap(c => c.formulas.slice(0, 1)).slice(0, 3);
  }, [concepts, page]);

  const traps = useMemo(() => {
    const ids = [...new Set(concepts.flatMap(c => c.errorIds))].slice(0, 3);
    return ids.map(id => ERROR_MAP[id]).filter(Boolean);
  }, [concepts]);

  const notes = annotations.filter(a => a.page === page && a.kind === 'note' && a.text);
  const confusing = annotations.some(a => a.page === page && a.kind === 'confusing');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="kicker">Page {page} summary</div>
            <div className="bold" style={{ fontSize: 15 }}>{info.label}</div>
          </div>
          <div className="row">
            {!info.examinable && <span className="chip warn">not examinable</span>}
            <button className="btn sm ghost" onClick={onClose}><Icon name="x" size={15} /></button>
          </div>
        </div>
        <div className="modal-body">
          {concepts.length === 0 && <p className="small muted mt">Front matter — no mapped concepts on this page.</p>}

          {formulas.length > 0 && (
            <div className="section">
              <div className="section-title">Key formulas</div>
              {formulas.map(f => <FormulaExplorer key={f.id} formula={f} compact />)}
            </div>
          )}

          {concepts.length > 0 && (
            <div className="section">
              <div className="section-title">Definitions & methods</div>
              {concepts.map(c => (
                <div key={c.id} style={{ marginBottom: 14 }}>
                  <div className="row spread">
                    <span className="bold small">{c.title}</span>
                    <span className="row" style={{ gap: 4 }}>
                      <button className="btn sm ghost" onClick={() => { focusConcept(c.id); onClose(); }}>Teacher</button>
                      <button className="btn sm ghost" onClick={() => { onClose(); nav('practice', c.id); }}>Practise</button>
                    </span>
                  </div>
                  <div className="small muted" style={{ marginTop: 2 }}><Rich text={c.levels.uni} /></div>
                </div>
              ))}
            </div>
          )}

          {traps.length > 0 && (
            <div className="section">
              <div className="section-title">Watch out</div>
              {traps.map(t => (
                <div key={t.id} className="small" style={{ marginBottom: 7 }}>
                  <span className="bold">{t.label}.</span> <span className="muted">{t.fix}</span>
                </div>
              ))}
            </div>
          )}

          {(notes.length > 0 || confusing) && (
            <div className="section">
              <div className="section-title">Your notes</div>
              {confusing && <div className="notice warn small mb">You flagged this page as confusing.</div>}
              {notes.map(n => <div key={n.id} className="small" style={{ marginBottom: 5 }}>• {n.text}</div>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
