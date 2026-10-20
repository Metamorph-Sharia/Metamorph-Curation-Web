import { describe, expect, it } from "vitest";

import { excerptParts, facetValueLabel, numberGaps, searchHref, type SearchState } from "./search";

const STATE: SearchState = { q: "wakaf", kind: "articles", issuer: "ojk", year: "2021", page: 3 };

describe("where a search is", () => {
  it("keeps the query and filters in the URL, and starts again from page one when they change", () => {
    expect(searchHref(STATE, { page: 4 })).toBe("/documents?q=wakaf&kind=articles&issuer=ojk&year=2021&page=4");
    expect(searchHref(STATE, { year: undefined })).toBe("/documents?q=wakaf&kind=articles&issuer=ojk");
    expect(searchHref(STATE, { kind: "documents" })).toBe("/documents?q=wakaf&issuer=ojk&year=2021");
    expect(searchHref({}, {})).toBe("/documents");
  });
});

describe("a facet's values, as curators name them", () => {
  it("names issuers and families as they are written, statuses in Indonesian, and states plainly", () => {
    expect(facetValueLabel("issuer", "dsnmui")).toBe("DSN-MUI");
    expect(facetValueLabel("issuer", "id")).toBe("National");
    expect(facetValueLabel("family", "seojk")).toBe("SEOJK");
    expect(facetValueLabel("family", "fatwa")).toBe("Fatwa");
    expect(facetValueLabel("family", "peraturan-ppatk")).toBe("PERATURAN-PPATK");
    expect(facetValueLabel("status", "revoked")).toBe("Dicabut");
    expect(facetValueLabel("state", "unpublished")).toBe("Not published");
    expect(facetValueLabel("year", "2021")).toBe("2021");
  });
});

describe("an article's excerpt", () => {
  it("marks the matching words the API put between « and »", () => {
    expect(excerptParts("menghimpun dana «wakaf» «uang» dari")).toEqual([
      { text: "menghimpun dana ", match: false },
      { text: "wakaf", match: true },
      { text: " ", match: false },
      { text: "uang", match: true },
      { text: " dari", match: false },
    ]);
  });
});

describe("a series' numbering", () => {
  it("finds the numbers missing in a year, so a coverage gap shows", () => {
    expect(numberGaps(["1", "2", "4", "7", "7A", "8"])).toEqual(
      new Map([
        ["4", [3]],
        ["7", [5, 6]],
      ]),
    );
    expect(numberGaps(["3", "4"])).toEqual(new Map([["3", [1, 2]]]));
    expect(numberGaps([])).toEqual(new Map());
  });
});
