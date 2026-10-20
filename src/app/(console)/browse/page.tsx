import type { Metadata } from "next";
import { Suspense } from "react";

import { SeriesList } from "@/components/browse-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { series } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Browse" };

export default function BrowsePage() {
  return (
    <div className="grid gap-10">
      <PageHead title="Browse">
        Every series the registry holds, by issuer. Open one to see a year’s documents by number, and the numbers missing
        from it.
      </PageHead>
      <Suspense fallback={<ListSkeleton />}>
        <Series />
      </Suspense>
    </div>
  );
}

async function Series() {
  return <SeriesList rows={await series()} />;
}
