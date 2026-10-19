import Link from "next/link";

import type { Dashboard } from "@/lib/api/types";
import { formatCount, formatMoment } from "@/lib/format";
import { reviewQueueLabel, sentence, severityLabel, severityTone } from "@/lib/labels";

import { Badge } from "./badge";
import { Empty } from "./empty";
import { Section } from "./section";
import { Table } from "./table";

// The overview, from the API's dashboard: what is held back, what waits for review, ingestion health, the
// registry, the latest loads. Plain data in, markup out: the page fetches, this renders.
export function OverviewView({ dashboard }: { dashboard: Dashboard }) {
  return (
    <div className="grid gap-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Held held={dashboard.held} stillPublished={dashboard.held_published} />
        <WaitingForReview queues={dashboard.open_reviews} />
      </div>
      <Health dashboard={dashboard} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Registry byIssuer={dashboard.documents_by_issuer} published={dashboard.published} />
        <LatestLoads bundles={dashboard.recent_bundles} />
      </div>
    </div>
  );
}

function Held({ held, stillPublished }: { held: number; stillPublished: number }) {
  return (
    <Section id="held" title="Held Back from Publishing">
      <div className="grid gap-2 rounded-ui border border-line bg-surface p-5">
        <Link href="/held" className="w-fit font-mono text-4xl font-semibold tabular-nums tracking-tight text-accent underline-offset-4 hover:underline">
          {formatCount(held)}
          <span className="sr-only"> held documents</span>
        </Link>
        <p className="max-w-[60ch] text-sm text-muted">{stillPublishedNote(stillPublished)}</p>
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

function WaitingForReview({ queues }: { queues: Dashboard["open_reviews"] }) {
  return (
    <Section id="review" title="Waiting for Review">
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-ui border border-line bg-line sm:grid-cols-3">
        {queues.map(([kind, open]) => (
          <li key={kind} className="bg-surface">
            <Link href={`/review?kind=${kind}`} className="grid h-full gap-1 p-5 transition-colors hover:bg-sunken">
              <span className="text-sm text-muted">{reviewQueueLabel(kind)}</span>
              <span className="font-mono text-2xl font-semibold tabular-nums">{formatCount(open)}</span>
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
            <td className="whitespace-nowrap font-mono" translate="no">
              {issuer}
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
