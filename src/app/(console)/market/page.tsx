import type { Metadata } from "next";
import { Suspense } from "react";

import { DoneNotice } from "@/components/done-notice";
import { MarketNav } from "@/components/market/market-nav";
import { SourcesView } from "@/components/market/sources-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { WarningsNotice } from "@/components/warnings-notice";
import { marketSources } from "@/lib/api/curation";
import { param, params } from "@/lib/query";

export const metadata: Metadata = { title: "Market" };

export default function MarketPage({ searchParams }: PageProps<"/market">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Market">
        The market layer’s sources, and the links curators keep: which regulations and reports each register, industry
        and sector names. A change is published at once.
      </PageHead>
      <MarketNav current="/market" />
      <Suspense fallback={<ListSkeleton />}>
        <Sources searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Sources({ searchParams }: { searchParams: PageProps<"/market">["searchParams"] }) {
  const [query, sources] = await Promise.all([searchParams, marketSources()]);
  return (
    <>
      <DoneNotice done={param(query, "done")} />
      <WarningsNotice warnings={params(query, "warning")} />
      <SourcesView sources={sources} />
    </>
  );
}
