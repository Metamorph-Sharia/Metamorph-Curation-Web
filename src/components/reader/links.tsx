import type { ReactNode } from "react";

import type { TextReading } from "@/lib/api/types";
import { contentHref, readerHref } from "@/lib/routes";

export const PDF_FRAME = "pdf-view"; // the inline PDF's frame: page links open in it

// What every part of the reader needs to link within the text and to the official file.
export type Place = { reading: TextReading; pdfBeside: boolean; partOf?: Map<string, number> };

// A page of the official file: in the frame beside the text, or in a new tab.
export function PageLink({
  place: { reading, pdfBeside },
  page,
  className,
  children,
}: {
  place: Place;
  page: number;
  className: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={`${contentHref(reading.document_id, reading.pdf_sha256!)}#page=${page}`}
      target={pdfBeside ? PDF_FRAME : "_blank"}
      rel="noopener"
      className={className}
    >
      {children ?? `Page ${page}`}
      {pdfBeside ? null : <span className="sr-only"> (new tab)</span>}
    </a>
  );
}

// Where a provision of this text is: on this page, or in another part of it.
export function provisionHref(address: string, { reading, pdfBeside, partOf }: Place): string {
  const part = partOf?.get(address) ?? reading.part;
  if (part === reading.part) {
    return `#${address}`;
  }
  return `${readerHref(reading.document_id, { text: reading.sha256, part, pdf: pdfBeside })}#${address}`;
}
