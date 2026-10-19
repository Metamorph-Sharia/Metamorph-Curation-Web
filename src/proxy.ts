import { type NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE } from "./lib/session-cookie";

// An optimistic check only: without a session cookie, go and sign in, coming back here afterwards. Whether the
// session is valid is the API's to say, on every page that reads with it (lib/api/curation.ts).
export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.next();
  }
  const signIn = new URL("/sign-in", request.url);
  signIn.searchParams.set("next", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(signIn);
}

export const config = {
  // Everything but the sign-in page, Next's own assets and static files.
  matcher: ["/((?!sign-in|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|ico)$).*)"],
};
