# Traveloop — System Architecture

**Version:** 1.0 | **Date:** 2026-05-10

---

## System Overview

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENTS                                │
│  Browser (Desktop/Mobile) ←→ PWA Service Worker           │
└─────────────────────┬────────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼────────────────────────────────────┐
│              VERCEL (Hobby Plan)                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │            Next.js 14 App Router                     │ │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────────┐ │ │
│  │  │  Pages   │  │   API    │  │  Server Actions    │ │ │
│  │  │  (SSR/   │  │  Routes  │  │  (Mutations)       │ │ │
│  │  │   SSG)   │  │  /api/v1 │  │                    │ │ │
│  │  └──────────┘  └────┬─────┘  └────────┬───────────┘ │ │
│  └──────────────────────┼────────────────┼─────────────┘ │
└─────────────────────────┼────────────────┼───────────────┘
                          │                │
          ┌───────────────▼────────────────▼──────────┐
          │         SERVICE LAYER (lib/services/)      │
          │  ┌────────┐ ┌──────┐ ┌──────┐ ┌────────┐ │
          │  │  Auth  │ │ Trip │ │  AI  │ │ Budget │ │
          │  │Service │ │Svc   │ │Svc   │ │Svc     │ │
          │  └───┬────┘ └──┬───┘ └──┬───┘ └───┬────┘ │
          │      │         │        │          │      │
          │  ┌───▼─────────▼────────▼──────────▼───┐  │
          │  │      DatabaseService (Prisma)        │  │
          │  │    (Connection Manager + Failover)    │  │
          │  └───┬──────────────────────┬───────────┘  │
          └──────┼──────────────────────┼──────────────┘
                 │                      │
     ┌───────────▼──────┐   ┌──────────▼──────────┐
     │   SUPABASE FREE  │   │  LOCAL POSTGRESQL   │
     │   (Primary)      │   │  (Failover)         │
     │  ├─ PostgreSQL 15│   │  PostgreSQL 16      │
     │  ├─ Auth         │   └─────────────────────┘
     │  ├─ Storage (1GB)│
     │  ├─ Realtime     │
     │  └─ Edge Funcs   │
     └──────────────────┘

          EXTERNAL SERVICES (Free Tiers)
     ┌──────────┐ ┌──────┐ ┌────────┐ ┌───────┐
     │ Gemini   │ │ Groq │ │PostHog │ │Sentry │
     │ AI API   │ │ API  │ │Analytics│ │Errors │
     └──────────┘ └──────┘ └────────┘ └───────┘
