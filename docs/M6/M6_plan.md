# M6 Plan — Itinerary Builder & Viewing Module

## MODULE SPECIFICATION
Core product workflow — multi-city itineraries with drag-drop, multiple views. See `docs/module_prds/M6.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Complex UI with drag-drop, multiple view modes, map integration

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`, 3. `docs/stack_recommendation.md`

## READY-TO-COPY PROMPT

> **Role:** Senior Frontend Developer (Complex UI Specialist)
>
> **Task:** Build the Traveloop itinerary builder — the core product feature. Multi-city trip stops with activities, drag-and-drop reordering, inline editing, and 5 view modes (timeline, day, list, calendar, map).
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, @dnd-kit/core 6.1, @dnd-kit/sortable 8.0, react-leaflet 4.2, Leaflet 1.9, TanStack Query 5.62, shadcn/ui 2.1, Framer Motion 11.11, date-fns 4.1
> - **Database Tables:** `trip_stops` (id, trip_id, city_name, country_name, arrival_date, departure_date, timezone, order_index, notes, estimated_transport_cost, estimated_transport_time), `trip_activities` (id, trip_stop_id, activity_id, title, description, day_number, time_slot, custom_notes, custom_cost, order_index)
> - **API Endpoints:** CRUD for stops and activities at /api/v1/trips/:tripId/stops, /api/v1/stops/:id, /api/v1/stops/:id/activities, /api/v1/trip-activities/:id, PATCH /api/v1/stops/reorder
> - **Dependencies:** M1, M2, M5
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/itinerary`
> - Add stop: modal form (city, country, dates, timezone, transport cost/time)
> - Drag-drop reorder stops using @dnd-kit with smooth animations
> - Activity panel per stop: add activity (title, description, category, cost, duration, time_slot), edit inline, delete
> - 5 View modes with tab switcher:
>   1. **Timeline:** Vertical timeline with stops as nodes, activities as cards
>   2. **Day View:** Single day detail with hour-by-hour layout
>   3. **List View:** Compact table with all stops and activities
>   4. **Calendar View:** Month calendar with stops highlighted, click to expand
>   5. **Map View:** Leaflet map with markers for each stop, polylines connecting route
> - Trip summary sidebar: total days, total stops, total estimated cost, trip dates
> - Expand/collapse stop sections
> - Print-friendly layout (CSS @media print)
> - Optimistic updates for reordering
> - Proper order_index management (recalculate on reorder)
> - Empty states for no stops, no activities
> - Mobile: single-column, bottom sheet for adding stops
>
> **Output Requirements:**
> - Production-ready, all 5 views fully functional, drag-drop smooth, map rendering, responsive
