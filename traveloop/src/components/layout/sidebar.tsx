/**
 * Sidebar Component
 * 
 * Collapsible sidebar navigation for the authenticated app shell.
 * Features:
 * - Collapsible with icon-only mode
 * - Active route highlighting
 * - Grouped navigation sections
 * - Mobile: hidden (uses bottom nav instead)
 * - Keyboard accessible
 */

"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Compass,
  Wallet,
  CheckSquare,
  BookOpen,
  Users,
  Share2,
  Sparkles,
  Bell,
  ChevronLeft,
  ChevronRight,
  Plane,
} from "lucide-react";

/**
 * Navigation item type definition
 */
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Optional badge count (e.g., unread notifications) */
  badge?: number;
}

/**
 * Navigation section type definition
 */
interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Main navigation sections for the sidebar.
 * Organized by feature area for easy scanning.
 */
const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "My Trips", href: "/trips", icon: Map },
    ],
  },
  {
    title: "Plan",
    items: [
      { label: "Destinations", href: "/search/destinations", icon: Compass },
      { label: "AI Planner", href: "/ai/plan-trip", icon: Sparkles },
    ],
  },
  {
    title: "Manage",
    items: [
      { label: "Budget", href: "/ai/budget", icon: Wallet },
      { label: "Packing", href: "/ai/packing", icon: CheckSquare },
      { label: "Notes", href: "/trips", icon: BookOpen },
    ],
  },
  {
    title: "Social",
    items: [
      { label: "Collaborators", href: "/trips", icon: Users },
      { label: "Sharing", href: "/trips", icon: Share2 },
      { label: "Notifications", href: "/notifications", icon: Bell },
    ],
  },
];

/**
 * Props for the Sidebar component
 */
interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen bg-sidebar border-r border-sidebar-border",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-sidebar-foreground hover:text-primary transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
            <Plane className="h-4 w-4" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">
              Traveloop
            </span>
          )}
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-6">
            {/* Section Title — hidden when collapsed */}
            {!collapsed && (
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
            )}

            {/* Navigation Items */}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <li key={item.href + item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-sidebar-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge !== undefined && item.badge > 0 && (
                            <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                              {item.badge > 9 ? "9+" : item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={toggleCollapsed}
          className={cn(
            "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium",
            "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            "transition-colors",
            collapsed && "justify-center px-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
