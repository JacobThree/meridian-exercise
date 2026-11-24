# TICKET-2207 — "I stopped getting the morning reminder"

**Reported by:** study coordinator, on behalf of participant **P-0042** (Pacific time)
**Date:** Monday 2026-11-23

> P-0042 says she hasn't had a 10 AM reminder in days. She missed a few check-ins, then came back
> and has been wearing her device the whole time. On the dashboard she shows as "inactive".
> She is frustrated and thinks the app is broken. Two other participants said something similar
> last week.

## What you have

- `ops/api.log` — an excerpt of the production API log, 2026-11-18 through 2026-11-23
- `ops/reminder-job.ts` — the code behind the morning reminder
- `data/fixture.db` — a SQLite snapshot (see `docs/schema.md`). Treat **2026-11-23 10:00 UTC** as "now".
- `api/` — the API source

## Ask

1. Why isn't P-0042 getting reminders? Show how you know.
2. Is she actually inactive? (Don't assume the dashboard is right.)
3. What would you tell the coordinator today, and what would you ask the vendor to change?
4. Anything else you noticed while reading the log that you would act on?
