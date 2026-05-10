/**
 * Header Component
 * 
 * Top header bar for the authenticated app shell.
 * Features:
 * - Mobile menu toggle (hamburger)
 * - Search input (placeholder for global search)
 * - Notification bell with badge
 * - User avatar dropdown menu
 * - Theme toggle (light/dark)
 */

"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Bell,
  Menu,
  Moon,
  Sun,
  Search,
  User,
  Settings,
  LogOut,
  Plane,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  className?: string;
  /** Callback for mobile menu toggle */
  onMobileMenuToggle?: () => void;
}

export function Header({ className, onMobileMenuToggle }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center h-16 px-4 md:px-6",
        "bg-background/80 backdrop-blur-md border-b border-border",
        className
      )}
    >
      {/* Mobile: Menu toggle + Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={onMobileMenuToggle}
          className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary text-white">
            <Plane className="h-3.5 w-3.5" />
          </div>
          <span className="font-bold text-foreground">Traveloop</span>
        </Link>
      </div>

      {/* Desktop: Search bar */}
      <div className="hidden md:flex flex-1 items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search trips, destinations..."
            className={cn(
              "w-full h-9 pl-10 pr-4 rounded-lg",
              "bg-muted/50 border border-border text-sm",
              "placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "transition-colors"
            )}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="flex-1 md:hidden" />

      {/* Right side: Actions */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 block dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
        </button>

        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {/* Notification badge — will be dynamic */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </Link>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="User menu"
            aria-expanded={userMenuOpen}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {userMenuOpen && (
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-56 rounded-lg",
                "bg-popover border border-border shadow-lg",
                "animate-scale-in origin-top-right z-50"
              )}
              role="menu"
            >
              {/* User info */}
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-medium text-foreground">
                  Traveler
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  user@example.com
                </p>
              </div>

              {/* Menu items */}
              <div className="p-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-accent transition-colors"
                  role="menuitem"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </Link>
              </div>

              <div className="border-t border-border p-1">
                <button
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                  role="menuitem"
                  onClick={() => {
                    setUserMenuOpen(false);
                    // Logout logic will be implemented in M2
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
