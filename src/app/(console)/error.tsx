"use client";

import { button, notice } from "@/components/styles";

// A page whose data couldn't be read: say so plainly, and let the curator try again.
export default function ConsoleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className={`${notice("critical")} grid max-w-[65ch] gap-4 p-6`}>
      <h1 className="font-heading text-3xl leading-tight text-balance">This Page Couldn’t Load</h1>
      <p className="text-pretty">
        The curation API isn’t answering, or answered with an error. Try again in a moment; if it keeps happening,
        tell an engineer.
      </p>
      <div>
        <button type="button" onClick={reset} className={button("primary")}>
          Try Again
        </button>
      </div>
    </div>
  );
}
