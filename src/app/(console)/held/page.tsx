import type { Metadata } from "next";
import { Suspense } from "react";

import { HeldView } from "@/components/held-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { held } from "@/lib/api/curation";
import { pageNumber, param } from "@/lib/query";

export const metadata: Metadata = { title: "Held Documents" };

export default function HeldPage({ searchParams }: PageProps<"/held">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Held Documents">
        Documents the publish gate holds back. Each stays out of what the assistant reads, or keeps its last good
        version, until it passes its checks or a curator approves its problems as they are.
      </PageHead>
      <Suspense fallback={<ListSkeleton />}>
        <Held searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Held({ searchParams }: { searchParams: PageProps<"/held">["searchParams"] }) {
  const query = await searchParams;
  return <HeldView page={await held(param(query, "check") || undefined, pageNumber(query))} />;
}
