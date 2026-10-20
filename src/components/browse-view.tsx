import Link from "next/link";
import { Fragment } from "react";

import type { SeriesPage, SeriesRow } from "@/lib/api/types";
import { formatCount } from "@/lib/format";
import { statusLabel, statusTone } from "@/lib/legal";
import { browseHref, documentHref } from "@/lib/routes";
import { familyLabel, issuerLabel, numberGaps, stateLabel } from "@/lib/search";

import { Badge } from "./badge";
import { Empty } from "./empty";
import { CARD, LINK } from "./styles";
import { Tabs } from "./tabs";

// Every series the registry holds, by issuer: what to browse.
export function SeriesList({ rows }: { rows: SeriesRow[] }) {
  if (!rows.length) {
    return <Empty>The registry holds no documents yet.</Empty>;
  }
  const issuers = [...new Set(rows.map((row) => row.issuer))];
  return (
    <div className="grid gap-8">
      {issuers.map((issuer) => (
        <section key={issuer} aria-labelledby={`issuer-${issuer}`} className="grid gap-3">
          <h2 id={`issuer-${issuer}`} className="font-heading text-2xl leading-tight">
            {issuerLabel(issuer)}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {rows
              .filter((row) => row.issuer === issuer)
              .map((row) => (
                <li key={row.family}>
                  <Link
                    href={browseHref(row.issuer, row.family)}
                    className={`${CARD} grid gap-1 p-4 transition-colors hover:border-accent/40 hover:bg-sunken`}
                  >
                    <span className="font-medium text-accent">{familyLabel(row.family)}</span>
                    <span className="text-sm text-muted tabular-nums">
                      {formatCount(row.documents)} documents
                      {row.first_year ? `, ${row.first_year}–${row.last_year}` : ""}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

const STATE_TONES = { held: "warning", suppressed: "critical", unpublished: "neutral" } as const;

// A year of a series, by number, with the numbers the registry doesn't hold marked where they are missing: a
// coverage check against the issuer's own list.
export function SeriesView({ page }: { page: SeriesPage }) {
  const gaps = numberGaps(page.documents.map((document) => document.number));
  const missing = [...gaps.values()].flat();
  return (
    <div className="grid gap-6">
      <Tabs
        label="Years"
        tabs={page.years.map(([year, count]) => ({
          href: browseHref(page.issuer, page.family, year),
          text: String(year),
          count,
          current: year === page.year,
        }))}
      />
      <p className="text-sm text-muted">
        {formatCount(page.documents.length)} {familyLabel(page.family)} of {page.year} held
        {missing.length ? (
          <>
            {"; "}
            <strong className="font-medium text-warning">
              {missing.length === 1 ? "number" : "numbers"} {missing.join(", ")} not held
            </strong>
          </>
        ) : null}
        .
      </p>
      <ol aria-label={`${familyLabel(page.family)} of ${page.year}`} className={`${CARD} divide-y divide-line`}>
        {page.documents.map((document) => (
          <Fragment key={document.id}>
            {gaps.has(document.number) ? (
              <li role="note" className="bg-warning-soft px-4 py-2 text-sm text-warning">
                Not held: {familyLabel(page.family)} {gaps.get(document.number)!.join(", ")} of {page.year}
              </li>
            ) : null}
            <li className="grid gap-1 px-4 py-3 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-4">
              <span className="font-mono text-sm tabular-nums text-muted">{document.number}</span>
              <div className="grid min-w-0 gap-0.5">
                <Link href={documentHref(document.id)} className={`${LINK} w-fit font-medium`}>
                  {document.citation}
                </Link>
                <span className="line-clamp-2 text-sm text-muted">{document.title}</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <Badge tone={statusTone(document.status)}>{statusLabel(document.status)}</Badge>
                {document.state === "published" ? null : (
                  <Badge tone={STATE_TONES[document.state as keyof typeof STATE_TONES] ?? "neutral"}>{stateLabel(document.state)}</Badge>
                )}
              </div>
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
