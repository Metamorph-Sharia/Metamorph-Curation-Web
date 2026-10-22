import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DOC, GAPS } from "@/test/samples";

import { GapsView } from "./gaps-view";

const note = (address: string | null, n: number) => ({ address, note: `Pasal ${n} missing` });

describe("the gaps list", () => {
  it("opens each gap in the reader, at the provision it names or at the text's start", () => {
    render(<GapsView page={GAPS} />);

    const documents = within(screen.getByRole("list", { name: "Documents with gaps" }));
    expect(documents.getByRole("link", { name: DOC }).getAttribute("href")).toBe("/documents/ojk%3Apojk%3A2019%3A10");
    expect(documents.getByRole("link", { name: "pasal-4: ayat (2) missing" }).getAttribute("href")).toBe(
      "/documents/ojk%3Apojk%3A2019%3A10/read?at=pasal-4#pasal-4",
    );
    expect(documents.getByRole("link", { name: "Pasal 3 missing" }).getAttribute("href")).toBe(
      "/documents/ojk%3Apojk%3A2019%3A10/read",
    );
  });

  it("shows a document's first gaps and keeps the rest one click away", () => {
    const notes = Array.from({ length: 8 }, (_, n) => note(null, n + 1));
    render(<GapsView page={{ ...GAPS, rows: [{ ...GAPS.rows[0], notes }] }} />);

    expect(screen.getByText("3 more gaps")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Pasal 8 missing" })).toBeTruthy();
  });

  it("says so when no published text has a gap left to review", () => {
    render(<GapsView page={{ ...GAPS, rows: [], total: 0 }} />);

    expect(screen.getByText(/No published text has a gap left to review/)).toBeTruthy();
  });
});
