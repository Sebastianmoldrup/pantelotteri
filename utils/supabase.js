import { createBrowserClient, createServerClient } from '@supabase/ssr';

export function createSupabaseFrontEndClient() {
  return createBrowserClient(
    mabriqkgsmksjsptzgxe.supabase.co,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}
