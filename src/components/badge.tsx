import type { ReactNode } from "react";

import type { Tone } from "@/lib/labels";

const TONES: Record<Tone, string> = {
  ok: "border-ok/35 bg-ok-soft text-ok",
  warning: "border-warning/35 bg-warning-soft text-warning",
  critical: "border-critical/35 bg-critical-soft text-critical",
  neutral: "border-line bg-surface text-muted",
};

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}
