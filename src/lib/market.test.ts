import { describe, expect, it } from "vitest";

import {
  companyStatusLabel,
  formatFigure,
  formatPeriod,
  frequencyLabel,
  idList,
  industryKey,
  parseIndustryKey,
  releaseRange,
} from "./market";

describe("the market pages' rules", () => {
  it("reads a list of IDs a curator typed one per line, or separated by commas, each once", () => {
    expect(idList(" ojk:pojk:2024:40\nojk:seojk:2025:19, ojk:pojk:2024:40\n\n")).toEqual(["ojk:pojk:2024:40", "ojk:seojk:2025:19"]);
    expect(idList("   ")).toEqual([]);
  });

  it("names a company's standing and a series' frequency as curators say them", () => {
    expect(companyStatusLabel("licensed")).toBe("Licensed");
    expect(companyStatusLabel("left")).toBe("Left the List");
    expect(frequencyLabel("semiannual")).toBe("Half-yearly");
  });

  it("writes a period as its frequency names it, from the day it starts", () => {
    expect(formatPeriod("2026-04-01", "quarterly")).toBe("2026 Q2");
    expect(formatPeriod("2026-07-01", "semiannual")).toBe("2026 H2");
    expect(formatPeriod("2025-01-01", "annual")).toBe("2025");
    expect(formatPeriod("2026-08-01", "monthly")).toBe("Aug 2026");
  });

  it("writes a figure as the source gave it, digits grouped, never rounded away", () => {
    expect(formatFigure(6187598.6)).toBe("6,187,598.6");
    expect(formatFigure(0.123456)).toBe("0.123456");
  });

  it("keeps an industry's source and name together in one form value", () => {
    const key = industryKey("ojk:portal", "Bank Umum Syariah");
    expect(parseIndustryKey(key)).toEqual({ source: "ojk:portal", name: "Bank Umum Syariah" });
    expect(parseIndustryKey("no separator")).toBeNull();
  });

  it("bounds releases by the dates a curator typed, ignoring what isn't a date", () => {
    expect(releaseRange("2026-01-01", "")).toEqual({ from: "2026-01-01", to: undefined });
    expect(releaseRange("tomorrow", "2026-12-31")).toEqual({ from: undefined, to: "2026-12-31" });
  });
});
