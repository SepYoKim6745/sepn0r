# 에러 발생 기록 & 대응 이력

실제로 발생한 에러와 해결 과정을 시간순으로 기록. 동일한 패턴의 에러 재발 시 참조.

---

## E1: GitHub Pages 배포 실패 — Node 버전 불일치

| 항목 | 내용 |
|------|------|
| 커밋 | `d12579d`, `c0a86c6` |
| 증상 | CI에서 빌드 실패, Astro가 요구하는 Node 버전과 CI 환경 불일치 |
| 원인 | Astro v6 → Node 22 필요, CI에서 구버전 사용 |
| 대응 | `.github/workflows/deploy.yml`에 `node-version: 22` 명시 |
| 추가 조치 | Astro v6 → v5로 다운그레이드 (안정성), CSS import 누락 수정 |

## E2: CSS 미적용 — 스타일 import 누락

| 항목 | 내용 |
|------|------|
| 커밋 | `c0a86c6` |
| 증상 | 배포된 사이트에 스타일 전혀 적용되지 않음 |
| 원인 | `BaseLayout.astro`에서 `global.css` import 누락 |
| 대응 | `import '../styles/global.css'` 추가 |
| 교훈 | Tailwind v4는 `@tailwindcss/vite` 플러그인만으로 동작하지 않고 CSS import가 필요 |

## E3: 모든 내부 링크 404 — base path 누락

| 항목 | 내용 |
|------|------|
| 커밋 | `316841e`, `01f3d00`, `fe8c8ba` |
| 증상 | GitHub Pages에서 모든 내부 링크가 404 |
| 원인 | `base: '/sepn0r'` 설정 후에도 링크에 하드코딩된 `/labs/`, `/portfolio/` 등 사용 |
| 대응 | 모든 내부 `href`를 `${import.meta.env.BASE_URL}` 접두사로 변경 |
| 교훈 | GitHub Pages 서브패스 배포 시 base path는 config만으로 해결되지 않음 — 모든 내부 링크를 변수로 참조해야 함 |

## E4: Pretendard 폰트 로드 실패 — CDN 403

| 항목 | 내용 |
|------|------|
| 커밋 | `f643269` |
| 증상 | 폰트가 로드되지 않아 기본 시스템 폰트로 표시 (FOUT) |
| 원인 | jsDelivr의 `gh/` 경로가 403 반환 (GitHub raw 파일 프록시 제한) |
| 대응 | jsDelivr `npm/` 경로로 변경 (`cdn.jsdelivr.net/npm/pretendard@latest/...`) |
| 교훈 | jsDelivr `gh/` 경로는 불안정 — npm 패키지 경로 우선 사용 |

## E5: Gemini API 429 Rate Limit

| 항목 | 내용 |
|------|------|
| 커밋 | `4411fe7` |
| 증상 | 프롬프트 평가 시 빨간 에러 메시지 — 사용자 경험 저하 |
| 원인 | 무료 티어 Gemini API 요청 제한 초과 |
| 대응 | 429 시 `null` 반환 → 키워드 폴백 자동 전환, 황색 알림으로 변경 |
| 교훈 | rate limit은 에러가 아닌 예상 가능한 상태 — 치명적 에러 UI가 아닌 graceful degradation 필요 |

## E6: Gemini 모델 503 — 미GA 모델 호출

| 항목 | 내용 |
|------|------|
| 커밋 | `bb1e8fc`, `17380d6`, `b6f9bd6`, `4d0e155` |
| 증상 | `gemini-2.5-flash` 호출 시 503 반환 |
| 원인 | 모델이 GA 전이라 안정적으로 서빙되지 않음 |
| 대응 | `gemini-1.5-flash` → `gemini-2.0-flash-lite` → `gemini-2.5-flash-lite`로 안정 모델 탐색, 503도 429와 동일하게 폴백 처리 |
| 교훈 | LLM API 모델명은 가용성이 자주 변함 — 모델 변경이 코드 1줄 수정으로 가능하도록 URL에 모델명 직접 삽입 |

## E7: Gemini 응답 JSON 파싱 실패

| 항목 | 내용 |
|------|------|
| 커밋 | `31ded9d`, `8d8f3f3` |
| 증상 | 응답은 200이지만 결과가 표시되지 않음 |
| 원인 | 모델이 JSON을 마크다운 코드 펜스(` ```json `)로 감싸서 반환, 또는 예상과 다른 구조로 반환 |
| 대응 | 코드 펜스 제거 → 직접 파싱 → `{...}` 추출 파싱 다단계 전략, 파싱 전 구조 검증 추가 |

## E8: Gemini 응답 키 구조 불일치

| 항목 | 내용 |
|------|------|
| 커밋 | `ba1bd12` |
| 증상 | JSON 파싱 성공했으나 `renderResult`에서 undefined 접근 |
| 원인 | 모델이 `evaluation.R.score` 구조로 반환 (기대: `scores.role`) |
| 대응 | `normalizeGeminiResult()` 어댑터로 다양한 구조를 정규화, system prompt에 JSON 스키마 명시 강화 |
| 교훈 | LLM 응답 포맷은 프롬프트로 완벽히 통제되지 않음 — 어댑터 레이어 필수 |
