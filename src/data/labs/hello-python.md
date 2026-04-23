---
title: "Python 기초: Hello World부터 시작하기"
description: "Python 개발 환경 설정부터 첫 번째 프로그램 작성까지 단계별로 알아봅니다."
pubDate: 2026-04-20
tags: ["Python", "입문"]
category: "Python"
playgroundUrl: "https://codesandbox.io/p/sandbox/python-hello"
featured: true
---

## 1. Python 설치 확인

터미널에서 Python이 설치되어 있는지 확인합니다.

```bash
python3 --version
```

Python 3.10 이상이 출력되면 준비 완료입니다.

## 2. 첫 번째 프로그램

`hello.py` 파일을 만들고 다음 코드를 작성합니다.

```python
def greet(name: str) -> str:
    """인사말을 반환하는 함수"""
    return f"안녕하세요, {name}님!"

if __name__ == "__main__":
    message = greet("세계")
    print(message)
```

## 3. 실행

```bash
python3 hello.py
```

출력:

```
안녕하세요, 세계님!
```

## 4. 연습 문제

다음을 시도해보세요:

1. `greet` 함수에 시간대별 인사를 추가해보세요 (오전/오후/저녁)
2. 사용자 입력을 받아 이름을 동적으로 전달해보세요

```python
name = input("이름을 입력하세요: ")
print(greet(name))
```

다음 실습에서는 Python의 자료구조에 대해 알아보겠습니다.
