import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DOC, HELD } from "@/test/samples";

import { HeldView } from "./held-view";

describe("the held list", () => {
  it("filters by check, counting each, and marks the filter in use", () => {
    render(<HeldView page={{ ...HELD, check: "structure" }} />);

    const filters = within(screen.getByRole("navigation", { name: "Held by check" }));
    expect(filters.getByRole("link", { name: "All" }).getAttribute("href")).toBe("/held");
    const structure = filters.getByRole("link", { name: /Structure/ });
    expect(structure.getAttribute("aria-current")).toBe("page");
    expect(structure.getAttribute("href")).toBe("/held?check=structure");
    expect(structure.textContent).toContain("1");
    expect(screen.getByText("Fix it at its source or in the parser, or approve the problems as they are.")).toBeTruthy();
  });

  it("says why each document is held, and which version the assistant still sees", () => {
    render(<HeldView page={HELD} />);

    const [first, second] = within(screen.getByRole("list", { name: "Held documents" }))
      .getAllByRole("listitem")
      .filter((item) => item.parentElement?.getAttribute("aria-label") === "Held documents")
      .map((item) => within(item));
    expect(first.getByRole("link", { name: DOC }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2019%3A10");
    expect(first.getByText("Structure: no Pasal found")).toBeTruthy();
    expect(first.getByText(/Last published 19 Oct 2026: the assistant still sees that version/)).toBeTruthy();
    expect(second.getByText(/Never published/)).toBeTruthy();
  });

  it("says so when nothing is held", () => {
    render(<HeldView page={{ ...HELD, rows: [], total: 0 }} />);

    expect(screen.getByText(/Nothing is held here/)).toBeTruthy();
  });
});
