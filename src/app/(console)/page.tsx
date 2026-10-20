import type { Metadata } from "next";
import { Suspense } from "react";

import { OverviewSkeleton } from "@/components/overview-skeleton";
import { PageHead } from "@/components/page-head";
import { OverviewView } from "@/components/overview-view";
import { overview } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="grid gap-10">
      <PageHead title="Overview">
        What the publish gate holds back, what waits for review, ingestion health, and the latest loads.
      </PageHead>
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
    </div>
  );
}

async function Overview() {
  return <OverviewView dashboard={await overview()} />;
}
