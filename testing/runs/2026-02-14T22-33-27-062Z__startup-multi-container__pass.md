# Test Run: Multi-container startup page

- test_id: startup-multi-container
- run_at: 2026-02-14T22:33:24.862Z
- result: pass
- answer: yes
- startup_created: true
- run_status_message: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).

## Goal
Confirm two separate text blocks appear together on startup.

## Expected on glasses
- Block A @ 2026-02-14T22:33:23.019Z
- Block B @ 2026-02-14T22:33:24.486Z

## Expected layout
Expected layout: Block A then Block B, with no intentionally blank spacer lines between them.

## GitHub recent run files (before save)
- 2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md
- 2026-02-14T22-28-01-110Z__startup-multi-container__pass.md
- 2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md
- 2026-02-14T21-55-54-726Z__startup-multi-container__pass.md
- 2026-02-14T18-29-06-637Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-14T22:33:24.485Z] test.start: {"testId":"startup-multi-container","testTitle":"Multi-container startup page"}
- [2026-02-14T22:33:24.486Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":2}
- [2026-02-14T22:33:24.486Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Block A @ 2026-02-14T22:33:23.019Z","contentLength":34},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Block B @ 2026-02-14T22:33:24.486Z","contentLength":34}]}
- [2026-02-14T22:33:24.861Z] createStartUpPageContainer.response: {"success":true,"rawResult":0}
- [2026-02-14T22:33:24.861Z] test.status: Two startup blocks sent. Confirm both are visible (wrapping may vary by device/font).
- [2026-02-14T22:33:27.498Z] github.recent_runs: ["2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md","2026-02-14T22-28-01-110Z__startup-multi-container__pass.md","2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md","2026-02-14T21-55-54-726Z__startup-multi-container__pass.md","2026-02-14T18-29-06-637Z__rerun-update-stability__fail.md"]

## Notes
(none)
