import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { READING } from "@/test/samples";

import { ReaderView } from "./reader-view";

const PDF = `/documents/ojk%3Apojk%3A2018%3A35/content/${"f".repeat(64)}`;

function article(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("the reader", () => {
  it("shows each article in full under its heading, and the chapters as printed", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    expect(screen.getByRole("heading", { name: "BAB I KETENTUAN UMUM" })).toBeTruthy();
    expect(article("Pasal 1").getByRole("heading", { name: "Pasal 1" })).toBeTruthy();
    expect(article("Pasal 1").getByText("Satu.")).toBeTruthy();
    expect(article("Pasal 3").getByText(/^Tiga, menurut/)).toBeTruthy();
  });

  it("links a reference to another article of the text, on this page or in its part", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    const third = article("Pasal 3");
    expect(third.getByRole("link", { name: "Pasal 1" }).getAttribute("href")).toBe("#pasal-1");
    expect(third.getByRole("link", { name: "Pasal 4" }).getAttribute("href")).toMatch(/read\?text=a+&part=1#pasal-4$/);
  });

  it("marks where the parser found a gap in the numbering, in the text and in the outline", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    expect(screen.getByText(/Not in the text: Pasal 2/)).toBeTruthy();
    expect(screen.getAllByText("Pasal 2 not found").length).toBeGreaterThan(0);
    expect(screen.getByText("Pasal 2 missing")).toBeTruthy();
  });

  it("says what changed an article, and links to its new wording", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    const changed = article("Pasal 3");
    expect(changed.getByText(/Diubah oleh/).textContent).toContain("effective 3 Mar 2021");
    expect(changed.getByRole("link", { name: "Read the new wording: Pasal 3 (Pasal I)" }).getAttribute("href")).toBe(
      "/documents/ojk%3Apojk%3A2021%3A3/read?at=pasal-i%2Fpasal-3#pasal-i/pasal-3",
    );
  });

  it("offers each article's link, its formal citation, its PDF page and its correction", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    const first = article("Pasal 1");
    expect(first.getByRole("button", { name: "Copy Citation" }).dataset.copy).toBe("Pasal 1 POJK 35/POJK.05/2018");
    expect(first.getByRole("button", { name: "Copy Link" }).dataset.copy).toContain("read?text=");
    const page = first.getAllByRole("link", { name: /Page 2/ })[0];
    expect([page.getAttribute("href"), page.getAttribute("target")]).toEqual([`${PDF}#page=2`, "_blank"]);
    expect(first.getByRole("link", { name: "Correct" }).getAttribute("href")).toContain("/edit?at=10-40");
  });

  it("opens PDF pages beside the text when the PDF is shown there", () => {
    render(<ReaderView reading={READING} pdfBeside />);

    expect(screen.getByTitle(/the official file/).getAttribute("name")).toBe("pdf-view");
    expect(article("Pasal 1").getAllByRole("link", { name: /Page 2/ })[0].getAttribute("target")).toBe("pdf-view");
    expect(screen.getAllByRole("link", { name: "Hide PDF" })).toHaveLength(1);
  });

  it("reads a long text a part at a time: the outline links into other parts", () => {
    render(<ReaderView reading={READING} pdfBeside={false} />);

    const outline = within(screen.getAllByRole("navigation", { name: "Outline", hidden: true })[0]);
    expect(outline.getByRole("link", { name: /Pasal 4/ }).getAttribute("href")).toMatch(/part=1#pasal-4$/);
    expect(outline.getByRole("link", { name: /Pasal 1/ }).getAttribute("href")).toBe("#pasal-1");
    expect(screen.getAllByRole("link", { name: /Next Part/ })).toHaveLength(2);
  });
});
