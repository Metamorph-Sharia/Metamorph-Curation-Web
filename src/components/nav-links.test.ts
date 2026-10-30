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

describe("the market's place in the navigation", () => {
  it("marks Market on its pages and below them", () => {
    expect(isCurrent("/market", "/market")).toBe(true);
    expect(isCurrent("/market", "/market/companies/ojk%3Alpbbti%3Akep-1")).toBe(true);
    expect(isCurrent("/browse", "/market")).toBe(false);
  });
});
