# M14 Plan — Notifications Module

## MODULE SPECIFICATION
In-app notifications. See `docs/module_prds/M14.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Notification UI, bell component, read/unread logic

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer
>
> **Task:** Build notifications module: notification bell with unread count in header, notification center page, mark as read, email notifications for invites.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Resend 4.0, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `notifications` (id, user_id, notification_type, payload JSONB, read, created_at)
> - **Types:** collab_invite, budget_alert, trip_reminder, ai_complete
> - **API:** GET /api/v1/notifications, PATCH /api/v1/notifications/:id/read, POST /api/v1/notifications/read-all
> - **Dependencies:** M1, M2
>
> **Specific Instructions:**
> - Notification bell component in app header with unread count badge (red dot)
> - Dropdown popover on bell click: recent 5 notifications with "View All" link
> - Notifications page: `/notifications` — full list with type icons, timestamps, read/unread styling
> - Click notification → navigate to relevant page (e.g., invite → trip collaborators page)
> - Mark individual as read on click
> - "Mark all as read" button
> - Notification creation helper: `src/services/notification.service.ts` with `createNotification(userId, type, payload)`
> - Email notification for collab_invite using Resend (HTML template)
> - Poll for new notifications every 60 seconds (TanStack Query refetchInterval)
>
> **Output Requirements:**
> - Production-ready, bell component, notification center, email sending
