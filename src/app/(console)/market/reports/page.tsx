import type { Metadata } from "next";
import { Suspense } from "react";

import { MarketNav } from "@/components/market/market-nav";
import { ReportList } from "@/components/market/publications-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { reports } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <div className="grid gap-8">
      <PageHead title="Reports" trail={[["/market", "Market"]]}>
        The regulators’ yearly reviews and roadmaps, cut into the passages the assistant cites. A report has no legal force:
        it says what a regulator reports or plans.
      </PageHead>
      <MarketNav current="/market/reports" />
      <Suspense fallback={<ListSkeleton />}>
        <Reports />
      </Suspense>
    </div>
  );
}

async function Reports() {
  return <ReportList rows={await reports()} />;
}
