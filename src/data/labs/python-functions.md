---
title: "Python 함수: 코드를 재사용하기"
description: "함수의 정의, 매개변수, 반환값부터 기본값과 키워드 인자까지 배웁니다."
pubDate: 2026-04-26
tags: ["Python", "함수"]
category: "Python"
order: 8
---

## 1. 함수란?

함수는 특정 작업을 수행하는 코드를 하나로 묶어 이름을 붙인 것입니다. 한 번 만들어두면 필요할 때마다 호출해서 재사용할 수 있습니다.

커피 자판기에 비유하면 이렇습니다.

- 돈 넣기 (입력 = 매개변수)
- 버튼 누르기 (함수 호출)
- 커피 나오기 (출력 = 반환값)

함수를 사용하면 같은 코드를 반복해서 쓰지 않아도 되고, 프로그램을 읽기 쉽게 정리할 수 있습니다.

## 2. 함수 기본 구조

```python
def 함수이름(매개변수1, 매개변수2):
    실행할 코드
    return 결과
```

- `def`: 함수를 만드는 키워드 (define의 줄임말)
- `return`: 결과를 돌려주는 키워드

### 예제: 두 수 더하기

```python
def add(x, y):
    return x + y

result = add(3, 5)
print(result)
```

출력:

```
8
```

### 예제: 인사하기

```python
def say_hello(name):
    print(f"안녕하세요, {name}님!")

say_hello("민수")
say_hello("지영")
```

출력:

```
안녕하세요, 민수님!
안녕하세요, 지영님!
```

### 예제: 성인 판별

```python
def is_adult(age):
    if age >= 18:
        return True
    else:
        return False

print(is_adult(20))
print(is_adult(15))
```

출력:

```
True
False
```

## 3. 매개변수 기본값

매개변수에 기본값을 지정하면, 호출할 때 값을 넘기지 않아도 기본값이 사용됩니다.

```python
def greet(name="손님"):
    return f"안녕하세요, {name}님!"

print(greet("민수"))
print(greet())
```

출력:

```
안녕하세요, 민수님!
안녕하세요, 손님님!
```

기본값이 있는 매개변수는 반드시 기본값이 없는 매개변수 뒤에 위치해야 합니다.

```python
def introduce(name, school="미정"):
    print(f"이름: {name}, 학교: {school}")

introduce("철수")
introduce("영희", "서울고")
```

출력:

```
이름: 철수, 학교: 미정
이름: 영희, 학교: 서울고
```

## 4. 반환값 여러 개

Python 함수는 `return`으로 여러 값을 동시에 반환할 수 있습니다. 반환된 값은 튜플(tuple)로 묶입니다.

```python
def calculator(a, b):
    return a + b, a - b, a * b, a / b

add, sub, mul, div = calculator(10, 3)
print(f"덧셈: {add}")
print(f"뺄셈: {sub}")
print(f"곱셈: {mul}")
print(f"나눗셈: {div}")
```

출력:

```
덧셈: 13
뺄셈: 7
곱셈: 30
나눗셈: 3.3333333333333335
```

## 5. 키워드 인자

함수를 호출할 때 매개변수 이름을 직접 지정해서 값을 전달할 수 있습니다. 이렇게 하면 순서를 바꿔도 됩니다.

```python
def introduce(name, age, city):
    print(f"이름: {name}, 나이: {age}, 도시: {city}")

# 순서대로 전달
introduce("민수", 20, "서울")

# 키워드 인자로 순서 변경
introduce(age=25, name="지영", city="부산")
```

출력:

```
이름: 민수, 나이: 20, 도시: 서울
이름: 지영, 나이: 25, 도시: 부산
```

## 6. 변수 범위 (지역 vs 전역)

함수 안에서 만든 변수는 함수 안에서만 사용할 수 있습니다. 이것을 **지역 변수**라고 합니다. 함수 바깥에서 만든 변수는 프로그램 전체에서 사용할 수 있으며, 이것을 **전역 변수**라고 합니다.

```python
message = "전역 변수입니다"  # 전역 변수

def my_function():
    local_msg = "지역 변수입니다"  # 지역 변수
    print(message)      # 전역 변수는 함수 안에서 읽기 가능
    print(local_msg)    # 지역 변수 사용

my_function()
print(message)      # 전역 변수는 함수 밖에서도 사용 가능
# print(local_msg)  # 오류! 지역 변수는 함수 밖에서 사용 불가
```

출력:

```
전역 변수입니다
지역 변수입니다
전역 변수입니다
```

## 7. return과 print의 차이

