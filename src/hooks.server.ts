import type { Handle } from '@sveltejs/kit';
import { errorResponse, serverErrorResponse } from '$lib/utils/response';

export const handle: Handle = async ({ event, resolve }) => {

    try {
        // event.locals 초기화
        event.locals = {
            companyId: null
        };

        // company uuid 를 통해 정보 가져와서 검증하고, 실패시 401 에러 반환하는 로직 필요.
        if (event.url.pathname !== '/api/company/new') {
            const companyId = event.request.headers.get('x-company-id');
        
            if (!companyId) {
                return errorResponse('회사의 uuid 정보가 필요합니다.', 401);
            }
            
            event.locals.companyId = companyId;
        
            return resolve(event);
        }
        
        return resolve(event);

    } catch (error) {
        return serverErrorResponse();
    }
}