import type { CorrectionDiff } from "@/lib/api/types";
import { formatDay } from "@/lib/format";

import { CARD, notice } from "./styles";

const LINE = {
  add: "bg-ok-soft text-ok",
  remove: "bg-critical-soft text-critical",
  hunk: "bg-sunken/60 text-muted",
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
      <blockquote className="max-w-[75ch] border-l-2 border-accent pl-4 text-sm text-muted">
        By {correction.note.author} on {formatDay(correction.note.created_at)}: “{correction.note.reason}”
      </blockquote>
      {!correction.active ? (
        <p role="status" className={notice("warning")}>
          This correction was withdrawn.
        </p>
      ) : !correction.current ? (
        <p role="status" className={notice("warning")}>
          The source has since sent a new text, so this correction no longer applies. Compare it with the new text, then
          correct that one if it needs the same fix.
        </p>
      ) : null}
      <p className="text-sm text-muted">Lines starting with − are the source’s, lines starting with + are the correction’s.</p>
      <pre aria-label="Changes" className={`${CARD} overflow-x-auto py-3 font-mono text-xs leading-relaxed`}>
        {diff.diff.map((line, index) => (
          <span key={index} className={`block whitespace-pre-wrap px-4 ${LINE[kind(line)]}`}>
            {line || " "}
          </span>
        ))}
      </pre>
    </div>
  );
}
