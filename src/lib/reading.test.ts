import { describe, expect, it } from "vitest";

import { articleGaps, blockPieces, editRange, followsSibling, formalCitation, outline } from "./reading";
import { editHref, readerHref } from "./routes";

describe("where the reader is", () => {
  it("reads a document's main text, or another text, part or provision, with the PDF beside or not", () => {
    expect(readerHref("ojk:pojk:2019:10")).toBe("/documents/ojk%3Apojk%3A2019%3A10/read");
    expect(readerHref("ojk:pojk:2019:10", { text: "a".repeat(4), part: 2, pdf: true })).toBe(
      "/documents/ojk%3Apojk%3A2019%3A10/read?text=aaaa&part=2&pdf=1",
    );
    expect(readerHref("ojk:pojk:2022:7", { at: "pasal-i/pasal-115" })).toBe(
      "/documents/ojk%3Apojk%3A2022%3A7/read?at=pasal-i%2Fpasal-115#pasal-i/pasal-115",
    );
  });

  it("opens the editor on a provision's wording", () => {
    expect(editHref("ojk:pojk:2019:10", "b".repeat(4), [120, 360])).toBe(
      "/documents/ojk%3Apojk%3A2019%3A10/texts/bbbb/edit?at=120-360",
    );
  });
});

describe("a provision, cited as a lawyer cites it", () => {
  it("names the provision, then the instrument", () => {
    expect(formalCitation("pasal-5/ayat-1", "POJK 10/POJK.05/2019")).toBe("Pasal 5 ayat (1) POJK 10/POJK.05/2019");
  });

  it("names an article an amending regulation words anew within the amending article", () => {
    expect(formalCitation("pasal-i/pasal-115", "POJK 7/POJK.05/2022")).toBe("Pasal 115 dalam Pasal I POJK 7/POJK.05/2022");
  });
});

const provision = (address: string, kind: string, label: string, parent: string | null = null) => ({ address, kind, label, parent_address: parent });

describe("the articles the parser didn't find", () => {
  it("marks a gap in the numbering where it is, among an article's siblings", () => {
    const gaps = articleGaps([
      provision("memutuskan", "memutuskan", "MEMUTUSKAN"),
      provision("bab-i", "bab", "BAB I", "memutuskan"),
      provision("pasal-1", "pasal", "Pasal 1", "bab-i"),
      provision("pasal-1/ayat-1", "ayat", "(1)", "pasal-1"),
      provision("pasal-3", "pasal", "Pasal 3", "bab-i"),
      provision("bab-ii", "bab", "BAB II"),
      provision("pasal-4", "pasal", "Pasal 4", "bab-ii"),
      provision("pasal-4a", "pasal", "Pasal 4A", "bab-ii"),
      provision("pasal-7", "pasal", "Pasal 7", "bab-ii"),
    ]);

    expect(Object.fromEntries(gaps)).toEqual({ "pasal-3": ["Pasal 2"], "pasal-7": ["Pasal 5", "Pasal 6"] });
  });

  it("follows the numbering across chapters, and leaves an amending regulation's quoted articles alone", () => {
    const gaps = articleGaps([
      provision("pasal-i", "pasal", "Pasal I"),
      provision("pasal-i/pasal-3", "pasal", "Pasal 3", "pasal-i"),
      provision("pasal-i/pasal-9", "pasal", "Pasal 9", "pasal-i"),
      provision("pasal-ii", "pasal", "Pasal II"),
    ]);

    expect(gaps.size).toBe(0);
  });
});

describe("the outline beside the text", () => {
  it("lists the parts a curator jumps to, not every paragraph or item", () => {
    const listed = outline([
      provision("menimbang", "menimbang", "Menimbang"),
      provision("menimbang/huruf-a", "huruf", "a.", "menimbang"),
      provision("bab-i", "bab", "BAB I"),
      provision("pasal-1", "pasal", "Pasal 1", "bab-i"),
      provision("pasal-1/ayat-1", "ayat", "(1)", "pasal-1"),
      provision("pasal-1/ayat-1/angka-1", "angka", "1.", "pasal-1/ayat-1"),
    ]);

    expect(listed.map((each) => each.address)).toEqual(["menimbang", "bab-i", "pasal-1"]);
  });
});

describe("where the editor opens", () => {
  it("reads a provision's range from the link, and ignores one that doesn't fit the text", () => {
    expect(editRange("120-360", 1000)).toEqual([120, 360]);
    expect(editRange("120-3600", 1000)).toBeNull();
    expect(editRange("360-120", 1000)).toBeNull();
    expect(editRange("abc", 1000)).toBeNull();
    expect(editRange(undefined, 1000)).toBeNull();
  });
});

describe("a block's wording, with its references and the pages it runs over", () => {
  it("cuts the wording at each reference and each page start, by the API's offsets (as the browser counts)", () => {
    const block = {
      text: "Tiga 😀 menurut ayat (1) dan Pasal 2.",
      references: [
        { start: 16, end: 24, address: "pasal-2/ayat-1" }, // 😀 takes two units
        { start: 29, end: 36, address: "pasal-2" },
      ],
      pages: [{ at: 25, page: 4 }],
    };

    expect(blockPieces(block)).toEqual([
      { text: "Tiga 😀 menurut " },
      { text: "ayat (1)", address: "pasal-2/ayat-1" },
      { text: " " },
      { page: 4 },
      { text: "dan " },
      { text: "Pasal 2", address: "pasal-2" },
      { text: "." },
    ]);
  });

  it("is the whole wording when there is nothing to cut at, and a page may start it", () => {
    expect(blockPieces({ text: "Tanpa rujukan.", references: [], pages: [] })).toEqual([{ text: "Tanpa rujukan." }]);
    expect(blockPieces({ text: "Lanjutan.", references: [], pages: [{ at: 0, page: 2 }] })).toEqual([
      { page: 2 },
      { text: "Lanjutan." },
    ]);
  });
});

describe("an article's paragraphs", () => {
  const provisions = [
    { address: "menimbang", kind: "menimbang", label: "Menimbang", parent_address: null },
    { address: "memutuskan", kind: "memutuskan", label: "MEMUTUSKAN", parent_address: null },
    { address: "bab-i", kind: "bab", label: "BAB I", parent_address: null },
    { address: "pasal-1", kind: "pasal", label: "Pasal 1", parent_address: "bab-i" },
    { address: "pasal-1/ayat-1", kind: "ayat", label: "(1)", parent_address: "pasal-1" },
    { address: "pasal-1/ayat-2", kind: "ayat", label: "(2)", parent_address: "pasal-1" },
    { address: "pasal-2/ayat-1", kind: "ayat", label: "(1)", parent_address: "pasal-2" },
  ];
  const at = (...addresses: (string | null)[]) => addresses.map((address) => ({ address }));

  it("rules a paragraph off from the one before it in the same article", () => {
    const passages = at("pasal-1", "pasal-1/ayat-1", "pasal-1/ayat-2", "pasal-2/ayat-1");
    const byAddress = new Map(provisions.map((each) => [each.address, each]));

    expect(passages.map((_, index) => followsSibling(passages, index, byAddress))).toEqual([false, false, true, false]);
  });
});
