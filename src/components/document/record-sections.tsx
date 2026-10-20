import Link from "next/link";

import type { DocumentView } from "@/lib/api/types";
import { formatCount, formatDay, formatMoment } from "@/lib/format";
import { addressLabel, lineage, statusLabel, statusTone } from "@/lib/legal";
import { documentHref, readerHref } from "@/lib/routes";

import { Badge } from "../badge";
import { Empty } from "../empty";
import { Section } from "../section";
import { button, CARD, LINK } from "../styles";
import { Table } from "../table";

export function SourcesSection({ sources }: { sources: DocumentView["sources"] }) {
  return (
    <Section id="sources" title="Sources">
      <Table head={["Connector", "Record", "Fetched", "Listing"]}>
        {sources.map((source) => (
          <tr key={`${source.connector}/${source.source_id}`}>
            <td className="whitespace-nowrap font-mono" translate="no">
              {source.connector}
            </td>
            <td className="break-all">
              <a href={source.url} target="_blank" rel="noopener noreferrer" className={`${LINK} font-mono`} translate="no">
                {source.source_id}
                <span className="sr-only"> (new tab)</span>
              </a>
            </td>
            <td className="whitespace-nowrap">{formatMoment(source.fetched_at)}</td>
            <td>
              {source.missing_since ? (
                <Badge tone="warning">Gone since {formatDay(source.missing_since)}</Badge>
              ) : (
                <Badge tone="ok">Listed</Badge>
              )}
            </td>
          </tr>
        ))}
      </Table>
    </Section>
  );
}

// What changed this document, what it changes, and what it rests on: its links, grouped by what they mean.
export function LineageSection({ view }: { view: DocumentView }) {
  const groups = lineage(view.links_out, view.links_in);
  return (
    <Section id="lineage" title="Lineage">
      {groups.length ? (
        <div className="grid gap-6">
          {groups.map((group) => (
            <div key={group.key} className="grid gap-2">
              <h3 className="flex items-baseline gap-2 text-sm font-semibold">
                {group.label} <span className="font-normal tabular-nums text-muted">({formatCount(group.entries.length)})</span>
              </h3>
              <ul className={`${CARD} divide-y divide-line`}>
                {group.entries.map((entry) => (
                  <li key={entry.documentId} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
                    <div className="grid min-w-0 gap-0.5">
                      {entry.title !== null ? (
                        <Link href={documentHref(entry.documentId)} className={`${LINK} w-fit font-medium`}>
                          {entry.citation ?? entry.documentId}
                        </Link>
                      ) : (
                        <span className="font-mono text-muted" translate="no">
                          {entry.documentId} <span className="font-sans">(not held)</span>
                        </span>
                      )}
                      {entry.title ? <span className="line-clamp-2 text-muted">{entry.title}</span> : null}
                      {entry.articles.length ? (
                        <span>
                          {entry.wholeDocument ? "The document, and " : ""}
                          {entry.articles.join(", ")}
                        </span>
                      ) : null}
                    </div>
                    {entry.effectiveOn ? (
                      <span className="whitespace-nowrap text-muted tabular-nums sm:text-right">
                        Effective {formatDay(entry.effectiveOn)}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <Empty>No link to or from another document.</Empty>
      )}
    </Section>
  );
}

export function StatusSection({ rows }: { rows: DocumentView["status_history"] }) {
  return (
    <Section id="status" title="Status History">
      {rows.length ? (
        <Table head={["Status", "Of", "From", "Source"]}>
          {rows.map((row, index) => (
            <tr key={`${row.status}/${row.address}/${row.effective_from}/${index}`}>
              <td className="whitespace-nowrap">
                <Badge tone={statusTone(row.status)}>{statusLabel(row.status)}</Badge>
              </td>
              <td>{row.address ? addressLabel(row.address) : "The whole document"}</td>
              <td className="whitespace-nowrap tabular-nums">{row.effective_from ? formatDay(row.effective_from) : "Not stated"}</td>
              <td className="text-muted">
                {row.caused_by ? (
                  <Link href={documentHref(row.caused_by)} className={LINK}>
                    {row.caused_by_citation ?? row.caused_by}
                  </Link>
                ) : (
                  <span className="font-mono" translate="no">
                    {row.source}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>No status history yet.</Empty>
      )}
    </Section>
  );
}

export function StructureSection({ view }: { view: DocumentView }) {
  const { provisions, provisions_total: total } = view;
  const changed = provisions.filter((provision) => provision.valid_to).length;
  return (
    <Section id="structure" title="Structure">
      {total ? (
        <div className={`${CARD} grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5`}>
          <p className="text-sm">
            {formatCount(total)} provisions in the main text
            {changed ? (
              <>
                {", "}
                <Badge tone="warning">{formatCount(changed)} changed by later documents</Badge>
              </>
            ) : null}
            .
          </p>
          <Link href={readerHref(view.summary.id)} className={button("primary")}>
            Read the Text
          </Link>
        </div>
      ) : (
        <Empty>The parser found no provisions in this document’s text.</Empty>
      )}
    </Section>
  );
}
