// The cookie that carries a curator's session token (ADR-4): httpOnly, so no script can read it; SameSite=Lax,
// so other sites' forms can't use it; Secure outside local development; gone when the token expires.

export const SESSION_COOKIE = "metamorph_session";

export type SessionCookie = {
  name: string;
  value: string;
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: "/";
  expires: Date;
};

export function sessionCookie(token: string, expiresAt: string, { secure }: { secure: boolean }): SessionCookie {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    expires: new Date(expiresAt),
  };
}
