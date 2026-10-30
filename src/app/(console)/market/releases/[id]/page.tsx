import type { Metadata } from "next";
import { Suspense } from "react";

import { ReleasePageView } from "@/components/market/publications-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { release } from "@/lib/api/curation";
import { formatDay } from "@/lib/format";

export const metadata: Metadata = { title: "Press Release" };

export default function ReleaseRoute({ params }: PageProps<"/market/releases/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Release params={params} />
    </Suspense>
  );
}

async function Release({ params }: Pick<PageProps<"/market/releases/[id]">, "params">) {
  const view = await release(decodeURIComponent((await params).id));
  return (
    <div className="grid gap-8">
      <PageHead title={view.release.title} trail={[["/market", "Market"], ["/market/releases", "Press Releases"]]}>
        {formatDay(view.release.published_on)}
        {view.release.number ? ` · ${view.release.number}` : ""}
      </PageHead>
      <ReleasePageView view={view} />
    </div>
  );
}
