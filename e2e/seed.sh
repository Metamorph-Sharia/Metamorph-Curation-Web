#!/usr/bin/env bash
# A fresh end-to-end world: the e2e database recreated, the fixture bundle loaded, the registry built (so one
# documents are published, one with a gap to review; one is held for its structure, one for its identity; and one
# citation waits for review).
# Needs the platform repository beside this one (or METAMORPH_PLATFORM), its compose postgres and objectstore, uv.
set -euo pipefail
cd "$(dirname "$0")/.."
source e2e/env.sh

uv run --quiet --project "$PLATFORM" python - "$SERVER_URL/postgres" <<'PY'
import sys, psycopg
with psycopg.connect(sys.argv[1], autocommit=True) as server:
    server.execute("DROP DATABASE IF EXISTS metamorph_e2e WITH (FORCE)")
    server.execute("CREATE DATABASE metamorph_e2e")
PY
metamorph db migrate >/dev/null
metamorph storage init --upload-origin http://localhost:3100 >/dev/null  # the e2e app may upload (add document)
metamorph load e2e/fixtures/bundle >/dev/null
metamorph build >/dev/null
echo "seeded the e2e world: $METAMORPH_DATABASE_URL, bucket $METAMORPH_S3_BUCKET"
