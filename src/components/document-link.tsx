import Link from "next/link";

import { documentHref } from "@/lib/routes";

// A document as a link: its ID (never translated), and its title beneath when known.
export function DocumentLink({ id, title }: { id: string; title?: string | null }) {
  return (
    <div className="grid min-w-0 gap-0.5">
      <Link href={documentHref(id)} className="break-all font-mono text-sm text-accent underline-offset-4 hover:underline" translate="no">
        {id}
      </Link>
      {title ? <span className="truncate text-sm text-muted">{title}</span> : null}
    </div>
  );
}
