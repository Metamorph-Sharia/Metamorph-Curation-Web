"use server";

import { redirect } from "next/navigation";

import type { ActionState } from "@/lib/action-state";
import { performFor, text } from "@/lib/api/changes";
import { documentHref } from "@/lib/routes";

const FIELDS = [
  "document_id",
  "citation",
  "title",
  "kind",
  "status",
  "language",
  "source_url",
  "rights",
  "text",
  "enacted_on",
  "promulgated_on",
  "effective_on",
  "reason",
  "file_name",
  "media_type",
  "upload_key",
] as const;

export type UploadLink = { upload_key: string; url: string } | { error: string };

// Where the browser may put the file: a short-lived link straight into the object store (ADR-5).
export async function requestUpload(fileName: string, mediaType: string): Promise<UploadLink> {
  const outcome = await performFor<{ upload_key: string; url: string }>((api) =>
    api.POST("/api/v1/uploads", { body: { file_name: fileName, media_type: mediaType } }),
  );
  return "data" in outcome ? outcome.data : { error: outcome.failure.error ?? "The upload couldn’t start." };
}

// The document, from its fields and its uploaded file: loaded like any connector's, then checked by the publish gate.
export async function addDocument(_: ActionState, form: FormData): Promise<ActionState> {
  const body = Object.fromEntries(FIELDS.map((name) => [name, text(form, name)])) as Record<(typeof FIELDS)[number], string>;
  const outcome = await performFor<{ summary: { id: string } }>((api) => api.POST("/api/v1/documents", { body }));
  if ("failure" in outcome) {
    return outcome.failure;
  }
  redirect(`${documentHref(outcome.data.summary.id)}?done=added`);
}
