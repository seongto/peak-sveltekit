import type { RequestHandler } from '@sveltejs/kit';

// "say hello" 라는 텍스트를 반
export const GET: RequestHandler = async ({ }) => {
	try {
		return new Response('Hello', { status: 200 });
	} catch (error) {
		return new Response('Failed', { status: 500 });
	}
};