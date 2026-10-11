"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Anon client for client components (dashboard Realtime, public views).
 * Read-only by RLS: rooms, matches, intros, encounters, ledger_entries (delta > 0 only),
 * public_givers, public_people. It cannot read `people` (phones) at all.
 */
export function browserDb(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
  return client;
}
