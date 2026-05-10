# M4 Plan — Dashboard Module

## MODULE SPECIFICATION
Primary user home workspace. See `docs/module_prds/M4.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude
- **Reason:** Dashboard layout, data fetching, responsive grid

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`
2. `docs/architecture.md` — trips table, dashboard data queries

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer
>
> **Task:** Build the Traveloop dashboard — the primary authenticated home page showing welcome panel, recent trips, upcoming trips, create trip CTA, quick AI planner entry, and budget alerts.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2 App Router, TypeScript 5.6, TanStack Query 5.62, shadcn/ui 2.1, Recharts 2.13, Framer Motion 11.11
> - **Data Sources:** `trips` table (owner_id = current user), `budgets` table (for alerts)
> - **API:** GET /api/v1/trips?filter=recent&limit=6, GET /api/v1/trips?filter=upcoming
> - **Dependencies:** M1, M2, M3
>
> **Specific Instructions:**
> - Create page: `/dashboard`
> - Welcome panel: "Welcome back, {first_name}" with animated greeting
> - Create Trip CTA: large prominent button/card with gradient, icon
> - Quick AI Planner CTA: secondary card linking to /ai/plan-trip
> - Recent trips: grid of trip cards (cover image, title, dates, status badge, traveler count)
> - Upcoming trips: horizontal scrollable section for trips with future start_date
> - Budget alerts: warning cards for trips where actual_amount > estimated_amount
> - Empty state for new users: onboarding illustration, "Create your first trip" prompt
> - Trip card component: reusable, responsive, hover animation, click → /trips/[tripId]
> - Responsive: 1-column mobile, 2-column tablet, 3-column desktop
> - Loading skeletons while data fetches
> - Animate cards on mount with Framer Motion staggered entrance
> - Premium, modern design — gradients, rounded cards, soft shadows
>
> **Output Requirements:**
> - Production-ready TypeScript, responsive, dark mode, accessible
