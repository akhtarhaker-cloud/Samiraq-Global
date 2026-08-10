"use client";

import { createBrowserClient } from "@supabase/ssr";
import { assertSupabaseConfigured } from "./config";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabasePublishableKey } = assertSupabaseConfigured();
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
