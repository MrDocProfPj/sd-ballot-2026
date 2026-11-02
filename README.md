# SD Ballot '26

Quick-reference guide to the Nov 3, 2026 South Dakota general-election ballot for downtown Sioux Falls (District 15, Minnehaha County).

- Live site: GitHub Pages serves `index.html` from the repo root (no build step).
- Content lives in `data.js` (`pick:` / `take:` per race). After any edit, run `python3 build.py` before committing: it version-stamps the asset links so phones don't show a stale cached copy.
- `python3 build.py` also writes a single self-contained file to `dist/sd-ballot-guide-2026.html` for offline sharing.
- `research/` holds the sourced research notes behind the guide.
