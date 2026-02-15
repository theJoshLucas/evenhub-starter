# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-14T22:38:04.469Z
- result: fail
- answer: no
- startup_created: false
- run_status_message: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-14T22:37:37.698Z (2/2)

## Expected layout
Expected layout: only one visible line from this test. Previous Block A/Block B text should be replaced.

## GitHub recent run files (before save)
- 2026-02-14T22-33-27-062Z__startup-multi-container__pass.md
- 2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md
- 2026-02-14T22-28-01-110Z__startup-multi-container__pass.md
- 2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md
- 2026-02-14T21-55-54-726Z__startup-multi-container__pass.md

## Diagnostics
- [2026-02-14T22:37:44.539Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-14T22:37:44.539Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T22:37:44.539Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:46.545Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:46.548Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:37:47.149Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T22:37:47.149Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:49.160Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:49.160Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:37:49.761Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T22:37:49.761Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:51.771Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:51.771Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:37:52.372Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T22:37:52.372Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:54.381Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:54.381Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-14T22:37:54.633Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T22:37:54.633Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:56.641Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:56.641Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:37:57.241Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T22:37:57.241Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:37:59.248Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:37:59.248Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:37:59.850Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T22:37:59.850Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:38:01.858Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:38:01.858Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:38:02.459Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T22:38:02.459Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:37:37.698Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:38:04.468Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:38:04.469Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.
- [2026-02-14T22:38:09.760Z] github.recent_runs: ["2026-02-14T22-33-27-062Z__startup-multi-container__pass.md","2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md","2026-02-14T22-28-01-110Z__startup-multi-container__pass.md","2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md","2026-02-14T21-55-54-726Z__startup-multi-container__pass.md"]

## Notes
Same shit
