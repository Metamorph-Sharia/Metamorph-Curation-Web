import "server-only";

import { cookies } from "next/headers";

import type { Session } from "./api/types";
import { SESSION_COOKIE, sessionCookie } from "./session-cookie";

// The curator's session: the API's token, in an httpOnly cookie (ADR-4). Setting and clearing it only happens in
// server actions; reading it happens at request time, behind a Suspense boundary.

export async function sessionToken(): Promise<string | undefined> {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function startSession(session: Session): Promise<void> {
  const secure = process.env.NODE_ENV === "production";
  (await cookies()).set(sessionCookie(session.token, session.expires_at, { secure }));
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE);
}
