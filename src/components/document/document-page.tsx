import Link from "next/link";

import type { DocumentView } from "@/lib/api/types";
import { formatDay, formatMoment } from "@/lib/format";
import { holdCheck, sentence } from "@/lib/labels";
import { statusLabel, statusOrigin, statusTone } from "@/lib/legal";
import { documentHref, readerHref, textHref } from "@/lib/routes";

import { Badge } from "../badge";
import { button, CARD, LINK, notice } from "../styles";
import { ContentSection } from "./content-section";
import { CitationsSection, ConflictsSection, ReviewItemsSection } from "./decisions-sections";
import { FieldsSection } from "./fields-section";
import { ManageSection } from "./manage-section";
import { LineageSection, SourcesSection, StatusSection, StructureSection } from "./record-sections";

const JUMPS: [string, string][] = [
  ["fields", "Fields"],
  ["sources", "Sources"],
  ["content", "Files & Texts"],
  ["citations", "Open Citations"],
  ["conflicts", "Conflicts"],
  ["review", "Review"],
  ["lineage", "Lineage"],
  ["status", "Status History"],
  ["structure", "Structure"],
  ["manage", "Manage"],
];

// One document, everything the team knows and can do about it: the order of the first curation app's page,
// laid out like a legal reader: the sections down the page, and on wide screens, their contents kept beside them.
export function DocumentPage({ view }: { view: DocumentView }) {
  const doc = view.summary;
  return (
    <div className="grid gap-8">
      <header className="grid gap-4">
        <h1 className="font-heading text-4xl leading-tight tracking-tight text-pretty sm:text-5xl">{doc.citation}</h1>
        <p className="max-w-[75ch] text-muted text-pretty sm:text-lg">{doc.title}</p>
        <div className={`${CARD} flex flex-wrap items-center gap-x-5 gap-y-3 p-4 text-sm`}>
          <div className="flex flex-wrap items-center gap-2">
            {doc.suppressed ? (
              <Badge tone="critical">Suppressed</Badge>
            ) : view.hold?.length ? (
              <Badge tone="warning">Held</Badge>
            ) : view.published_at ? (
              <Badge tone="ok">Published</Badge>
            ) : null}
            <Badge tone="neutral">{sentence(doc.kind)}</Badge>
            <Badge tone={statusTone(doc.status)}>{statusLabel(doc.status)}</Badge>
          </div>
          <span className="break-all font-mono" translate="no">
            {doc.id}
          </span>
          <span className="text-muted">ID confidence: {view.id_confidence}</span>
          {view.provisions_total ? (
            <Link href={readerHref(doc.id)} className={`${button("primary")} sm:ml-auto`}>
              Read the Text
            </Link>
          ) : null}
        </div>
        <Provenance view={view} />
      </header>

      <PublishingNotice view={view} />

      <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto">
          <p className="mb-2 hidden px-2 text-sm font-semibold lg:block">On This Page</p>
          <ul className="flex flex-wrap gap-2 text-sm lg:grid lg:gap-0.5">
            {JUMPS.map(([anchor, label]) => (
              <li key={anchor}>
                <a
                  href={`#${anchor}`}
                  className="inline-flex min-h-9 items-center rounded-ui border border-line bg-surface px-3 text-muted transition-colors hover:border-accent/40 hover:text-text lg:flex lg:min-h-8 lg:border-transparent lg:bg-transparent lg:px-2 lg:hover:border-transparent lg:hover:bg-sunken"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid min-w-0 gap-14">
          <FieldsSection view={view} />
          <SourcesSection sources={view.sources} />
          <ContentSection view={view} />
          <CitationsSection view={view} />
          <ConflictsSection view={view} />
          <ReviewItemsSection view={view} />
          <LineageSection view={view} />
          <StatusSection rows={view.status_history} />
          <StructureSection view={view} />
          <ManageSection view={view} />
        </div>
      </div>
    </div>
  );
}

// Whether the assistant can see this document, and if not, why: suppressed, or held by the publish gate.
function PublishingNotice({ view }: { view: DocumentView }) {
  const doc = view.summary;
  if (view.suppression) {
    return (
      <div role="status" aria-label="Publishing" className={`${notice("critical")} p-4`}>
        Suppressed by {view.suppression.author} on {formatDay(view.suppression.created_at)}: “{view.suppression.reason}”. The
        assistant can’t cite it.
      </div>
    );
  }
  if (!view.hold?.length) {
    return null;
  }
  return (
    <div role="status" aria-label="Publishing" className={`${notice("warning")} grid gap-3 p-4 sm:p-5`}>
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
        <strong className="font-semibold text-warning">Held back from publishing.</strong>{" "}
        {view.published_at
          ? `The assistant sees the version published on ${formatDay(view.published_at)} until this one passes.`
          : "It has never been published."}
      </p>
      <ul className="grid gap-1 pl-5 [list-style:disc] marker:text-warning">
        {view.hold.map((reason) => (
          <li key={`${reason.check}:${reason.detail}`}>
            {holdCheck(reason.check).label}: {reason.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

// How far the record can be trusted, in a few lines: where its status comes from, where it was acquired, how its
// text was read, and what the publish gate and the curators made of it.
function Provenance({ view }: { view: DocumentView }) {
  const lastFetched = view.sources.map((source) => source.fetched_at).toSorted().at(-1);
  const connectors = [...new Set(view.sources.map((source) => source.connector))];
  const mainText = view.texts.find((text) => text.editable);
  return (
    <dl aria-label="Provenance" className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[9rem_minmax(0,1fr)]">
      <dt className="text-muted">Status</dt>
      <dd>
        <StatusOrigin view={view} />
      </dd>
      <dt className="text-muted">Acquired from</dt>
      <dd>
        {connectors.length ? (
          <>
            <span className="font-mono" translate="no">
              {connectors.join(", ")}
            </span>
            {lastFetched ? <span className="text-muted">, last fetched {formatMoment(lastFetched)}</span> : null}
          </>
        ) : (
          "Added by hand"
        )}
      </dd>
      <dt className="text-muted">Main text</dt>
      <dd>{mainText ? sentence(mainText.detail) : "None acquired"}</dd>
      <dt className="text-muted">Checks</dt>
      <dd>{checksVerdict(view)}</dd>
    </dl>
  );
}

function StatusOrigin({ view }: { view: DocumentView }) {
  const status = statusLabel(view.summary.status);
  const origin = statusOrigin(view.fields, view.status_history);
  switch (origin.kind) {
    case "corrected":
      return (
        <>
          {status}, as corrected by {origin.author}: “{origin.reason}”
        </>
      );
    case "stated":
      return (
        <>
          {status}, as{" "}
          <span className="font-mono" translate="no">
            {origin.connectors.join(", ")}
          </span>{" "}
          states it
        </>
      );
    case "derived":
      return (
        <>
          {status}, since{" "}
          <Link href={documentHref(origin.documentId)} className={LINK}>
            {origin.citation ?? origin.documentId}
          </Link>
          {origin.since ? ` took effect on ${formatDay(origin.since)}` : ""}
        </>
      );
    default:
      return <>{status}: no source states it, and no other document changes it</>;
  }
}

function checksVerdict(view: DocumentView): string {
  if (view.suppression) {
    return "Suppressed: the assistant can’t cite it";
  }
  if (view.hold?.length) {
    return `Held back: ${view.hold.map((reason) => holdCheck(reason.check).label).join(", ")}`;
  }
  if (!view.published_at) {
    return "Not published yet";
  }
  const curated = view.texts.find((text) => text.editable && (text.correction || text.approval));
  if (curated?.correction) {
    return `Passed, with its text corrected by ${curated.correction.author}`;
  }
  if (curated?.approval) {
    return `Passed, with its structure problems approved as is by ${curated.approval.author}`;
  }
  return "Passed every check";
}
