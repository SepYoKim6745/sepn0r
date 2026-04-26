---
title: "Python 반복문: for와 while로 반복하기"
description: "for문과 while문을 사용해 반복 작업을 효율적으로 처리하는 방법을 배웁니다."
pubDate: 2026-04-26
tags: ["Python", "반복문"]
category: "Python"
order: 6
---

## 1. 반복문이란?

프로그래밍에서 같은 작업을 여러 번 반복해야 할 때 반복문을 사용합니다. 예를 들어, "안녕하세요"를 100번 출력하려면 `print()`를 100번 쓰는 대신 반복문 한 번으로 해결할 수 있습니다.

Python에는 두 가지 반복문이 있습니다.

- **for문**: 정해진 횟수만큼 반복할 때 사용
- **while문**: 특정 조건을 만족하는 동안 반복할 때 사용

## 2. for문

### 기본 구조

```python
for 변수 in 반복 가능한 자료:
    실행할 코드
```

`반복 가능한 자료`에는 리스트, 문자열, `range()` 등이 올 수 있습니다. 자료의 요소를 하나씩 꺼내 `변수`에 넣고, 들여쓰기된 코드를 실행합니다.

### 리스트 반복

```python
fruits = ["사과", "바나나", "포도"]

for fruit in fruits:
    print(fruit)
```

출력:

```
사과
바나나
포도
```

리스트의 요소를 처음부터 끝까지 하나씩 꺼내서 `fruit` 변수에 넣고 `print()`를 실행합니다.

### range() 함수

`range()`는 연속된 숫자를 생성하는 함수입니다.

| 사용법 | 의미 | 생성되는 숫자 |
|--------|------|--------------|
| `range(5)` | 0부터 4까지 | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1부터 5까지 | 1, 2, 3, 4, 5 |
| `range(0, 10, 2)` | 0부터 9까지 2씩 증가 | 0, 2, 4, 6, 8 |

```python
for i in range(1, 6):
    print(i)
```

출력:

```
1
2
3
4
5
```

### 문자열 반복

문자열도 한 글자씩 반복할 수 있습니다.

```python
for char in "Hello":
    print(char)
```

출력:

```
H
e
l
l
o
```

## 3. while문

### 기본 구조

```python
while 조건식:
    실행할 코드
```

조건식이 `True`인 동안 코드를 반복 실행합니다. 조건식이 `False`가 되면 반복을 멈춥니다.

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

출력:

```
1
2
3
4
5
```

`count`가 1부터 시작해서 매 반복마다 1씩 증가합니다. `count`가 6이 되면 조건 `count <= 5`가 거짓이 되어 반복이 끝납니다.

### 주의: 무한 루프

`while`문을 사용할 때는 조건이 언젠가 `False`가 되도록 만들어야 합니다. 그렇지 않으면 프로그램이 영원히 멈추지 않는 **무한 루프**에 빠집니다.

```python
# 이 코드는 무한 루프입니다 (실행하지 마세요!)
count = 1
while count <= 5:
    print(count)
    # count += 1 을 빠뜨리면 count가 항상 1이므로 영원히 반복
```

무한 루프에 빠졌을 때는 `Ctrl + C`를 눌러 프로그램을 강제로 종료할 수 있습니다.

### while문으로 합 구하기

```python
numbers = [10, 20, 30, 40, 50]
total = 0
index = 0

while index < len(numbers):
    total += numbers[index]
    index += 1

print(f"합계: {total}")
```

출력:

```
합계: 150
```

## 4. break와 continue

### break: 반복문 즉시 종료

`break`를 만나면 반복문을 즉시 빠져나갑니다.

```python
for num in range(10):
    if num == 5:
        break
    print(num)
```

출력:

```
0
1
2
3
4
```

`num`이 5가 되면 `break`가 실행되어 반복문이 종료됩니다. 5 이후의 숫자는 출력되지 않습니다.

### continue: 현재 반복 건너뛰기

`continue`를 만나면 현재 반복의 나머지 코드를 건너뛰고 다음 반복으로 넘어갑니다.

```python
for num in range(5):
    if num == 2:
        continue
    print(num)
```

출력:

```
0
1
3
4
```

`num`이 2일 때 `continue`가 실행되어 `print(num)`을 건너뜁니다. 반복문 자체는 계속됩니다.

### break와 continue 비교

```python
# break: 3을 만나면 반복 종료
for i in range(5):
    if i == 3:
        break
    print(i)
# 출력: 0 1 2

print("---")

# continue: 3을 건너뛰고 계속 반복
for i in range(5):
    if i == 3:
        continue
    print(i)
# 출력: 0 1 2 4
```

## 5. 연습 문제

### 문제 1

다음 코드의 출력 결과를 예측해보세요.

```python
for char in "hello":
    print(char.upper())
```

### 문제 2

`while`문을 사용해 1부터 20까지의 홀수만 출력하는 코드를 작성하세요.

```python
# 여기에 코드를 작성하세요
# 출력 예시: 1 3 5 7 9 11 13 15 17 19
```

### 문제 3

리스트에서 짝수와 홀수의 개수를 세는 프로그램을 작성하세요.

```python
numbers = [3, 8, 15, 22, 7, 10, 13, 24, 5, 18]

even_count = 0
odd_count = 0

# 여기에 코드를 작성하세요

print(f"짝수: {even_count}개")
print(f"홀수: {odd_count}개")
```

다음 실습에서는 Python의 중첩 반복문에 대해 알아보겠습니다.
