import "server-only";

import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";

import { sessionToken } from "../session";
import { curationApi } from "./client";
import { apiError, type ApiError, UNAVAILABLE } from "./errors";
import type {
  CorrectionDiff,
  Curator,
  Dashboard,
  DocumentRow,
  DocumentView,
  HeldPage,
  ReviewPage,
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

export async function reviews(kind: string, page: number): Promise<ReviewPage> {
  return read<ReviewPage>((api) => api.GET("/api/v1/reviews", { params: { query: { kind, page } } }));
}

export async function search(q: string): Promise<DocumentRow[]> {
  return read<DocumentRow[]>((api) => api.GET("/api/v1/documents", { params: { query: { q } } }));
}

export async function document(id: string): Promise<DocumentView> {
  return read<DocumentView>((api) => api.GET("/api/v1/documents/{document_id}", { params: { path: { document_id: id } } }));
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
