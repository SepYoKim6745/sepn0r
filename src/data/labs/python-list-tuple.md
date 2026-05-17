---
title: "Python 리스트와 튜플: 데이터 모아서 관리하기"
description: "Python의 리스트와 튜플을 사용해 여러 데이터를 저장하고 다루는 방법을 배웁니다."
pubDate: 2026-05-18
tags: ["Python", "리스트", "튜플"]
category: "Python"
order: 12
---

## 1. 리스트란?

리스트(list)는 여러 데이터를 순서대로 묶어서 저장하는 자료형입니다. 대괄호 `[]` 안에 값을 쉼표로 구분하여 나열합니다.

```python
fruits = ["사과", "바나나", "포도"]
print(fruits)
```

출력:

```
['사과', '바나나', '포도']
```

리스트에는 다양한 타입의 데이터를 섞어서 넣을 수 있습니다.

```python
mixed = ["철수", 20, True, 3.14]
print(mixed)
```

출력:

```
['철수', 20, True, 3.14]
```

빈 리스트를 만드는 방법은 두 가지가 있습니다.

```python
empty1 = []
empty2 = list()
print(empty1)
print(empty2)
```

출력:

```
[]
[]
```

## 2. 인덱싱과 슬라이싱

### 인덱싱

리스트의 각 요소에는 순서 번호(인덱스)가 매겨집니다. 인덱스는 **0부터** 시작합니다.

```python
colors = ["빨강", "주황", "노랑", "초록", "파랑"]

print(colors[0])   # 첫 번째 요소
print(colors[2])   # 세 번째 요소
print(colors[4])   # 다섯 번째 요소
```

출력:

```
빨강
노랑
파랑
```

음수 인덱스를 사용하면 뒤에서부터 접근할 수 있습니다. `-1`은 마지막 요소를 가리킵니다.

```python
colors = ["빨강", "주황", "노랑", "초록", "파랑"]

print(colors[-1])   # 마지막 요소
print(colors[-2])   # 뒤에서 두 번째
```

출력:

```
파랑
초록
```

### 슬라이싱

슬라이싱은 리스트의 일부분을 잘라내는 기능입니다. `리스트[시작:끝]` 형태로 사용하며, 시작 인덱스는 포함하고 끝 인덱스는 포함하지 않습니다.

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])   # 인덱스 1부터 3까지
print(numbers[:3])    # 처음부터 인덱스 2까지
print(numbers[2:])    # 인덱스 2부터 끝까지
print(numbers[:])     # 전체 복사
```

출력:

```
[20, 30, 40]
[10, 20, 30]
[30, 40, 50]
[10, 20, 30, 40, 50]
```

## 3. 리스트 수정하기

### 요소 변경

인덱스를 사용해 특정 위치의 값을 바꿀 수 있습니다.

```python
subjects = ["국어", "영어", "수학"]
print("변경 전:", subjects)

subjects[1] = "과학"
print("변경 후:", subjects)
```

출력:

```
변경 전: ['국어', '영어', '수학']
변경 후: ['국어', '과학', '수학']
```

### 요소 추가

`append()`는 리스트의 맨 끝에 요소를 추가합니다. `insert()`는 원하는 위치에 요소를 삽입합니다.

```python
animals = ["고양이", "강아지"]

animals.append("토끼")
print("append 후:", animals)

animals.insert(1, "햄스터")
print("insert 후:", animals)
```

출력:

```
append 후: ['고양이', '강아지', '토끼']
insert 후: ['고양이', '햄스터', '강아지', '토끼']
```

### 요소 삭제

삭제 방법은 세 가지가 있습니다.

- `del`: 인덱스로 삭제
- `remove()`: 값을 찾아서 삭제 (첫 번째 일치 항목만)
- `pop()`: 마지막 요소를 꺼내면서 삭제 (인덱스 지정 가능)

```python
foods = ["피자", "햄버거", "치킨", "떡볶이", "김밥"]

del foods[0]
print("del 후:", foods)

foods.remove("치킨")
print("remove 후:", foods)

last = foods.pop()
print("pop 반환값:", last)
print("pop 후:", foods)
```

출력:

```
del 후: ['햄버거', '치킨', '떡볶이', '김밥']
remove 후: ['햄버거', '떡볶이', '김밥']
pop 반환값: 김밥
pop 후: ['햄버거', '떡볶이']
```

## 4. 리스트 주요 메서드

### 정렬과 뒤집기

`sort()`는 리스트를 오름차순으로 정렬하고, `reverse()`는 순서를 뒤집습니다.

```python
scores = [85, 92, 78, 95, 88]

scores.sort()
print("오름차순:", scores)

scores.sort(reverse=True)
print("내림차순:", scores)

scores.reverse()
print("뒤집기:", scores)
```

출력:

```
오름차순: [78, 85, 88, 92, 95]
내림차순: [95, 92, 88, 85, 78]
뒤집기: [78, 85, 88, 92, 95]
```

### 길이와 포함 여부 확인

`len()`은 리스트의 길이(요소 개수)를 반환합니다. `in` 연산자는 특정 값이 리스트에 있는지 확인합니다.

```python
members = ["철수", "영희", "민수", "지현"]

print("인원수:", len(members))
print("철수가 있나?", "철수" in members)
print("동현이 있나?", "동현" in members)
```

출력:

```
인원수: 4
철수가 있나? True
동현이 있나? False
```

## 5. 리스트 반복문 활용

### for문으로 순회

`for`문을 사용하면 리스트의 모든 요소를 하나씩 꺼내 처리할 수 있습니다.

```python
fruits = ["사과", "바나나", "포도", "딸기"]

