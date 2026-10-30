import Link from "next/link";
import type { ReactNode } from "react";

import type { CompanyPage, CompanyView, MentionRow } from "@/lib/api/types";
import { formatCount, formatDay } from "@/lib/format";
import { BUSINESS_TYPE_CHOICES, COMPANY_STATUSES, businessTypeLabel, companyStatusLabel } from "@/lib/market";
import { companyHref, marketListHref, releaseHref, reportHref } from "@/lib/routes";

import { Badge } from "../badge";
import { Empty } from "../empty";
import { Section } from "../section";
import { button, CARD, CONTROL, LINK } from "../styles";
import { Table } from "../table";
import { Pager, Tabs } from "../tabs";

export type CompanyFilterState = { q: string; register?: string; status?: string; business_type?: string };

const STATUS_TONES: Record<string, "ok" | "neutral" | "warning"> = { licensed: "ok", registered: "neutral", left: "warning" };

// The register's companies: found by name, filtered by standing and business type, the URL keeping each.
export function CompanyList({ page, filters }: { page: CompanyPage; filters: CompanyFilterState }) {
  const href = (change: Partial<CompanyFilterState & { page: number }>) => marketListHref("companies", { ...filters, ...change });
  return (
    <div className="grid gap-6">
      <SearchForm action="/market/companies" query={filters.q} label="Company" placeholder="PT Fintech, or part of a name…">
        {(["register", "status", "business_type"] as const).map((name) =>
          filters[name] ? <input key={name} type="hidden" name={name} value={filters[name]} /> : null,
        )}
      </SearchForm>
      <Tabs
        label="Standing"
        tabs={[
          { href: href({ status: undefined, page: 1 }), text: "Any Standing", current: !filters.status },
          ...COMPANY_STATUSES.map((status) => ({
            href: href({ status, page: 1 }),
            text: companyStatusLabel(status),
            current: filters.status === status,
          })),
        ]}
      />
      <Tabs
        label="Business type"
        tabs={[
          { href: href({ business_type: undefined, page: 1 }), text: "Sharia or Conventional", current: !filters.business_type },
          ...BUSINESS_TYPE_CHOICES.map((type) => ({
            href: href({ business_type: type, page: 1 }),
            text: businessTypeLabel(type),
            current: filters.business_type === type,
          })),
        ]}
      />
      <p className="text-sm text-muted">{formatCount(page.total)} companies</p>
      {page.rows.length ? (
        <Table head={["Company", "Standing", "Business Type", "First Listed", "Left After"]}>
          {page.rows.map((row) => (
            <tr key={row.id}>
              <td>
                <Link href={companyHref(row.id)} className={LINK}>
                  {row.legal_name}
                </Link>
              </td>
              <td>
                <Badge tone={STATUS_TONES[row.status] ?? "neutral"}>{companyStatusLabel(row.status)}</Badge>
              </td>
              <td>{businessTypeLabel(row.business_type)}</td>
              <td className="whitespace-nowrap">{row.first_listed ? formatDay(row.first_listed) : "Not listed"}</td>
              <td className="whitespace-nowrap">{row.left_after ? formatDay(row.left_after) : "On the list"}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>No company matches. Clear the search or a filter to see more.</Empty>
      )}
      <Pager page={page.page} pages={page.pages} href={(number) => href({ page: number })} />
    </div>
  );
}

export function CompanyPageView({ view }: { view: CompanyView }) {
  const { company } = view;
  return (
    <div className="grid gap-12">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <Badge tone={STATUS_TONES[company.status] ?? "neutral"}>{companyStatusLabel(company.status)}</Badge>
        <span>{businessTypeLabel(company.business_type)}</span>
        <span className="font-mono text-muted" translate="no">
          {company.register}
        </span>
        {view.names.length ? <span className="text-muted">Also listed as {view.names.join("; ")}</span> : null}
      </div>
      <Section id="licences" title="Licences and Registrations">
        <ul className="grid gap-4">
          {view.entities.map((entity) => (
            <li key={entity.id} className={`${CARD} grid gap-2 p-5`}>
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-medium">{entity.kind === "license" ? "Licence" : "Registration"}</span>
                <span className="font-mono text-sm" translate="no">
                  {entity.license_number}
                </span>
                {entity.license_date ? <span className="text-sm text-muted">{formatDay(entity.license_date)}</span> : null}
              </p>
              <p className="text-sm text-muted">
                Listed {entity.first_listed ? formatDay(entity.first_listed) : "never"} to{" "}
                {entity.last_listed ? formatDay(entity.last_listed) : "never"}
                {entity.on_newest_list ? ", on the newest list" : entity.left_after ? `; left after ${formatDay(entity.left_after)}` : ""}
                .
              </p>
              {entity.website ? (
                <p className="text-sm">
                  <a href={/^https?:\/\//.test(entity.website) ? entity.website : `https://${entity.website}`} target="_blank" rel="noopener noreferrer" className={`${LINK} break-all`}>
                    {entity.website}
                  </a>
                </p>
              ) : null}
              {entity.review_notes.length ? (
                <p className="text-sm text-warning">Review notes: {entity.review_notes.join("; ")}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>
      <Section id="named-by" title="Named in Reports and Releases">
        <Mentions mentions={view.mentions} empty="No report or press release names this company by its legal name." />
      </Section>
    </div>
  );
}

// Passages that name a company or a regulation, newest first; each opens its document at the passage.
export function Mentions({ mentions, empty }: { mentions: readonly MentionRow[]; empty: string }) {
  if (!mentions.length) {
    return <Empty>{empty}</Empty>;
  }
  return (
    <ul className="grid gap-3">
      {mentions.map((mention) => (
        <li key={`${mention.document}#${mention.address}`} className={`${CARD} grid gap-1 p-4`}>
          <Link href={`${mention.kind === "release" ? releaseHref(mention.document) : reportHref(mention.document)}#${mention.address}`} className={LINK}>
            {mention.title}
          </Link>
          <p className="text-sm text-muted">
            {mention.citation}
            {mention.published_on ? ` · ${formatDay(mention.published_on)}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}

// A list's search: one field, the filters in use kept as hidden fields, submitted as a GET so the URL holds it.
export function SearchForm({
  action,
  query,
  label,
  placeholder,
  children,
}: {
  action: string;
  query: string;
  label: string;
  placeholder: string;
  children?: ReactNode;
}) {
  return (
    <form role="search" action={action} className="flex max-w-3xl flex-wrap items-end gap-3">
      {children}
      <div className="grid min-w-0 flex-1 gap-1.5">
        <label htmlFor="q" className="text-sm font-medium">
          {label}
        </label>
        <input id="q" name="q" type="search" defaultValue={query} autoComplete="off" spellCheck={false} placeholder={placeholder}
          className={`${CONTROL} min-h-12 text-base`} />
      </div>
      <button type="submit" className={`${button("primary")} min-h-12 px-6`}>
        Search
      </button>
    </form>
  );
}
