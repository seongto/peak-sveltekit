import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';
import { insertCompany } from '$lib/supabase/company/company-repository';

let dummyData = {
	"uuid": "12345678-1234-1234-1234-123456789012"
}

// 회사 정보 생성
export const POST: RequestHandler = async ({request }) => {
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

		let CompanyInfoUuid = await insertCompany({ name, description });

		return successResponse(CompanyInfoUuid);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};