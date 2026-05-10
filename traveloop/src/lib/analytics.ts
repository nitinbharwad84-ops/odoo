/**
 * PostHog Analytics Configuration
 * 
 * Integrates PostHog Cloud Free (1M events/month) for:
 * - Page view tracking
 * - Custom event tracking (trip created, AI used, etc.)
 * - Feature flags (for gradual rollouts)
 * - User identification (after auth)
 * 
 * Usage:
 *   import { analytics } from '@/lib/analytics';
 *   analytics.capture('trip_created', { tripType: 'solo' });
 */

import posthog from "posthog-js";

/**
 * PostHog client configuration type
 */
export interface AnalyticsClient {
  /** Initialize PostHog — call once on app mount */
  init: () => void;
  /** Track a custom event */
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
  /** Identify a user after authentication */
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  /** Reset user identity on logout */
  reset: () => void;
  /** Track a page view */
  pageView: () => void;
  /** Check if a feature flag is enabled */
  isFeatureEnabled: (flagKey: string) => boolean;
}

/**
 * Analytics singleton.
 * All methods are safe to call even when PostHog is not configured —
 * they will no-op gracefully in development or when API key is missing.
 */
export const analytics: AnalyticsClient = {
  /**
   * Initialize PostHog SDK.
   * Should be called once in the PostHogProvider component.
   */
  init() {
    // Only initialize in browser environment
    if (typeof window === "undefined") return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[Analytics] NEXT_PUBLIC_POSTHOG_KEY not set. Analytics disabled."
        );
      }
      return;
    }

    posthog.init(apiKey, {
      api_host: apiHost,
      // Capture page views automatically via Next.js router events
      capture_pageview: false, // We handle this manually for App Router
      capture_pageleave: true,
      // Respect Do Not Track browser setting
      respect_dnt: true,
      // Disable session recording to stay within free tier
      disable_session_recording: true,
      // Persistence: Use localStorage for session tracking
      persistence: "localStorage+cookie",
      // Only load in production to avoid polluting analytics data
      loaded: (posthogInstance) => {
        if (process.env.NODE_ENV === "development") {
          // Disable in development
          posthogInstance.opt_out_capturing();
        }
      },
    });
  },

  /**
   * Track a custom event.
   * 
   * @example
   *   analytics.capture('trip_created', { tripType: 'solo', budget: 50000 });
   */
  capture(eventName: string, properties?: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    try {
      posthog.capture(eventName, properties);
    } catch (error) {
      console.warn("[Analytics] Failed to capture event:", error);
    }
  },

  /**
   * Identify a user after authentication.
   * Links all subsequent events to this user ID.
   * 
   * @example
   *   analytics.identify(user.id, { email: user.email, plan: 'free' });
   */
  identify(userId: string, traits?: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    try {
      posthog.identify(userId, traits);
    } catch (error) {
      console.warn("[Analytics] Failed to identify user:", error);
    }
  },

  /**
   * Reset user identity on logout.
   * Generates a new anonymous ID for subsequent events.
   */
  reset() {
    if (typeof window === "undefined") return;
    try {
      posthog.reset();
    } catch (error) {
      console.warn("[Analytics] Failed to reset identity:", error);
    }
  },

  /**
   * Track a page view manually.
   * Required for Next.js App Router since automatic capture is disabled.
   */
  pageView() {
    if (typeof window === "undefined") return;
    try {
      posthog.capture("$pageview");
    } catch (error) {
      console.warn("[Analytics] Failed to capture page view:", error);
    }
  },

  /**
   * Check if a feature flag is enabled for the current user.
   * Used for gradual feature rollouts via PostHog Feature Flags.
   */
  isFeatureEnabled(flagKey: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      return posthog.isFeatureEnabled(flagKey) ?? false;
    } catch {
      return false;
    }
  },
};
