import { createClient } from '@supabase/supabase-js';

// যদি সত্যিকারের Supabase ব্যবহার করতে চান তাহলে আপনার URLs এবং Keys ডাল দিন
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
