import { describe, expect, it } from "vitest";

import { contentHref, documentHref, textHref } from "./routes";

describe("where things live in the console", () => {
  it("encodes a document's ID once, so its colons and any odd character survive the path", () => {
    expect(documentHref("ojk:pojk:2019:10")).toBe("/documents/ojk%3Apojk%3A2019%3A10");
    expect(documentHref("ojk:pojk:2019:10", "content")).toBe("/documents/ojk%3Apojk%3A2019%3A10#content");
  });

  it("addresses a document's texts and files by their sha256", () => {
    const sha = "a".repeat(64);
    expect(textHref("dsnmui:fatwa:117", sha, "edit")).toBe(`/documents/dsnmui%3Afatwa%3A117/texts/${sha}/edit`);
    expect(textHref("dsnmui:fatwa:117", sha, "correction")).toBe(`/documents/dsnmui%3Afatwa%3A117/texts/${sha}/correction`);
    expect(contentHref("dsnmui:fatwa:117", sha)).toBe(`/documents/dsnmui%3Afatwa%3A117/content/${sha}`);
  });
});
