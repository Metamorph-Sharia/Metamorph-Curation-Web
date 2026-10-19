"use client";

// A page whose data couldn't be read: say so plainly, and let the curator try again.
export default function ConsoleError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div role="alert" className="grid max-w-[65ch] gap-4 rounded-ui border border-critical bg-critical-soft p-5">
      <h1 className="text-lg font-semibold text-balance">This Page Couldn’t Load</h1>
      <p className="text-sm">
        The curation API isn’t answering, or answered with an error. Try again in a moment; if it keeps happening,
        tell an engineer.
      </p>
      <div>
        <button
          type="button"
          onClick={reset}
          className="rounded-ui bg-accent px-4 py-2 font-medium text-on-accent transition-colors hover:bg-accent-hover active:translate-y-px"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
