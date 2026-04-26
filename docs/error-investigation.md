# 에러 조사 절차

에러가 발생했을 때 따르는 단계별 조사 프로세스.

---

## 1단계: 에러 분류

에러를 먼저 분류하여 조사 범위를 좁힌다.

| 분류 | 증상 | 조사 시작점 |
|------|------|------------|
| **빌드 실패** | `npm run build` 비정상 종료 | 빌드 로그 마지막 `[ERROR]` 라인 |
| **배포 후 404** | 페이지 접근 불가 | `dist/` 내 해당 HTML 존재 여부, base path 확인 |
| **스타일 미적용** | 레이아웃 깨짐, 폰트 누락 | `dist/_astro/*.css` 존재 여부, CDN 응답 확인 |
| **API 런타임 에러** | 기능 동작 안 함 | 브라우저 콘솔 `[Gemini]` 로그 |
| **콘텐츠 누락** | 목록에 항목 안 보임 | frontmatter 스키마 검증, 파일명 패턴 (`_` 접두사 제외) |

## 2단계: 빌드 에러 조사

```bash
# 1. 빌드 실행 및 에러 확인
npm run build 2>&1 | grep -E '\[ERROR\]|Error:|error'

# 2. 콘텐츠 스키마 에러 시 — 어떤 파일의 어떤 필드인지 확인
# Astro가 파일명과 Zod 에러 메시지를 출력함

# 3. import 에러 시 — 해당 파일 존재 여부 확인
ls src/components/  # 컴포넌트 존재 확인
ls src/layouts/     # 레이아웃 존재 확인
```

## 3단계: 배포 후 에러 조사

```bash
# 1. base path 누락 링크 탐색
grep -r 'href="/' dist/ | grep -v 'href="/sepn0r' | grep -v 'href="http'

# 2. 생성된 페이지 수 확인
find dist -name "*.html" | sort

# 3. CSS 파일 존재 및 크기 확인
find dist/_astro -name "*.css" -size +0c

# 4. 특정 페이지의 stylesheet 링크 확인
grep 'rel="stylesheet"' dist/index.html
```

## 4단계: API 런타임 에러 조사

브라우저 개발자 도구 콘솔에서 확인:

```
[Gemini] 원본 응답: ...    → API 응답이 왔는지, 어떤 형태인지
[Gemini] 파싱 실패          → JSON 파싱 단계에서 실패
[Gemini] 정규화 불가: ...   → JSON은 파싱됐으나 키 구조 불일치
```

**네트워크 탭 확인 순서:**
1. HTTP 상태 코드 (200 / 429 / 503 / 기타)
2. 응답 본문 (에러 메시지 또는 예상 외 형태)
3. 요청 페이로드 (API 키 포함 여부, 모델명 정확성)

## 5단계: 폰트/CDN 에러 조사

```bash
# CDN URL 직접 확인
curl -sI "https://cdn.jsdelivr.net/npm/pretendard@latest/dist/web/variable/pretendardvariable-dynamic-subset.woff2" | head -5
```

- 403/404 → CDN 경로 변경 필요
- 200 → 브라우저 캐시 또는 CORS 문제 (crossorigin 속성 확인)

## 6단계: git 이력 기반 조사

유사한 에러가 과거에 발생했는지 확인:

```bash
# fix 커밋에서 패턴 검색
git log --oneline --grep="fix" | grep -i "키워드"

# 특정 파일의 변경 이력
git log --oneline -- src/pages/labs/prompt-scorer.astro

# 에러 기록 문서 참조
# → docs/error-log.md
```
