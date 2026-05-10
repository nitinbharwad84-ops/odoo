# M16 Plan — Admin Panel (Phase 2)

## MODULE SPECIFICATION
Admin dashboard, user management, moderation. See `docs/module_prds/M16.md`.

## AGENT ASSIGNMENT
- **Agent:** Antigravity | **Reason:** Dashboard with metrics, admin RBAC, data tables

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build admin panel for Traveloop (Phase 2): admin dashboard with KPIs, user management, community moderation, AI usage monitoring, audit log viewer.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, Recharts 2.13, shadcn/ui 2.1
> - **Database:** All tables (read), `users`/`profiles` (write: suspend/delete), `community_posts`/`comments` (write: remove), `ai_usage_logs` (read), `audit_logs` (read)
> - **Admin Routes:** /admin, /admin/users, /admin/moderation, /admin/analytics
> - **Dependencies:** M1, M2, M15
>
> **Specific Instructions:**
> - Admin-only middleware: check user role = 'admin' (add `role` field to users table)
> - Dashboard: total users, total trips, AI calls today, active users today (cards + sparklines)
> - User management: data table with search, suspend/unsuspend, delete user
> - Moderation: flagged community posts, remove content, ban user
> - AI monitoring: usage chart (daily), cost summary, failure rate
> - Audit log viewer: searchable, filterable table of audit_logs
> - All admin pages use data tables (shadcn/ui DataTable pattern)
>
> **Output Requirements:**
> - Production-ready, admin RBAC enforced, data tables functional, charts render
