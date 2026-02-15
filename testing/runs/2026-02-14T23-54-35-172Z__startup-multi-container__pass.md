# Test Run: Multi-container startup page

- test_id: startup-multi-container
- run_at: 2026-02-14T23:54:15.393Z
- result: pass
- answer: yes
- startup_created: true
- app_diagnostic_tag: diag-v4-auto-build-freshness-gate
- latest_app_js_tag: diag-v4-auto-build-freshness-gate
- build_is_fresh: true
- run_status_message: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).

## Goal
Confirm two separate text blocks appear together on startup.

## Expected on glasses
- Block A @ 2026-02-14T23:52:31.073Z
- Block B @ 2026-02-14T23:54:15.296Z

## Expected layout
Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.

## GitHub recent run files (before save)
- 2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md
- 2026-02-14T22-37-35-448Z__startup-multi-container__pass.md
- 2026-02-14T22-33-27-062Z__startup-multi-container__pass.md
- 2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md
- 2026-02-14T22-28-01-110Z__startup-multi-container__pass.md

## Diagnostics
- [2026-02-14T23:54:15.295Z] build.check: {"loadedTag":"diag-v4-auto-build-freshness-gate","latestTag":"diag-v4-auto-build-freshness-gate","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-14T23:54:15.295Z"}
- [2026-02-14T23:54:15.295Z] test.start: {"testId":"startup-multi-container","testTitle":"Multi-container startup page"}
- [2026-02-14T23:54:15.296Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":2}
- [2026-02-14T23:54:15.297Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Block A @ 2026-02-14T23:52:31.073Z","contentLength":34},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Block B @ 2026-02-14T23:54:15.296Z","contentLength":34}]}
- [2026-02-14T23:54:15.392Z] createStartUpPageContainer.response: {"success":true,"rawResult":0}
- [2026-02-14T23:54:15.393Z] test.status: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).
- [2026-02-14T23:54:35.620Z] github.recent_runs: ["2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md","2026-02-14T22-37-35-448Z__startup-multi-container__pass.md","2026-02-14T22-33-27-062Z__startup-multi-container__pass.md","2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md","2026-02-14T22-28-01-110Z__startup-multi-container__pass.md"]

## Notes
(none)
