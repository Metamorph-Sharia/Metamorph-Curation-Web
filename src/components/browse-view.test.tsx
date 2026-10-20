import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SEARCH } from "@/test/samples";

import { SeriesList, SeriesView } from "./browse-view";

const hit = (number: string, state = "published") => ({ ...SEARCH.documents[0], id: `ojk:seojk:2021:${number}`, number, citation: `SEOJK ${number}/2021`, state });

describe("browsing", () => {
  it("lists each series by issuer, with what the registry holds of it", () => {
    render(<SeriesList rows={[{ issuer: "ojk", family: "seojk", documents: 414, first_year: 2013, last_year: 2025 }]} />);

    const ojk = within(screen.getByRole("region", { name: "OJK" }));
    expect(ojk.getByRole("link", { name: /SEOJK/ }).getAttribute("href")).toBe("/browse/ojk/seojk");
    expect(ojk.getByText("414 documents, 2013–2025")).toBeTruthy();
  });

  it("shows a year of a series by number, with the numbers it doesn't hold marked where they are missing", () => {
    const page = { issuer: "ojk", family: "seojk", years: [[2021, 3], [2020, 30]] as [number, number][], year: 2021, documents: [hit("1"), hit("2", "held"), hit("5")] };
    render(<SeriesView page={page} />);

    expect(screen.getByText(/numbers 3, 4 not held/)).toBeTruthy();
    const list = within(screen.getByRole("list", { name: "SEOJK of 2021" }));
    expect(list.getByRole("note").textContent).toBe("Not held: SEOJK 3, 4 of 2021");
    expect(list.getByText("Held")).toBeTruthy();
    const years = within(screen.getByRole("navigation", { name: "Years" }));
    expect(years.getByRole("link", { name: /2020/ }).getAttribute("href")).toBe("/browse/ojk/seojk?year=2020");
    expect(years.getByRole("link", { name: /2021/ }).getAttribute("aria-current")).toBe("page");
  });
});
