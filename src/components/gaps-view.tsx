import Link from "next/link";

import type { GapPage, ReviewNote } from "@/lib/api/types";
import { formatCount } from "@/lib/format";
import { readerHref } from "@/lib/routes";

import { DocumentLink } from "./document-link";
import { Empty } from "./empty";
import { CARD, LINK } from "./styles";
import { Pager } from "./tabs";

const NOTES_SHOWN = 5;

const href = (page: number) => `/gaps${page > 1 ? `?page=${page}` : ""}`;

// Published documents whose text skips an article or a paragraph. Each gap opens in the reader, where the curator
// checks it against the PDF; the rest of an omnibus law's many gaps wait behind a click.
export function GapsView({ page }: { page: GapPage }) {
  if (!page.rows.length) {
    return <Empty>No published text has a gap left to review.</Empty>;
  }
  return (
    <div className="grid gap-6">
      <p className="text-sm text-muted">
        {formatCount(page.total)} {page.total === 1 ? "document" : "documents"} published with gaps, by ID.
      </p>
      <ul aria-label="Documents with gaps" className="grid gap-3">
        {page.rows.map((row) => {
          const more = row.notes.slice(NOTES_SHOWN);
          return (
            <li key={row.document_id} className={`${CARD} grid gap-3 p-4 [content-visibility:auto] sm:p-5`}>
              <DocumentLink id={row.document_id} title={row.title} />
              <Notes documentId={row.document_id} notes={row.notes.slice(0, NOTES_SHOWN)} />
              {more.length ? (
                <details className="grid gap-1.5 text-sm">
                  <summary className={`${LINK} w-fit cursor-pointer rounded-ui`}>
                    {formatCount(more.length)} more {more.length === 1 ? "gap" : "gaps"}
                  </summary>
                  <Notes documentId={row.document_id} notes={more} />
                </details>
              ) : null}
            </li>
          );
        })}
      </ul>
      <Pager page={page.page} pages={page.pages} href={href} />
    </div>
  );
}

function Notes({ documentId, notes }: { documentId: string; notes: ReviewNote[] }) {
  return (
    <ul className="grid gap-1.5 text-sm">
      {notes.map(({ address, note }) => (
        <li key={note} className="flex gap-2">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
          <Link href={readerHref(documentId, { at: address ?? undefined })} className={`${LINK} break-words`}>
            {note}
          </Link>
        </li>
      ))}
    </ul>
  );
}
