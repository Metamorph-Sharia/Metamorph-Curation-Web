import { expect, test } from "@playwright/test";

import { freshWorld, signedIn } from "./world";

test.beforeAll(freshWorld);
test.beforeEach(async ({ page }) => signedIn(page));
test.setTimeout(120_000);

// The longest text the platform holds is 1.8 MB (an omnibus law). It must load, edit and save like any other.
const PAGES = 600;
const LARGE = Array.from(
  { length: PAGES },
  (_, n) => `<!-- page ${n + 1} -->\nPasal ${n + 1}\n${"Ketentuan mengenai penyelenggaraan usaha diatur lebih lanjut. ".repeat(48)}\n`,
).join("\n");

test("a 1.8 MB paged text is added, opened in the editor, corrected at its end, and saved", async ({ page }) => {
  expect(LARGE.length).toBeGreaterThan(1_800_000);
  await page.goto("/documents/new");
  await page.getByRole("textbox", { name: "Canonical ID" }).fill("id:uu:2023:6");
  await page.getByRole("textbox", { name: "Citation" }).fill("UU 6/2023");
  await page.getByRole("combobox", { name: "Kind" }).selectOption("law");
  await page.getByRole("textbox", { name: "Title" }).fill("Penetapan Perppu Cipta Kerja menjadi Undang-Undang");
  await page.getByRole("textbox", { name: "Source URL" }).fill("https://peraturan.go.id/uu-6-2023.pdf");
  await page.getByLabel("File").setInputFiles({ name: "uu-6-2023.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7") });
  await page.getByRole("textbox", { name: "Text" }).fill(LARGE);
  await page.getByRole("textbox", { name: "Reason" }).fill("Uji teks terpanjang");
  await page.getByRole("button", { name: "Add Document" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Document added." })).toBeVisible({ timeout: 30_000 });

  const started = Date.now();
  await page.getByRole("region", { name: "Files & Texts" }).getByRole("link", { name: "Edit Text" }).click();
  await expect(page.locator(".cm-line").first()).toBeVisible();
  const opened = Date.now() - started;

  await page.locator(".cm-content").click();
  await page.keyboard.press("ControlOrMeta+End");
  await page.keyboard.type("Ditetapkan di Jakarta.");
  await page.getByRole("textbox", { name: "Reason" }).fill("Penutup dari PDF resmi");
  await page.getByRole("button", { name: "Save Correction" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Text corrected" })).toBeVisible({ timeout: 30_000 });
  console.log(`editor open with 1.8 MB: ${opened} ms`);
  expect(opened).toBeLessThan(5_000);
});
