import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHead } from "@/components/page-head";
import { notice } from "@/components/styles";
import { EditTextForm } from "@/components/text-editor/edit-text-form";
import { textToEdit } from "@/lib/api/curation";
import { param } from "@/lib/query";
import { editRange } from "@/lib/reading";
import { documentHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Correct the Text" };

const TITLE = "Correct the Text";
const DOCUMENTS: [string, string] = ["/documents", "Documents"];
const ABOUT =
  "Fix the wording against the official file: a damaged heading, a missing article typed in from the PDF. The source’s text stays as it is; your correction is laid over it, parsed at once, and published if the document then passes.";

// The frame prerenders with the title; the document's citation joins the trail when the text arrives.
// `at` (from the reader's Correct link) opens the editor on that provision's wording.
export default function EditTextPage({ params, searchParams }: PageProps<"/documents/[id]/texts/[sha]/edit">) {
  return (
    <Suspense
      fallback={
        <div className="grid gap-8">
          <PageHead title={TITLE} trail={[DOCUMENTS]}>
            {ABOUT}
          </PageHead>
          <div aria-hidden className="h-[70vh] animate-pulse rounded-ui bg-sunken motion-reduce:animate-none" />
        </div>
      }
    >
      <Editor params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Editor({
  params,
  searchParams,
}: Pick<PageProps<"/documents/[id]/texts/[sha]/edit">, "params" | "searchParams">) {
  const [{ id, sha }, query] = await Promise.all([params, searchParams]);
  const { text, wording } = await textToEdit(decodeURIComponent(id), sha);
  return (
    <div className="grid gap-8">
      <PageHead title={TITLE} trail={[DOCUMENTS, [documentHref(text.document_id, "content"), text.citation]]}>
        {ABOUT}
      </PageHead>
      {text.corrected ? (
        <p role="status" className={notice("warning")}>
          This text has a correction already. You are editing that correction; saving replaces it.
        </p>
      ) : null}
      <EditTextForm
        documentId={text.document_id}
        sha256={text.sha256}
        wording={wording}
        paged={text.paged}
        selection={editRange(param(query, "at"), wording.length)}
      />
    </div>
  );
}
