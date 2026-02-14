# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-14T22:28:25.149Z
- result: fail
- answer: no
- startup_created: false
- run_status_message: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-14T22:28:03.360Z (2/2)

## Expected layout
Expected layout: only one visible line from this test. Previous Block A/Block B text should be replaced.

## GitHub recent run files (before save)
- 2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md
- 2026-02-14T21-55-54-726Z__startup-multi-container__pass.md
- 2026-02-14T18-29-06-637Z__rerun-update-stability__fail.md
- 2026-02-14T18-25-53-607Z__startup-multi-container__pass.md
- 2026-02-14T18-16-39-167Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-14T22:28:05.218Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-14T22:28:05.218Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T22:28:05.218Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:07.227Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:07.227Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:07.828Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T22:28:07.828Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:09.837Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:09.837Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:10.438Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T22:28:10.438Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:12.451Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:12.451Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:13.052Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T22:28:13.052Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (1/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:15.061Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:15.061Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-14T22:28:15.313Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T22:28:15.313Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:17.321Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:17.321Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:17.922Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T22:28:17.922Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:19.929Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:19.929Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:20.530Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T22:28:20.530Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:22.539Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:22.539Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T22:28:23.140Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T22:28:23.140Z] createStartUpPageContainer.request: {"containerTotalNum":2,"textObject":[{"containerID":1,"containerName":"multi-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T22:28:03.360Z (2/2)","contentLength":46},{"containerID":2,"containerName":"multi-b","xPosition":0,"yPosition":420,"width":480,"height":40,"contentPreview":" ","contentLength":1}]}
- [2026-02-14T22:28:25.149Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T22:28:25.149Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.
- [2026-02-14T22:28:45.107Z] github.recent_runs: ["2026-02-14T21-57-02-401Z__rerun-update-stability__fail.md","2026-02-14T21-55-54-726Z__startup-multi-container__pass.md","2026-02-14T18-29-06-637Z__rerun-update-stability__fail.md","2026-02-14T18-25-53-607Z__startup-multi-container__pass.md","2026-02-14T18-16-39-167Z__rerun-update-stability__fail.md"]

## Notes
Still seeing results from previous test, not the current test.
