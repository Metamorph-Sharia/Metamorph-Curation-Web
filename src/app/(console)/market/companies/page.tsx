import type { Metadata } from "next";
import { Suspense } from "react";

import { CompanyList } from "@/components/market/companies-view";
import { MarketNav } from "@/components/market/market-nav";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { companies } from "@/lib/api/curation";
import { pageNumber, param } from "@/lib/query";

export const metadata: Metadata = { title: "Companies" };

export default function CompaniesPage({ searchParams }: PageProps<"/market/companies">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Companies" trail={[["/market", "Market"]]}>
        Every company OJK’s registers list, joined across its licence and registration, with its standing on the newest list.
      </PageHead>
      <MarketNav current="/market/companies" />
      <Suspense fallback={<ListSkeleton />}>
        <Companies searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Companies({ searchParams }: { searchParams: PageProps<"/market/companies">["searchParams"] }) {
  const query = await searchParams;
  const filters = {
    q: param(query, "q") ?? "",
    register: param(query, "register"),
    status: param(query, "status"),
    business_type: param(query, "business_type"),
  };
  return <CompanyList page={await companies({ ...filters, page: pageNumber(query) })} filters={filters} />;
}
