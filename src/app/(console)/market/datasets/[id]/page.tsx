import type { Metadata } from "next";
import { Suspense } from "react";

import { DatasetPageView } from "@/components/market/statistics-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { dataset } from "@/lib/api/curation";
import { pageNumber } from "@/lib/query";

export const metadata: Metadata = { title: "Dataset" };

export default function DatasetRoute({ params, searchParams }: PageProps<"/market/datasets/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Dataset params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Dataset({ params, searchParams }: Pick<PageProps<"/market/datasets/[id]">, "params" | "searchParams">) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const view = await dataset(decodeURIComponent(id), pageNumber(query));
  return (
    <div className="grid gap-8">
      <PageHead title={view.dataset.metric} trail={[["/market", "Market"], ["/market/datasets", "Statistics"]]}>
        {view.dataset.group}
      </PageHead>
      <DatasetPageView view={view} />
    </div>
  );
}
