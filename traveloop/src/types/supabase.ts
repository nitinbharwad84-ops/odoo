/**
 * Supabase Database Type Definitions
 * 
 * Placeholder type file for Supabase-generated types.
 * Run `npx supabase gen types typescript` to generate actual types
 * from your Supabase project schema.
 * 
 * For now, this provides a minimal Database interface so TypeScript
 * doesn't error when passing the generic to createClient<Database>().
 */

/**
 * Database type placeholder.
 * Replace this with auto-generated types from Supabase CLI:
 * 
 *   npx supabase gen types typescript --project-id <project-id> > src/types/supabase.ts
 * 
 * This ensures full type safety for all Supabase queries.
 */
export type Database = {
  public: {
    Tables: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      [key: string]: string;
    };
  };
};

/**
 * Helper type to extract table row types
 */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
