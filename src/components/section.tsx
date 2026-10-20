import type { ReactNode } from "react";

// A titled region of a page: its heading, in the serif, names it for screen readers too.
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const heading = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={heading} className="grid content-start gap-4">
      <h2 id={heading} className="font-heading text-2xl leading-tight text-balance">
        {title}
      </h2>
      {children}
    </section>
  );
}
