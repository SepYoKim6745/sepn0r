---
name: site-orchestrator
description: sepn0r 사이트 전체 작업을 조율하는 오케스트레이터. "사이트 업데이트", "실습 자료 추가하고 UI도 바꿔", "포트폴리오 작성하고 빌드까지", "전체 작업 해줘", "다시 실행", "재실행", "이전 결과 업데이트" 등 여러 에이전트가 협업해야 하는 복합 요청 시 이 스킬을 사용하라.
---

# site-orchestrator

**실행 모드:** 에이전트 팀 (팬아웃/팬인 패턴)

## Phase 0: 컨텍스트 확인

작업 시작 전 기존 산출물 유무를 확인한다:

- `_workspace/` 존재 + 사용자가 부분 수정 요청 → **부분 재실행** (해당 에이전트만 재호출)
- `_workspace/` 존재 + 사용자가 새 입력 제공 → **새 실행** (기존 `_workspace`를 `_workspace_prev`로 이동)
- `_workspace/` 미존재 → **초기 실행**

## Phase 1: 작업 분석 및 팀 구성

### 1-1. 요청 유형 분류

| 요청 유형 | 담당 에이전트 | 실행 순서 |
|---------|------------|---------|
| 콘텐츠만 (실습 자료/포트폴리오 작성) | content-writer → qa-verifier | 순차 |
| UI만 (컴포넌트/페이지/스타일 변경) | ui-developer → qa-verifier | 순차 |
| 복합 (콘텐츠 + UI 동시) | content-writer + ui-developer (병렬) → qa-verifier | 팬아웃 후 순차 QA |

### 1-2. 팀 구성

```
TeamCreate(
  team_name: "sepn0r-team",
  members: ["content-writer", "ui-developer", "qa-verifier"]
)
```

복합 요청이 아니면 필요한 에이전트만 포함한다.

## Phase 2: 작업 할당

### 콘텐츠 작업 (content-writer)

TaskCreate로 할당:
- 작성할 파일 경로 (`src/data/labs/{slug}.md`)
- 콘텐츠 주제, 포함할 예제 언어, 태그 후보
- `featured` 여부

### UI 작업 (ui-developer)

TaskCreate로 할당:
- 변경 대상 파일 목록
- UI 요구사항 상세 (새 컴포넌트 spec, 스타일 변경 내용)
- base URL 패턴 준수 필수

### 데이터 전달 프로토콜

- **파일 기반**: 중간 산출물은 `_workspace/` 하위에 저장
  - 파일명: `{phase}_{agent}_{artifact}.md` (예: `02_content-writer_lab.md`)
- **메시지 기반**: 완료 알림은 SendMessage로 qa-verifier에게 전송
- **태스크 기반**: 의존 관계는 TaskCreate의 `dependencies` 필드로 관리

## Phase 3: 병렬 실행 (복합 요청 시)

content-writer와 ui-developer가 독립적으로 병렬 작업:

```
content-writer:
  - 콘텐츠 파일 작성
  - 완료 후 → SendMessage to qa-verifier: "콘텐츠 완료: {파일경로}"

ui-developer:
  - UI 파일 수정/생성
  - 완료 후 → SendMessage to qa-verifier: "UI 완료: {파일목록}"
```

두 작업이 모두 완료된 것을 확인한 후 Phase 4로 진행.

## Phase 4: QA 검증

qa-verifier가 순차 실행:
1. Frontmatter 스키마 검증
2. 내부 링크 하드코딩 탐지
3. `npm run build` 실행
4. 콘텐츠-컴포넌트 정합성 확인

검증 실패 시:
- 해당 에이전트에게 수정 요청 (SendMessage)
- 수정 완료 후 QA 재실행 (1회까지)
- 재실패 시: 실패 항목을 보고서에 명시하고 사용자에게 수동 수정 요청

## Phase 5: 결과 종합 및 보고

최종 보고 형식:

```
## 작업 완료 보고

### 생성/수정된 파일
- src/data/labs/new-lab.md (신규)
- src/components/SomeComponent.astro (수정)

### QA 결과
- 빌드: 성공
- 스키마 검증: 통과
- 내부 링크: 정상

### 후속 작업 제안
- ...
```

## 에러 핸들링

| 상황 | 처리 방식 |
|------|---------|
| 에이전트 1회 실패 | 오류 내용 전달 후 재시도 1회 |
| 에이전트 2회 연속 실패 | 해당 작업 건너뜀 + 보고서에 명시 |
| 빌드 실패 | qa-verifier가 오류 분석 후 담당 에이전트에게 수정 요청 |
| 스키마 불일치 | content-writer에게 frontmatter 수정 요청 |

## 테스트 시나리오

### 정상 흐름
1. "Python 기초 2탄 실습 자료 추가해줘" → content-writer 단독 → qa-verifier
2. "Labs 카드에 난이도 배지 추가해줘" → ui-developer 단독 → qa-verifier
3. "Git 실습 자료 추가하고 포트폴리오 페이지 디자인도 개선해줘" → content-writer + ui-developer 병렬 → qa-verifier

### 에러 흐름
1. frontmatter `pubDate` 형식 오류 → qa-verifier 탐지 → content-writer 수정 → qa-verifier 재검증
2. 내부 링크 하드코딩 → qa-verifier 탐지 → ui-developer 수정 → 빌드 재실행
