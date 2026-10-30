import Link from "next/link";

import type { MarketOverview } from "@/lib/api/types";
import { formatCount } from "@/lib/format";

import { Section } from "../section";
import { CARD } from "../styles";

// The market layer at a glance, on the overview: what it publishes, each count opening its page, and its lines
// waiting in the review queue. Its health checks are in Ingestion Health, beside the regulation layer's.
export function MarketSummary({ overview }: { overview: MarketOverview }) {
  const { counts } = overview;
  const tiles = [
    { href: "/market/companies", label: "Companies", count: counts.companies },
    { href: "/market/datasets", label: "Statistical Series", count: counts.series },
    { href: "/market/reports", label: "Reports", count: counts.reports },
    { href: "/market/releases", label: "Press Releases", count: counts.releases },
    { href: "/market#sectors", label: "Sectors", count: counts.sectors },
    { href: "/review?kind=quarantine", label: "Market Lines in Quarantine", count: overview.open_reviews },
  ];
  return (
    <Section id="market" title="Market Data">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ href, label, count }) => (
          <li key={href}>
            <Link href={href} className={`${CARD} group grid h-full content-between gap-6 p-5 transition-colors hover:border-accent/40`}>
              <span className="text-sm text-muted transition-colors group-hover:text-text">{label}</span>
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-4xl leading-none tabular-nums">{formatCount(count)}</span>
                <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">
        {formatCount(counts.datasets)} datasets hold {formatCount(counts.observations)} figures; reports and releases name
        regulations and companies {formatCount(counts.mentions)} times.
      </p>
    </Section>
  );
}
