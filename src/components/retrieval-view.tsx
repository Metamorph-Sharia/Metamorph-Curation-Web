import { formatCount } from "@/lib/format";
import { emptySentence, type Answer, type Body, type Item, type Link as RetrievedLink } from "@/lib/retrieval/answer";
import { consoleHref } from "@/lib/retrieval/links";
import { TOOLS, type Tool } from "@/lib/retrieval/tools";

import Link from "next/link";

import { Badge } from "./badge";
import { Empty } from "./empty";
import { button, CARD, CONTROL } from "./styles";

const PROVIDER_LABELS: Record<string, string> = {
  "regulation-retrieval": "Regulation",
  market: "Market",
};

// The retrieval page: pick a tool, give it its one argument, and read what the gateway answered, with the numbers
// a curator never sees — rank, score, how each hit matched, and which provider and index answered.
export function RetrievalView({ tool, value }: { tool: Tool; value: string }) {
  return (
    <div className="grid gap-6">
      <ToolPicker tool={tool} value={value} />
      <form action="/retrieval" method="get" role="search" className="flex max-w-3xl flex-wrap items-end gap-3">
        <input type="hidden" name="tool" value={tool.name} />
        {tool.argument ? (
          <div className="grid min-w-0 flex-1 gap-1.5">
            <label htmlFor="value" className="text-sm font-medium">
              {tool.argument.label}
            </label>
            <input
              id="value"
              name="value"
              type="text"
              defaultValue={value}
              placeholder={tool.argument.placeholder}
              autoComplete="off"
              className={CONTROL}
            />
          </div>
        ) : null}
        <button type="submit" className={button("primary")}>
          Ask the gateway
        </button>
      </form>
    </div>
  );
}

function ToolPicker({ tool, value }: { tool: Tool; value: string }) {
  return (
    <div className="grid gap-3">
      <form action="/retrieval" method="get" className="flex max-w-3xl flex-wrap items-end gap-3">
        <div className="grid min-w-0 flex-1 gap-1.5">
          <label htmlFor="tool" className="text-sm font-medium">
            Tool
          </label>
          <select id="tool" name="tool" defaultValue={tool.name} className={CONTROL}>
            {TOOLS.map((option) => (
              <option key={option.name} value={option.name}>
                {option.label} — {option.name}
              </option>
            ))}
          </select>
        </div>
        <input type="hidden" name="value" value={value} />
        <button type="submit" className={button("quiet")}>
          Choose
        </button>
      </form>
      <p className="max-w-[65ch] text-sm text-muted text-pretty">{tool.about}</p>
    </div>
  );
}

export function RetrievalErrorNotice({ message }: { message: string }) {
  return <p className="rounded-ui border border-critical/30 bg-critical-soft px-4 py-3 text-sm">{message}</p>;
}

// The answer: a ranked page is split by provider, so the two rankings sit side by side and can be compared; an
// exact tool's evidence is one list; a link page shows each link's two ends.
export function RetrievalAnswer({ tool, answer, milliseconds }: { tool: Tool; answer: Answer; milliseconds: number }) {
  const groups = byProvider(answer.items);
  const count = answer.shape === "links" ? answer.links.length : answer.items.length;
  return (
    <div className="grid gap-5">
      <p className="text-sm text-muted">
        {tool.label}, answered in {formatCount(milliseconds)} ms: {formatCount(count)}{" "}
        {answer.shape === "links" ? (count === 1 ? "link" : "links") : count === 1 ? "item" : "items"}
        {groups.length > 1 ? ` from ${formatCount(groups.length)} providers` : ""}.
      </p>
      {answer.warnings.map((warning) => (
        <p key={warning} className="rounded-ui border border-warning/30 bg-warning-soft px-4 py-3 text-sm">
          {warning}
        </p>
      ))}
      {count === 0 ? <Empty>{emptySentence(answer.emptyReason)}</Empty> : null}
      {answer.shape === "links" ? <LinkList links={answer.links} /> : null}
      {answer.shape !== "links" && answer.shape === "hits" && groups.length > 1 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map(([provider, items]) => (
            <section key={provider} className="grid content-start gap-3">
              <h2 className="text-sm font-medium">{providerLabel(provider)}</h2>
              <ItemList items={items} />
            </section>
          ))}
        </div>
      ) : null}
      {answer.shape !== "links" && (answer.shape !== "hits" || groups.length <= 1) ? <ItemList items={answer.items} /> : null}
    </div>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ol className="grid gap-3">
      {items.map((item) => (
        <ItemCard key={`${item.ref}-${item.rank ?? "evidence"}`} item={item} />
      ))}
    </ol>
  );
}

