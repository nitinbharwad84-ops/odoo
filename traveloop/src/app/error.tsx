/**
 * Next.js App Router Error Page
 * 
 * Handles runtime errors within the app.
 * This is the error.tsx file at the app root — catches errors
 * from all routes unless a more specific error.tsx exists.
 * 
 * Must be a Client Component.
 */

"use client";

import { useEffect } from "react";
import { captureException } from "@/lib/sentry";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Report to Sentry
    captureException(error, {
      digest: error.digest,
      source: "error.tsx",
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-8">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-3">
        Something went wrong
      </h1>

      <p className="text-muted-foreground text-center max-w-md mb-2">
        We encountered an unexpected error. Our team has been notified and is
        working to fix the issue.
      </p>

      {error.digest && (
        <p className="text-xs text-muted-foreground mb-8">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
        >
          <Home className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  );
}
