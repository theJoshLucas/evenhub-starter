# Needs Testing

Use this file for scenarios with failures, uncertainty, or not enough data.

## How this works with the ladder

- Start new or uncertain tests here.
- Keep a test here if it has any FAIL or NOT-SURE run in `testing/runs/`.
- Move a test to `known-working.md` only after 2 clean PASS runs in a row.
- If a previously stable test fails again, move it back here until it is stable again.

## Ladder checkpoints to watch

### Foundation ladder

1. `bridge-availability-check` — app can connect and stay responsive.
2. `hello-world-startup` — single text appears.
3. `startup-offset-size` — moved/resized text appears.
4. `startup-multi-container` — two blocks appear together.
5. `rerun-update-stability` — two updates in a row do not freeze.
6. `intentional-bad-payload` — intentional error is handled gracefully.
7. `persistence-loop-sanity` — sequence/counter behavior remains predictable.

### Conversate ladder (primary project objective)

1. `mic-permission-check` — microphone permission prompt appears and completes successfully.
2. `audio-stream-received` — app confirms incoming audio stream data.
3. `segment-created-vad` — voice activity detection (VAD) creates a segment from speech.
4. `stt-roundtrip-basic` — speech-to-text (STT) returns expected transcript for a simple phrase.
5. `summary-card-render` — summary card renders after a successful transcript flow.
6. `on-demand-recap-gesture` — recap gesture triggers and displays requested recap.
