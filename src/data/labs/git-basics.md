---
title: "Git 기초: 버전 관리 시작하기"
description: "Git의 기본 개념과 핵심 명령어를 실습을 통해 배웁니다."
pubDate: 2026-04-18
tags: ["Git", "도구"]
category: "Git 기초"
downloadFile: "git-cheatsheet.pdf"
featured: true
---

## 1. Git 초기화

새 프로젝트를 Git으로 관리하려면 먼저 저장소를 초기화합니다.

```bash
mkdir my-project
cd my-project
git init
```

## 2. 파일 추적하기

파일을 만들고 Git에 추가합니다.

```bash
echo "# My Project" > README.md
git add README.md
git status
```

`git status`로 현재 상태를 확인할 수 있습니다.

## 3. 커밋하기

변경 사항을 저장(커밋)합니다.

```bash
git commit -m "첫 번째 커밋: README 추가"
```

## 4. 변경 이력 확인

```bash
git log --oneline
```

출력 예시:

```
a1b2c3d 첫 번째 커밋: README 추가
```

## 5. 브랜치 다루기

새로운 기능을 개발할 때는 브랜치를 만들어 작업합니다.

```bash
git branch feature/hello
git checkout feature/hello
```

또는 한 줄로:

```bash
git checkout -b feature/hello
```

## 핵심 명령어 정리

| 명령어 | 설명 |
|--------|------|
| `git init` | 저장소 초기화 |
| `git add` | 파일 스테이징 |
| `git commit` | 변경 사항 저장 |
| `git status` | 상태 확인 |
| `git log` | 이력 확인 |
| `git branch` | 브랜치 관리 |

다음 실습에서는 원격 저장소(GitHub)와의 연동을 배웁니다.
