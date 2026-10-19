import type { ReactNode } from "react";

// What a section says when it has nothing to show: why, and how it gets something.
export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-ui border border-dashed border-line-strong p-5 text-sm text-muted">{children}</p>;
}
