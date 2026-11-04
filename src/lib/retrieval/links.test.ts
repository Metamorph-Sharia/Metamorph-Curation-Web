import { describe, expect, it } from "vitest";

import { consoleHref } from "./links";

describe("where a retrieval ref opens in the console", () => {
  it("opens a provision in the reader, at that article", () => {
    expect(consoleHref("doc:ojk:pojk:2024:40#pasal-137")).toEqual({
      href: "/documents/ojk%3Apojk%3A2024%3A40/read?at=pasal-137#pasal-137",
      label: "Open the provision",
    });
  });

  it("keeps an ayat with its article", () => {
    expect(consoleHref("doc:id:uu:2008:21#pasal-37/ayat-2")?.href).toBe(
      "/documents/id%3Auu%3A2008%3A21/read?at=pasal-37%2Fayat-2#pasal-37/ayat-2",
    );
  });

  it("opens a document when the ref names none of its provisions", () => {
    expect(consoleHref("doc:ojk:pojk:2024:40")).toEqual({
      href: "/documents/ojk%3Apojk%3A2024%3A40",
      label: "Open the document",
    });
  });

  it("opens the market's records on their own pages", () => {
    expect(consoleHref("company:ojk:lpbbti:kep-10-d.05-2021")?.href).toBe(
      "/market/companies/ojk%3Alpbbti%3Akep-10-d.05-2021",
    );
    expect(consoleHref("series:ojk:portal:bu_syariah_totalaset:total-aset:kategori-bank=bus")?.href).toBe(
      "/market/series/ojk%3Aportal%3Abu_syariah_totalaset%3Atotal-aset%3Akategori-bank%3Dbus",
    );
    expect(consoleHref("report:ojk:lpksi:2018#p-58")?.href).toBe("/market/reports/ojk%3Alpksi%3A2018");
  });
});

describe("a ref with no page of its own", () => {
  it("gets no link, rather than one that leads nowhere", () => {
    expect(consoleHref("register:ojk:lpbbti")).toBeNull();
    expect(consoleHref("industry:ojk:portal:bank-perekonomian-rakyat-bpr-syariah")).toBeNull();
    expect(consoleHref("doc:")).toBeNull();
  });
});
