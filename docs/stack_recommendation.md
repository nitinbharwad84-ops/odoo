# Traveloop — Stack Recommendation

**Version:** 1.0
**Date:** 2026-05-10
**Tier:** FREE ($0/month)
**Platform:** Website + PWA (Installable + Offline)

---

## Final Recommended Stack

### Frontend

| Technology | Version | Purpose | License |
|---|---|---|---|
| Next.js | 14.2.x | Framework (App Router) | MIT |
| React | 18.3.x | UI Library | MIT |
| TypeScript | 5.6.x | Type Safety | Apache-2.0 |
| Tailwind CSS | 3.4.x | Utility-first CSS | MIT |
| shadcn/ui | 2.1.x | Component Library | MIT |
| Lucide React | 0.454.x | Icon Library | ISC |
| TanStack Query | 5.62.x | Server State Management | MIT |
| Zustand | 5.0.x | Client State Management | MIT |
| React Hook Form | 7.53.x | Form Management | MIT |
| Zod | 3.23.x | Schema Validation | MIT |
| Recharts | 2.13.x | Charts & Graphs | MIT |
| react-leaflet | 4.2.x | Map Integration | ISC |
| Leaflet | 1.9.x | Map Rendering | BSD-2 |
| @dnd-kit/core | 6.1.x | Drag & Drop | MIT |
| @dnd-kit/sortable | 8.0.x | Sortable Lists | MIT |
| Tiptap | 2.9.x | Rich Text Editor | MIT |
| date-fns | 4.1.x | Date Utilities | MIT |
| date-fns-tz | 3.2.x | Timezone Support | MIT |
| clsx | 2.1.x | Class Utilities | MIT |
| tailwind-merge | 2.6.x | Tailwind Class Merge | MIT |
| Framer Motion | 11.11.x | Animations | MIT |
| next-themes | 0.4.x | Dark Mode | MIT |
| @ducanh2912/next-pwa | 5.6.x | PWA Support | MIT |

### Backend (Next.js API Routes + Supabase)

| Technology | Version | Purpose | License |
|---|---|---|---|
| Next.js API Routes | 14.2.x | API Endpoints | MIT |
| Supabase JS Client | 2.46.x | Supabase SDK | MIT |
| Prisma | 5.22.x | ORM (Dual DB) | Apache-2.0 |
| @prisma/client | 5.22.x | Generated DB Client | Apache-2.0 |

### Database

| Technology | Version | Purpose | Cost |
|---|---|---|---|
| Supabase PostgreSQL | 15.x | Primary Cloud DB | Free (500MB) |
| PostgreSQL (Local) | 16.x | Failover/Offline DB | Free (self-hosted) |
| Supabase Auth | Built-in | Authentication | Free (50K MAU) |
| Supabase Storage | Built-in | File Storage | Free (1GB) |
| Supabase Realtime | Built-in | Real-time Subscriptions | Free tier |

### AI / LLM

| Technology | Version | Purpose | Cost |
|---|---|---|---|
| Google Gemini API | 2.0 Flash | Primary AI (Trip Planning, Budget) | Free (15 RPM, 1M tokens/day) |
| Groq API | Llama 3.1 70B | Fallback AI Provider | Free (30 RPM) |
| AI SDK (Vercel) | 4.0.x | Unified AI Interface | MIT / Free |

### DevOps & Monitoring

| Technology | Version | Purpose | Cost |
|---|---|---|---|
| Vercel | Hobby Plan | Frontend Deployment | Free |
| GitHub Actions | N/A | CI/CD Pipeline | Free (2000 min/mo) |
| Sentry | Free Plan | Error Monitoring | Free (5K errors/mo) |
| PostHog | Cloud Free | Analytics & Feature Flags | Free (1M events/mo) |
| Resend | Free Plan | Transactional Email | Free (100 emails/day) |

### Testing

| Technology | Version | Purpose | License |
|---|---|---|---|
| Vitest | 2.1.x | Unit & Integration Tests | MIT |
| Playwright | 1.49.x | E2E Testing | Apache-2.0 |
| Testing Library | 16.1.x | Component Testing | MIT |

---

## Architecture Decision: Dual Database Failover

```
┌─────────────────────────────────────────────────┐
│                 Next.js App                      │
│              (API Routes + UI)                   │
└────────────────┬────────────────────────────────┘
                 │
         ┌───────▼────────┐
         │  Prisma ORM    │
         │  (Connection   │
         │   Manager)     │
         └───┬────────┬───┘
             │        │
    ┌────────▼──┐  ┌──▼────────┐
    │ Supabase  │  │  Local    │
    │ PostgreSQL│  │ PostgreSQL│
    │ (Primary) │  │ (Failover)│
    └───────────┘  └───────────┘
```

**Strategy:**
1. Supabase is the primary database for all operations
2. Local PostgreSQL maintains a synced replica
3. On Supabase connection failure, Prisma client switches to local PostgreSQL
4. When Supabase reconnects, pending changes sync back
5. Prisma's multi-database support handles connection routing

**Implementation:**
- Custom `DatabaseService` class wrapping Prisma with health checks
- Heartbeat monitoring on Supabase connection (30-second intervals)
- Write-ahead log for offline mutations (stored in IndexedDB for PWA)
- Sync queue processes pending changes on reconnection

---

## PWA Architecture

```
┌─────────────────────────────────────┐
│          Next.js PWA App            │
├─────────────────────────────────────┤
│  Service Worker (@ducanh2912/next-pwa)│
│  ├── Cache Strategy: StaleWhileRevalidate│
│  ├── Offline Page: /offline         │
│  ├── Pre-cached Routes: /, /dashboard│
│  └── Runtime Cache: API responses   │
├─────────────────────────────────────┤
│  IndexedDB (idb-keyval)             │
│  ├── Offline trip data              │
│  ├── Pending mutations queue        │
│  └── Cached search results          │
├─────────────────────────────────────┤
│  Web App Manifest                   │
│  ├── name: "Traveloop"              │
│  ├── display: "standalone"          │
│  ├── theme_color: "#0F172A"         │
│  └── icons: [192px, 512px]          │
└─────────────────────────────────────┘
```

---

## Total Monthly Cost: $0

| Service | Free Tier Limit | Expected MVP Usage |
|---|---|---|
| Vercel Hobby | 100GB bandwidth, 6K build min | ~5GB, ~200 min |
| Supabase Free | 500MB DB, 50K MAU, 1GB storage | ~50MB, ~500 users |
| Google Gemini | 1M tokens/day | ~100K tokens/day |
| Groq | 14.4K tokens/min | Fallback only |
| PostHog Cloud | 1M events/month | ~50K events |
| Sentry Free | 5K errors/month | ~200 errors |
| Resend Free | 100 emails/day | ~20 emails/day |
| GitHub Actions | 2000 min/month | ~100 min |
| **TOTAL** | | **$0/month** |

---

## Upgrade Path (When to Move to Tier 2)

Trigger conditions for paid upgrade:
- Database exceeds 400MB (approaching 500MB limit)
- Monthly active users exceed 40K (approaching 50K limit)
- AI token usage exceeds 800K tokens/day consistently
- Email volume exceeds 80 emails/day consistently
- Error volume exceeds 4K/month consistently

Estimated Tier 2 cost: ~$50-75/month (Supabase Pro $25 + Vercel Pro $20 + Resend Pro $20)
