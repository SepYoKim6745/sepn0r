# 재발 방지 테스트 규칙

과거 에러에서 도출된 검증 항목. 변경 후 해당 영역의 테스트를 반드시 실행한다.

---

## 빌드 관련 변경 시

**트리거:** `astro.config.mjs`, `content.config.ts`, `package.json`, 레이아웃/컴포넌트 파일 변경

```bash
# 필수: 빌드 성공 확인
npm run build

# 필수: 페이지 수 확인 (현재 기대값과 비교)
find dist -name "*.html" | wc -l

# 필수: CSS 생성 확인
find dist/_astro -name "*.css" -size +0c | wc -l
```

**기대값:** 빌드 exit 0, HTML 파일 수 >= 8, CSS 파일 >= 1

---

## 내부 링크 변경 시

**트리거:** 새 페이지 추가, 내비게이션 수정, 링크 포함 컴포넌트 변경

```bash
# base path 누락 검사 — 결과가 없어야 정상
npm run build && grep -r 'href="/' dist/ | grep -v 'href="/sepn0r' | grep -v 'href="http'
```

**재발 방지 대상:** E3 (base path 누락 404)

---

## 콘텐츠 추가/수정 시

**트리거:** `src/data/labs/`, `src/data/portfolio/` 내 .md 파일 추가/수정

**체크리스트:**
1. `npm run build` — Zod 스키마 검증 통과 확인
2. 새 콘텐츠의 HTML이 `dist/`에 생성되었는지 확인
3. `playgroundUrl` 사용 시 — 완전한 URL인지 확인 (`https://` 필수)
4. `downloadFile` 사용 시 — `public/downloads/`에 파일 존재 확인
5. 파일명이 소문자 kebab-case인지 확인
6. `_` 접두사 파일은 의도적 제외인지 확인

**재발 방지 대상:** 빌드 타임 스키마 에러

---

## Gemini API 관련 변경 시

**트리거:** `prompt-scorer.astro` 내 API 호출 코드, 모델명, 프롬프트 변경

**체크리스트:**
1. 모델명이 현재 GA 상태인지 확인 (Google AI Studio에서 확인)
2. 429/503 폴백 경로가 유지되는지 확인
3. 코드 펜스 제거 로직이 유지되는지 확인
4. `normalizeGeminiResult` 정규화 로직이 유지되는지 확인
5. 실제 API 호출 테스트:
   - API 키 있을 때: Gemini 응답 → 결과 표시
   - API 키 없을 때: 키워드 폴백 → 결과 표시
   - rate limit 시: 황색 알림 + 키워드 폴백

**재발 방지 대상:** E5 (429), E6 (503), E7 (파싱 실패), E8 (구조 불일치)

---

## 폰트/CDN 변경 시

**트리거:** `BaseLayout.astro` head 영역, `global.css` 폰트 설정 변경

**체크리스트:**
1. CDN URL이 200 응답하는지 확인: `curl -sI "URL" | head -1`
2. `<link rel="preload">` 에 `crossorigin` 속성 포함 확인
3. `font-display: swap` 유지 확인
4. `npm run preview`로 폰트 렌더링 시각 확인

**재발 방지 대상:** E4 (CDN 403)

---

## CI/배포 설정 변경 시

**트리거:** `.github/workflows/deploy.yml`, Node 버전 변경, Astro 버전 변경

**체크리스트:**
1. `node-version`이 Astro 요구 버전과 일치하는지 확인
2. 로컬에서 해당 Node 버전으로 빌드 성공 확인
3. 배포 후 라이브 사이트에서 모든 페이지 접근 확인

**재발 방지 대상:** E1 (Node 버전 불일치)
