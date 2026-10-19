import { describe, expect, it } from "vitest";

import { SESSION_COOKIE, sessionCookie } from "./session-cookie";

describe("the session cookie that carries the curation API's token", () => {
  it("is out of scripts' reach, sent only with this site's own requests, and ends with the token", () => {
    const cookie = sessionCookie("token-123", "2026-10-19T17:00:00Z", { secure: true });

    expect(cookie).toEqual({
      name: SESSION_COOKIE,
      value: "token-123",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      expires: new Date("2026-10-19T17:00:00Z"),
    });
  });

  it("is sent over plain http only when told so (local development)", () => {
    expect(sessionCookie("t", "2026-10-19T17:00:00Z", { secure: false }).secure).toBe(false);
  });
});
