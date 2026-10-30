import Link from "next/link";

import type { IndustryName, MarketSources, RegisterView, StatisticsSourceView } from "@/lib/api/types";
import { formatCount, formatDay } from "@/lib/format";
import { industryKey } from "@/lib/market";
import { documentHref, marketListHref } from "@/lib/routes";

import { Empty } from "../empty";
import { Section } from "../section";
import { CARD, LINK, notice } from "../styles";
import {
  Disclosure,
  IndustryForm,
  RegisterLinksForm,
  SectorForm,
  SourceForm,
  WithdrawIndustryForm,
  WithdrawSectorForm,
} from "./link-forms";

// The market's sources and their curated links: registers, statistics sources, industries and sectors. Each shows
// what its links reach, and, folded away, the form that changes them. A change is published at once.
export function SourcesView({ sources }: { sources: MarketSources }) {
  const named = allIndustries(sources);
  const linked = new Set(sources.industries.map((industry) => industryKey(industry.source, industry.name)));
  const unlinked = sources.named_industries.filter((industry) => !linked.has(industryKey(industry.source, industry.name)));
  return (
    <div className="grid gap-12">
      <Section id="registers" title="Registers">
        {sources.registers.map((register) => (
          <RegisterCard key={register.id} register={register} />
        ))}
      </Section>
      <Section id="sources" title="Statistics Sources">
        <div className="grid gap-4 lg:grid-cols-3">
          {sources.sources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      </Section>
      <Section id="industries" title="Industries">
        <p className="max-w-[65ch] text-sm text-muted text-pretty">
          Each statistics source names its industries in its own words. An industry’s links reach every dataset of it: its
          register’s regulations, or its own, and its reports.
        </p>
        {sources.industries.length ? (
          <ul className="grid gap-4">
            {sources.industries.map((industry) => (
              <li key={industryKey(industry.source, industry.name)} className={`${CARD} grid gap-3 p-5`}>
                <Heading title={industry.name} id={industry.source} />
                <Links
                  rows={[
                    ["Register", industry.register ? [industry.register] : [], "register"],
                    ["Own regulations", [...industry.governed_by], "document"],
                    ["Reports", [...industry.reports], "report"],
                  ]}
                />
                <p className="text-sm text-muted">
                  <Link href={marketListHref("datasets", { industry: industry.name })} className={LINK}>
                    {formatCount(industry.datasets)} datasets
                  </Link>
                </p>
                <div className="flex flex-wrap gap-x-6">
                  <Disclosure summary="Edit Links">
                    <IndustryForm industry={industry} registers={[...sources.registers]} />
                  </Disclosure>
                  <Disclosure summary="Withdraw">
                    <WithdrawIndustryForm industry={industry} />
                  </Disclosure>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No industry is linked yet.</Empty>
        )}
        {unlinked.length ? (
          <Disclosure summary={`Link an Industry (${formatCount(unlinked.length)} Named, Not Linked)`}>
            <IndustryForm registers={[...sources.registers]} unlinked={unlinked} />
          </Disclosure>
        ) : null}
      </Section>
      <Section id="sectors" title="Sectors">
        <p className="max-w-[65ch] text-sm text-muted text-pretty">
          One curated industry across the sources’ own names, such as sharia banking: what the assistant’s tools start from
          to join a market question to the law.
        </p>
        {sources.sectors.length ? (
          <ul className="grid gap-4">
            {sources.sectors.map((sector) => (
              <li key={sector.id} className={`${CARD} grid gap-3 p-5`}>
                <Heading title={sector.name_en ? `${sector.name} · ${sector.name_en}` : sector.name} id={sector.id} />
                <p className="text-sm">
                  {sector.industries.map((industry) => industry.name).join("; ")}
                </p>
                <Links
                  rows={[
                    ["Registers", [...sector.registers], "register"],
                    ["Regulations", [...sector.governed_by], "document"],
                    ["Reports", [...sector.reports], "report"],
                  ]}
                />
                <p className="text-sm text-muted">{formatCount(sector.datasets)} datasets</p>
                <div className="flex flex-wrap gap-x-6">
                  <Disclosure summary="Edit Sector">
                    <SectorForm sector={sector} industries={named} />
                  </Disclosure>
                  <Disclosure summary="Withdraw">
                    <WithdrawSectorForm sector={sector} />
                  </Disclosure>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty>No sector yet. Add one to gather industries the sources name differently.</Empty>
        )}
        <Disclosure summary="Add a Sector">
          <SectorForm industries={named} />
        </Disclosure>
      </Section>
    </div>
  );
}

function RegisterCard({ register }: { register: RegisterView }) {
  return (
    <div className={`${CARD} grid gap-3 p-5 sm:p-6`}>
      <Heading title={register.name} id={register.id} />
      <p className="text-sm text-muted">
        <Link href={marketListHref("companies", { register: register.id })} className={LINK}>
          {formatCount(register.companies)} companies
        </Link>{" "}
        across {formatCount(register.editions)} editions
        {register.newest_edition ? `; the newest ${formatDay(register.newest_edition)}` : ""}. Fresh for{" "}
        {formatCount(register.fresh_days)} days.
      </p>
      <Links
        rows={[
          ["Governed by", [...register.governed_by], "document"],
          ["Reports", [...register.reports], "report"],
        ]}
      />
      <Disclosure summary="Edit Links">
        <RegisterLinksForm register={register} />
      </Disclosure>
    </div>
  );
}

function SourceCard({ source }: { source: StatisticsSourceView }) {
  return (
    <div className={`${CARD} grid content-start gap-3 p-5`}>
      <Heading title={source.name} id={source.id} />
      <p className="text-sm text-muted">
        <Link href={marketListHref("datasets", { source: source.id })} className={LINK}>
          {formatCount(source.datasets)} datasets
        </Link>
        , {formatCount(source.series)} series
        {source.newest_period ? `; the newest period starts ${formatDay(source.newest_period)}` : ""}. Fresh for{" "}
        {formatCount(source.fresh_days)} days.
      </p>
      {source.citation ? <p className="text-sm">Cited as “{source.citation}”</p> : null}
      {source.download_page ? (
        <div className={notice("neutral")}>
          <p className="font-medium">Downloaded by hand</p>
          <p className="mt-1">
            <a href={source.download_page} target="_blank" rel="noopener" className={`${LINK} break-all`}>
              {source.download_page}
            </a>
          </p>
          {source.download_hint ? <p className="mt-1 text-pretty text-muted">{source.download_hint}</p> : null}
        </div>
      ) : null}
      <Disclosure summary="Edit Source">
        <SourceForm source={source} />
      </Disclosure>
    </div>
  );
}

function Heading({ title, id }: { title: string; id: string }) {
  return (
    <div className="grid gap-0.5">
      <h3 className="font-heading text-xl leading-tight text-balance">{title}</h3>
      <p className="font-mono text-xs text-muted" translate="no">
        {id}
      </p>
    </div>
  );
}

// What a record's links name, each where it lives: a regulation in the registry, a report in the market's reader
// (a family, such as ojk:lpksi, lists its editions there), a register by its companies.
type LinkKind = "document" | "report" | "register";

function Links({ rows }: { rows: [label: string, ids: string[], kind: LinkKind][] }) {
  return (
    <dl className="grid gap-2 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
      {rows.map(([label, ids, kind]) => (
        <div key={label} className="contents">
          <dt className="text-muted">{label}</dt>
          <dd className="flex flex-wrap gap-x-3 gap-y-1">
            {ids.length ? ids.map((id) => <LinkedId key={id} id={id} kind={kind} />) : <span className="text-muted">None</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const LINKED: Record<LinkKind, (id: string) => string> = {
  document: (id) => documentHref(id),
  report: () => "/market/reports",
  register: (id) => marketListHref("companies", { register: id }),
};

function LinkedId({ id, kind }: { id: string; kind: LinkKind }) {
  return (
    <Link href={LINKED[kind](id)} className={`${LINK} font-mono`} translate="no">
      {id}
    </Link>
  );
}

function allIndustries(sources: MarketSources): IndustryName[] {
  const seen = new Map<string, IndustryName>();
  for (const industry of [...sources.named_industries, ...sources.industries]) {
    seen.set(industryKey(industry.source, industry.name), { source: industry.source, name: industry.name });
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name));
}
