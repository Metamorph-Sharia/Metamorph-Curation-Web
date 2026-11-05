import "server-only";

// The one place that knows the retrieval gateway exists, and how it is called: POST /tools/{name}, a JSON object
// in, its answer out. Server-only: browsers call this app, never the gateway (ADR-2), so the gateway's address and,
// against the deployed one, its token stay on this side.
//
// METAMORPH_RETRIEVAL_URL   where the gateway answers (default: the local `metamorph-gateway serve`)
// METAMORPH_RETRIEVAL_TOKEN the token the deployed gateway's edge checks; unset for the local one

const GATEWAY = process.env.METAMORPH_RETRIEVAL_URL ?? "http://127.0.0.1:8765";
const TOKEN = process.env.METAMORPH_RETRIEVAL_TOKEN ?? "";

// A first call loads the embedder into memory, which takes about a minute on a Mac and seconds after that.
const TIMEOUT_MS = 180_000;

export class RetrievalError extends Error {}

export type Called = { answer: unknown; milliseconds: number };

// One tool call, timed: the page shows how long the gateway took, which is half of what a retrieval test reads.
export async function callTool(tool: string, input: Record<string, unknown>): Promise<Called> {
  const started = Date.now();
  let response: Response;
  try {
    response = await fetch(`${GATEWAY}/tools/${encodeURIComponent(tool)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) },
      body: JSON.stringify(input),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new RetrievalError(`the retrieval gateway at ${GATEWAY} isn't answering`);
  }
  const answer: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new RetrievalError(failure(answer) ?? `the retrieval gateway answered ${response.status}`);
  }
  return { answer, milliseconds: Date.now() - started };
}

// The gateway's errors are {"error": "<code>", "message": "<what happened>"}: show its message, not its code.
function failure(body: unknown): string | null {
  if (typeof body === "object" && body !== null && "message" in body) {
    const message = (body as { message: unknown }).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }
  return null;
}
