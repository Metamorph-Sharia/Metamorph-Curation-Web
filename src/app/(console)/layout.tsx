import Link from "next/link";
import { Suspense } from "react";

import { CuratorMenu } from "@/components/curator-menu";
import { NavLinks, NavList } from "@/components/nav-links";

// The console's frame. It prerenders: only the curator's name waits for the request (behind its boundary).
export default function ConsoleLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="border-b border-line bg-surface">
        {/* Phones: the brand and the curator on one row, the pages on a row of their own that scrolls sideways.
            Wider screens: one row. The page itself never scrolls sideways. */}
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 px-4 py-3 md:h-16 md:grid-cols-[auto_minmax(0,1fr)_auto] md:py-0">
          <Link href="/" className="whitespace-nowrap font-semibold tracking-tight" translate="no">
            Metamorph Curation
          </Link>
          <nav aria-label="Main" className="order-last col-span-2 -mx-4 min-w-0 px-4 md:order-none md:col-span-1 md:mx-0 md:px-0">
            {/* Which page is current is request data on dynamic routes: the links render at once, the mark follows. */}
            <Suspense fallback={<NavList pathname={null} />}>
              <NavLinks />
            </Suspense>
          </nav>
          <Suspense fallback={<div className="h-8 w-24 animate-pulse rounded-ui bg-sunken motion-reduce:animate-none sm:w-48" />}>
            <CuratorMenu />
          </Suspense>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-7xl px-4 py-10">
        {children}
      </main>
    </>
  );
}
