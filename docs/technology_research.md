# Traveloop — Technology Research Report

**Version:** 1.0
**Date:** 2026-05-10
**Project:** AI-Powered Collaborative Travel Planning SaaS
**Tier:** FREE ($0/month — all free tiers and open-source)

---

## 1. Frontend Framework

| Criteria | Next.js 14 | Remix 2.x | Nuxt 3 | SvelteKit 2 | Astro 4 |
|---|---|---|---|---|---|
| GitHub Stars | ~127K | ~30K | ~55K | ~19K | ~48K |
| npm Weekly Downloads | ~6.5M | ~350K | ~700K | ~250K | ~700K |
| SSR/SSG Support | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Static-first |
| App Router | ✅ | ✅ | ✅ | ✅ | ✅ |
| TypeScript | ✅ Native | ✅ | ✅ | ✅ | ✅ |
| PWA Support | ✅ next-pwa | ⚠️ Manual | ✅ vite-pwa | ✅ vite-pwa | ⚠️ Limited |
| React Ecosystem | ✅ Full | ✅ Full | ❌ Vue | ❌ Svelte | ⚠️ Partial |
| Vercel Deploy | ✅ Native | ✅ | ⚠️ | ⚠️ | ✅ |
| Community | Massive | Medium | Large | Growing | Growing |
| Learning Curve | Medium | Medium | Medium | Low | Low |
| Free Tier Deploy | ✅ Vercel Free | ✅ | ✅ | ✅ | ✅ |

**✅ RECOMMENDATION: Next.js 14 (App Router)**

**Rationale:**
- Largest React ecosystem, most mature SSR/SSG framework
- Native Vercel deployment (free tier)
- Excellent PWA support via `@ducanh2912/next-pwa`
- Best TypeScript integration
- Largest community for hiring and support
- PRD explicitly recommends Next.js
- API Routes serve as lightweight backend, reducing need for separate backend in free tier

**Why not others:**
- Remix: Smaller ecosystem, less PWA tooling, no advantage for this use case
- Nuxt: Vue-based, PRD specifies React ecosystem
- SvelteKit: Smaller ecosystem, fewer component libraries
- Astro: Content-first, not ideal for SaaS with heavy interactivity

---

## 2. UI Component Library

| Criteria | shadcn/ui | Radix UI | MUI | Chakra UI | Mantine |
|---|---|---|---|---|---|
| GitHub Stars | ~75K | ~16K | ~95K | ~38K | ~27K |
| Cost | Free | Free | Free (Core) | Free | Free |
| Tailwind Native | ✅ | ❌ | ❌ | ❌ | ❌ |
| Copy-Paste Ownership | ✅ | N/A | ❌ | ❌ | ❌ |
| Customization | Excellent | Excellent | Good | Good | Good |
| Accessibility | ✅ (Radix) | ✅ | ✅ | ✅ | ✅ |
| Bundle Size | Minimal | Minimal | Large | Medium | Medium |
| Dark Mode | ✅ | Manual | ✅ | ✅ | ✅ |

**✅ RECOMMENDATION: shadcn/ui v2.1**

**Rationale:**
- Built on Radix UI primitives (accessible by default)
- Tailwind CSS native — consistent with PRD spec
- Copy-paste model = full code ownership, no dependency lock-in
- Smallest bundle size impact
- Massive community adoption, most tutorials
- PRD explicitly recommends shadcn/ui

---

## 3. State Management

### Server State

| Criteria | TanStack Query v5 | SWR v2 | Apollo Client | RTK Query |
|---|---|---|---|---|
| GitHub Stars | ~43K | ~31K | ~19K | Part of RTK |
| Caching | ✅ Advanced | ✅ Good | ✅ GraphQL | ✅ Good |
| Optimistic Updates | ✅ | ⚠️ Manual | ✅ | ✅ |
| Devtools | ✅ Excellent | ⚠️ Basic | ✅ | ✅ |
| Offline Support | ✅ | ⚠️ | ⚠️ | ⚠️ |
| Supabase Integration | ✅ | ✅ | ❌ | ⚠️ |

