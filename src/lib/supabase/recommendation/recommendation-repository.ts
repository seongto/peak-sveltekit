import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { NewLead } from '$lib/interfaces/lead-interfaces';
import type { NewRecommendation } from '$lib/interfaces/recommendation-interfaces';


const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export async function insertRecommendation(recommendation: NewRecommendation, companyId: number, leads: Array<NewLead>) {
    const { data, error } = await supabase.rpc('insert_recommendation_with_leads_v2', {
        _location: recommendation.location,
        _latitude: recommendation.latitude,
        _longitude: recommendation.longitude,
        _company_id: companyId,
        _leads: leads
    });
    
    if (error) {
        console.error('RPC insert failed:', error.message);
        throw error;
    }

    console.log("=========== Insert Result ===========")
    console.log(data);

    return data;
}


export async function updateLead(uuid: string, name: string, description: string) {
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
    

export async function selectLead(uuid: string) {
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