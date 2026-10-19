import { describe, expect, it } from "vitest";

import { apiError } from "./errors";

describe("the curation API's errors, as the app shows them", () => {
  it("keeps what can't be applied, field by field", () => {
    const body = { error: "invalid", message: "source_url: enter the address", fields: { source_url: "enter the address" } };

    expect(apiError(body)).toEqual({
      kind: "invalid",
      message: "source_url: enter the address",
      fields: { source_url: "enter the address" },
    });
  });

  it("keeps a refusal's and a sign-in failure's message", () => {
    expect(apiError({ error: "refused", message: "is suppressed already" })).toMatchObject({ kind: "refused" });
    expect(apiError({ error: "unauthorized", message: "the session expired" })).toMatchObject({
      kind: "unauthorized",
      message: "the session expired",
    });
  });

  it("says plainly when the API answered with something it doesn't describe", () => {
    expect(apiError("Bad gateway")).toEqual({
      kind: "unavailable",
      message: "the curation API isn't answering; try again in a moment",
      fields: {},
    });
  });
});
