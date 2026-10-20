import { expect, test } from "@playwright/test";

import { AMENDING, documentPath, freshWorld, PUBLISHED, signedIn } from "./world";

test.beforeAll(freshWorld);

test.beforeEach(async ({ page }) => signedIn(page));

test("an amended document says what amended it, and which of its articles", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));

  const lineage = page.getByRole("region", { name: "Lineage" });
  await expect(lineage.getByRole("heading", { name: "Diubah oleh (1)" })).toBeVisible();
  const amendment = lineage.getByRole("listitem").filter({ hasText: AMENDING.citation });
  await expect(amendment).toContainText("The document, and Pasal 2");
  await expect(amendment).toContainText("Effective 3 Mar 2021");

  const history = page.getByRole("region", { name: "Status History" });
  await expect(history.getByRole("row", { name: /Pasal 2/ }).getByRole("link", { name: AMENDING.citation })).toBeVisible();

  await amendment.getByRole("link", { name: AMENDING.citation }).click();
  await expect(page.getByRole("heading", { level: 1, name: AMENDING.citation })).toBeVisible();
  await expect(page.getByRole("region", { name: "Lineage" }).getByRole("heading", { name: "Mengubah (1)" })).toBeVisible();
});

test("the header says where the status comes from and how far the record can be trusted", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));

  const provenance = page.getByLabel("Provenance");
  await expect(provenance).toContainText("Berlaku, as ojk states it");
  await expect(provenance).toContainText("Passed every check");
});
