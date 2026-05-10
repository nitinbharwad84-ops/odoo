import withPWAInit from "@ducanh2912/next-pwa";

/**
 * PWA Configuration
 * - Generates service worker for offline support
 * - Caches static assets and API responses
 * - Disabled in development to avoid caching issues
 */
const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  // Fallback to offline page when network is unavailable
  fallbacks: {
    document: "/offline",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Image Optimization
   * - Allow Supabase storage domain for user avatars and trip covers
   * - Allow Unsplash for destination imagery (future)
   */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Optimize image loading for travel imagery
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Security Headers
   * Applied to all routes for production-grade security
   * References: architecture.md → Security Architecture
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME-type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Enable XSS protection in older browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Control referrer information sent with requests
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser features and APIs
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), browsing-topics=()",
          },
          // Enforce HTTPS for 1 year
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com https://*.sentry.io",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://*.tile.openstreetmap.org",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.posthog.com https://*.sentry.io https://generativelanguage.googleapis.com https://api.groq.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  /**
   * Experimental features
   * - Server actions enabled for form mutations
   * - Typed routes for type-safe navigation
   */
  experimental: {
    typedRoutes: true,
  },

  // Suppress hydration warnings from browser extensions
  reactStrictMode: true,

  // Output standalone for optimized Docker/serverless deploys
  output: "standalone",
};

export default withPWA(nextConfig);
