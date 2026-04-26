# 에러 처리 공통원칙

이 프로젝트에서 에러를 다루는 기본 철학과 패턴.

---

## 원칙 1: 외부 의존성은 반드시 실패한다고 가정

외부 API, CDN, 서드파티 서비스는 언제든 실패할 수 있다. 모든 외부 호출에는 폴백 경로가 있어야 한다.

**적용 사례:**
- Gemini API → 키워드 기반 로컬 평가로 폴백 (`prompt-scorer.astro`)
- jsDelivr CDN 403 → npm CDN으로 대체 (Pretendard 폰트)

**패턴:**
```js
// 외부 API 호출 시 항상 null 반환 경로 확보
if (res.status === 429 || res.status === 503) return null; // 폴백 신호
```

## 원칙 2: 에러 심각도에 따라 UI 표현을 구분

| 심각도 | UI 표현 | 예시 |
|--------|---------|------|
| 치명적 (기능 불가) | 빨간 에러 박스 (`border-red-200 bg-red-50 text-red-600`) | API 키 오류, 네트워크 단절 |
| 경고 (폴백 동작) | 황색 알림 (`border-amber-200 bg-amber-50 text-amber-700`) | 429 rate limit → 키워드 폴백 |
| 정상 저하 | 사용자에게 표시하지 않음 | 응답 구조 다름 → 정규화 후 정상 처리 |

## 원칙 3: 빌드 타임에 잡을 수 있는 에러는 런타임에 남기지 않는다

- 콘텐츠 스키마 검증은 Zod + Astro 빌드 타임 검증 (`content.config.ts`)
- 내부 링크 경로는 `${baseURL}` 변수로 빌드 타임에 결정
- TypeScript 타입 오류는 `astro build`에서 잡힘

## 원칙 4: 파싱 실패에는 다단계 전략을 적용

외부 시스템 응답은 예상 포맷을 벗어날 수 있다. 한 가지 파싱만 시도하고 포기하지 않는다.

**현재 적용된 다단계 파싱 (`prompt-scorer.astro`):**
1. 마크다운 코드 펜스 제거 (` ```json ... ``` `)
2. 전체 텍스트 직접 `JSON.parse`
3. `{...}` 블록 추출 후 재파싱
4. 정규화 (`normalizeGeminiResult`) — 다른 키 구조 대응
5. 모든 파싱 실패 시 `null` 반환 → 키워드 폴백

## 원칙 5: 에러 로그는 디버깅에 충분한 정보를 남긴다

```js
console.log('[Gemini] 원본 응답:', raw);       // 성공 시에도 원본 기록
console.error('[Gemini] 정규화 불가:', parsed); // 구조 불일치 시 파싱 결과 기록
console.error('[Gemini] 파싱 실패');            // 파싱 자체 실패 시
```

**접두사 컨벤션:** `[모듈명]` 형태로 출처를 표시한다.

## 원칙 6: 사용자 입력 검증은 최소한으로, 즉시

```js
const prompt = input.value.trim();
if (!prompt) { input.focus(); return; } // 빈 입력 → 즉시 포커스 복귀, 에러 메시지 불필요
```

- 불필요한 에러 메시지를 띄우지 않는다
- 입력 부재 같은 자명한 케이스는 UX로 해결한다
