"use client";

import type { ReactNode } from "react";

import {
  setIndustry,
  setRegisterLinks,
  setSector,
  setSource,
  withdrawIndustry,
  withdrawSector,
} from "@/app/(console)/market/actions";
import type { IndustryName, IndustryView, RegisterView, SectorView, StatisticsSourceView } from "@/lib/api/types";
import { industryKey } from "@/lib/market";

import { ActionForm } from "../action-form";
import { IdListField, ReasonField, SelectField, TextField } from "../fields";
import { CARD, CONTROL } from "../styles";

const REGULATION_IDS = (
  <>
    Document IDs, one per line, such as <code className="font-mono">ojk:pojk:2024:40</code>. One not published yet is kept,
    and links nothing until it is.
  </>
);
const REPORT_IDS = (
  <>
    Report IDs or families, one per line: <code className="font-mono">ojk:lpksi</code> names every edition published,{" "}
    <code className="font-mono">ojk:roadmap:2023:rp3si</code> one report.
  </>
);

// A form folded away until a curator opens it: the page reads first, and edits on demand.
export function Disclosure({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group">
      <summary className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-ui text-sm font-medium text-accent hover:underline">
        <span aria-hidden className="transition-transform group-open:rotate-90">
          ›
        </span>
        {summary}
      </summary>
      <div className={`${CARD} mt-3 p-4 sm:p-5`}>{children}</div>
    </details>
  );
}

export function RegisterLinksForm({ register }: { register: RegisterView }) {
  const id = (field: string) => `${register.id}-${field}`;
  return (
    <ActionForm action={setRegisterLinks.bind(null, register.id)} submit="Save and Publish" busy="Publishing…">
      <IdListField id={id("governed_by")} name="governed_by" label="Governed by" help={REGULATION_IDS} defaultValue={register.governed_by} />
      <IdListField id={id("reports")} name="reports" label="Reports" help={REPORT_IDS} defaultValue={register.reports} />
      <FreshDays id={id("fresh_days")} days={register.fresh_days} what="its newest edition" />
      <ReasonField id={id("reason")} placeholder="What changed, and where it says so…" />
    </ActionForm>
  );
}

export function SourceForm({ source }: { source: StatisticsSourceView }) {
  const id = (field: string) => `${source.id}-${field}`;
  return (
    <ActionForm action={setSource.bind(null, source.id)} submit="Save and Publish" busy="Publishing…">
      <TextField id={id("citation")} name="citation" label="Citation" required={false} defaultValue={source.citation ?? ""}
        help="How the source asks to be cited. Every dataset of the source is cited so." />
      <FreshDays id={id("fresh_days")} days={source.fresh_days} what="its newest period" />
      <TextField id={id("download_page")} name="download_page" label="Download page" type="url" required={false} code
        defaultValue={source.download_page ?? ""} help="Where a curator downloads an edition by hand, if the source needs it." />
      <TextField id={id("download_hint")} name="download_hint" label="What to download" required={false}
        defaultValue={source.download_hint ?? ""} help="Which file, and where it goes." />
      <ReasonField id={id("reason")} placeholder="Why the source’s settings change…" />
    </ActionForm>
  );
}

function FreshDays({ id, days, what }: { id: string; days: number; what: string }) {
  return (
    <div className="grid gap-1.5 sm:w-48">
      <label htmlFor={id} className="text-sm font-medium">
        Fresh for (days)
      </label>
      <input id={id} name="fresh_days" type="number" inputMode="numeric" min={1} max={3650} required autoComplete="off" defaultValue={days}
        className={`${CONTROL} tabular-nums`} />
      <p className="text-xs text-muted">Health warns once {what} is older.</p>
    </div>
  );
}

