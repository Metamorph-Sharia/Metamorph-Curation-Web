import Link from "next/link";

import { documentHref } from "@/lib/routes";

import { LINK } from "./styles";

// A document as a link: its ID (never translated), and its title beneath when known.
export function DocumentLink({ id, title }: { id: string; title?: string | null }) {
  return (
    <div className="grid min-w-0 gap-1">
      <Link href={documentHref(id)} className={`${LINK} w-fit break-all rounded-ui font-mono text-sm`} translate="no">
        {id}
      </Link>
      {title ? <span className="line-clamp-2 text-sm text-muted">{title}</span> : null}
    </div>
  );
}
