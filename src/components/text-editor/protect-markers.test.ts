import { EditorState } from "@codemirror/state";
import { describe, expect, it } from "vitest";

import { protectPageMarkers } from "./protect-markers";

const TEXT = "<!-- page 1 -->\nPasa1 1\n<!-- page 2 -->\nPasal 3\n";

function edited(changes: { from: number; to?: number; insert?: string }): string {
  const state = EditorState.create({ doc: TEXT, extensions: [protectPageMarkers()] });
  return state.update({ changes }).state.doc.toString();
}

describe("a paged text's page markers, in the editor", () => {
  it("lets the wording between them change", () => {
    expect(edited({ from: 16, to: 23, insert: "Pasal 1" })).toBe(TEXT.replace("Pasa1 1", "Pasal 1"));
    expect(edited({ from: 40, insert: "Pasal 2\nDua.\n" })).toBe(TEXT.replace("Pasal 3", "Pasal 2\nDua.\nPasal 3"));
  });

  it("keeps a marker as it is: deleted, typed into or replaced, it stays", () => {
    expect(edited({ from: 24, to: 39 })).toBe(TEXT);
    expect(edited({ from: 30, insert: "X" })).toBe(TEXT);
    expect(edited({ from: 0, to: TEXT.length, insert: "everything else" })).toContain("<!-- page 2 -->");
  });

  it("still knows where the markers are after the text around them changed", () => {
    const state = EditorState.create({ doc: TEXT, extensions: [protectPageMarkers()] });
    const longer = state.update({ changes: { from: 16, insert: "Pembukaan.\n" } }).state;

    const attempt = longer.update({ changes: { from: 35, to: 50 } }).state; // where "<!-- page 2 -->" moved to
    expect(attempt.doc.toString()).toContain("<!-- page 2 -->");
  });
});
