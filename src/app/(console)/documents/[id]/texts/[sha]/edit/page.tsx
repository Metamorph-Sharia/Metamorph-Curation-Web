import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { PageHead } from "@/components/page-head";
import { EditTextForm } from "@/components/text-editor/edit-text-form";
import { textToEdit } from "@/lib/api/curation";
import { documentHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Correct the Text" };

export default function EditTextPage({ params }: PageProps<"/documents/[id]/texts/[sha]/edit">) {
  return (
    <div className="grid gap-6">
      <PageHead title="Correct the Text">
        Fix the wording against the official file: a damaged heading, a missing article typed in from the PDF. The
        source’s text stays as it is; your correction is laid over it, parsed at once, and published if the document then
        passes.
      </PageHead>
      <Suspense fallback={<div aria-hidden className="h-[70vh] animate-pulse rounded-ui bg-sunken motion-reduce:animate-none" />}>
        <Editor params={params} />
      </Suspense>
    </div>
  );
}

async function Editor({ params }: Pick<PageProps<"/documents/[id]/texts/[sha]/edit">, "params">) {
  const { id, sha } = await params;
  const { text, wording } = await textToEdit(decodeURIComponent(id), sha);
  return (
    <div className="grid gap-4">
      <p className="text-sm">
        <Link href={documentHref(text.document_id, "content")} className="text-accent underline-offset-4 hover:underline">
          {text.citation}
        </Link>
      </p>
      {text.corrected ? (
        <p role="status" className="rounded-ui border border-warning bg-warning-soft px-4 py-2.5 text-sm">
          This text has a correction already. You are editing that correction; saving replaces it.
        </p>
      ) : null}
      <EditTextForm documentId={text.document_id} sha256={text.sha256} wording={wording} paged={text.paged} />
    </div>
  );
}
