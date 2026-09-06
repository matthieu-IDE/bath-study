import { memo, useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/* Lightweight markdown+TeX renderer.
   Supports: $inline$, $$display$$, **bold**, *italic*, `code`, ==highlight==, __underline__,
   > quote, line breaks. Auto-styles "Definition 1.4"-style references, and can auto-highlight
   a concept's key terms via the `emphasize` prop (first occurrence each). */

function texToHtml(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      trust: ctx => ctx.command === '\\htmlClass',
      strict: false,
    });
  } catch {
    return `<code>${escapeHtml(tex)}</code>`;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const M0 = '', M1 = '', U0 = '', U1 = '';

function inlineMd(s: string): string {
  let out = escapeHtml(s);
  out = out.replace(/==([^=]+)==/g, `${M0}$1${M1}`);
  out = out.replace(/__([^_]+)__/g, `${U0}$1${U1}`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // notes references become styled chips: Definition 3.1, Theorem 4.5, …
  out = out.replace(/\b(Definitions?|Theorems?|Lemmas?|Corollar(?:y|ies)|Examples?|Axioms?|Equations?)\s+(\d+(?:\.\d+)?|[A-Z]\d+)\b/g,
    '<span class="defref">$1 $2</span>');
  out = out.split(M0).join('<mark>').split(M1).join('</mark>');
  out = out.split(U0).join('<span class="uline">').split(U1).join('</span>');
  return out;
}

/** Wrap the first occurrence of each keyword (≥4 chars) in ==…== before markdown runs. */
function autoEmphasize(seg: string, keywords: string[], used: Set<string>): string {
  let out = seg;
  for (const kw of keywords) {
    if (kw.length < 4 || used.has(kw)) continue;
    const re = new RegExp(`(^|[^\\w=])(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\w=])`, 'i');
    if (re.test(out)) {
      out = out.replace(re, (_, pre, word) => `${pre}==${word}==`);
      used.add(kw);
    }
  }
  return out;
}

export function renderRich(src: string, emphasize?: string[]): string {
  const parts: string[] = [];
  const used = new Set<string>();
  const kws = (emphasize ?? []).filter(k => k.length >= 4).sort((a, b) => b.length - a.length);
  const dispSplit = src.split(/\$\$([\s\S]+?)\$\$/g);
  for (let i = 0; i < dispSplit.length; i++) {
    if (i % 2 === 1) {
      parts.push(texToHtml(dispSplit[i], true));
      continue;
    }
    const seg = dispSplit[i];
    const inl = seg.split(/\$([^$]+?)\$/g);
    let html = '';
    for (let j = 0; j < inl.length; j++) {
      if (j % 2 === 1) html += texToHtml(inl[j], false);
      else {
        const withEmph = kws.length ? autoEmphasize(inl[j], kws, used) : inl[j];
        const lines = withEmph.split('\n');
        html += lines.map((ln, idx) => {
          const t = ln.startsWith('> ') ? `<blockquote style="margin:6px 0;padding:6px 12px;border-left:3px solid var(--cond);background:var(--cond-soft);border-radius:6px;">${inlineMd(ln.slice(2))}</blockquote>` : inlineMd(ln);
          return idx < lines.length - 1 && !ln.startsWith('> ') ? t + '<br/>' : t;
        }).join('');
      }
    }
    parts.push(html);
  }
  return parts.join('');
}

export const Rich = memo(function Rich({ text, className, emphasize }: { text: string; className?: string; emphasize?: string[] }) {
  const html = useMemo(() => renderRich(text, emphasize), [text, emphasize]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
});

export const Tex = memo(function Tex({ tex, display = false }: { tex: string; display?: boolean }) {
  const html = useMemo(() => texToHtml(tex, display), [tex, display]);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
});
