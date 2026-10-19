// A page's query parameters, as single values: the console's filters live in the URL.
type Query = Record<string, string | string[] | undefined>;

export function param(query: Query, name: string): string | undefined {
  const value = query[name];
  return Array.isArray(value) ? value[0] : value;
}

export function pageNumber(query: Query): number {
  const page = Number(param(query, "page") ?? "1");
  return Number.isInteger(page) && page > 0 ? page : 1;
}
