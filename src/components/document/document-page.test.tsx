import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CORRECTED_SHA, DOCUMENT, GAPPY_SHA } from "@/test/samples";

import { DocumentPage } from "./document-page";

vi.mock("@/app/(console)/documents/[id]/actions", () => ({
  approve: vi.fn(),
  assignId: vi.fn(),
  correctField: vi.fn(),
  correctText: vi.fn(),
  linkCitation: vi.fn(),
  resolveConflict: vi.fn(),
  restore: vi.fn(),
  suppress: vi.fn(),
  withdrawApproval: vi.fn(),
  withdrawCorrection: vi.fn(),
  withdrawTextCorrection: vi.fn(),
}));
vi.mock("@/app/(console)/actions", () => ({ decideReview: vi.fn(), signOut: vi.fn() }));

function region(name: string) {
  return within(screen.getByRole("region", { name }));
}

describe("a document's page", () => {
  it("says it is held, why, which version the assistant sees, and that an old correction no longer applies", () => {
    render(<DocumentPage view={DOCUMENT} />);

    const banner = within(screen.getByRole("status", { name: "Publishing" }));
    expect(banner.getByText(/Held back from publishing/)).toBeTruthy();
    expect(banner.getByText(/The assistant sees the version published on 19 Oct 2026/)).toBeTruthy();
    expect(banner.getByText("Structure: Pasal 3 missing")).toBeTruthy();
    expect(banner.getByRole("link", { name: "Compare it" }).getAttribute("href")).toContain(`/texts/${"d".repeat(64)}/correction`);
  });

  it("shows each field as published, as each source says it, and its correction", () => {
    render(<DocumentPage view={DOCUMENT} />);

    const fields = region("Fields");
    const effective = fields.getByRole("row", { name: /Effective/ });
    expect(within(effective).getAllByText("Not set")).toHaveLength(2);
    expect(fields.getByText(/By ani, 19 Oct 2026: Judul resmi/)).toBeTruthy();
    expect(fields.getByRole("button", { name: "Save Correction" })).toBeTruthy();
  });

  it("offers each main text's actions: approve as is, edit, and the changes of a correction", () => {
    render(<DocumentPage view={DOCUMENT} />);

    const content = region("Files & Texts");
    expect(content.getAllByRole("link", { name: "Edit Text" })[0].getAttribute("href")).toContain(`/texts/${GAPPY_SHA}/edit`);
    expect(content.getByRole("button", { name: "Approve as Is" })).toBeTruthy();
    expect(content.getByText(/Approved as is/)).toBeTruthy();
    expect(content.getByRole("button", { name: "Withdraw Approval" })).toBeTruthy();
    expect(content.getByRole("link", { name: "See the changes" }).getAttribute("href")).toContain(
      `/texts/${CORRECTED_SHA}/correction`,
    );
    expect(content.getByRole("link", { name: /Open File/ }).getAttribute("target")).toBe("_blank");
  });

  it("offers to link each open citation, and to decide each conflict", () => {
    render(<DocumentPage view={DOCUMENT} />);

    expect(region("Open Citations").getByText("“Keputusan Presiden Nomor 84/P”")).toBeTruthy();
    expect(region("Open Citations").getByRole("button", { name: "Link Citation" })).toBeTruthy();
    expect(region("Conflicts").getByRole("button", { name: "Keep Correction" })).toBeTruthy();
    expect(region("Conflicts").getByRole("button", { name: "Accept Source Value" })).toBeTruthy();
  });

  it("asks for an explicit confirmation before suppressing", () => {
    render(<DocumentPage view={DOCUMENT} />);

    const manage = region("Manage");
    expect(manage.getByLabelText(/Yes, stop the assistant citing this document/)).toHaveProperty("required", true);
    expect(manage.getByRole("button", { name: "Assign ID" })).toBeTruthy();
  });

  it("shows the provision tree, and the links and status history", () => {
    render(<DocumentPage view={DOCUMENT} />);

    expect(region("Structure").getByText("Changed 27 Feb 2022")).toBeTruthy();
    expect(region("Links").getByRole("link", { name: "id:uu:2011:21" })).toBeTruthy();
    expect(region("Status History").getByText("in_force")).toBeTruthy();
  });
});
