import Link from "next/link";

import type { PassageRow, ReleasePage, ReleaseView, ReportRow, ReportView } from "@/lib/api/types";
import { formatCount, formatDay } from "@/lib/format";
import { companyHref, documentHref, marketListHref, releaseHref, reportHref } from "@/lib/routes";

import { Badge } from "../badge";
import { Empty } from "../empty";
import { Section } from "../section";
import { button, CARD, CONTROL, LINK } from "../styles";
import { Table } from "../table";
import { Pager } from "../tabs";

// The regulators' reports: what each says, never a rule. Newest first.
export function ReportList({ rows }: { rows: readonly ReportRow[] }) {
  return rows.length ? (
    <Table head={["Report", "Published", "Pages", "Passages", "Read By"]} numeric={[2, 3]}>
      {rows.map((row) => (
        <tr key={row.id}>
          <td>
            <Link href={reportHref(row.id)} className={LINK}>
              {row.title}
            </Link>
            <p className="font-mono text-xs text-muted" translate="no">
              {row.id}
            </p>
          </td>
          <td className="whitespace-nowrap">{row.published_on ? formatDay(row.published_on) : "Not stated"}</td>
          <td className="text-right font-mono tabular-nums">{formatCount(row.pages)}</td>
          <td className="text-right font-mono tabular-nums">{formatCount(row.passages)}</td>
          <td>{row.method === "ocr" ? "OCR (MinerU)" : "Its text layer"}</td>
        </tr>
      ))}
    </Table>
  ) : (
    <Empty>No report is published yet. The reports connector syncs LPKSI; others are imported by hand.</Empty>
  );
}

export function ReportPageView({ view }: { view: ReportView }) {
  return (
    <div className="grid gap-10">
      <p className="text-sm text-muted">
        Cited as “{view.citation}”. {formatCount(view.report.pages)} pages, {formatCount(view.report.passages)} passages.{" "}
        {view.url ? (
          <a href={view.url} target="_blank" rel="noopener" className={LINK}>
            Where OJK lists it
          </a>
        ) : null}
      </p>
      <Section id="passages" title="Passages">
        <Passages passages={view.passages} />
        <Pager page={view.page} pages={view.pages} href={(number) => reportHref(view.report.id, number)} />
      </Section>
    </div>
  );
}

export type ReleaseFilterState = { q: string; from?: string; to?: string };

// OJK's press releases, newest first: found by title or number, bounded by date; the URL keeps each.
export function ReleaseList({ page, filters }: { page: ReleasePage; filters: ReleaseFilterState }) {
  const href = (number: number) => marketListHref("releases", { ...filters, page: number });
  return (
    <div className="grid gap-6">
      <form role="search" action="/market/releases" className="flex flex-wrap items-end gap-3">
        <div className="grid min-w-0 flex-1 basis-64 gap-1.5">
          <label htmlFor="q" className="text-sm font-medium">
            Title or number
          </label>
          <input id="q" name="q" type="search" defaultValue={filters.q} autoComplete="off" placeholder="cabut izin, SP 188…"
            className={`${CONTROL} min-h-12 text-base`} />
        </div>
        <DateField id="from" label="Published from" value={filters.from} />
        <DateField id="to" label="To" value={filters.to} />
        <button type="submit" className={`${button("primary")} min-h-12 px-6`}>
          Search
        </button>
      </form>
      <p className="text-sm text-muted">{formatCount(page.total)} press releases</p>
      {page.rows.length ? (
        <ul className="grid gap-3">
          {page.rows.map((row) => (
            <li key={row.id} className={`${CARD} grid gap-1 p-4`}>
              <Link href={releaseHref(row.id)} className={LINK}>
                {row.title}
              </Link>
              <p className="text-sm text-muted">
                {formatDay(row.published_on)}
                {row.number ? ` · ${row.number}` : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>No press release matches. Clear the search or the dates to see more.</Empty>
      )}
      <Pager page={page.page} pages={page.pages} href={href} />
    </div>
  );
}

export function ReleasePageView({ view }: { view: ReleaseView }) {
  return (
    <div className="grid gap-10">
      <p className="text-sm text-muted">
        Cited as “{view.citation}”.{" "}
        {view.url ? (
          <a href={view.url} target="_blank" rel="noopener" className={LINK}>
            The release on ojk.go.id
          </a>
        ) : null}
      </p>
      <Section id="passages" title="Passages">
        <Passages passages={view.passages} />
      </Section>
    </div>
  );
}

// Each passage as published, the unit the assistant cites, with its pages and what it names.
function Passages({ passages }: { passages: readonly PassageRow[] }) {
  return (
    <ol className="grid gap-4">
      {passages.map((passage) => (
        <li key={passage.address} id={passage.address} className={`${CARD} grid scroll-mt-24 gap-3 p-5`}>
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="font-mono" translate="no">{passage.address}</span>
            {passage.page_start ? (
              <span>
                {passage.page_start === passage.page_end ? `Page ${passage.page_start}` : `Pages ${passage.page_start}–${passage.page_end}`}
              </span>
            ) : null}
            <span>{formatCount(passage.words)} words</span>
          </p>
          <p className="whitespace-pre-line text-pretty leading-relaxed">{passage.text}</p>
          {passage.names.length ? (
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted">Names</span>
              {passage.names.map((named) => (
                <Link
                  key={`${named.kind}:${named.id}`}
                  href={named.kind === "company" ? companyHref(named.id) : documentHref(named.id)}
                  className="rounded-full transition-opacity hover:opacity-75"
                >
                  <Badge tone="neutral">
                    <span className="font-mono" translate="no">{named.id}</span>
                  </Badge>
                </Link>
              ))}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function DateField({ id, label, value }: { id: string; label: string; value?: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input id={id} name={id} type="date" defaultValue={value} className={`${CONTROL} min-h-12`} />
    </div>
  );
}
