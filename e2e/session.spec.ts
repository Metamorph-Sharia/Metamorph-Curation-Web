import { expect, test } from "@playwright/test";

import { CURATOR, freshWorld, signIn } from "./world";

test.beforeAll(freshWorld);

test("a curator who isn't signed in signs in and lands on the overview", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/sign-in\?next=%2F$/);

  await signIn(page);

  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { level: 1, name: "Overview" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Held Back from Publishing" })).toBeVisible();
  await expect(page.getByText(CURATOR.name)).toBeVisible();
  // MinerU's license: a service that uses it says so, visibly.
  await expect(page.getByRole("contentinfo").getByRole("link", { name: "MinerU" })).toHaveAttribute(
    "href",
    "https://github.com/opendatalab/MinerU",
  );
});

test("a wrong password is refused beside the form, keeping the username", async ({ page }) => {
  await page.goto("/sign-in");

  await signIn(page, `${CURATOR.password}-wrong`);

  // Next's route announcer is an (empty) alert too: take the one that says something.
  await expect(page.getByRole("alert").filter({ hasText: /\S/ })).toHaveText("The username or password is wrong.");
  await expect(page.getByLabel("Username")).toHaveValue(CURATOR.username);
  await expect(page).toHaveURL(/\/sign-in/);
});

test("signing out ends the session", async ({ page }) => {
  await page.goto("/sign-in");
  await signIn(page);
  await expect(page.getByRole("heading", { level: 1, name: "Overview" })).toBeVisible();

  await page.getByRole("button", { name: "Sign Out" }).click();

  await expect(page).toHaveURL(/\/sign-in/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/sign-in\?next=%2F$/);
});
