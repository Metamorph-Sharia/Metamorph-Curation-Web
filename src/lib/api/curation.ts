import "server-only";

import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

import type { SearchState } from "../search";
import { sessionToken } from "../session";
import { curationApi } from "./client";
import { apiError, type ApiError, UNAVAILABLE } from "./errors";
import type {
  CompanyPage,
  CompanyView,
  CorrectionDiff,
  Curator,
  Dashboard,
  DatasetPage,
  DatasetView,
  DocumentView,
  GapPage,
  HeldPage,
  MarketOverview,
  MarketSeriesView,
  MarketSources,
  ReleasePage,
  ReleaseView,
  ReportRow,
  ReportView,
  ReviewPage,
  SearchPage,
  SeriesPage,
  SeriesRow,
  TextReading,
  TextToEdit,
} from "./types";

// What the pages read from the curation API, as the signed-in curator. With no session, or an expired one, the
// curator is sent to sign in; any other failure is thrown for the route's error boundary to show.

export class CurationApiError extends Error {
  constructor(readonly error: ApiError) {
    super(error.message);
  }
}

export async function currentCurator(): Promise<Curator> {
  return read<Curator>((api) => api.GET("/api/v1/auth/session"));
}

export async function overview(): Promise<Dashboard> {
  return read<Dashboard>((api) => api.GET("/api/v1/overview"));
}

export async function held(check: string | undefined, page: number): Promise<HeldPage> {
  return read<HeldPage>((api) => api.GET("/api/v1/held", { params: { query: { check, page } } }));
}

export async function gaps(page: number): Promise<GapPage> {
  return read<GapPage>((api) => api.GET("/api/v1/gaps", { params: { query: { page } } }));
}

export async function reviews(kind: string, page: number): Promise<ReviewPage> {
  return read<ReviewPage>((api) => api.GET("/api/v1/reviews", { params: { query: { kind, page } } }));
}

// Documents whose metadata or published wording matches (every document without a query), or the matching
// articles; filtered, with each filter's counts.
export async function search({ year, ...state }: SearchState): Promise<SearchPage> {
  const query = { ...state, year: year && /^\d{4}$/.test(year) ? Number(year) : undefined };
  return read<SearchPage>((api) => api.GET("/api/v1/documents", { params: { query } }));
}

export async function series(): Promise<SeriesRow[]> {
  return read<SeriesRow[]>((api) => api.GET("/api/v1/series"));
}

export async function seriesPage(issuer: string, family: string, year: number | undefined): Promise<SeriesPage> {
  return read<SeriesPage>((api) =>
    api.GET("/api/v1/series/{issuer}/{family}", { params: { path: { issuer, family }, query: { year } } }),
  );
}

export async function document(id: string): Promise<DocumentView> {
  return read<DocumentView>((api) => api.GET("/api/v1/documents/{document_id}", { params: { path: { document_id: id } } }));
}

// A text as the parser cut it, one part at a time: the part asked for, or the one the provision `at` is in.
export async function reading(id: string, place: { text?: string; part?: number; at?: string }): Promise<TextReading> {
  const query = { text: place.text, part: place.part, at: place.at };
  return read<TextReading>((api) =>
    api.GET("/api/v1/documents/{document_id}/reading", { params: { path: { document_id: id }, query } }),
  );
}

export async function textToEdit(id: string, sha256: string): Promise<TextToEdit> {
  return read<TextToEdit>((api) =>
    api.GET("/api/v1/documents/{document_id}/texts/{text_sha256}/editable", {
      params: { path: { document_id: id, text_sha256: sha256 } },
    }),
  );
}

export async function correction(id: string, sha256: string): Promise<CorrectionDiff> {
  return read<CorrectionDiff>((api) =>
    api.GET("/api/v1/documents/{document_id}/texts/{text_sha256}/correction", {
      params: { path: { document_id: id, text_sha256: sha256 } },
    }),
  );
}

// A short-lived link straight to the object store (ADR-5): the file never passes through this app.
export async function contentLink(id: string, sha256: string): Promise<string> {
  const link = await read<{ url: string }>((api) =>
    api.GET("/api/v1/documents/{document_id}/content/{sha256}", {
      params: { path: { document_id: id, sha256 } },
    }),
  );
  return link.url;
}

// --- the market layer ----------------------------------------------------------------------------------------

export async function marketOverview(): Promise<MarketOverview> {
  return read<MarketOverview>((api) => api.GET("/api/v1/market/overview"));
}

// Registers and statistics sources with their curated links, the industries, and the sectors.
export async function marketSources(): Promise<MarketSources> {
  return read<MarketSources>((api) => api.GET("/api/v1/market/sources"));
}

export type CompanyQuery = { q?: string; register?: string; status?: string; business_type?: string; page: number };

export async function companies(query: CompanyQuery): Promise<CompanyPage> {
  return read<CompanyPage>((api) => api.GET("/api/v1/market/companies", { params: { query } }));
}

export async function company(id: string): Promise<CompanyView> {
  return read<CompanyView>((api) =>
    api.GET("/api/v1/market/companies/{company_id}", { params: { path: { company_id: id } } }),
  );
}

export type DatasetQuery = { q?: string; source?: string; industry?: string; page: number };

export async function datasets(query: DatasetQuery): Promise<DatasetPage> {
  return read<DatasetPage>((api) => api.GET("/api/v1/market/datasets", { params: { query } }));
}

export async function dataset(id: string, page: number): Promise<DatasetView> {
  return read<DatasetView>((api) =>
    api.GET("/api/v1/market/datasets/{dataset_id}", { params: { path: { dataset_id: id }, query: { page } } }),
  );
}

export async function marketSeries(id: string): Promise<MarketSeriesView> {
  return read<MarketSeriesView>((api) =>
    api.GET("/api/v1/market/series/{series_id}", { params: { path: { series_id: id } } }),
  );
}

export async function reports(): Promise<ReportRow[]> {
  return read<ReportRow[]>((api) => api.GET("/api/v1/market/reports"));
}

export async function report(id: string, page: number): Promise<ReportView> {
  return read<ReportView>((api) =>
    api.GET("/api/v1/market/reports/{report_id}", { params: { path: { report_id: id }, query: { page } } }),
  );
}

export type ReleaseQuery = { q?: string; from?: string; to?: string; page: number };

export async function releases(query: ReleaseQuery): Promise<ReleasePage> {
  return read<ReleasePage>((api) => api.GET("/api/v1/market/releases", { params: { query } }));
}

export async function release(id: string): Promise<ReleaseView> {
  return read<ReleaseView>((api) =>
    api.GET("/api/v1/market/releases/{release_id}", { params: { path: { release_id: id } } }),
  );
}

type Answer = { data?: unknown; error?: unknown };

// `T` is the contract's type for the answer: openapi-fetch widens the contract's [issuer, count] pairs to plain
// arrays in its result type, so the answer is taken as the contract describes it, here and only here.
async function read<T>(call: (api: ReturnType<typeof curationApi>) => Promise<Answer>): Promise<T> {
  await connection(); // curation data is read live, at request time: never prerendered or prefetched ahead
  const token = await sessionToken();
  if (!token) {
    redirect("/sign-in");
  }
  let answer: Answer;
  try {
    answer = await call(curationApi(token));
  } catch {
    throw new CurationApiError(UNAVAILABLE);
  }
  if (answer.data !== undefined) {
    return answer.data as T;
  }
  const error = apiError(answer.error);
  if (error.kind === "unauthorized") {
    redirect("/sign-in?expired=1");
  }
  if (error.kind === "not_found") {
    notFound();
  }
  throw new CurationApiError(error);
}
