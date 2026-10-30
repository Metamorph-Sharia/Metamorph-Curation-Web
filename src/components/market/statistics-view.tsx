import Link from "next/link";
import type { ReactNode } from "react";

import type { DatasetPage, DatasetView, MarketSeriesView, MarketSources } from "@/lib/api/types";
import { formatCount, formatDay } from "@/lib/format";
import { formatFigure, formatPeriod, frequencyLabel } from "@/lib/market";
import { datasetHref, documentHref, marketListHref, seriesHref } from "@/lib/routes";

import { Badge } from "../badge";
import { Empty } from "../empty";
import { Section } from "../section";
import { LINK } from "../styles";
import { Table } from "../table";
import { Pager, Tabs } from "../tabs";
import { SearchForm } from "./companies-view";

export type DatasetFilterState = { q: string; source?: string; industry?: string };

// The statistics catalog: datasets found by ID, metric or group, filtered by source; the URL keeps each.
export function DatasetList({
  page,
  filters,
  sources,
}: {
  page: DatasetPage;
  filters: DatasetFilterState;
  sources: MarketSources["sources"];
}) {
  const href = (change: Partial<DatasetFilterState & { page: number }>) => marketListHref("datasets", { ...filters, ...change });
  return (
    <div className="grid gap-6">
      <SearchForm action="/market/datasets" query={filters.q} label="Dataset" placeholder="posisi keuangan, inflasi, or a table’s ID…">
        {(["source", "industry"] as const).map((name) =>
          filters[name] ? <input key={name} type="hidden" name={name} value={filters[name]} /> : null,
        )}
      </SearchForm>
      <Tabs
        label="Source"
        tabs={[
          { href: href({ source: undefined, page: 1 }), text: "Every Source", current: !filters.source },
          ...sources.map((source) => ({
            href: href({ source: source.id, page: 1 }),
            text: source.id,
            count: source.datasets,
            current: filters.source === source.id,
          })),
        ]}
      />
      {filters.industry ? (
        <p className="text-sm">
          Industry: {filters.industry}.{" "}
          <Link href={href({ industry: undefined, page: 1 })} className={LINK}>
            Every industry
          </Link>
        </p>
      ) : null}
      <p className="text-sm text-muted">{formatCount(page.total)} datasets</p>
      {page.rows.length ? (
        <Table head={["Dataset", "Industry", "Series", "From", "To"]} numeric={[2]}>
          {page.rows.map((row) => (
            <tr key={row.id}>
              <td>
                <Link href={datasetHref(row.id)} className={LINK}>
                  {row.metric}
                </Link>
                <p className="font-mono text-xs text-muted" translate="no">
                  {row.id}
                </p>
              </td>
              <td>{row.industry ?? <span className="text-muted">Macro</span>}</td>
              <td className="text-right font-mono tabular-nums">{formatCount(row.series)}</td>
              <td className="whitespace-nowrap">{formatDay(row.first_period)}</td>
              <td className="whitespace-nowrap">{formatDay(row.last_period)}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>No dataset matches. Clear the search or a filter to see more.</Empty>
      )}
      <Pager page={page.page} pages={page.pages} href={(number) => href({ page: number })} />
    </div>
  );
}

export function DatasetPageView({ view }: { view: DatasetView }) {
  const { dataset } = view;
  return (
    <div className="grid gap-12">
      <dl className="grid gap-2 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
        <Fact label="Source">
          <span className="font-mono" translate="no">{dataset.source}</span>
          {view.citation ? ` · cited as “${view.citation}”` : ""}
        </Fact>
        <Fact label="Industry">{dataset.industry ?? "None: a macro dataset"}</Fact>
        <Fact label="Governed by">
          {view.governed_by.length
            ? view.governed_by.map((id) => (
                <Link key={id} href={documentHref(id)} className={`${LINK} mr-3 font-mono`} translate="no">
                  {id}
                </Link>
              ))
            : "None linked"}
        </Fact>
        <Fact label="Updated">{dataset.updated ? formatDay(dataset.updated) : "Not stated"}</Fact>
        {view.url ? (
          <Fact label="At the source">
            <a href={view.url} target="_blank" rel="noopener" className={`${LINK} break-all`}>
              {view.url}
            </a>
          </Fact>
        ) : null}
      </dl>
      <Section id="series" title={`Series (${formatCount(view.series_total)})`}>
        <Table head={["Series", "Frequency", "Unit", "From", "To", "Figures"]} numeric={[5]}>
          {view.series.map((series) => (
            <tr key={series.id}>
              <td>
                <Link href={seriesHref(series.id)} className={LINK}>
                  {series.label}
                </Link>
              </td>
              <td>{frequencyLabel(series.frequency)}</td>
              <td>{series.unit ?? <span className="text-muted">Not stated</span>}</td>
              <td className="whitespace-nowrap">{formatPeriod(series.first_period, series.frequency)}</td>
              <td className="whitespace-nowrap">{formatPeriod(series.last_period, series.frequency)}</td>
              <td className="text-right font-mono tabular-nums">{formatCount(series.observations)}</td>
            </tr>
          ))}
        </Table>
        <Pager page={view.page} pages={view.pages} href={(number) => datasetHref(dataset.id, number)} />
      </Section>
    </div>
  );
}

// A series' figures, oldest first, each as the source gave it; a period the source marks provisional says so.
export function SeriesPageView({ view }: { view: MarketSeriesView }) {
  const { series } = view;
  return (
    <div className="grid gap-10">
      <dl className="grid gap-2 text-sm sm:grid-cols-[10rem_minmax(0,1fr)]">
        <Fact label="Dataset">
          <Link href={datasetHref(view.dataset)} className={`${LINK} font-mono`} translate="no">
            {view.dataset}
          </Link>
        </Fact>
        <Fact label="Frequency">{frequencyLabel(series.frequency)}</Fact>
        <Fact label="Unit">{series.unit ?? "Not stated"}</Fact>
        {view.dimensions.map((dimension) => (
          <Fact key={`${dimension.name}=${dimension.key}`} label={dimension.name}>
            {dimension.label} <span className="font-mono text-xs text-muted" translate="no">{dimension.key}</span>
          </Fact>
        ))}
        {view.citation ? <Fact label="Cite as">{view.citation}</Fact> : null}
      </dl>
      <Section id="figures" title="Figures">
        {view.observations.length ? (
          <Table head={["Period", "Value", ""]} numeric={[1]}>
            {view.observations.map((observation) => (
              <tr key={observation.period}>
                <td className="whitespace-nowrap">{formatPeriod(observation.period, series.frequency)}</td>
                <td className="text-right font-mono tabular-nums">{formatFigure(observation.value)}</td>
                <td>{observation.provisional ? <Badge tone="warning">Provisional</Badge> : null}</td>
              </tr>
            ))}
          </Table>
        ) : (
          <Empty>The series has no figures published.</Empty>
        )}
      </Section>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="contents">
      <dt className="text-muted">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}
