#!/usr/bin/env bash
set -euo pipefail

OUTPUT_PATH="${1:-build-meta.json}"

BUILT_AT="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
GIT_SHA="$(git rev-parse HEAD)"
SHORT_SHA="$(git rev-parse --short=7 HEAD)"
APP_VERSION_TAG="$(git describe --tags --abbrev=0 2>/dev/null || echo "untagged")"
BUILD_ID="${BUILT_AT}-${SHORT_SHA}"

python - "$OUTPUT_PATH" "$BUILD_ID" "$GIT_SHA" "$BUILT_AT" "$APP_VERSION_TAG" <<'PY'
import json
import pathlib
import sys

output = pathlib.Path(sys.argv[1])
payload = {
    "build_id": sys.argv[2],
    "git_sha": sys.argv[3],
    "built_at": sys.argv[4],
    "app_version_tag": sys.argv[5],
}
output.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {output}")
PY
