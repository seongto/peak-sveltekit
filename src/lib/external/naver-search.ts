// src/lib/external/searchNaver.ts
export async function searchNaver(query: string): Promise<string[]> {
	const clientId = process.env.NAVER_CLIENT_ID!;
	const clientSecret = process.env.NAVER_CLIENT_SECRET!;
	const url = `https://openapi.naver.com/v1/search/webkr.json?query=${encodeURIComponent(query)}&display=5`;

	const res = await fetch(url, {
		headers: {
			"X-Naver-Client-Id": clientId,
			"X-Naver-Client-Secret": clientSecret
		}
	});

	if (!res.ok) {
		console.error("네이버 검색 실패", await res.text());
		return ["검색 실패"];
	}

	const data = await res.json();

	return data.items.map((item: any) => `${item.title.replace(/<[^>]+>/g, '')} - ${item.link}`);
}