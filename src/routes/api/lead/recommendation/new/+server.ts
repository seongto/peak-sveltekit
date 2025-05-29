import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';

import { recommendLead } from '$lib/openAI/recommend-lead';
import { selectCompanyAll } from '$lib/supabase/company/company-repository';
import { insertRecommendation } from '$lib/supabase/recommendation/recommendation-repository';
import type { NewRecommendationResource } from '$lib/interfaces/company-interfaces';
import type { NewRecommendation } from '$lib/interfaces/recommendation-interfaces';
import type { NewLead } from '$lib/interfaces/lead-interfaces';


// 새로운 리드 추천
export const POST: RequestHandler = async ({request, locals }) => {

	let body: any;

	try {
		body = await request.json();
	} catch {
		return errorResponse("JSON 파싱에 실패했습니다. 올바른 JSON 형식인지 확인해주세요.");
	}

	try {
		const keyValidator = ['latitude', 'longitude', 'location'];
		const validationError = validateRequiredFields(body, keyValidator);

		if (validationError) {
			return errorResponse(validationError);
		}
		
		const { latitude, longitude, location } = body;

		if (
			typeof location !== 'string' || location.trim() === '' ||
			typeof latitude !== 'number' || typeof longitude !== 'number' ||
			latitude < 33.0 || latitude > 43.0 ||
			longitude < 124.0 || longitude > 132.0
		) {
			return errorResponse("요청 데이터가 올바르지 않습니다. location은 문자열이며 빈 값일 수 없습니다. latitude와 longitude는 숫자이며 대한민국 내의 위치여야 합니다.");
		}

		if (!locals.companyUuid) {
			return errorResponse("companyUuid가 없습니다.", 401);
		}

		let companyData = await selectCompanyAll(locals.companyUuid)

		if (!companyData.name || !companyData.description) {
			return serverErrorResponse();
		}

		let recommendationData: NewRecommendationResource = {
			name: companyData.name,
			description: companyData.description,
			latitude: latitude,
			longitude: longitude
		}
		
		let recommendationResult = await recommendLead(recommendationData);

		let newRecommend: NewRecommendation = {
			location: location,
			latitude: latitude,
			longitude: longitude,
			companyId: companyData.id
		}

		let insertResult = await insertRecommendation(newRecommend, companyData.id, recommendationResult.leads);
		
		return successResponse(insertResult);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};