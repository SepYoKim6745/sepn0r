# sepn0r 프로젝트

Astro v5 + Tailwind CSS v4 개인 포트폴리오 & 강의 실습 자료 사이트. GitHub Pages 배포 (`/sepn0r` base path).

## 핵심 규칙

- 모든 내부 링크에 `${baseURL}` 접두사 필수 (base: `/sepn0r`)
- Tailwind neutral 팔레트만 사용, 비neutral 색상 금지
- 모든 페이지는 `BaseLayout.astro` 래퍼 사용
- 콘텐츠 컬렉션 스키마는 `src/content.config.ts` (Zod)로 빌드 타임 검증

## docs/ 문서 구조

| 문서 | 내용 |
|------|------|
| [user-flows.md](docs/user-flows.md) | 사이트 내비게이션, Labs 목록/상세, 모바일 메뉴 동작 |
| [content-schema.md](docs/content-schema.md) | Labs 콘텐츠 스키마, Zod 검증 규칙, frontmatter 예시 |
| [ui-rules.md](docs/ui-rules.md) | 레이아웃, 타이포그래피, 컬러 팔레트, 컴포넌트 패턴 |
| [accessibility.md](docs/accessibility.md) | WCAG 2.1 AA, ARIA, 키보드 내비게이션, 시맨틱 HTML |
| [quality-gates.md](docs/quality-gates.md) | 빌드 게이트, 검증 체크리스트, 배포 확인 절차 |
| [error-principles.md](docs/error-principles.md) | 에러 처리 공통원칙 (폴백, 심각도 분류, 다단계 파싱) |
| [error-log.md](docs/error-log.md) | 실제 발생 에러 8건의 원인·대응·교훈 기록 |
| [error-investigation.md](docs/error-investigation.md) | 에러 유형별 조사 절차 (빌드/배포/API/CDN) |
| [error-prevention-tests.md](docs/error-prevention-tests.md) | 변경 영역별 재발 방지 테스트 체크리스트 |
| [error-structural-rules.md](docs/error-structural-rules.md) | 에러 원천 차단 구조적 규칙 7개 |

## 하네스: sepn0r 사이트

**트리거:** 복합 작업 → `site-orchestrator` / 콘텐츠만 → `content-authoring` / UI만 → `astro-ui` / 검증만 → `build-qa`

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-04-23 | 초기 하네스 구성 | 에이전트 팀 자동화 체계 구축 |
| 2026-04-26 | docs/ 구조 분리 | CLAUDE.md를 목차화, 지식은 docs/에 분산 |
