# Giverank

SpeedHacks SF, Oct 11 2026. Read [PLAN.md](PLAN.md) and [CLAUDE.md](CLAUDE.md) first.

## Run locally
```bash
npm install
cp .env.example .env.local   # ask T1 for values
npm run dev                  # http://localhost:3000, health: /api/health
```

## What T1 already provides
| Thing | Where | Use |
|---|---|---|
| Schema (frozen) | `supabase/schema.sql` | PLAN §3 + `public_people` view, RLS, Realtime |
| Server DB client (service role) | `lib/supabase/server.ts` → `db()` | route handlers / server components only |
| Browser DB client (anon, read-only) | `lib/supabase/browser.ts` → `browserDb()` | dashboard Realtime; reads `public_givers`, `public_people`, `matches`, `intros`, `encounters`, `ledger_entries` (positive deltas only) |
| Identity cookie | `lib/session.ts` → `getPersonId()`, `setPersonId()`, `requirePersonId()` | who is calling |
| Row types | `lib/types.ts` | |
| Keewano emit | `lib/keewano.ts` → `emit(personId, EV.x, value)` | stub; T4 fills in the transport |
| Check-in | `POST /api/checkin` | PLAN §4 (+ optional `role`) |
| Health | `GET /api/health` | DB + which env vars are set |
| Seed | `npm run seed` | 25 fictional people, idempotent |

## Rules
- The browser can't read `people` at all (phones). Use `public_people` / `public_givers`, or a server component with `db()`.
- `cacheComponents` is off on purpose: read cookies anywhere on the server without Suspense.
- Small PRs into `main`; T1 merges. Run `npm run typecheck && npm run lint && npm run build` before opening one.
