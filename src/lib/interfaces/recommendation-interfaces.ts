export interface NewRecommendation {
    location: string,
    latitude: number,
    longitude: number,
    companyId: number
}

export interface HistoryItem {
    id: number,
    location: string,
    leads: string,
    count: number,
    created_at: Date,
}