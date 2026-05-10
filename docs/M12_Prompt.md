# M12 Plan — Sharing Module

## MODULE SPECIFICATION
Public/private share links, trip duplication. See `docs/module_prds/M12.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Share link generation, public view pages, OG meta tags

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build sharing module for Traveloop: generate shareable links, public trip view page, trip duplication from shared view, Open Graph meta tags.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `shared_links` (id, trip_id, token, visibility, password_hash, expires_at)
> - **API:** POST /api/v1/trips/:id/share, GET /api/v1/share/:token, DELETE /api/v1/share/:linkId, POST /api/v1/share/:token/duplicate
> - **Dependencies:** M1, M2, M5
>
> **Specific Instructions:**
> - Page: `/trips/[tripId]/share` (share management), `/shared/[tripId]` (public view)
> - Generate share link: create 32-char random token (crypto.randomUUID), NOT sequential
> - Visibility options: public (anyone with link), invite_only (requires auth)
> - Optional expiration date
> - Copy-to-clipboard button for share URL
> - Public shared view: read-only trip detail with itinerary, budget summary (no edit controls)
> - "Duplicate this trip" button on shared view → creates copy in viewer's account (requires auth)
> - Open Graph meta tags: generateMetadata() for shared trip pages (title, description, cover image)
> - Revoke share link functionality
> - Share management page: list active links, creation date, expiry, revoke button
>
> **Output Requirements:**
> - Production-ready, secure token generation, OG tags render for social sharing, responsive public view
