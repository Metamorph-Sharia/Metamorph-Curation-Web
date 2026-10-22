import Link from "next/link";

import type { Dashboard } from "@/lib/api/types";
import { formatCount, formatMoment } from "@/lib/format";
import { reviewQueueLabel, sentence, severityLabel, severityTone } from "@/lib/labels";
import { issuerLabel, searchHref } from "@/lib/search";

import { Badge } from "./badge";
import { Empty } from "./empty";
import { Section } from "./section";
import { CARD, LINK } from "./styles";
import { Table } from "./table";

// The overview, from the API's dashboard: what is held back, what waits for review, ingestion health, the
// registry, the latest loads. Plain data in, markup out: the page fetches, this renders.
export function OverviewView({ dashboard }: { dashboard: Dashboard }) {
  return (
    <div className="grid gap-12">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Held held={dashboard.held} stillPublished={dashboard.held_published} />
        <WaitingForReview queues={dashboard.open_reviews} gaps={dashboard.gaps} />
      </div>
      <Health dashboard={dashboard} />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Registry byIssuer={dashboard.documents_by_issuer} published={dashboard.published} />
        <LatestLoads bundles={dashboard.recent_bundles} />
      </div>
    </div>
  );
}

function Held({ held, stillPublished }: { held: number; stillPublished: number }) {
  return (
    <Section id="held" title="Held Back from Publishing">
      <div className={`${CARD} grid h-full content-start gap-3 p-5 sm:p-6`}>
        <Link href="/held" className="w-fit rounded-ui font-heading text-6xl leading-none tabular-nums tracking-tight text-accent decoration-2 underline-offset-8 hover:underline">
          {formatCount(held)}
          <span className="sr-only"> held documents</span>
        </Link>
        <p className="max-w-[60ch] text-sm text-muted text-pretty">{stillPublishedNote(stillPublished)}</p>
      </div>
    </Section>
  );
}

function stillPublishedNote(count: number): string {
  if (count === 0) {
    return "None of them has an earlier version published: the assistant doesn’t see them yet.";
  }
  const verb = count === 1 ? "still has" : "still have";
  return `${formatCount(count)} of them ${verb} an earlier version published, which the assistant sees until they pass again. Work on those first.`;
}

// Each review queue, and the published documents whose numbering has gaps: what a curator can work through.
function WaitingForReview({ queues, gaps }: { queues: Dashboard["open_reviews"]; gaps: number }) {
  const tiles = [
    ...queues.map(([kind, open]) => ({ href: `/review?kind=${kind}`, label: reviewQueueLabel(kind), count: open })),
    { href: "/gaps", label: "Numbering Gaps", count: gaps },
  ];
  return (
    <Section id="review" title="Waiting for Review">
      <ul className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2">
        {tiles.map(({ href, label, count }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${CARD} group grid h-full content-between gap-6 p-5 transition-colors hover:border-accent/40`}
            >
              <span className="text-sm text-muted transition-colors group-hover:text-text">{label}</span>
              <span className="flex items-baseline justify-between gap-2">
                <span className="font-heading text-4xl leading-none tabular-nums">{formatCount(count)}</span>
                <span aria-hidden className="text-accent transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Health({ dashboard }: { dashboard: Dashboard }) {
  const { health_status: status, health_taken_at: takenAt, checks } = dashboard;
  return (
    <Section id="health" title="Ingestion Health">
      {status && takenAt ? (
        <>
          <p className="flex flex-wrap items-center gap-3 text-sm">
            <Badge tone={severityTone(status)}>{severityLabel(status)}</Badge>
            <span className="text-muted">Checked {formatMoment(takenAt)}</span>
          </p>
          <Table head={["Check", "Status", "Detail"]}>
            {checks.map((check) => (
              <tr key={check.name}>
                <td className="whitespace-nowrap font-mono" translate="no">
                  {check.name}
                </td>
                <td>
                  <Badge tone={severityTone(check.severity)}>{severityLabel(check.severity)}</Badge>
                </td>
                <td>{check.detail}</td>
              </tr>
            ))}
          </Table>
        </>
      ) : (
        <Empty>
          No health check has run yet. The daily <code className="font-mono">health</code> DAG runs one, or run{" "}
          <code className="font-mono">metamorph health</code>.
        </Empty>
      )}
    </Section>
  );
}

function Registry({ byIssuer, published }: { byIssuer: Dashboard["documents_by_issuer"]; published: number }) {
  return (
    <Section id="registry" title="Registry">
      <Table head={["Issuer", "Documents"]} numeric={[1]}>
        {byIssuer.map(([issuer, total]) => (
          <tr key={issuer}>
            <td className="whitespace-nowrap">
              <Link href={searchHref({}, { issuer: String(issuer) })} className={LINK}>
                {issuerLabel(String(issuer))}
              </Link>
            </td>
            <td className="text-right font-mono tabular-nums">{formatCount(total)}</td>
          </tr>
        ))}
        <tr className="font-semibold">
          <th scope="row" className="text-left">
            Published
          </th>
          <td className="text-right font-mono tabular-nums">{formatCount(published)}</td>
        </tr>
      </Table>
    </Section>
  );
}

function LatestLoads({ bundles }: { bundles: Dashboard["recent_bundles"] }) {
  return (
    <Section id="loads" title="Latest Loads">
      {bundles.length ? (
        <Table head={["Connector", "Received", "State", "Changed", "Unchanged", "Quarantined"]} numeric={[3, 4, 5]}>
          {bundles.map((bundle) => (
            <tr key={`${bundle.connector}/${bundle.run_id}`}>
              <td className="whitespace-nowrap font-mono" translate="no">
                {bundle.connector}
              </td>
              <td className="whitespace-nowrap">{formatMoment(bundle.received_at)}</td>
              <td>
                <Badge tone={bundle.state === "failed" ? "critical" : bundle.state === "loaded" ? "ok" : "neutral"}>
                  {sentence(bundle.state)}
                </Badge>
              </td>
              <td className="text-right font-mono tabular-nums">{formatCount(bundle.loaded)}</td>
              <td className="text-right font-mono tabular-nums">{formatCount(bundle.unchanged)}</td>
              <td className="text-right font-mono tabular-nums">{formatCount(bundle.quarantined)}</td>
            </tr>
          ))}
        </Table>
      ) : (
        <Empty>
          No bundle has been loaded yet. Load one with <code className="font-mono">metamorph load</code>, or unpause an
          ingest DAG.
        </Empty>
      )}
    </Section>
  );
}
