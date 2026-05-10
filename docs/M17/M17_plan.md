# M17 Plan — Local PostgreSQL Fallback Setup (Deferred)

## MODULE SPECIFICATION
Add local PostgreSQL as failover database with health monitoring, automatic failover, and sync. See `docs/module_prds/M17.md`.

**STATUS: DEFERRED** — Build after M1-M16 are complete and tested with Supabase-only.

## AGENT ASSIGNMENT
- **Agent:** Antigravity
- **Reason:** Infrastructure-heavy — Prisma dual-database, health checks, sync queue

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`
2. `docs/architecture.md`
3. `docs/stack_recommendation.md`
4. Complete codebase (all M1-M16 modules must be built first)

## READY-TO-COPY PROMPT

> **Role:** Backend Infrastructure Engineer
>
> **Task:** Add local PostgreSQL failover to the existing Traveloop application. Currently all modules use Supabase PostgreSQL directly via Prisma. Add a DatabaseService layer that monitors Supabase health, automatically fails over to a local PostgreSQL instance when Supabase is down, queues offline writes, and syncs back when connectivity restores.
>
> **Context:**
> - **Current State:** All 16 modules use Supabase PostgreSQL via Prisma 5.22. No local database exists.
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, Supabase JS 2.46
> - **Local DB:** PostgreSQL 16 (same schema as Supabase)
> - **Dependencies:** All modules (M1-M16) must be updated to use DatabaseService
>
> **Specific Instructions:**
> - Install PostgreSQL 16 locally, create `traveloop_local` database
> - Run all migration SQL files against local database
> - Configure Prisma with two datasources: `supabase` (primary) and `local` (failover)
> - Create `src/lib/prisma/database.service.ts`:
>   - Health monitor: ping Supabase every 30 seconds
>   - Connection router: healthy → Supabase, down → local PG
>   - Sync queue: store mutations in IndexedDB when offline
>   - Sync worker: replay pending mutations on reconnection
>   - Conflict resolution: Last-Write-Wins using updated_at
> - Create `src/lib/prisma/sync-queue.ts`: mutation queue with retry logic
> - Add health status API: GET /api/v1/health
> - Add UI indicator: green dot (connected) / orange dot (offline mode) in app header
> - Update ALL existing services to use DatabaseService instead of direct Prisma
> - Add `.env` variable: `DATABASE_URL_LOCAL=postgresql://postgres:password@localhost:5432/traveloop_local`
> - Do NOT break existing Supabase-only functionality
> - Graceful degradation: if local PG also unavailable, show error state
>
> **Output Requirements:**
> - Production-ready, backward compatible, all services updated, sync tested