`print()`와 `return`은 자주 헷갈리는 개념입니다. 차이를 확실히 알아두세요.

- `print()`: 화면에 값을 출력만 합니다. 값을 저장하거나 다른 곳에서 쓸 수 없습니다.
- `return`: 함수의 결과를 돌려줍니다. 돌려받은 값을 변수에 저장하거나 다른 계산에 사용할 수 있습니다.

```python
def add_print(a, b):
    print(a + b)      # 화면에 출력만 함

def add_return(a, b):
    return a + b       # 값을 돌려줌

result1 = add_print(3, 5)   # 8이 출력됨
result2 = add_return(3, 5)  # 출력 없음, 값만 돌려줌

print(f"result1: {result1}")  # None (print는 값을 돌려주지 않음)
print(f"result2: {result2}")  # 8 (return은 값을 돌려줌)

# return 값은 다른 계산에 사용 가능
total = add_return(3, 5) + add_return(10, 20)
print(f"총합: {total}")
```

출력:

```
8
result1: None
result2: 8
총합: 38
```

## 8. 실습 예제

### 예제 1: 할인 계산기

```python
def discount_price(price, rate=10):
    discount = price * rate / 100
    final = price - discount
    return final

print(f"10% 할인: {discount_price(10000)}원")
print(f"20% 할인: {discount_price(10000, 20)}원")
print(f"30% 할인: {discount_price(10000, 30)}원")
```

출력:

```
10% 할인: 9000.0원
20% 할인: 8000.0원
30% 할인: 7000.0원
```

### 예제 2: 좌표 거리 계산

```python
def distance(x1, y1, x2, y2):
    dx = (x2 - x1) ** 2
    dy = (y2 - y1) ** 2
    return (dx + dy) ** 0.5

d = distance(0, 0, 3, 4)
print(f"두 점 사이의 거리: {d}")
```

출력:

```
두 점 사이의 거리: 5.0
```

### 예제 3: 학점 계산기

```python
def get_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

scores = [95, 82, 67, 54, 78]
for s in scores:
    print(f"점수: {s} -> 학점: {get_grade(s)}")
```

출력:

```
점수: 95 -> 학점: A
점수: 82 -> 학점: B
점수: 67 -> 학점: D
점수: 54 -> 학점: F
점수: 78 -> 학점: C
```

## 9. 연습 문제

### 문제 1

짝수인지 판별하는 함수 `is_even(num)`을 작성하세요. 짝수면 `True`, 홀수면 `False`를 반환합니다.

```python
def is_even(num):
    # 여기에 코드를 작성하세요
    pass

# 테스트
print(is_even(4))   # True
print(is_even(7))   # False
print(is_even(0))   # True
```

### 문제 2

문자열의 길이를 반환하는 함수 `get_length(text)`를 작성하세요. `len()` 함수를 사용하지 말고, 반복문으로 직접 길이를 구해보세요.

```python
def get_length(text):
    # 여기에 코드를 작성하세요
    pass

# 테스트
print(get_length("Hello"))       # 5
print(get_length("파이썬"))       # 3
print(get_length(""))             # 0
```

### 문제 3

세 수 중 가장 큰 값을 반환하는 함수 `max_of_three(a, b, c)`를 작성하세요. `max()` 함수를 사용하지 말고 직접 비교하세요.

```python
def max_of_three(a, b, c):
    # 여기에 코드를 작성하세요
    pass

# 테스트
print(max_of_three(3, 7, 5))   # 7
print(max_of_three(10, 2, 8))  # 10
print(max_of_three(1, 1, 1))   # 1
```

### 문제 4

숫자 리스트의 합계를 구하는 함수 `sum_list(numbers)`를 작성하세요. `sum()` 함수를 사용하지 말고 반복문으로 직접 구하세요.

```python
def sum_list(numbers):
    # 여기에 코드를 작성하세요
    pass

# 테스트
print(sum_list([1, 2, 3, 4, 5]))     # 15
print(sum_list([10, 20, 30]))         # 60
print(sum_list([]))                    # 0
```

### 문제 5

세 수를 받아 최대값과 최소값을 동시에 반환하는 함수 `min_max(a, b, c)`를 작성하세요.

```python
def min_max(a, b, c):
    # 여기에 코드를 작성하세요
    pass

# 테스트
minimum, maximum = min_max(3, 7, 5)
print(f"최소값: {minimum}, 최대값: {maximum}")  # 최소값: 3, 최대값: 7
```

다음 실습에서는 Python의 파일 입출력에 대해 알아보겠습니다.
