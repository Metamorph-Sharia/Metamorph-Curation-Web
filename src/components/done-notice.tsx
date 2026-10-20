import { doneNotice } from "@/lib/labels";

import { notice } from "./styles";

// What a change did, said once after it redirects here (`?done=…`), for screen readers too.
export function DoneNotice({ done }: { done: string | undefined }) {
  const said = doneNotice(done);
  return said ? (
    <p role="status" className={`${notice("ok")} text-ok`}>
      {said}
    </p>
  ) : null;
}
