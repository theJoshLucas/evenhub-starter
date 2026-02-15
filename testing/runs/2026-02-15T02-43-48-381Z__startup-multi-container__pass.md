# Test Run: Multi-container startup page

- test_id: startup-multi-container
- run_at: 2026-02-15T02:43:44.291Z
- result: pass
- answer: yes
- startup_created: true
- app_diagnostic_tag: diag-v7-rerun-guard
- latest_app_js_tag: diag-v7-rerun-guard
- build_is_fresh: true
- run_status_message: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).

## Goal
Confirm two separate text blocks appear together on startup.

## Expected on glasses
- Block A @ 2026-02-15T02:43:28.279Z
- Block B @ 2026-02-15T02:43:44.218Z

## Expected layout
Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.

## GitHub recent run files (before save)
- 2026-02-15T02-31-15-031Z__rerun-update-stability__fail.md
- 2026-02-15T02-30-30-131Z__startup-multi-container__pass.md
- 2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md
- 2026-02-15T00-37-47-770Z__startup-multi-container__pass.md
- 2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-15T02:43:44.217Z] build.check: {"loadedTag":"diag-v7-rerun-guard","latestTag":"diag-v7-rerun-guard","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-15T02:43:44.216Z"}
- [2026-02-15T02:43:44.217Z] test.start: {"testId":"startup-multi-container","testTitle":"Multi-container startup page"}
- [2026-02-15T02:43:44.218Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":2}
- [2026-02-15T02:43:44.219Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Block A @ 2026-02-15T02:43:28.279Z","contentLength":34},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Block B @ 2026-02-15T02:43:44.218Z","contentLength":34}]}
- [2026-02-15T02:43:44.291Z] createStartUpPageContainer.response: {"success":true,"rawResult":0}
- [2026-02-15T02:43:44.291Z] test.status: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).
- [2026-02-15T02:43:48.851Z] github.recent_runs: ["2026-02-15T02-31-15-031Z__rerun-update-stability__fail.md","2026-02-15T02-30-30-131Z__startup-multi-container__pass.md","2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md","2026-02-15T00-37-47-770Z__startup-multi-container__pass.md","2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md"]

## Notes
(none)
