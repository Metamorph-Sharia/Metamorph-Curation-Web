import { describe, expect, it } from "vitest";

import { companyHref, datasetHref, marketListHref, releaseHref, reportHref, seriesHref } from "./routes";

describe("where the market's records live in the console", () => {
  it("encodes each ID once, so its colons and equals signs survive the path", () => {
    expect(companyHref("ojk:lpbbti:kep-88-d.05-2021")).toBe("/market/companies/ojk%3Alpbbti%3Akep-88-d.05-2021");
    expect(seriesHref("bps:table:2790:annual:vervar=6109")).toBe("/market/series/bps%3Atable%3A2790%3Aannual%3Avervar%3D6109");
    expect(datasetHref("bi:seki:tabel1_1", 2)).toBe("/market/datasets/bi%3Aseki%3Atabel1_1?page=2");
    expect(reportHref("ojk:lpksi:2025")).toBe("/market/reports/ojk%3Alpksi%3A2025");
    expect(releaseHref("ojk:siaran-pers:2026:x")).toBe("/market/releases/ojk%3Asiaran-pers%3A2026%3Ax");
  });

  it("keeps a list's query and filters in the URL, leaving out what is empty", () => {
    expect(marketListHref("companies", { q: "bina", status: "licensed", page: 2 })).toBe("/market/companies?q=bina&status=licensed&page=2");
    expect(marketListHref("datasets", { q: "", page: 1 })).toBe("/market/datasets");
  });
});
