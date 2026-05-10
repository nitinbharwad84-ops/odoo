/**
 * 404 Not Found Page
 * 
 * Displayed when a user navigates to a route that doesn't exist.
 * Provides helpful navigation options to get back on track.
 */

import Link from "next/link";
import { MapPinOff, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      {/* Icon */}
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-8">
        <MapPinOff className="h-12 w-12 text-primary" />
      </div>

      {/* Content */}
      <h1 className="text-4xl font-bold text-foreground mb-3">
        Lost in transit
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-md mb-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved to
        a different destination.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Error 404 — Page not found
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Home className="h-4 w-4" />
          Go to Dashboard
        </Link>

        <Link
          href="/search/destinations"
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
        >
          <Search className="h-4 w-4" />
          Search Destinations
        </Link>
      </div>

      {/* Back link — using JS history.back is not available in server components,
         so we simply provide a dashboard link as the primary action above */}
    </div>
  );
}
