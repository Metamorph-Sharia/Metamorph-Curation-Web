import "server-only";

import createClient from "openapi-fetch";

import type { paths } from "./schema";

// The one place that knows where the curation API is. Server-only: browsers never call the API (ADR-2), and
// its address (METAMORPH_API_URL, a private-network URL in production) never reaches them.
const API_URL = process.env.METAMORPH_API_URL ?? "http://localhost:8001";

export function curationApi(token?: string) {
  return createClient<paths>({
    baseUrl: API_URL,
    cache: "no-store", // curation data is live: never serve a cached answer
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
