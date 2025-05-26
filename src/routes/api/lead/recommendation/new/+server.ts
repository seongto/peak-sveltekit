import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';


let dummyData = {
	"recommendation_id": 1,
	"leads": [
		{
			"id": 1,
			"name": "Lead 1",
			"address": "lead address1",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4973,
		  "longitude": 127.0270
		},{
			"id": 2,
			"name": "Lead 2",
			"address": "lead address2",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4982,
		  "longitude": 127.0268
		},{
			"id": 3,
			"name": "Lead 3",
			"address": "lead address3",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4978,
			"longitude": 127.0283
		}
	]
}

// 새로운 리드 추천
export const POST: RequestHandler = async ({request }) => {

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
		
		return successResponse(dummyData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};