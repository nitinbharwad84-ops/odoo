# M11 Plan — Collaboration Module

## MODULE SPECIFICATION
Invite collaborators, role-based access. See `docs/module_prds/M11.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Invitation flow, RBAC logic

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build collaboration module for Traveloop: invite collaborators by email, assign editor/viewer roles, manage collaborators, enforce RBAC on trip operations.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, Resend 4.0 (emails), TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `collaborators` (id, trip_id, user_id, role, status, invited_by, joined_at)
> - **Roles:** owner (full control), editor (edit itinerary/activities/checklist/notes), viewer (read-only + comment future)
> - **API:** POST /api/v1/trips/:id/invite, GET /api/v1/trips/:id/collaborators, PATCH/DELETE /api/v1/collaborators/:id
> - **Dependencies:** M1, M2, M5, M14 (Notifications)
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/collaborators`
> - Invite form: email input + role selector (editor/viewer)
> - Send invitation email via Resend with trip details + accept link
> - Invitation accept page: logged-in user clicks link → status changes to 'accepted'
> - Collaborator list: avatar, name, email, role badge, actions (change role, remove)
> - RBAC middleware: create `src/lib/rbac.ts` that checks collaborator permissions on all trip API routes
> - Server-side validation: only owner can delete trip, remove collaborators; editors can modify content; viewers read-only
> - Create notification record on invite
> - "My Trips" page must also show trips where user is a collaborator
>
> **Output Requirements:**
> - Production-ready, RBAC enforced server-side, email sending works, invitation flow complete
