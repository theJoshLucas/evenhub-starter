# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-15T00:39:01.704Z
- result: fail
- answer: no
- startup_created: false
- app_diagnostic_tag: diag-v5-rerun-two-container-nonempty
- latest_app_js_tag: diag-v5-rerun-two-container-nonempty
- build_is_fresh: true
- run_status_message: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-15T00:37:50.335Z (2/2)
- Update marker

## Expected layout
Expected layout: this test may show two lines while replacing previous Block A/Block B content.

## GitHub recent run files (before save)
- 2026-02-15T00-37-47-770Z__startup-multi-container__pass.md
- 2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md
- 2026-02-14T23-54-35-172Z__startup-multi-container__pass.md
- 2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md
- 2026-02-14T22-37-35-448Z__startup-multi-container__pass.md

## Diagnostics
- [2026-02-15T00:38:41.756Z] build.check: {"loadedTag":"diag-v5-rerun-two-container-nonempty","latestTag":"diag-v5-rerun-two-container-nonempty","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-15T00:38:41.755Z"}
- [2026-02-15T00:38:41.756Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-15T00:38:41.756Z] rerun.stability.strategy: Using two non-empty containers to avoid payload validation failures from blank container updates.
- [2026-02-15T00:38:41.756Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T00:38:41.756Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:43.766Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:43.766Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:44.368Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T00:38:44.369Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:46.380Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:46.380Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:46.981Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T00:38:46.981Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:48.991Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:48.991Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:49.592Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T00:38:49.592Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:51.600Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:51.600Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-15T00:38:51.852Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-15T00:38:51.852Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:53.861Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:53.861Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:54.462Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-15T00:38:54.463Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:56.483Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:56.483Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:57.085Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-15T00:38:57.085Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:38:59.094Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:38:59.094Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-15T00:38:59.696Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-15T00:38:59.696Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-15T00:37:50.335Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":90,"width":480,"height":80,"contentPreview":"Update marker","contentLength":13}]}
- [2026-02-15T00:39:01.704Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-15T00:39:01.704Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.
- [2026-02-15T00:39:14.432Z] github.recent_runs: ["2026-02-15T00-37-47-770Z__startup-multi-container__pass.md","2026-02-14T23-56-17-689Z__rerun-update-stability__fail.md","2026-02-14T23-54-35-172Z__startup-multi-container__pass.md","2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md","2026-02-14T22-37-35-448Z__startup-multi-container__pass.md"]

## Notes
Still same shit.
