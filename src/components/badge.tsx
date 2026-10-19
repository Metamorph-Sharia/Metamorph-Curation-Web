import type { ReactNode } from "react";

import type { Tone } from "@/lib/labels";

const TONES: Record<Tone, string> = {
  ok: "bg-ok-soft text-ok",
  warning: "bg-warning-soft text-warning",
  critical: "bg-critical-soft text-critical",
  neutral: "bg-sunken text-muted",
};

export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-ui px-2 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      {children}
    </span>
  );
}
