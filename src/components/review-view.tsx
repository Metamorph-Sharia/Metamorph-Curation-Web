import type { ReviewPage } from "@/lib/api/types";
import { formatDay } from "@/lib/format";
import { reviewQueue } from "@/lib/labels";

import { DecideReview } from "./decide-review";
import { DocumentLink } from "./document-link";
import { Empty } from "./empty";
import { CARD } from "./styles";
import { Pager, Tabs } from "./tabs";

const href = (kind: string, page = 1) => `/review?kind=${kind}${page > 1 ? `&page=${page}` : ""}`;

// One review queue: why its items land there, what to do, and each item with its decision form.
export function ReviewView({ page, counts }: { page: ReviewPage; counts: [string, number][] }) {
  const queue = reviewQueue(page.kind);
  const back = href(page.kind, page.page);
  return (
    <div className="grid gap-6">
      <Tabs
        label="Review queues"
        tabs={counts.map(([kind, count]) => ({
          href: href(kind),
          text: reviewQueue(kind).label,
          count,
          current: kind === page.kind,
        }))}
      />
      <p className="max-w-[65ch] text-sm text-muted">
        {queue.why} {queue.todo}
      </p>
      {page.rows.length ? (
        <ul aria-label="Items waiting for review" className="grid gap-3">
          {page.rows.map((row) => (
            <li key={row.id} className={`${CARD} grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto]`}>
              <div className="grid content-start gap-2">
                {row.document_id ? (
                  <DocumentLink id={row.document_id} title={row.document_title} />
                ) : (
                  <span className="text-sm text-muted">No single document</span>
                )}
                <p className="max-w-[70ch] text-sm text-pretty">{row.summary}</p>
                <p className="text-xs text-muted">Waiting since {formatDay(row.created_at)}</p>
              </div>
              <DecideReview itemId={row.id} back={back} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty>Nothing waits here.</Empty>
      )}
      <Pager page={page.page} pages={page.pages} href={(n) => href(page.kind, n)} />
    </div>
  );
}
