import type { Metadata } from "next";
import { Suspense } from "react";

import { MarketNav } from "@/components/market/market-nav";
import { ReleaseList } from "@/components/market/publications-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { releases } from "@/lib/api/curation";
import { releaseRange } from "@/lib/market";
import { pageNumber, param } from "@/lib/query";

export const metadata: Metadata = { title: "Press Releases" };

export default function ReleasesPage({ searchParams }: PageProps<"/market/releases">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Press Releases" trail={[["/market", "Market"]]}>
        OJK’s press releases since 2020: what it announced, with an official date, and the regulations and companies each
        names.
      </PageHead>
      <MarketNav current="/market/releases" />
      <Suspense fallback={<ListSkeleton />}>
        <Releases searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Releases({ searchParams }: { searchParams: PageProps<"/market/releases">["searchParams"] }) {
  const query = await searchParams;
  const filters = { q: param(query, "q") ?? "", ...releaseRange(param(query, "from"), param(query, "to")) };
  return <ReleaseList page={await releases({ ...filters, page: pageNumber(query) })} filters={filters} />;
}
