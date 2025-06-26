---
tags:
  - Java/ОсновыЯзыка
aliases:
  - isNull
  - Nulable
---
## Класс `Optional<T>` в Java

### Назначение

Класс `Optional<T>` представляет собой контейнер, предназначенный для хранения значения, которое может быть как **присутствующим**, так и **отсутствующим** (т.е. `null`). Используется преимущественно для:

- Явного моделирования **отсутствия значения** без использования `null`;
- **Избежания `NullPointerException`**;
- Повышения **читабельности и безопасности** кода, особенно в DAO-слое и при работе с внешними источниками данных.

>[!Info]
>Можно использовать аннотации, но они поддерживаются только в сторонних библиотеках, о которых компилляторы не знают

Мотивация использования:
- При традиционном подходе программисту не всегда очевидно, может ли возвращаемое значение быть `null`.
- Часто приходится явно проверять объекты на `null`, что ведёт к **шаблонному и небезопасному коду**.
- Аннотации `@Nullable` и `@NotNull` могут быть полезны, но они не поддерживаются на уровне компилятора без сторонних инструментов.
### Фабричные методы (статические конструкторы)

![[Класс Optional.png]]
Класс `Optional` предоставляет набор **фабричных методов** (способ создать объект через статический метод), реализующих паттерн _Static Factory Method_:

|Метод|Описание|
|---|---|
|`Optional.empty()`|Возвращает пустой экземпляр `Optional` (без значения).|
|`Optional.of(T value)`|Возвращает `Optional`, содержащий не-null значение. Если `value == null`, выбрасывается `NullPointerException`.|
|`Optional.ofNullable(T value)`|Возвращает `Optional`, содержащий значение, если оно не `null`, либо пустой `Optional`.|

Пример:

```java
Optional<String> a = Optional.empty();
Optional<String> b = Optional.of("value"); // Нельзя передавать null
Optional<String> c = Optional.ofNullable(possibleNull);
```
## Основные методы экземпляра

|Метод|Назначение|
|---|---|
|`isPresent()`|Возвращает `true`, если значение присутствует.|
|`isEmpty()`|Возвращает `true`, если значение отсутствует (Java 11+).|
|`get()`|Возвращает значение, если оно есть, иначе выбрасывает `NoSuchElementException`. Использовать с осторожностью.|
|`ifPresent(Consumer<? super T> action)`|Выполняет действие, если значение присутствует.|
|`orElse(T other)`|Возвращает значение, если оно есть, иначе — `other`.|
|`orElseGet(Supplier<? extends T> supplier)`|Лениво возвращает значение по умолчанию.|
|`orElseThrow()`|Бросает исключение, если значение отсутствует.|
|`map(Function<? super T, ? extends U>)`|Преобразует значение, если оно присутствует.|
|`flatMap(Function<? super T, Optional<U>>)`|То же, что `map`, но функция должна возвращать `Optional`.|
## Пример без `if`/`null`

![[Класс Optional ifPresent.png|400]]
Без `Optional`:
```java
if (user != null && user.getName() != null) {
    System.out.println(user.getName());
}
```

С использованием `Optional`:
```java
Optional.ofNullable(user)
        .map(User::getName)
        .ifPresent(System.out::println);
```
## Работа с базой данных и `Optional`

Метод `findById` (например, из Spring Data JPA) возвращает `Optional<User>`:
```java
Optional<User> userOpt = userRepository.findById(1L);

if (userOpt.isPresent()) {
    User user = userOpt.get();
    System.out.println("Имя пользователя: " + user.getName());
} else {
    System.out.println("Пользователь не найден");
}
```
## Основные моменты:
- `Optional<User>` — обёртка над объектом, который **может быть**, а **может и не быть**.
- `isPresent()` — проверяем, есть ли значение.
- `get()` — получаем значение, если оно есть (после `isPresent()` это безопасно).