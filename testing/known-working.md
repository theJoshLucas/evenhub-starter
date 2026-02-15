# Known Working

Use this file for test scenarios that have repeated successful runs.

## Graduation ladder

Move a test here after it has at least **2 separate PASS runs** in `testing/runs/` with no freeze or crash notes.

### Foundation ladder

Suggested order to graduate:

1. `bridge-availability-check`
2. `hello-world-startup`
3. `startup-offset-size`
4. `startup-multi-container`
5. `rerun-update-stability`
6. `intentional-bad-payload`
7. `persistence-loop-sanity`

### Conversate ladder (primary project objective)

Suggested order to graduate:

1. `mic-permission-check`
2. `audio-stream-received`
3. `segment-created-vad`
4. `stt-roundtrip-basic`
5. `summary-card-render`
6. `on-demand-recap-gesture`

When a test graduates, add one bullet like:

- `test-id` — working consistently on date/device combination, with links to run logs.