**✅ RECOMMENDATION: TanStack Query v5.62**

### Client State

| Criteria | Zustand v5 | Jotai v2 | Redux Toolkit | Valtio |
|---|---|---|---|---|
| GitHub Stars | ~49K | ~19K | ~63K | ~9K |
| Bundle Size | 1.1KB | 2KB | 11KB | 3KB |
| Learning Curve | Low | Low | High | Low |
| DevTools | ✅ | ✅ | ✅ Excellent | ⚠️ |
| TypeScript | ✅ | ✅ | ✅ | ✅ |

**✅ RECOMMENDATION: Zustand v5.0**

---

## 4. Database — Primary (Cloud)

| Criteria | Supabase | PlanetScale | Neon | Firebase | Turso |
|---|---|---|---|---|---|
| Database Type | PostgreSQL | MySQL | PostgreSQL | NoSQL | SQLite (libSQL) |
| Free Tier DB Size | 500MB | Deprecated Free | 512MB | 1GB | 9GB |
| Free Tier Bandwidth | 5GB | N/A | Unlimited | 10GB/mo | 500 reads/day |
| Auth Built-in | ✅ | ❌ | ❌ | ✅ | ❌ |
| Realtime | ✅ | ❌ | ❌ | ✅ | ❌ |
| Storage | ✅ 1GB | ❌ | ❌ | ✅ 5GB | ❌ |
| Edge Functions | ✅ 500K/mo | ❌ | ❌ | ✅ | ❌ |
| Row Level Security | ✅ | ❌ | ❌ | ✅ Rules | ❌ |
| REST API Auto-gen | ✅ PostgREST | ❌ | ❌ | ✅ | ❌ |
| PostgreSQL Compatible | ✅ Native | ❌ | ✅ | ❌ | ❌ |

**✅ RECOMMENDATION: Supabase (Free Tier)**

**Rationale:**
- Native PostgreSQL — matches PRD database spec and local PostgreSQL failover requirement
- Free tier includes: Auth, Realtime, Storage, Edge Functions, 500MB DB
- Auto-generated REST APIs reduce backend code
- Row Level Security for authorization
- User explicitly requested Supabase

---

## 5. Database — Local Fallback

| Criteria | PostgreSQL 16 | SQLite | MariaDB |
|---|---|---|---|
| Schema Compatibility | ✅ Identical to Supabase | ❌ Different SQL dialect | ⚠️ Similar but different |
| JSONB Support | ✅ | ❌ | ⚠️ |
| RLS Support | ✅ | ❌ | ❌ |
| Offline Capable | ✅ | ✅ | ✅ |
| Cost | Free | Free | Free |

**✅ RECOMMENDATION: PostgreSQL 16.x (Local)**

**Rationale:**
- Schema-identical to Supabase PostgreSQL = zero migration friction
- Same SQL dialect, same JSONB support
- Prisma ORM supports dual PostgreSQL connections natively
- User explicitly requested local PostgreSQL as failover

---

## 6. ORM / Database Client

| Criteria | Prisma v5 | Drizzle ORM | Knex.js | TypeORM |
|---|---|---|---|---|
| GitHub Stars | ~40K | ~25K | ~19K | ~34K |
| TypeScript | ✅ Generated types | ✅ Native | ⚠️ Manual | ✅ |
| Migration System | ✅ Excellent | ✅ Good | ✅ Good | ✅ |
| Multi-DB Support | ✅ | ✅ | ✅ | ✅ |
| Supabase Integration | ✅ | ✅ | ⚠️ | ⚠️ |
| Schema-First | ✅ | ❌ Code-first | ❌ | ❌ |
| Learning Curve | Low | Medium | Medium | High |
| Edge Runtime | ⚠️ via Accelerate | ✅ | ❌ | ❌ |

**✅ RECOMMENDATION: Prisma v5.22**

**Rationale:**
- Best-in-class TypeScript type generation from schema
- Excellent migration system for both Supabase and local PostgreSQL
- Built-in multi-database connection support (critical for dual-DB failover)
- Most mature, largest community
- Schema-first design matches our architecture approach

