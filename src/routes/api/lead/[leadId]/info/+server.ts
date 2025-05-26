import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';

let dummyData = {
	"name": "더선한 스튜디오",
	"summary": "사람과 AI 에이전트가 협력하여 선을 이루는 미래를 꿈꾸는 AI를 연구합니다.",
	"address": "서울특별시 서초구 효령로 391",
	"website": "https://www.koreaodm.com/",
	"match_reason": "더선한이 추구하는 바와 매우 잘 어울려요. 짝짝짝.",
	"year_founded": 2020,
	"ceo_name": "권태욱",
	"industry": "IT/소프트웨어, 컨설팅"
}

// 회사 정보 조회
export const GET: RequestHandler = async ({request, params }) => {
	try {
		const leadId = parseInt(params.leadId ?? "0");

		if (leadId !== 1) {
			return errorResponse("leadId가 올바르지 않습니다.");
		}

		return successResponse(dummyData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};