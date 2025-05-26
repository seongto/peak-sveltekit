import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabaseUrl = PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl) throw new Error('Supabase URL not found.')
if (!supabaseAnonKey) throw new Error('Supabase Anon Key not found.')

export const supabase = createClient(supabaseUrl, supabaseAnonKey);