"use client";

import { useEffect } from "react";

const READING_LINE = "-96px 0px -70% 0px"; // a band below the sticky header: the part being read crosses it
const SETTLING_FRAMES = 4;

// Where the reader is, for the outline: the entry of the part being read (the lowest crossing a band below the
// header) is marked (aria-current="location"), the nearest one up when that part has none (an article's paragraph). A link to a part of the text goes there once
// the text has streamed in. It changes attributes only, so the
// server-rendered text is never rendered again, and renders nothing itself.
export function OutlineSpy() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("article[data-reading] section[id]"));
    const showing = new Set<string>();
    let marked = "";

    function mark() {
      const read = sections.findLast((section) => showing.has(section.id))?.id; // the lowest in the band
      const current = read ? outlined(read) : null;
      if (!current || current === marked) {
        return;
      }
      for (const link of document.querySelectorAll(`nav[data-outline] a[aria-current="location"]`)) {
        link.removeAttribute("aria-current");
      }
      for (const link of entries(current)) {
        link.setAttribute("aria-current", "location");
      }
      marked = current;
    }

    function go() {
      const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
      if (!target) {
        return;
      }
      // The parts above it are sized as they render (content-visibility), so it moves as they do: go again until
      // they have settled.
      const settle = (frames: number) => {
        target.scrollIntoView({ behavior: "instant" });
        if (frames > 0) {
          requestAnimationFrame(() => settle(frames - 1));
        }
      };
      settle(SETTLING_FRAMES);
    }

    go();
    window.addEventListener("hashchange", go);
    if (!("IntersectionObserver" in window)) {
      return () => window.removeEventListener("hashchange", go);
    }
    const observer = new IntersectionObserver(
      (changes) => {
        for (const entry of changes) {
          if (entry.isIntersecting) {
            showing.add(entry.target.id);
          } else {
            showing.delete(entry.target.id);
          }
        }
        mark();
      },
      { rootMargin: READING_LINE },
    );
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", go);
    };
  }, []);

  return null;
}

function entries(address: string): NodeListOf<HTMLAnchorElement> {
  return document.querySelectorAll<HTMLAnchorElement>(`nav[data-outline] a[href="#${address}"]`);
}

// The address itself, or the nearest one up that the outline lists: "pasal-9/ayat-2" is read under "pasal-9".
function outlined(address: string): string | null {
  for (let at = address; at; at = at.slice(0, Math.max(at.lastIndexOf("/"), 0))) {
    if (entries(at).length) {
      return at;
    }
  }
  return null;
}
