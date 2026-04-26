---
title: "Python 클래스: 객체지향 프로그래밍 시작하기"
description: "클래스와 객체의 개념을 이해하고 직접 클래스를 만들어봅니다."
pubDate: 2026-04-26
tags: ["Python", "클래스"]
category: "Python"
order: 11
---

## 1. 클래스란?

클래스(class)는 **객체(object)**를 만들기 위한 설계도입니다. 붕어빵에 비유하면 이렇게 이해할 수 있습니다.

- **클래스**: 붕어빵 틀 (설계도)
- **객체**: 붕어빵 틀로 찍어낸 붕어빵 (결과물)
- **인스턴스**: 특정 클래스에서 만든 구체적인 객체

하나의 클래스(틀)로 여러 개의 객체(붕어빵)를 만들 수 있습니다. 각 객체는 서로 독립적이며, 각각 다른 속성을 가질 수 있습니다.

## 2. 클래스 문법 구조

```python
class 클래스이름:
    def __init__(self, 매개변수):
        self.속성명 = 값

    def 메서드이름(self):
        # 동작 코드
```

- `class`: 클래스를 정의하는 키워드
- `__init__()`: 생성자 메서드. 객체가 생성될 때 자동으로 실행됩니다.
- `self`: 자기 자신 객체를 가리킵니다. 모든 메서드의 첫 번째 매개변수로 들어갑니다.

간단한 예제로 살펴보겠습니다.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"안녕하세요, 저는 {self.name}이고 {self.age}살입니다.")

p1 = Person("민수", 20)
p2 = Person("지영", 22)

p1.introduce()
p2.introduce()
```

출력:

```
안녕하세요, 저는 민수이고 20살입니다.
안녕하세요, 저는 지영이고 22살입니다.
```

## 3. 예제: fishbread 클래스

붕어빵 비유를 코드로 직접 만들어봅시다.

```python
class Fishbread:
    def __init__(self, filling):
        self.filling = filling

    def bake(self):
        print(f"{self.filling} 붕어빵이 구워졌습니다.")

bread1 = Fishbread("팥")
bread2 = Fishbread("슈크림")
bread3 = Fishbread("피자")

bread1.bake()
bread2.bake()
bread3.bake()
```

출력:

```
팥 붕어빵이 구워졌습니다.
슈크림 붕어빵이 구워졌습니다.
피자 붕어빵이 구워졌습니다.
```

하나의 `Fishbread` 클래스(틀)로 서로 다른 속(filling)을 가진 붕어빵 3개를 만들었습니다. 각 객체는 자기만의 `filling` 값을 가지고 있습니다.

## 4. 속성 추가 및 변경

객체를 만든 후에도 새로운 속성을 추가하거나 기존 속성을 변경할 수 있습니다.

```python
class Fishbread:
    def __init__(self, filling):
        self.filling = filling

    def info(self):
        print(f"속: {self.filling}, 가격: {self.price}원")

bread1 = Fishbread("팥")

# 속성 추가
bread1.price = 1000
bread1.info()

# 속성 변경
bread1.price = 1500
bread1.info()
```

출력:

```
속: 팥, 가격: 1000원
속: 팥, 가격: 1500원
```

다만, 이렇게 나중에 속성을 추가하는 것보다는 `__init__()` 안에서 미리 정의하는 것이 더 좋은 습관입니다.

## 5. 클래스 변수 vs 인스턴스 변수

클래스에서 사용하는 변수는 두 종류가 있습니다.

- **인스턴스 변수**: 각 객체마다 다른 값을 가지는 변수 (`self.filling`)
- **클래스 변수**: 모든 객체가 공유하는 변수

```python
class Fishbread:
    store_name = "길동이네 붕어빵 가게"  # 클래스 변수

    def __init__(self, filling):
        self.filling = filling  # 인스턴스 변수

    def info(self):
        print(f"[{Fishbread.store_name}] {self.filling} 붕어빵")

bread1 = Fishbread("팥")
bread2 = Fishbread("슈크림")

bread1.info()
bread2.info()
```

출력:

```
[길동이네 붕어빵 가게] 팥 붕어빵
[길동이네 붕어빵 가게] 슈크림 붕어빵
```

`store_name`은 클래스 변수이므로 모든 객체가 같은 값을 공유합니다. `filling`은 인스턴스 변수이므로 각 객체마다 다른 값을 가집니다.

```python
# 클래스 변수는 클래스 이름으로 접근
print(Fishbread.store_name)

# 클래스 변수 변경 - 모든 객체에 영향
Fishbread.store_name = "새 가게"
bread1.info()
bread2.info()
```

출력:

```
길동이네 붕어빵 가게
[새 가게] 팥 붕어빵
[새 가게] 슈크림 붕어빵
```

클래스 변수를 변경하면 모든 객체에서 변경된 값이 반영됩니다.

## 6. 연습 문제

### 문제 1

`Car` 클래스를 만드세요. `brand`(브랜드)와 `color`(색상) 속성을 가지고, `drive()` 메서드를 호출하면 정보를 출력합니다.

```python
class Car:
    # 여기에 코드를 작성하세요
    pass

# 테스트
car1 = Car("현대", "검정")
car2 = Car("기아", "흰색")

car1.drive()  # 검정색 현대 자동차가 달립니다.
car2.drive()  # 흰색 기아 자동차가 달립니다.
```

### 문제 2

`BankAccount` 클래스를 만드세요. 계좌 이름과 초기 잔액을 받고, 입금(`deposit`), 출금(`withdraw`), 잔액 확인(`check_balance`) 메서드를 구현합니다.

```python
class BankAccount:
    # 여기에 코드를 작성하세요
    pass

# 테스트
account = BankAccount("민수", 10000)
account.check_balance()   # 민수님의 잔액: 10000원
account.deposit(5000)     # 5000원이 입금되었습니다.
account.check_balance()   # 민수님의 잔액: 15000원
account.withdraw(3000)    # 3000원이 출금되었습니다.
account.check_balance()   # 민수님의 잔액: 12000원
account.withdraw(20000)   # 잔액이 부족합니다.
```

### 문제 3

`Dog` 클래스를 만들어 클래스 변수와 인스턴스 변수의 차이를 확인하세요. `species`(종)는 클래스 변수로, `name`(이름)과 `age`(나이)는 인스턴스 변수로 설정합니다.

```python
class Dog:
    species = "강아지"  # 클래스 변수

    # 여기에 코드를 작성하세요
    pass

# 테스트
dog1 = Dog("멍멍이", 3)
dog2 = Dog("바둑이", 5)

dog1.info()  # [강아지] 이름: 멍멍이, 나이: 3살
dog2.info()  # [강아지] 이름: 바둑이, 나이: 5살

# 클래스 변수는 같은 값을 공유하는지 확인
print(dog1.species == dog2.species)  # True

# 인스턴스 변수는 서로 다른 값을 가지는지 확인
print(dog1.name == dog2.name)  # False
```

다음 실습에서는 더 다양한 Python 활용법을 알아보겠습니다.
