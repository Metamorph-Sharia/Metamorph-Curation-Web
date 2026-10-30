import { Tabs } from "../tabs";

// The market's pages, as one row of tabs on each: its sources and links, then what it publishes.
const SECTIONS = [
  { href: "/market", text: "Sources and Links" },
  { href: "/market/companies", text: "Companies" },
  { href: "/market/datasets", text: "Statistics" },
  { href: "/market/reports", text: "Reports" },
  { href: "/market/releases", text: "Press Releases" },
] as const;

export type MarketSection = (typeof SECTIONS)[number]["href"];

export function MarketNav({ current }: { current: MarketSection }) {
  return <Tabs label="Market" tabs={SECTIONS.map((section) => ({ ...section, current: section.href === current }))} />;
}
