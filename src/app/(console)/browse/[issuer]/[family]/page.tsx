import type { Metadata } from "next";
import { Suspense } from "react";

import { SeriesView } from "@/components/browse-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { seriesPage } from "@/lib/api/curation";
import { param } from "@/lib/query";
import { familyLabel, issuerLabel } from "@/lib/search";

export const metadata: Metadata = { title: "Browse" };

const BROWSE: [string, string] = ["/browse", "Browse"];

export default function SeriesRoute({ params, searchParams }: PageProps<"/browse/[issuer]/[family]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Series params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function Series({ params, searchParams }: Pick<PageProps<"/browse/[issuer]/[family]">, "params" | "searchParams">) {
  const [{ issuer, family }, query] = await Promise.all([params, searchParams]);
  const year = Number(param(query, "year"));
  const page = await seriesPage(decodeURIComponent(issuer), decodeURIComponent(family), Number.isInteger(year) && year > 0 ? year : undefined);
  return (
    <div className="grid gap-8">
      <PageHead title={`${issuerLabel(page.issuer)} ${familyLabel(page.family)}`} trail={[BROWSE]} />
      <SeriesView page={page} />
    </div>
  );
}
