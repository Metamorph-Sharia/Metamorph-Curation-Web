import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ManualFields } from "./manual-fields";

describe("the add-document form's fields", () => {
  it("asks for what the platform needs, each field labelled", () => {
    render(<ManualFields errors={{}} />);

    for (const label of ["Canonical ID", "Citation", "Title", "Kind", "Status", "Language", "Source URL", "Reason", "File"]) {
      expect(screen.getByLabelText(label)).toBeTruthy();
    }
    expect(screen.getByLabelText("Kind").querySelectorAll("option")).toHaveLength(7);
    expect((screen.getByLabelText("Text") as HTMLTextAreaElement).required).toBe(false);
  });

  it("says what is wrong beside each field the API refused", () => {
    render(<ManualFields errors={{ source_url: "enter the address you got the document from", file: "choose the document's file" }} />);

    const url = screen.getByLabelText("Source URL");
    expect(url.getAttribute("aria-invalid")).toBe("true");
    expect(document.getElementById(url.getAttribute("aria-describedby")!)?.textContent).toBe(
      "Enter the address you got the document from.",
    );
    expect(screen.getByText("Choose the document's file.")).toBeTruthy();
  });
});
