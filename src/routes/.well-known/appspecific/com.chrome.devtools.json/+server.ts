import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	return new Response(
		JSON.stringify({
			status: 'ok'
		}),
		{
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);
};

// 이 파일은 개발자 모드에서 chrome이 불필요한 에러로그를 발생시키는 것을 방지합니다.