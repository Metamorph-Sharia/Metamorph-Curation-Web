import { expect, test } from "@playwright/test";

import { AMENDING, documentPath, freshWorld, GAPPY, PUBLISHED, signedIn } from "./world";

test.beforeAll(freshWorld);

test.beforeEach(async ({ page }) => signedIn(page));

test("a curator reads an amended document, then the amendment's new wording", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));
  await page.getByRole("link", { name: "Read the Text" }).first().click();

  await expect(page.getByRole("heading", { level: 1, name: PUBLISHED.citation })).toBeVisible();
  const amended = page.getByRole("region", { name: "Pasal 2", exact: true });
  await expect(amended).toContainText("Dua, sebagaimana dimaksud dalam Pasal 1.");
  await expect(amended).toContainText(`Diubah oleh ${AMENDING.citation}, effective 3 Mar 2021`);

  await amended.getByRole("link", { name: "Read the new wording: Pasal 2 (Pasal I)" }).click();

  await expect(page.getByRole("heading", { level: 1, name: AMENDING.citation })).toBeVisible();
  await expect(page).toHaveURL(/#pasal-i\/pasal-2$/);
  await expect(page.getByRole("region", { name: "Pasal 2 (Pasal I)" })).toContainText("Dua, sebagaimana diubah.");
});

test("a reference to another article of the text is a link to it", async ({ page }) => {
  await page.goto(`${documentPath(PUBLISHED.id)}/read`);

  await page.getByRole("region", { name: "Pasal 2", exact: true }).getByRole("link", { name: "Pasal 1", exact: true }).click();

  await expect(page).toHaveURL(/#pasal-1$/);
});

test("a gap the parser found is marked where it is, and Correct opens the editor on that article", async ({ page }) => {
  await page.goto(`${documentPath(GAPPY.id)}/read`);

  await expect(page.getByRole("note").filter({ hasText: "Not in the text: Pasal 2" })).toBeVisible();
  await page.getByRole("region", { name: "Pasal 3" }).getByRole("link", { name: "Correct" }).click();

  await expect(page).toHaveURL(/\/edit\?at=\d+-\d+$/);
  await expect(page.locator(".cm-selectionBackground").first()).toBeAttached();
});

test("an article's citation and link are copied as a lawyer and a colleague need them", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(`${documentPath(PUBLISHED.id)}/read`);
  const first = page.getByRole("region", { name: "Pasal 1", exact: true });

  await first.getByRole("button", { name: "Copy Citation" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Citation of Pasal 1 copied." })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`Pasal 1 ${PUBLISHED.citation}`);

  await first.getByRole("button", { name: "Copy Link" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/\/read\?text=[0-9a-f]{64}&at=pasal-1#pasal-1$/);
});

test("the official PDF opens beside the text on a wide screen", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${documentPath(PUBLISHED.id)}/read`);

  await page.getByRole("link", { name: "Show PDF Beside" }).click();

  await expect(page).toHaveURL(/pdf=1/);
  await expect(page.locator('iframe[name="pdf-view"]')).toBeVisible();
  const second = page.getByRole("region", { name: "Pasal 2", exact: true });
  await expect(second.getByRole("link", { name: "Page 2" })).toHaveAttribute("target", "pdf-view");
  const pageTwo = page.getByRole("article", { name: "Text" }).getByRole("link", { name: "Page 2" });
  await expect(pageTwo).toHaveCount(2); // Pasal 2's own, and where page 2 starts in the text, after Pasal 1
  for (const link of await pageTwo.all()) {
    await expect(link).toHaveAttribute("target", "pdf-view");
  }
});
