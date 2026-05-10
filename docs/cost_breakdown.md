# Traveloop — Cost Breakdown

**Date:** 2026-05-10

---

## Tier 1: FREE ($0/month) — Current Selection

| Service | Plan | Monthly Cost | Limits |
|---|---|---|---|
| Vercel | Hobby | $0 | 100GB bandwidth, 6K build min, 1 project member |
| Supabase | Free | $0 | 500MB DB, 1GB storage, 50K MAU, 500K edge funcs |
| Local PostgreSQL | Self-hosted | $0 | Unlimited (local machine) |
| Google Gemini API | Free | $0 | 15 RPM, 1M tokens/day (Gemini 2.0 Flash) |
| Groq API | Free | $0 | 30 RPM, 14.4K tokens/min (Llama 3.1) |
| PostHog | Cloud Free | $0 | 1M events/month, 5K session replays |
| Sentry | Free | $0 | 5K errors/month, 10K transactions |
| Resend | Free | $0 | 100 emails/day, 3K emails/month |
| GitHub | Free | $0 | Unlimited repos, 2K Actions minutes/month |
| Leaflet + OSM | Free | $0 | Unlimited map tiles |
| Domain (optional) | N/A | $0 | Use *.vercel.app subdomain |
| **TOTAL** | | **$0/month** | |

**Capacity:** ~500 active users, ~50 AI generations/day, ~3K emails/month

**When to upgrade:** When any single limit reaches 80% capacity.

---

## Tier 2: LITTLE BUDGET (~$70/month)

| Service | Plan | Monthly Cost | Limits |
|---|---|---|---|
| Vercel | Pro | $20 | 1TB bandwidth, unlimited build min |
| Supabase | Pro | $25 | 8GB DB, 100GB storage, unlimited MAU |
| Google Gemini API | Pay-as-you-go | ~$5 | ~5M tokens/day |
| PostHog | Cloud Free | $0 | 1M events/month |
| Sentry | Team | $0 | 50K errors/month |
| Resend | Pro | $20 | 50K emails/month |
| Domain | Custom | ~$1 | .com domain amortized |
| **TOTAL** | | **~$71/month** | |

**Capacity:** ~5K active users, ~500 AI generations/day

---

## Tier 3: PAID (~$350+/month)

| Service | Plan | Monthly Cost | Limits |
|---|---|---|---|
| Vercel | Pro | $20 | 1TB bandwidth |
| Supabase | Pro + Compute | $75 | Dedicated compute, 50GB DB |
| Managed Redis | Upstash Pro | $10 | Rate limiting, caching |
| Google Gemini API | Pay-as-you-go | ~$50 | Heavy AI usage |
| OpenAI API | Pay-as-you-go | ~$100 | Premium AI tier (GPT-4o) |
| PostHog | Scale | $0-50 | 1M+ events |
| Sentry | Business | $26 | 100K errors |
| Resend | Business | $40 | 100K emails |
| Cloudflare | Pro | $20 | CDN, WAF, DDoS |
| Domain | Custom | $1 | .com |
| **TOTAL** | | **~$392/month** | |

**Capacity:** ~50K active users, enterprise-grade

---

## Upgrade Trigger Matrix

| Metric | Tier 1 Limit | Upgrade to Tier 2 When |
|---|---|---|
| Database size | 500MB | Exceeds 400MB |
| Monthly active users | 50K | Exceeds 40K |
| Daily emails | 100 | Exceeds 80 |
| AI tokens/day | 1M | Exceeds 800K |
| Storage | 1GB | Exceeds 800MB |
| Errors/month | 5K | Exceeds 4K |
