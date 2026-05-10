# M15 Plan — Community Module (Phase 2)

## MODULE SPECIFICATION
Public itinerary feed, social features. See `docs/module_prds/M15.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude | **Reason:** Feed UI, social interactions

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Developer
>
> **Task:** Build the community module for Traveloop (Phase 2): public itinerary feed, like/comment/save posts, follow users, copy trip templates.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Prisma 5.22, TanStack Query 5.62, shadcn/ui 2.1
> - **Database:** `community_posts`, `comments`, `likes`, `followers`
> - **API:** GET /api/v1/community/feed, POST /api/v1/community/posts, POST /api/v1/community/comments, POST /api/v1/community/likes
> - **Dependencies:** M1, M2, M5, M12
>
> **Specific Instructions:**
> - Pages: `/community/feed`, `/community/templates`, `/community/users/[userId]`
> - Feed: infinite scroll, post cards with trip preview, like count, comment count
> - Post creation: publish existing trip to community
> - Like/unlike (optimistic), comment (inline form), save template
> - Copy trip: duplicate community trip into own account
> - Follow/unfollow users
> - User public profile: avatar, name, published trips
> - Feed sorting: recent, popular (likes), trending (recent + likes)
>
> **Output Requirements:**
> - Production-ready, social interactions, infinite scroll, responsive
