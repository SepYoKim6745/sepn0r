---
name: build-qa
description: sepn0r 사이트의 빌드 검증, frontmatter 스키마 검사, 내부 링크 점검을 수행하는 QA 스킬. 콘텐츠 추가나 UI 변경 후 "검증해줘", "빌드 확인", "QA 해줘", "오류 없는지 확인" 요청 시 반드시 이 스킬을 사용하라. 에러가 발생했거나 빌드가 깨진 경우에도 즉시 트리거하라.
---

# 빌드 QA 스킬

## 검증 순서

### Step 1: Frontmatter 스키마 교차 비교

`src/content.config.ts`와 실제 `.md` 파일을 동시에 읽어 비교한다.

**labs 필수 필드:** `title`, `description`, `pubDate`
**portfolio 필수 필드:** `title`, `description`, `pubDate`

확인 항목:
- 필수 필드 존재 여부
- `pubDate` 형식 (`YYYY-MM-DD` 또는 ISO 날짜)
- URL 필드(`playgroundUrl`, `liveUrl`, `repoUrl`)가 있다면 유효한 URL 형식
- `featured` 타입이 boolean (`true`/`false`, 문자열 금지)

### Step 2: 내부 링크 하드코딩 탐지

`.astro` 파일에서 base path 없는 하드코딩 링크를 찾는다:

```bash
# 탐지 패턴 (Grep 도구로 검색)
href="/labs/
href="/portfolio/
href="/about/
```

올바른 패턴: `href={`${baseURL}/labs/`}`

### Step 3: 빌드 실행

```bash
cd /Users/kim-yosep/Desktop/sepn0r && npm run build
```

- 성공: `dist/` 디렉토리 생성, exit code 0
- 실패: 오류 메시지 전체를 수집하여 보고

### Step 4: 콘텐츠-컴포넌트 정합성

- `ContentCard`에 전달되는 `href`가 실제 라우트와 매핑되는지 확인
- `[id].astro`의 `getStaticPaths`가 모든 콘텐츠 파일을 커버하는지 확인
- portfolio 컬렉션 파일이 있는데 페이지에서 렌더링하지 않는 경우 탐지

## 검증 결과 보고 형식

```
## QA 검증 결과

### 통과 항목
- [x] frontmatter 스키마: 모든 파일 정상
- [x] 빌드: 성공 (0 errors)
- [x] 내부 링크: 하드코딩 없음

### 실패 항목
- [ ] src/data/labs/new-lab.md — pubDate 형식 오류 (현재: "2026/04/23", 필요: "2026-04-23")

### 수정 제안
...
```

## 빌드 오류 유형별 해결 방향

| 오류 패턴 | 원인 | 해결 |
|---------|------|------|
| `Missing required field` | frontmatter 필수 필드 누락 | content-writer에게 수정 요청 |
| `Invalid date` | 날짜 형식 오류 | frontmatter의 pubDate 수정 |
| `Cannot find module` | import 경로 오류 | ui-developer에게 수정 요청 |
| `getStaticPaths` 오류 | 동적 라우트 설정 오류 | `[id].astro` 확인 |
| `href` 관련 경고 | base URL 누락 | `import.meta.env.BASE_URL` 적용 |
