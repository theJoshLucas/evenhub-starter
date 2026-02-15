# Troubleshooting

## `flutter_inappwebview` shows missing ❌
Cause: page opened in normal desktop/mobile browser, not Even runtime WebView.

Fix: launch through Even Hub flow on device and re-run Boot.

## SDK import fails from CDN
Possible causes:
- network restrictions
- CDN outage
- version removal

Fixes:
1. verify internet access in runtime
2. test both CDN URLs from `app.js`
3. pin/update SDK version once verified in Discord

## Boot fails / bridge not available
Common error:
- `Bridge not available (boot failed).`

Fixes:
1. ensure Even runtime context is active
2. press **Boot / Reconnect** again
3. inspect Log panel for preceding root-cause message

## Hello world demo fails after retries
Common signals:
- `helloWorldDemo.ok` is `false`
- `createStartUpPageContainer.result` is non-zero

Fixes:
1. confirm bridge shows `ready ✅` before retrying
2. wait 5-10 seconds after Even app launch, then run demo again
3. if still failing, run one manual `createStartUpPageContainer()` and capture logs for Discord

## QR opens old behavior / stale page
Cause: WebView cache reused an older page load.

Fixes:
1. fully close and reopen the Even runtime view
2. confirm URL now includes `build_id`, `nonce`, and `ts` query params
3. if build changed, app should auto-rewrite the URL to the latest `build_id` on load
