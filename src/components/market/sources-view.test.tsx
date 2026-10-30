import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BPRS, SOURCES } from "@/test/market-samples";

import { SourcesView } from "./sources-view";

vi.mock("@/app/(console)/market/actions", () => ({
  setRegisterLinks: vi.fn(),
  setSource: vi.fn(),
  setIndustry: vi.fn(),
  withdrawIndustry: vi.fn(),
  setSector: vi.fn(),
  withdrawSector: vi.fn(),
}));

function section(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("the market's sources and links", () => {
  it("shows what a register's links name, each a link to where it lives", () => {
    render(<SourcesView sources={SOURCES} />);

    const registers = section("Registers");
    expect(registers.getByRole("link", { name: "ojk:pojk:2024:40" }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2024%3A40");
    expect(registers.getByRole("link", { name: "ojk:roadmap:2023:lpbbti" }).getAttribute("href")).toBe("/market/reports");
    expect(registers.getByRole("link", { name: "166 companies" }).getAttribute("href")).toBe("/market/companies?register=ojk%3Alpbbti");
  });

  it("tells a curator where SEKI's edition is downloaded by hand", () => {
    render(<SourcesView sources={SOURCES} />);

    const sources = section("Statistics Sources");
    const page = sources.getByRole("link", { name: SOURCES.sources[0].download_page ?? "" });
    expect(page.getAttribute("href")).toBe("https://www.bi.go.id/id/statistik/ekonomi-keuangan/seki/Default.aspx");
    expect(sources.getByText(/SEKI_SEPTEMBER_2026\.zip/)).toBeTruthy();
    expect(sources.getAllByText("Downloaded by hand")).toHaveLength(1); // only the source that needs it
  });

  it("offers to link only the industries the sources name that aren't linked yet", () => {
    render(<SourcesView sources={SOURCES} />);

    const industries = section("Industries");
    expect(industries.getByText("Link an Industry (1 Named, Not Linked)")).toBeTruthy();
    const choices = within(industries.getByLabelText("Industry, as its source names it")).getAllByRole("option");
    expect(choices.map((option) => option.textContent)).toEqual([`${BPRS} (ojk:portal)`]);
  });

  it("says when no sector gathers industries yet, and offers to add one", () => {
    render(<SourcesView sources={SOURCES} />);

    const sectors = section("Sectors");
    expect(sectors.getByText(/No sector yet/)).toBeTruthy();
    expect(sectors.getAllByRole("checkbox").map((box) => box.closest("label")?.textContent)).toEqual([
      `${BPRS} ojk:portal`,
      "Bank Umum Syariah ojk:portal",
    ]);
  });
});