```

---

## Frontend Architecture

### Route Structure

```
app/
├── (public)/
│   ├── page.tsx                    # Landing page
│   ├── about/page.tsx
│   ├── pricing/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── reset-password/page.tsx
├── (authenticated)/
│   ├── dashboard/page.tsx
│   ├── profile/
│   │   ├── page.tsx
│   │   └── edit/page.tsx
│   ├── settings/
│   │   ├── page.tsx
│   │   ├── account/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── preferences/page.tsx
│   ├── notifications/page.tsx
│   ├── trips/
│   │   ├── page.tsx                # My Trips
│   │   ├── new/page.tsx
│   │   └── [tripId]/
│   │       ├── page.tsx            # Trip Detail
│   │       ├── edit/page.tsx
│   │       ├── itinerary/page.tsx
│   │       ├── budget/page.tsx
│   │       ├── packing/page.tsx
│   │       ├── notes/page.tsx
│   │       ├── share/page.tsx
│   │       └── collaborators/page.tsx
│   ├── search/
│   │   ├── destinations/page.tsx
│   │   └── activities/page.tsx
│   └── ai/
│       ├── plan-trip/page.tsx
│       ├── budget/page.tsx
│       └── packing/page.tsx
├── (community)/                    # Phase 2
│   ├── community/
│   │   ├── feed/page.tsx
│   │   ├── templates/page.tsx
│   │   └── users/[userId]/page.tsx
│   └── shared/[tripId]/page.tsx
├── (admin)/                        # Phase 2
│   └── admin/
│       ├── page.tsx
│       ├── users/page.tsx
│       ├── moderation/page.tsx
│       └── analytics/page.tsx
├── api/
│   └── v1/
│       ├── auth/
│       ├── trips/
│       ├── stops/
│       ├── activities/
│       ├── budget/
│       ├── packing/
│       ├── notes/
│       ├── collaboration/
│       ├── sharing/
│       ├── notifications/
│       └── ai/
├── layout.tsx
├── manifest.ts                     # PWA manifest
└── offline/page.tsx                # PWA offline page
```

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Shell, Sidebar, Header, Footer
│   └── shared/             # Reusable composed components
├── features/
│   ├── auth/               # Auth components, hooks, schemas
│   ├── profile/
│   ├── dashboard/
│   ├── trips/
│   ├── itinerary/
│   ├── search/
│   ├── budget/
│   ├── packing/
│   ├── notes/
│   ├── collaboration/
│   ├── sharing/
│   ├── ai/
│   └── notifications/
├── hooks/                  # Shared custom hooks
├── lib/
│   ├── supabase/           # Supabase client (browser + server)
│   ├── prisma/             # Prisma client + failover logic
│   ├── ai/                 # AI provider clients
│   └── utils.ts            # Shared utilities
├── services/               # Business logic services
│   ├── auth.service.ts
│   ├── trip.service.ts
│   ├── itinerary.service.ts
│   ├── search.service.ts
│   ├── budget.service.ts
│   ├── packing.service.ts
│   ├── notes.service.ts
│   ├── collaboration.service.ts
│   ├── sharing.service.ts
│   ├── notification.service.ts
│   ├── ai.service.ts
│   └── database.service.ts # Dual DB failover manager
├── stores/                 # Zustand stores
├── types/                  # TypeScript type definitions
├── schemas/                # Zod validation schemas
├── constants/              # App constants and enums
└── assets/                 # Static assets
```

---

## Database Schema (Full SQL)

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','suspended','deleted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);
```

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  city VARCHAR(100),
  country VARCHAR(100),
  language VARCHAR(10) DEFAULT 'en',
  travel_preferences JSONB DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{"email":true,"push":false,"in_app":true}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
```

### trips
```sql
CREATE TABLE trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  start_date DATE,
  end_date DATE,
  traveler_count INTEGER DEFAULT 1 CHECK (traveler_count > 0),
  budget_target NUMERIC(12,2),
  currency VARCHAR(3) DEFAULT 'INR',
  trip_type VARCHAR(20) DEFAULT 'solo' CHECK (trip_type IN ('solo','family','group','honeymoon','business','adventure','luxury','budget')),
  privacy VARCHAR(20) DEFAULT 'private' CHECK (privacy IN ('private','shared','public')),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft','active','completed','archived')),
  transport_preference VARCHAR(30),
  accommodation_preference VARCHAR(30),
  origin_city VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### trip_stops
```sql
CREATE TABLE trip_stops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city_name VARCHAR(100) NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  arrival_date DATE,
  departure_date DATE,
  timezone VARCHAR(50),
  order_index INTEGER NOT NULL DEFAULT 0,
  notes TEXT,
  estimated_transport_cost NUMERIC(10,2),
  estimated_transport_time INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### activities
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_source_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(30) CHECK (category IN ('sightseeing','cultural','nightlife','food','adventure','shopping','family','nature','wellness','local_experiences')),
  location_json JSONB,
  estimated_cost NUMERIC(10,2),
  estimated_duration INTEGER,
  rating NUMERIC(3,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### trip_activities
```sql
CREATE TABLE trip_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_stop_id UUID NOT NULL REFERENCES trip_stops(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  title VARCHAR(255),
  description TEXT,
  day_number INTEGER,
  time_slot VARCHAR(20),
  custom_notes TEXT,
  custom_cost NUMERIC(10,2),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### budgets
```sql
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  category VARCHAR(30) NOT NULL CHECK (category IN ('flights','accommodation','food','activities','local_transport','shopping','insurance','emergency','miscellaneous')),
  estimated_amount NUMERIC(12,2) DEFAULT 0,
  actual_amount NUMERIC(12,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'INR',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### packing_items
```sql
CREATE TABLE packing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(30) CHECK (category IN ('clothing','electronics','documents','hygiene','medicine','accessories','travel_gear')),
  packed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### notes
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  note_type VARCHAR(20) DEFAULT 'general' CHECK (note_type IN ('general','daily','reminder','hotel','contact','emergency','journal')),
  linked_day INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### collaborators
```sql
CREATE TABLE collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  role VARCHAR(10) NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner','editor','viewer')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','accepted','declined','removed')),
  invited_by UUID REFERENCES users(id),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trip_id, user_id)
);
```

### shared_links
```sql
CREATE TABLE shared_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  token VARCHAR(64) UNIQUE NOT NULL,
  visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public','invite_only','password_protected')),
  password_hash TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### community_posts