---

## 7. Authentication

| Criteria | Supabase Auth | Clerk | NextAuth v5 | Lucia Auth |
|---|---|---|---|---|
| Cost (Free) | ✅ 50K MAU | ⚠️ 10K MAU | ✅ Unlimited | ✅ Unlimited |
| Email/Password | ✅ | ✅ | ✅ | ✅ Manual |
| Social OAuth | ✅ | ✅ | ✅ | ✅ Manual |
| Email Verification | ✅ | ✅ | ⚠️ | ❌ Manual |
| Session Management | ✅ | ✅ | ✅ | ✅ |
| RLS Integration | ✅ Native | ❌ | ❌ | ❌ |
| Setup Complexity | Low | Low | Medium | High |

**✅ RECOMMENDATION: Supabase Auth (built-in)**

**Rationale:**
- Already using Supabase — zero additional service
- Free tier: 50K monthly active users
- Native RLS integration for authorization
- Built-in email verification, password reset, session management
- Reduces external dependency count (FREE tier priority)

---

## 8. AI / LLM Provider

| Criteria | Google Gemini | Groq | OpenAI | Anthropic Claude |
|---|---|---|---|---|
| Free Tier | ✅ 15 RPM, 1M tokens/day | ✅ 30 RPM, 14.4K tokens/min | ❌ Pay-per-use | ❌ Pay-per-use |
| Model Quality | Excellent | Good (Llama 3.1) | Excellent | Excellent |
| Structured JSON | ✅ | ✅ | ✅ | ✅ |
| Streaming | ✅ | ✅ | ✅ | ✅ |
| Latency | Fast | Very Fast | Medium | Medium |
| Cost at Scale | Very Low | Free tier only | $$$ | $$$ |

**✅ RECOMMENDATION: Google Gemini API (Primary) + Groq (Fallback)**

**Rationale:**
- Gemini 2.0 Flash free tier: 15 RPM, 1M tokens/day — extremely generous
- Groq free tier: Ultra-fast inference on Llama 3.1 models
- Both support structured JSON output (critical for itinerary generation)
- Zero cost aligns with FREE tier requirement
- Dual-provider provides failover capability

---

## 9. Maps

| Criteria | Leaflet + OSM | Mapbox GL | Google Maps | MapLibre |
|---|---|---|---|---|
| Cost | ✅ Completely Free | ⚠️ 50K loads free | ⚠️ $200 credit | ✅ Free |
| Tile Source | OpenStreetMap | Mapbox | Google | Any |
| Offline Tiles | ✅ | ⚠️ | ❌ | ✅ |
| React Integration | react-leaflet | react-map-gl | @react-google-maps | react-map-gl |
| Custom Styling | Limited | ✅ | ✅ | ✅ |
| Bundle Size | Medium | Large | Large | Large |

**✅ RECOMMENDATION: Leaflet v1.9 + OpenStreetMap (Primary), MapLibre GL (optional upgrade)**

**Rationale:**
- Completely free, no API key required
- Excellent react-leaflet integration
- OpenStreetMap tiles are free and reliable
- Supports offline tile caching (critical for PWA)
- Zero cost aligns with FREE tier

---

## 10. Email Service

| Criteria | Resend | Supabase Email | SendGrid | Mailgun |
|---|---|---|---|---|
| Free Tier | 100 emails/day | ✅ Built-in | 100 emails/day | 100 emails/day (trial) |
| API Quality | Excellent | Basic | Good | Good |
| React Email | ✅ | ❌ | ❌ | ❌ |
| Reliability | High | Medium | High | High |

**✅ RECOMMENDATION: Resend (Free Tier) + Supabase Email (Auth only)**

**Rationale:**
- Resend: 100 emails/day free, excellent React Email templates
- Supabase handles auth emails natively (verification, password reset)
- Resend for transactional emails (collaboration invites, notifications)

---

## 11. Analytics

