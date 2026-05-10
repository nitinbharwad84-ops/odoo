# M2 Plan — Authentication Module

## MODULE SPECIFICATION
Complete authentication using Supabase Auth: signup, login, logout, email verification, forgot/reset password, session management. See `docs/module_prds/M2.md`.

## AGENT ASSIGNMENT
- **Agent:** Claude
- **Reason:** Code-heavy auth forms, validation logic, and Supabase Auth API integration

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`
2. `docs/architecture.md` — Auth flow, users/profiles tables, auth API endpoints
3. `docs/stack_recommendation.md` — Supabase Auth, React Hook Form, Zod versions

## READY-TO-COPY PROMPT

> **Role:** Frontend Authentication Specialist
>
> **Task:** Build the complete authentication system for Traveloop using Supabase Auth with email/password signup, login, logout, email verification, forgot password, and reset password flows.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2 App Router, TypeScript 5.6, Supabase Auth (built-in), React Hook Form 7.53, Zod 3.23, shadcn/ui 2.1, Tailwind CSS 3.4
> - **Database Tables:** `users` (managed by Supabase Auth), `profiles` (created on signup)
> - **API Endpoints:** POST /api/v1/auth/register, POST /api/v1/auth/login, POST /api/v1/auth/logout, POST /api/v1/auth/forgot-password, POST /api/v1/auth/reset-password, GET /api/v1/auth/me
> - **Auth Strategy:** Supabase Auth with server-side session via @supabase/ssr, HTTP-only cookies
> - **Dependencies:** M1 (Project Foundation) must be completed first
>
> **Specific Instructions:**
> - Create pages: `/login`, `/register`, `/forgot-password`, `/reset-password`
> - Create Zod schemas: `src/schemas/auth.schema.ts` (loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema)
> - Signup fields: first_name, last_name, email, password, confirm_password (required); city, country, phone (optional)
> - Validation: valid email, unique email, password min 8 chars with uppercase+number, password confirmation match
> - On successful signup: create profile record in `profiles` table with first_name, last_name
> - Create auth service: `src/services/auth.service.ts` wrapping Supabase Auth methods
> - Create API routes under `src/app/api/v1/auth/` for each endpoint
> - Create auth hook: `src/hooks/useAuth.ts` (useUser, useSession, signOut)
> - Implement loading states, form validation errors, auth error messages
> - Beautiful UI: centered card layout, gradient background, animated transitions
> - Mobile responsive
> - Error handling: network errors, invalid credentials, email already exists, expired tokens
> - Security: rate limiting on auth routes (10 attempts/min), CSRF protection via SameSite cookies
> - Do NOT implement social auth (future feature)
> - Do NOT implement MFA (future feature)
>
> **Output Requirements:**
> - Production-ready TypeScript code
> - All forms use React Hook Form + Zod
> - All UI uses shadcn/ui components
> - Proper error boundaries
> - Accessible forms (labels, aria attributes)
