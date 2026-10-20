import type { Metadata } from "next";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { DocumentPage } from "@/components/document/document-page";
import { DoneNotice } from "@/components/done-notice";
import { ListSkeleton } from "@/components/page-head";
import { document } from "@/lib/api/curation";
import { param } from "@/lib/query";

export const metadata: Metadata = { title: "Document" };

export default function Page({ params, searchParams }: PageProps<"/documents/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Document params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Document({ params, searchParams }: Pick<PageProps<"/documents/[id]">, "params" | "searchParams">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const view = await document(decodeURIComponent(id));
  return (
    <div className="grid gap-6">
      <Breadcrumbs trail={[["/documents", "Documents"]]} current={view.summary.citation} />
      <DoneNotice done={param(query, "done")} />
      <DocumentPage view={view} />
    </div>
  );
}
