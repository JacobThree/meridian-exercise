/** Add (or subtract) whole days from a YYYY-MM-DD string. Pure calendar math, no timezone. */
export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** The calendar date (YYYY-MM-DD) right now in the given IANA timezone. */
export function localDateIn(timeZone: string, now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone }).format(now);
}
