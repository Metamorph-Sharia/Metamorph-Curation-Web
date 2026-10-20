import { describe, expect, it } from "vitest";

import type { FieldRow } from "./api/types";

import { addressLabel, lineage, statusLabel, statusOrigin, statusTone } from "./legal";

describe("a provision's address, as a lawyer writes it", () => {
  it("names articles, their paragraphs, and an amending article's quoted ones", () => {
    expect(addressLabel("pasal-115")).toBe("Pasal 115");
    expect(addressLabel("pasal-3a")).toBe("Pasal 3A");
    expect(addressLabel("pasal-5/ayat-1")).toBe("Pasal 5 ayat (1)");
    expect(addressLabel("pasal-i")).toBe("Pasal I");
    expect(addressLabel("pasal-i/pasal-115")).toBe("Pasal 115 (Pasal I)");
  });

  it("names the parts around the articles", () => {
    expect(addressLabel("penjelasan/pasal-5/ayat-2")).toBe("Penjelasan Pasal 5 ayat (2)");
    expect(addressLabel("bab-ii/bagian-kesatu")).toBe("BAB II Bagian Kesatu");
    expect(addressLabel("lampiran-i")).toBe("Lampiran I");
    expect(addressLabel("romawi-ii")).toBe("Romawi II");
    expect(addressLabel("diktum-kedua")).toBe("Diktum Kedua");
    expect(addressLabel("menimbang")).toBe("Menimbang");
  });
});

describe("a status, in the words of the law", () => {
  it("names each status in Indonesian, with one tone for each", () => {
    expect(statusLabel("in_force")).toBe("Berlaku");
    expect(statusLabel("partly_revoked")).toBe("Dicabut sebagian");
    expect(statusLabel("unknown")).toBe("Tidak diketahui");
    expect(statusLabel("something_new")).toBe("Something new");
    expect(statusTone("in_force")).toBe("ok");
    expect(statusTone("amended")).toBe("warning");
    expect(statusTone("revoked")).toBe("critical");
    expect(statusTone("unknown")).toBe("neutral");
  });
});

const AMENDING = "ojk:pojk:2022:7";
const link = (type: string, document_id: string, to_address: string | null = null) => ({
  type,
  document_id,
  document_title: "Perubahan",
  document_citation: "POJK 7/2022",
  from_address: "pasal-i",
  to_address,
  method: "exact_id",
  effective_on: "2022-02-27",
});

describe("a document's lineage", () => {
  it("groups the links by what they mean and which way they point, changes to this document first", () => {
    const groups = lineage(
      [link("legal_basis", "id:uu:2011:21")],
      [link("amends", AMENDING), link("amends", AMENDING, "pasal-115"), link("partly_revokes", AMENDING, "pasal-110")],
    );

    expect(groups.map((group) => group.label)).toEqual(["Diubah oleh", "Dicabut sebagian oleh", "Dasar hukum"]);
    expect(groups[0].entries).toEqual([
      {
        documentId: AMENDING,
        citation: "POJK 7/2022",
        title: "Perubahan",
        effectiveOn: "2022-02-27",
        wholeDocument: true,
        articles: ["Pasal 115"],
      },
    ]);
    expect(groups[1].entries[0].articles).toEqual(["Pasal 110"]);
  });

  it("names what this document does to others", () => {
    const groups = lineage([link("amends", "ojk:pojk:2018:35", "pasal-2"), link("revokes", "ojk:pojk:2014:1")], []);

    expect(groups.map((group) => [group.label, group.entries[0].articles])).toEqual([
      ["Mengubah", ["Pasal 2"]],
      ["Mencabut", []],
    ]);
  });

  it("keeps a relation it doesn't know, under its own name", () => {
    expect(lineage([link("annotates", "x:y:1:2")], [])[0].label).toBe("Annotates");
  });
});

describe("where a document's status comes from", () => {
  const status = (by_source: [string, unknown][], correction: FieldRow["correction"] = null): FieldRow => ({
    field: "status",
    effective: "amended",
    registry: "amended",
    by_source,
    correction,
  });
  const event = (status: string, effective_from: string | null, caused_by: string | null, source = "links") => ({
    address: null,
    status,
    effective_from,
    source,
    caused_by,
    caused_by_citation: caused_by ? `Citation of ${caused_by}` : null,
  });

  it("is the curator's correction, when there is one", () => {
    const origin = statusOrigin([status([["ojk", "in_force"]], { value: "amended", source_value: "in_force", reason: "Lihat POJK 7/2022", author: "ani", created_at: "2026-10-19T00:00:00Z" })], []);

    expect(origin).toEqual({ kind: "corrected", author: "ani", reason: "Lihat POJK 7/2022" });
  });

  it("is the sources that state it", () => {
    expect(statusOrigin([status([["ojk", "amended"], ["bpk", "unknown"], ["regalert", null]])], [])).toEqual({
      kind: "stated",
      connectors: ["ojk"],
    });
  });

  it("follows from the latest change another document made, when no source states it", () => {
    const events = [event("amended", "2022-02-27", "ojk:pojk:2022:7"), event("revoked", "2024-01-05", "ojk:pojk:2024:1"), event("in_force", "2019-01-01", null, "ojk")];

    expect(statusOrigin([status([["ojk", null]])], events)).toEqual({
      kind: "derived",
      documentId: "ojk:pojk:2024:1",
      citation: "Citation of ojk:pojk:2024:1",
      since: "2024-01-05",
    });
  });

  it("is nobody's, when nothing states it", () => {
    expect(statusOrigin([], [])).toEqual({ kind: "unstated" });
  });
});
