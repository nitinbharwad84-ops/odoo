# M1 Plan — Project Foundation & PWA Setup

## MODULE SPECIFICATION
Initialize the Next.js 14 project, configure design system, PWA, Supabase connection, and core infrastructure. See `docs/module_prds/M1.md` for full acceptance criteria.

> **NOTE:** Local PostgreSQL failover has been moved to M17 (deferred). M1 uses Supabase-only.

## AGENT ASSIGNMENT
- **Agent:** Antigravity
- **Reason:** Requires project scaffolding, CLI commands, file system setup, and multi-file configuration

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md` — Product overview and non-negotiables
2. `docs/architecture.md` — System architecture, project structure, database schema
3. `docs/stack_recommendation.md` — Exact versions and packages
4. `docs/deployment_structure.md` — Project initialization commands

## READY-TO-COPY PROMPT

> **Role:** Full-Stack Infrastructure Engineer
>
> **Task:** Initialize the Traveloop Next.js 14 project with complete foundation: TypeScript, Tailwind CSS, shadcn/ui design system, PWA support, Supabase database connection, app shell layout, auth middleware, error boundaries, and monitoring integration.
>
> **Context:**
> - **Product:** AI-powered collaborative travel planning SaaS (see master_prd.md)
> - **Architecture:** Next.js 14 App Router, serverless API routes (see architecture.md)
> - **Tech Stack:** Next.js 14.2.x, TypeScript 5.6.x, Tailwind 3.4.x, shadcn/ui 2.1.x, Prisma 5.22.x, Supabase JS 2.46.x, @ducanh2912/next-pwa 5.6.x
> - **Database:** Supabase PostgreSQL 15 (Supabase-only for now; local PG failover deferred to M17)
> - **Monitoring:** Sentry Free, PostHog Cloud Free
>
> **Specific Instructions:**
> - Initialize Next.js 14.2 with App Router, TypeScript strict, Tailwind, ESLint, src directory
> - Install ALL dependencies listed in stack_recommendation.md
> - Configure shadcn/ui with custom theme: primary blue (#2563EB), dark mode support via next-themes
> - Set up PWA: manifest.ts, service worker config, offline page at /offline
> - Create Prisma schema with ALL 19 tables from architecture.md (single Supabase datasource)
> - Create Prisma client wrapper in `src/lib/prisma/client.ts` (simple single-connection client)
> - Create Supabase clients: `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/server.ts` (server)
> - Build app shell layout: sidebar (collapsible), top header with user menu + notification bell, mobile bottom nav
> - Create auth middleware in `middleware.ts` protecting all routes under `/(authenticated)/`
> - Create error boundary component, 404 page, 500 page
> - Initialize Sentry (`src/lib/sentry.ts`) and PostHog (`src/lib/analytics.ts`)
> - Create providers wrapper (`src/app/providers.tsx`) with: QueryClientProvider, ThemeProvider, PostHogProvider
> - Configure `next.config.mjs` with PWA plugin, image optimization, and security headers
> - Create `.env.local.example` with all environment variables
> - Do NOT implement any feature UI — foundation only
> - Do NOT install packages not listed in stack_recommendation.md
>
> **Output Requirements:**
> - Production-ready code only
> - TypeScript strict mode throughout
> - All files complete and functional
> - Include detailed comments for configuration decisions
> - Include error handling for Supabase connection
> - Include proper TypeScript types for all services
> - Do NOT implement local PostgreSQL failover (deferred to M17)
