// The law's own vocabulary, in Indonesian: how lawyers name a provision, a status and a relation between two
// instruments. Curators search and cite in these words, so the console uses them for legal things only; the rest
// of the interface stays in English.
import type { FieldRow, LinkRow, StatusRow } from "./api/types";
import type { Tone } from "./labels";
import { sentence } from "./labels";

// --- provisions ---------------------------------------------------------------------------------------------------

// An address's parts (the platform's provision addresses: docs/published-schema.md), each as it is written.
const PARTS: [RegExp, (value: string) => string][] = [
  [/^pasal-(.+)$/, (n) => `Pasal ${n.toUpperCase()}`],
  [/^ayat-(.+)$/, (n) => `ayat (${n})`],
  [/^huruf-(.+)$/, (n) => `huruf ${n}`],
  [/^angka-(.+)$/, (n) => `angka ${n}`],
  [/^bab-(.+)$/, (n) => `BAB ${n.toUpperCase()}`],
  [/^bagian-(.+)$/, (n) => `Bagian ${sentence(n)}`],
  [/^paragraf-(.+)$/, (n) => `Paragraf ${n.toUpperCase()}`],
  [/^lampiran-(.+)$/, (n) => `Lampiran ${n.toUpperCase()}`],
  [/^romawi-(.+)$/, (n) => `Romawi ${n.toUpperCase()}`],
  [/^diktum-(.+)$/, (n) => `Diktum ${sentence(n)}`],
];
const AMENDING_ARTICLE = /^pasal-[ivxlc]+$/; // Pasal I, II …: an amending regulation's own articles

function partLabel(part: string): string {
  for (const [pattern, label] of PARTS) {
    const found = pattern.exec(part);
    if (found) {
      return label(found[1]);
    }
  }
  return sentence(part);
}

// "pasal-5/ayat-1" → "Pasal 5 ayat (1)". An article an amending regulation quotes is named first, with the
// amending article after it: "pasal-i/pasal-115" → "Pasal 115 (Pasal I)".
export function addressLabel(address: string): string {
  const parts = address.split("/");
  if (parts.length > 1 && AMENDING_ARTICLE.test(parts[0]) && parts[1].startsWith("pasal-")) {
    return `${parts.slice(1).map(partLabel).join(" ")} (${partLabel(parts[0])})`;
  }
  return parts.map(partLabel).join(" ");
}

// --- statuses -----------------------------------------------------------------------------------------------------

const STATUSES: Record<string, { label: string; tone: Tone }> = {
  in_force: { label: "Berlaku", tone: "ok" },
  amended: { label: "Diubah", tone: "warning" },
  partly_revoked: { label: "Dicabut sebagian", tone: "warning" },
  revoked: { label: "Dicabut", tone: "critical" },
  not_yet_in_force: { label: "Belum berlaku", tone: "neutral" },
  unknown: { label: "Tidak diketahui", tone: "neutral" },
};

export function statusLabel(status: string): string {
  return STATUSES[status]?.label ?? sentence(status);
}

export function statusTone(status: string): Tone {
  return STATUSES[status]?.tone ?? "neutral";
}

// --- lineage ------------------------------------------------------------------------------------------------------

// Each relation (the contract's vocabulary), named from this document's side: what it does to another
// (outgoing), and what another does to it (incoming). Listed in the order the page shows the groups: what changed
// this document first, because that decides whether it still applies.
const RELATIONS: { type: string; direction: "in" | "out"; label: string }[] = [
  { type: "amends", direction: "in", label: "Diubah oleh" },
  { type: "revokes", direction: "in", label: "Dicabut oleh" },
  { type: "partly_revokes", direction: "in", label: "Dicabut sebagian oleh" },
  { type: "supersedes", direction: "in", label: "Digantikan oleh" },
  { type: "changes_fatwa", direction: "in", label: "Fatwa diubah oleh" },
  { type: "amends", direction: "out", label: "Mengubah" },
  { type: "revokes", direction: "out", label: "Mencabut" },
  { type: "partly_revokes", direction: "out", label: "Mencabut sebagian" },
  { type: "supersedes", direction: "out", label: "Menggantikan" },
  { type: "changes_fatwa", direction: "out", label: "Mengubah fatwa" },
  { type: "legal_basis", direction: "out", label: "Dasar hukum" },
  { type: "implements", direction: "out", label: "Melaksanakan" },
  { type: "adopts_fatwa", direction: "out", label: "Mengadopsi fatwa" },
  { type: "implements", direction: "in", label: "Dilaksanakan oleh" },
  { type: "legal_basis", direction: "in", label: "Menjadi dasar hukum bagi" },
  { type: "adopts_fatwa", direction: "in", label: "Fatwa diadopsi oleh" },
  { type: "refers_to", direction: "out", label: "Merujuk" },
  { type: "refers_to", direction: "in", label: "Dirujuk oleh" },
];

