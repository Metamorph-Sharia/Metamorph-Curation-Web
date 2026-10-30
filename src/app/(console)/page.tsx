import type { Metadata } from "next";
import { Suspense } from "react";

import { MarketSummary } from "@/components/market/market-summary";
import { OverviewSkeleton } from "@/components/overview-skeleton";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { OverviewView } from "@/components/overview-view";
import { marketOverview, overview } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="grid gap-10">
      <PageHead title="Overview">
        What the publish gate holds back, what waits for review, ingestion health, the latest loads, and the market data.
      </PageHead>
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
      <Suspense fallback={<ListSkeleton />}>
        <Market />
      </Suspense>
    </div>
  );
}

async function Overview() {
  return <OverviewView dashboard={await overview()} />;
}

// Its own boundary: the regulation layer's overview never waits for the market's.
async function Market() {
  return <MarketSummary overview={await marketOverview()} />;
}
