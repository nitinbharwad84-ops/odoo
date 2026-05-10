/**
 * Sentry Error Monitoring Configuration
 * 
 * Integrates Sentry Free plan (5K errors/month) for:
 * - Runtime error tracking
 * - Unhandled promise rejections
 * - Performance monitoring (transactions)
 * 
 * Setup: Run `npx @sentry/wizard@latest -i nextjs` for full integration,
 * or use this manual configuration.
 * 
 * Usage:
 *   import { captureException, captureMessage } from '@/lib/sentry';
 */

import * as Sentry from "@sentry/nextjs";

/**
 * Initialize Sentry SDK.
 * Called once in the app lifecycle (via instrumentation or providers).
 */
export function initSentry(): void {
  // Skip initialization if DSN is not configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Sentry] NEXT_PUBLIC_SENTRY_DSN not set. Error monitoring disabled."
      );
    }
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Environment tagging for filtering in Sentry dashboard
    environment: process.env.NODE_ENV,

    /**
     * Performance Monitoring
     * - Sample 10% of transactions in production to stay within free tier
     * - Sample 100% in development for debugging
     */
    tracesSampleRate:
      process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    /**
     * Session Replay (disabled to stay within free tier limits)
     * Enable when upgrading to Sentry paid plan.
     */
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,

    // Filter out noisy browser extension errors
    ignoreErrors: [
      // Browser extension errors
      "ResizeObserver loop",
      "Non-Error promise rejection captured",
      // Next.js navigation errors (expected behavior)
      "NEXT_NOT_FOUND",
      "NEXT_REDIRECT",
    ],

    // Only send errors in production
    enabled: process.env.NODE_ENV === "production",

    // Release tracking for source maps
    release: process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0",
  });
}

/**
 * Capture an exception and send it to Sentry.
 * Wraps Sentry.captureException with a type-safe interface.
 */
export function captureException(
  error: Error | unknown,
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    console.error("[Sentry] Exception:", error, context);
  }

  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Capture a message (non-error event) and send it to Sentry.
 * Useful for tracking important business events or warnings.
 */
export function captureMessage(
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Sentry] ${level}: ${message}`, context);
  }

  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
}

/**
 * Set user context for Sentry error reports.
 * Call this after successful authentication.
 */
export function setUser(user: { id: string; email: string } | null): void {
  if (user) {
    Sentry.setUser({ id: user.id, email: user.email });
  } else {
    Sentry.setUser(null);
  }
}
