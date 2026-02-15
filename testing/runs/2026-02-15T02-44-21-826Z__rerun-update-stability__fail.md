# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-15T02:44:00.344Z
- result: fail
- answer: no
- startup_created: false
- app_diagnostic_tag: diag-v7-rerun-guard
- latest_app_js_tag: diag-v7-rerun-guard
- build_is_fresh: true
- run_status_message: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation. (Stability pass streak: 0/2)

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-15T02:43:53.030Z (2/2)
- Update marker

## Expected layout
Expected layout: this test may show two lines while replacing previous Block A/Block B content.

## GitHub recent run files (before save)
- 2026-02-15T02-31-15-031Z__rerun-update-stability__fail.md
- 2026-02-15T02-30-30-131Z__startup-multi-container__pass.md
- 2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md
- 2026-02-15T00-37-47-770Z__startup-multi-container__pass.md
- 2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-15T02:43:56.459Z] build.check: {"loadedTag":"diag-v7-rerun-guard","latestTag":"diag-v7-rerun-guard","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-15T02:43:56.459Z"}
- [2026-02-15T02:43:56.459Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-15T02:43:56.459Z] rerun.stability.strategy: Using textContainerUpgrade to update existing container IDs instead of recreating startup containers.
- [2026-02-15T02:43:56.459Z] textContainerUpgrade.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T02:43:56.460Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:56.463Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:56.463Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:43:57.064Z] textContainerUpgrade.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T02:43:57.065Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:57.070Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:57.070Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:43:57.672Z] textContainerUpgrade.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T02:43:57.672Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:57.675Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:57.675Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:43:58.276Z] textContainerUpgrade.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T02:43:58.276Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:58.279Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:58.279Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-15T02:43:58.530Z] textContainerUpgrade.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T02:43:58.530Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:58.533Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:58.533Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:43:59.134Z] textContainerUpgrade.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T02:43:59.134Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:59.136Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:59.136Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:43:59.738Z] textContainerUpgrade.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T02:43:59.738Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:43:59.740Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:43:59.740Z] textContainerUpgrade.retry_wait: {"delayMs":600}
- [2026-02-15T02:44:00.341Z] textContainerUpgrade.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T02:44:00.341Z] textContainerUpgrade.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:43:53.030Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:44:00.344Z] textContainerUpgrade.response: {"success":false,"rawResult":false}
- [2026-02-15T02:44:00.344Z] rerun.stability.pass_streak: {"consecutivePasses":0,"requiredPasses":2}
- [2026-02-15T02:44:00.344Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation. (Stability pass streak: 0/2)
- [2026-02-15T02:44:21.857Z] github.recent_runs: ["2026-02-15T02-31-15-031Z__rerun-update-stability__fail.md","2026-02-15T02-30-30-131Z__startup-multi-container__pass.md","2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md","2026-02-15T00-37-47-770Z__startup-multi-container__pass.md","2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md"]

## Notes
Still the same god damn problem
