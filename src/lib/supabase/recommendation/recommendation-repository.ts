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

    return data;
}

export async function selectRecommendations(recommendationId: number, companyId: number) {
    const { data, error } = await supabase
        .from('recommendations')
        .select(`
            location,
            leads (
                id,
                name,
                address,
                industry,
                latitude,
                longitude
            ) 
        `)
        .eq('company_id', companyId)
        .eq('id', recommendationId)

    if (error) {
        console.error('selectRecommendations error:', error.message);
        throw new Error(error.message);
    }

    return data;
}