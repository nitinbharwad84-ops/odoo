/**
 * Prisma Client Singleton
 * 
 * Simple single-connection client for Supabase PostgreSQL.
 * Prevents multiple Prisma Client instances in development (Next.js hot reload).
 * Local PostgreSQL failover is deferred to M17.
 * 
 * Usage:
 *   import { prisma } from '@/lib/prisma/client';
 *   const users = await prisma.user.findMany();
 */

import { PrismaClient } from "@prisma/client";

/**
 * Extend the global type to include the Prisma client singleton.
 * This prevents TypeScript errors when accessing the global cache.
 */
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

/**
 * Prisma Client configuration
 * - In development: verbose logging for debugging queries
 * - In production: only log errors and warnings
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasourceUrl: process.env.DATABASE_URL,
  });
}

/**
 * Singleton pattern:
 * - Development: Store client on globalThis to survive hot module replacement
 * - Production: Create a single instance per serverless function cold start
 */
export const prisma: PrismaClient =
  globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

/**
 * Graceful shutdown handler
 * Ensures database connections are properly closed when the process exits.
 */
async function gracefulShutdown(): Promise<void> {
  await prisma.$disconnect();
}

// Register shutdown handlers (only in non-edge environments)
if (typeof process !== "undefined") {
  process.on("beforeExit", gracefulShutdown);
}
