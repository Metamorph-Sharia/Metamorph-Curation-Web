import type { DocumentRow } from "@/lib/api/types";
import { sentence } from "@/lib/labels";

import { Badge } from "./badge";
import { DocumentLink } from "./document-link";
import { Empty } from "./empty";

export function SearchView({ query, results }: { query: string; results: DocumentRow[] }) {
  if (!query) {
    return <Empty>Search by ID, citation, title or alias, e.g. 10/POJK.05/2019 or ojk:pojk:2019:10.</Empty>;
  }
  if (!results.length) {
    return <Empty>No document matches “{query}”. Try its citation as the source writes it, or part of its title.</Empty>;
  }
  return (
    <ul className="divide-y divide-line rounded-ui border border-line bg-surface">
      {results.map((row) => (
        <li key={row.id} className="grid gap-2 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="grid gap-1">
            <DocumentLink id={row.id} title={row.title} />
            <p className="text-sm">{row.citation}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="neutral">{sentence(row.kind)}</Badge>
            <Badge tone="neutral">{sentence(row.status)}</Badge>
            {row.suppressed ? <Badge tone="critical">Suppressed</Badge> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
