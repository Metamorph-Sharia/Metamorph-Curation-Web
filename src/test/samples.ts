// Curation data as the API answers it, typed by the contract: what the view tests render.
import type { DocumentView, HeldPage, ReadingProvision, ReviewPage, SearchPage, TextReading } from "@/lib/api/types";

export const NOW = "2026-10-19T04:36:00+00:00";
export const DOC = "ojk:pojk:2019:10";
export const SOURCE_SHA = "a".repeat(64);
export const GAPPY_SHA = "b".repeat(64);
export const CORRECTED_SHA = "c".repeat(64);

export const HELD: HeldPage = {
  check: null,
  rows: [
    {
      document_id: DOC,
      title: "Penyelenggaraan Usaha Pembiayaan Syariah",
      reasons: [{ check: "structure", detail: "Pasal 3 missing" }],
      published_at: NOW,
      held_since: "2026-10-18T02:00:00+00:00",
    },
    {
      document_id: "unresolved:ojk:bfca3f541eaae58f",
      title: "Peraturan yang belum dikenali",
      reasons: [{ check: "identity", detail: "No canonical ID yet: assign one" }],
      published_at: null,
      held_since: "2026-10-18T02:00:00+00:00",
    },
  ],
  counts: [
    ["identity", 1],
    ["text", 0],
    ["parsed", 0],
    ["structure", 1],
  ],
  total: 2,
  page: 1,
  pages: 1,
};

export const REVIEWS: ReviewPage = {
  kind: "unresolved_citation",
  rows: [
    {
      id: 12,
      kind: "unresolved_citation",
      created_at: NOW,
      document_id: "ojk:pojk:2018:35",
      document_title: "Penyelenggaraan Usaha Penjaminan",
      summary: "Cites “Keputusan Presiden Nomor 84/P”, which names no document",
      subject: { document_id: "ojk:pojk:2018:35", target_text: "Keputusan Presiden Nomor 84/P" },
    },
  ],
  total: 1,
  page: 1,
  pages: 1,
};

export const DOCUMENT: DocumentView = {
  summary: {
    id: DOC,
    citation: "POJK 10/POJK.05/2019",
    title: "Penyelenggaraan Usaha Pembiayaan Syariah",
    issuer: "ojk",
    kind: "regulation",
    status: "in_force",
    suppressed: false,
  },
  id_confidence: "high",
  fields: [
    { field: "title", effective: "Penyelenggaraan Usaha Pembiayaan Syariah", registry: "Penyelenggaraan", by_source: [["ojk", "Penyelenggaraan"]], correction: { value: "Penyelenggaraan Usaha Pembiayaan Syariah", source_value: "Penyelenggaraan", reason: "Judul resmi", author: "ani", created_at: NOW } },
    { field: "status", effective: "in_force", registry: "in_force", by_source: [["ojk", "in_force"]], correction: null },
    { field: "effective_on", effective: null, registry: null, by_source: [["ojk", null]], correction: null },
  ],
  suppression: null,
  sources: [{ connector: "ojk", source_id: "regalert:abc", url: "https://ojk.go.id/x", fetched_at: NOW, missing_since: null }],
  files: [{ sha256: "f".repeat(64), label: "main", media_type: "application/pdf", detail: "12 pages", problems: [], editable: false }],
  texts: [
    { sha256: GAPPY_SHA, label: "id", media_type: "text/markdown", detail: "self extracted, text layer", problems: ["Pasal 3 missing"], editable: true },
    { sha256: CORRECTED_SHA, label: "id", media_type: "text/markdown", detail: "self extracted, ocr", problems: ["Pasal 9 missing"], editable: true, approval: { reason: "Pasal 9 dicabut", author: "ani", created_at: NOW }, correction: { reason: "PDF hal. 4", author: "ani", created_at: NOW } },
  ],
  provisions: [
    { address: "pasal-1", kind: "pasal", label: "Pasal 1", heading: null, depth: 0, page_start: 2, valid_to: null },
    { address: "pasal-1/ayat-1", kind: "ayat", label: "(1)", heading: null, depth: 1, page_start: 2, valid_to: "2022-02-27" },
  ],
  provisions_total: 2,
  links_out: [{ type: "legal_basis", document_id: "id:uu:2011:21", document_title: "Otoritas Jasa Keuangan", document_citation: "UU 21/2011", from_address: null, to_address: null, method: "exact_id", effective_on: null }],
  links_in: [
    { type: "amends", document_id: "ojk:pojk:2022:7", document_title: "Perubahan atas POJK 10/2019", document_citation: "POJK 7/2022", from_address: "pasal-i", to_address: null, method: "exact_id", effective_on: "2022-02-27" },
    { type: "amends", document_id: "ojk:pojk:2022:7", document_title: "Perubahan atas POJK 10/2019", document_citation: "POJK 7/2022", from_address: "pasal-i", to_address: "pasal-1/ayat-1", method: "exact_id", effective_on: "2022-02-27" },
  ],
  open_citations: [{ id: 88, relation: "legal_basis", target_text: "Keputusan Presiden Nomor 84/P", target_id: null, from_address: "mengingat" }],
  conflicts: [{ id: 7, field: "title", correction: "Penyelenggaraan Usaha Pembiayaan Syariah", source_value: "Penyelenggaraan Usaha", detected_at: NOW }],
  status_history: [
    { address: null, status: "in_force", effective_from: "2019-02-27", source: "ojk" },
    { address: "pasal-1/ayat-1", status: "amended", effective_from: "2022-02-27", source: "links", caused_by: "ojk:pojk:2022:7", caused_by_citation: "POJK 7/2022" },
  ],
  open_reviews: [],
  hold: [{ check: "structure", detail: "Pasal 3 missing" }],
  published_at: NOW,
  lapsed_corrections: ["d".repeat(64)],
};

