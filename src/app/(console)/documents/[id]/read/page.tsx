import type { Metadata } from "next";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ListSkeleton } from "@/components/page-head";
import { ReaderView } from "@/components/reader/reader-view";
import { reading } from "@/lib/api/curation";
import { param } from "@/lib/query";
import { documentHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Read the Text" };

// The reader: `text` (the main text when absent), `part`, or `at` (a provision: its part is found), and `pdf=1`
// for the official file beside the text.
export default function ReadPage({ params, searchParams }: PageProps<"/documents/[id]/read">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Reader params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Reader({ params, searchParams }: Pick<PageProps<"/documents/[id]/read">, "params" | "searchParams">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const part = Number(param(query, "part") ?? "0");
  const found = await reading(decodeURIComponent(id), {
    text: param(query, "text"),
    part: Number.isInteger(part) && part > 0 ? part : 0,
    at: param(query, "at"),
  });
  return (
    <div className="grid gap-6">
      <Breadcrumbs
        trail={[
          ["/documents", "Documents"],
          [documentHref(found.document_id), found.citation],
        ]}
        current="Read the Text"
      />
      <ReaderView reading={found} pdfBeside={param(query, "pdf") === "1"} />
    </div>
  );
}
