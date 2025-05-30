import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { selectRecommendationLeads, selectRecommendationOwner } from '$lib/supabase/recommendation/recommendation-repository';
import { selectCompanyAll } from '$lib/supabase/company/company-repository';


// 추천 리스트 조회
export const GET: RequestHandler = async ({request, locals, params }) => {
	try {
		const recommendationId = parseInt(params.recommendationId ?? "0");

		if (!recommendationId || recommendationId === 0) {
			return errorResponse("잘못된 recommendation ID 입니다.", 400);
		}

		if (!locals.companyUuid) {
			return errorResponse("companyUuid가 없습니다.", 401);
		}

		let companyData = await selectCompanyAll(locals.companyUuid);

		if (!companyData.id) {
			return serverErrorResponse();
		}
		
		let recommendationOwnerId = await selectRecommendationOwner(recommendationId);
		
		if (recommendationOwnerId !== companyData.id) {
			return errorResponse("해당 추천의 소유자가 아닙니다.", 403);
		}

		let recommendationData = await selectRecommendationLeads(recommendationId, companyData.id);

		return successResponse(recommendationData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};