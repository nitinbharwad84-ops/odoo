# M7 Plan — Destination & Activity Search Module

## MODULE SPECIFICATION
Search and discovery for destinations and activities. See `docs/module_prds/M7.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Search UI, filtering logic, seed data

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build destination discovery and activity search for Traveloop with filtering, sorting, and quick-add to trips.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `activities` table, seed data for destinations (create a `destinations` table with city_name, country_name, destination_type, estimated_budget_index, seasonal_recommendation, highlights JSONB, tags TEXT[])
> - **API:** GET /api/v1/search/destinations?q=&region=&budget=, GET /api/v1/search/activities?q=&category=&price=&duration=
> - **Activity Categories:** sightseeing, cultural, nightlife, food, adventure, shopping, family, nature, wellness, local_experiences
> - **Dependencies:** M1, M2, M5
>
> **Specific Instructions:**
> - Pages: `/search/destinations`, `/search/activities`
> - Destination search: text search, region filter, budget filter, trending section
> - Destination cards: image placeholder, city name, country, budget index badge, highlights
> - Activity search: text search, category chips, price/duration range filters, sorting (price, rating, duration)
> - Quick-add: click "Add to Trip" → select trip → select stop → add activity
> - Seed data: create migration/seed with 50 popular destinations and 200 activities
> - Debounced search input (300ms)
> - Pagination with infinite scroll or load more
> - Loading skeletons, empty state
> - Full-text search using PostgreSQL `ILIKE` or `tsvector`
>
> **Output Requirements:**
> - Production-ready, includes seed data, responsive, fast search
