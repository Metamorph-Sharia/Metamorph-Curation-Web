import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DOCUMENT } from "@/test/samples";

import { SearchView } from "./search-view";

describe("document search", () => {
  it("lists each match with its citation, title and status", () => {
    render(<SearchView query="10/POJK" results={[DOCUMENT.summary, { ...DOCUMENT.summary, id: "x:y:1", suppressed: true }]} />);

    expect(screen.getAllByRole("link", { name: /ojk:pojk:2019:10/ })[0].getAttribute("href")).toBe(
      "/documents/ojk%3Apojk%3A2019%3A10",
    );
    expect(screen.getAllByText("POJK 10/POJK.05/2019")).toHaveLength(2);
    expect(screen.getByText("Suppressed")).toBeTruthy();
  });

  it("says when nothing matches, and asks for a query before one is given", () => {
    const { rerender } = render(<SearchView query="zzz" results={[]} />);
    expect(screen.getByText(/No document matches “zzz”/)).toBeTruthy();

    rerender(<SearchView query="" results={[]} />);
    expect(screen.getByText(/Search by ID, citation, title or alias/)).toBeTruthy();
  });
});
