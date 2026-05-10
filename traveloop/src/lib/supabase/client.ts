/**
 * Supabase Browser Client
 * 
 * Creates a Supabase client for use in Client Components (browser).
 * Uses the anon key for public-facing operations.
 * Auth state is managed via cookies through @supabase/ssr.
 * 
 * Usage:
 *   import { createBrowserClient } from '@/lib/supabase/client';
 *   const supabase = createBrowserClient();
 */

import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

/**
 * Create a Supabase client for browser/client-side usage.
 * 
 * Features:
 * - Auto-refreshes JWT tokens
 * - Persists session in cookies (for SSR compatibility)
 * - Uses the anon (public) key — RLS policies enforce access control
 * 
 * @returns Typed Supabase client instance
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createSupabaseBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );
}
