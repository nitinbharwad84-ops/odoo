# M13 Plan — AI Services Module

## MODULE SPECIFICATION
AI Trip Planner, Budget Predictor, Packing Generator. See `docs/module_prds/M13.md`.

## AGENT ASSIGNMENT
- **Agent:** Antigravity | **Reason:** Complex AI orchestration, prompt engineering, multi-provider failover, streaming

## FILE ATTACHMENTS NEEDED
1. `docs/master_prd.md`, 2. `docs/architecture.md`, 3. `docs/stack_recommendation.md`

## READY-TO-COPY PROMPT

> **Role:** AI/ML Engineer + Full-Stack Developer
>
> **Task:** Build the AI services module for Traveloop: AI Trip Planner (generate full itineraries from natural language), AI Budget Predictor (estimate costs), AI Packing Generator (contextual packing lists). Use Google Gemini as primary, Groq as fallback. Implement structured JSON outputs, streaming, rate limiting, usage logging.
>
> **Context:**
> - **Tech Stack:** Next.js 14.2, TypeScript 5.6, Vercel AI SDK 4.0 (`ai` package), @ai-sdk/google 1.0 (Gemini), @ai-sdk/groq 1.0, Zod 3.23
> - **AI Providers:** Google Gemini 2.0 Flash (primary, free), Groq Llama 3.1 70B (fallback, free)
> - **Database:** `ai_usage_logs` (track every AI call), `trips`/`trip_stops`/`trip_activities`/`budgets`/`packing_items` (write on accept)
> - **API:** POST /api/v1/ai/plan-trip, POST /api/v1/ai/budget, POST /api/v1/ai/packing
> - **Rate Limit:** 10 AI calls/day per user on free tier
> - **Dependencies:** M1, M2, M5, M6, M8, M9
>
> **Specific Instructions:**
> - Create AI service: `src/services/ai.service.ts` with provider routing and failover
> - Create AI gateway: `src/lib/ai/gateway.ts` with rate limiting, quota checks, usage logging
> - Create prompt templates: `src/lib/ai/prompts/trip-planner.ts`, `budget-predictor.ts`, `packing-generator.ts`
> - Prompt architecture: 4 layers (safety → system → context → user)
> - **AI Trip Planner:**
>   - Input: destination, duration, traveler_count, budget, trip_style, preferences (optional)
>   - Output Zod schema: { trip_title, destinations[], days[{ day, city, activities[{ title, description, category, estimated_cost, duration }] }], estimated_budget{}, assumptions[], warnings[] }
>   - UX: prompt form → loading with streaming text → review generated plan → accept/regenerate → convert to editable trip (creates trip + stops + activities)
>   - Page: `/ai/plan-trip`
> - **AI Budget Predictor:**
>   - Input: destinations, traveler_count, duration, trip_style, season
>   - Output: { categories[{ name, estimated_amount, reasoning }], total, warnings[] }
>   - Page: `/ai/budget`
> - **AI Packing Generator:**
>   - Input: destination, season, duration, traveler_type, trip_type
>   - Output: { categories[{ name, items[] }] }
>   - Page: `/ai/packing`
> - Failover: Gemini timeout/error → retry once → switch to Groq → graceful error
> - Validate all AI outputs with Zod before rendering
> - Log every AI call to ai_usage_logs (user_id, feature, model, tokens, cost, latency, success)
> - Error handling: timeout (30s max), rate limit exceeded, invalid JSON, provider outage
> - Do NOT use OpenAI (paid only)
>
> **Output Requirements:**
> - Production-ready, structured outputs, failover tested, rate limiting, usage logging, all 3 AI features functional
