import { notice } from "./styles";

// What a change named that isn't published yet, said after it redirects here (`?warning=…`): kept, and said.
export function WarningsNotice({ warnings }: { warnings: string[] }) {
  return warnings.length ? (
    <div role="status" className={`${notice("warning")} grid gap-1`}>
      <p className="font-medium text-warning">Saved, with {warnings.length === 1 ? "a warning" : "warnings"}</p>
      <ul className="list-disc pl-5">
        {warnings.map((warning) => (
          <li key={warning} className="text-pretty">
            {warning}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
