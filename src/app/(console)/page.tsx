import type { Metadata } from "next";
import { Suspense } from "react";

import { OverviewSkeleton } from "@/components/overview-skeleton";
import { OverviewView } from "@/components/overview-view";
import { overview } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Overview</h1>
        <p className="max-w-[65ch] text-muted">
          What the publish gate holds back, what waits for review, ingestion health, and the latest loads.
        </p>
      </div>
      <Suspense fallback={<OverviewSkeleton />}>
        <Overview />
      </Suspense>
    </div>
  );
}

async function Overview() {
  return <OverviewView dashboard={await overview()} />;
}
