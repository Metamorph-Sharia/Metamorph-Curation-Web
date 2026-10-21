import Link from "next/link";

import type { Passage, ReadingProvision } from "@/lib/api/types";
import { formatCount, formatDay } from "@/lib/format";
import { sentence } from "@/lib/labels";
import { addressLabel, changeLabel } from "@/lib/legal";
import { articleGaps, followsSibling, formalCitation, outline } from "@/lib/reading";
import { contentHref, documentHref, editHref, readerHref, textHref } from "@/lib/routes";

import { button, CARD, LINK, notice } from "../styles";
import { CopyActions } from "./copy-actions";
import { PageLink, PDF_FRAME, type Place, provisionHref } from "./links";
import { OutlineSpy } from "./outline-spy";
import { Wording } from "./wording";

const GROUPS = new Set(["bab", "bagian", "paragraf", "lampiran", "penjelasan", "memutuskan"]); // centred, as printed
const WITHOUT_ACTIONS = new Set(["ayat", "huruf", "angka", "bab", "bagian", "paragraf", "memutuskan", "penjelasan"]);
const TITLED_IN_OUTLINE = new Set(["bab", "bagian", "paragraf", "lampiran", "romawi", "diktum"]); // title below

// A text as the parser cut it: the outline beside it, each article in full with its actions, what later documents
// changed in it, where the parser found a gap, and the official PDF beside it on wide screens.
export function ReaderView({ reading, pdfBeside }: Place) {
  const byAddress = new Map(reading.provisions.map((provision) => [provision.address, provision]));
  const gaps = articleGaps(reading.provisions);
  const beside = pdfBeside && reading.pdf_sha256 !== null;
  const place = { reading, pdfBeside: beside, partOf: new Map(reading.provisions.map((p) => [p.address, p.part])) };
  const passages = reading.passages.map((passage, index) => (
    <PassageBlock
      key={`${passage.address}:${index}`}
      passage={passage}
      provision={passage.address ? byAddress.get(passage.address) : undefined}
      missing={passage.opens && passage.address ? gaps.get(passage.address) : undefined}
      ruled={passage.opens && followsSibling(reading.passages, index, byAddress)}
      place={place}
    />
  ));
  return (
    <div className="grid gap-6">
      <ReaderHead reading={reading} pdfBeside={beside} gapCount={gaps.size} />
      <PartNav reading={reading} pdfBeside={beside} />
      <div
        className={`grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10 ${beside ? "xl:grid-cols-[13rem_minmax(0,1fr)_minmax(0,1fr)]" : ""}`}
      >
        <Outline place={place} gaps={gaps} />
        <CopyActions>
          <article
            aria-label="Text"
            data-reading
            className="grid max-w-[72ch] gap-6 text-[1.0625rem] leading-[1.8] [overflow-wrap:anywhere]"
          >
            {passages}
          </article>
        </CopyActions>
        {beside ? (
          <aside aria-label="Official file" className="hidden xl:block">
            <iframe
              name={PDF_FRAME}
              title={`${reading.citation}: the official file`}
              src={contentHref(reading.document_id, reading.pdf_sha256!)}
              className={`${CARD} sticky top-24 h-[calc(100dvh-7rem)] w-full`}
            />
          </aside>
        ) : null}
      </div>
      <PartNav reading={reading} pdfBeside={beside} />
      <OutlineSpy />
    </div>
  );
}

