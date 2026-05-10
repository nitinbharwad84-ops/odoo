/**
 * PWA Offline Fallback Page
 * 
 * Displayed when the user is offline and the requested page
 * is not available in the service worker cache.
 * 
 * The PWA service worker (configured in next.config.mjs) falls back
 * to this page when network requests fail and no cached version exists.
 */

import { WifiOff, RefreshCw, Plane } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      {/* Animated plane icon */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-muted">
          <WifiOff className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <Plane className="h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <h1 className="text-3xl font-bold text-foreground mb-3">
        You&apos;re offline
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-md mb-2">
        It looks like you&apos;ve lost your connection. Don&apos;t worry —
        your trip data is saved locally.
      </p>
      <p className="text-sm text-muted-foreground text-center max-w-md mb-8">
        Reconnect to the internet to sync your latest changes and access
        all features.
      </p>

      {/* Retry button */}
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Try again
      </button>

      {/* Connection tips */}
      <div className="mt-12 p-6 rounded-lg border border-border bg-card max-w-md w-full">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Things you can try:
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Check your Wi-Fi or mobile data connection
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Try turning airplane mode off and on
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Move closer to a Wi-Fi access point
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Previously viewed trips are available offline
          </li>
        </ul>
      </div>
    </div>
  );
}
