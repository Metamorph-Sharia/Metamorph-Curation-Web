"use client";

import { type MouseEvent, type ReactNode, useEffect, useState } from "react";

const SHOWN_MS = 2000;

// Copying a provision's link or its citation. A text has hundreds of Copy buttons: they are plain server-rendered
// buttons (data-copy holds what to copy, data-said what to say), and this one handler serves them all.
export function CopyActions({ children }: { children: ReactNode }) {
  const [said, setSaid] = useState("");

  useEffect(() => {
    if (!said) {
      return;
    }
    const timer = setTimeout(() => setSaid(""), SHOWN_MS);
    return () => clearTimeout(timer);
  }, [said]);

  async function copy(event: MouseEvent<HTMLDivElement>) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-copy]");
    if (!button) {
      return;
    }
    const value = button.dataset.copy!;
    const text = value.startsWith("/") ? `${window.location.origin}${value}` : value; // a link: made absolute
    try {
      await navigator.clipboard.writeText(text);
      setSaid(button.dataset.said ?? "Copied.");
    } catch {
      setSaid("Couldn’t copy: the browser refused. Select the text and copy it instead.");
    }
  }

  return (
    // The buttons inside handle the keyboard; this only catches their clicks as they bubble.
    <div onClick={copy} className="min-w-0">
      {children}
      <p
        role="status"
        aria-live="polite"
        className={`fixed right-4 bottom-4 z-20 max-w-sm rounded-ui border border-line bg-surface px-4 py-2 text-sm shadow-lg shadow-text/5 transition-opacity motion-reduce:transition-none ${said ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {said}
      </p>
    </div>
  );
}
