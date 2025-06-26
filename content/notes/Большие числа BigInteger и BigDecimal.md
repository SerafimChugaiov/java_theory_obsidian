---
tags:
  - Java/ОсновыЯзыка
aliases:
  - BigInteger
  - BigDecimal
---
Встроенные примитивные числовые типы не всегда могут подходить для определенных программ. Например, необходимо хранить и использовать в программе очень большие числа, которые выходят за пределы допустимых значений для типов long и double. В этом случае для работы с числовыми данными можно использовать два дополнительных типа из пакета java.math - BigInteger (для целочисленных данных) и BigDecimal (для чисел с плавающей точкой).

### **Методы класса `BigInteger`**

|Метод|Описание|
|---|---|
|`add(BigInteger other)`|Возвращает сумму двух чисел|
|`subtract(BigInteger other)`|Возвращает разность двух чисел|
|`multiply(BigInteger other)`|Возвращает произведение двух чисел|
|`divide(BigInteger other)`|Возвращает частное двух чисел|
|`mod(BigInteger other)`|Возвращает остаток от деления|
|`sqrt()`|Возвращает квадратный корень числа|
|`compareTo(BigInteger other)`|Сравнивает два числа: -1, 0 или 1|
|`static valueOf(long x)`|Создаёт `BigInteger` из `long`|
|`intValue()`|Преобразует в `int`|
|`longValue()`|Преобразует в `long`|
|`shortValue()`|Преобразует в `short`|
|`byteValue()`|Преобразует в `byte`|

---

### **Методы класса `BigDecimal`**

|Метод|Описание|
|---|---|
|`add(BigDecimal other)`|Возвращает сумму двух чисел|
|`subtract(BigDecimal other)`|Возвращает разность двух чисел|
|`multiply(BigDecimal other)`|Возвращает произведение двух чисел|
|`divide(BigDecimal other)`|Возвращает частное двух чисел|
|`divide(BigDecimal other, RoundingMode mode)`|Деление с округлением по заданному режиму|
|`compareTo(BigDecimal other)`|Сравнивает два числа: -1, 0 или 1|
|`static valueOf(double x)`|Создаёт `BigDecimal` из `double`|
|`doubleValue()`|Преобразует в `double`|
|`floatValue()`|Преобразует в `float`|


Пример использования классов BigInteger и BigDecimal:
```java
import java.math.*;  
  
public class Program {  
  
    public static void main(String[] args) {  
  
        BigInteger a = BigInteger.valueOf(2147483647);  
        BigInteger b = BigInteger.valueOf(2147483641);  
        //a = a * b;  // так нельзя  
        a = a.multiply(b);  
        System.out.println(a);  // 4611686001247518727  
        long x = a.longValue();  
        System.out.println(x);  // 4611686001247518727  
  
        BigDecimal c = BigDecimal.valueOf(2325.06);  
        BigDecimal d = BigDecimal.valueOf(215.06);  
        c = c.subtract(d.multiply(BigDecimal.valueOf(2.1)));  
        System.out.println(c);      // 1873.434  
        double y = c.doubleValue();  
        System.out.println(y);      // 1873.434  
    }  
}
```


>[!info]
>Стоит отметить, несмотря на то, что объекты BigInteger и BigDecimal представляют числа, мы не можем применять с ними стандартные арифметические операции. Все математические действия с данными объектами идут через их методы. 
>
>Пакет java.math - BigInteger (для целочисленных данных) и BigDecimal (для чисел с плавающей точкой).