import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { NewCompany } from '$lib/interfaces/companyInterface';


const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function insertCompany(company: NewCompany) {
    const { data, error } = await supabase
        .from('companies')
        .insert([company])
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}