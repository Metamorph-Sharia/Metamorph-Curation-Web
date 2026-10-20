import Link from "next/link";

const SEPARATOR = (
  <li role="presentation" aria-hidden className="text-line-strong">
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 4 4 4-4 4" />
    </svg>
  </li>
);

// Where a page sits: each level above it a link, the page itself last and marked current.
export function Breadcrumbs({ trail, current }: { trail: [href: string, label: string][]; current: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted sm:gap-2">
        {trail.map(([href, label]) => (
          <BreadcrumbLevel key={href} href={href} label={label} />
        ))}
        <li className="min-w-0">
          <span aria-current="page" className="break-words text-text">
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}

function BreadcrumbLevel({ href, label }: { href: string; label: string }) {
  return (
    <>
      <li className="min-w-0">
        <Link href={href} className="break-words rounded-ui transition-colors hover:text-text">
          {label}
        </Link>
      </li>
      {SEPARATOR}
    </>
  );
}
