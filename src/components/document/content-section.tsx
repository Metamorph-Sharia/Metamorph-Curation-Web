import Link from "next/link";

import { approve, withdrawApproval, withdrawTextCorrection } from "@/app/(console)/documents/[id]/actions";
import type { ContentRow, DocumentView } from "@/lib/api/types";
import { formatFirst } from "@/lib/format";
import { contentHref, textHref } from "@/lib/routes";

import { ActionForm } from "../action-form";
import { Badge } from "../badge";
import { Empty } from "../empty";
import { ReasonField } from "../fields";
import { Section } from "../section";
import { button, CARD, LINK } from "../styles";
import { NoteLine } from "./note";

const PROBLEMS_SHOWN = 3;

// The document's files and texts. A main text's structure problems can be approved as they are, and its wording
// corrected (and the correction withdrawn).
export function ContentSection({ view }: { view: DocumentView }) {
  const id = view.summary.id;
  if (!view.files.length && !view.texts.length) {
    return (
      <Section id="content" title="Files & Texts">
        <Empty>No file or text is held for this document.</Empty>
      </Section>
    );
  }
  return (
    <Section id="content" title="Files & Texts">
      <ul className="grid gap-3">
        {view.files.map((file) => (
          <li key={file.sha256} className={`${CARD} grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5`}>
            <div className="text-sm">
              <p className="font-medium">File: {file.label}</p>
              <p className="text-muted">
                {file.media_type}
                {file.detail ? `, ${file.detail}` : ""}
              </p>
            </div>
            <OpenLink href={contentHref(id, file.sha256)}>Open File</OpenLink>
          </li>
        ))}
        {view.texts.map((textRow) => (
          <li key={textRow.sha256} className={`${CARD} grid gap-4 p-4 sm:p-5`}>
            <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="text-sm">
                <p className="font-medium">
                  Text: <span translate="no">{textRow.label}</span>
                </p>
                <p className="text-muted">{textRow.detail}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <OpenLink href={contentHref(id, textRow.sha256)}>Open Text</OpenLink>
                {textRow.editable ? (
                  <Link href={textHref(id, textRow.sha256, "edit")} className={button("quiet")}>
                    Edit Text
                  </Link>
                ) : null}
              </div>
            </div>
            <Structure documentId={id} text={textRow} />
            {textRow.correction ? (
              <div className="grid gap-3 border-t border-line pt-4">
                <p className="flex flex-wrap items-center gap-2">
                  <Badge tone="ok">Corrected</Badge>
                  <NoteLine prefix="Corrected" note={textRow.correction} />
                  <Link href={textHref(id, textRow.sha256, "correction")} className={`${LINK} text-sm`}>
                    See the changes
                  </Link>
                </p>
                <ActionForm
                  action={withdrawTextCorrection.bind(null, id, textRow.sha256)}
                  submit="Withdraw Correction"
                  busy="Withdrawing…"
                  tone="quiet"
                  className="grid gap-2 sm:max-w-md"
                >
                  <ReasonField id={`correction-${textRow.sha256}-reason`} placeholder="Why the source’s text is right after all…" />
                </ActionForm>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Structure({ documentId, text }: { documentId: string; text: ContentRow }) {
  const problems = text.problems ?? [];
  if (!problems.length) {
    return (
      <p>
        <Badge tone="ok">Structure passes</Badge>
      </p>
    );
  }
  return (
    <div className="grid gap-3 border-t border-line pt-4">
      <p className="flex flex-wrap items-center gap-2 text-sm">
        <Badge tone="warning">
          {problems.length} {problems.length === 1 ? "problem" : "problems"}
        </Badge>
        <span>{formatFirst(problems, PROBLEMS_SHOWN)}</span>
      </p>
      {text.approval ? (
        <>
          <p className="flex flex-wrap items-center gap-2">
            <Badge tone="ok">Approved as is</Badge>
            <NoteLine prefix="Approved" note={text.approval} />
          </p>
          <ActionForm
            action={withdrawApproval.bind(null, documentId, text.sha256)}
            submit="Withdraw Approval"
            busy="Withdrawing…"
            tone="quiet"
            className="grid gap-2 sm:max-w-md"
          >
            <ReasonField id={`approval-${text.sha256}-withdraw`} placeholder="Why the problems aren’t genuine after all…" />
          </ActionForm>
        </>
      ) : (
        <ActionForm action={approve.bind(null, documentId, text.sha256)} submit="Approve as Is" busy="Approving…" className="grid gap-2 sm:max-w-md">
          <ReasonField id={`approval-${text.sha256}`} placeholder="Why the gaps are genuine, e.g. Pasal 3 deleted by POJK 12/2021…" />
        </ActionForm>
      )}
    </div>
  );
}

// Files open in a new tab, through a short-lived link straight to the object store.
function OpenLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={`${LINK} inline-flex items-center gap-1 text-sm`}>
      {children}
      <span aria-hidden>↗</span>
      <span className="sr-only"> (new tab)</span>
    </a>
  );
}
