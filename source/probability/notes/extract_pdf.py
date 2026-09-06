"""Extract per-page text from the Bath Probability & Statistics 1A lecture notes."""
import json
from pypdf import PdfReader

SRC = r"C:\Users\Matthieu\bath-smartstudy\public\course.pdf"
OUT = r"C:\Users\Matthieu\bath-smartstudy\notes\pdf_text.md"
META = r"C:\Users\Matthieu\bath-smartstudy\notes\pdf_meta.json"

reader = PdfReader(SRC)
n = len(reader.pages)
meta = {"pages": n, "metadata": {k: str(v) for k, v in (reader.metadata or {}).items()}}

chunks = []
for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ""
    txt = txt.strip()
    chunks.append(f"\n\n===== PAGE {i+1} =====\n{txt}")

with open(OUT, "w", encoding="utf-8") as f:
    f.write("".join(chunks))

with open(META, "w", encoding="utf-8") as f:
    json.dump(meta, f, indent=2)

total = sum(len(c) for c in chunks)
print(f"pages={n} total_chars={total} avg={total//max(n,1)}")
