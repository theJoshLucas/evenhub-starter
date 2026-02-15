# Even Hub Starter Kit (Probe + Template)

## Current Phase
- **Now:** SDK validation
- **Next:** Mic capture + transcript
- **Later:** Intent routing + HUD cards

Zero-build, GitHub-Pages-friendly starter kit for validating Even Hub SDK behavior on real hardware.

## Primary goal and tracks
**Primary goal:** learn the Even SDK enough to build a **Conversate replacement plugin**.

This repo’s probe harness is a **temporary learning tool**, not the final product.

We are running two tracks:
1. **SDK validation track (current harness):** test bridge + SDK behavior on real hardware, record what works, and reduce unknowns.
2. **Conversate+ build track:** build mic input → transcript → card output flow after SDK basics are validated.

## What this project is
This repo is a **developer probe harness**, not a polished user product yet.

It provides:
- A mobile-first guided loop with numbered status steps.
- Runtime status pills (SDK load, bridge readiness, startup page state).
- Advanced probes in a collapsed panel (Bridge, Page, Storage, Audio + search).
- Persistent developer journal + markdown export helpers for fast iteration.

## Ground truth dependency
### SDK
- **Package:** `@evenrealities/even_hub_sdk`
- **Version used:** `0.0.7`
- **Current load path:** dynamic import from CDN in `app.js`.

Load order in code:
1. `https://esm.sh/@evenrealities/even_hub_sdk@0.0.7`
2. `https://unpkg.com/@evenrealities/even_hub_sdk@0.0.7/dist/index.js`

### Minimal usage snippet (from this repo)
```js
const { waitForEvenAppBridge, EvenAppBridge } = await import(
  "https://esm.sh/@evenrealities/even_hub_sdk@0.0.7"
);
EvenAppBridge.getInstance();
const bridge = await waitForEvenAppBridge();
const user = await bridge.getUserInfo();
```

## Repo tour
- `index.html` — mobile-first layout, guided loop, advanced section, journal/report controls.
- `app.js` — bridge boot flow, probe logic, step statuses, persistent journal, markdown exports.
- `CAPABILITIES.md` — template for recording method-level results.
- `docs/BASELINE.md` — current run-state and known failures.
- `docs/SDK_NOTES.md` — discovered API surfaces and hello-world path.

## How to run
### Option A: local smoke check (desktop)
```bash
python3 -m http.server 4173
```
Open `http://localhost:4173/index.html`.

What you should see:
- UI loads.
- Boot may fail due to missing Even runtime bridge (expected outside device runtime).

### Option B: target Even runtime (recommended)
1. Host this folder over HTTPS (GitHub Pages recommended).
2. Use the hosted URL in Even Hub QR target flow.
3. Click **Run Hello World Demo** (recommended) or **Boot / Reconnect**.
4. The demo will auto-try `createStartUpPageContainer()` up to 3 times with a short delay.

## Guided recommended loop (default)
Why this exists: the app now auto-generates a runtime URL fingerprint (`build_id`, `nonce`, `ts`) on load, so the QR target always points to the active build without manual refresh steps.

1. Open the hosted URL in Even runtime.
2. Click **Boot / Reconnect**.
3. Click **Run Hello World Demo**.
4. Record confirmation in **Developer Journal** with outcome + notes.

## Smallest reproducible hello-world (core integration)
1. Launch in Even runtime from the hosted URL (the app auto-updates URL fingerprinting on load).
2. Click **Run Hello World Demo**.
3. Wait for up to 3 startup-create attempts (about ~3-5 seconds total).
4. Check status + matrix output (`helloWorldDemo.ok` and `createStartUpPageContainer.ok`).

Note: this project provides tooling to help a human validate on real hardware; it does not itself prove device validation.


## Reporting shortcuts
- **Copy Summary**: short markdown for chat updates.
- **Copy Full Report**: full markdown containing timestamp, tested URL, status matrix, logs, and journal snapshot.
- **Download Report (.md)**: saves the full report locally for handoffs.

## Current constraints
- Device/runtime dependency: full validation requires Even bridge (`flutter_inappwebview`).
- SDK/platform are pilot-stage; behavior can change.
- Discord + official Even Hub channels are upstream truth for latest guidance.

Official sources:
- Pilot article: https://support.evenrealities.com/hc/en-us/articles/34380533765145-Even-Hub-Pilot-Program
- Developer portal: https://evenhub.evenrealities.com/

## Documentation index
- `docs/BASELINE.md`
- `docs/PRODUCT.md`
- `docs/FEATURE_PLAN.md`
- `docs/SDK_NOTES.md`
- `docs/TROUBLESHOOTING.md`
- `docs/TODO_UNKNOWNs.md`
