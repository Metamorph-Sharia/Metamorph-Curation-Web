// The market pages' presentation rules: what curators call a company's standing or a series' frequency, how a
// period and a figure are written, and how a form's lists of IDs are read. Plain functions, tested on their own.

const STATUSES: Record<string, string> = { licensed: "Licensed", registered: "Registered", left: "Left the List" };
const BUSINESS_TYPES: Record<string, string> = { sharia: "Sharia", conventional: "Conventional" };
const FREQUENCIES: Record<string, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  semiannual: "Half-yearly",
  annual: "Yearly",
};
const MONTH = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
// A figure as the source gave it: digits grouped, and every decimal it has (a source's value is never rounded here).
const FIGURE = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 20 });
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SEPARATOR = "\u001f"; // between an industry's source and name in one form value: neither ever holds it

export const COMPANY_STATUSES = Object.keys(STATUSES);
export const BUSINESS_TYPE_CHOICES = Object.keys(BUSINESS_TYPES);

export function companyStatusLabel(status: string): string {
  return STATUSES[status] ?? status;
}

export function businessTypeLabel(type: string | null): string {
  return type ? (BUSINESS_TYPES[type] ?? type) : "Unknown";
}

export function frequencyLabel(frequency: string): string {
  return FREQUENCIES[frequency] ?? frequency;
}

// The API publishes a period as its first day; the page writes it as its frequency names it.
export function formatPeriod(firstDay: string, frequency: string): string {
  const [year, month] = firstDay.split("-").map(Number);
  if (frequency === "annual") return String(year);
  if (frequency === "quarterly") return `${year} Q${Math.ceil(month / 3)}`;
  if (frequency === "semiannual") return `${year} H${month > 6 ? 2 : 1}`;
  return MONTH.format(new Date(`${firstDay}T00:00:00Z`));
}

export function formatFigure(value: number): string {
  return FIGURE.format(value);
}

// IDs a curator typed: one per line, or separated by commas; each once, in the order typed.
export function idList(typed: string): string[] {
  return [...new Set(typed.split(/[\n,]/).map((id) => id.trim()).filter(Boolean))];
}

export function industryKey(source: string, name: string): string {
  return `${source}${SEPARATOR}${name}`;
}

export function parseIndustryKey(key: string): { source: string; name: string } | null {
  const [source, name, ...rest] = key.split(SEPARATOR);
  return source && name && rest.length === 0 ? { source, name } : null;
}

// The dates bounding a list of releases, as typed in the page's filter: a date or nothing.
export function releaseRange(from: string | undefined, to: string | undefined): { from?: string; to?: string } {
  return { from: from && ISO_DATE.test(from) ? from : undefined, to: to && ISO_DATE.test(to) ? to : undefined };
}
