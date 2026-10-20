"use client";

import dynamic from "next/dynamic";

import { correctText } from "@/app/(console)/documents/[id]/actions";

import { ActionForm } from "../action-form";
import { ReasonField } from "../fields";

// The editor is the heaviest code in the console: it loads on this page only, after the page itself.
const TextEditor = dynamic(() => import("./text-editor"), {
  ssr: false,
  loading: () => <div aria-hidden className="h-[60vh] animate-pulse rounded-ui bg-sunken motion-reduce:animate-none" />,
});

export function EditTextForm({
  documentId,
  sha256,
  wording,
  paged,
  selection = null,
}: {
  documentId: string;
  sha256: string;
  wording: string;
  paged: boolean;
  selection?: [number, number] | null;
}) {
  return (
    <ActionForm action={correctText.bind(null, documentId, sha256)} submit="Save Correction" busy="Saving…">
      <div className="grid gap-2">
        <span id="wording-label" className="text-sm font-medium">
          Text
        </span>
        <TextEditor initial={wording} paged={paged} name="wording" labelledBy="wording-label" selection={selection} />
        {paged ? (
          <p className="text-xs text-muted">
            Page markers (<code className="font-mono">&lt;!-- page N --&gt;</code>) are kept as they are: page numbers come
            from them.
          </p>
        ) : null}
      </div>
      <ReasonField id="correction-reason" placeholder="Where the corrected wording comes from, e.g. the official PDF, page 14…" />
    </ActionForm>
  );
}
