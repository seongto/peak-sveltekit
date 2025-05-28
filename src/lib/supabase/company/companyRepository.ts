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

    let result = { "uuid": data.uuid };

    if (error) throw new Error(error.message);
    return result;
}


export async function updateCompany(uuid: string, name: string, description: string) {
    const { data, error } = await supabase
        .from('companies')
        .update({ name, description })
        .eq('uuid', uuid)
        .select()
        .single();

    if (error) {
        console.error('updateCompany error:', error.message);
        throw new Error(error.message);
    }

    if ((data.uuid === uuid) && (data.name === name) && (data.description === description)) {
        return true;
    } else {
        return false;
    }
}
    

export async function selectCompany(uuid: string) {
    const { data, error } = await supabase
        .from('companies')
        .select("name, description")
        .eq('uuid', uuid)
        .single();

    if (error) {
        console.error('selectCompany error:', error.message);
        throw new Error(error.message);
    }

    return data;
}