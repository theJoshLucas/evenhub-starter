# Test Run: Re-run update stability

- test_id: rerun-update-stability
- run_at: 2026-02-14T23:55:58.216Z
- result: fail
- answer: no
- startup_created: false
- app_diagnostic_tag: diag-v4-auto-build-freshness-gate
- latest_app_js_tag: diag-v4-auto-build-freshness-gate
- build_is_fresh: true
- run_status_message: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.

## Goal
Confirm running startup updates twice in a row does not freeze.

## Expected on glasses
- Stability run @ 2026-02-14T23:54:37.438Z (2/2)

## Expected layout
Expected layout: only one visible line from this test. Previous Block A/Block B text should be replaced.

## GitHub recent run files (before save)
- 2026-02-14T23-54-35-172Z__startup-multi-container__pass.md
- 2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md
- 2026-02-14T22-37-35-448Z__startup-multi-container__pass.md
- 2026-02-14T22-33-27-062Z__startup-multi-container__pass.md
- 2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md

## Diagnostics
- [2026-02-14T23:55:38.286Z] build.check: {"loadedTag":"diag-v4-auto-build-freshness-gate","latestTag":"diag-v4-auto-build-freshness-gate","isFresh":true,"reason":"Loaded build matches latest app.js.","checkedAt":"2026-02-14T23:55:38.286Z"}
- [2026-02-14T23:55:38.286Z] test.start: {"testId":"rerun-update-stability","testTitle":"Re-run update stability"}
- [2026-02-14T23:55:38.286Z] rerun.stability.strategy: Using single-container updates to avoid SDK rejection from blank/whitespace secondary containers.
- [2026-02-14T23:55:38.286Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T23:55:38.286Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (1/2)","contentLength":46}]}
- [2026-02-14T23:55:40.296Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:40.296Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:40.897Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T23:55:40.898Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (1/2)","contentLength":46}]}
- [2026-02-14T23:55:42.906Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:42.906Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:43.507Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T23:55:43.507Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (1/2)","contentLength":46}]}
- [2026-02-14T23:55:45.516Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:45.516Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:46.117Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T23:55:46.117Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (1/2)","contentLength":46}]}
- [2026-02-14T23:55:48.125Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:48.125Z] rerun.stability.pause_before_second_pass: {"delayMs":250}
- [2026-02-14T23:55:48.377Z] createStartUpPageContainer.attempt: {"attempt":1,"totalAttempts":4}
- [2026-02-14T23:55:48.377Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (2/2)","contentLength":46}]}
- [2026-02-14T23:55:50.385Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:50.385Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:50.986Z] createStartUpPageContainer.attempt: {"attempt":2,"totalAttempts":4}
- [2026-02-14T23:55:50.986Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (2/2)","contentLength":46}]}
- [2026-02-14T23:55:52.996Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:52.996Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:53.597Z] createStartUpPageContainer.attempt: {"attempt":3,"totalAttempts":4}
- [2026-02-14T23:55:53.597Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (2/2)","contentLength":46}]}
- [2026-02-14T23:55:55.607Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:55.607Z] createStartUpPageContainer.retry_wait: {"delayMs":600}
- [2026-02-14T23:55:56.208Z] createStartUpPageContainer.attempt: {"attempt":4,"totalAttempts":4}
- [2026-02-14T23:55:56.208Z] createStartUpPageContainer.request: {"containerTotalNum":1,"textObject":[{"containerID":1,"containerName":"rerun-a","xPosition":0,"yPosition":0,"width":480,"height":80,"contentPreview":"Stability run @ 2026-02-14T23:54:37.438Z (2/2)","contentLength":46}]}
- [2026-02-14T23:55:58.216Z] createStartUpPageContainer.response: {"success":false,"rawResult":1}
- [2026-02-14T23:55:58.216Z] test.status: At least one update returned an error code (pass1=false, pass2=false). Continue with your observation.
- [2026-02-14T23:56:17.974Z] github.recent_runs: ["2026-02-14T23-54-35-172Z__startup-multi-container__pass.md","2026-02-14T22-38-09-732Z__rerun-update-stability__fail.md","2026-02-14T22-37-35-448Z__startup-multi-container__pass.md","2026-02-14T22-33-27-062Z__startup-multi-container__pass.md","2026-02-14T22-28-45-078Z__rerun-update-stability__fail.md"]

## Notes
Block A and block B still showing.