// An industry's links. A known industry edits its own; a new one is chosen from those the sources name.
export function IndustryForm({
  industry,
  registers,
  unlinked = [],
}: {
  industry?: IndustryView;
  registers: RegisterView[];
  unlinked?: IndustryName[];
}) {
  const key = industry ? industryKey(industry.source, industry.name) : "new-industry";
  const id = (field: string) => `${key}-${field}`;
  const known = industry ? { source: industry.source, name: industry.name } : null;
  return (
    <ActionForm action={setIndustry.bind(null, known)} submit="Save and Publish" busy="Publishing…">
      {industry ? null : (
        <SelectField id={id("industry")} name="industry" label="Industry, as its source names it"
          options={unlinked.map((named) => [industryKey(named.source, named.name), `${named.name} (${named.source})`])} />
      )}
      <SelectField id={id("register")} name="register" label="Register" defaultValue={industry?.register ?? ""}
        options={[["", "None: regulations of its own"], ...registers.map((r): [string, string] => [r.id, `${r.name} (${r.id})`])]} />
      <IdListField id={id("governed_by")} name="governed_by" label="Its own regulations" defaultValue={industry?.governed_by ?? []}
        help={<>Used only without a register: an industry with one shares the register’s. {REGULATION_IDS}</>} />
      <IdListField id={id("reports")} name="reports" label="Reports" help={REPORT_IDS} defaultValue={industry?.reports ?? []} />
      <ReasonField id={id("reason")} placeholder="Why the industry links these…" />
    </ActionForm>
  );
}

export function WithdrawIndustryForm({ industry }: { industry: IndustryView }) {
  const key = industryKey(industry.source, industry.name);
  return (
    <ActionForm action={withdrawIndustry.bind(null, industry.source, industry.name)} submit="Withdraw Industry" busy="Withdrawing…" tone="danger">
      <p className="text-sm text-muted">Its datasets stay published, without its register, regulations or reports.</p>
      <ReasonField id={`${key}-withdraw-reason`} placeholder="Why the industry goes…" />
    </ActionForm>
  );
}

// A sector: its names, and which of the sources' industries it gathers, in the order checked.
export function SectorForm({ sector, industries }: { sector?: SectorView; industries: IndustryName[] }) {
  const key = sector?.id ?? "new-sector";
  const id = (field: string) => `${key}-${field}`;
  const members = new Set((sector?.industries ?? []).map((named) => industryKey(named.source, named.name)));
  return (
    <ActionForm action={setSector.bind(null, sector?.id ?? null)} submit="Save and Publish" busy="Publishing…">
      {sector ? null : (
        <TextField id={id("sector_id")} name="sector_id" label="ID" code placeholder="sharia-banking…"
          help="Lowercase words joined by hyphens. It can’t be changed later." />
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={id("name")} name="name" label="Name" defaultValue={sector?.name} placeholder="Perbankan Syariah…" />
        <TextField id={id("name_en")} name="name_en" label="Name in English" required={false} defaultValue={sector?.name_en}
          placeholder="Sharia banking…" />
      </div>
      <fieldset className="grid gap-2">
        <legend className="mb-1 text-sm font-medium">Industries</legend>
        {industries.map((named) => {
          const value = industryKey(named.source, named.name);
          return (
            <label key={value} className="flex min-h-10 items-start gap-3 text-sm">
              <input type="checkbox" name="industries" value={value} defaultChecked={members.has(value)} className="mt-1 size-4 accent-accent" />
              <span>
                {named.name} <span className="font-mono text-xs text-muted" translate="no">{named.source}</span>
              </span>
            </label>
          );
        })}
      </fieldset>
      <ReasonField id={id("reason")} placeholder="What the sector gathers, and why…" />
    </ActionForm>
  );
}

export function WithdrawSectorForm({ sector }: { sector: SectorView }) {
  return (
    <ActionForm action={withdrawSector.bind(null, sector.id)} submit="Withdraw Sector" busy="Withdrawing…" tone="danger">
      <ReasonField id={`${sector.id}-withdraw-reason`} placeholder="Why the sector goes…" />
    </ActionForm>
  );
}
