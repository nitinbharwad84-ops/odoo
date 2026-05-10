/**
 * Global Loading Component
 * 
 * Displayed as a loading skeleton while page content loads.
 * Used by Next.js App Router automatically for loading states.
 */

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
