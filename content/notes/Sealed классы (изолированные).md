---
tags:
  - Java/ООП
---
**Sealed классы** (запечатанные или изолированные) в Java и Kotlin позволяют ограничить иерархию наследования, обеспечивая контроль над тем, какие классы могут расширять или реализовывать определённый класс или интерфейс. Это способствует повышению безопасности, предсказуемости и читаемости кода.

## Sealed классы в Java (начиная с Java 17)

### Особенности:
- **Модификатор `sealed`**: используется для объявления запечатанного класса или интерфейса.
- **Ключевое слово `permits`**: определяет список разрешённых подклассов или реализаций.
- **Подклассы**: должны быть объявлены с одним из модификаторов: `final`, `sealed` или `non-sealed`.
- **Контроль иерархии**: предотвращает несанкционированное расширение классов, обеспечивая безопасность и предсказуемость кода.([Tproger](https://tproger.ru/articles/kak-ispolzovat-novye-vozmozhnosti-java-17-dlya-povyweniya-proizvoditelnosti-i-bezopasnosti-prilozhenij?utm_source=chatgpt.com "Как использовать новые возможности Java 17 - Tproger"))
### Пример:

```java
public sealed class Vehicle permits Car, Truck {
    public abstract void drive();
}

public final class Car extends Vehicle {
    @Override
    public void drive() {
        System.out.println("Car is driving");
    }
}

public final class Truck extends Vehicle {
    @Override
    public void drive() {
        System.out.println("Truck is driving");
    }
}
```

В этом примере класс `Vehicle` может быть расширен только классами `Car` и `Truck`.[
### Преимущества использования Sealed классов
- **Контроль над иерархией**: ограничение наследования предотвращает нежелательное расширение классов.
- **Повышенная безопасность**: компилятор может проверять исчерпывающие условия в `when` выражениях.
- **Улучшенная читаемость и поддерживаемость кода**: ясная структура иерархии классов упрощает понимание и сопровождение кода.
- **Оптимизация производительности**: JVM может выполнять дополнительные оптимизации благодаря известной иерархии классов.

Sealed классы являются мощным инструментом для создания безопасных и предсказуемых иерархий классов, особенно полезным при моделировании ограниченных наборов состояний или вариантов.