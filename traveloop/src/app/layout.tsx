/**
 * Root Layout
 * 
 * The top-level layout for the entire Traveloop application.
 * Provides:
 * - HTML document structure with lang and suppressHydrationWarning
 * - Google Fonts (Inter) loading
 * - Global CSS
 * - Providers wrapper (Theme, Query, Analytics)
 * - SEO metadata
 * 
 * This layout wraps ALL pages (public, authenticated, etc.)
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

/**
 * Inter font — clean, modern sans-serif
 * Used as the primary font throughout the application.
 * Loaded via next/font for automatic optimization.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/**
 * Global SEO metadata
 * Individual pages can override these values.
 */
export const metadata: Metadata = {
  title: {
    default: "Traveloop — AI-Powered Travel Planning",
    template: "%s | Traveloop",
  },
  description:
    "Plan smarter trips with AI assistance. Collaborative itineraries, budget planning, packing lists, and more — all in one place.",
  keywords: [
    "travel planning",
    "AI travel",
    "itinerary builder",
    "trip planner",
    "collaborative travel",
    "budget travel",
    "packing list",
    "travel app",
  ],
  authors: [{ name: "Traveloop" }],
  creator: "Traveloop",
  publisher: "Traveloop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Traveloop",
    title: "Traveloop — AI-Powered Travel Planning",
    description:
      "Plan smarter trips with AI. Collaborative itineraries, budgets, and packing lists.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Traveloop — AI-Powered Travel Planning",
    description:
      "Plan smarter trips with AI. Collaborative itineraries, budgets, and packing lists.",
  },
  // PWA metadata
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Traveloop",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/**
 * Viewport configuration
 * Mobile-first with theme color for PWA status bar.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

/**
 * Root layout component.
 * Wraps the entire application with providers and base HTML structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={inter.variable}
      // Suppress hydration warnings from browser extensions and next-themes
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
