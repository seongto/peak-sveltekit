import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';

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
export const GET: RequestHandler = async ({request }) => {
	try {
		return successResponse(dummyData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};