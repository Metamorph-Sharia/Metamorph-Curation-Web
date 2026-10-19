import type { CuratorNote } from "@/lib/api/types";
import { formatDay } from "@/lib/format";

// Who decided something, when, and why: as the audit log records it.
export function NoteLine({ prefix, note }: { prefix: string; note: CuratorNote }) {
  return (
    <span className="text-xs text-muted">
      {prefix} by {note.author} on {formatDay(note.created_at)}: “{note.reason}”
    </span>
  );
}