function ItemCard({ item }: { item: Item }) {
  const where = consoleHref(item.ref);
  return (
    <li className={`${CARD} grid gap-2 p-5`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
        {item.rank !== undefined ? <span className="tabular-nums text-muted">#{item.rank}</span> : null}
        {item.score !== undefined ? <span className="tabular-nums font-medium">{item.score.toFixed(3)}</span> : null}
        {item.matchedBy.map((how) => (
          <Badge key={how} tone={how === "semantic" ? "ok" : "neutral"}>
            {how}
          </Badge>
        ))}
        {item.kind ? <span className="text-muted">{item.kind}</span> : null}
      </div>
      <p className="font-medium text-pretty">{item.citation || item.ref}</p>
      {item.title ? <p className="text-sm text-muted text-pretty">{item.title}</p> : null}
      <BodyView body={item.body} />
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-muted">
        <code className="break-all font-mono">{item.ref}</code>
        {item.provider ? <span>{providerLabel(item.provider)}</span> : null}
        {item.indexVersion ? <span>{item.indexVersion}</span> : null}
        {item.sourcePublishedAt ? <span>data as of {item.sourcePublishedAt.slice(0, 10)}</span> : null}
      </p>
      {where ? (
        <p className="pt-1">
          <Link href={where.href} className={button("quiet")}>
            {where.label}
          </Link>
        </p>
      ) : null}
    </li>
  );
}

function BodyView({ body }: { body: Body }) {
  if (body.type === "text") {
    return <p className="text-sm text-pretty">{excerpt(body.wording)}</p>;
  }
  if (body.type === "record") {
    return (
      <dl className="grid gap-1 text-sm">
        {body.fields.slice(0, 8).map(([name, value]) => (
          <div key={name} className="flex flex-wrap gap-x-2">
            <dt className="text-muted">{name}</dt>
            <dd className="min-w-0 break-words">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (body.type === "figures") {
    return (
      <div className="grid gap-1 text-sm">
        <p className="text-muted">
          {body.unit || "no unit"}, {body.frequency}
        </p>
        <ul className="grid gap-0.5">
          {body.points.slice(0, 6).map((point) => (
            <li key={point.period} className="tabular-nums">
              {point.period}: {point.value}
              {point.provisional ? " (provisional)" : ""}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}

function LinkList({ links }: { links: RetrievedLink[] }) {
  return (
    <ol className="grid gap-2">
      {links.map((link) => (
        <li key={`${link.type}-${link.source}-${link.target}`} className={`${CARD} grid gap-1 p-4 text-sm`}>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-medium">{link.type}</span>
            {link.effectiveOn ? <span className="text-muted">from {link.effectiveOn}</span> : null}
            {link.confidence !== null ? <span className="text-muted tabular-nums">{link.confidence.toFixed(2)}</span> : null}
          </div>
          <p className="flex flex-wrap items-baseline gap-2">
            <code className="break-all font-mono text-xs">{link.source}</code>
            <span className="text-muted">→</span>
            <code className="break-all font-mono text-xs">{link.target}</code>
          </p>
        </li>
      ))}
    </ol>
  );
}

function providerLabel(provider: string): string {
  return PROVIDER_LABELS[provider] ?? provider;
}

function byProvider(items: Item[]): [provider: string, items: Item[]][] {
  const groups = new Map<string, Item[]>();
  for (const item of items) {
    const key = item.provider || "unknown";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()];
}

// A hit can hold a whole article: the card shows its opening, and the ref opens the rest.
function excerpt(body: string, length = 320): string {
  const flat = body.replace(/\s+/g, " ").trim();
  return flat.length > length ? `${flat.slice(0, length)}…` : flat;
}
