---
title: "Python 파일 입출력: 파일 읽고 쓰기"
description: "open() 함수와 with문을 사용해 파일을 읽고 쓰는 방법을 배웁니다."
pubDate: 2026-04-26
tags: ["Python", "파일입출력"]
category: "Python"
order: 9
---

## 1. 파일 열기

Python에서 파일을 다루려면 `open()` 함수를 사용합니다. 파일을 열 때는 어떤 용도로 열 것인지 **모드**를 지정합니다.

| 모드 | 설명 |
|------|------|
| `"r"` | 읽기 (기본값). 파일이 없으면 오류 발생 |
| `"w"` | 쓰기. 파일이 있으면 내용을 지우고 새로 씀 |
| `"a"` | 추가. 기존 내용 뒤에 이어서 씀 |
| `"x"` | 새 파일 생성. 파일이 이미 있으면 오류 발생 |

```python
f = open("파일이름.txt", "모드")
# 파일 작업 수행
f.close()
```

파일을 열었으면 반드시 `close()`로 닫아야 합니다. 닫지 않으면 데이터가 저장되지 않거나 다른 프로그램에서 파일을 사용할 수 없게 됩니다.

## 2. 파일 쓰기

`"w"` 모드로 파일을 열고 `write()` 메서드로 내용을 씁니다. 파일이 없으면 새로 만들어지고, 이미 있으면 기존 내용이 모두 지워집니다.

```python
f = open("test.txt", "w")
f.write("Hello, Python!\n")
f.write("파일 쓰기를 배우고 있습니다.\n")
f.close()
```

실행하면 `test.txt` 파일이 생성되고, 그 안에 두 줄의 텍스트가 저장됩니다.

여러 줄을 한번에 쓰려면 `writelines()`를 사용할 수 있습니다.

```python
lines = ["첫 번째 줄\n", "두 번째 줄\n", "세 번째 줄\n"]

f = open("test2.txt", "w")
f.writelines(lines)
f.close()
```

## 3. 파일 읽기

`"r"` 모드로 파일을 열고 내용을 읽습니다.

### read() - 전체 읽기

파일 내용 전체를 하나의 문자열로 읽어옵니다.

```python
f = open("test.txt", "r")
content = f.read()
print(content)
f.close()
```

출력:

```
Hello, Python!
파일 쓰기를 배우고 있습니다.
```

### readline() - 한 줄씩 읽기

파일에서 한 줄만 읽어옵니다. 호출할 때마다 다음 줄로 넘어갑니다.

```python
f = open("test.txt", "r")
line1 = f.readline()
line2 = f.readline()
print(f"첫 번째 줄: {line1}", end="")
print(f"두 번째 줄: {line2}", end="")
f.close()
```

출력:

```
첫 번째 줄: Hello, Python!
두 번째 줄: 파일 쓰기를 배우고 있습니다.
```

### readlines() - 줄 단위 리스트로 읽기

파일의 모든 줄을 리스트로 반환합니다. 각 줄이 리스트의 한 요소가 됩니다.

```python
f = open("test.txt", "r")
lines = f.readlines()
print(lines)
f.close()
```

출력:

```
['Hello, Python!\n', '파일 쓰기를 배우고 있습니다.\n']
```

## 4. with문 사용 (추천)

`with`문을 사용하면 `close()`를 직접 호출하지 않아도 자동으로 파일이 닫힙니다. 코드가 더 간결하고 안전합니다.

```python
# with문으로 파일 쓰기
with open("memo.txt", "w") as f:
    f.write("with문을 사용하면\n")
    f.write("close()를 안 써도 됩니다.\n")

# with문으로 파일 읽기
with open("memo.txt", "r") as f:
    content = f.read()
    print(content)
```

출력:

```
with문을 사용하면
close()를 안 써도 됩니다.
```

`with` 블록이 끝나면 파일이 자동으로 닫히므로, 실수로 `close()`를 빼먹을 걱정이 없습니다. 파일을 다룰 때는 항상 `with`문을 사용하는 것을 권장합니다.

## 5. 실습 예제

### 예제 1: 메모장에 글쓰기

사용자에게 문장을 입력받아 파일에 저장하는 프로그램입니다.

```python
with open("my_memo.txt", "w") as f:
    f.write("오늘의 할 일:\n")
    f.write("1. Python 공부하기\n")
    f.write("2. 운동하기\n")
    f.write("3. 책 읽기\n")

print("메모가 저장되었습니다.")
```

출력:

```
메모가 저장되었습니다.
```

### 예제 2: 파일에서 읽어 출력하기

저장된 메모 파일을 읽어서 번호와 함께 출력합니다.

```python
with open("my_memo.txt", "r") as f:
    lines = f.readlines()

print("=== 저장된 메모 ===")
for i, line in enumerate(lines, 1):
    print(f"{i}. {line}", end="")
```

출력:

```
=== 저장된 메모 ===
1. 오늘의 할 일:
2. 1. Python 공부하기
3. 2. 운동하기
4. 3. 책 읽기
```

### 예제 3: 추가 모드로 쓰기

기존 파일에 내용을 추가합니다. `"a"` 모드를 사용하면 기존 내용이 지워지지 않습니다.

```python
# 기존 파일에 내용 추가
with open("my_memo.txt", "a") as f:
    f.write("4. 일찍 자기\n")
    f.write("5. 물 많이 마시기\n")

# 추가된 내용 확인
with open("my_memo.txt", "r") as f:
    print(f.read())
```

출력:

```
오늘의 할 일:
1. Python 공부하기
2. 운동하기
3. 책 읽기
4. 일찍 자기
5. 물 많이 마시기
```

## 6. 연습 문제

### 문제 1

일기 작성 프로그램을 만드세요. `diary.txt` 파일에 날짜와 내용을 함께 저장합니다.

```python
# diary.txt에 아래 내용을 저장하세요
# 2026-04-26
# 오늘은 Python 파일 입출력을 배웠다.
# 생각보다 쉬웠다!

# 여기에 코드를 작성하세요
```

### 문제 2

아래 내용이 담긴 `scores.txt` 파일을 만들고, 파일을 읽어서 각 줄을 출력하세요.

```python
# scores.txt 내용:
# 국어 90
# 영어 85
# 수학 95
# 과학 88

# 1단계: 파일 쓰기
# 여기에 코드를 작성하세요

# 2단계: 파일 읽어서 출력하기
# 여기에 코드를 작성하세요
```

### 문제 3

쇼핑 리스트를 파일에 저장하는 프로그램을 만드세요. 리스트의 각 항목을 한 줄씩 `shopping.txt`에 저장합니다.

```python
shopping = ["사과 3개", "우유 1개", "빵 2개", "계란 1판"]

# shopping.txt에 리스트 항목을 한 줄씩 저장하세요
# 여기에 코드를 작성하세요

# 저장된 내용을 읽어서 출력하세요
# 여기에 코드를 작성하세요
```

### 문제 4

숫자가 한 줄에 하나씩 저장된 파일을 만들고, 파일을 읽어 모든 숫자의 합계를 구하세요.

```python
# numbers.txt 내용:
# 10
# 20
# 30
# 40
# 50

# 1단계: 파일 쓰기
# 여기에 코드를 작성하세요

# 2단계: 파일 읽어서 합계 구하기
# 여기에 코드를 작성하세요

# 출력 예시: 합계: 150
```

다음 실습에서는 Python의 딕셔너리에 대해 알아보겠습니다.
