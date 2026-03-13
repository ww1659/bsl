# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run local       # Run dev server against local env vars (.env.local)
npm run dev         # Run dev server against staging env vars (.env.staging)
npm run build       # TypeScript check + Vite build (staging mode)
npm run lint        # ESLint
npm run preview     # Preview production build (staging mode)
```

There are no tests in this project.

## Environment Variables

Two env files exist: `.env.local` and `.env.staging`. Both require:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The `npm run dev` and `npm run build` scripts use `--mode staging`, which loads `.env.staging`.

## Architecture

This is a React 18 + TypeScript + Vite frontend for a linen delivery business (Black Swan Linen). It manages customers, orders, inventory, and picking lists.

**Backend:** Supabase (Postgres + Auth). The client is initialized in `src/services/supabase.ts` and typed via `database.types.ts` at the root. All data access goes through Supabase directly from the frontend — there is no API layer.

**State management uses two layers:**

1. **TanStack Query** — all server data (fetch/create/update/delete). Hooks live in `src/hooks/` organized by operation type: `fetch/`, `create/`, `update/`, `delete/`.
2. **Redux Toolkit + redux-persist** — client-only state persisted to localStorage: selected `group`, `customer`, `auth` (Supabase session). Store is in `src/redux/store.ts`; slices in `src/redux/features/`.

**Auth flow:** `App.tsx` subscribes to Supabase's `onAuthStateChange` and syncs the session to the Redux `auth` slice. `ProtectedRoute` and `PublicRoute` components in `src/components/` gate access based on session presence.

**Routing:** React Router v6. Two route modules:

- `src/routes/CustomerRoutes.tsx` — nested under `/customers/*`
- `src/routes/OrderRoutes.tsx` — nested under `/orders/*`

**Path alias:** `@` maps to `src/` (configured in `vite.config.ts`).

**UI components:** shadcn/ui pattern — Radix UI primitives wrapped in `src/components/ui/`. Business components are in `src/components/` subdirectories (`customers/`, `orders/`, `inventory/`, `picking-list/`, `layout/`).

**Key data model (Supabase tables):** `customers`, `groups`, `orders`, `order_items`, `items`. Orders belong to customers and optionally to groups. `order_items` links orders to items with quantity and `picked` status.

**Order status values:** `"pending" | "paid" | "sent" | "overdue"`

**Dark mode:** Managed by `ThemeProvider` component wrapping the whole app.
