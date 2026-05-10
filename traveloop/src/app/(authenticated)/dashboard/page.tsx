/**
 * Dashboard Page (Placeholder)
 * 
 * Foundation placeholder — full dashboard UI will be built in M4.
 * This page is protected by auth middleware.
 */

import type { Metadata } from "next";
import { Map, Plus, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your travel planning hub — manage trips, view stats, and plan new adventures.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, Traveler! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to plan your next adventure?
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "New Trip",
            description: "Start planning a new adventure",
            icon: Plus,
            href: "/trips/new",
            color: "bg-primary/10 text-primary",
          },
          {
            title: "AI Planner",
            description: "Let AI plan your trip",
            icon: Sparkles,
            href: "/ai/plan-trip",
            color: "bg-purple-500/10 text-purple-500",
          },
          {
            title: "My Trips",
            description: "View and manage your trips",
            icon: Map,
            href: "/trips",
            color: "bg-emerald-500/10 text-emerald-500",
          },
          {
            title: "Stats",
            description: "Your travel statistics",
            icon: TrendingUp,
            href: "/profile",
            color: "bg-orange-500/10 text-orange-500",
          },
        ].map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-lg ${action.color} shrink-0`}
            >
              <action.icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-border bg-muted/30">
        <Map className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">
          No trips yet
        </h2>
        <p className="text-muted-foreground text-center max-w-sm mb-6">
          Create your first trip to get started. You can plan manually or
          let our AI generate a personalized itinerary for you.
        </p>
        <Link
          href="/trips/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create your first trip
        </Link>
      </div>
    </div>
  );
}
