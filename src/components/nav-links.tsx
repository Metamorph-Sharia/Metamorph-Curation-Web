"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The console's pages. Adding a document is the one thing the header offers to do, not only to show.
const PAGES = [
  { href: "/", label: "Overview" },
  { href: "/held", label: "Held" },
  { href: "/gaps", label: "Gaps" },
  { href: "/review", label: "Review" },
  { href: "/documents", label: "Documents" },
  { href: "/browse", label: "Browse" },
  { href: "/documents/new", label: "Add Document", action: true },
];

// A page link: muted until hovered; the current page in full text, underlined in the accent.
const PAGE_LINK =
  "relative inline-flex min-h-10 items-center whitespace-nowrap rounded-ui px-3 text-sm text-muted transition-colors hover:text-text aria-[current=page]:font-medium aria-[current=page]:text-text aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-accent";

// Adding a document: on phones, a page link like the rest (the row scrolls sideways); wider, the header's button.
const ACTION_LINK = `${PAGE_LINK} md:px-4 md:font-medium md:bg-accent md:text-on-accent md:hover:bg-accent-hover md:hover:text-on-accent md:aria-[current=page]:text-on-accent md:aria-[current=page]:after:hidden md:aria-[current=page]:ring-2 md:aria-[current=page]:ring-accent/30 md:aria-[current=page]:ring-offset-2 md:aria-[current=page]:ring-offset-surface`;

export function NavLinks() {
  return <NavList pathname={usePathname()} />;
}

// The links themselves; without a pathname (while the route resolves), none is marked current.
export function NavList({ pathname }: { pathname: string | null }) {
  return (
    <ul className="flex items-center gap-1 overflow-x-auto py-1">
      {PAGES.map(({ href, label, action }) => {
        const current = pathname !== null && isCurrent(href, pathname);
        return (
          <li key={href} className={action ? "md:ml-auto md:pl-3" : undefined}>
            <Link href={href} aria-current={current ? "page" : undefined} className={action ? ACTION_LINK : PAGE_LINK}>
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
