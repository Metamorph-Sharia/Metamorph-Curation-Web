import "server-only";

import { redirect } from "next/navigation";

import type { ActionState } from "../action-state";
import { asSentence } from "../labels";
import { sessionToken } from "../session";
import { curationApi } from "./client";
import { apiError, UNAVAILABLE } from "./errors";

type Answer = { data?: unknown; error?: unknown };

// A curation action, as the signed-in curator: the API runs its use case, then parses, publishes, and answers.
// null when it applied; otherwise what to tell the curator, beside the form. An expired session signs in again.
export async function perform(call: Call): Promise<ActionState | null> {
  const outcome = await performFor<unknown>(call);
  return "failure" in outcome ? outcome.failure : null;
}

// The same, keeping what the API answered (an upload link, for one).
export async function performFor<T>(call: Call): Promise<{ data: T } | { failure: ActionState }> {
  const token = await sessionToken();
  if (!token) {
    redirect("/sign-in?expired=1");
  }
  let answer: Answer;
  try {
    answer = await call(curationApi(token));
  } catch {
    return { failure: { error: asSentence(UNAVAILABLE.message) } };
  }
  if (answer.data !== undefined) {
    return { data: answer.data as T };
  }
  const error = apiError(answer.error);
  if (error.kind === "unauthorized") {
    redirect("/sign-in?expired=1");
  }
  return { failure: { error: asSentence(error.message), fields: error.fields } };
}

type Call = (api: ReturnType<typeof curationApi>) => Promise<Answer>;

export function text(form: FormData, name: string): string {
  return String(form.get(name) ?? "");
}
