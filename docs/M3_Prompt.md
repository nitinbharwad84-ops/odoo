# M3 Plan — User Profile Module

## MODULE SPECIFICATION
Profile viewing, editing, avatar upload, travel preferences. See `docs/module_prds/M3.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude
- **Reason:** CRUD forms, file upload, preference UI

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`
2. `docs/architecture.md` — profiles table schema, profile API endpoints
3. `docs/stack_recommendation.md`

## READY-TO-COPY PROMPT

> **Role:** Frontend Developer
>
> **Task:** Build the user profile module for Traveloop: profile view page, profile edit form, avatar upload to Supabase Storage, travel style selection, notification preferences.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2 App Router, TypeScript 5.6, Supabase Storage, React Hook Form 7.53, Zod 3.23, shadcn/ui 2.1, TanStack Query 5.62
> - **Database Table:** `profiles` (id, user_id, first_name, last_name, avatar_url, phone, city, country, language, travel_preferences JSONB, notification_preferences JSONB)
> - **API Endpoints:** GET /api/v1/profile, PATCH /api/v1/profile, POST /api/v1/profile/avatar
> - **Storage:** Supabase Storage bucket "avatars" (public)
> - **Travel Styles:** backpacker, family, luxury, adventure, foodie, digital_nomad, romantic, business_traveler
> - **Dependencies:** M1 (Foundation), M2 (Auth)
>
> **Specific Instructions:**
> - Create pages: `/profile` (view), `/profile/edit` (edit form)
> - Profile view: display user info, avatar (with fallback initials), travel preferences badges, trip count
> - Profile edit: React Hook Form for all fields, image upload with preview and crop
> - Avatar upload: client-side resize to 256x256 before upload, max 2MB, JPEG/PNG only
> - Travel preferences: multi-select chips/badges for travel styles, stored as JSONB array
> - Notification preferences: toggle switches for email, push, in_app
> - Create Zod schema: `src/schemas/profile.schema.ts`
> - Create profile service: `src/services/profile.service.ts`
> - Create TanStack Query hooks: `src/features/profile/hooks/useProfile.ts`
> - Account deletion: confirmation dialog → Supabase Auth deleteUser → redirect to landing
> - Settings pages: `/settings/account`, `/settings/privacy`, `/settings/notifications`, `/settings/preferences`
> - All UI uses shadcn/ui, responsive, dark mode compatible
>
> **Output Requirements:**
> - Production-ready TypeScript, complete error handling, optimistic updates for profile edits
