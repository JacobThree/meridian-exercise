# Meridian Study — Technical Operations Exercise

Thanks for making time. This is a live working session, not homework: you will do realistic pieces
of the job together with us, on a screen share, in about **75 minutes**.

Everything here is **fictional**: the company, people, data and code were made up for this exercise
and contain no real information. Even so, please work the way you would with real production
material: the habits you show are part of what we're looking at.

## Before the call (about 10 minutes, once)

You need: **git**, a text editor, and a way to read a SQLite file (the `sqlite3` command, DB Browser
for SQLite, or just open the CSVs in `data/` in a spreadsheet). Nothing else. You do **not** need to
install Node or any dependencies.

```bash
git clone <URL we sent you> meridian-exercise
cd meridian-exercise
git branch -a                      # you should see main and vendor/streak-counter
sqlite3 data/fixture.db ".tables"  # or open the CSVs; you should see 4 tables
```

If any of that doesn't work, tell us before the call. Setup problems are not part of the evaluation.

**Please don't open `tasks/` before the call.** We'll go through the tasks together, and we want
everyone to start from the same place.

## During the call

- You drive and share your screen. We'll mostly listen, and answer questions like a colleague would.
- **Use whatever you'd use on the job**, including search and AI assistants. We're evaluating
  judgment: can you tell a right answer from a plausible one, and explain it. You may be asked to
  explain anything you write down.
- **Ask questions.** Clarifying scope is part of the job and we score it as a positive.
- **You won't finish everything.** That is by design. We would rather see two tasks done well and
  explained clearly than five skimmed.
- Write short answers in `answers/taskN.md` as you go (bullets are fine). Don't polish.

## What we're not asking

- No unpaid production work: nothing here is real INVI code, and we will not use your answers for
  anything except evaluating this interview.
- No trick questions or trivia. If we ask for a command or setting, looking it up is fine.

## Layout

```
api/        the (fictional) NestJS API
cards/      work items from the vendor
ops/        a production ticket, log excerpt, and job code
infra/      infrastructure and deploy config
comms/      a morning inbox
data/       fixture.db + CSVs
docs/       schema notes
answers/    where you write
tasks/      (please wait for the call)
```
