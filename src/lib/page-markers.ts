// A paged text's page markers (`<!-- page N -->`, the contract's paged-text convention): each on a line of its own.
// Page numbers come from them, so a curator's correction must keep every one where it is (the API checks too).

const MARKER = /^<!-- page \d+ -->$/gm;

export function pageMarkerRanges(text: string): [from: number, to: number][] {
  return [...text.matchAll(MARKER)].map((match) => [match.index, match.index + match[0].length]);
}
