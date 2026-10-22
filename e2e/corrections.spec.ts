import { expect, test } from "@playwright/test";

import { documentPath, freshWorld, PUBLISHED, signedIn, TO_CORRECT, UNIDENTIFIED } from "./world";

test.beforeAll(freshWorld);
test.beforeEach(async ({ page }) => signedIn(page));

test("a curator types a lost article heading into the text, and the document passes and is published", async ({ page }) => {
  await page.goto(documentPath(TO_CORRECT.id));
  await page.getByRole("region", { name: "Files & Texts" }).getByRole("link", { name: "Edit Text" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Correct the Text" })).toBeVisible();

  await page.locator(".cm-line", { hasText: "Satu." }).click();
  await page.keyboard.press("Home");
  await page.keyboard.type("Pasal 1");
  await page.keyboard.press("Enter");
  await page.getByRole("textbox", { name: "Reason" }).fill("PDF resmi, halaman 2");
  await page.getByRole("button", { name: "Save Correction" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Text corrected" })).toBeVisible();
  await expect(page.getByRole("status", { name: "Publishing" })).toHaveCount(0);
  await expect(page.getByRole("main").locator("header").getByText("Published", { exact: true })).toBeVisible();

  await page.getByRole("link", { name: "See the changes" }).click();
  await expect(page.getByLabel("Changes")).toContainText("+Pasal 1");
});

test("a text correction is withdrawn, and the source's text is back", async ({ page }) => {
  await page.goto(documentPath(TO_CORRECT.id));
  const content = page.getByRole("region", { name: "Files & Texts" });

  await content.getByRole("textbox", { name: "Reason" }).fill("Teks sumber ternyata benar");
  await content.getByRole("button", { name: "Withdraw Correction" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Correction withdrawn" })).toBeVisible();
  await expect(page.getByRole("status", { name: "Publishing" })).toContainText("Structure: no Pasal found");
});

test("a field is corrected, and a value that can't be applied is refused beside the form", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));
  const fields = page.getByRole("region", { name: "Fields" });

  await fields.getByRole("combobox", { name: "Field" }).selectOption("effective_on");
  await fields.getByRole("textbox", { name: "Correct Value" }).fill("28/12/2018");
  await fields.getByRole("textbox", { name: "Reason" }).last().fill("Lembaran Negara 2018");
  await fields.getByRole("button", { name: "Save Correction" }).click();
  await expect(fields.getByRole("alert")).toContainText("YYYY-MM-DD");

  await fields.getByRole("textbox", { name: "Correct Value" }).fill("2018-12-28");
  await fields.getByRole("button", { name: "Save Correction" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Correction saved and published." })).toBeVisible();
  await expect(fields.getByRole("row", { name: /Effective/ })).toContainText("28 Dec 2018");
});

test("an unidentified document is given its ID, and is published under it", async ({ page }) => {
  await page.goto(documentPath(UNIDENTIFIED.id));
  const manage = page.getByRole("region", { name: "Manage" });

  await manage.getByRole("textbox", { name: "New ID" }).fill("OJK:POJK:2021:3");
  await manage.getByRole("textbox", { name: "Reason" }).first().fill("Kop dokumen: 3/POJK.05/2021");
  await manage.getByRole("button", { name: "Assign ID" }).click();

  await expect(page).toHaveURL(/\/documents\/ojk%3Apojk%3A2021%3A3\?done=renamed/);
  await expect(page.getByRole("status").filter({ hasText: "ID assigned." })).toBeVisible();
  await expect(page.getByRole("main").locator("header").getByText("Published", { exact: true })).toBeVisible();
});

test("suppressing needs an explicit yes; a suppressed document can be restored", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));
  const manage = page.getByRole("region", { name: "Manage" });

  await manage.getByRole("textbox", { name: "Reason" }).last().fill("Duplikat dari dokumen lain");
  await manage.getByLabel(/Yes, stop the assistant citing this document/).check();
  await manage.getByRole("button", { name: "Suppress Document" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Document suppressed." })).toBeVisible();
  await expect(page.getByRole("status", { name: "Publishing" })).toContainText("Suppressed by e2e");

  await manage.getByRole("textbox", { name: "Reason" }).last().fill("Bukan duplikat");
  await manage.getByRole("button", { name: "Restore Document" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Document restored." })).toBeVisible();
});
