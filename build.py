#!/usr/bin/env python3
"""Run after editing anything, before pushing.

1. Stamps index.html's links to styles.css / data.js / app.js with a content hash
   (?v=abc123) so phones don't keep showing a cached old copy after an update.
   GitHub Pages tells browsers to cache files for 10 minutes; a new ?v= forces a fresh fetch.
2. Bundles everything into one shareable file: dist/sd-ballot-guide-2026.html
"""
import hashlib
import re
from pathlib import Path

root = Path(__file__).parent
ASSETS = ("styles.css", "data.js", "app.js")

page = (root / "index.html").read_text()
for name in ASSETS:
    v = hashlib.sha1((root / name).read_bytes()).hexdigest()[:8]
    page = re.sub(rf'(["\']){re.escape(name)}(\?v=[0-9a-f]+)?\1', rf"\g<1>{name}?v={v}\g<1>", page)
(root / "index.html").write_text(page)

html = re.sub(r'<link rel="stylesheet" href="styles\.css[^"]*">', lambda m: "<style>\n" + (root / "styles.css").read_text() + "</style>", page)
for js in ("data.js", "app.js"):
    html = re.sub(rf'<script src="{re.escape(js)}[^"]*"></script>', lambda m, js=js: "<script>\n" + (root / js).read_text() + "</script>", html)
assert "styles.css" not in html.split("</head>")[0] or "<style>" in html, "stylesheet not inlined"

out = root / "dist" / "sd-ballot-guide-2026.html"
out.parent.mkdir(exist_ok=True)
out.write_text(html)
(out.parent / "index.html").write_text(html)  # same file, so the bare server URL works
print(f"stamped index.html and wrote {out} ({len(html)//1024} KB)")
