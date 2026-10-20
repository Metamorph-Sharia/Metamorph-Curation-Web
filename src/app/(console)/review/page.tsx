import type { Metadata } from "next";
import { Suspense } from "react";

import { DoneNotice } from "@/components/done-notice";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { ReviewView } from "@/components/review-view";
import { overview, reviews } from "@/lib/api/curation";
import { pageNumber, param } from "@/lib/query";

export const metadata: Metadata = { title: "Review" };

const FIRST_QUEUE = "conflict";

export default function ReviewPage({ searchParams }: PageProps<"/review">) {
  return (
    <div className="grid gap-10">
      <PageHead title="Review">Items the platform can’t settle on its own. Each decision is recorded with your note.</PageHead>
      <Suspense fallback={<ListSkeleton />}>
        <Review searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Review({ searchParams }: { searchParams: PageProps<"/review">["searchParams"] }) {
  const query = await searchParams;
  // The queue and the per-queue counts don't depend on each other: read them together.
  const [page, dashboard] = await Promise.all([reviews(param(query, "kind") ?? FIRST_QUEUE, pageNumber(query)), overview()]);
  return (
    <>
      <DoneNotice done={param(query, "done")} />
      <ReviewView page={page} counts={dashboard.open_reviews} />
    </>
  );
}
