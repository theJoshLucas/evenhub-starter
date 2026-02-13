# Baseline Report (Phase 0)

## Repo inventory
- **Project type:** Static web app (no bundler, no package manager files).
- **Primary entry point:** `index.html` loads `app.js` as an ES module.
- **SDK usage:** Runtime CDN import of `@evenrealities/even_hub_sdk@0.0.7` from `esm.sh` with `unpkg` fallback.
- **Runtime assumption:** Designed to run inside the Even companion app WebView with `window.flutter_inappwebview.callHandler` available.

## How to run
### Fast local smoke check (desktop browser)
```bash
python3 -m http.server 4173
```
Then open: `http://localhost:4173/index.html`

Expected behavior on desktop: UI renders, but bridge methods fail because `flutter_inappwebview` bridge is absent.

### Target runtime (Even Hub / device flow)
1. Host the project over HTTPS (GitHub Pages recommended).
2. Open the hosted URL in Even Hub QR target flow.
3. Click **Boot / Reconnect** and probe buttons.

## What currently works
- The page renders without a build step.
- Probe UI buttons wire correctly to JS handlers.
- SDK loading logic attempts two CDNs and logs results.
- In-memory capabilities matrix updates from probe outcomes.

## What currently fails / known limits
- On standard desktop browser, Even bridge is unavailable; boot may fail with:
  - `Bridge not available (boot failed).`
  - `Boot FAILED: ...` (root cause is missing `window.flutter_inappwebview.callHandler`).
- True end-to-end validation requires Even runtime/device; repository has no simulator harness.
- No automated tests/lint/build scripts exist yet.

## Missing prerequisites
- Access to Even Hub pilot program + Discord for latest platform guidance.
- Physical device/runtime context (or official simulator if provided by Even).
- HTTPS hosting URL for QR workflow (GitHub Pages or equivalent).

## Top 5 immediate fixes
1. Add docs clarifying desktop vs device expectations and exact hello-world workflow.
2. Add explicit dependency/version documentation for `@evenrealities/even_hub_sdk`.
3. Add unknowns/risk tracker tied to Discord/SDK drift.
4. Add troubleshooting doc with common boot/bridge failures.
5. Optional: pin SDK import URL in one place/config to simplify upgrades.
