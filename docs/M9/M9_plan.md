# M9 Plan — Packing Checklist Module

## MODULE SPECIFICATION
Manual + AI packing lists. See `docs/module_prds/M9.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Checklist UI, toggle logic

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer
>
> **Task:** Build packing checklist for Traveloop: manual item creation, categorized lists, pack/unpack toggling, AI generation integration, progress tracking.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `packing_items` (id, trip_id, name, category, packed, created_by)
> - **Categories:** clothing, electronics, documents, hygiene, medicine, accessories, travel_gear
> - **API:** GET/POST /api/v1/trips/:id/packing, PATCH/DELETE /api/v1/packing/:id
> - **Dependencies:** M1, M2, M5. AI generation via M13.
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/packing`
> - Add item form: name + category dropdown
> - Items grouped by category with collapsible sections
> - Checkbox toggle for packed/unpacked (optimistic update)
> - "Generate with AI" button (calls M13 AI packing endpoint)
> - Progress bar: "X of Y items packed"
> - Reset checklist (unpack all)
> - Delete individual items with swipe-to-delete on mobile
> - Duplicate checklist from another trip (select source trip)
> - Empty state: "Add items manually or generate with AI"
>
> **Output Requirements:**
> - Production-ready, optimistic checkbox updates, smooth animations
