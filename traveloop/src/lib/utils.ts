/**
 * Shared Utility Functions
 * 
 * Common utilities used across the Traveloop application.
 * Includes class name merging (clsx + tailwind-merge) and
 * other shared helper functions.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (dedup Tailwind classes).
 * 
 * @example
 *   cn("px-4 py-2", isActive && "bg-primary", className)
 *   // Properly handles Tailwind class conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a date for display in the user's locale.
 * Falls back to ISO string if formatting fails.
 */
export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  try {
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    });
  } catch {
    return d.toISOString().split("T")[0];
  }
}

/**
 * Generate a URL-safe random token.
 * Used for share links, invite tokens, etc.
 */
export function generateToken(length: number = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Sleep for a specified number of milliseconds.
 * Useful for rate limiting and retry logic.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Safely parse JSON with a fallback value.
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Format currency amount with proper locale formatting.
 */
export function formatCurrency(
  amount: number,
  currency: string = "INR"
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
