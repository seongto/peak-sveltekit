export interface NewLead {
    name: string,
    website: string,
    year_founded: number,
    summary: string,
    address: string,
    latitude: number,
    longitude: number,
    ceo_name: string,
    match_reason: string,
    industry: string,
}

export interface LeadListItem {
    id: number,
    name: string,
    address: string,
    industry: string,
    latitude: number,
    longitude: number
}