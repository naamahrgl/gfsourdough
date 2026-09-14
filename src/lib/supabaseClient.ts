import { createClient } from '@supabase/supabase-js';

// Astro only exposes env vars prefixed with PUBLIC_ to client-side/browser
// code. VITE_-prefixed vars would stay server-only here.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Add PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY to your .env file, then restart the dev server.'
  );
}

// Single shared client for the whole app. Import this everywhere instead of
// calling createClient() again -- multiple clients will fight over the same
// auth storage key and cause weird session bugs.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // needed for email confirm / magic link / oauth redirects
  },
});