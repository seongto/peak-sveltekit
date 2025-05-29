import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';

let dummyData = {
	"address": "서울시 강남구 역삼동 148",
	"leads": [
		{
			"id": 1,
			"name": "Lead 1",
			"address": "lead address1",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4973,
			"longitude": 127.0270
		},{
			"id": 1,
			"name": "Lead 2",
			"address": "lead address2",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4982,
			"longitude": 127.0268
		},{
			"id": 1,
			"name": "Lead 3",
			"address": "lead address3",
			"industry": "산업군1, 산업군2",
			"latitude": 37.4978,
			"longitude": 127.0283
		}
	]
}

// 추천 리스트 조회
export const GET: RequestHandler = async ({request, params }) => {
	try {
		const recommendationId = parseInt(params.recommendationId ?? "0");

		if (recommendationId !== 1) {
			return errorResponse("recommendationId가 올바르지 않습니다.");
		}

		return successResponse(dummyData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};