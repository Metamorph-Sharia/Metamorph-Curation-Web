// What a tool answered, as the page shows it. The contract has four shapes and three of them are pages:
//
//   hits      a ranked page: a rank, a score, how the hit matched, and the evidence under it
//   evidence  an exact tool's page: the evidence alone, in the tool's own order
//   links     follow_links' page: a type, a source ref, a target ref, a date, a confidence
//   evidence  read's answer is one piece of evidence, with no page around it
//
// An evidence's body is text (a passage's wording), a record (a company's fields) or figures (a series'
// numbers). The shapes are read defensively: this page shows what came back, including a shape it did not expect.

export type Body =
  | { type: "text"; wording: string }
  | { type: "record"; fields: [name: string, value: string][] }
  | { type: "figures"; unit: string; frequency: string; points: { period: string; value: string; provisional: boolean }[] }
  | { type: "none" };

export type Item = {
  ref: string;
  kind: string;
  citation: string;
  title: string;
  body: Body;
  provider: string;
  indexVersion: string;
  sourcePublishedAt: string;
  rank?: number;
  score?: number;
  matchedBy: string[];
};

export type Link = { type: string; source: string; target: string; effectiveOn: string; confidence: number | null };

export type Answer = {
  shape: "hits" | "evidence" | "links";
  items: Item[];
  links: Link[];
  warnings: string[];
  emptyReason: string | null;
};

const EMPTY: Answer = { shape: "evidence", items: [], links: [], warnings: [], emptyReason: null };

export function readAnswer(body: unknown): Answer {
  const page = record(body);
  if (!page) {
    return EMPTY;
  }
  if (Array.isArray(page.items)) {
    const rows = page.items.map(record).filter((row): row is Record<string, unknown> => row !== null);
    if (rows.length > 0 && rows.every(isLink)) {
      return { shape: "links", items: [], links: rows.map(readLink), warnings: strings(page.warnings), emptyReason: reason(page) };
    }
    const items = rows.map(readItem);
    return {
      shape: items.some((item) => item.rank !== undefined) ? "hits" : "evidence",
      items,
      links: [],
      warnings: strings(page.warnings),
      emptyReason: reason(page),
    };
  }
  if (typeof page.ref === "string") {
    return { shape: "evidence", items: [readItem(page)], links: [], warnings: strings(page.warnings), emptyReason: null };
  }
  return EMPTY;
}

export function emptySentence(reason: string | null): string {
  if (reason === "no_match") {
    return "Nothing matched. Rephrase the question, or search by other words.";
  }
  if (reason === "filters_exclude_all") {
    return "The filters excluded every passage there is.";
  }
  return "Nothing came back.";
}

function isLink(value: Record<string, unknown>): boolean {
  return typeof value.type === "string" && typeof value.source === "string" && typeof value.target === "string";
}

function readLink(value: Record<string, unknown>): Link {
  return {
    type: text(value.type),
    source: text(value.source),
    target: text(value.target),
    effectiveOn: text(value.effective_on),
    confidence: typeof value.confidence === "number" ? value.confidence : null,
  };
}

function readItem(value: Record<string, unknown>): Item {
  const evidence = record(value.evidence) ?? value;
  return {
    ref: text(evidence.ref),
    kind: text(evidence.kind),
    citation: text(evidence.citation),
    title: text(evidence.title),
    body: readBody(evidence.body),
    provider: text(record(evidence.provenance)?.provider),
    indexVersion: text(record(evidence.provenance)?.index_version),
    sourcePublishedAt: text(record(evidence.provenance)?.source_published_at),
    rank: typeof value.rank === "number" ? value.rank : undefined,
    score: typeof value.score === "number" ? value.score : undefined,
    matchedBy: strings(value.matched_by),
  };
}

function readBody(value: unknown): Body {
  if (typeof value === "string") {
    return { type: "text", wording: value };
  }
  const body = record(value);
  if (!body) {
    return { type: "none" };
  }
  if (body.type === "text") {
    return { type: "text", wording: text(body.wording) };
  }
  if (body.type === "record") {
    const fields = record(body.fields) ?? {};
    return { type: "record", fields: Object.entries(fields).map(([name, field]) => [name, plain(field)]) };
  }
  if (body.type === "figures") {
    const observations = Array.isArray(body.observations) ? body.observations : [];
    return {
      type: "figures",
      unit: text(body.unit),
      frequency: text(body.frequency),
      points: observations.map(record).filter((row): row is Record<string, unknown> => row !== null).map((row) => ({
        period: text(row.period),
        value: plain(row.value),
        provisional: row.provisional === true,
      })),
    };
  }
  return { type: "none" };
}

// A field's value as one line: a nested ref shows the ref, a list of refs shows them counted.
function plain(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value === null || value === undefined) {
    return "";
  }
  const item = record(value);
  if (Array.isArray(value)) {
    return value.map(plain).filter(Boolean).join(", ");
  }
  if (item && typeof item.ref === "string") {
    return item.ref;
  }
  if (item) {
    return Object.entries(item).map(([name, field]) => `${name} ${plain(field)}`).join(", ");
  }
  return "";
}

function reason(page: Record<string, unknown>): string | null {
  return typeof page.empty_reason === "string" ? page.empty_reason : null;
}

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}
