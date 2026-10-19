#!/usr/bin/env bash
# The curation API for the end-to-end tests: on the e2e world (env.sh), with one test account (e2e.ts).
set -euo pipefail
cd "$(dirname "$0")/.."
source e2e/env.sh

export METAMORPH_CURATORS="$(uv run --quiet --project "$PLATFORM" python -c '
import json
from metamorph_platform.adapters.api.accounts import hash_password
print(json.dumps([{"username": "e2e", "name": "Eka Pratiwi", "password_hash": hash_password("e2e-password-123", iterations=1000)}]))')"
export METAMORPH_WEB_SECRET="$(openssl rand -hex 32)"
export METAMORPH_S3_PUBLIC_ENDPOINT_URL="$METAMORPH_S3_ENDPOINT_URL"
exec uv run --quiet --project "$PLATFORM" metamorph api --port "${E2E_API_PORT:-8012}"
