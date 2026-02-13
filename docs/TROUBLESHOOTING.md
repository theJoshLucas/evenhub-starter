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
