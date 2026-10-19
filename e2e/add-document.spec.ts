import { expect, type Page, test } from "@playwright/test";

import { freshWorld, signedIn } from "./world";

test.beforeAll(freshWorld);
test.beforeEach(async ({ page }) => signedIn(page));

const PDF = Buffer.from("%PDF-1.7 POJK 5/POJK.05/2022");

async function fillDocument(page: Page, documentId: string) {
  await page.goto("/documents/new");
  await page.getByRole("textbox", { name: "Canonical ID" }).fill(documentId);
  await page.getByRole("textbox", { name: "Citation" }).fill("POJK 5/POJK.05/2022");
  await page.getByRole("textbox", { name: "Title" }).fill("Perizinan Usaha Perusahaan Modal Ventura");
  await page.getByRole("textbox", { name: "Source URL" }).fill("https://ojk.go.id/id/regulasi/pojk-5-2022.pdf");
  await page.getByLabel("File").setInputFiles({ name: "pojk-5-2022.pdf", mimeType: "application/pdf", buffer: PDF });
  await page.getByRole("textbox", { name: "Text" }).fill("PERATURAN OTORITAS JASA KEUANGAN\nMEMUTUSKAN:\nPasal 1\nSatu.\nPasal 2\nDua.\n");
  await page.getByRole("textbox", { name: "Reason" }).fill("Belum ada di sumber mana pun");
}

test("a field the platform refuses is marked beside it, and what was typed stays", async ({ page }) => {
  await fillDocument(page, "pojk lima tahun 2022");

  await page.getByRole("button", { name: "Add Document" }).click();

  const id = page.getByRole("textbox", { name: "Canonical ID" });
  await expect(id).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#document_id-error")).toContainText("canonical");
  await expect(page.getByRole("textbox", { name: "Title" })).toHaveValue("Perizinan Usaha Perusahaan Modal Ventura");
});

test("a document is added with its file uploaded straight to the object store, and published", async ({ page }) => {
  await fillDocument(page, "ojk:pojk:2022:5");

  await page.getByRole("button", { name: "Add Document" }).click();

  await expect(page).toHaveURL(/\/documents\/ojk%3Apojk%3A2022%3A5\?done=added/);
  await expect(page.getByRole("status").filter({ hasText: "Document added." })).toBeVisible();
  await expect(page.getByRole("main").locator("header").getByText("Published", { exact: true })).toBeVisible();

  const open = await page.getByRole("link", { name: /Open File/ }).getAttribute("href");
  const link = (await page.request.get(open!, { maxRedirects: 0 })).headers()["location"];
  expect(Buffer.from(await (await page.request.get(link)).body())).toEqual(PDF);
});
