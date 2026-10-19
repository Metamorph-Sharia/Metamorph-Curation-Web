import type { DocumentView } from "@/lib/api/types";
import { formatCount, formatDay, formatMoment } from "@/lib/format";
import { sentence } from "@/lib/labels";

import { Badge } from "../badge";
import { DocumentLink } from "../document-link";
import { Section } from "../section";
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
              <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-mono text-accent underline-offset-4 hover:underline" translate="no">
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

export function LinksSection({ view }: { view: DocumentView }) {
  const groups: [string, DocumentView["links_out"]][] = [
    ["This Document Cites", view.links_out],
    ["Cited By", view.links_in],
  ];
  return (
    <Section id="links" title="Links">
      {groups.map(([title, rows]) => (
        <div key={title} className="grid gap-2">
          <h3 className="text-sm font-medium">
            {title} ({formatCount(rows.length)})
          </h3>
          {rows.length ? (
            <Table head={["Relation", "Document", "Where", "How"]}>
              {rows.map((link) => (
                <tr key={`${link.type}/${link.document_id}/${link.from_address}/${link.to_address}`}>
                  <td className="whitespace-nowrap">{sentence(link.type)}</td>
                  <td>
                    {link.document_title ? (
                      <DocumentLink id={link.document_id} title={link.document_title} />
                    ) : (
                      <span className="font-mono text-muted" translate="no">
                        {link.document_id}
                      </span>
                    )}
                  </td>
                  <td className="font-mono text-xs">
                    {[link.from_address, link.to_address].filter(Boolean).join(" → ") || "Whole document"}
                  </td>
                  <td className="text-muted">{sentence(link.method)}</td>
                </tr>
              ))}
            </Table>
          ) : (
            <p className="text-sm text-muted">None.</p>
          )}
        </div>
      ))}
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
              <td className="font-mono">{row.status}</td>
              <td className="font-mono text-xs">{row.address ?? "Whole document"}</td>
              <td className="whitespace-nowrap">{row.effective_from ? formatDay(row.effective_from) : "Not stated"}</td>
              <td className="text-muted" translate="no">
                {row.source}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <p className="text-sm text-muted">No status history yet.</p>
      )}
    </Section>
  );
}

export function StructureSection({ view }: { view: DocumentView }) {
  const { provisions, provisions_total: total } = view;
  return (
    <Section id="structure" title="Structure">
      {provisions.length ? (
        <>
          <p className="text-sm text-muted">
            {formatCount(total)} provisions in the main text
            {total > provisions.length ? `; the first ${formatCount(provisions.length)} are shown` : ""}.
          </p>
          <ol aria-label="Provisions" className="grid rounded-ui border border-line bg-surface py-2 text-sm">
            {provisions.map((provision) => (
              <li
                key={provision.address}
                style={{ paddingLeft: `${1 + provision.depth * 1.25}rem` }}
                className="flex flex-wrap items-baseline gap-x-3 py-1 pr-4 [content-visibility:auto] [contain-intrinsic-size:auto_1.75rem]"
              >
                <span className="font-medium">{provision.label}</span>
                {provision.heading ? <span>{provision.heading}</span> : null}
                {provision.page_start ? <span className="text-xs text-muted">p.&nbsp;{provision.page_start}</span> : null}
                {provision.valid_to ? <Badge tone="warning">Changed {formatDay(provision.valid_to)}</Badge> : null}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="text-sm text-muted">The parser found no provisions in this document’s text.</p>
      )}
    </Section>
  );
}
