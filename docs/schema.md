# Schema notes (fixture.db)

All timestamps are UTC ISO-8601 strings. Dates are `YYYY-MM-DD`. "Today" for this exercise is
**2026-11-23**. The same data is in `data/*.csv` if you prefer a spreadsheet or another tool.

| Table | Columns |
|---|---|
| `users` | `id`, `public_id` (e.g. P-0042), `cohort`, `timezone`, `push_token`, `last_login_at`, `last_check_in_at`, `device_id` |
| `devices` | `id`, `vendor` (oura / garmin / apple_health / whoop), `last_synced_at`, `last_data_at` |
| `daily_metrics` | `id`, `user_id`, `date`, `steps`, `hrv_ms`, `sleep_min`, `source` |
| `check_ins` | `id`, `user_id`, `check_in_date`, `mind_score` |

`devices.last_synced_at` is when our servers last contacted the vendor's API for that device.
`devices.last_data_at` is the date of the newest `daily_metrics` row for it that has any value.
Everything else you should work out yourself, from the data and the code in `api/`.