```sql
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  trip_id UUID NOT NULL REFERENCES trips(id),
  content TEXT,
  visibility VARCHAR(20) DEFAULT 'public',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### comments
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### likes
```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);
```

### followers
```sql
CREATE TABLE followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES users(id),
  following_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
```

### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  notification_type VARCHAR(30) NOT NULL,
  payload JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ai_usage_logs
```sql
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  feature VARCHAR(30) NOT NULL,
  model VARCHAR(50) NOT NULL,
  prompt_tokens INTEGER DEFAULT 0,
  completion_tokens INTEGER DEFAULT 0,
  cost NUMERIC(8,6) DEFAULT 0,
  latency_ms INTEGER DEFAULT 0,
  success BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free','pro','team')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active','cancelled','expired')),
  billing_provider VARCHAR(30),
  renewal_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  resource_type VARCHAR(30) NOT NULL,
  resource_id UUID,
  payload JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Endpoints

### Auth — `/api/v1/auth/`
| Method | Endpoint | Description |
|---|---|---|
| POST | /register | User registration |
| POST | /login | User login |
| POST | /logout | User logout |
| POST | /forgot-password | Send reset email |
| POST | /reset-password | Reset password with token |
| GET | /me | Get current user session |

### Profile — `/api/v1/profile/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | Get current user profile |
| PATCH | / | Update profile |
| POST | /avatar | Upload avatar |

### Trips — `/api/v1/trips/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | List user's trips |
| POST | / | Create new trip |
| GET | /:id | Get trip by ID |
| PATCH | /:id | Update trip |
| DELETE | /:id | Delete trip |
| POST | /:id/duplicate | Duplicate trip |
| POST | /:id/archive | Archive trip |

### Itinerary — `/api/v1/trips/:tripId/`
| Method | Endpoint | Description |
|---|---|---|
| GET | /stops | List trip stops |
| POST | /stops | Add trip stop |
| PATCH | /stops/:stopId | Update stop |
| DELETE | /stops/:stopId | Remove stop |
| POST | /stops/:stopId/activities | Add activity to stop |
| PATCH | /activities/:actId | Update activity |
| DELETE | /activities/:actId | Remove activity |
| PATCH | /stops/reorder | Reorder stops |

### Budget — `/api/v1/trips/:tripId/budget/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | Get trip budget |
| POST | / | Create budget categories |
| PATCH | /:budgetId | Update budget entry |

### Packing — `/api/v1/trips/:tripId/packing/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | Get packing list |
| POST | / | Add packing item |
| PATCH | /:itemId | Toggle packed / edit |
| DELETE | /:itemId | Remove item |

### Notes — `/api/v1/trips/:tripId/notes/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | Get trip notes |
| POST | / | Create note |
| PATCH | /:noteId | Update note |
| DELETE | /:noteId | Delete note |

### Collaboration — `/api/v1/trips/:tripId/`
| Method | Endpoint | Description |
|---|---|---|
| POST | /invite | Invite collaborator |
| GET | /collaborators | List collaborators |
| PATCH | /collaborators/:collabId | Update role |
| DELETE | /collaborators/:collabId | Remove collaborator |

