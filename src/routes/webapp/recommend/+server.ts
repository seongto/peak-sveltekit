import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';
import { recommendLead } from '$lib/openAI/recommendLead';
import type { NewRecommendationResource } from '$lib/interfaces/companyInterface';


// 새로운 리드 추천
export const POST: RequestHandler = async ({request }) => {

	let body: any;

	try {
		body = await request.json();
	} catch {
		return errorResponse("JSON 파싱에 실패했습니다. 올바른 JSON 형식인지 확인해주세요.");
	}

	try {
		const keyValidator = ['latitude', 'longitude', 'name', 'description'];
		const validationError = validateRequiredFields(body, keyValidator);

		if (validationError) {
			return errorResponse(validationError);
		}
		
		const { latitude, longitude, name, description } = body;

		if (
			typeof latitude !== 'number' || typeof longitude !== 'number' ||
			latitude < 33.0 || latitude > 43.0 ||
			longitude < 124.0 || longitude > 132.0
		) {
			return errorResponse("요청 데이터가 올바르지 않습니다. latitude와 longitude는 숫자이며 대한민국 내의 위치여야 합니다.");
		}

		let data: NewRecommendationResource = {
			name: name,
			description: description,
			latitude: latitude,
			longitude: longitude
		}

		let result = await recommendLead(data);

		return successResponse(result);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};