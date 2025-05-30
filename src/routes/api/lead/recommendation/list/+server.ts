import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { selectRecommendations } from '$lib/supabase/recommendation/recommendation-repository';
import { selectCompanyAll } from '$lib/supabase/company/company-repository';
import type { HistoryItem } from '../../../../../lib/interfaces/recommendation-interfaces';


let dummyData = [
	{
		"id": 1,
		"created_at": "2025-05-26T03:26:00+09:00",
		"location": "location 3",
		"leads": "네이버, 카카오, 라인, 쿠팡, 배달의 민족, 토스, 당근",
		"count": 7
	},{
		"id": 1,
		"created_at": "2025-05-26T03:22:00+09:00",
		"location": "location 2",
		"leads": "라인, 쿠팡, 배달의 민족, 토스, 당근",
		"count": 5
	},{
		"id": 1,
		"created_at": "2025-05-26T03:21:00+09:00",
		"location": "location 1",
		"leads": "더선한, 네이버, 카카오, 라인, 쿠팡, 배달의 민족, 토스, 당근",
		"count": 8
	},
]

// 추천 리스트 조회
export const GET: RequestHandler = async ({request, locals }) => {
	try {
		if (!locals.companyUuid) {
			return errorResponse("companyUuid가 없습니다.", 401);
		}

		let companyData = await selectCompanyAll(locals.companyUuid);

		if (!companyData.id) {
			return serverErrorResponse();
		}

		let recommendations = await selectRecommendations(companyData.id);
		let histories: Array<HistoryItem> = [];

		for (let recommendation of recommendations) {
			let leadsSum: string = "";
			for (let i = 0; i < recommendation.leads.length; i++) {
				if (i === recommendation.leads.length - 1) {
					leadsSum += recommendation.leads[i].name;
				} else {
					leadsSum += recommendation.leads[i].name + ", ";
				}
			}

			let history: HistoryItem = {
				id: recommendation.id,
				location: recommendation.location,
				leads: leadsSum,
				count: recommendation.leads.length,
				createdAt: recommendation.created_at
			}
			histories.push(history);
		}

		return successResponse(histories);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};