# Traveloop — Master PRD (Source of Truth)

**Version:** 1.0
**Date:** 2026-05-10
**Product:** AI-Powered Collaborative Travel Planning SaaS
**Platform:** Website + PWA (Installable + Offline)
**Tier:** FREE ($0/month)

---

## Executive Summary

Traveloop is an AI-powered collaborative travel planning platform that centralizes the fragmented travel planning experience into a single unified workspace. Users can discover destinations, create personalized multi-city trips, plan day-wise itineraries, estimate budgets, collaborate with co-travelers, generate AI-powered plans, optimize routes, manage packing lists, store travel notes, and share itineraries publicly.

**Product Type:** SaaS web application with PWA capabilities
**Target Market:** Modern travelers (solo, family, group, digital nomads, backpackers)
**Business Model:** Freemium SaaS with future premium AI tiers and affiliate commerce
**Positioning:** AI-assisted collaborative travel planning operating system

---

## Vision

Build the most intelligent travel planning platform in the world — an operating system for travel that combines planning infrastructure, AI decision assistance, collaborative workflows, community discovery, and monetizable travel commerce.

---

## Mission

Enable anyone to plan smarter travel with less friction and greater confidence.

---

## Target Users

| Persona | Age | Key Needs | Priority Features |
|---|---|---|---|
| Solo Explorer | 24-35 | Quick planning, discovery, budget | AI planner, budget assistant |
| Family Planner | 30-45 | Structure, safety, coordination | Checklists, budget, collaboration |
| Group Organizer | 25-40 | Shared editing, coordination | Collaborator roles, comments |
| Digital Nomad | 25-40 | Long-term, multi-city, flexibility | Route optimization, notes, timeline |
| Luxury Traveler | 30-55 | Premium, curated, efficient | AI concierge, optimized itineraries |
| Budget Backpacker | 20-35 | Cost minimization, route efficiency | Budget assistant, cheapest routes |

---

## Problem Statement

Travel planning is fragmented across 10+ disconnected tools (Maps, spreadsheets, messaging apps, booking sites, weather apps, notes apps). This creates duplicated effort, context switching, information fragmentation, budget errors, coordination chaos, and planning fatigue.

---

## Success Metrics

### MVP KPIs
- **Activation:** First trip created within 24 hours of signup
- **Engagement:** 3+ trips per active user in first month
- **Retention:** D7 > 40%, D30 > 20%
- **AI Adoption:** 60%+ of users try AI planner
- **AI Acceptance:** 50%+ of AI-generated itineraries accepted
- **Sharing:** 30%+ of trips shared publicly

### Growth KPIs
- Weekly active users growth
- Referral conversion from shared links
- Collaboration sessions per trip
- Community template duplications

---

## Tech Stack

### Frontend
- Next.js 14.2.x (App Router) + React 18.3.x + TypeScript 5.6.x
- Tailwind CSS 3.4.x + shadcn/ui 2.1.x + Lucide React 0.454.x
- TanStack Query 5.62.x + Zustand 5.0.x
- React Hook Form 7.53.x + Zod 3.23.x
- Recharts 2.13.x, react-leaflet 4.2.x, @dnd-kit 6.1.x, Tiptap 2.9.x
- @ducanh2912/next-pwa 5.6.x (PWA + Offline)

### Backend
- Next.js API Routes (serverless)
- Prisma 5.22.x ORM (Supabase connection)
- Supabase JS Client 2.46.x

### Database
- Supabase PostgreSQL 15.x (Primary Cloud — Supabase-only for M1-M16)
- Local PostgreSQL 16.x (Failover — deferred to M17)
- Supabase Auth, Storage, Realtime (built-in)

### AI
- Google Gemini 2.0 Flash API (Primary — free tier)
- Groq Llama 3.1 70B API (Fallback — free tier)
- Vercel AI SDK 4.0.x (unified interface)

### Infrastructure
- Vercel Hobby Plan (deployment)
- GitHub Actions (CI/CD)
- Sentry Free (error monitoring)
- PostHog Cloud Free (analytics)
- Resend Free (email)

---

## Feature Inventory (17 Modules)

| Module | ID | MVP Priority | Phase | Developer |
|---|---|---|---|---|
| Project Foundation & PWA | M1 | P0 | 1 | Dev 1 |
| Authentication | M2 | P0 | 1 | Dev 1 |
| User Profile | M3 | P0 | 1 | Dev 1 |
| Dashboard | M4 | P0 | 1 | Dev 1 |
| Trip Management | M5 | P0 | 1 | Dev 2 |
| Itinerary Builder & Viewing | M6 | P0 | 1 | Dev 2 |
| Destination & Activity Search | M7 | P0 | 1 | Dev 2 |
| Budget Planner | M8 | P0 | 1 | Dev 2 |
| Packing Checklist | M9 | P1 | 1 | Dev 3 |
| Notes & Journal | M10 | P1 | 1 | Dev 3 |
| Collaboration | M11 | P1 | 1 | Dev 3 |
| Sharing | M12 | P0 | 1 | Dev 3 |
| AI Services | M13 | P1 | 1 | Dev 4 |
| Notifications | M14 | P1 | 1 | Dev 4 |
| Community | M15 | P2 | 2 | Dev 4 |
| Admin Panel | M16 | P2 | 2 | Dev 4 |
| Local PostgreSQL Fallback | M17 | Deferred | Post-Launch | Any |

---

## MVP Scope

### In Scope (Phase 1)
- Full authentication (email/password, verification, password reset)
- User profiles with travel preferences
- Dashboard with trip overview and quick actions
- Complete trip CRUD (create, edit, delete, duplicate, archive, draft)
- Itinerary builder (stops, activities, day planning, drag-drop reorder)
- Itinerary views (timeline, day, list, calendar, map)
- Destination and activity search with filters
- Budget planner with category breakdown and alerts
- Packing checklist (manual + AI generation)
- Trip notes and journal
- Basic collaboration (invite, editor/viewer roles, shared editing)
- Sharing (public links, invite-only, duplicate shared trips)
- AI Trip Planner, AI Budget Assistant, AI Packing Generator
- In-app notifications (invites, budget alerts, reminders)
- PWA (install, offline cached pages)

### Explicitly Excluded from MVP
- Booking integrations (hotels, flights, experiences)
- Payment/subscription billing system
- Community feed and public itinerary ecosystem
- Creator marketplace
- Enterprise admin dashboard
- Complex moderation tools
- Mobile native apps
- Advanced analytics dashboards
- Sophisticated recommendation engines
- Realtime collaboration (live cursors, presence)

---

## Timeline

| Phase | Timeline | Focus |
|---|---|---|
| Phase 1: MVP | 10-16 weeks | Core planning + AI + collaboration basics |
| Phase 2: Growth | +8-12 weeks | Community, templates, better AI |
| Phase 3: Monetization | +8-12 weeks | Subscriptions, premium AI, exports |
| Phase 4: Commerce | +12-16 weeks | Affiliate integrations |
| Phase 5: Platform | +16-24 weeks | Creator marketplace, API ecosystem |

---

## Non-Negotiables

1. Mobile-first responsive design
2. PWA installable with offline support
3. Supabase database (local PostgreSQL failover available via M17, deferred)
4. AI outputs must be editable, not black-box
5. All free tier services ($0/month operational cost)
6. WCAG-aligned accessibility
7. Production-grade security from day one
8. Structured logging and error monitoring
9. TypeScript strict mode throughout
10. SEO-optimized public pages
