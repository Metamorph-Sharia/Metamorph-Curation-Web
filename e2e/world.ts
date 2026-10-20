import type { Page } from "@playwright/test";
import { execFileSync } from "node:child_process";

// The end-to-end world (seed.sh, from fixtures/bundle): who signs in, and what they find.
export const API_PORT = 8012;
export const CURATOR = { username: "e2e", password: "e2e-password-123", name: "Eka Pratiwi" };

export const PUBLISHED = { id: "ojk:pojk:2018:35", citation: "POJK 35/POJK.05/2018" }; // cites Keppres 84/P: unlinked
export const GAPPY = { id: "ojk:pojk:2019:10", citation: "POJK 10/POJK.05/2019" }; // held: Pasal 2 missing
export const TO_CORRECT = { id: "ojk:pojk:2020:7", citation: "POJK 7/POJK.05/2020" }; // held: Pasal 2 missing
export const AMENDING = { id: "ojk:pojk:2021:2", citation: "POJK 2/POJK.05/2021" }; // amends PUBLISHED's Pasal 2
export const UNIDENTIFIED = { id: "unresolved:ojk:bfca3f541eaae58f", citation: "POJK tanpa nomor" }; // held: no ID

export function documentPath(id: string): string {
  return `/documents/${encodeURIComponent(id)}`;
}

export async function signIn(page: Page, password = CURATOR.password): Promise<void> {
  await page.getByLabel("Username").fill(CURATOR.username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
}

export async function signedIn(page: Page): Promise<void> {
  await page.goto("/sign-in");
  await signIn(page);
  await page.waitForURL("/");
}

// A fresh world (seed.sh, about two seconds): each spec file starts from the same data, whatever ran before it.
export function freshWorld(): void {
  execFileSync("bash", ["e2e/seed.sh"], { stdio: "ignore" });
}