### Sharing — `/api/v1/trips/:tripId/share/`
| Method | Endpoint | Description |
|---|---|---|
| POST | / | Generate share link |
| GET | /:token | Access shared trip |
| DELETE | /:linkId | Revoke share link |
| POST | /:token/duplicate | Duplicate shared trip |

### Search — `/api/v1/search/`
| Method | Endpoint | Description |
|---|---|---|
| GET | /destinations | Search destinations |
| GET | /activities | Search activities |

### Notifications — `/api/v1/notifications/`
| Method | Endpoint | Description |
|---|---|---|
| GET | / | List user notifications |
| PATCH | /:id/read | Mark as read |
| POST | /read-all | Mark all as read |

### AI — `/api/v1/ai/`
| Method | Endpoint | Description |
|---|---|---|
| POST | /plan-trip | Generate AI itinerary |
| POST | /budget | AI budget estimation |
| POST | /packing | AI packing list generation |

---

## Authentication Flow

```
SIGNUP:
  User → POST /api/v1/auth/register
       → Supabase Auth signUp()
       → Email verification sent
       → User clicks verification link
       → Profile record created in profiles table
       → Redirect to /dashboard

LOGIN:
  User → POST /api/v1/auth/login
       → Supabase Auth signInWithPassword()
       → Session cookie set (HTTP-only, Secure, SameSite=Lax)
       → last_login_at updated
       → Redirect to /dashboard

PASSWORD RESET:
  User → POST /api/v1/auth/forgot-password
       → Supabase Auth resetPasswordForEmail()
       → Email with reset link sent
       → User clicks link → /reset-password?token=xxx
       → POST /api/v1/auth/reset-password
       → Password updated
```

---

## Dual Database Failover Architecture

```
┌─────────────────────────────────────────┐
│         DatabaseService                  │
│  ┌───────────────────────────────────┐  │
│  │     Health Monitor                 │  │
│  │  - Ping Supabase every 30s        │  │
│  │  - Track connection state          │  │
│  │  - Emit failover events           │  │
│  └──────────┬────────────────────────┘  │
│             │                            │
│  ┌──────────▼────────────────────────┐  │
│  │     Connection Router              │  │
│  │  - IF supabase_healthy → primary   │  │
│  │  - IF supabase_down → local PG     │  │
│  │  - Queue writes for sync           │  │
│  └──────────┬───────────┬────────────┘  │
│             │           │                │
│  ┌──────────▼──┐  ┌────▼─────────────┐ │
│  │  Prisma     │  │  Prisma          │ │
│  │  Client     │  │  Client          │ │
│  │  (Supabase) │  │  (Local PG)      │ │
│  └─────────────┘  └──────────────────┘ │
│                                          │
│  ┌───────────────────────────────────┐  │
│  │     Sync Queue                     │  │
│  │  - Store offline mutations         │  │
│  │  - Replay on reconnection          │  │
│  │  - Conflict resolution (LWW)       │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Conflict Resolution:** Last-Write-Wins (LWW) with `updated_at` timestamp comparison.

---

## Security Architecture

1. **Authentication:** Supabase Auth (JWT + refresh tokens, HTTP-only cookies)
2. **Authorization:** Row Level Security (RLS) on Supabase + server-side RBAC checks
3. **Input Validation:** Zod schemas on all API endpoints
4. **CSRF Protection:** SameSite cookies + CSRF tokens
5. **Rate Limiting:** Vercel Edge middleware (100 req/min per IP for API, 10 req/min for AI)
6. **File Upload:** MIME validation, 5MB limit, image-only for avatars/covers
7. **AI Security:** Prompt isolation, input sanitization, per-user quotas (10 AI calls/day free)
8. **Secrets:** Environment variables only (Vercel + .env.local)
9. **Headers:** Strict CSP, X-Frame-Options, X-Content-Type-Options
10. **Audit:** All destructive actions logged to audit_logs table
