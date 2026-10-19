// Where a curator goes after signing in: back to the page they asked for, and never off this app.

const HOME = "/";

export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return HOME;
  }
  return next;
}
