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
