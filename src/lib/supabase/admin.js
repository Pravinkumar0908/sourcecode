import { createClient as createBrowserClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client using the Service Role Key.
 * Use this only on the server — never expose the service role key to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in environment");
  }

  return createBrowserClient(url, key, {
    auth: {
      persistSession: false,
    },
  });
}
