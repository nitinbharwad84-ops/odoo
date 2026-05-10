/**
 * Mobile Bottom Navigation
 * 
 * Bottom tab bar for mobile devices.
 * Replaces the sidebar on small screens (< md breakpoint).
 * Features:
 * - Fixed bottom position
 * - Active tab highlighting
 * - Icon + label layout
 * - Safe area padding for notched devices
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Sparkles,
  Bell,
  User,
} from "lucide-react";

/**
 * Mobile nav items — limited to 5 for thumb-friendly tapping
 */
const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Trips", href: "/trips", icon: Map },
  { label: "AI Plan", href: "/ai/plan-trip", icon: Sparkles },
  { label: "Alerts", href: "/notifications", icon: Bell },
  { label: "Profile", href: "/profile", icon: User },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:hidden",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "pb-[env(safe-area-inset-bottom)]"
      )}
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg",
                  "transition-colors min-w-[56px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive && "text-primary"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium leading-tight",
                    isActive && "text-primary"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
