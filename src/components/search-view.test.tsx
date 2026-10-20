import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SEARCH } from "@/test/samples";

import { SearchView } from "./search-view";

const STATE = { q: "wakaf", kind: "documents", issuer: "ojk", page: 1 };

describe("the search", () => {
  it("lists matching documents with their family, year, status in Indonesian and whether they are held", () => {
    render(<SearchView state={STATE} page={SEARCH} />);

    const list = within(screen.getByRole("list", { name: "Matching documents" }));
    expect(list.getByRole("link", { name: "POJK 10/POJK.05/2019" }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2019%3A10");
    expect(list.getByText("POJK · 2019")).toBeTruthy();
    expect(list.getByText("Berlaku")).toBeTruthy();
    expect(list.getByText("Held")).toBeTruthy();
    expect(list.getByText("Diubah")).toBeTruthy();
  });

  it("offers documents or articles, keeping the query and filters", () => {
    render(<SearchView state={STATE} page={SEARCH} />);

    const tabs = within(screen.getByRole("navigation", { name: "Results" }));
    expect(tabs.getByRole("link", { name: /Articles/ }).getAttribute("href")).toBe("/documents?q=wakaf&kind=articles&issuer=ojk");
    expect(tabs.getByRole("link", { name: /Documents/ }).getAttribute("aria-current")).toBe("page");
  });

  it("filters by each facet, counting each value, and removes a filter in use", () => {
    render(<SearchView state={STATE} page={SEARCH} />);

    const issuer = screen.getByRole("combobox", { name: "Issuer" }) as HTMLSelectElement;
    expect([...issuer.options].map((option) => option.textContent)).toEqual(["All", "OJK (2)", "BI (1)"]);
    expect(issuer.value).toBe("ojk");
    expect(issuer.getAttribute("form")).toBe("search");
    expect(screen.getByRole("link", { name: /Issuer: OJK/ }).getAttribute("href")).toBe("/documents?q=wakaf");
    expect(screen.getByRole("link", { name: /Next/ }).getAttribute("href")).toBe("/documents?q=wakaf&issuer=ojk&page=2");
  });

  it("shows each matching article's words marked, linked to the article in the reader", () => {
    const articles = {
      ...SEARCH,
      kind: "articles",
      articles: [{ document_id: "ojk:pojk:2024:26", citation: "POJK 26 Tahun 2024", title: "BPR Syariah", address: "pasal-70", label: "Pasal 70", heading: null, excerpt: "dana sosial dari «wakaf» «uang»", status: "in_force" }],
    };
    render(<SearchView state={{ ...STATE, kind: "articles" }} page={articles} />);

    const list = within(screen.getByRole("list", { name: "Matching articles" }));
    expect(list.getByRole("link", { name: "Pasal 70" }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2024%3A26/read?at=pasal-70#pasal-70");
    expect(list.getAllByText(/wakaf|uang/).map((mark) => mark.tagName)).toEqual(["MARK", "MARK"]);
  });

  it("without a query, lists every document the filters leave, and says so", () => {
    render(<SearchView state={{ kind: "documents", page: 1 }} page={{ ...SEARCH, query: "" }} />);

    expect(screen.queryByRole("navigation", { name: "Results" })).toBeNull();
    expect(screen.getByText(/2 documents in the registry, newest first/)).toBeTruthy();
  });
});
