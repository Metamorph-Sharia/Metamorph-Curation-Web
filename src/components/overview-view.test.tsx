import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { Dashboard } from "@/lib/api/types";

import { OverviewView } from "./overview-view";

const DASHBOARD: Dashboard = {
  health_status: "warning",
  health_taken_at: "2026-10-19T02:00:00+00:00",
  checks: [
    { name: "ojk", severity: "ok", detail: "last loaded 2 h ago (every 24 h)" },
    { name: "bi", severity: "warning", detail: "no load for 3 days (every 24 h)" },
  ],
  documents_by_issuer: [
    ["ojk", 973],
    ["id", 1180],
  ],
  published: 2497,
  open_reviews: [
    ["conflict", 0],
    ["unresolved_citation", 235],
    ["quarantine", 2],
  ],
  recent_bundles: [
    {
      connector: "ojk",
      run_id: "r-77",
      state: "loaded",
      received_at: "2026-10-19T01:12:00+00:00",
      loaded: 14,
      unchanged: 959,
      quarantined: 0,
    },
  ],
  held: 95,
  held_published: 4,
  gaps: 50,
};

function section(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("the overview", () => {
  it("leads with what the publish gate holds back, and which of those the assistant still sees", () => {
    render(<OverviewView dashboard={DASHBOARD} />);

    const held = section("Held Back from Publishing");
    expect(held.getByRole("link", { name: /95/ }).getAttribute("href")).toBe("/held");
    expect(held.getByText(/4 of them still have an earlier version published/)).toBeTruthy();
  });

  it("says plainly when none, or one, of them is still published", () => {
    const { rerender } = render(<OverviewView dashboard={{ ...DASHBOARD, held_published: 0 }} />);
    expect(section("Held Back from Publishing").getByText(/None of them has an earlier version published/)).toBeTruthy();

    rerender(<OverviewView dashboard={{ ...DASHBOARD, held_published: 1 }} />);
    expect(section("Held Back from Publishing").getByText(/1 of them still has an earlier version published/)).toBeTruthy();
  });

  it("counts what waits for review, queue by queue", () => {
    render(<OverviewView dashboard={DASHBOARD} />);

    const review = section("Waiting for Review");
    const citations = review.getByRole("link", { name: /Unlinked Citations/ });
    expect(citations.textContent).toContain("235");
    expect(citations.getAttribute("href")).toBe("/review?kind=unresolved_citation");
    expect(review.getByRole("link", { name: /Conflicts/ }).textContent).toContain("0");
    const gaps = review.getByRole("link", { name: /Numbering Gaps/ });
    expect(gaps.textContent).toContain("50");
    expect(gaps.getAttribute("href")).toBe("/gaps");
  });

  it("shows each ingestion check with its severity, and when the check ran", () => {
    render(<OverviewView dashboard={DASHBOARD} />);

    const health = section("Ingestion Health");
    expect(health.getByText("Checked 19 Oct 2026, 02:00 UTC")).toBeTruthy();
    expect(health.getByText("no load for 3 days (every 24 h)")).toBeTruthy();
    expect(health.getAllByText("Warning")).toHaveLength(2); // the overall status and the bi check
    expect(health.getByText("OK")).toBeTruthy();
  });

  it("totals the registry by issuer and what is published", () => {
    render(<OverviewView dashboard={DASHBOARD} />);

    const registry = section("Registry");
    expect(registry.getByText("1,180")).toBeTruthy();
    expect(registry.getByText("2,497")).toBeTruthy();
  });

  it("lists the latest loads", () => {
    render(<OverviewView dashboard={DASHBOARD} />);

    const loads = section("Latest Loads");
    expect(loads.getByText("959")).toBeTruthy();
    expect(loads.getByText("Loaded")).toBeTruthy();
  });

  it("says what to do when nothing has run yet", () => {
    render(
      <OverviewView
        dashboard={{ ...DASHBOARD, health_status: null, health_taken_at: null, checks: [], recent_bundles: [] }}
      />,
    );

    expect(section("Ingestion Health").getByText(/No health check has run yet/)).toBeTruthy();
    expect(section("Latest Loads").getByText(/No bundle has been loaded yet/)).toBeTruthy();
  });
});
