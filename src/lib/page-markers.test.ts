import { describe, expect, it } from "vitest";

import { pageMarkerRanges } from "./page-markers";

describe("where a paged text's page markers are", () => {
  it("finds each marker line, as its own whole line", () => {
    const text = "<!-- page 1 -->\nPasal 1\n<!-- page 2 -->\nPasal 2\n";

    expect(pageMarkerRanges(text)).toEqual([
      [0, 15],
      [24, 39],
    ]);
  });

  it("doesn't take a marker written inside a line, or a different comment, for one", () => {
    expect(pageMarkerRanges("Lihat <!-- page 3 --> di sini\n<!-- catatan -->\n")).toEqual([]);
  });
});
