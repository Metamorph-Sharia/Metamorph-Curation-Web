import { describe, expect, it } from "vitest";

import { isCurrent } from "./nav-links";

describe("which page the navigation marks as current", () => {
  it("marks a page on itself and below it", () => {
    expect(isCurrent("/documents", "/documents/ojk%3Apojk%3A2019%3A10")).toBe(true);
    expect(isCurrent("/held", "/held")).toBe(true);
    expect(isCurrent("/", "/held")).toBe(false);
  });

  it("keeps Add Document apart from Documents", () => {
    expect(isCurrent("/documents/new", "/documents/new")).toBe(true);
    expect(isCurrent("/documents", "/documents/new")).toBe(false);
  });
});
