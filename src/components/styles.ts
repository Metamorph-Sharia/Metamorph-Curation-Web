import type { Tone } from "@/lib/labels";

// The console's shared looks, as class lists: one place for each, so no page drifts from the rest.

// A white card on the page's paper: hairline border, the console's radius.
export const CARD = "rounded-ui border border-line bg-surface";

// A text input, select or textarea.
export const CONTROL =
  "w-full min-h-10 rounded-ui border border-line-strong bg-surface px-3 py-2 text-sm text-text placeholder:text-muted transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/25 aria-[invalid=true]:border-critical";

// A link inside text or beside a record.
export const LINK = "text-accent underline-offset-4 hover:underline";

export function button(tone: "primary" | "quiet" | "danger"): string {
  const base =
    "inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-ui px-4 py-2 text-sm font-medium transition-colors active:translate-y-px disabled:opacity-70";
  if (tone === "danger") {
    return `${base} bg-critical text-surface hover:bg-critical/90`;
  }
  if (tone === "quiet") {
    return `${base} border border-line-strong bg-surface text-text hover:border-accent/40 hover:bg-sunken`;
  }
  return `${base} bg-accent text-on-accent hover:bg-accent-hover`;
}

const NOTICE_TONES: Record<Tone, string> = {
  ok: "border-ok/30 bg-ok-soft",
  warning: "border-warning/30 bg-warning-soft",
  critical: "border-critical/30 bg-critical-soft",
  neutral: "border-line bg-sunken",
};

// A tinted band that tells the curator something about the page: what a change did, or what to watch for.
export function notice(tone: Tone): string {
  return `rounded-ui border px-4 py-3 text-sm ${NOTICE_TONES[tone]}`;
}
