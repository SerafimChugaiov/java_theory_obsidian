---
tags:
  - Java/ОсновыЯзыка
---

`StringBuilder` и `StringBuffer` – это изменяемые (mutable) версии `String`. Они позволяют изменять строки без создания нового объекта, что делает их более производительными при частых операциях изменения строк.

### Различия между StringBuffer и StringBuilder

|Характеристика|StringBuffer|StringBuilder|
|---|---|---|
|Потокобезопасность|Потокобезопасный (синхронизированный)|Непотокобезопасный (несинхронизированный)|
|Производительность|Медленнее|Быстрее|
|Использование|В многопоточной среде|В однопоточной среде|

---

### Основные методы `StringBuilder` / `StringBuffer`

|Метод|Описание|Пример|
|---|---|---|
|`append(str)`|Добавляет строку в конец|`sb.append(" World") → "Hello World"`|
|`insert(index, str)`|Вставляет строку по указанному индексу|`sb.insert(5, " Java") → "Hello Java"`|
|`delete(start, end)`|Удаляет символы с начального до конечного индекса|`sb.delete(0, 5) → "World"`|
|`reverse()`|Переворачивает строку|`sb.reverse() → "avaJ olleH"`|
|`replace(start, end, str)`|Заменяет часть строки с начального до конечного индекса|`sb.replace(0, 5, "Hi") → "Hi World"`|

---

### Пример использования `StringBuilder`

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.insert(5, " Java");
sb.delete(0, 6);
System.out.println(sb); // Java World
```
### Какая разница между String, StringBuffer и StringBuilder?

Java имеется три класса, позволяющих работать со строками: **String**, **StringBuffer** и **StringBuilder**.

Основное отличие между этими классами заключается в том, что **String** является неизменяемым классом, то есть каждая операция над объектом String приводит к созданию нового объекта. В свою очередь, классы StringBuffer и StringBuilder используются для работы с изменяемыми символьными последовательностями.

Класс **StringBuffer** был создан для того, чтобы решить проблему производительности при работе с изменяемыми строками. Он обеспечивает потокобезопасность, что позволяет использовать его в многопоточных приложениях. Однако, этот класс является менее эффективным по сравнению с StringBuilder.

Класс **StringBuilder** был добавлен в Java 5 как альтернатива StringBuffer. Он также обеспечивает возможность работы с изменяемыми строками, однако не является потокобезопасным. Зато он более эффективен по скорости выполнения операций.

## Литература:
- [StringBuffer и StringBuilder](https://metanit.com/java/tutorial/7.3.php)