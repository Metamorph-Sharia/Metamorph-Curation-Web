import type { ReactNode } from "react";

export function PageHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="grid gap-2">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{title}</h1>
      {children ? <p className="max-w-[65ch] text-muted">{children}</p> : null}
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div aria-hidden className="grid animate-pulse gap-4 motion-reduce:animate-none">
      <div className="h-10 rounded-ui bg-sunken" />
      <div className="h-64 rounded-ui bg-sunken" />
    </div>
  );
}
