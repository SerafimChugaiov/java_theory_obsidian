---
tags: Java/Исключения
---
**Исключение** — это объект, который представляет собой ошибку или непредвиденное состояние во время выполнения программы. Когда возникает исключение, JVM (Java Virtual Machine) генерирует объект-исключение, который затем передается по стеку вызовов (call stack), пока не будет найден блок кода, который может обработать это исключение.

Исключения могут появиться по разными причинам, например, ошибка ввода-вывода, деление на ноль, отсутствие доступа к файлу и другие непредвиденные ситуации. Благодаря исключениям программисты могут обрабатывать эти ошибки и создавать альтернативный путь выполнения программы.

## Перехват исключений `try-catch`

В Java есть механизм перехвата исключений, который позволяет прекратить аварийное завершение методов. Выглядит он так:

```java
try
{
   код, где может возникнуть ошибка
}
catch(ТипИсключения имя)
{
   код обработки исключения
}
```

Эта конструкция называется блок `try-catch`.

Код, в котором могут возникнуть исключения, оборачивается в фигурные скобки, перед которыми пишется слово `try` (пытаться).

После фигурных скобок пишется ключевое слово `catch`, внутри круглых скобок объявляется переменная типа-исключения. Затем следуют фигурные скобки, внутри которых пишется код, который нужно выполнить, если возникло исключение указанного типа.

Если во время выполнения «основного кода» исключений не возникло, код внутри блока catch выполняться не будет. Если же исключение возникло, будет (при условии, что тип возникшего исключения совпадает с типом переменной в круглых скобках).

Пример:
![[Исключение. Пример try catch.png]]

## Несколько блоков `catch`

Теоретически внутри блока кода могут возникать самые различные исключения. Некоторые вы захотите обработать одним образом, другие — вторым, третьи вообще решите не обрабатывать.

Разработчики Java решили помочь вам и позволили писать после блока `try` не один блок `catch`, а несколько.

```java
try
{
   код, где может возникнуть ошибка
}
catch(ТипИсключения1 имя1)
{
   код обработки исключения1
}
catch(ТипИсключения2 имя2)
{
   код обработки исключения2
}
   catch(ТипИсключения3 имя3)
{
   код обработки исключения3
}
```

Пример:
![[Исключения. Пример 2 try catch.png]]
## Порядок блоков `catch`
Исключение, возникшее в блоке `try`, может быть захвачено только одним блоком `catch`. Не может быть ситуации, что при обработке исключения выполнился код из нескольких блоков `catch`.

**Однако порядок блоков имеет значение.**

Может быть ситуация, когда исключение захвачено несколькими блоками. В этом случае оно будет захвачено блоком **catch**, который идет раньше (ближе к блоку `try`).

**Как же может возникнуть ситуация, что одно исключение могут захватить несколько блоков catch?**

Все исключения объединены в единую иерархию с помощью наследования — см. схему.
![[Исключения. Схема.png]]

Объект-исключение типа `ArithmeticException` может быть присвоен переменной типа `ArithmeticException`, а также **переменным его классов-предков:** `RuntimeException`, `Exception` и `Throwable` — см. схему.

Вот этот код будет отлично компилироваться:
![[Исключения. Схема №2.png]]
Поэтому и перехватить исключение типа `ArithmeticException` можно блоками `catch` любым из 4-х приведенных выше типов.

Пример 1:
![[Исключения. Схема №3.png]]
В данном примере исключение `ArithmeticException` может быть перехвачено и блоком `catch(Exception e)`, и блоком `catch(ArithmeticException e)`. Оно будет захвачено тем блоком, который идет ближе к блоку `try` — первым блоком `catch`.

Чтобы не было неожиданностей, лучше всего блоки `catch`, которые могут захватить почти все исключения, размещать ближе к концу списка блоков `catch`.

>[!Info]
>Тип `Throwable` вообще способен перехватывать все возможные исключения в Java, если его разместить в первом блоке `catch` - код не скомпилируется, так как компилятор понимает, что в коде есть недосягаемые блоки кода.

- [[Выбрасывание исключений]]
- [[Виды исключений]]
- [[Кастомные исключения]]
### Подавленные исключения
[Подавленные исключения Java - javascopes.com](https://javascopes.com/java-suppressed-exceptions-034708da/)
Когда мы ловим исключение и никак его не обрабатываем.
`catch (Exception ex) {}` Игнорируемое исключение.

Подавленное исключение - это то, которое игнорируется каким-либо образом.
Когда исключение запустило цепочку исключений. Чтобы найти первоисточник, надо использовать метод getsupressed
## Try with resourses

[Урок Java 166 Try с ресурсами и AutoClosable - YouTube](https://www.youtube.com/watch?v=aHO60SmsfJA)
Конструкция появилась с java 7
Когда мы открываем файл, то для нормальной работы он должен быть закрыт.
Блок try with resourses автоматически закрывает ресурсы (файлы и т.д.). Было исключение или нет

Ресурсы - любые объекты, реализующие интерфейс AutoClosable

**Конструкция**:
try (ресурс1; ресурс2) {}

**Здесь исключение из *close* не перебьет собой исходное исключение**, а будет добавлено в него в качестве заглушенного (supressed)
![[Особенность try with resourse.png]]
### В чем отличие между try-with-resources и try-catch-finally при работе с ресурсами?
Главное отличие — **в автоматическом управлении ресурсами и читаемости кода**.
`try-with-resources` (добавлен в Java 7) **сам закрывает** все ресурсы, указанные в скобках, **без необходимости писать `finally`**, даже если произошло исключение. Это упрощает код, уменьшает вероятность утечек и делает поведение более предсказуемым.

В `try-catch-finally` разработчик должен **вручную закрывать ресурсы** (например, `stream.close()`), желательно в блоке `finally`. Это усложняет код, требует проверок на `null` и обработки исключений при закрытии.
## Особенности catch блоков
Блок **catch** видит то, что было перед блоком **try**. Он не видит то, что объявлено в самом **try**
Если исключение не вылетело, то блок **catch** не исполняется.
### В каком порядке следует обрабатывать исключения в catch блоках?
[Исключения в Java: catch под лупой. Часть 3 / Skillbox Media](https://skillbox.ru/media/base/isklyucheniya-v-java-catch-pod-lupoy-chast-3/)
Catch блоки должны идти в порядке иерархии **наследник -> родитель**
Иначе все исключения будет принимать первый блок catch, например класса Exception e
## Вопросы
### Может ли метод main() выбросить исключение во вне и если да, то где будет происходить обработка данного исключения?
Может и оно будет передано в виртуальную машину Java (JVM).
Для случая с методом main произойдет две вещи:
- будет завершен главный поток приложения
- будет вызван **ThreadGroup.uncaughtException**


## Источники:

- [Виды исключений в Java](https://javarush.com/quests/lectures/questsyntaxpro.level14.lecture03)