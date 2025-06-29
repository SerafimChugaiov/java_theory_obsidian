---
tags:
  - Java/ООП
---
Давайте рассмотрим простые примеры **статического вложенного класса (static nested class)** и **нестатического внутреннего класса (inner class)** в Java, чтобы понять их различия и области применения.

## Статический вложенный класс (Static Nested Class)

**Особенности:**
- Объявляется с модификатором `static`.
- Не имеет доступа к нестатическим членам внешнего класса.
- Может быть создан без создания экземпляра внешнего класса.

**Пример:**
```java
public class OuterClass {
    private static String staticOuterField = "Статическое поле внешнего класса";

    // Статический вложенный класс
    public static class StaticNestedClass {
        public void display() {
            // Доступ к статическому полю внешнего класса
            System.out.println("Сообщение из статического вложенного класса: " + staticOuterField);
        }
    }

    public static void main(String[] args) {
        // Создание экземпляра статического вложенного класса без создания экземпляра внешнего класса
        OuterClass.StaticNestedClass nestedObject = new OuterClass.StaticNestedClass();
        nestedObject.display();
    }
}
```

### Когда использовать:
Статические вложенные классы полезны, когда вложенный класс не зависит от состояния экземпляра внешнего класса. Например, они часто используются для создания вспомогательных классов, таких как `Map.Entry` в коллекциях Java.

## Нестатический внутренний класс (Inner Class)

**Особенности:**
- Объявляется без модификатора `static`.
- Имеет доступ ко всем членам внешнего класса, включая приватные.
- Для создания экземпляра требуется экземпляр внешнего класса.

**Пример:**
```java
public class OuterClass {
    private String outerField = "Поле внешнего класса";

    // Нестатический внутренний класс
    public class InnerClass {
        public void display() {
            // Доступ к полю внешнего класса
            System.out.println("Сообщение из внутреннего класса: " + outerField);
        }
    }

    public static void main(String[] args) {
        // Создание экземпляра внешнего класса
        OuterClass outer = new OuterClass();
        // Создание экземпляра внутреннего класса через экземпляр внешнего класса
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.display();
    }
}
```

### Когда использовать:
Нестатические внутренние классы полезны, когда вложенный класс должен иметь доступ к нестатическим членам внешнего класса. Это часто используется при реализации обработчиков событий или при создании итераторов, как в примере с `DataStructure` и `EvenIterator` в официальной документации Java. ([docs.oracle.com](https://docs.oracle.com/javase/tutorial/java/javaOO/innerclasses.html?utm_source=chatgpt.com "Inner Class Example - Java™ Tutorials"))

---

### Сравнительная таблица

|Характеристика|Static Nested Class|Inner Class|
|---|---|---|
|Модификатор `static`|Да|Нет|
|Доступ к членам внешнего класса|Только к статическим|К любым, включая приватные|
|Требуется экземпляр внешнего класса|Нет|Да|
|Использование|Когда вложенный класс не зависит от состояния внешнего класса|Когда вложенный класс тесно связан с экземпляром внешнего класса|
