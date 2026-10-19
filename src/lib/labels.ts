// What the console calls things: the names curators already know from the first curation app.

// Each review queue: its name, why items land in it, and what a curator does with one.
const REVIEW_QUEUES: Record<string, { label: string; why: string; todo: string }> = {
  conflict: {
    label: "Conflicts",
    why: "A source changed a field that a curator had corrected.",
    todo: "Keep the correction or accept the source’s new value.",
  },
  unresolved_citation: {
    label: "Unlinked Citations",
    why: "The document cites something that names no document the registry can find.",
    todo: "Link the citation to the document it means.",
  },
  quarantine: {
    label: "Quarantine",
    why: "A bundle line broke the contract and wasn’t loaded.",
    todo: "Ask the connector’s owner to fix the export, then dismiss.",
  },
};

// Each check of the publish gate (the platform's domain/gate.py), and what a curator does about it.
const HOLD_CHECKS: Record<string, { label: string; todo: string }> = {
  identity: { label: "Unidentified", todo: "Assign the document’s canonical ID." },
  text: { label: "No Main Text", todo: "Ask the connector’s owner to acquire the regulation’s own text." },
  parsed: { label: "Not Parsed Yet", todo: "Nothing to do: the next build parses it." },
  structure: {
    label: "Structure",
    todo: "Fix it at its source or in the parser, or approve the problems as they are.",
  },
};

// The fields a curator may correct (the platform's OVERRIDABLE_FIELDS), in the order the page shows them.
export const FIELD_LABELS: Record<string, string> = {
  citation: "Citation",
  title: "Title",
  kind: "Kind",
  status: "Status",
  status_as_of: "Status As Of",
  year: "Year",
  enacted_on: "Enacted",
  promulgated_on: "Promulgated",
  effective_on: "Effective",
};

// What each change says once it is done (the `done` query parameter after a change).
const DONE: Record<string, string> = {
  corrected: "Correction saved and published.",
  withdrawn: "Correction withdrawn. The source’s value is back.",
  suppressed: "Document suppressed. The assistant can’t cite it any more.",
  restored: "Document restored. The assistant can cite it again.",
  renamed: "ID assigned. Later loads of this record keep it.",
  linked: "Citation linked.",
  conflict: "Conflict resolved.",
  resolved: "Review item resolved.",
  dismissed: "Review item dismissed.",
  added: "Document added. It is published once it passes the publish gate.",
  approved: "Approved. The document is checked again and published if it passes.",
  unapproved: "Approval withdrawn. The document is checked again.",
  text_corrected: "Text corrected, parsed again and checked. Published if it passes.",
  text_restored: "Correction withdrawn. The source’s text is back, parsed again and checked.",
};

export type Tone = "ok" | "warning" | "critical" | "neutral";

const TONES: Record<string, Tone> = { ok: "ok", warning: "warning", critical: "critical" };

export function reviewQueueLabel(kind: string): string {
  return reviewQueue(kind).label;
}

export function reviewQueue(kind: string): { label: string; why: string; todo: string } {
  return REVIEW_QUEUES[kind] ?? { label: sentence(kind), why: "", todo: "" };
}

export function holdCheck(check: string): { label: string; todo: string } {
  return HOLD_CHECKS[check] ?? { label: sentence(check), todo: "" };
}

export function fieldLabel(field: string): string {
  return FIELD_LABELS[field] ?? sentence(field);
}

export function doneNotice(done: string | null | undefined): string | null {
  return (done && DONE[done]) || null;
}

export function severityTone(severity: string): Tone {
  return TONES[severity] ?? "neutral";
}

export function sentence(word: string): string {
  const spaced = word.replaceAll("_", " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function asSentence(message: string): string {
  const text = message.trim();
  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

export function severityLabel(severity: string): string {
  return severity === "ok" ? "OK" : sentence(severity);
}
