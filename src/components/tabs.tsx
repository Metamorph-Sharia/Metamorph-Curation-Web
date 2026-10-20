import Link from "next/link";

import { formatCount } from "@/lib/format";

import { button } from "./styles";

// Filters as links, so the URL holds the state: chips, each with its count, the one in use marked.
export function Tabs({ label, tabs }: { label: string; tabs: { href: string; text: string; count?: number; current: boolean }[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className="group inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-ui border border-line bg-surface px-3 text-sm transition-colors hover:border-accent/40 hover:bg-sunken aria-[current=page]:border-accent/40 aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-accent"
            >
              {tab.text}
              {tab.count === undefined ? null : (
                <span className="rounded-full bg-sunken px-2 text-xs tabular-nums text-muted group-aria-[current=page]:bg-surface group-aria-[current=page]:text-accent">
                  {formatCount(tab.count)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Pager({ page, pages, href }: { page: number; pages: number; href: (page: number) => string }) {
  if (pages <= 1) {
    return null;
  }
  return (
    <nav aria-label="Pages" className="flex flex-wrap items-center gap-3 text-sm">
      {page > 1 ? (
        <Link href={href(page - 1)} className={button("quiet")}>
          <span aria-hidden>←</span> Previous
        </Link>
      ) : null}
      <span className="tabular-nums text-muted">
        Page {page} of {pages}
      </span>
      {page < pages ? (
        <Link href={href(page + 1)} className={button("quiet")}>
          Next <span aria-hidden>→</span>
        </Link>
      ) : null}
    </nav>
  );
}
