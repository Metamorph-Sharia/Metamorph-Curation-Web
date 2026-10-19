import type { ReactNode } from "react";

// A titled region of a page: its heading names it for screen readers too.
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const heading = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={heading} className="grid scroll-mt-6 content-start gap-3">
      <h2 id={heading} className="text-base font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {children}
    </section>
  );
}
