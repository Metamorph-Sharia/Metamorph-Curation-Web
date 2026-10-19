"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The console's pages.
const PAGES = [
  { href: "/", label: "Overview" },
  { href: "/held", label: "Held" },
  { href: "/review", label: "Review" },
  { href: "/documents", label: "Documents" },
  { href: "/documents/new", label: "Add Document" },
];

export function NavLinks() {
  return <NavList pathname={usePathname()} />;
}

// The links themselves; without a pathname (while the route resolves), none is marked current.
export function NavList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex items-center gap-1 overflow-x-auto">
      {PAGES.map(({ href, label }) => {
        const current = pathname !== null && isCurrent(href, pathname);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className="whitespace-nowrap rounded-ui px-3 py-1.5 text-sm text-muted transition-colors hover:bg-sunken hover:text-text aria-[current=page]:bg-accent-soft aria-[current=page]:font-medium aria-[current=page]:text-text"
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// A page is current on itself and below it, except that Add Document is its own page, not part of Documents.
export function isCurrent(href: string, pathname: string): boolean {
  if (href === "/" || href === "/documents/new") {
    return pathname === href;
  }
  if (href === "/documents") {
    return pathname.startsWith(href) && pathname !== "/documents/new";
  }
  return pathname.startsWith(href);
}