function ReaderHead({ reading, pdfBeside, gapCount }: Place & { gapCount: number }) {
  const id = reading.document_id;
  const here = { text: reading.sha256, part: reading.part };
  return (
    <header className="grid gap-4">
      <h1 className="font-heading text-4xl leading-tight tracking-tight text-pretty sm:text-5xl">{reading.citation}</h1>
      <p className="max-w-[75ch] text-muted text-pretty sm:text-lg">{reading.title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {reading.pdf_sha256 ? (
          <>
            <span className="hidden xl:contents">
              <Link href={readerHref(id, { ...here, pdf: !pdfBeside })} className={button("quiet")} scroll={false}>
                {pdfBeside ? "Hide PDF" : "Show PDF Beside"}
              </Link>
            </span>
            <a href={contentHref(id, reading.pdf_sha256)} target="_blank" rel="noopener" className={button("quiet")}>
              Open PDF <span aria-hidden>↗</span>
              <span className="sr-only"> (new tab)</span>
            </a>
          </>
        ) : null}
        {reading.editable ? (
          <Link href={textHref(id, reading.sha256, "edit")} className={button("quiet")}>
            Edit Text
          </Link>
        ) : null}
        <Link href={documentHref(id)} className={button("quiet")}>
          Document Record
        </Link>
      </div>
      {reading.texts.length > 1 ? (
        <nav aria-label="Texts" className="flex flex-wrap gap-2 text-sm">
          {reading.texts.map((text) => (
            <Link
              key={text.sha256}
              href={readerHref(id, { text: text.sha256, pdf: pdfBeside })}
              aria-current={text.sha256 === reading.sha256 ? "page" : undefined}
              className="inline-flex min-h-9 items-center gap-2 rounded-ui border border-line bg-surface px-3 text-muted transition-colors hover:text-text aria-[current=page]:border-accent/50 aria-[current=page]:bg-accent-soft aria-[current=page]:text-text"
            >
              <span translate="no">{text.language}</span>
              <span>{sentence(text.detail)}</span>
              {text.main ? <span className="text-xs">(main)</span> : null}
            </Link>
          ))}
        </nav>
      ) : null}
      {reading.corrected ? (
        <p role="note" className={notice("neutral")}>
          You are reading a curator’s correction of the source’s text.
        </p>
      ) : null}
      {reading.problems.length || gapCount ? (
        <div role="note" className={`${notice("warning")} grid gap-1`}>
          <p>
            <strong className="font-semibold text-warning">The parser found problems in this text.</strong> Gaps in the
            article numbering are marked where they are.
          </p>
          {reading.problems.length ? <p>{reading.problems.join("; ")}</p> : null}
        </div>
      ) : null}
    </header>
  );
}

function PartNav({ reading, pdfBeside }: Place) {
  if (reading.parts < 2) {
    return null;
  }
  const at = (part: number) => readerHref(reading.document_id, { text: reading.sha256, part, pdf: pdfBeside });
  return (
    <nav aria-label="Parts of the text" className="flex flex-wrap items-center gap-3 text-sm">
      {reading.part > 0 ? (
        <Link href={at(reading.part - 1)} className={button("quiet")}>
          <span aria-hidden>←</span> Previous Part
        </Link>
      ) : null}
      <span className="tabular-nums text-muted">
        Part {formatCount(reading.part + 1)} of {formatCount(reading.parts)}
      </span>
      {reading.part < reading.parts - 1 ? (
        <Link href={at(reading.part + 1)} className={button("quiet")}>
          Next Part <span aria-hidden>→</span>
        </Link>
      ) : null}
    </nav>
  );
}

// The outline: every part a curator jumps to, a chapter's title under its number. On wide screens it stays beside
// the text, the part being read marked (OutlineSpy); on phones it folds away.
function Outline({ place, gaps }: { place: Place; gaps: Map<string, string[]> }) {
  const rows = outline(place.reading.provisions);
  const list = (
    <ol className="grid text-sm">
      {rows.map((row) => (
        <li
          key={row.address}
          style={{ paddingLeft: `${0.25 + row.depth * 0.75}rem` }}
          className="[content-visibility:auto] [contain-intrinsic-size:auto_2rem]"
        >
          {gaps.has(row.address) ? (
            <span className="block py-0.5 pr-2 pl-3 text-xs text-warning">{gaps.get(row.address)!.join(", ")} not found</span>
          ) : null}
          <a
            href={provisionHref(row.address, place)}
            className="grid min-h-8 gap-0.5 rounded-r-ui border-l-2 border-transparent py-1 pr-2 pl-2.5 text-muted transition-colors hover:bg-sunken hover:text-text aria-[current=location]:border-accent aria-[current=location]:bg-accent-soft aria-[current=location]:text-text"
          >
            <span className="flex items-baseline gap-1.5">
              <span className="font-medium text-text">{row.label}</span>
              {row.heading && !TITLED_IN_OUTLINE.has(row.kind) ? <span className="truncate">{row.heading}</span> : null}
              {row.changes.length || row.valid_to ? (
                <span className="ml-auto shrink-0 text-xs text-warning" title="Changed by a later document">
                  Diubah
                </span>
              ) : null}
            </span>
            {row.heading && TITLED_IN_OUTLINE.has(row.kind) ? (
              <span className="line-clamp-2 text-xs tracking-wide">{row.heading}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ol>
  );
  const label = `Outline (${formatCount(rows.length)})`;
  return (
    <>
      <details className={`${CARD} lg:hidden`}>
        <summary className="min-h-10 cursor-pointer px-4 py-2.5 text-sm font-medium">{label}</summary>
        <nav aria-label="Outline" data-outline className="max-h-[60vh] overflow-y-auto overscroll-contain border-t border-line py-2">
          {list}
        </nav>
      </details>
      <nav
        aria-label="Outline"
        data-outline
        className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain"
      >
        <p className="mb-2 px-2 text-sm font-semibold">{label}</p>
        {list}
      </nav>
    </>
  );
}

function PassageBlock({
  passage,
  provision,
  missing,
  ruled,
  place,
}: {
  passage: Passage;
  provision: ReadingProvision | undefined;
  missing: string[] | undefined;
  ruled: boolean;
  place: Place;
}) {
  const wording = passage.blocks.length ? <Wording passage={passage} place={place} /> : null;
  if (!passage.opens || !provision) {
    return wording ? <div className={passage.address ? "" : "text-muted"}>{wording}</div> : null;
  }
  const group = GROUPS.has(provision.kind) && passage.titled;
  return (
    <>
      {missing ? (
        <p role="note" className="rounded-ui border border-dashed border-warning/50 bg-warning-soft px-4 py-2 text-sm text-warning">
          Not in the text: {missing.join(", ")}. The parser expected {missing.length === 1 ? "it" : "them"} here.
        </p>
      ) : null}
      <section
        id={provision.address}
        aria-label={addressLabel(provision.address)}
        className={`grid scroll-mt-4 gap-3 [content-visibility:auto] [contain-intrinsic-size:auto_8rem] ${group ? "pt-6 pb-2 text-center" : ""} ${ruled ? "border-t border-dashed border-line-strong pt-5" : ""}`}
      >
        {passage.titled ? (
          <Heading provision={provision} group={group} place={place} titleInText={titleInText(passage, provision)} />
        ) : null}
        {!passage.titled && !WITHOUT_ACTIONS.has(provision.kind) ? <Actions provision={provision} place={place} /> : null}
        <Changes provision={provision} />
        {wording}
      </section>
    </>
  );
}

// The parser may name a provision by its first words (a fatwa's "Kedua : Fatwa ini berlaku …"): then the heading is
// its label alone, and the words are read once, in the text.
function titleInText(passage: Passage, provision: ReadingProvision): boolean {
  return Boolean(provision.heading && passage.blocks[0]?.text.startsWith(provision.heading));
}

function Heading({
  provision,
  group,
  place,
  titleInText,
}: {
  provision: ReadingProvision;
  group: boolean;
  place: Place;
  titleInText: boolean;
}) {
  const Level = `h${Math.min(2 + provision.depth, 6)}` as "h2";
  const heading = titleInText ? null : provision.heading;
  if (group) {
    return (
      <Level className="grid gap-1 text-balance">
        <span className="font-heading text-3xl leading-tight">{provision.label}</span>{" "}
        {heading ? (
          <span className="font-sans text-base font-medium tracking-wide text-muted uppercase">{heading}</span>
        ) : null}
      </Level>
    );
  }
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <Level className="text-xl font-semibold">
        {provision.label}
        {heading ? <span className="font-normal text-muted"> {heading}</span> : null}
      </Level>
      {WITHOUT_ACTIONS.has(provision.kind) ? null : <Actions provision={provision} place={place} />}
    </div>
  );
}

const ACTION = "inline-flex min-h-8 items-center rounded-ui px-2 text-xs text-muted transition-colors hover:bg-sunken hover:text-text";

function Actions({ provision, place }: { provision: ReadingProvision; place: Place }) {
  const { reading } = place;
  const name = addressLabel(provision.address);
  const link = readerHref(reading.document_id, { text: reading.sha256, at: provision.address });
  return (
    <div className="flex flex-wrap items-center gap-1 font-sans">
      <button type="button" data-copy={link} data-said={`Link to ${name} copied.`} className={ACTION}>
        Copy Link
      </button>
      <button
        type="button"
        data-copy={formalCitation(provision.address, reading.citation)}
        data-said={`Citation of ${name} copied.`}
        className={ACTION}
      >
        Copy Citation
      </button>
      {reading.pdf_sha256 && provision.page_start ? (
        <PageLink place={place} page={provision.page_start} className={ACTION} />
      ) : null}
      {reading.editable ? (
        <Link href={editHref(reading.document_id, reading.sha256, [provision.edit_from, provision.edit_to])} className={ACTION}>
          Correct
        </Link>
      ) : null}
    </div>
  );
}

// What later documents did to this provision: who changed or revoked it, from when, and where its new wording is.
function Changes({ provision }: { provision: ReadingProvision }) {
  if (!provision.changes.length && !provision.valid_to) {
    return null;
  }
  return (
    <ul className="flex flex-wrap gap-2 text-left text-sm">
      {provision.changes.length ? (
        provision.changes.map((change) => (
          <li key={`${change.type}:${change.document_id}`} className={PILL}>
            <span aria-hidden className={DOT} />
            <span>
              {changeLabel(change.type)}{" "}
              <Link href={documentHref(change.document_id)} className="font-medium underline-offset-4 hover:underline">
                {change.citation ?? change.document_id}
              </Link>
              {change.effective_on ? `, effective ${formatDay(change.effective_on)}` : ""}
              {change.new_address ? (
                <>
                  {". "}
                  <Link href={readerHref(change.document_id, { at: change.new_address })} className={LINK}>
                    Read the new wording: {addressLabel(change.new_address)}
                  </Link>
                </>
              ) : null}
            </span>
          </li>
        ))
      ) : (
        <li className={PILL}>
          <span aria-hidden className={DOT} />
          <span>Diubah, effective {formatDay(provision.valid_to!)}</span>
        </li>
      )}
    </ul>
  );
}

const PILL = "inline-flex items-baseline gap-2 rounded-2xl border border-warning/40 bg-warning-soft px-3 py-1 text-text";
const DOT = "size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-warning";
