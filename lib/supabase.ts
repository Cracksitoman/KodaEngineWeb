
import { createClient } from '@supabase/supabase-js';

// Usar process.env que es inyectado por la configuración de Vite
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ywgpqksmsvdvgymapfdz.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_MMaoQEVYXwrLIdhjc3sOIQ_gbzpRn2f';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
