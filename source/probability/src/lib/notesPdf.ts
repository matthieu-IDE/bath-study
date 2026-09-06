import { db } from '../db/db';

/* Where the lecture-notes PDF comes from.

   The notes ship with the site (public/course.pdf), shared with the authors' permission
   for this non-commercial study platform. If that copy is ever missing or unreadable,
   the reader can supply their own file instead — it is then kept in this browser
   (IndexedDB) and used from then on. A stored copy always wins over the bundled one. */

const KEY = 'course-notes';

export async function getStoredNotes(): Promise<ArrayBuffer | null> {
  try {
    const row = await db.paperBlobs.get(KEY);
    if (!row) return null;
    return await row.blob.arrayBuffer();
  } catch {
    return null;
  }
}

export async function storeNotes(file: File | Blob): Promise<ArrayBuffer> {
  const buf = await file.arrayBuffer();
  await db.paperBlobs.put({ id: KEY, blob: new Blob([buf], { type: 'application/pdf' }) });
  return buf;
}

export async function clearStoredNotes(): Promise<void> {
  await db.paperBlobs.delete(KEY);
}

/** The notes that ship with the site (public/course.pdf), shared with the authors' permission. */
export async function fetchBundledNotes(): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(new URL('course.pdf', document.baseURI).href);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    // a missing file often returns index.html with a 200 — check the PDF magic bytes
    const head = new Uint8Array(buf.slice(0, 5));
    const isPdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46;
    return isPdf ? buf : null;
  } catch {
    return null;
  }
}

/** Stored copy first, then a bundled one; null means "ask the user for the file". */
export async function resolveNotes(): Promise<ArrayBuffer | null> {
  return (await getStoredNotes()) ?? (await fetchBundledNotes());
}
