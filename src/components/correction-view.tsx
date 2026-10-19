import type { CorrectionDiff } from "@/lib/api/types";
import { formatDay } from "@/lib/format";

const LINE = {
  add: "bg-ok-soft text-ok",
  remove: "bg-critical-soft text-critical",
  hunk: "text-muted",
  same: "",
};

function kind(line: string): keyof typeof LINE {
  if (line.startsWith("+++") || line.startsWith("---") || line.startsWith("@@")) {
    return "hunk";
  }
  return line.startsWith("+") ? "add" : line.startsWith("-") ? "remove" : "same";
}

// What a curator changed in a text: the source's wording against the correction, line by line.
export function CorrectionView({ diff }: { diff: CorrectionDiff }) {
  const { correction } = diff;
  return (
    <div className="grid gap-4">
      <p className="text-sm text-muted">
        By {correction.note.author} on {formatDay(correction.note.created_at)}: “{correction.note.reason}”
      </p>
      {!correction.active ? (
        <p role="status" className="rounded-ui border border-warning bg-warning-soft px-4 py-2.5 text-sm">
          This correction was withdrawn.
        </p>
      ) : !correction.current ? (
        <p role="status" className="rounded-ui border border-warning bg-warning-soft px-4 py-2.5 text-sm">
          The source has since sent a new text, so this correction no longer applies. Compare it with the new text, then
          correct that one if it needs the same fix.
        </p>
      ) : null}
      <p className="text-sm text-muted">Lines starting with − are the source’s, lines starting with + are the correction’s.</p>
      <pre aria-label="Changes" className="overflow-x-auto rounded-ui border border-line bg-surface py-2 font-mono text-xs leading-relaxed">
        {diff.diff.map((line, index) => (
          <span key={index} className={`block whitespace-pre-wrap px-4 ${LINE[kind(line)]}`}>
            {line || " "}
          </span>
        ))}
      </pre>
    </div>
  );
}
