import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { REVIEWS } from "@/test/samples";

import { ReviewView } from "./review-view";

vi.mock("@/app/(console)/actions", () => ({ decideReview: vi.fn(), signOut: vi.fn() }));

const COUNTS: [string, number][] = [
  ["conflict", 0],
  ["unresolved_citation", 1],
  ["quarantine", 0],
];

describe("the review queues", () => {
  it("shows each queue with its count, and why items land in the one open", () => {
    render(<ReviewView page={REVIEWS} counts={COUNTS} />);

    const tabs = within(screen.getByRole("navigation", { name: "Review queues" }));
    expect(tabs.getByRole("link", { name: /Unlinked Citations/ }).getAttribute("aria-current")).toBe("page");
    expect(screen.getByText(/The document cites something that names no document/)).toBeTruthy();
  });

  it("lists each item with its document and a decision form needing a note", () => {
    render(<ReviewView page={REVIEWS} counts={COUNTS} />);

    const item = within(screen.getByRole("list", { name: "Items waiting for review" }));
    expect(item.getByRole("link", { name: "ojk:pojk:2018:35" })).toBeTruthy();
    expect(item.getByText(/Keputusan Presiden Nomor 84\/P/)).toBeTruthy();
    expect(item.getByLabelText("Note")).toHaveProperty("required", true);
    expect(item.getByRole("button", { name: "Mark Resolved" })).toBeTruthy();
    expect(item.getByRole("button", { name: "Dismiss" })).toBeTruthy();
  });

  it("says so when a queue is empty", () => {
    render(<ReviewView page={{ ...REVIEWS, kind: "conflict", rows: [], total: 0 }} counts={COUNTS} />);

    expect(screen.getByText(/Nothing waits here/)).toBeTruthy();
  });
});
