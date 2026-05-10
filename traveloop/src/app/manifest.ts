/**
 * PWA Web App Manifest
 * 
 * Configures the Progressive Web App metadata for Traveloop.
 * Used by browsers and operating systems when the user installs the PWA.
 * 
 * References: stack_recommendation.md → PWA Architecture
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Traveloop — AI Travel Planner",
    short_name: "Traveloop",
    description:
      "AI-powered collaborative travel planning. Plan smarter trips with AI assistance, budgeting, and team collaboration.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#ffffff",
    // Deep navy theme color for status bar (matches dark mode)
    theme_color: "#0F172A",
    orientation: "portrait-primary",
    categories: ["travel", "productivity", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/dashboard.png",
        sizes: "1280x720",
        type: "image/png",
        // @ts-expect-error -- form_factor is valid in newer manifest spec
        form_factor: "wide",
        label: "Traveloop Dashboard",
      },
      {
        src: "/screenshots/mobile-trips.png",
        sizes: "750x1334",
        type: "image/png",
        // @ts-expect-error -- form_factor is valid in newer manifest spec
        form_factor: "narrow",
        label: "Trip Planning on Mobile",
      },
    ],
  };
}
