# Feature Plan (Phase 3: mobile-first testing UX)

## Primary goal and two-track execution
**Primary goal:** learn the Even SDK enough to build a **Conversate replacement plugin**.

The current probe harness is a **temporary learning tool**, not the final shipped product.

Two tracks:
1. **SDK validation track (current harness):** confirm SDK/runtime behavior and capture reliable baseline evidence.
2. **Conversate+ build track:** implement mic input → transcript → card output once validation is stable.

## In scope for this issue
1. **Mobile-first redesign**
   - cleaner typography, tighter spacing, smaller consistent buttons.
2. **Guided recommended loop**
   - top-of-page numbered flow: Generate QR -> Boot/Reconnect -> Hello World -> Record confirmation.
   - each step has not-run / running / success / failed state.
3. **Advanced probe containment**
   - probe buttons moved into collapsed Advanced panel.
   - grouped by Bridge / Page / Storage / Audio with simple search filter.
4. **Persistent journal + summary**
   - localStorage-backed entries with outcome type (success/failure), notes, URL, timestamp.
   - summary box tracks wins, failures, last run, last URL.
5. **Iteration-speed reports**
   - Copy Summary, Copy Full Report, Download Report (.md).
   - markdown includes timestamp, tested URL, status, logs, journal snapshot.

## Out of scope
- Device-side automation or claims of automatic hardware validation.
- Build tooling changes (still static files only).

## Dependencies
- Even Hub SDK APIs listed in `docs/SDK_NOTES.md`.
- Even runtime WebView bridge (`flutter_inappwebview`).
- HTTPS hosting for QR/device launch.

## Risks / unknowns
- Runtime bridge is absent in desktop browsers, so bridge steps can fail outside device runtime.
- Clipboard and download permissions vary by browser environment.
- SDK/API behavior can drift during pilot firmware updates.
