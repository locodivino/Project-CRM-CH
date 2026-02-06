import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables Supabase manquantes. Vérifie ton fichier .env.local :\n' +
    'VITE_SUPABASE_URL=https://ton-projet.supabase.co\n' +
    'VITE_SUPABASE_ANON_KEY=ta-clé-anon'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
