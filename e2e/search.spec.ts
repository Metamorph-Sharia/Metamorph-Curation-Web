import { expect, test } from "@playwright/test";

import { AMENDING, freshWorld, PUBLISHED, signedIn, TO_CORRECT } from "./world";

test.beforeAll(freshWorld);

test.beforeEach(async ({ page }) => signedIn(page));

test("words in the published text find the articles that hold them, and open them in the reader", async ({ page }) => {
  await page.goto("/documents");
  await page.getByRole("searchbox", { name: "Search" }).fill("sebagaimana diubah");
  await page.getByRole("button", { name: "Search", exact: true }).click();

  await page.getByRole("navigation", { name: "Results" }).getByRole("link", { name: /Articles/ }).click();
  await expect(page).toHaveURL("/documents?q=sebagaimana+diubah&kind=articles");
  const hit = page.getByRole("list", { name: "Matching articles" }).getByRole("listitem").first();
  await expect(hit).toContainText(AMENDING.citation);
  await expect(hit.locator("mark")).toHaveText(["sebagaimana", "diubah"]);

  await hit.getByRole("link", { name: "Pasal 2", exact: true }).click();
  await expect(page.getByRole("region", { name: "Pasal 2 (Pasal I)" })).toBeVisible();
});

test("filters narrow the documents, count each value, and come off one by one", async ({ page }) => {
  await page.goto("/documents");
  await expect(page.getByText("5 documents in the registry, newest first.", { exact: false })).toBeVisible();

  await page.getByRole("combobox", { name: "Publishing" }).selectOption("held");
  await page.getByRole("button", { name: "Apply Filters" }).click();

  await expect(page).toHaveURL("/documents?state=held");
  const listed = page.getByRole("list", { name: "Matching documents" });
  await expect(listed.getByRole("link", { name: TO_CORRECT.citation })).toBeVisible();
  await expect(listed.getByRole("link", { name: PUBLISHED.citation })).toHaveCount(0);

  await page.getByRole("link", { name: /Publishing: Held/ }).click();
  await expect(page).toHaveURL("/documents");
});

test("a series is browsed by year, with the numbers the registry doesn't hold marked", async ({ page }) => {
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Browse" }).click();
  await page.getByRole("region", { name: "OJK" }).getByRole("link", { name: /POJK/ }).click();

  await expect(page.getByRole("heading", { level: 1, name: "OJK POJK" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Years" }).getByRole("link", { name: /2021/ })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("note")).toHaveText("Not held: POJK 1 of 2021");

  await page.getByRole("navigation", { name: "Years" }).getByRole("link", { name: /2018/ }).click();
  await expect(page).toHaveURL("/browse/ojk/pojk?year=2018");
  await expect(page.getByRole("link", { name: PUBLISHED.citation })).toBeVisible();
});
