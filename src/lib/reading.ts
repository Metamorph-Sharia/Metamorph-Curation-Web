// How the reader presents a text the parser cut: the outline beside it, the gaps in its numbering,
// its paragraphs and their links and pages, and a provision cited as lawyers cite it. Pure rules, so the reader's
// view only lays them out.
import { addressLabel } from "./legal";

type Provision = { address: string; kind: string; label: string; parent_address: string | null };

// They group articles without starting a new numbering (the platform's CONTAINER_KINDS).
const CONTAINERS = new Set(["bab", "bagian", "paragraf", "memutuskan", "pengesahan"]);
// Too many to jump between: an article's paragraphs and items (huruf, angka) are on its screen
const NOT_IN_OUTLINE = new Set(["ayat", "huruf", "angka"]);
const ARTICLE_NUMBER = /^Pasal (\d+)([A-Z]*)$/; // Pasal 4, Pasal 4A: an inserted article keeps the numbering
const AMENDING_ARTICLE = /^pasal-[ivxlc]+$/;

// "Pasal 5 ayat (1) POJK 10/POJK.05/2019". An article an amending regulation words anew is cited within its
// amending article: "Pasal 115 dalam Pasal I POJK 7/POJK.05/2022".
export function formalCitation(address: string, citation: string): string {
  const [first, ...rest] = address.split("/");
  if (AMENDING_ARTICLE.test(first) && rest[0]?.startsWith("pasal-")) {
    return `${addressLabel(rest.join("/"))} dalam ${addressLabel(first)} ${citation}`;
  }
  return `${addressLabel(address)} ${citation}`;
}

// The articles missing from the body's numbering, by the article they should have come before: Pasal 3 right
// after Pasal 1 means Pasal 2 wasn't found. The body's articles are numbered through every chapter; an amending
// regulation's quoted articles and the elucidation's follow numberings of their own, so they aren't checked.
export function articleGaps(provisions: Provision[]): Map<string, string[]> {
  const byAddress = new Map(provisions.map((each) => [each.address, each]));
  const inBody = (provision: Provision) => {
    let parent = provision.parent_address ? byAddress.get(provision.parent_address) : undefined;
    while (parent && CONTAINERS.has(parent.kind)) {
      parent = parent.parent_address ? byAddress.get(parent.parent_address) : undefined;
    }
    return parent === undefined; // no ancestor but chapters and parts
  };
  const gaps = new Map<string, string[]>();
  let last: number | null = null;
  for (const provision of provisions) {
    const number = provision.kind === "pasal" ? ARTICLE_NUMBER.exec(provision.label) : null;
    if (!number || !inBody(provision)) {
      continue;
    }
    const value = Number(number[1]);
    if (last !== null && value > last + 1) {
      gaps.set(provision.address, Array.from({ length: value - last - 1 }, (_, index) => `Pasal ${last! + index + 1}`));
    }
    last = Math.max(last ?? value, value);
  }
  return gaps;
}

// The provisions the outline lists: every part a curator jumps to, not each paragraph.
export function outline<T extends Provision>(provisions: T[]): T[] {
  return provisions.filter((each) => !NOT_IN_OUTLINE.has(each.kind));
}

const RANGE = /^(\d+)-(\d+)$/;

// The editor's `at` (editHref): a provision's range in the text, or null when it isn't one that fits.
export function editRange(at: string | undefined, length: number): [number, number] | null {
  const found = at ? RANGE.exec(at) : null;
  if (!found) {
    return null;
  }
  const [from, to] = [Number(found[1]), Number(found[2])];
  return from <= to && to <= length ? [from, to] : null;
}

type Reference = { start: number; end: number; address: string };
type BlockWording = { text: string; references: Reference[]; pages: { at: number; page: number }[] };
export type BlockPiece = { text: string; address?: string } | { page: number };

// A block's wording cut at its references to the text's other provisions ("Pasal 19 ayat (2)"), so each can be a
// link, and where a page of the official file starts in it. The API gives offsets in UTF-16 units, as JavaScript
// strings count.
export function blockPieces(block: BlockWording): BlockPiece[] {
  const cut: BlockPiece[] = [];
  let cursor = 0;
  let next = 0; // the next page start
  const textUpTo = (end: number) => {
    if (end > cursor) {
      cut.push({ text: block.text.slice(cursor, end) });
      cursor = end;
    }
  };
  const pagesUpTo = (position: number) => {
    for (; next < block.pages.length && block.pages[next].at <= position; next++) {
      textUpTo(block.pages[next].at);
      cut.push({ page: block.pages[next].page });
    }
  };
  for (const reference of block.references) {
    pagesUpTo(reference.start);
    textUpTo(reference.start);
    cut.push({ text: block.text.slice(reference.start, reference.end), address: reference.address });
    cursor = reference.end;
  }
  pagesUpTo(block.text.length);
  textUpTo(block.text.length);
  return cut;
}

type Placed = { address: string | null };

// A paragraph (ayat) right after another of the same article: ruled off from it, as the article's parts.
export function followsSibling(passages: Placed[], index: number, byAddress: Map<string, Provision>): boolean {
  const provision = (at: number) => (at >= 0 && passages[at].address ? byAddress.get(passages[at].address!) : undefined);
  const [previous, current] = [provision(index - 1), provision(index)];
  return (
    current?.kind === "ayat" &&
    previous?.kind === "ayat" &&
    previous.address !== current.address &&
    previous.parent_address === current.parent_address
  );
}
