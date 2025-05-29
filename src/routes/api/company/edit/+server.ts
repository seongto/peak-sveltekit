import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';
import { updateCompany } from '$lib/supabase/company/company-repository';


// 회사 정보 수정
export const POST: RequestHandler = async ({request, locals }) => {
	let body: any;

	try {
		body = await request.json();
	} catch {
		return errorResponse("JSON 파싱에 실패했습니다. 올바른 JSON 형식인지 확인해주세요.");
	}

	try {
		const keyValidator = ['name', 'description'];
		const validationError = validateRequiredFields(body, keyValidator);

		if (validationError) {
			return errorResponse(validationError);
		}

		const { name, description } = body;


		if (
			typeof name !== 'string' || name.trim() === '' ||
			typeof description !== 'string' || description.trim() === ''
		) {
			return errorResponse("요청 데이터가 올바르지 않습니다. name, description은 모두 문자열이며 빈 값일 수 없습니다.");
		}

		let companyUuid = locals.companyUuid;

		if (!companyUuid) {
			return errorResponse("회사의 uuid 정보가 필요합니다.", 401);
		}

		let result = await updateCompany(companyUuid, name, description);

		if (result) {
			return successResponse(null, "회사 정보가 수정되었습니다.");
		} else {
			return serverErrorResponse();
		}
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};