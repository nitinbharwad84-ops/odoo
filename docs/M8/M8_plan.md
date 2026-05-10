# M8 Plan — Budget Planner Module

## MODULE SPECIFICATION
Trip budget with categories, charts, alerts. See `docs/module_prds/M8.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Charts (Recharts), budget calculations, alert logic

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer (Data Visualization)
>
> **Task:** Build the budget planner for Traveloop with category breakdown, estimated vs actual spending, charts, and alerts.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Recharts 2.13, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `budgets` table (id, trip_id, category, estimated_amount, actual_amount, currency), `trips` table (budget_target, currency)
> - **Categories:** flights, accommodation, food, activities, local_transport, shopping, insurance, emergency, miscellaneous
> - **API:** GET/POST /api/v1/trips/:id/budget, PATCH /api/v1/budget/:id
> - **Dependencies:** M1, M2, M5
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/budget`
> - Budget target display with progress bar
> - Category cards: estimated vs actual with inline editing
> - Pie chart: budget allocation by category (Recharts PieChart)
> - Bar chart: estimated vs actual comparison (Recharts BarChart)
> - Summary card: total estimated, total actual, remaining, daily average
> - Alerts: over budget (red), approaching limit >80% (orange), category overspend (yellow)
> - Currency formatting based on trip currency
> - Initialize default categories on first visit (all at $0)
> - Responsive, premium design, dark mode compatible
>
> **Output Requirements:**
> - Production-ready, charts render correctly, inline editing, alert system functional
