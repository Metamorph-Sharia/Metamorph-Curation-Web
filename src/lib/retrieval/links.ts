import {
  companyHref,
  datasetHref,
  documentHref,
  readerHref,
  releaseHref,
  reportHref,
  seriesHref,
} from "@/lib/routes";

// A retrieval ref — `{namespace}:{id}[#{address}]` — as the page in this console that shows it, when there is one.
// `doc:ojk:pojk:2024:40#pasal-137` opens the reader at that provision; `company:ojk:lpbbti:kep-10-d.05-2021`
// opens the company. Namespaces with no page of their own (a register, a sector, an industry) get none, rather
// than a link that leads nowhere.

export function consoleHref(ref: string): { href: string; label: string } | null {
  const [head, address] = splitOnce(ref, "#");
  const [namespace, ...rest] = head.split(":");
  const id = rest.join(":");
  if (!id) {
    return null;
  }
  switch (namespace) {
    case "doc":
      return address
        ? { href: readerHref(id, { at: address }), label: "Open the provision" }
        : { href: documentHref(id), label: "Open the document" };
    case "company":
      return { href: companyHref(id), label: "Open the company" };
    case "dataset":
      return { href: datasetHref(id), label: "Open the dataset" };
    case "series":
      return { href: seriesHref(id), label: "Open the series" };
    case "report":
      return { href: reportHref(id), label: "Open the report" };
    case "release":
      return { href: releaseHref(id), label: "Open the press release" };
    default:
      return null;
  }
}

function splitOnce(value: string, separator: string): [string, string | undefined] {
  const at = value.indexOf(separator);
  return at < 0 ? [value, undefined] : [value.slice(0, at), value.slice(at + 1)];
}
