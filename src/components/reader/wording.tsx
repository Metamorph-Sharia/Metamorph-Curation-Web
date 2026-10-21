import type { Passage, ReadingBlock } from "@/lib/api/types";
import { blockPieces } from "@/lib/reading";

import { LINK } from "../styles";
import { PageLink, type Place, provisionHref } from "./links";

const NESTING_REM = 2.25; // how far a nested list item sits in from the one it belongs to
const PAGE_START =
  "mx-0.5 inline-flex min-h-6 select-none items-center rounded-full border border-line bg-sunken px-2 align-[0.1em] font-sans text-[0.7rem] font-medium leading-none text-muted transition-colors hover:border-accent/40 hover:text-text";

// A passage's wording as the platform laid it out (domain/layout.py): each paragraph whole, a list item's number
// hanging beside its wording, a nested item set in under the one it belongs to.
export function Wording({ passage, place }: { passage: Passage; place: Place }) {
  return (
    <div className="grid gap-3 text-left">
      {passage.blocks.map((block, index) => (
        <Block key={index} block={block} place={place} />
      ))}
    </div>
  );
}

function Block({ block, place }: { block: ReadingBlock; place: Place }) {
  const words = <Words block={block} place={place} />;
  if (!block.marker) {
    return <p className="text-pretty">{words}</p>;
  }
  return (
    <div
      data-depth={block.depth}
      className="grid grid-cols-[minmax(2.25rem,auto)_minmax(0,1fr)] gap-x-2"
      style={block.depth ? { marginLeft: `${block.depth * NESTING_REM}rem` } : undefined}
    >
      <span className="tabular-nums">{block.marker}</span>
      <p className="text-pretty">{words}</p>
    </div>
  );
}

// The wording, its references to the text's other provisions as links, and where each page of the official file
// starts in it.
function Words({ block, place }: { block: ReadingBlock; place: Place }) {
  return blockPieces(block).map((piece, index) => {
    if ("page" in piece) {
      return place.reading.pdf_sha256 ? (
        <PageLink key={index} place={place} page={piece.page} className={PAGE_START} />
      ) : (
        <span key={index} className={PAGE_START}>
          Page {piece.page}
        </span>
      );
    }
    if (piece.address) {
      return (
        <a key={index} href={provisionHref(piece.address, place)} className={`${LINK} underline decoration-accent/30`}>
          {piece.text}
        </a>
      );
    }
    return piece.text;
  });
}
