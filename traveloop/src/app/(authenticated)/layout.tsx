/**
 * Authenticated Layout
 * 
 * Layout wrapper for all authenticated routes.
 * Provides the app shell (sidebar, header, mobile nav).
 * 
 * Protected by middleware.ts — unauthenticated users are
 * redirected to /login before this layout renders.
 */

import { AppShell } from "@/components/layout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
