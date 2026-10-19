// The curation API's errors (docs/curation-web-separation-design.md, "Errors"), as the app shows them:
//   invalid       what the curator entered can't be applied; `fields` says where, one message per field
//   refused       the action can't apply as asked
//   unauthorized  no session, or an expired one: sign in again
//   not_found     no such document, text, check or queue
//   unavailable   the API didn't answer in its own terms (down, or a proxy's error page)

export type ApiErrorKind = "invalid" | "refused" | "unauthorized" | "not_found" | "unavailable";

export type ApiError = {
  kind: ApiErrorKind;
  message: string;
  fields: Record<string, string>;
};

const KINDS: ReadonlySet<string> = new Set(["invalid", "refused", "unauthorized", "not_found"]);

export const UNAVAILABLE: ApiError = {
  kind: "unavailable",
  message: "the curation API isn't answering; try again in a moment",
  fields: {},
};

export function apiError(body: unknown): ApiError {
  if (!isErrorBody(body)) {
    return UNAVAILABLE;
  }
  return { kind: body.error as ApiErrorKind, message: body.message, fields: body.fields ?? {} };
}

type ErrorBody = { error: string; message: string; fields?: Record<string, string> };

function isErrorBody(body: unknown): body is ErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    KINDS.has((body as ErrorBody).error) &&
    typeof (body as ErrorBody).message === "string"
  );
}
