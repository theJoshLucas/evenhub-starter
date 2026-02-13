# SDK Notes (Phase 1 discovery)

## Identified SDK package
- **Package:** `@evenrealities/even_hub_sdk`
- **Version in use:** `0.0.7`
- **Load strategy in repo:** dynamic ESM import from:
  1. `https://esm.sh/@evenrealities/even_hub_sdk@0.0.7`
  2. `https://unpkg.com/@evenrealities/even_hub_sdk@0.0.7/dist/index.js`

## API surfaces used by this repo
- Bridge bootstrap:
  - `waitForEvenAppBridge()`
  - `EvenAppBridge.getInstance()`
- Events:
  - `onDeviceStatusChanged(cb)`
  - `onEvenHubEvent(cb)`
- Read APIs:
  - `getUserInfo()`
  - `getDeviceInfo()`
  - `getLocalStorage(key)`
- Write/control APIs:
  - `setLocalStorage(key, value)`
  - `createStartUpPageContainer(payload)`
  - `textContainerUpgrade(payload)`
  - `rebuildPageContainer(payload)`
  - `audioControl(boolean)`
  - `shutDownPageContainer(exitMode)`
- Payload classes:
  - `CreateStartUpPageContainer`
  - `TextContainerUpgrade`
  - `RebuildPageContainer`

## Minimal hello-world path
1. Boot bridge.
2. Call `createStartUpPageContainer()` with one text object.
3. Verify return code and status pill updates.

## Constraints / caveats
- Desktop browser is not enough for full verification; Even runtime bridge is required.
- SDK and behavior may change during pilot; treat Discord announcements as current source of truth.
