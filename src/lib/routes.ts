// Where things live in the console. A document's ID has colons (ojk:pojk:2019:10): it is encoded here, once.

export type Anchor = "fields" | "content" | "citations" | "conflicts" | "review" | "manage";

export function documentHref(id: string, anchor?: Anchor): string {
  return `/documents/${encodeURIComponent(id)}${anchor ? `#${anchor}` : ""}`;
}

export function textHref(id: string, sha256: string, page: "edit" | "correction"): string {
  return `${documentHref(id)}/texts/${sha256}/${page}`;
}

export function contentHref(id: string, sha256: string): string {
  return `${documentHref(id)}/content/${sha256}`;
}

export type ReaderPlace = { text?: string; part?: number; at?: string; pdf?: boolean };

// The reader: a text as the parser cut it. `at` is a provision: the API finds the part it is in, and the page
// scrolls to it.
export function readerHref(id: string, { text, part, at, pdf }: ReaderPlace = {}): string {
  const query = new URLSearchParams();
  if (text) query.set("text", text);
  if (part) query.set("part", String(part));
  if (at) query.set("at", at);
  if (pdf) query.set("pdf", "1");
  const search = query.size ? `?${query}` : "";
  return `${documentHref(id)}/read${search}${at ? `#${at}` : ""}`;
}

// The editor, on a provision's wording: its range in UTF-16 units, as the editor counts.
export function editHref(id: string, sha256: string, [from, to]: [number, number]): string {
  return `${textHref(id, sha256, "edit")}?at=${from}-${to}`;
}

// Browsing: every series, a series (an issuer's family: OJK's POJK), a year of it.
export function browseHref(issuer?: string, family?: string, year?: number): string {
  if (!issuer || !family) {
    return "/browse";
  }
  return `/browse/${encodeURIComponent(issuer)}/${encodeURIComponent(family)}${year ? `?year=${year}` : ""}`;
}

// The market layer's records: a company, a dataset (a page of its series), a series, a report, a release.
function marketHref(kind: string, id: string, page?: number): string {
  return `/market/${kind}/${encodeURIComponent(id)}${page && page > 1 ? `?page=${page}` : ""}`;
}

export const companyHref = (id: string) => marketHref("companies", id);
export const datasetHref = (id: string, page?: number) => marketHref("datasets", id, page);
export const seriesHref = (id: string) => marketHref("series", id);
export const reportHref = (id: string, page?: number) => marketHref("reports", id, page);
export const releaseHref = (id: string) => marketHref("releases", id);

// A market list with its query and filters, as the URL keeps them: empty ones and the first page left out.
export function marketListHref(
  list: "companies" | "datasets" | "releases",
  query: Record<string, string | number | undefined>,
): string {
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    if (value !== undefined && value !== "" && !(name === "page" && Number(value) <= 1)) {
      search.set(name, String(value));
    }
  }
  return `/market/${list}${search.size ? `?${search}` : ""}`;
}
