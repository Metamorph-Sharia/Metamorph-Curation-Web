import type { HeldPage } from "@/lib/api/types";
import { formatDay } from "@/lib/format";
import { holdCheck } from "@/lib/labels";

import { DocumentLink } from "./document-link";
import { Empty } from "./empty";
import { Pager, Tabs } from "./tabs";

const href = (check: string | null, page = 1) =>
  `/held${check ? `?check=${check}` : ""}${page > 1 ? `${check ? "&" : "?"}page=${page}` : ""}`;

// The documents the publish gate holds back: why, and which version (if any) the assistant still sees.
export function HeldView({ page }: { page: HeldPage }) {
  const tabs = [
    { href: "/held", text: "All", current: !page.check },
    ...page.counts.map(([check, count]) => ({
      href: href(check),
      text: holdCheck(check).label,
      count,
      current: check === page.check,
    })),
  ];
  return (
    <div className="grid gap-6">
      <Tabs label="Held by check" tabs={tabs} />
      {page.check ? <p className="max-w-[65ch] text-sm text-muted">{holdCheck(page.check).todo}</p> : null}
      {page.rows.length ? (
        <ul aria-label="Held documents" className="divide-y divide-line rounded-ui border border-line bg-surface">
          {page.rows.map((row) => (
            <li key={row.document_id} className="grid gap-2 p-4 [content-visibility:auto]">
              <DocumentLink id={row.document_id} title={row.title} />
              <ul className="grid gap-1 text-sm">
                {row.reasons.map((reason) => (
                  <li key={`${reason.check}:${reason.detail}`}>
                    {holdCheck(reason.check).label}: {reason.detail}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted">
                Held since {formatDay(row.held_since)}.{" "}
                {row.published_at
                  ? `Last published ${formatDay(row.published_at)}: the assistant still sees that version.`
                  : "Never published."}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Nothing is held here. Every document passes the publish gate.</Empty>
      )}
      <Pager page={page.page} pages={page.pages} href={(n) => href(page.check, n)} />
    </div>
  );
}
