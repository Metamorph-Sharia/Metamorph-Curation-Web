# The end-to-end world's settings, shared by seed.sh and api.sh. A database and a bucket of its own: the tests
# change data, so they never touch a real one.
PLATFORM="${METAMORPH_PLATFORM:-../Metamorph-Knowledge-Platform}"
SERVER_URL="${E2E_POSTGRES_URL:-postgresql://metamorph:metamorph-dev@localhost:5433}"
export METAMORPH_DATABASE_URL="$SERVER_URL/metamorph_e2e"
export METAMORPH_S3_ENDPOINT_URL="${E2E_S3_ENDPOINT_URL:-http://localhost:8333}"
export METAMORPH_S3_BUCKET=metamorph-e2e
export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID:-metamorph}"
export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY:-metamorph-dev-secret}"
export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"
metamorph() { uv run --quiet --project "$PLATFORM" metamorph "$@"; }
