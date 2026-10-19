"use server";

import { redirect } from "next/navigation";

import type { ActionState } from "@/lib/action-state";
import { perform, text } from "@/lib/api/changes";
import { type Anchor, documentHref } from "@/lib/routes";

// The curation actions on one document. Each runs its use case through the API (which parses, publishes and
// re-checks the publish gate before answering), then shows the document again with what was done, or answers its
// form with why it couldn't apply. The API checks the session on every one.

function shown(id: string, done: string, anchor: Anchor): never {
  redirect(`${documentHref(id)}?done=${done}#${anchor}`);
}

const doc = (id: string) => ({ params: { path: { document_id: id } } });
const docText = (id: string, sha256: string) => ({ params: { path: { document_id: id, text_sha256: sha256 } } });

export async function correctField(id: string, _: ActionState, form: FormData): Promise<ActionState> {
  const body = { field: text(form, "field"), value: text(form, "value"), reason: text(form, "reason") };
  return (await perform((api) => api.POST("/api/v1/documents/{document_id}/corrections", { ...doc(id), body }))) ?? shown(id, "corrected", "fields");
}

export async function withdrawCorrection(id: string, field: string, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/corrections/{field}/withdraw", {
      params: { path: { document_id: id, field } },
      body: { reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "withdrawn", "fields");
}

export async function approve(id: string, sha256: string, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/texts/{text_sha256}/approval", {
      ...docText(id, sha256),
      body: { reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "approved", "content");
}

export async function withdrawApproval(id: string, sha256: string, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/texts/{text_sha256}/approval/withdraw", {
      ...docText(id, sha256),
      body: { reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "unapproved", "content");
}

export async function correctText(id: string, sha256: string, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/texts/{text_sha256}/correction", {
      ...docText(id, sha256),
      body: { wording: text(form, "wording"), reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "text_corrected", "content");
}

export async function withdrawTextCorrection(id: string, sha256: string, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/texts/{text_sha256}/correction/withdraw", {
      ...docText(id, sha256),
      body: { reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "text_restored", "content");
}

export async function suppress(id: string, _: ActionState, form: FormData): Promise<ActionState> {
  const body = { reason: text(form, "reason"), confirm: text(form, "confirm") === "yes" };
  return (await perform((api) => api.POST("/api/v1/documents/{document_id}/suppression", { ...doc(id), body }))) ?? shown(id, "suppressed", "manage");
}

export async function restore(id: string, _: ActionState, form: FormData): Promise<ActionState> {
  const body = { reason: text(form, "reason") };
  return (await perform((api) => api.POST("/api/v1/documents/{document_id}/restore", { ...doc(id), body }))) ?? shown(id, "restored", "manage");
}

export async function assignId(id: string, _: ActionState, form: FormData): Promise<ActionState> {
  const newId = text(form, "new_id").trim().toLowerCase(); // the canonical form, as the API stores it
  const body = { new_id: newId, reason: text(form, "reason") };
  return (await perform((api) => api.POST("/api/v1/documents/{document_id}/id", { ...doc(id), body }))) ?? shown(newId, "renamed", "manage");
}

export async function linkCitation(id: string, citationId: number, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/citations/{citation_id}/link", {
      params: { path: { document_id: id, citation_id: citationId } },
      body: { target_id: text(form, "target_id"), reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "linked", "citations");
}

export async function resolveConflict(id: string, conflictId: number, _: ActionState, form: FormData): Promise<ActionState> {
  const failure = await perform((api) =>
    api.POST("/api/v1/documents/{document_id}/conflicts/{conflict_id}", {
      params: { path: { document_id: id, conflict_id: conflictId } },
      body: { decision: text(form, "decision"), reason: text(form, "reason") },
    }),
  );
  return failure ?? shown(id, "conflict", "conflicts");
}
