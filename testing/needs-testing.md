# Needs Testing

Use this file for scenarios with failures, uncertainty, or not enough data.

## How this works with the ladder

- Start new or uncertain tests here.
- Keep a test here if it has any FAIL or NOT-SURE run in `testing/runs/`.
- Move a test to `known-working.md` only after 2 clean PASS runs in a row.
- If a previously stable test fails again, move it back here until it is stable again.

## Ladder checkpoints to watch

1. `bridge-availability-check` — app can connect and stay responsive.
2. `hello-world-startup` — single text appears.
3. `startup-offset-size` — moved/resized text appears.
4. `startup-multi-container` — two blocks appear together.
5. `rerun-update-stability` — two updates in a row do not freeze.
6. `intentional-bad-payload` — intentional error is handled gracefully.
7. `persistence-loop-sanity` — sequence/counter behavior remains predictable.
