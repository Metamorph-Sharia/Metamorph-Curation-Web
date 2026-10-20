import Link from "next/link";

import { button } from "@/components/styles";

export default function NotFound() {
  return (
    <div className="grid max-w-[65ch] gap-4 py-8">
      <p className="font-heading text-7xl leading-none text-line-strong" aria-hidden>
        404
      </p>
      <h1 className="font-heading text-4xl leading-tight tracking-tight">Not Available</h1>
      <p className="text-muted text-pretty">There’s no such document, text or queue. It may have been renamed by an assigned ID.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/documents" className={button("primary")}>
          Search the documents
        </Link>
        <Link href="/" className={button("quiet")}>
          Overview
        </Link>
      </div>
    </div>
  );
}
