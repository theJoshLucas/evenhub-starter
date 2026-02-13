# Even Hub Starter Kit (Probe + Template)

Zero-build, GitHub-Pages-friendly starter kit for validating Even Hub SDK behavior on real hardware.

## What this project is
This repo is a **developer probe harness**, not a polished user product yet.

It provides:
- Button-driven probes for common Even Hub SDK methods.
- Runtime status pills (SDK load, bridge readiness, startup page state).
- In-memory capabilities matrix that captures what worked vs failed.

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
- `index.html` — UI: status pills, probe buttons, log panel, matrix panel.
- `app.js` — bridge boot flow, SDK loading, probe implementations, matrix updates.
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

## Glasses QR testing loop (human-in-the-loop)
Why this exists: Even Hub WebView can cache aggressively, so scanning the same old QR may open stale code. This tool creates a fresh URL each time by appending a `cb` (cache-busting) query value.

1. Click **Generate QR for Glasses Test**.
2. Scan the new QR with the glasses flow.
3. Observe behavior on-device (status, logs, and what appears in-glasses).
4. Return to the page and click **Generate QR for Glasses Test** again for the next run.

Important: each generated QR is effectively single-use for testing because it is tied to one timestamped URL.

## Smallest reproducible hello-world (core integration)
1. Launch in Even runtime from a freshly generated QR URL.
2. Click **Run Hello World Demo**.
3. Wait for up to 3 startup-create attempts (about ~3-5 seconds total).
4. Check status + matrix output (`helloWorldDemo.ok` and `createStartUpPageContainer.ok`).

Note: this project provides tooling to help a human validate on real hardware; it does not itself prove device validation.

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
