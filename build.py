#!/usr/bin/env python3
"""Bundle index.html + styles.css + data.js + app.js into one shareable file: dist/sd-ballot-guide-2026.html"""
from pathlib import Path
root = Path(__file__).parent
html = (root / "index.html").read_text()
html = html.replace('<link rel="stylesheet" href="styles.css">', "<style>\n" + (root / "styles.css").read_text() + "</style>")
for js in ("data.js", "app.js"):
    html = html.replace(f'<script src="{js}"></script>', "<script>\n" + (root / js).read_text() + "</script>")
out = root / "dist" / "sd-ballot-guide-2026.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html)
(out.parent / "index.html").write_text(html)  # same file, so the bare server URL works
print(f"wrote {out} ({len(html)//1024} KB)")
