import { doneNotice } from "@/lib/labels";

// What a change did, said once after it redirects here (`?done=…`), for screen readers too.
export function DoneNotice({ done }: { done: string | undefined }) {
  const notice = doneNotice(done);
  return notice ? (
    <p role="status" className="rounded-ui border border-ok bg-ok-soft px-4 py-2.5 text-sm">
      {notice}
    </p>
  ) : null;
}
