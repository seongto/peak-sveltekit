export function successResponse<T>(data: T, message: string = '정상적으로 처리되었습니다.') {
    return new Response(
        JSON.stringify({
            success: true,
            data,
            message
        }),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}
  
export function errorResponse(message: string = "잘못된 요청입니다.", status = 400) {
    return new Response(
        JSON.stringify({
            success: false,
            data: null,
            message
        }),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

export function serverErrorResponse(message: string = "서버 내부 오류가 발생하였습니다.", status = 500) {
    return new Response(
        JSON.stringify({
            success: false,
            data: null,
            message
        }),
        {
            status,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}
