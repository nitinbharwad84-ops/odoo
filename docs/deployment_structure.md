# Traveloop — Deployment Structure

**Date:** 2026-05-10 | **Tier:** FREE

---

## Deployment Target: Vercel Hobby + Supabase Free

### Environment Setup

```
Production:   main branch → Vercel auto-deploy → traveloop.vercel.app
Staging:      develop branch → Vercel preview deploy
Preview:      feature/* branches → Vercel preview per PR
Local Dev:    localhost:3000 → Local PostgreSQL + Supabase (remote)
```

### Prerequisites

1. GitHub account (repository host)
2. Vercel account (linked to GitHub)
3. Supabase account (project created)
4. PostgreSQL 16 installed locally
5. Node.js 20 LTS installed
6. Google AI Studio account (Gemini API key)
7. Groq Cloud account (API key)

---

## Step-by-Step Deployment

### 1. Supabase Setup
```bash
# 1. Create project at https://supabase.com/dashboard
# 2. Note: Project URL, Anon Key, Service Role Key
# 3. Run migrations via Supabase SQL Editor (docs/migrations/*.sql)
# 4. Enable Email Auth in Authentication > Providers
# 5. Configure email templates in Authentication > Email Templates
# 6. Create storage bucket "avatars" (public) and "trip-covers" (public)
```

### 2. Local PostgreSQL Setup
```bash
# 1. Install PostgreSQL 16
# 2. Create database
createdb traveloop_local
# 3. Run migrations
psql traveloop_local < docs/migrations/01_initial_schema.sql
psql traveloop_local < docs/migrations/02_authentication.sql
psql traveloop_local < docs/migrations/03_module_features.sql
psql traveloop_local < docs/migrations/04_indexes_and_policies.sql
```

### 3. Project Initialization
```bash
npx -y create-next-app@14.2 ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbo
npm install @supabase/supabase-js@2.46 @supabase/ssr@0.5
npm install prisma@5.22 @prisma/client@5.22
npm install @tanstack/react-query@5.62 zustand@5.0
npm install react-hook-form@7.53 zod@3.23 @hookform/resolvers@3.9
npm install recharts@2.13 leaflet@1.9 react-leaflet@4.2
npm install @dnd-kit/core@6.1 @dnd-kit/sortable@8.0 @dnd-kit/utilities@3.2
npm install @tiptap/react@2.9 @tiptap/starter-kit@2.9
npm install date-fns@4.1 date-fns-tz@3.2 clsx@2.1 tailwind-merge@2.6
npm install framer-motion@11.11 next-themes@0.4 lucide-react@0.454
npm install @ducanh2912/next-pwa@5.6
npm install ai@4.0 @ai-sdk/google@1.0 @ai-sdk/groq@1.0
npm install resend@4.0
npm install -D @types/leaflet vitest@2.1 playwright@1.49 @testing-library/react@16.1
npx shadcn@latest init
```

### 4. Vercel Deployment
```bash
# 1. Push to GitHub
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/<user>/traveloop.git
git push -u origin main

# 2. Connect to Vercel
#    - Go to https://vercel.com/new
#    - Import GitHub repository
#    - Framework: Next.js (auto-detected)
#    - Build command: npm run build (default)
#    - Output directory: .next (default)

# 3. Set environment variables in Vercel dashboard
#    (see docs/.env for full list)

# 4. Deploy triggers automatically on push to main
```

### 5. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run test
      - run: npm run build
```

---

## Scaling Limits (Tier 1 FREE)

| Resource | Limit | Mitigation |
|---|---|---|
| Vercel Bandwidth | 100GB/month | Image optimization, CDN caching |
| Vercel Serverless | 10s execution | Streaming for AI routes |
| Supabase DB | 500MB | Regular cleanup, archive old trips |
| Supabase Storage | 1GB | Image compression before upload |
| Supabase MAU | 50K | N/A for MVP |
| Supabase Edge Functions | 500K/month | Rate limit AI calls |
| Gemini API | 15 RPM | Queue AI requests, user quotas |
| Resend | 100 emails/day | Batch notifications, digest emails |

---

## Monitoring Setup

| Tool | Purpose | Setup |
|---|---|---|
| Sentry | Error tracking | `npm install @sentry/nextjs` → `npx @sentry/wizard@latest -i nextjs` |
| PostHog | Analytics | `npm install posthog-js` → Init in `app/providers.tsx` |
| Vercel Analytics | Web Vitals | Enable in Vercel Dashboard → Analytics tab |
| Supabase Dashboard | DB monitoring | Built-in at supabase.com/dashboard |

---

## Rollback Strategy

1. **Vercel:** Instant rollback to any previous deployment via dashboard
2. **Database:** Manual rollback SQL scripts (maintain `DOWN` migrations)
3. **Feature Flags:** PostHog feature flags to disable features without deploy
