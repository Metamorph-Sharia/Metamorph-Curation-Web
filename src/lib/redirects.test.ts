import { describe, expect, it } from "vitest";

import { safeNext } from "./redirects";

describe("where to go after signing in", () => {
  it("returns to the page the curator asked for", () => {
    expect(safeNext("/held?check=structure")).toBe("/held?check=structure");
  });

  it("never leaves this app", () => {
    for (const elsewhere of ["https://evil.example", "//evil.example", "/\\evil.example", "javascript:alert(1)", ""]) {
      expect(safeNext(elsewhere)).toBe("/");
    }
    expect(safeNext(null)).toBe("/");
  });
});