const reading = (address: string, kind: string, label: string, part: number, extra: Partial<ReadingProvision> = {}): ReadingProvision => ({
  address,
  parent_address: null,
  kind,
  label,
  heading: null,
  depth: 0,
  part,
  page_start: 2,
  page_end: 2,
  valid_to: null,
  changes: [],
  edit_from: 10,
  edit_to: 40,
  ...extra,
});

export const READING: TextReading = {
  document_id: "ojk:pojk:2018:35",
  citation: "POJK 35/POJK.05/2018",
  title: "Penyelenggaraan Usaha Penjaminan",
  sha256: SOURCE_SHA,
  problems: ["Pasal 2 missing"],
  corrected: false,
  editable: true,
  pdf_sha256: "f".repeat(64),
  texts: [{ sha256: SOURCE_SHA, language: "id", detail: "self extracted, text layer", main: true }],
  part: 0,
  parts: 2,
  provisions: [
    reading("bab-i", "bab", "BAB I", 0, { heading: "KETENTUAN UMUM" }),
    reading("pasal-1", "pasal", "Pasal 1", 0, { parent_address: "bab-i", depth: 1 }),
    reading("pasal-3", "pasal", "Pasal 3", 0, {
      parent_address: "bab-i",
      depth: 1,
      valid_to: "2021-03-03",
      changes: [{ type: "amends", document_id: "ojk:pojk:2021:3", citation: "POJK 3/POJK.05/2021", effective_on: "2021-03-03", new_address: "pasal-i/pasal-3" }],
    }),
    reading("pasal-4", "pasal", "Pasal 4", 1),
  ],
  passages: [
    { address: null, text: "PERATURAN OTORITAS JASA KEUANGAN\n", opens: false, titled: false, references: [] },
    { address: "bab-i", text: "", opens: true, titled: true, references: [] },
    { address: "pasal-1", text: "Satu.\n<!-- page 2 -->\nLanjutan.\n", opens: true, titled: true, references: [] },
    {
      address: "pasal-3",
      text: "Tiga, menurut Pasal 1 dan Pasal 4.\n",
      opens: true,
      titled: true,
      references: [
        { start: 14, end: 21, address: "pasal-1" },
        { start: 26, end: 33, address: "pasal-4" },
      ],
    },
  ],
};

export const SEARCH: SearchPage = {
  query: "wakaf",
  kind: "documents",
  filters: { issuer: "ojk", family: null, year: null, status: null, state: null },
  documents: [
    { id: DOC, citation: "POJK 10/POJK.05/2019", title: "Penyelenggaraan Usaha Pembiayaan Syariah", issuer: "ojk", family: "pojk", number: "10", year: 2019, kind: "regulation", status: "in_force", state: "held" },
    { id: "ojk:pojk:2018:35", citation: "POJK 35/POJK.05/2018", title: "Penyelenggaraan Usaha Penjaminan", issuer: "ojk", family: "pojk", number: "35", year: 2018, kind: "regulation", status: "amended", state: "published" },
  ],
  articles: [],
  documents_total: 2,
  articles_total: 1,
  facets: [
    { name: "issuer", values: [["ojk", 2], ["bi", 1]] },
    { name: "year", values: [["2019", 1], ["2018", 1]] },
  ],
  page: 1,
  pages: 2,
};
