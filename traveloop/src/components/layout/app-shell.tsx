/**
 * App Shell Layout
 * 
 * The main layout wrapper for authenticated pages.
 * Combines the sidebar, header, main content area, and mobile bottom nav
 * into a cohesive app shell.
 * 
 * Layout structure:
 * ┌──────┬──────────────────────────┐
 * │      │ Header (search, user)    │
 * │ Side ├──────────────────────────┤
 * │ bar  │                          │
 * │      │ Main Content Area        │
 * │      │ (scrollable)             │
 * │      │                          │
 * └──────┴──────────────────────────┘
 *         ┌──────────────────────┐
 *         │ Mobile Bottom Nav    │  (mobile only)
 *         └──────────────────────┘
 */

"use client";

import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { MobileBottomNav } from "./mobile-bottom-nav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — hidden on mobile, visible on md+ */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header — always visible */}
        <Header />

        {/* Page content — scrollable */}
        <main
          className="flex-1 overflow-y-auto pb-20 md:pb-6 px-4 md:px-6 py-6"
          id="main-content"
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom nav — only visible on mobile */}
      <MobileBottomNav />
    </div>
  );
}