export type LineageEntry = {
  documentId: string;
  citation: string | null;
  title: string | null;
  effectiveOn: string | null; // when the changing document takes effect
  wholeDocument: boolean; // one of the links is about the whole document
  articles: string[]; // the articles named: of this document (incoming), or of the other one (outgoing)
};

export type LineageGroup = { key: string; label: string; entries: LineageEntry[] };

// The links, grouped by meaning and direction, one entry for each other document with the articles named.
export function lineage(linksOut: LinkRow[], linksIn: LinkRow[]): LineageGroup[] {
  const groups = new Map<string, LineageGroup>();
  const add = (row: LinkRow, direction: "in" | "out") => {
    const key = `${direction}:${row.type}`;
    const known = RELATIONS.find((relation) => relation.type === row.type && relation.direction === direction);
    const group = groups.get(key) ?? { key, label: known?.label ?? sentence(row.type), entries: [] };
    groups.set(key, group);
    let entry = group.entries.find((each) => each.documentId === row.document_id);
    if (!entry) {
      entry = {
        documentId: row.document_id,
        citation: row.document_citation ?? null,
        title: row.document_title,
        effectiveOn: row.effective_on ?? null,
        wholeDocument: false,
        articles: [],
      };
      group.entries.push(entry);
    }
    if (row.to_address) {
      entry.articles.push(addressLabel(row.to_address));
    } else {
      entry.wholeDocument = true;
    }
  };
  linksOut.forEach((row) => add(row, "out"));
  linksIn.forEach((row) => add(row, "in"));
  const order = (key: string) => {
    const index = RELATIONS.findIndex((relation) => `${relation.direction}:${relation.type}` === key);
    return index < 0 ? RELATIONS.length : index;
  };
  return [...groups.values()].toSorted((a, b) => order(a.key) - order(b.key));
}

// --- where a status comes from ------------------------------------------------------------------------------------

export type StatusOrigin =
  | { kind: "corrected"; author: string; reason: string }
  | { kind: "stated"; connectors: string[] }
  | { kind: "derived"; documentId: string; citation: string | null; since: string | null }
  | { kind: "unstated" };

const NOT_STATED = new Set([null, undefined, "", "unknown"]);
const FROM_LINKS = "links"; // the platform's status_event source for statuses derived from other documents' links

// The platform's rule (domain/publishing.py): a curator's correction wins, then a source's status, then the
// latest whole-document change another document's link implies.
export function statusOrigin(fields: FieldRow[], history: StatusRow[]): StatusOrigin {
  const field = fields.find((row) => row.field === "status");
  if (field?.correction) {
    return { kind: "corrected", author: field.correction.author, reason: field.correction.reason };
  }
  const connectors = (field?.by_source ?? [])
    .filter(([, value]) => !NOT_STATED.has(value as string | null | undefined))
    .map(([connector]) => String(connector));
  if (connectors.length) {
    return { kind: "stated", connectors };
  }
  const derived = history.filter((row) => row.source === FROM_LINKS && row.address === null && row.caused_by);
  const latest = derived.reduce<StatusRow | null>(
    (best, row) => (best === null || (row.effective_from ?? "") >= (best.effective_from ?? "") ? row : best),
    null,
  );
  if (latest?.caused_by) {
    return { kind: "derived", documentId: latest.caused_by, citation: latest.caused_by_citation ?? null, since: latest.effective_from };
  }
  return { kind: "unstated" };
}

// --- what another document did to a provision ---------------------------------------------------------------------

const CHANGES: Record<string, string> = {
  amends: "Diubah oleh",
  partly_revokes: "Dicabut oleh", // the document is partly revoked; this provision is revoked
  revokes: "Dicabut oleh",
};

export function changeLabel(type: string): string {
  return CHANGES[type] ?? sentence(type);
}
