// Search and browsing: where a search is (its URL), what its facets' values are called, an article's excerpt with
// its matching words, and the numbers missing from a series.
import { sentence } from "./labels";
import { statusLabel } from "./legal";

export type SearchState = {
  q?: string;
  kind?: string; // documents (the default) or articles
  issuer?: string;
  family?: string;
  year?: string;
  status?: string;
  state?: string;
  page?: number;
};

const KEYS = ["q", "kind", "issuer", "family", "year", "status", "state"] as const;
const DEFAULT_KIND = "documents";

// The search page with some of its state changed. A change of query or filters starts again from page one.
export function searchHref(state: SearchState, change: Partial<SearchState>): string {
  const next = { ...state, page: undefined, ...change };
  const query = new URLSearchParams();
  for (const key of KEYS) {
    const value = next[key];
    if (value && !(key === "kind" && value === DEFAULT_KIND)) {
      query.set(key, value);
    }
  }
  if (next.page && next.page > 1) {
    query.set("page", String(next.page));
  }
  return query.size ? `/documents?${query}` : "/documents";
}

export const FACET_LABELS: Record<string, string> = {
  issuer: "Issuer",
  family: "Family",
  year: "Year",
  status: "Status",
  state: "Publishing",
};

const ISSUERS: Record<string, string> = { ojk: "OJK", bi: "BI", dsnmui: "DSN-MUI", id: "National" };
const STATES: Record<string, string> = {
  published: "Published",
  held: "Held",
  suppressed: "Suppressed",
  unpublished: "Not published",
};

export function issuerLabel(issuer: string): string {
  return ISSUERS[issuer] ?? issuer.toUpperCase();
}

// A family as instruments are cited: POJK, SEOJK, PADG …; a fatwa is a word, not an abbreviation.
export function familyLabel(family: string): string {
  return family === "fatwa" ? "Fatwa" : family.toUpperCase();
}

export function stateLabel(state: string): string {
  return STATES[state] ?? sentence(state);
}

export function facetValueLabel(facet: string, value: string): string {
  switch (facet) {
    case "issuer":
      return issuerLabel(value);
    case "family":
      return familyLabel(value);
    case "status":
      return statusLabel(value);
    case "state":
      return stateLabel(value);
    default:
      return value;
  }
}

export type ExcerptPart = { text: string; match: boolean };

// The API marks the matching words «like this» (ts_headline); the page shows them as marks, never as markup.
export function excerptParts(excerpt: string): ExcerptPart[] {
  return excerpt
    .split(/(«[^»]*»)/)
    .filter(Boolean)
    .map((part) => (part.startsWith("«") ? { text: part.slice(1, -1), match: true } : { text: part, match: false }));
}

const LEADING_NUMBER = /^(\d+)/;

// The numbers missing from a year of a series, by the number they should have come before: 1, 2, 4 means 3 is
// missing (not held, or not acquired yet). Numbers start at 1; 7A, an inserted number, isn't a gap.
export function numberGaps(numbers: string[]): Map<string, number[]> {
  const gaps = new Map<string, number[]>();
  let last = 0;
  for (const number of numbers) {
    const found = LEADING_NUMBER.exec(number);
    if (!found) {
      continue;
    }
    const value = Number(found[1]);
    if (value > last + 1) {
      gaps.set(number, Array.from({ length: value - last - 1 }, (_, index) => last + index + 1));
    }
    last = Math.max(last, value);
  }
  return gaps;
}
