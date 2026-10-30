import { expect, test } from "@playwright/test";

import { freshWorld, PUBLISHED, signedIn } from "./world";

// The market's curated links, as a curator keeps them: each change saved with its reason and published at once. The
// world holds the links the platform's migrations seeded (the LPBBTI register, OJK's portal industries) and no
// market records, so what the links name is checked against the registry only.
test.beforeAll(freshWorld);
test.beforeEach(async ({ page }) => signedIn(page));

test("a curator changes a register's links, and is told which one names a document not published", async ({ page }) => {
  await page.goto("/market");
  const registers = page.getByRole("region", { name: "Registers" });

  await registers.getByText("Edit Links").click();
  await registers.getByLabel("Governed by").fill(`${PUBLISHED.id}\nojk:pojk:2026:9`);
  await registers.getByRole("textbox", { name: "Reason" }).fill("POJK 9/2026 amends the licensing rules");
  await registers.getByRole("button", { name: "Save and Publish" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Register links saved and published." })).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "ojk:pojk:2026:9 is not published" })).toBeVisible();
  await expect(registers.getByRole("link", { name: PUBLISHED.id })).toBeVisible();
  await expect(registers.getByRole("link", { name: "ojk:seojk:2025:19" })).toHaveCount(0);
});

test("a link that is not a document ID is refused beside its form, keeping what was typed", async ({ page }) => {
  await page.goto("/market");
  const registers = page.getByRole("region", { name: "Registers" });

  await registers.getByText("Edit Links").click();
  await registers.getByLabel("Governed by").fill("POJK 40 Tahun 2024");
  await registers.getByRole("textbox", { name: "Reason" }).fill("typed by its name");
  await registers.getByRole("button", { name: "Save and Publish" }).click();

  await expect(registers.getByRole("alert")).toHaveText("POJK 40 Tahun 2024 is not a document ID, such as ojk:pojk:2024:40.");
  await expect(registers.getByLabel("Governed by")).toHaveValue("POJK 40 Tahun 2024");
});

test("a curator gathers two of OJK's industries into a sector, and withdraws it", async ({ page }) => {
  await page.goto("/market");
  const sectors = page.getByRole("region", { name: "Sectors" });

  await sectors.getByText("Add a Sector").click();
  await sectors.getByLabel("ID", { exact: true }).fill("sharia-banking");
  await sectors.getByLabel("Name", { exact: true }).fill("Perbankan Syariah");
  await sectors.getByLabel("Bank Umum Syariah").check();
  await sectors.getByLabel("Bank Perekonomian Rakyat (BPR) Syariah").check();
  await sectors.getByRole("textbox", { name: "Reason" }).fill("one list of sharia banks for industry_context");
  await sectors.getByRole("button", { name: "Save and Publish" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Sector saved and published." })).toBeVisible();
  const sector = sectors.getByRole("listitem").filter({ hasText: "sharia-banking" });
  await expect(sector).toContainText("Bank Perekonomian Rakyat (BPR) Syariah; Bank Umum Syariah");

  await sector.locator("summary").filter({ hasText: "Withdraw" }).click();
  await sector.getByRole("textbox", { name: "Reason" }).last().fill("trying it out");
  await sector.getByRole("button", { name: "Withdraw Sector" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Sector withdrawn." })).toBeVisible();
  await expect(sectors.getByText(/No sector yet/)).toBeVisible();
});

test("the market's pages open from the navigation, each saying when it has nothing yet", async ({ page }) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Market" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Market" })).toBeVisible();

  await page.getByRole("navigation", { name: "Market" }).getByRole("link", { name: "Companies" }).click();
  await expect(page.getByText("No company matches.")).toBeVisible();
  await page.getByRole("navigation", { name: "Market" }).getByRole("link", { name: "Reports" }).click();
  await expect(page.getByText(/No report is published yet/)).toBeVisible();
});
