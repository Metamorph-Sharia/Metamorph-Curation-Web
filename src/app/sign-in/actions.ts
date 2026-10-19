"use server";

import { redirect } from "next/navigation";

import { curationApi } from "@/lib/api/client";
import { apiError, UNAVAILABLE } from "@/lib/api/errors";
import { asSentence } from "@/lib/labels";
import { safeNext } from "@/lib/redirects";
import { startSession } from "@/lib/session";

export type SignInState = { username: string; error?: string };

// Sign in with the team's curation account: the API checks it and returns a short-lived token, kept in an
// httpOnly cookie (ADR-4). A refusal comes back to the form, beside it; success goes to the page asked for.
export async function signIn(_: SignInState, form: FormData): Promise<SignInState> {
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!username || !password) {
    return { username, error: "Enter your username and password." };
  }
  let answer;
  try {
    answer = await curationApi().POST("/api/v1/auth/session", { body: { username, password } });
  } catch {
    return { username, error: asSentence(UNAVAILABLE.message) };
  }
  if (!answer.data) {
    return { username, error: asSentence(apiError(answer.error).message) };
  }
  await startSession(answer.data);
  redirect(safeNext(String(form.get("next") ?? "")));
}
