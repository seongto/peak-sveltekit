// request body 유효성 검사기
// 텍스트의 배열로 패러미터를 넘겨주면 해당 배열의 문자열에 해당하는 키가 대상 오브젝트에 모두 존재하는지, 빈값인지 확인.
// 모두 정상일 경우 null 반환.
export function validateRequiredFields(obj: any, fields: string[]): string | null {
    for (const field of fields) {
        if (obj[field] === undefined) {
            return `필수 필드 '${field}'가 누락되었습니다.`;
        }
    }
    return null;
}