import { describe, expect, it } from "vitest";

import { markSaved, markUnsaved } from "./unsaved";

function leave(): boolean {
  const event = new Event("beforeunload", { cancelable: true });
  window.dispatchEvent(event);
  return event.defaultPrevented; // true: the browser asks "leave this page?"
}

describe("leaving with unsaved entries", () => {
  it("asks first while any form has entries not yet sent, and not once they are", () => {
    const correction = Symbol("correction");
    const reason = Symbol("reason");
    expect(leave()).toBe(false);

    markUnsaved(correction);
    markUnsaved(reason);
    expect(leave()).toBe(true);

    markSaved(correction);
    expect(leave()).toBe(true);
    markSaved(reason);
    expect(leave()).toBe(false);
  });
});
