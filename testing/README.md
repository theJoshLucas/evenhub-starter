# Testing Journal Workflow

Why this exists: the browser app can run a guided test, but it **cannot write files into this repo by itself**. So we use an export-and-commit loop.

## Human workflow (each test run)
1. Open the app and click **Run Next Test**.
2. When asked, choose **Yes / No / Not sure** and add optional notes.
3. Click **Export run file**.
4. Save the file, then commit it into this repo under `/testing/runs/`.

File naming format:

`testing/runs/<ISO>__<test-id>__<result>.md`

Example:

`testing/runs/2026-02-13T10-00-00-123Z__hello-world-startup__pass.md`

## How Codex should iterate on future runs
Codex should:
1. Read files in `/testing/runs/` in chronological order (oldest to newest).
2. Summarize stable successes into `testing/known-working.md`.
3. Move flaky or failed scenarios into `testing/needs-testing.md`.
4. Update `testing/next-test.md` with the single most useful next guided check.

## Notes
- Local browser storage is still used for convenience while testing.
- The repo history is the durable source of truth after run files are committed.
