import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { selectCompanyAll } from '$lib/supabase/company/company-repository';
import { selectLeadDetails, selectLeadOwner } from '$lib/supabase/lead/lead-repository';


// 회사 정보 조회
export const GET: RequestHandler = async ({request, locals, params }) => {
	try {
		const leadId = parseInt(params.leadId ?? "0");

		if (!leadId || leadId === 0) {
			return errorResponse("잘못된 lead ID 입니다.", 400);
		}

		if (!locals.companyUuid) {
			return errorResponse("companyUuid가 없습니다.", 401);
		}
	
		let companyData = await selectCompanyAll(locals.companyUuid);
		
		if (!companyData.id) {
			return serverErrorResponse();
		}

		let leadOwner = await selectLeadOwner(leadId);

		if (leadOwner !== companyData.id) {
			return errorResponse("해당 리드의 소유자가 아닙니다.", 403);
		}

		let leadData = await selectLeadDetails(leadId);

		return successResponse(leadData);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};