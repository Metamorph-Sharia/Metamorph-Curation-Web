import type { Metadata } from "next";
import { Suspense } from "react";

import { MarketNav } from "@/components/market/market-nav";
import { DatasetList } from "@/components/market/statistics-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { datasets, marketSources } from "@/lib/api/curation";
import { pageNumber, param } from "@/lib/query";

export const metadata: Metadata = { title: "Statistics" };

export default function DatasetsPage({ searchParams }: PageProps<"/market/datasets">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Statistics" trail={[["/market", "Market"]]}>
        The statistics published: OJK’s portal, BI’s SEKI and BPS’s tables, each a dataset of series, with the regulations
        its industry links.
      </PageHead>
      <MarketNav current="/market/datasets" />
      <Suspense fallback={<ListSkeleton />}>
        <Datasets searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Datasets({ searchParams }: { searchParams: PageProps<"/market/datasets">["searchParams"] }) {
  const query = await searchParams;
  const filters = { q: param(query, "q") ?? "", source: param(query, "source"), industry: param(query, "industry") };
  // The page of datasets and the sources' counts don't depend on each other: read them together.
  const [page, sources] = await Promise.all([datasets({ ...filters, page: pageNumber(query) }), marketSources()]);
  return <DatasetList page={page} filters={filters} sources={sources.sources} />;
}
