---
tags: Java/ОсновыЯзыка
---
## Наименование переменных
С маленькой буквы латиница, говорящее название, не может начинаться с цифр, каждое новое слово пишется с большой буквы.
Нельзя писать в названиях служебные слова
```
abstract, assert, boolean, break, byte, case, catch, char, class, const, continue, default, do, double, else, enum, extends, false, final, finally, float, for, goto, if, implements, import, instanceof, int, interface, long, native, new, null, package, private, protected, public, return, short, static, strictfp, String, super, switch, synchronized, this, throw, throws, transient, true, try, void, volatile, while
```

## Литералы
[[Литералы]]
## Типы данных
**Java** — строго типизированный язык, где каждый объект или переменная имеют определённый тип, определяющий вид данных и операции над ними.

Разделение: **Примитивные** и **ссылочные(все остальные)**
Примитивные:
1.  Целочисленные (к ним относятся byte, short, int, long) `int n=1;`
2.  С плавающей точкой (к ним относятся float, double) `float a = 5.8f;`
3. [[Символы char Java|Символы (char)]] `char y`
4.  Логические (boolean) `boolean check1`

Схема примитивных данных:
![[Типы переменных Java таблица .jpg]]

Ссылочные:
1. `String`, массивы
2. Классы, коллекции (`List`, `Map`)

Особенности ссылочных:

- Могут быть `null`
- `==` — сравнивает **ссылки**
- `.equals()` — сравнивает **содержимое**
- Управляются **[[Garbage collector]]**
- Ссылочные типы данных хранят **ссылку на объект**, объект — в куче ([[Стек и куча в Java|heap]])

### Локальные переменные
**Локальные переменные** — это переменные, которые создаются и используются внутри метода. Используются для хранения промежуточных результатов вычислений. И, в отличие от полей, объявляются, инициализируются и используются в одном блоке. Для понимания кода часто более важны имя и инициализатор, чем тип локальной переменной.

Например:
```java
Person person = new Person();
```

Здесь мы создаём локальную переменную `person`, чтобы работать с объектом `Person`.

Так же, вместо явного указания типа можно использовать `var`: 

```java
var person = new Person();
```
Компилятор определяет тип локальной переменной по инициализатору. Это особенно важно, когда тип параметризован `wildcard`, или упоминается в инициализаторе. Использование `var` может сделать код более кратким без ущерба для удобочитаемости, а в некоторых случаях может улучшить читаемость благодаря устранению избыточности.
### Почему верхняя граница byte 127, а не 128?
128 не сделать, так как в двоичном коде первая цифра – это знак, если написать число после 0111 1111, то это уже будет -128.  Byte необязательно будет потребляться меньше памяти (если только в массивах). Связано это с JVM, она приводит Byte и short к 32 битному int, так как системы в основном 32/64 разрядные

**Справка**: Деньги в float и double НЕ надо вычислять (javadoc - This data type should never be used for precise values, such as currency. For that, you will need to use the java.math.BigDecimal class instead. Numbers and Strings covers BigDecimal and other useful classes provided by the Java platform.). При делении на ноль вернут бесконечность (плюс или минус).
### Сколько памяти занимает boolean?
В стандартной реализации Sun JVM и Oracle HotSpot JVM тип boolean занимает **4 байта**, как и тип **int**. Однако, в определенных версиях JVM имеются реализации, где в массиве boolean каждое значение занимает по 1-му биту.
**Почему?**
Современная архитектура не способна указать адрес памяти в битах, а только в байтах.
## Объявление переменной
[Как объявить переменную в Java? Инициализация](https://otus.ru/nest/post/620/)
` int a, b, c;          // объявление трёх целых переменных a, b и c
Перед использованием переменной, нужно задать ей начальное значение. Этот процесс называется **инициализация**. Без инициализации мы можем получить ошибку во время выполнения программы, поэтому инициализация очень важна.
``` java
int a = 10, b = 10;   // Пример инициализации переменных
double pi = 3.14159d;  // Объявление переменной pi и присвоение ей величины «пи»
byte b = 22;          // Инициализация переменной b типа byte
char a = 'a';         // Переменной a типа char присваиваем значение 'a'
```

### Инициализация переменных по умолчанию
![[Инициализация переменных по умолчанию.png]]
```java
int number; // number инициализируется значением 0
double value; // value инициализируется значением 0.0
boolean flag; // flag инициализируется значением false
char letter; // letter инициализируется значением '\u0000'
String text; // text инициализируется значением null
```

>[!NOTE] Всем литералам с плавающей точкой по умолчанию присваивается тип **double**
### Динамическая инициализация
Переменные в Java можно инициализировать не только константами, но и динамически. **Динамическая инициализация** — это процесс присвоения значения переменной **во время выполнения программы** на основе выражений, а не только фиксированных (константных) значений.

**Особенности:**
- Используются **вычисления**, **методы**, **входные данные**, и т.п.
- Значение переменной определяется **не заранее**, а **в момент запуска программы**.
- Может применяться как к примитивам, так и к объектам.

Простой пример:
```Java
int x = 5;
int y = 10;
int sum = x + y; // sum инициализируется динамически
System.out.println(sum); // 15
```
**Ключевая идея:**  
Значение переменной зависит не от константы, а от выражения.

---
## Следующие темы:
- [[Блоки инициализации]]

- [[Преобразование типов Java]]

- [[Классы обертки Java]]

- [[Двоичная система счисления]]

## Источники 
- [Переменные в Java](https://tinyurl.com/2fao68cr)