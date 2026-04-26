---
title: "Python 비교 연산자: 값 비교하기"
description: "비교 연산자를 사용해 두 값을 비교하고 True/False를 반환하는 방법을 배웁니다."
pubDate: 2026-04-26
tags: ["Python", "연산자"]
category: "Python"
order: 3
---

## 1. 비교 연산자란?

비교 연산자는 두 값을 비교해서 참(`True`) 또는 거짓(`False`)을 반환하는 연산자입니다. 조건문(`if`)과 함께 사용하면 프로그램의 흐름을 제어할 수 있습니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| `==` | 같다 | `3 == 3` | `True` |
| `!=` | 같지 않다 | `3 != 5` | `True` |
| `>` | 크다 | `7 > 5` | `True` |
| `<` | 작다 | `2 < 1` | `False` |
| `>=` | 크거나 같다 | `4 >= 4` | `True` |
| `<=` | 작거나 같다 | `5 <= 3` | `False` |

**주의:** `=`는 대입 연산자(값을 저장)이고, `==`는 비교 연산자(값이 같은지 확인)입니다. 이 둘을 혼동하지 않도록 주의하세요.

```python
x = 10      # 대입: x에 10을 저장
x == 10     # 비교: x가 10과 같은지 확인 -> True
```

## 2. 실습 예제

### 예제 1: 두 수 비교하기

```python
a = 10
b = 20

print(a == b)   # False (10과 20은 같지 않다)
print(a != b)   # True  (10과 20은 같지 않다)
print(a > b)    # False (10은 20보다 크지 않다)
print(a < b)    # True  (10은 20보다 작다)
print(a >= b)   # False (10은 20보다 크거나 같지 않다)
print(a <= b)   # True  (10은 20보다 작거나 같다)
```

출력:

```
False
True
False
True
False
True
```

### 예제 2: 온도 비교

```python
temperature = 35

print(f"현재 온도: {temperature}도")
print(f"30도 이상인가? {temperature >= 30}")
print(f"40도 이상인가? {temperature >= 40}")
```

출력:

```
현재 온도: 35도
30도 이상인가? True
40도 이상인가? False
```

### 예제 3: 성인 판별

```python
age = 20

is_adult = age >= 20
print(f"나이: {age}세")
print(f"성인 여부: {is_adult}")
```

출력:

```
나이: 20세
성인 여부: True
```

비교 결과를 변수에 저장해서 나중에 활용할 수도 있습니다.

## 3. 주의할 점: 자료형이 다른 비교

문자열과 숫자는 `==`로 비교하면 항상 `False`입니다. Python은 자료형이 다르면 같다고 판단하지 않습니다.

```python
a = "100"   # 문자열
b = 100     # 숫자

print(a == b)       # False
print(type(a))      # <class 'str'>
print(type(b))      # <class 'int'>
```

출력:

```
False
<class 'str'>
<class 'int'>
```

문자열 `"100"`과 숫자 `100`은 사람이 보기에는 같아 보이지만, Python에서는 자료형이 다르기 때문에 같지 않습니다. 비교하려면 같은 자료형으로 변환해야 합니다.

```python
a = "100"
b = 100

print(int(a) == b)  # True (문자열을 숫자로 변환 후 비교)
```

## 4. 연습 문제

### 문제 1: 비교 연산자 결과 예측

다음 코드의 출력 결과를 먼저 예측한 뒤, 실행해서 확인해보세요.

```python
print(10 == 10)
print(10 != 5)
print(7 > 7)
print(7 >= 7)
print(3 < 1)
print(5 <= 5)
```

### 문제 2: 성인 판별 코드

사용자로부터 나이를 입력받아 성인(20세 이상)인지 판별하는 코드를 작성하세요.

```python
age = int(input("나이를 입력하세요: "))
# 여기에 비교 연산자를 사용한 코드를 작성하세요
# 출력 예시: 성인입니다: True
```

### 문제 3: 두 숫자 비교

두 개의 숫자를 입력받아 모든 비교 연산자의 결과를 출력하는 코드를 작성하세요.

```python
a = int(input("첫 번째 숫자: "))
b = int(input("두 번째 숫자: "))

# 여기에 코드를 작성하세요
# 출력 예시:
# a == b : False
# a != b : True
# a > b  : True
# a < b  : False
# a >= b : True
# a <= b : False
```

### 문제 4: 문자열과 숫자 비교

다음 코드의 출력 결과를 예측하고, 왜 그런 결과가 나오는지 설명해보세요.

```python
a = "100"
b = 100

print(a == b)
print(a == str(b))
print(int(a) == b)
```

다음 실습에서는 Python의 들여쓰기 규칙에 대해 알아보겠습니다.
