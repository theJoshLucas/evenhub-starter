# Feature Plan (Phase 2 prep)

## MVP features (current + next)
1. **Reliable bridge bootstrap**
   - status indicators and boot retry.
2. **Core probe coverage**
   - user/device info, startup container lifecycle, local storage, mic control, shutdown.
3. **Actionable diagnostics**
   - structured logs + capabilities matrix that can be exported.

## Nice-to-have
- Persist/export capabilities matrix (`download .json`).
- Configurable container payload editor in UI.
- Runtime environment panel (SDK URL, user-agent, bridge capabilities snapshot).

## Dependencies
- Even Hub SDK APIs listed in `docs/SDK_NOTES.md`.
- Even runtime WebView bridge (`flutter_inappwebview`).
- HTTPS hosting for QR/device launch.

## Risks / unknowns
- SDK/API behavior drift during pilot.
- Return value inconsistencies across firmware/runtime versions.
- Limited visibility into undocumented error codes.

## Milestones + acceptance criteria
1. **Milestone A: deterministic boot diagnostics**
   - Acceptance: boot result always leaves a clear status + log reason.
2. **Milestone B: hello-world page create path**
   - Acceptance: `createStartUpPageContainer` reports success/failure deterministically.
3. **Milestone C: matrix export**
   - Acceptance: developer can save probe results and share externally.
