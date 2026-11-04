// The gateway's tools, as the retrieval page offers them: each takes one written argument, and some take nothing
// at all. The list is what the catalog declares (POST /tools), kept here so a page can name a tool before it calls
// one; a tool this list forgets is reachable by its name in the address bar.

export type Argument = { name: string; label: string; placeholder: string };

export type Tool = {
  name: string;
  label: string;
  about: string;
  argument?: Argument;
};

export const TOOLS: readonly Tool[] = [
  {
    name: "search_documents",
    label: "Search by meaning",
    about: "The passages that speak to a question, best first, over both the regulation and the market providers.",
    argument: { name: "query", label: "Question", placeholder: "batas maksimum pembiayaan syariah" },
  },
  {
    name: "find_provision",
    label: "Find a provision",
    about: "The exact provision a citation names: no similarity, no ranking.",
    argument: { name: "citation", label: "Citation", placeholder: "POJK 40/2024 Pasal 137 ayat (3)" },
  },
  {
    name: "read",
    label: "Read a hit",
    about: "One hit's text in full, or a window around a position in it.",
    argument: { name: "ref", label: "Ref", placeholder: "doc:ojk:pojk:2024:40#pasal-137" },
  },
  {
    name: "follow_links",
    label: "Follow links",
    about: "What a provision cites, or what cites it.",
    argument: { name: "ref", label: "Ref", placeholder: "doc:ojk:pojk:2024:40#pasal-137" },
  },
  {
    name: "find_companies",
    label: "Find companies",
    about: "Who OJK licenses or registers, today or on a past date.",
    argument: { name: "query", label: "Name", placeholder: "dana syariah" },
  },
  {
    name: "find_series",
    label: "Find a series",
    about: "A statistics series by what it measures.",
    argument: { name: "query", label: "Series", placeholder: "pembiayaan bank syariah" },
  },
  {
    name: "industry_context",
    label: "Industry context",
    about: "The regulations, reports and releases that shape one industry.",
    argument: { name: "query", label: "Industry", placeholder: "pembiayaan syariah" },
  },
  {
    name: "get_observations",
    label: "Observations",
    about: "A series' figures, with the dates they were published.",
    argument: { name: "series", label: "Series ref", placeholder: "series:ojk:lpksi:total-asset" },
  },
];

export const DEFAULT_TOOL = TOOLS[0].name;

export function toolNamed(name: string | undefined): Tool | undefined {
  return TOOLS.find((tool) => tool.name === name);
}
