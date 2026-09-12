import { createClient } from '@supabase/supabase-js';

/**
 * Creates and returns a server-side Supabase client using the service-role key.
 * IMPORTANT: This file must ONLY be imported in server routes / API handlers.
 * Never import or execute this module in client components.
 */
export function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (
    !supabaseUrl ||
    !serviceRoleKey ||
    supabaseUrl.includes('your-supabase-project') ||
    serviceRoleKey.includes('your_supabase_service_role_key')
  ) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
