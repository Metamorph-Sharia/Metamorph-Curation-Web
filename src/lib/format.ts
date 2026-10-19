// Dates and counts, written so they can't be misread: a day spelled out, a moment in UTC (the time the team
// shares), thousands grouped. The same conventions as the platform's first curation app.

const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC" });
const COUNT = new Intl.NumberFormat("en-GB");

export function formatDay(value: string): string {
  return DAY.format(new Date(value.length === 10 ? `${value}T00:00:00Z` : value));
}

export function formatMoment(value: string): string {
  const date = new Date(value);
  return `${DAY.format(date)}, ${TIME.format(date)} UTC`;
}

export function formatCount(value: number): string {
  return COUNT.format(value);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/; // a source's date, as its document states it

// A field's value: an absent one says so, rather than leaving a blank cell; a date is spelled out.
export function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not set";
  }
  return typeof value === "string" && ISO_DATE.test(value) ? formatDay(value) : String(value);
}
