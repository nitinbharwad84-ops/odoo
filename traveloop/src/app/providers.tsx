/**
 * App Providers Wrapper
 * 
 * Centralized provider tree for the entire application.
 * Wraps the app with:
 * 1. ThemeProvider (next-themes) — Dark mode support
 * 2. QueryClientProvider (TanStack Query) — Server state management
 * 3. PostHog analytics initialization
 * 
 * Usage: Wrap the root layout's {children} with <Providers>
 */

"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { analytics } from "@/lib/analytics";
import { usePathname } from "next/navigation";

/**
 * PostHog Page View Tracker
 * 
 * Tracks page views on route changes for Next.js App Router.
 * PostHog's automatic page view capture doesn't work with App Router,
 * so we manually track navigation events.
 */
function PostHogPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    analytics.pageView();
  }, [pathname]);

  return null;
}

/**
 * Root providers component.
 * Order matters: outer providers are available to inner providers.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  /**
   * TanStack Query Client
   * 
   * Configuration:
   * - staleTime: 60s — Data is considered fresh for 1 minute
   * - gcTime: 5min — Garbage collect unused cache after 5 minutes
   * - retry: 1 — Retry failed requests once (avoid hammering free tier APIs)
   * - refetchOnWindowFocus: false — Don't refetch when tab regains focus (saves API calls)
   */
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0, // Don't retry mutations (user action should be explicit)
          },
        },
      })
  );

  // Initialize PostHog analytics on mount
  useEffect(() => {
    analytics.init();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <PostHogPageViewTracker />
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
