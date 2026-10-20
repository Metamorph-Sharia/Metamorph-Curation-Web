import { expect, test } from "@playwright/test";

import { documentPath, freshWorld, GAPPY, PUBLISHED, signedIn, TO_CORRECT, UNIDENTIFIED } from "./world";

test.beforeAll(freshWorld);

test.beforeEach(async ({ page }) => signedIn(page));

test("the held list says why each document is held, and filters by check", async ({ page }) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Held" }).click();

  const held = page.getByRole("list", { name: "Held documents" });
  await expect(held.getByRole("link", { name: GAPPY.id })).toBeVisible();
  await expect(held.getByRole("link", { name: UNIDENTIFIED.id })).toBeVisible();

  await page.getByRole("navigation", { name: "Held by check" }).getByRole("link", { name: /Unidentified/ }).click();

  await expect(page).toHaveURL("/held?check=identity");
  await expect(held.getByRole("link", { name: UNIDENTIFIED.id })).toBeVisible();
  await expect(held.getByRole("link", { name: GAPPY.id })).toHaveCount(0);
});

test("a curator approves a genuine gap, and the document is published", async ({ page }) => {
  await page.goto(documentPath(GAPPY.id));
  const publishing = page.getByRole("status", { name: "Publishing" });
  await expect(publishing).toContainText("Held back from publishing");
  await expect(publishing).toContainText("Structure: Pasal 2 missing");

  const content = page.getByRole("region", { name: "Files & Texts" });
  await content.getByRole("textbox", { name: "Reason" }).fill("Pasal 2 dicabut oleh POJK 12/2021");
  await content.getByRole("button", { name: "Approve as Is" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Approved." })).toBeVisible();
  await expect(publishing).toHaveCount(0);
  await expect(content.getByText("Approved as is")).toBeVisible();
  await page.goto("/held");
  await expect(page.getByRole("link", { name: GAPPY.id })).toHaveCount(0);
  await expect(page.getByRole("link", { name: TO_CORRECT.id })).toBeVisible();
});

test("an approval without a reason is refused beside its form", async ({ page }) => {
  await page.goto(documentPath(TO_CORRECT.id));
  const content = page.getByRole("region", { name: "Files & Texts" });

  await content.getByRole("textbox", { name: "Reason" }).fill("   "); // passes the browser's `required`; the API refuses it
  await content.getByRole("button", { name: "Approve as Is" }).click();

  await expect(content.getByRole("alert")).toHaveText(/Add a reason/);
  await expect(page.getByRole("status", { name: "Publishing" })).toContainText("Held back");
});

test("search finds a document by its citation", async ({ page }) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Documents" }).click();
  await page.getByRole("searchbox", { name: "Search" }).fill("35/POJK.05/2018");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  await page.getByRole("list", { name: "Matching documents" }).getByRole("link", { name: PUBLISHED.citation, exact: true }).click();

  await expect(page.getByRole("heading", { level: 1, name: PUBLISHED.citation })).toBeVisible();
  await expect(page.getByRole("main").locator("header").getByText("Published", { exact: true })).toBeVisible();
});

test("a file opens through a short-lived link straight to the object store", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));
  const href = await page.getByRole("link", { name: /Open File/ }).getAttribute("href");

  const answer = await page.request.get(href!, { maxRedirects: 0 });

  expect(answer.status()).toBe(307);
  const link = answer.headers()["location"];
  expect(link).toMatch(/^http:\/\/localhost:8333\/metamorph-e2e\/blobs\//);
  expect((await page.request.get(link)).status()).toBe(200);
});

test("a review item is dismissed with a note, and the queue empties", async ({ page }) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Review" }).click();
  await page.getByRole("navigation", { name: "Review queues" }).getByRole("link", { name: /Unlinked Citations/ }).click();
  const items = page.getByRole("list", { name: "Items waiting for review" });
  await expect(items).toContainText("Keputusan Presiden Nomor 84/P");

  await items.getByRole("textbox", { name: "Note" }).fill("Keppres pengangkatan, bukan peraturan");
  await items.getByRole("button", { name: "Dismiss" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Review item dismissed." })).toBeVisible();
  await expect(page.getByText("Nothing waits here.")).toBeVisible();
});

test("an open citation is linked to the document it means, by hand", async ({ page }) => {
  await page.goto(documentPath(PUBLISHED.id));
  const citations = page.getByRole("region", { name: "Open Citations" });

  await citations.getByRole("textbox", { name: "Document ID" }).fill(GAPPY.id);
  await citations.getByRole("textbox", { name: "Reason" }).fill("Contoh tautan manual untuk pengujian");
  await citations.getByRole("button", { name: "Link Citation" }).click();

  await expect(page.getByRole("status").filter({ hasText: "Citation linked." })).toBeVisible();
  await expect(citations.getByText("Every citation of this document is linked.")).toBeVisible();
  const basis = page.getByRole("region", { name: "Lineage" }).getByRole("listitem").filter({ hasText: GAPPY.citation });
  await expect(basis.getByRole("link", { name: GAPPY.citation })).toBeVisible();
});
