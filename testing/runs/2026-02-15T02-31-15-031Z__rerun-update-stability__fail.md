# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-15T02:30:57.379Z
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
- Stability run @ 2026-02-15T02:30:33.014Z (2/2)
- Update marker

## Expected layout
Expected layout: this test may show two lines while replacing previous Block A/Block B content.

## GitHub recent run files (before save)
- 2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md
- 2026-02-15T00-37-47-770Z__startup-multi-container__pass.md
- 2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md
- 2026-02-14T23-54-35-172Z__startup-multi-container__pass.md
- 2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-15T02:30:37.414Z] build.check: {"loadedTag":"diag-v7-rerun-guard","latestTag":"diag-v7-rerun-guard","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-15T02:30:37.414Z"}
- [2026-02-15T02:30:37.414Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-15T02:30:37.414Z] rerun.stability.strategy: Using two non-empty containers to avoid payload validation failures from blank container updates.
- [2026-02-15T02:30:37.414Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T02:30:37.414Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:39.431Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:39.431Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:40.032Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T02:30:40.032Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:42.040Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:42.040Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:42.642Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T02:30:42.642Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:44.651Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:44.651Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:45.252Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T02:30:45.252Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:47.290Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:47.290Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-15T02:30:47.541Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T02:30:47.541Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:49.552Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:49.552Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:50.153Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T02:30:50.154Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:52.161Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:52.161Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:52.763Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T02:30:52.763Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:54.770Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:54.770Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T02:30:55.371Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T02:30:55.372Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T02:30:33.014Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T02:30:57.379Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T02:30:57.379Z] rerun.stability.pass_streak: {"consecutivePasses":0,"requiredPasses":2}
- [2026-02-15T02:30:57.379Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation. (Stability pass streak: 0/2)
- [2026-02-15T02:31:15.062Z] github.recent_runs: ["2026-02-15T00-39-14-106Z__rerun-update-stability__fail.md","2026-02-15T00-37-47-770Z__startup-multi-container__pass.md","2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md","2026-02-14T23-54-35-172Z__startup-multi-container__pass.md","2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md"]

## Notes
Still see the two blocks from the previous test.
