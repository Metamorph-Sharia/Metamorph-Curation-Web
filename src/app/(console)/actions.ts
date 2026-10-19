"use server";

import { redirect } from "next/navigation";

import type { ActionState } from "@/lib/action-state";
import { perform, text } from "@/lib/api/changes";
import { safeNext } from "@/lib/redirects";
import { endSession } from "@/lib/session";

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/sign-in");
}

// Resolve or dismiss a review item, with a note, then go back where the curator decided it (never off this app).
export async function decideReview(itemId: number, back: string, _: ActionState, form: FormData): Promise<ActionState> {
  const state = text(form, "state");
  const failure = await perform((api) =>
    api.POST("/api/v1/reviews/{item_id}", {
      params: { path: { item_id: itemId } },
      body: { state, reason: text(form, "note") },
    }),
  );
  if (failure) {
    return failure;
  }
  const [path, anchor] = safeNext(back).split("#");
  redirect(`${path}${path.includes("?") ? "&" : "?"}done=${state}${anchor ? `#${anchor}` : ""}`);
}
