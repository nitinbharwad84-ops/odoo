/**
 * Auth Middleware
 * 
 * Protects routes under /(authenticated)/ by verifying the Supabase session.
 * Unauthenticated users are redirected to /login.
 * 
 * Route groups:
 * - /(public)/* — No auth required (landing, login, register, etc.)
 * - /(authenticated)/* — Requires valid session (dashboard, trips, etc.)
 * - /(community)/* — Phase 2 (will require auth)
 * - /(admin)/* — Phase 2 (will require auth + admin role)
 * - /api/* — Auth checked per route handler
 * 
 * References: architecture.md → Authentication Flow
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Routes that require authentication.
 * Users without a valid session are redirected to /login.
 */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/notifications",
  "/trips",
  "/search",
  "/ai",
] as const;

/**
 * Routes that authenticated users should NOT access.
 * Logged-in users are redirected to /dashboard.
 */
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
] as const;

export async function middleware(request: NextRequest) {
  // Create a response that we can modify (add/update cookies)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Skip middleware for static assets and API routes
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // Static files (favicon, images, etc.)
  ) {
    return response;
  }

  try {
    // Create Supabase client with cookie handling for middleware
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: Record<string, unknown>) {
            // Set cookie on the request for downstream server components
            request.cookies.set({ name, value, ...options } as Parameters<typeof request.cookies.set>[0]);
            // Set cookie on the response for the browser
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value, ...options } as Parameters<typeof response.cookies.set>[0]);
          },
          remove(name: string, options: Record<string, unknown>) {
            request.cookies.set({ name, value: "", ...options } as Parameters<typeof request.cookies.set>[0]);
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set({ name, value: "", ...options } as Parameters<typeof response.cookies.set>[0]);
          },
        },
      }
    );

    // Refresh the session token (important for keeping sessions alive)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check if the current route requires authentication
    const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
      pathname.startsWith(prefix)
    );

    // Check if the current route is an auth-only route (login, register, etc.)
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      pathname.startsWith(route)
    );

    // Redirect unauthenticated users away from protected routes
    if (isProtectedRoute && !user) {
      const redirectUrl = new URL("/login", request.url);
      // Preserve the intended destination for post-login redirect
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect authenticated users away from auth routes (no need to see login page)
    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch {
    // If Supabase is unreachable, allow the request to proceed
    // The page-level error boundary will handle the display
    return response;
  }
}

/**
 * Middleware matcher configuration.
 * Excludes static assets and Next.js internals for performance.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (browser icon)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
