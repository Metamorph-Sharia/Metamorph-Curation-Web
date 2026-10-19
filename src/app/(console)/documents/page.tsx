import type { Metadata } from "next";
import { Suspense } from "react";

import { ListSkeleton, PageHead } from "@/components/page-head";
import { SearchView } from "@/components/search-view";
import { search } from "@/lib/api/curation";
import { param } from "@/lib/query";

export const metadata: Metadata = { title: "Documents" };

export default function DocumentsPage({ searchParams }: PageProps<"/documents">) {
  return (
    <div className="grid gap-8">
      <PageHead title="Documents" />
      <Suspense fallback={<ListSkeleton />}>
        <Search searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Search({ searchParams }: { searchParams: PageProps<"/documents">["searchParams"] }) {
  const q = (param(await searchParams, "q") ?? "").trim();
  return (
    <div className="grid gap-6">
      <form role="search" action="/documents" className="flex flex-wrap items-end gap-3">
        <div className="grid min-w-0 flex-1 gap-1.5">
          <label htmlFor="q" className="text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            autoComplete="off"
            spellCheck={false}
            placeholder="10/POJK.05/2019, ojk:pojk:2019:10, or part of a title…"
            className="w-full rounded-ui border border-line-strong bg-surface px-3 py-2 text-sm placeholder:text-muted"
          />
        </div>
        <button type="submit" className="rounded-ui bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover active:translate-y-px">
          Search
        </button>
      </form>
      <SearchView query={q} results={q ? await search(q) : []} />
    </div>
  );
}
