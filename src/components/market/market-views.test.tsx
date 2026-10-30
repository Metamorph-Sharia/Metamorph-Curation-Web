import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { COMPANIES, COMPANY, COMPANY_ID, RELEASES, REPORT, SERIES } from "@/test/market-samples";

import { CompanyList, CompanyPageView } from "./companies-view";
import { ReleaseList, ReportPageView } from "./publications-view";
import { SeriesPageView } from "./statistics-view";

describe("the market's records", () => {
  it("lists companies with their standing, and keeps the search when a filter or page changes", () => {
    render(<CompanyList page={COMPANIES} filters={{ q: "bina" }} />);

    expect(screen.getByRole("link", { name: "PT Fintech Bina Bangsa" }).getAttribute("href")).toBe(
      `/market/companies/${encodeURIComponent(COMPANY_ID)}`,
    );
    expect(screen.getByText("Licensed", { selector: "span" })).toBeTruthy();
    const standing = within(screen.getByRole("navigation", { name: "Standing" }));
    expect(standing.getByRole("link", { name: "Left the List" }).getAttribute("href")).toBe("/market/companies?q=bina&status=left");
    expect(screen.getByRole("link", { name: /Next/ }).getAttribute("href")).toBe("/market/companies?q=bina&page=2");
  });

  it("shows a company's licences and the passages that name it, each opening at the passage", () => {
    render(<CompanyPageView view={COMPANY} />);

    expect(screen.getByText("KEP-88/D.05/2021")).toBeTruthy();
    expect(screen.getByText(/on the newest list/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "binabangsa.co.id" }).getAttribute("href")).toBe("https://binabangsa.co.id");
    expect(screen.getByRole("link", { name: "Siaran Pers: OJK Cabut Izin Usaha" }).getAttribute("href")).toBe(
      "/market/releases/ojk%3Asiaran-pers%3A2026%3Ax#p-1",
    );
  });

  it("writes a series' figures by their period, as the source gave them, provisional ones marked", () => {
    render(<SeriesPageView view={SERIES} />);

    const rows = within(screen.getByRole("region", { name: "Figures" })).getAllByRole("row").slice(1);
    expect(rows.map((row) => row.textContent)).toEqual(["2026 Q16,187,598.6", "2026 Q26,552,068Provisional"]);
  });

  it("reads a report by its passages, each with its pages and what it names", () => {
    render(<ReportPageView view={REPORT} />);

    const passage = screen.getByRole("listitem");
    expect(passage.id).toBe("p-2");
    expect(within(passage).getByText("Pages 31–32")).toBeTruthy();
    expect(within(passage).getByRole("link", { name: "ojk:pojk:2024:40" }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2024%3A40");
    expect(within(passage).getByRole("link", { name: COMPANY_ID }).getAttribute("href")).toBe(
      `/market/companies/${encodeURIComponent(COMPANY_ID)}`,
    );
  });

  it("keeps a release search's dates on the next page", () => {
    render(<ReleaseList page={RELEASES} filters={{ q: "cabut", from: "2026-01-01" }} />);

    expect(screen.getByRole("link", { name: /Next/ }).getAttribute("href")).toBe("/market/releases?q=cabut&from=2026-01-01&page=2");
    expect((screen.getByLabelText("Published from") as HTMLInputElement).value).toBe("2026-01-01");
  });
});
