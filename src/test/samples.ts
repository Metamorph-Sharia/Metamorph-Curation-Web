// Curation data as the API answers it, typed by the contract: what the view tests render.
import type { DocumentView, HeldPage, ReviewPage } from "@/lib/api/types";

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
  links_out: [{ type: "legal_basis", document_id: "id:uu:2011:21", document_title: "Otoritas Jasa Keuangan", from_address: null, to_address: null, method: "exact_id" }],
  links_in: [],
  open_citations: [{ id: 88, relation: "legal_basis", target_text: "Keputusan Presiden Nomor 84/P", target_id: null, from_address: "mengingat" }],
  conflicts: [{ id: 7, field: "title", correction: "Penyelenggaraan Usaha Pembiayaan Syariah", source_value: "Penyelenggaraan Usaha", detected_at: NOW }],
  status_history: [{ address: null, status: "in_force", effective_from: "2019-02-27", source: "ojk" }],
  open_reviews: [],
  hold: [{ check: "structure", detail: "Pasal 3 missing" }],
  published_at: NOW,
  lapsed_corrections: ["d".repeat(64)],
};
