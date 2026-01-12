
import { createClient } from '@supabase/supabase-js';

// Access environment variables via process.env instead of import.meta.env to resolve TypeScript errors
const supabaseUrl = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_URL) || 'https://ywgpqksmsvdvgymapfdz.supabase.co';
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable_MMaoQEVYXwrLIdhjc3sOIQ_gbzpRn2f';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
