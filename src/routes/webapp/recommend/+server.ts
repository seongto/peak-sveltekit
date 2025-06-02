import type { RequestHandler } from '@sveltejs/kit';
import { successResponse, errorResponse, serverErrorResponse } from '$lib/utils/response';
import { validateRequiredFields } from '$lib/utils/validators';
import { recommendLead } from '$lib/openAI/recommend-lead';
import type { NewRecommendationResource } from '$lib/interfaces/company-interfaces';
import type { NewLead } from '$lib/interfaces/lead-interfaces';


// 새로운 리드 추천
export const POST: RequestHandler = async ({request }) => {

	let body: any;

	try {
		body = await request.json();
	} catch {
		return errorResponse("JSON 파싱에 실패했습니다. 올바른 JSON 형식인지 확인해주세요.");
	}

	try {
		const keyValidator = ['latitude', 'longitude', 'name', 'description'];
		const validationError = validateRequiredFields(body, keyValidator);

		if (validationError) {
			return errorResponse(validationError);
		}
		
		const { latitude, longitude, name, description } = body;

		if (
			typeof latitude !== 'number' || typeof longitude !== 'number' ||
			latitude < 33.0 || latitude > 43.0 ||
			longitude < 124.0 || longitude > 132.0
		) {
			return errorResponse("요청 데이터가 올바르지 않습니다. latitude와 longitude는 숫자이며 대한민국 내의 위치여야 합니다.");
		}

		let data: NewRecommendationResource = {
			name: name,
			description: description,
			latitude: latitude,
			longitude: longitude
		}

		let recommendationResult = await recommendLead(data);

		// let dummyData = {
		// 	leads: [
		// 		{
		// 			"name": "리디북스",
		// 			"summary": "리디북스는 전자책과 웹소설, 그리고 만화 등의 디지털 콘텐츠를 제공하는 플랫폼입니다. 특히 한국 시장 내에서 독보적인 위치를 차지하고 있으며, 사용자 경험을 지속적으로 개선시키기 위한 다양한 시도를 하고 있습니다. 데이터 분석을 기반으로 한 맞춤형 추천 시스템과 연관 콘텐츠 제공을 통해 사용자 만족도를 높이고 있습니다.",
		// 			"address": "서울시 서초구 강남대로 465, A동 9층",
		// 			"ceo_name": "배기식",
		// 			"industry": "디지털 콘텐츠",
		// 			"year_founded": 2004,
		// 			"website": "https://www.ridibooks.com",
		// 			"latitude": 37.50376,
		// 			"longitude": 127.024612,
		// 			"match_reason": "리디북스는 이미 많은 사용자에게 디지털 콘텐츠를 제공하는 플랫폼으로 성장하고 있으며 모두의 책방과 협업하여 전자책 및 웹소설과 같은 디지털 형태의 다양한 콘텐츠를 추가할 수 있습니다. 두 플랫폼이 협력함으로써 독자들에게 더욱 풍부하고 다양한 독서 환경을 제공할 수 있습니다. 또한, 모두의 책방이 제공하는 AI 기반의 책방 운영 지원 솔루션은 리디북스 고객들이 새로운 책방을 운영하는 데 훌륭한 도구가 될 수 있습니다. 리디북스의 기존 사용자 기반을 활용하여 모두의 책방 사용자들에게 추가적인 독서 경험을 제공할 수 있습니다. 양사의 협력을 통해 오프라인 책방과 온라인 콘텐츠의 경계를 넘어서 사용자들에게 통합된 독서 경험을 제공합니다. 실시간 데이터 공유와 마케팅 협력을 통해 상대사의 존재감을 상호 증진시킬 수 있습니다."
		// 		},
		// 		{
		// 			"name": "알라딘커뮤니케이션",
		// 			"summary": "알라딘은 국내외 도서 및 전자책, 음반과 DVD를 제공하는 종합 도서 유통 플랫폼입니다. 이 플랫폼은 다양한 장르의 도서와 미디어를 한곳에서 쉽게 찾아볼 수 있도록 하는데 중점을 두고 있습니다. 각종 기획전과 이벤트를 통해 독자와 출판계 간의 활발한 교류를 촉진합니다.",
		// 			"address": "서울시 마포구 월드컵북로 400, 3층",
		// 			"ceo_name": "박종호",
		// 			"industry": "도서 유통",
		// 			"year_founded": 1998,
		// 			"website": "https://www.aladin.co.kr",
		// 			"latitude": 37.582695,
		// 			"longitude": 126.887078,
		// 			"match_reason": "알라딘은 다양한 국내외 도서와 전자책을 제공하는 플랫폼으로, 모두의 책방이 이를 통해 더욱 다양한 품목을 갖춘 책들을 사용 고객에게 서비스할 수 있습니다. 또한, 알라딘의 다양한 기획전과 이벤트 참여 기회는 모두의 책방이 고객 경험을 더욱 강화하는 데 도움이 됩니다. 두 플랫폼 간의 데이터 공유로 서로의 고객 니즈를 더 잘 이해하고 새로운 제품 및 서비스를 개발할 수 있습니다. 알라딘의 기존 물류 네트워크와 협업하여 더욱 빠르고 효율적인 서적 유통을 실현할 수 있습니다. 양사의 리소스를 결합함으로써 비용 절감과 시장 확대를 동시에 달성할 수 있습니다. 서로의 플랫폼에서의 교차 홍보를 통해 브랜드 인지도를 높일 수 있습니다."
		// 		},
		// 		{
		// 			"name": "문학동네",
		// 			"summary": "문학동네는 창작자와 독자를 연결하는 문학 출판사로, 다양한 장르의 작품을 출간하고 있습니다. 중견작가와 신진작가에게 모두 동일한 기회를 제공하며, 문학적 실험을 통해 한국 문학을 세계에 알리고 있습니다. 그 외에도 어린이 및 청소년을 위한 다양한 읽을거리를 개발하며 독서 보급에 힘쓰고 있습니다.",
		// 			"address": "서울시 강남구 테헤란로 503, 섬유센터 17층",
		// 			"ceo_name": "이기섭",
		// 			"industry": "출판",
		// 			"year_founded": 1993,
		// 			"website": "https://www.munhak.com",
		// 			"latitude": 37.505193,
		// 			"longitude": 127.03458,
		// 			"match_reason": "문학동네는 출판업계에서 독보적인 위치를 가지고 있어 모두의 책방과 협력하여 새로운 작가들의 작품을 독자들에게 보다 널리 알릴 수 있습니다. 주로 온라인 플랫폼을 통해 책들을 홍보하고 있는데, 오프라인 독립서점과의 협력을 통해 상호 보완적 관계를 형성할 수 있습니다. 모두의 책방의 플랫폼을 통해 문학동네의 작품들이 더욱 다양한 독자 층에게 접근할 수 있게 됩니다. 독립 서적들과 신작 출판의 홍보 및 유통 과정을 통해 문학동네의 브랜드 가치를 강화할 수 있습니다. 양사는 작가와 독자 간의 네트워킹 및 이벤트를 공동 주최하여 더 많은 관심을 끌 수 있습니다. 상호간의 독자층에 맞춘 맞춤형 마케팅 전략을 통해 상호 이익을 극대화할 수 있습니다."
		// 		},
		// 		{
		// 			"name": "예스24",
		// 			"summary": "예스24는 대한민국 대표 온라인 서점으로, 도서뿐만 아니라 다양한 문화 상품과 콘텐츠를 제공합니다. 여러 독서 관련 이벤트와 구독 서비스를 통해 독서 문화를 장려하며, 포인트 적립 시스템 등을 도입하여 고객 만족도를 높입니다. 대규모 물류센터를 통해 신속하고 정확한 상품 배송을 실현하고 있습니다.",
		// 			"address": "서울시 영등포구 여의대로 24, 전경련회관 18층",
		// 			"ceo_name": "김석환",
		// 			"industry": "온라인 서점",
		// 			"year_founded": 2000,
		// 			"website": "http://www.yes24.com",
		// 			"latitude": 37.526677,
		// 			"longitude": 126.927437,
		// 			"match_reason": "예스24는 다양한 도서와 문화 상품을 제공하며 모두의 책방 이용자들에게 다양한 선택지를 제공합니다. 모두의 책방의 커스터마이즈된 책방 솔루션은 예스24의 고객들에게 더욱 개인화된 독서 경험을 선사할 수 있습니다. 두 회사는 협력하여 오프라인과 온라인을 넘나드는 통합 독서 플랫폼을 구축하는 데 도움을 줄 수 있습니다. 예스24의 물류 네트워크와의 협력으로 더 빠르고 효율적인 배송이 가능하며, 책방 운영자들에게 큰 도움이 됩니다. 예스24가 기획하는 독서 관련 이벤트와 캠페인에 모두의 책방이 참여하면 새로운 고객층을 개척할 수 있습니다. 기존 고객층에서 새로운 서비스 경험을 통해 충성도를 높일 수 있는 기회도 제공합니다. 서로의 플랫폼을 통해 다채로운 고객 경험을 교환함으로써 시장 내에서의 입지를 강화할 수 있습니다."
		// 		}
		// 	]
		// }

		return successResponse(recommendationResult);
	} catch (error) {
		console.log("error : ", error)
		return serverErrorResponse();
	}
};