for fruit in fruits:
    print(fruit, "맛있다!")
```

출력:

```
사과 맛있다!
바나나 맛있다!
포도 맛있다!
딸기 맛있다!
```

### enumerate로 인덱스와 함께 순회

`enumerate()`를 사용하면 인덱스 번호와 값을 동시에 가져올 수 있습니다.

```python
students = ["철수", "영희", "민수"]

for i, name in enumerate(students):
    print(f"{i}번: {name}")
```

출력:

```
0번: 철수
1번: 영희
2번: 민수
```

시작 번호를 지정할 수도 있습니다.

```python
students = ["철수", "영희", "민수"]

for i, name in enumerate(students, start=1):
    print(f"{i}번: {name}")
```

출력:

```
1번: 철수
2번: 영희
3번: 민수
```

## 6. 튜플이란?

튜플(tuple)은 리스트와 비슷하지만, 한 번 만들면 **수정할 수 없는** 자료형입니다. 소괄호 `()`로 감싸서 만듭니다.

```python
point = (3, 5)
print(point)
print(type(point))
```

출력:

```
(3, 5)
<class 'tuple'>
```

튜플도 인덱싱과 슬라이싱이 가능합니다.

```python
colors = ("빨강", "초록", "파랑")

print(colors[0])
print(colors[1:])
```

출력:

```
빨강
('초록', '파랑')
```

하지만 값을 변경하려고 하면 오류가 발생합니다. 이것이 리스트와의 가장 큰 차이점입니다.

```python
colors = ("빨강", "초록", "파랑")
colors[0] = "노랑"   # 오류 발생!
```

출력:

```
TypeError: 'tuple' object does not support item assignment
```

리스트와 튜플의 차이를 정리하면 다음과 같습니다.

| 구분 | 리스트 `[]` | 튜플 `()` |
|------|-----------|----------|
| 수정 가능 여부 | 가능 (mutable) | 불가능 (immutable) |
| 기호 | 대괄호 `[]` | 소괄호 `()` |
| 용도 | 변경이 필요한 데이터 | 변경하면 안 되는 데이터 |
| 예시 | 장바구니 목록 | 좌표, 요일 이름 |

## 7. 언패킹과 활용

### 튜플 언패킹

튜플의 값을 각각의 변수에 한 번에 넣는 것을 **언패킹(unpacking)**이라고 합니다.

```python
point = (10, 20)
x, y = point

print("x:", x)
print("y:", y)
```

출력:

```
x: 10
y: 20
```

변수의 개수와 튜플의 요소 개수가 같아야 합니다.

```python
info = ("철수", 20, "서울")
name, age, city = info

print(f"{name}은 {age}살이고 {city}에 삽니다.")
```

출력:

```
철수은 20살이고 서울에 삽니다.
```

### 함수에서 여러 값 반환하기

함수가 여러 값을 반환할 때 자동으로 튜플로 묶입니다. 이것을 언패킹으로 받으면 편리합니다.

```python
def min_max(numbers):
    return min(numbers), max(numbers)

data = [45, 82, 33, 97, 61]
smallest, largest = min_max(data)

print("최솟값:", smallest)
print("최댓값:", largest)
```

출력:

```
최솟값: 33
최댓값: 97
```

## 8. 연습 문제

### 문제 1: 평균 구하기

다음 점수 리스트의 평균을 구해서 출력하세요.

```python
scores = [85, 92, 78, 96, 88]
# 여기에 코드를 작성하세요
```

<details>
<summary>정답 보기</summary>

```python
scores = [85, 92, 78, 96, 88]
average = sum(scores) / len(scores)
print(f"평균: {average}")
```

출력:

```
평균: 87.8
```

</details>

### 문제 2: 짝수만 골라내기

숫자 리스트에서 짝수만 새 리스트에 담아 출력하세요.

```python
numbers = [3, 8, 15, 22, 7, 30, 11, 44]
# 여기에 코드를 작성하세요
```

<details>
<summary>정답 보기</summary>

```python
numbers = [3, 8, 15, 22, 7, 30, 11, 44]
evens = []

for n in numbers:
    if n % 2 == 0:
        evens.append(n)

print("짝수:", evens)
```

출력:

```
짝수: [8, 22, 30, 44]
```

</details>

### 문제 3: 순위표 출력

학생 이름 리스트를 받아 `enumerate()`를 사용해 1등부터 순위를 매겨 출력하세요.

```python
ranking = ["영희", "철수", "민수", "지현"]
# 여기에 코드를 작성하세요
```

<details>
<summary>정답 보기</summary>

```python
ranking = ["영희", "철수", "민수", "지현"]

for rank, name in enumerate(ranking, start=1):
    print(f"{rank}등: {name}")
```

출력:

```
1등: 영희
2등: 철수
3등: 민수
4등: 지현
```

</details>

### 문제 4: 좌표 사이 거리

두 좌표를 튜플로 받아 거리를 구하는 함수를 작성하세요. 거리 공식은 `((x2-x1)**2 + (y2-y1)**2) ** 0.5`입니다.

```python
def distance(p1, p2):
    # 여기에 코드를 작성하세요
    pass

point_a = (1, 2)
point_b = (4, 6)
print(f"거리: {distance(point_a, point_b)}")
```

<details>
<summary>정답 보기</summary>

```python
def distance(p1, p2):
    x1, y1 = p1
    x2, y2 = p2
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5

point_a = (1, 2)
point_b = (4, 6)
print(f"거리: {distance(point_a, point_b)}")
```

출력:

```
거리: 5.0
```

</details>
