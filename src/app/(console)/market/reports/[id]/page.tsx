import type { Metadata } from "next";
import { Suspense } from "react";

import { ReportPageView } from "@/components/market/publications-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { report } from "@/lib/api/curation";
import { pageNumber } from "@/lib/query";

export const metadata: Metadata = { title: "Report" };

export default function ReportRoute({ params, searchParams }: PageProps<"/market/reports/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Report params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Report({ params, searchParams }: Pick<PageProps<"/market/reports/[id]">, "params" | "searchParams">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const view = await report(decodeURIComponent(id), pageNumber(query));
  return (
    <div className="grid gap-8">
      <PageHead title={view.report.title} trail={[["/market", "Market"], ["/market/reports", "Reports"]]} />
      <ReportPageView view={view} />
    </div>
  );
}
