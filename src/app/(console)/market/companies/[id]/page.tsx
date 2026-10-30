import type { Metadata } from "next";
import { Suspense } from "react";

import { CompanyPageView } from "@/components/market/companies-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { company } from "@/lib/api/curation";

export const metadata: Metadata = { title: "Company" };

export default function CompanyRoute({ params }: PageProps<"/market/companies/[id]">) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <Company params={params} />
    </Suspense>
  );
}

async function Company({ params }: Pick<PageProps<"/market/companies/[id]">, "params">) {
  const view = await company(decodeURIComponent((await params).id));
  return (
    <div className="grid gap-8">
      <PageHead title={view.company.legal_name} trail={[["/market", "Market"], ["/market/companies", "Companies"]]} />
      <CompanyPageView view={view} />
    </div>
  );
}