| Criteria | PostHog | Umami | Plausible | Mixpanel |
|---|---|---|---|---|
| Free Tier | ✅ 1M events/mo | ✅ Self-hosted | ⚠️ Trial only | ✅ 20M events/mo |
| Self-Hostable | ✅ | ✅ | ✅ | ❌ |
| Event Tracking | ✅ | ⚠️ Page-only | ⚠️ Page-only | ✅ |
| Session Replay | ✅ | ❌ | ❌ | ❌ |
| Feature Flags | ✅ | ❌ | ❌ | ❌ |

**✅ RECOMMENDATION: PostHog Cloud (Free Tier)**

**Rationale:**
- 1M events/month free
- Built-in feature flags (useful for MVP rollout)
- Session replay for UX debugging
- Full event tracking for KPIs defined in PRD

---

## 12. Error Monitoring

| Criteria | Sentry | LogRocket | BugSnag |
|---|---|---|---|
| Free Tier | ✅ 5K errors/mo | ✅ 1K sessions/mo | ⚠️ Trial |
| Source Maps | ✅ | ✅ | ✅ |
| Performance | ✅ | ✅ | ✅ |
| Next.js Integration | ✅ Native | ✅ | ✅ |

**✅ RECOMMENDATION: Sentry (Free Tier)**

---

## 13. File Storage

| Criteria | Supabase Storage | Cloudflare R2 | AWS S3 |
|---|---|---|---|
| Free Tier | 1GB storage | 10GB storage | 5GB (12 months) |
| Bandwidth | 2GB/month | 10GB/month | 15GB/month (12 mo) |
| Integration | ✅ Native | ⚠️ Manual | ⚠️ Manual |

**✅ RECOMMENDATION: Supabase Storage (built-in)**

---

## 14. PWA Tooling

| Criteria | @ducanh2912/next-pwa | Serwist | Workbox |
|---|---|---|---|
| Next.js 14 Support | ✅ | ✅ | ⚠️ Manual |
| App Router Support | ✅ | ✅ | ⚠️ |
| Service Worker | ✅ Auto | ✅ Auto | ✅ Manual |
| Offline Caching | ✅ | ✅ | ✅ |
| Config Complexity | Low | Low | High |

**✅ RECOMMENDATION: @ducanh2912/next-pwa v5.6**

---

## 15. Forms & Validation

**✅ React Hook Form v7.53 + Zod v3.23**

Both free, TypeScript-native, excellent integration. Industry standard for Next.js apps.

---

## 16. Charts

**✅ Recharts v2.13** — Free, React-native, best integration with shadcn/ui. PRD-recommended.

---

## 17. Date/Time

**✅ date-fns v4.1** — Free, tree-shakeable, timezone support via date-fns-tz.

---

## 18. Drag & Drop (Itinerary Reordering)

**✅ @dnd-kit/core v6.1 + @dnd-kit/sortable** — Free, accessible, best React DnD library.

---

## 19. Rich Text (Notes/Journal)

**✅ Tiptap v2.9 (Free tier)** — Headless, extensible, great for trip notes and journals.

---

## 20. Deployment

| Criteria | Vercel | Netlify | Cloudflare Pages | Railway |
|---|---|---|---|---|
| Free Tier | ✅ Hobby | ✅ Starter | ✅ Free | ⚠️ Trial $5 |
| Next.js Support | ✅ Native | ✅ | ⚠️ Partial | ✅ |
| Edge Functions | ✅ | ✅ | ✅ | ✅ |
| Preview Deploys | ✅ | ✅ | ✅ | ✅ |
| Bandwidth | 100GB/mo | 100GB/mo | Unlimited | N/A |
| Build Minutes | 6000 min/mo | 300 min/mo | 500 builds/mo | N/A |

**✅ RECOMMENDATION: Vercel (Free Hobby Plan)**

**Rationale:**
- Native Next.js deployment (Vercel built Next.js)
- Generous free tier: 100GB bandwidth, 6000 build minutes
- Automatic preview deployments
- Edge functions for API routes
- Zero configuration deployment
