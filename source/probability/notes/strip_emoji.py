"""Strip emoji from src/**/*.ts(x). Keeps math/typographic glyphs (✓ ✗ ✕ → · × − ≥ Greek, ■ ▸ ▾)."""
import re, sys
from pathlib import Path

KEEP = {0x2713, 0x2715, 0x2717}  # ✓ ✕ ✗

def is_emoji(cp: int) -> bool:
    if cp in KEEP: return False
    return (
        0x1F000 <= cp <= 0x1FAFF or
        0x2600 <= cp <= 0x27BF or
        0x2B00 <= cp <= 0x2BFF or
        cp in (0xFE0F, 0x200D, 0x20E3) or
        0x1FB00 <= cp <= 0x1FBFF or
        cp in (0x231A, 0x231B) or
        0x23E9 <= cp <= 0x23FF or
        cp == 0x2139
    )

root = Path(r'C:\Users\Matthieu\bath-smartstudy\src')
changed = []
for f in sorted(root.rglob('*.ts*')):
    text = f.read_text(encoding='utf-8')
    out = ''.join(ch for ch in text if not is_emoji(ord(ch)))
    if out != text:
        # collapse doubled spaces created by removal (preserve leading indentation)
        lines = []
        for ln in out.split('\n'):
            m = re.match(r'^(\s*)(.*)$', ln)
            body = re.sub(r'  +', ' ', m.group(2))
            lines.append(m.group(1) + body)
        out = '\n'.join(lines)
        f.write_text(out, encoding='utf-8')
        changed.append(str(f.relative_to(root)))

print(f'{len(changed)} files changed:')
for c in changed: print('  -', c)
