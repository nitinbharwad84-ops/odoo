/**
 * Supabase Server Client
 * 
 * Creates a Supabase client for use in Server Components, API Routes,
 * and Server Actions. Uses cookies for session management via @supabase/ssr.
 * 
 * Usage:
 *   import { createServerClient } from '@/lib/supabase/server';
 *   const supabase = await createServerClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 */

import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

/**
 * Create a Supabase client for server-side usage.
 * 
 * This function:
 * 1. Reads auth cookies from the request
 * 2. Creates a typed Supabase client with cookie-based session
 * 3. Sets appropriate cookie options (HttpOnly, Secure, SameSite)
 * 
 * Must be called in an async context (Server Components, Route Handlers, etc.)
 * 
 * @returns Typed Supabase client instance with server-side cookie management
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Get a cookie value by name.
         * Used by Supabase to read the auth session token.
         */
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        /**
         * Set a cookie with secure defaults.
         * Used by Supabase to persist/refresh the auth session.
         */
        set(name: string, value: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              // Security: HttpOnly prevents XSS access to auth tokens
              httpOnly: true,
              // Security: Secure ensures cookies only sent over HTTPS
              secure: process.env.NODE_ENV === "production",
              // Security: SameSite=Lax prevents CSRF while allowing navigation
              sameSite: "lax" as const,
              // Path: Available across the entire application
              path: "/",
            });
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },

        /**
         * Remove a cookie by setting it to empty with immediate expiry.
         * Used by Supabase during logout to clear the session.
         */
        remove(name: string, options: Record<string, unknown>) {
          try {
            cookieStore.set({
              name,
              value: "",
              ...options,
              maxAge: 0,
              path: "/",
            });
          } catch {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}

/**
 * Create a Supabase admin client with the service role key.
 * 
 * ⚠️ WARNING: This bypasses RLS policies. Only use for:
 * - Server-side admin operations
 * - Background jobs
 * - Webhook handlers
 * 
 * NEVER expose the service role key to the client.
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
      "This is required for admin operations."
    );
  }

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        // Admin client doesn't use cookie-based auth
        get() { return undefined; },
        set() { /* no-op */ },
        remove() { /* no-op */ },
      },
    }
  );
}
