# 에러를 막기 위한 구조적 규칙

코드 구조와 설계 수준에서 에러를 원천 차단하는 규칙.

---

## 규칙 1: 내부 링크는 반드시 `baseURL` 변수를 거친다

```astro
---
const baseURL = import.meta.env.BASE_URL;
---
<!-- 올바름 -->
<a href={`${baseURL}/labs/`}>Labs</a>

<!-- 금지: 하드코딩 경로 -->
<a href="/labs/">Labs</a>
```

**적용 범위:** 모든 `.astro` 파일의 `href`, 동적으로 생성하는 모든 내부 URL

**근거:** E3 — GitHub Pages 서브패스 배포(`/sepn0r`)에서 하드코딩 경로는 전부 404

---

## 규칙 2: 외부 API 호출에는 반드시 폴백 경로를 둔다

```
외부 호출 → 성공 → 정상 처리
          → 실패 (429/503/파싱 에러) → null 반환
                                     → 로컬 폴백 로직 실행
```

**필수 조건:**
- `null` 반환은 에러가 아닌 "폴백 신호"
- 폴백 결과도 동일한 인터페이스(`{ scores, feedback, summary }`)를 반환
- 폴백 사용 시 사용자에게 황색 알림으로 고지

**근거:** E5, E6 — 무료 API는 rate limit과 서비스 불안정이 상시 발생

---

## 규칙 3: LLM 응답은 정규화 레이어를 거친다

LLM이 반환하는 JSON 구조는 프롬프트만으로 보장되지 않는다.

```
API 응답 텍스트
  → 코드 펜스 제거
  → JSON.parse (1차: 전체, 2차: {...} 추출)
  → normalizeGeminiResult (구조 정규화)
  → null이면 폴백
```

**금지:** `JSON.parse` 결과를 검증 없이 바로 렌더링에 사용
**필수:** 기대하는 키가 존재하고 올바른 타입인지 검증 후 사용

**근거:** E7, E8 — 같은 모델이라도 응답 구조가 달라질 수 있음

---

## 규칙 4: 콘텐츠 스키마는 빌드 타임에 검증한다

```ts
// src/content.config.ts — Zod 스키마
z.object({
  title: z.string(),           // 필수
  pubDate: z.coerce.date(),    // 필수, 자동 변환
  tags: z.array(z.string()).default([]),  // 선택, 기본값
})
```

**원칙:**
- 필수 필드는 `z.string()` / `z.coerce.date()` — 빌드 시 누락되면 즉시 에러
- 선택 필드는 `.optional()` 또는 `.default()` — 런타임 undefined 방지
- URL 필드는 `z.string().url()` — 상대 경로 차단

**금지:** 런타임에 frontmatter 필드 존재 여부를 조건문으로 검사 (빌드 타임 검증이 우선)

---

## 규칙 5: CDN 의존성은 npm 경로를 우선한다

```html
<!-- 올바름: npm 패키지 경로 -->
<link href="https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/..." />

<!-- 금지: GitHub raw 프록시 경로 -->
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/..." />
```

**이유:** jsDelivr의 `gh/` 경로는 GitHub API rate limit에 영향받아 403 발생 가능. `npm/` 경로는 npm 레지스트리 기반으로 안정적.

**근거:** E4 — jsDelivr `gh/` 403 에러

---

## 규칙 6: CI 환경과 로컬 환경의 Node 버전을 일치시킨다

```yaml
# .github/workflows/deploy.yml
- uses: actions/setup-node@v4
  with:
    node-version: 22   # Astro v5 요구 버전과 일치
```

**확인 방법:**
```bash
node -v              # 로컬 버전
# deploy.yml의 node-version과 비교
```

**근거:** E1 — Astro 메이저 버전 변경 시 Node 요구 버전도 바뀜

---

## 규칙 7: 에러 UI 상태는 평가 시작 시 항상 초기화한다

```js
// 평가 시작 시
errorBox.classList.add('hidden');
errorBox.className = 'hidden mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600';
document.getElementById('result').classList.add('hidden');
```

**이유:** 이전 평가의 에러/결과가 남아 있으면 사용자가 혼동함. 매 시도마다 깨끗한 상태에서 시작.

---

## 규칙 요약

| # | 규칙 | 방어하는 에러 |
|---|------|-------------|
| 1 | 내부 링크에 `baseURL` 필수 | 배포 후 404 |
| 2 | 외부 API 폴백 경로 필수 | rate limit, 서비스 장애 |
| 3 | LLM 응답 정규화 레이어 필수 | 파싱 실패, 구조 불일치 |
| 4 | 콘텐츠 스키마 빌드 타임 검증 | frontmatter 오류 |
| 5 | CDN은 npm 경로 우선 | CDN 403/차단 |
| 6 | CI/로컬 Node 버전 일치 | 빌드 환경 불일치 |
| 7 | 에러 UI 매 시도마다 초기화 | UI 상태 오염 |
