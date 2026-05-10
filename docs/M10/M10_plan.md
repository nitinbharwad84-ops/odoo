# M10 Plan — Notes & Journal Module

## MODULE SPECIFICATION
Trip notes with rich text editing. See `docs/module_prds/M10.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Rich text editor (Tiptap) integration

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer
>
> **Task:** Build notes and journal module for Traveloop: rich text trip notes, daily entries, reminders, contact storage using Tiptap editor.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Tiptap 2.9 (StarterKit), TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `notes` (id, trip_id, user_id, content, note_type, linked_day)
> - **Note Types:** general, daily, reminder, hotel, contact, emergency, journal
> - **API:** GET/POST /api/v1/trips/:id/notes, PATCH/DELETE /api/v1/notes/:id
> - **Dependencies:** M1, M2, M5
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/notes`
> - Tiptap editor with toolbar: bold, italic, headings, lists, links
> - Note type selector (tabs or dropdown filter)
> - Link notes to specific day numbers
> - Notes list with type icons and timestamps
> - Create/edit/delete notes
> - Reminder notes: visual indicator (bell icon, colored border)
> - Auto-save on blur (debounced)
> - Mobile-friendly editor
>
> **Output Requirements:**
> - Production-ready, Tiptap renders correctly, auto-save works, type filtering
