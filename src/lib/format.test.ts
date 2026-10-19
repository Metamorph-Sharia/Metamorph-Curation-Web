import { describe, expect, it } from "vitest";

import { formatCount, formatDay, formatMoment, formatValue } from "./format";

describe("dates and counts, written so they can't be misread", () => {
  it("writes a day out, so 05/06 never reads as two different dates", () => {
    expect(formatDay("2026-10-15")).toBe("15 Oct 2026");
    expect(formatDay("2026-10-15T23:59:00Z")).toBe("15 Oct 2026");
  });

  it("writes a moment in UTC, the time the team shares", () => {
    expect(formatMoment("2026-10-15T04:36:12+00:00")).toBe("15 Oct 2026, 04:36 UTC");
    expect(formatMoment("2026-10-15T11:36:00+07:00")).toBe("15 Oct 2026, 04:36 UTC");
  });

  it("groups thousands", () => {
    expect(formatCount(2497)).toBe("2,497");
    expect(formatCount(0)).toBe("0");
  });
});

describe("a field's value, as the console shows it", () => {
  it("says when a value isn't set, rather than leaving a blank", () => {
    expect(formatValue(null)).toBe("Not set");
    expect(formatValue("")).toBe("Not set");
  });

  it("spells out a date, and leaves anything else as written", () => {
    expect(formatValue("2019-02-27")).toBe("27 Feb 2019");
    expect(formatValue("in_force")).toBe("in_force");
    expect(formatValue(2019)).toBe("2019");
  });
});
