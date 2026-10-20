import type { ReactNode } from "react";

import { Breadcrumbs } from "./breadcrumbs";
import { CARD } from "./styles";

// A page's title in the heading serif, what the page is for beneath it, and, on a page below another, the way
// back up.
export function PageHead({
  title,
  trail,
  children,
}: {
  title: string;
  trail?: [href: string, label: string][];
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-3">
      {trail ? <Breadcrumbs trail={trail} current={title} /> : null}
      <h1 className="font-heading text-4xl leading-tight tracking-tight text-balance sm:text-5xl">{title}</h1>
      {children ? <p className="max-w-[65ch] text-muted text-pretty sm:text-lg">{children}</p> : null}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div aria-hidden className="grid animate-pulse gap-3 motion-reduce:animate-none">
      <div className="h-10 w-2/3 rounded-ui bg-sunken" />
      {[0, 1, 2].map((row) => (
        <div key={row} className={`${CARD} grid gap-2 p-5`}>
          <div className="h-4 w-48 rounded bg-sunken" />
          <div className="h-3 w-full rounded bg-sunken" />
          <div className="h-3 w-3/4 rounded bg-sunken" />
        </div>
      ))}
    </div>
  );
}
