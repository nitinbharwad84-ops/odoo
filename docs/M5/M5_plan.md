# M5 Plan — Trip Management Module

## MODULE SPECIFICATION
Full trip CRUD. See `docs/module_prds/M5.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Complex CRUD forms, deep-copy logic

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`, 3. `docs/stack_recommendation.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build complete trip management for Traveloop: create/edit/delete/duplicate/archive trips with all metadata fields, cover image upload, draft auto-save, status management, and My Trips listing page.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, Supabase Storage, TanStack Query 5.62, React Hook Form 7.53, Zod 3.23, shadcn/ui 2.1
> - **Database:** `trips` table (id, owner_id, title, description, cover_image_url, start_date, end_date, traveler_count, budget_target, currency, trip_type, privacy, status, transport_preference, accommodation_preference, origin_city, created_at, updated_at)
> - **Trip Types:** solo, family, group, honeymoon, business, adventure, luxury, budget
> - **Statuses:** draft, active, completed, archived
> - **Privacy:** private, shared, public
> - **API Endpoints:** Full CRUD at /api/v1/trips + /duplicate + /archive
> - **Dependencies:** M1, M2
>
> **Specific Instructions:**
> - Pages: `/trips` (My Trips), `/trips/new` (Create), `/trips/[tripId]` (Detail), `/trips/[tripId]/edit` (Edit)
> - Create form: multi-step wizard (1. Basic Info, 2. Travel Details, 3. Preferences)
> - Cover image upload to Supabase Storage "trip-covers" bucket, max 5MB, JPEG/PNG/WebP
> - Auto-save draft every 30 seconds (debounced)
> - Duplicate: deep copy trip + all trip_stops + trip_activities + budgets + packing_items
> - My Trips: filterable tabs (All, Active, Draft, Archived), search by title, sort by date
> - Trip detail page: overview card with all metadata, action buttons, links to itinerary/budget/packing/notes
> - Delete: confirmation dialog, cascade delete all related records
> - Zod schema: `src/schemas/trip.schema.ts`
> - Service: `src/services/trip.service.ts`
> - Hooks: `src/features/trips/hooks/useTrips.ts`, `useTrip.ts`, `useTripMutations.ts`
> - Server-side ownership validation on all mutations
>
> **Output Requirements:**
> - Production-ready, TypeScript strict, optimistic updates, error handling, responsive UI
