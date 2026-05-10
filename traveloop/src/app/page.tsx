/**
 * Landing Page (Placeholder)
 * 
 * This is the public landing page at /.
 * Foundation only — full landing page UI will be built in later modules.
 * 
 * Route group: (public) — no authentication required.
 */

import Link from "next/link";
import { Plane, ArrowRight, Sparkles, Users, Map } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 md:px-12 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
            <Plane className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Traveloop
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Travel Planning
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Plan smarter trips
            <br />
            <span className="text-gradient">with AI assistance</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Collaborative itineraries, smart budgeting, packing lists, and
            route optimization — all in one beautiful workspace.
          </p>

          {/* CTA */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Start planning for free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
          {[
            {
              icon: Sparkles,
              title: "AI Trip Planner",
              description:
                "Generate complete itineraries with AI. Personalized to your style, budget, and interests.",
            },
            {
              icon: Users,
              title: "Collaborate",
              description:
                "Plan together in real-time. Share, edit, and coordinate with your travel group.",
            },
            {
              icon: Map,
              title: "Smart Itineraries",
              description:
                "Day-by-day planning with route optimization, budget tracking, and packing lists.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center h-16 px-6 border-t border-border text-sm text-muted-foreground">
        © {new Date().getFullYear()} Traveloop. Built for smarter travel.
      </footer>
    </div>
  );
}
