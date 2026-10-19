import type { DocumentView } from "@/lib/api/types";
import { formatDay } from "@/lib/format";
import { holdCheck, sentence } from "@/lib/labels";
import { textHref } from "@/lib/routes";

import { Badge } from "../badge";
import { ContentSection } from "./content-section";
import { CitationsSection, ConflictsSection, ReviewItemsSection } from "./decisions-sections";
import { FieldsSection } from "./fields-section";
import { ManageSection } from "./manage-section";
import { LinksSection, SourcesSection, StatusSection, StructureSection } from "./record-sections";

const JUMPS: [string, string][] = [
  ["fields", "Fields"],
  ["content", "Files & Texts"],
  ["citations", "Open Citations"],
  ["conflicts", "Conflicts"],
  ["review", "Review"],
  ["links", "Links"],
  ["status", "Status History"],
  ["structure", "Structure"],
  ["manage", "Manage"],
];

// One document, everything the team knows and can do about it: the order of the first curation app's page.
export function DocumentPage({ view }: { view: DocumentView }) {
  const doc = view.summary;
  return (
    <div className="grid gap-10">
      <header className="grid gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">{doc.citation}</h1>
        <p className="max-w-[75ch] text-muted">{doc.title}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="break-all font-mono" translate="no">
            {doc.id}
          </span>
          <span className="text-muted">ID confidence: {view.id_confidence}</span>
          <Badge tone="neutral">{sentence(doc.kind)}</Badge>
          <Badge tone="neutral">{sentence(doc.status)}</Badge>
          {doc.suppressed ? (
            <Badge tone="critical">Suppressed</Badge>
          ) : view.hold?.length ? (
            <Badge tone="warning">Held</Badge>
          ) : view.published_at ? (
            <Badge tone="ok">Published</Badge>
          ) : null}
        </div>
      </header>

      <PublishingNotice view={view} />

      <nav aria-label="On this page" className="overflow-x-auto">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {JUMPS.map(([anchor, label]) => (
            <li key={anchor}>
              <a href={`#${anchor}`} className="text-accent underline-offset-4 hover:underline">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <FieldsSection view={view} />
      <SourcesSection sources={view.sources} />
      <ContentSection view={view} />
      <CitationsSection view={view} />
      <ConflictsSection view={view} />
      <ReviewItemsSection view={view} />
      <LinksSection view={view} />
      <StatusSection rows={view.status_history} />
      <StructureSection view={view} />
      <ManageSection view={view} />
    </div>
  );
}

// Whether the assistant can see this document, and if not, why: suppressed, or held by the publish gate.
function PublishingNotice({ view }: { view: DocumentView }) {
  const doc = view.summary;
  if (view.suppression) {
    return (
      <div role="status" aria-label="Publishing" className="rounded-ui border border-warning bg-warning-soft p-4 text-sm">
        Suppressed by {view.suppression.author} on {formatDay(view.suppression.created_at)}: “{view.suppression.reason}”. The
        assistant can’t cite it.
      </div>
    );
  }
  if (!view.hold?.length) {
    return null;
  }
  return (
    <div role="status" aria-label="Publishing" className="grid gap-2 rounded-ui border border-warning bg-warning-soft p-4 text-sm">
      {(view.lapsed_corrections ?? []).map((sha) => (
        <p key={sha}>
          The source sent a new text, so your correction of the previous one no longer applies.{" "}
          <a href={textHref(doc.id, sha, "correction")} className="font-medium underline underline-offset-4">
            Compare it
          </a>
          , then correct the new text if it needs the same fix.
        </p>
      ))}
      <p>
        <strong>Held back from publishing.</strong>{" "}
        {view.published_at
          ? `The assistant sees the version published on ${formatDay(view.published_at)} until this one passes.`
          : "It has never been published."}
      </p>
      <ul className="list-disc pl-5">
        {view.hold.map((reason) => (
          <li key={`${reason.check}:${reason.detail}`}>
            {holdCheck(reason.check).label}: {reason.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
