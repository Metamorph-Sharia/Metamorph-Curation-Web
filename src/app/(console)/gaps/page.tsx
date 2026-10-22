import type { Metadata } from "next";
import { Suspense } from "react";

import { GapsView } from "@/components/gaps-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { gaps } from "@/lib/api/curation";
import { pageNumber } from "@/lib/query";

export const metadata: Metadata = { title: "Numbering Gaps" };

export default function GapsPage({ searchParams }: PageProps<"/gaps">) {
  return (
    <div className="grid gap-10">
      <PageHead title="Numbering Gaps">
        Published texts that skip an article or a paragraph, usually a heading lost at a page break. The assistant reads
        them all the same. Check each gap against the PDF, then correct the text, or approve the gaps as they are on
        the document’s page.
      </PageHead>
      <Suspense fallback={<ListSkeleton />}>
        <Gaps searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Gaps({ searchParams }: { searchParams: PageProps<"/gaps">["searchParams"] }) {
  return <GapsView page={await gaps(pageNumber(await searchParams))} />;
}
