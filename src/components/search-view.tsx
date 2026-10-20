import Link from "next/link";

import type { ArticleHit, DocumentHit, SearchPage } from "@/lib/api/types";
import { formatCount } from "@/lib/format";
import { statusLabel, statusTone } from "@/lib/legal";
import { readerHref, documentHref } from "@/lib/routes";
import {
  excerptParts,
  FACET_LABELS,
  facetValueLabel,
  familyLabel,
  searchHref,
  type SearchState,
  stateLabel,
} from "@/lib/search";

import { Badge } from "./badge";
import { Empty } from "./empty";
import { button, CARD, CONTROL, LINK } from "./styles";
import { Pager, Tabs } from "./tabs";

export const SEARCH_FORM = "search";
const STATE_TONES = { held: "warning", suppressed: "critical", unpublished: "neutral" } as const;

// The search: a query, the filters beside the results (each value with its count), and the results: documents,
// or the articles whose wording matches.
export function SearchView({ state, page }: { state: SearchState; page: SearchPage }) {
  const filtered = Object.keys(FACET_LABELS).some((name) => state[name as keyof SearchState]);
  return (
    <div className="grid gap-6">
      <SearchBar state={state} />
      <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <Filters state={state} page={page} />
        <div className="grid min-w-0 content-start gap-5">
          {state.q ? (
            <Tabs
              label="Results"
              tabs={[
                { href: searchHref(state, { kind: "documents" }), text: "Documents", count: page.documents_total, current: page.kind === "documents" },
                { href: searchHref(state, { kind: "articles" }), text: "Articles", count: page.articles_total, current: page.kind === "articles" },
              ]}
            />
          ) : (
            <p className="text-sm text-muted">
              {formatCount(page.documents_total)} {filtered ? "documents match the filters" : "documents in the registry"},
              newest first. Search by citation, ID, title or alias, or by words in the published text.
            </p>
          )}
          {page.kind === "articles" ? <ArticleList page={page} /> : <DocumentList page={page} />}
          <Pager page={page.page} pages={page.pages} href={(n) => searchHref(state, { page: n })} />
        </div>
      </div>
    </div>
  );
}

function SearchBar({ state }: { state: SearchState }) {
  return (
    <form id={SEARCH_FORM} role="search" action="/documents" className="flex max-w-3xl flex-wrap items-end gap-3">
      {state.kind && state.kind !== "documents" ? <input type="hidden" name="kind" value={state.kind} /> : null}
      <div className="grid min-w-0 flex-1 gap-1.5">
        <label htmlFor="q" className="text-sm font-medium">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={state.q}
          autoComplete="off"
          spellCheck={false}
          placeholder="10/POJK.05/2019, wakaf uang, or part of a title…"
          className={`${CONTROL} min-h-12 text-base`}
        />
      </div>
      <button type="submit" className={`${button("primary")} min-h-12 px-6`}>
        Search
      </button>
    </form>
  );
}

// Each facet as a select in the search form (so a query and its filters go together), and each filter in use as
// a chip that removes it.
function Filters({ state, page }: { state: SearchState; page: SearchPage }) {
  const active = page.facets.filter((facet) => state[facet.name as keyof SearchState]);
  return (
    <aside aria-label="Filters" className="grid content-start gap-4 lg:sticky lg:top-24 lg:self-start">
      {active.length ? (
        <ul aria-label="Filters in use" className="flex flex-wrap gap-2">
          {active.map((facet) => {
            const value = String(state[facet.name as keyof SearchState]);
            return (
              <li key={facet.name}>
                <Link
                  href={searchHref(state, { [facet.name]: undefined })}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 text-sm text-accent transition-colors hover:bg-surface"
                >
                  {FACET_LABELS[facet.name]}: {facetValueLabel(facet.name, value)}
                  <span aria-hidden>×</span>
                  <span className="sr-only">(remove)</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
      {page.facets.map((facet) => (
        <div key={facet.name} className="grid gap-1.5">
          <label htmlFor={`facet-${facet.name}`} className="text-sm font-medium">
            {FACET_LABELS[facet.name] ?? facet.name}
          </label>
          <select
            id={`facet-${facet.name}`}
            name={facet.name}
            form={SEARCH_FORM}
            defaultValue={String(state[facet.name as keyof SearchState] ?? "")}
            className={CONTROL}
          >
            <option value="">All</option>
            {facet.values.map(([value, count]) => (
              <option key={value} value={value}>
                {facetValueLabel(facet.name, value)} ({formatCount(count)})
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit" form={SEARCH_FORM} className={button("quiet")}>
        Apply Filters
      </button>
    </aside>
  );
}

function DocumentList({ page }: { page: SearchPage }) {
  if (!page.documents.length) {
    return <Empty>{page.query ? `No document matches “${page.query}” with these filters.` : "No document matches these filters."}</Empty>;
  }
  return (
    <ul aria-label="Matching documents" className="grid gap-3">
      {page.documents.map((hit) => (
        <DocumentCard key={hit.id} hit={hit} />
      ))}
    </ul>
  );
}

export function DocumentCard({ hit }: { hit: DocumentHit }) {
  return (
    <li className={`${CARD} grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:p-5`}>
      <div className="grid min-w-0 gap-1">
        <h2 className="font-heading text-xl leading-snug text-pretty">
          <Link href={documentHref(hit.id)} className={LINK}>
            {hit.citation}
          </Link>
        </h2>
        <span className="break-all font-mono text-xs text-muted" translate="no">
          {hit.id}
        </span>
        <span className="line-clamp-2 text-sm text-muted">{hit.title}</span>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Badge tone="neutral">
          {familyLabel(hit.family)}
          {hit.year ? ` · ${hit.year}` : ""}
        </Badge>
        <Badge tone={statusTone(hit.status)}>{statusLabel(hit.status)}</Badge>
        {hit.state === "published" ? null : <Badge tone={STATE_TONES[hit.state as keyof typeof STATE_TONES] ?? "neutral"}>{stateLabel(hit.state)}</Badge>}
      </div>
    </li>
  );
}

function ArticleList({ page }: { page: SearchPage }) {
  if (!page.articles.length) {
    return <Empty>No published article’s wording matches “{page.query}” with these filters.</Empty>;
  }
  return (
    <ul aria-label="Matching articles" className="grid gap-3">
      {page.articles.map((hit) => (
        <ArticleCard key={`${hit.document_id}/${hit.address}`} hit={hit} />
      ))}
    </ul>
  );
}

function ArticleCard({ hit }: { hit: ArticleHit }) {
  return (
    <li className={`${CARD} grid gap-2 p-4 sm:p-5`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-semibold">
          <Link href={readerHref(hit.document_id, { at: hit.address })} className={LINK}>
            {hit.label}
            {hit.heading ? <span className="font-normal"> {hit.heading}</span> : null}
          </Link>{" "}
          <span className="font-normal text-muted">
            in{" "}
            <Link href={documentHref(hit.document_id)} className="underline-offset-4 hover:underline">
              {hit.citation}
            </Link>
          </span>
        </h2>
        <Badge tone={statusTone(hit.status)}>{statusLabel(hit.status)}</Badge>
      </div>
      <p className="line-clamp-1 text-sm text-muted">{hit.title}</p>
      <p className="text-sm leading-relaxed text-pretty">
        {excerptParts(hit.excerpt).map((part, index) =>
          part.match ? (
            <mark key={index} className="rounded-sm bg-warning-soft px-0.5 text-text">
              {part.text}
            </mark>
          ) : (
            <span key={index}>{part.text}</span>
          ),
        )}
      </p>
    </li>
  );
}
