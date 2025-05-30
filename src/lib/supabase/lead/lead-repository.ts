import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';


const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function selectLeadDetails(leadId: number) {
    const { data, error } = await supabase
        .from('leads')
        .select(`
            name,
            summary,
            address,
            website,
            match_reason,
            year_founded,
            ceo_name,
            industry
        `)
        .eq('id', leadId)

    if (error) {
        console.error('selectLeadDetails error:', error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function selectLeadOwner(leadId: number) {
    const { data, error } = await supabase
        .from('leads')
        .select('recommendations(company_id)')
        .eq('id', leadId)
        .single();

    if (error) {
        console.error('selectLeadOwner error:', error.message);
        throw new Error(error.message);
    }

    return (data as any)?.recommendations?.company_id;
}