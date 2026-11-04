import { describe, expect, it } from "vitest";

import { emptySentence, readAnswer } from "./answer";

const EVIDENCE = {
  ref: "doc:ojk:pojk:2024:40#pasal-137",
  kind: "regulation",
  citation: "POJK No. 40 Tahun 2024, Pasal 137",
  title: "Penyelenggaraan Usaha Perusahaan Pembiayaan",
  body: { type: "text", wording: "Pembiayaan yang disalurkan wajib …", pages: null },
  provenance: { provider: "regulation-retrieval", index_version: "regulation-index", source_published_at: "2026-11-04T00:00:00Z" },
};

describe("a ranked page", () => {
  it("keeps the rank, the score and how the hit matched", () => {
    const answer = readAnswer({
      items: [{ rank: 1, score: 5.159, matched_by: ["semantic", "words"], evidence: EVIDENCE }],
      cursor: null,
      empty_reason: null,
      warnings: [],
    });
    expect(answer.shape).toBe("hits");
    expect(answer.items[0]).toMatchObject({
      rank: 1,
      score: 5.159,
      matchedBy: ["semantic", "words"],
      citation: "POJK No. 40 Tahun 2024, Pasal 137",
      provider: "regulation-retrieval",
    });
    expect(answer.items[0].body).toEqual({ type: "text", wording: "Pembiayaan yang disalurkan wajib …" });
  });
});

describe("an exact tool's page", () => {
  it("reads evidence with no rank around it", () => {
    const answer = readAnswer({ items: [EVIDENCE], cursor: null, empty_reason: null, warnings: ["the index predates word search"] });
    expect(answer.shape).toBe("evidence");
    expect(answer.items[0].rank).toBeUndefined();
    expect(answer.warnings).toEqual(["the index predates word search"]);
  });
});

describe("read's single answer", () => {
  it("reads one piece of evidence that has no page around it", () => {
    const answer = readAnswer(EVIDENCE);
    expect(answer.shape).toBe("evidence");
    expect(answer.items).toHaveLength(1);
    expect(answer.items[0].ref).toBe("doc:ojk:pojk:2024:40#pasal-137");
  });
});

describe("a follow_links page", () => {
  it("reads links as two ends, not as evidence", () => {
    const answer = readAnswer({
      items: [{ type: "names", source: "release:ojk:siaran-pers:2026:rdkb#p-26", target: "doc:ojk:pojk:2024:40", effective_on: null, confidence: null }],
      cursor: "2",
      empty_reason: null,
      warnings: [],
    });
    expect(answer.shape).toBe("links");
    expect(answer.links[0].type).toBe("names");
    expect(answer.links[0].target).toBe("doc:ojk:pojk:2024:40");
    expect(answer.items).toEqual([]);
  });
});

describe("a record or figures body", () => {
  it("reads a company's fields", () => {
    const answer = readAnswer({
      items: [
        {
          ...EVIDENCE,
          body: { type: "record", fields: { legal_name: "PT Dana Syariah Indonesia", register: { ref: "register:ojk:lpbbti" } } },
        },
      ],
    });
    expect(answer.items[0].body).toEqual({
      type: "record",
      fields: [
        ["legal_name", "PT Dana Syariah Indonesia"],
        ["register", "register:ojk:lpbbti"],
      ],
    });
  });

  it("reads a series' figures with the provisional ones marked", () => {
    const answer = readAnswer({
      items: [
        {
          ...EVIDENCE,
          body: { type: "figures", unit: "IDR billion", frequency: "monthly", observations: [{ period: "2026-09", value: 1024.5, provisional: true }] },
        },
      ],
    });
    expect(answer.items[0].body).toEqual({
      type: "figures",
      unit: "IDR billion",
      frequency: "monthly",
      points: [{ period: "2026-09", value: "1024.5", provisional: true }],
    });
  });
});

describe("an answer this page did not expect", () => {
  it("shows nothing rather than failing", () => {
    expect(readAnswer({ unexpected: true })).toEqual({ shape: "evidence", items: [], links: [], warnings: [], emptyReason: null });
    expect(readAnswer(null).items).toEqual([]);
  });
});

describe("why a page is empty", () => {
  it("says rephrase, or widen", () => {
    expect(emptySentence("no_match")).toContain("Rephrase");
    expect(emptySentence("filters_exclude_all")).toContain("filters");
    expect(emptySentence(null)).toContain("Nothing came back");
  });
});
