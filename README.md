# Black Swan Linen

Frontend for Black Swan Linen — a linen delivery business. Manages customers, orders, inventory, and picking lists.

**Stack:** React 18 · TypeScript · Vite · TanStack Query · Redux Toolkit · shadcn/ui (Radix) · Supabase (Postgres + Auth)

There is no separate API layer — the frontend talks to Supabase directly.

## Prerequisites

- **Node.js 18+** (20 LTS recommended — required by Vite 5)
- **npm**
- **Docker Desktop** — only if you want to run Supabase locally (see [Option B](#option-b--run-supabase-locally))
- A **Supabase** account with access to the `black-swan-linen-fe` project (ask the team for an invite)

The Supabase CLI ships as a dev dependency, so you don't need to install it globally — run it via `npx supabase ...`.

## Quick start

```bash
git clone <repo-url>
cd bsl
npm install
# create .env.local (see Environment variables below)
npm run local
```

The dev server prints a local URL (default `http://localhost:5173`).

## Environment variables

The app reads exactly two variables (`src/services/supabase.ts`, `src/pages/SignUpPage.tsx`):

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL — `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase **anon / public** key (never the `service_role` key) |

Find both in the Supabase dashboard: **Project → Settings → API**.

> ⚠️ Anything prefixed `VITE_` is bundled into the public client-side JS. Only ever use the **anon/public** key here.

Two gitignored env files drive the npm scripts. Create them yourself (they are not committed):

| File | Used by | Vite mode | Points at |
|------|---------|-----------|-----------|
| `.env.local` | `npm run local` | development | Your local-dev DB (local Supabase, or hosted staging) |
| `.env.staging` | `npm run dev`, `npm run build`, `npm run preview` | staging | Hosted **staging** Supabase |

Example file contents:

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> Note: Vite loads `.env.local` in **every** mode and the mode-specific file wins on conflicts, so keep `.env.local` for local-only overrides and `.env.staging` for shared staging values.

## Running locally

### Option A — connect to hosted staging (simplest)

Put the staging project's URL + anon key in `.env.local`, then:

```bash
npm run local
```

You're now running the UI against the shared staging database. Good for frontend work that doesn't need schema changes.

### Option B — run Supabase locally

Run the whole backend (Postgres, Auth, Studio) on your machine via Docker:

```bash
npx supabase start          # boots local stack, applies migrations, prints local URL + anon key
```

Copy the printed **API URL** (`http://127.0.0.1:54321`) and **anon key** into `.env.local`, then:

```bash
npm run local
```

Useful local endpoints:

| Service | URL |
|---------|-----|
| API | http://127.0.0.1:54321 |
| Studio (DB UI) | http://127.0.0.1:54323 |
| Postgres | `postgresql://postgres:postgres@127.0.0.1:54322/postgres` |

Stop it with `npx supabase stop`.

## Scripts

```bash
npm run local             # Dev server against .env.local (development mode)
npm run dev               # Dev server against .env.staging (staging mode)
npm run build             # TypeScript check (tsc -b) + Vite build (staging mode)
npm run lint              # ESLint
npm run preview           # Preview the production build (staging mode)
npm run reset-staging-db  # supabase db reset --linked — DESTRUCTIVE, see warning below
```

> ⚠️ `reset-staging-db` **wipes and rebuilds the linked Supabase database** from migrations. Make sure you're linked to staging, not production, before running it.

## Database & migrations

SQL migrations live in `supabase/migrations/` and are applied to remote databases by GitHub Actions (see below). Common CLI tasks:

```bash
npx supabase migration new <name>     # scaffold a new migration
npx supabase db push                  # apply pending migrations to the linked project
npx supabase gen types typescript --local > types.gen.ts   # regenerate TS types
```

> CI fails a PR if `types.gen.ts` is out of date — regenerate and commit it after changing the schema.

## Branching & deployment

There are two independent pipelines: **Vercel** deploys the app, **GitHub Actions** pushes DB migrations.

**App (Vercel):** deploys are driven by Vercel's git integration. Env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are set per-environment in the Vercel dashboard, not in any committed file. Preview deployments point at the staging DB; Production points at the production DB.

**Database migrations (`.github/workflows/`):**

| Branch | Workflow | Effect |
|--------|----------|--------|
| `develop` | `staging.yml` | `supabase db push` → **staging** DB |
| `main` | `production.yml` | `supabase db push` → **production** DB |
| any PR | `ci.yml` | Verifies generated types are committed |

> The staging branch is **`develop`** — there is no branch named `staging`. Pushing to `main` runs migrations against **production**.

These workflows rely on GitHub repo secrets: `SUPABASE_ACCESS_TOKEN`, plus `STAGING_`/`PRODUCTION_` `PROJECT_ID` and `DB_PASSWORD`.

## Project structure

```
src/
  components/     # UI (ui/ = shadcn primitives) + feature dirs: customers/ orders/ inventory/ picking-list/ layout/
  hooks/          # TanStack Query hooks, grouped by op: fetch/ create/ update/ delete/
  redux/          # Redux Toolkit store + slices (features/) — client state persisted to localStorage
  routes/         # React Router v6 modules: CustomerRoutes, OrderRoutes
  pages/          # Top-level pages
  services/       # supabase.ts — Supabase client
supabase/
  migrations/     # SQL migrations
  config.toml     # local Supabase config
database.types.ts # generated Supabase types
```

- **Path alias:** `@` → `src/` (configured in `vite.config.ts`).
- **Server state** → TanStack Query. **Client state** (selected group/customer, auth session) → Redux + redux-persist.
- **Auth:** `App.tsx` subscribes to Supabase `onAuthStateChange` and syncs the session into Redux; `ProtectedRoute` / `PublicRoute` gate access.

## Testing

There are no automated tests in this project.
