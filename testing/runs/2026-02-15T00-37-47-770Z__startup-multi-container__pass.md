# Test Run: Multi-container startup page

- test_id: startup-multi-container
- run_at: 2026-02-15T00:37:45.781Z
- result: pass
- answer: yes
- startup_created: true
- app_diagnostic_tag: diag-v5-rerun-two-container-nonempty
- latest_app_js_tag: diag-v5-rerun-two-container-nonempty
- build_is_fresh: true
- run_status_message: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).

## Goal
Confirm two separate text blocks appear together on startup.

## Expected on glasses
- Block A @ 2026-02-15T00:37:39.100Z
- Block B @ 2026-02-15T00:37:45.189Z

## Expected layout
Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.

## GitHub recent run files (before save)
- 2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md
- 2026-02-14T23-54-35-172Z__startup-multi-container__pass.md
- 2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md
- 2026-02-14T22-37-35-448Z__startup-multi-container__pass.md
- 2026-02-14T22-33-27-062Z__startup-multi-container__pass.md

## Diagnostics
- [2026-02-15T00:37:45.188Z] build.check: {"loadedTag":"diag-v5-rerun-two-container-nonempty","latestTag":"diag-v5-rerun-two-container-nonempty","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-15T00:37:45.188Z"}
- [2026-02-15T00:37:45.188Z] test.start: {"testId":"startup-multi-container","testTitle":"Multi-container startup page"}
- [2026-02-15T00:37:45.191Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":2}
- [2026-02-15T00:37:45.191Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Block A @ 2026-02-15T00:37:39.100Z","contentLength":34},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Block B @ 2026-02-15T00:37:45.189Z","contentLength":34}]}
- [2026-02-15T00:37:45.780Z] createStartUpPageContainer.response: {"success":true,"rawResult":0}
- [2026-02-15T00:37:45.781Z] test.status: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).
- [2026-02-15T00:37:48.426Z] github.recent_runs: ["2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md","2026-02-14T23-54-35-172Z__startup-multi-container__pass.md","2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md","2026-02-14T22-37-35-448Z__startup-multi-container__pass.md","2026-02-14T22-33-27-062Z__startup-multi-container__pass.md"]

## Notes
(none)
