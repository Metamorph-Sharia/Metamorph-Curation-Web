import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ListSkeleton, PageHead } from "@/components/page-head";
import { SearchView } from "@/components/search-view";
import { search } from "@/lib/api/curation";
import { pageNumber, param } from "@/lib/query";
import { searchHref, type SearchState } from "@/lib/search";

export const metadata: Metadata = { title: "Documents" };

export default function DocumentsPage({ searchParams }: PageProps<"/documents">) {
  return (
    <div className="grid gap-10">
      <PageHead title="Documents" />
      <Suspense fallback={<ListSkeleton />}>
        <Search searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

const FILTERS = ["issuer", "family", "year", "status", "state"] as const;

// The search's state is the URL's: the query, what to list (documents or articles), the filters and the page.
async function Search({ searchParams }: { searchParams: PageProps<"/documents">["searchParams"] }) {
  const query = await searchParams;
  const q = (param(query, "q") ?? "").trim();
  const state: SearchState = {
    q: q || undefined,
    kind: q && param(query, "kind") === "articles" ? "articles" : "documents",
    page: pageNumber(query),
  };
  for (const name of FILTERS) {
    state[name] = param(query, name) || undefined;
  }
  if (Object.values(query).some((value) => value === "")) {
    redirect(searchHref(state, { page: state.page })); // the search form sends its empty filters too
  }
  return <SearchView state={state} page={await search(state)} />;
}
