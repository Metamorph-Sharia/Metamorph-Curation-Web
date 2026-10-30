import type { Metadata } from "next";
import { Suspense } from "react";

import { SeriesPageView } from "@/components/market/statistics-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { marketSeries } from "@/lib/api/curation";
import { datasetHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Series" };

export default function SeriesRoute({ params }: PageProps<"/market/series/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Series params={params} />
    </Suspense>
  );
}

async function Series({ params }: Pick<PageProps<"/market/series/[id]">, "params">) {
  const view = await marketSeries(decodeURIComponent((await params).id));
  return (
    <div className="grid gap-8">
      <PageHead
        title={view.series.label}
        trail={[["/market", "Market"], ["/market/datasets", "Statistics"], [datasetHref(view.dataset), view.measure]]}
      />
      <SeriesPageView view={view} />
    </div>
  );
}
