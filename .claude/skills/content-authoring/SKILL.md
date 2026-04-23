---
name: content-authoring
description: sepn0r 사이트의 실습 자료(labs)와 포트폴리오(portfolio) Markdown 콘텐츠 작성 스킬. 새 실습 자료 추가, 포트폴리오 항목 작성, 기존 콘텐츠 수정 요청 시 반드시 이 스킬을 사용하라. "실습 자료 써줘", "lab 추가", "포트폴리오 항목 만들어", "강의 자료 작성" 등의 요청에 즉시 이 스킬을 트리거하라.
---

# 콘텐츠 작성 스킬

## 파일 위치

| 콘텐츠 유형 | 경로 |
|-----------|------|
| 실습 자료 | `src/data/labs/{slug}.md` |
| 포트폴리오 | `src/data/portfolio/{slug}.md` |

파일명(slug): 소문자 + 하이픈 구분 (예: `git-basics.md`, `react-todo-app.md`)

## Labs Frontmatter 템플릿

```yaml
---
title: "주제: 부제목"
description: "카드에 노출되는 한 줄 요약. 2줄 이내로 간결하게."
pubDate: 2026-04-23
tags: ["언어/프레임워크", "난이도"]
featured: false
# 선택 필드:
# updatedDate: 2026-04-23
# playgroundUrl: "https://codesandbox.io/..."
# downloadFile: "파일명.zip"
# order: 1
---
```

## Portfolio Frontmatter 템플릿

```yaml
---
title: "프로젝트 이름"
description: "프로젝트 한 줄 설명"
pubDate: 2026-04-23
tags: ["React", "TypeScript"]
featured: false
# 선택 필드:
# thumbnail: "/images/project-thumb.png"
# liveUrl: "https://..."
# repoUrl: "https://github.com/..."
---
```

## Labs 본문 구조

단계별 진행을 기본 패턴으로 한다:

```markdown
## 1. 개요 / 환경 확인
(왜 이 주제를 배우는가, 사전 준비)

## 2. 핵심 개념
(개념 설명 + 코드 예시)

## 3. 실습
(단계별 코드 작성)

## 4. 실행 및 결과 확인
(실행 커맨드 + 예상 출력)

## 5. 연습 문제
(심화 과제 2~3개)
```

## 코드 블록 규칙

- 언어 태그 필수: ` ```python `, ` ```bash `, ` ```js `
- 실행 커맨드와 출력은 분리:

```bash
python3 hello.py
```

```
안녕하세요, 세계님!
```

## 태그 컨벤션

- 언어: `Python`, `JavaScript`, `TypeScript`, `HTML`, `CSS`
- 프레임워크: `React`, `Astro`, `Node.js`
- 난이도: `입문`, `중급`, `심화`
- 주제: `Git`, `알고리즘`, `데이터구조`

## 주의사항

- `src/content.config.ts`를 먼저 읽어 현재 스키마를 확인한다
- `featured: true`로 설정하면 홈페이지 카드에 노출된다 (신중하게 사용)
- `playgroundUrl`은 실제 접속 가능한 외부 URL만 사용한다
- 작성 완료 후 qa-verifier에게 검증을 요청한다
