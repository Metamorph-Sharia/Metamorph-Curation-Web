import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { CorrectionDiff } from "@/lib/api/types";
import { DOC, GAPPY_SHA, NOW } from "@/test/samples";

import { CorrectionView } from "./correction-view";

const DIFF: CorrectionDiff = {
  correction: {
    document_id: DOC,
    citation: "POJK 10/POJK.05/2019",
    sha256: GAPPY_SHA,
    source_storage_key: "blobs/bb/b",
    corrected_storage_key: "blobs/cc/c",
    note: { author: "ani", created_at: NOW, reason: "PDF hal. 2" },
    active: true,
    current: true,
  },
  source: "Pasal 1\nPasal 3\n",
  corrected: "Pasal 1\nPasal 2\nPasal 3\n",
  diff: ["--- source", "+++ correction", "@@ -1,2 +1,3 @@", " Pasal 1", "+Pasal 2", " Pasal 3"],
};

describe("a correction's changes", () => {
  it("shows who corrected the text, why, and each line added or removed", () => {
    render(<CorrectionView diff={DIFF} />);

    expect(screen.getByText(/By ani on 19 Oct 2026: “PDF hal. 2”/)).toBeTruthy();
    const added = within(screen.getByLabelText("Changes")).getByText("+Pasal 2");
    expect(added.className).toContain("bg-ok-soft");
  });

  it("says when the correction no longer applies, or was withdrawn", () => {
    const { rerender } = render(<CorrectionView diff={{ ...DIFF, correction: { ...DIFF.correction, current: false } }} />);
    expect(screen.getByRole("status").textContent).toContain("no longer applies");

    rerender(<CorrectionView diff={{ ...DIFF, correction: { ...DIFF.correction, active: false } }} />);
    expect(screen.getByRole("status").textContent).toContain("withdrawn");
  });
});
