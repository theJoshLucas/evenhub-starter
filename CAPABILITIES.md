# Capabilities Map (How to Fill This)

Use the starter kit UI and record outcomes for each probe.

## Suggested format
For each method, capture:

- **Works?** (✅ / ❌)
- **Return type** (number/string/object)
- **Example value** (redact sensitive bits)
- **Quirks** (timeouts, requires startup page, etc.)

### Methods to validate
- getUserInfo()
- getDeviceInfo()
- setLocalStorage(key,value)
- getLocalStorage(key)
- createStartUpPageContainer(container)
- rebuildPageContainer(container)
- textContainerUpgrade(container)
- updateImageRawData(data)  *(add later)*
- audioControl(true/false)
- shutDownPageContainer(exitMode)
- onDeviceStatusChanged(cb)
- onEvenHubEvent(cb)

## Next step
Once you’ve filled the matrix, you can:
- design your UI/state model around what *actually works*
- implement a real plugin with confidence
