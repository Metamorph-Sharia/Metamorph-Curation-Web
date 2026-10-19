import Link from "next/link";

import { formatCount } from "@/lib/format";

// Filters as links, so the URL holds the state: each with its count, the one in use marked.
export function Tabs({ label, tabs }: { label: string; tabs: { href: string; text: string; count?: number; current: boolean }[] }) {
  return (
    <nav aria-label={label} className="overflow-x-auto">
      <ul className="flex gap-1 border-b border-line">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={tab.current ? "page" : undefined}
              className="-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-sm text-muted transition-colors hover:text-text aria-[current=page]:border-accent aria-[current=page]:font-medium aria-[current=page]:text-text"
            >
              {tab.text}
              {tab.count === undefined ? null : (
                <span className="rounded-ui bg-sunken px-1.5 font-mono text-xs tabular-nums">{formatCount(tab.count)}</span>
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
    <nav aria-label="Pages" className="flex items-center gap-4 text-sm">
      {page > 1 ? <Link href={href(page - 1)} className="underline-offset-4 hover:underline">Previous</Link> : null}
      <span className="text-muted">
        Page {page} of {pages}
      </span>
      {page < pages ? <Link href={href(page + 1)} className="underline-offset-4 hover:underline">Next</Link> : null}
    </nav>
  );
}
