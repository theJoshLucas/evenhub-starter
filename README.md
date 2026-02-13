# Even Hub Starter Kit (Probe + Template)

This is a **no-build**, GitHub-Pages-friendly starter kit for Even Hub plugins.

It gives you:
- A button-driven **probe harness** to test each SDK method on real hardware
- An auto-updating **capabilities matrix** (what works, what returns, what fails)
- A clean base you can clone for future plugins

## Files
- `index.html` – UI + buttons + log output
- `app.js` – SDK loader + probes + matrix capture

## How to run (GitHub Pages)
1. Put these files in a folder in your repo (or root).
2. In GitHub: **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` (or whatever) and folder: `/ (root)` or `/docs` depending on where you placed files
5. Save.

After a minute, GitHub will show a Pages URL like:

`https://<username>.github.io/<repo>/path/to/index.html`

Use that URL as your Even Hub QR target.

## Why Pages URL matters
Raw GitHub URLs often:
- return `text/plain`
- don’t send the right headers for module loading
- get blocked or displayed as source

Pages serves proper HTML + JS over HTTPS with sane headers.

## Notes
- The SDK import tries:
  1) esm.sh
  2) unpkg (dist/index.js)
  If one fails, the other usually works.

- The matrix is in-memory. If you want persistence, we can add:
  - “Download matrix.json”
  - “Save matrix to Even local storage”
  - “POST matrix to your server”
