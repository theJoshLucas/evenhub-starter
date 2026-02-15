# Next Test

## Current target

- **ladder:** Conversate ladder (primary project objective)
- **id:** mic-permission-check
- **title:** Microphone permission check
- **goal:** Confirm the app can request and receive microphone permission so voice work can start.
- **look_for_on_glasses:**
  - App clearly requests microphone permission.
  - Permission is granted and reflected in app status.
  - App stays responsive so you can continue to the next Conversate step.

## Ladder sequences

### Foundation ladder

1. `bridge-availability-check`
2. `hello-world-startup`
3. `startup-offset-size`
4. `startup-multi-container`
5. `rerun-update-stability`
6. `intentional-bad-payload`
7. `persistence-loop-sanity`

### Conversate ladder (primary project objective)

1. `mic-permission-check`
2. `audio-stream-received`
3. `segment-created-vad`
4. `stt-roundtrip-basic`
5. `summary-card-render`
6. `on-demand-recap-gesture`
