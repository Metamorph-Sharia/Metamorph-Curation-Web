import { defineConfig, devices } from "@playwright/test";

import { API_PORT } from "./e2e/world";

// End to end, as a curator uses the app, against the real curation API on a world of its own: each spec file starts
// from a fresh one (world.ts freshWorld, e2e/seed.sh: the tests change data), e2e/api.sh serves the API on it.
// Needs the platform repository beside this one (or METAMORPH_PLATFORM), its compose postgres and objectstore, uv.
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1, // one shared world: tests run in turn
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "bash e2e/api.sh",
      url: `http://localhost:${API_PORT}/healthz`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      // A production build: what ships, and it runs beside a developer's own `next dev` (one per project).
      command: `npm run build && npm run start -- --port ${PORT}`,
      url: `http://localhost:${PORT}/sign-in`,
      reuseExistingServer: !process.env.CI,
      timeout: 180_000,
      env: { METAMORPH_API_URL: `http://localhost:${API_PORT}` },
    },
  ],
});
