import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';

let dummyData = {
	"name": "더선한 스튜디오",
	"description" : "AI 연구와 활용에 관심이 많습니다. 회사의 비즈니스에 도움이 되는 리드들을 연결해주는 업무에 관심이 많습니다."
}

// 회사 정보 조회
export const GET: RequestHandler = async ({request }) => {
	try {
		return successResponse(dummyData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};