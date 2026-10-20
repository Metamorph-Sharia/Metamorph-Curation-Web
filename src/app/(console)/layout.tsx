import Link from "next/link";
import { Suspense } from "react";

import { CuratorMenu } from "@/components/curator-menu";
import { NavLinks, NavList } from "@/components/nav-links";
import { Wordmark } from "@/components/wordmark";

// The console's frame. It prerenders: only the curator's name waits for the request (behind its boundary).
export default function ConsoleLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Wider screens: one row that stays at the top, over the page. Phones: the brand and the curator on one
          row, the pages on a row of their own that scrolls sideways, and the header scrolls away with the page.
          The page itself never scrolls sideways. */}
      <header className="z-40 border-b border-line bg-surface/90 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-surface/75 md:sticky md:top-0">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-2 px-4 py-3 md:h-16 md:grid-cols-[auto_minmax(0,1fr)_auto] md:py-0 lg:px-6">
          <Link href="/" className="whitespace-nowrap rounded-ui text-2xl">
            <Wordmark />
          </Link>
          <nav aria-label="Main" className="order-last col-span-2 -mx-4 min-w-0 px-4 md:order-none md:col-span-1 md:mx-0 md:px-0">
            {/* Which page is current is request data on dynamic routes: the links render at once, the mark follows. */}
            <Suspense fallback={<NavList pathname={null} />}>
              <NavLinks />
            </Suspense>
          </nav>
          <Suspense fallback={<div className="h-10 w-24 animate-pulse rounded-ui bg-sunken motion-reduce:animate-none sm:w-56" />}>
            <CuratorMenu />
          </Suspense>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 outline-none sm:py-12 lg:px-6">
        {children}
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-6 text-sm text-muted lg:px-6">
          <span className="text-lg text-text">
            <Wordmark />
          </span>
          <p>The team’s console for reviewing and correcting the legal knowledge base.</p>
        </div>
      </footer>
    </div>
  );
}
