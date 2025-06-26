---
aliases:
  - equals
tags:
  - Java/ООП
---
По умолчанию в классе Object определены методы **.equals()** и **.hashCode()**. В результате каждый класс Java неявно содержит эти два метода:

```java
class Money { 
int amount; String currencyCode; 
}
```

```java
Copy Money income = new Money(55, "USD"); 
Money expenses = new Money(55, "USD"); 
boolean balanced = income.equals(expenses)
```

Мы ожидали бы, что income.equals(expenses) вернет true, но с текущей реализацией класса Money этого не произойдет.

Реализация equals() в классе Object по умолчанию сравнивает идентичность объекта. В нашем примере экземпляры доходов и расходов класса Money имеют две разные идентичности. Поэтому их сравнение с помощью метода .equals() возвраща ет false.

Чтобы изменить это поведение, мы должны переопределить этот метод.

## Overriding (Переопределение) метода _equals()_ 

![[Переопределение equals java.png|500]]
Давайте переопределим метод . _equals()_ так, чтобы он учитывал не только идентичность объекта, но и значение двух соответствующих свойств:
```java
@Override
public boolean equals(Object o) {
    if (o == this)
        return true;
    if (!(o instanceof Money))
        return false;
    Money other = (Money)o;
    boolean currencyCodeEquals = (this.currencyCode == null && other.currencyCode == null)
      || (this.currencyCode != null && this.currencyCode.equals(other.currencyCode));
    return this.amount == other.amount && currencyCodeEquals;
}
```

Выше мы рассмотрели три условия для проверки того, является ли экземпляр Money таким же, как любой другой объект. Во-первых, если объект равен самому себе, он вернет true. Во-вторых, если он не является экземпляром Money, то вернется false. В-третьих, мы сравниваем его с атрибутами другого экземпляра класса Money. В деталях мы убеждаемся, что все атрибуты сравниваемого класса совпадают с атрибутами сравнивающего класса.
## Контракт . _equals()_

**Java SE определяет контракт, которому  должна соответствовать наша реализация метода _equals()_** . Короче говоря, большинство критериев следуют здравому смыслу, но мы можем определить формальные правила, которым  должен следовать метод _equals()_ . Он должен быть:
![[Контракт equals.png]]
![[Пример equals.png]]
>[!warning]
>**Переопределяя метод equals(), обязательно соблюдай контракт.**
Это не просто набор каких-то «полезных рекомендаций», а именно жесткий контракт методов, прописанный в документации Oracle.

## Нарушение симметрии equals() при наследовании

Если критерии для .equals() настолько здравы, то как мы вообще можем их нарушать? **Нарушение контракта .equals() более вероятно, когда мы расширяем класс, который также переопределил метод .equals().** Давайте рассмотрим класс Voucher, который расширяет наш класс Money:
```java
class WrongVoucher extends Money {

    private String store;

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WrongVoucher))
            return false;
        WrongVoucher other = (WrongVoucher)o;
        boolean currencyCodeEquals = (this.currencyCode == null && other.currencyCode == null)
          || (this.currencyCode != null && this.currencyCode.equals(other.currencyCode));
        boolean storeEquals = (this.store == null && other.store == null)
          || (this.store != null && this.store.equals(other.store));
        return this.amount == other.amount && currencyCodeEquals && storeEquals;
    }

    // other methods
}
```

На первый взгляд, класс Voucher и его переопределение для .equals() кажутся правильными. Оба метода .equals() ведут себя корректно, пока мы сравниваем Money с Money или Voucher с Voucher. Но что произойдет, если мы сравним эти два объекта:

```java
Money cash = new Money(42, "USD");
WrongVoucher voucher = new WrongVoucher(42, "USD", "Amazon");

voucher.equals(cash) => false // As expected.
cash.equals(voucher) => true // That's wrong.
```
Таким образом, мы имеем нарушение критерия симметрии.
## Исправление симметрии equals() с помощью композиции

**Чтобы избежать ошибок, следует предпочесть композицию наследованию.**

Вместо того чтобы создавать подкласс Money, давайте создадим класс Voucher со свойством Money:

```java
class Voucher {

    private Money value;
    private String store;

    Voucher(int amount, String currencyCode, String store) {
        this.value = new Money(amount, currencyCode);
        this.store = store;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Voucher))
            return false;
        Voucher other = (Voucher) o;
        boolean valueEquals = (this.value == null && other.value == null)
          || (this.value != null && this.value.equals(other.value));
        boolean storeEquals = (this.store == null && other.store == null)
          || (this.store != null && this.store.equals(other.store));
        return valueEquals && storeEquals;
    }

    // other methods
}
```

Теперь .equals() будет работать симметрично, как того требует контракт.

### В чем разница между == и equals()?

Java == и equals() - это два разных оператора.

Оператор == сравнивает ссылки на объекты, то есть проверяет, указывают ли две переменные на один и тот же объект в памяти. Если две переменные указывают на один и тот же объект, то оператор == вернет true. В противном случае, если две переменные указывают на разные объекты, то оператор == вернет false.

Например:
```java
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

System.out.println(s1 == s2); 
// true

System.out.println(s1 == s3); 
// false
```

В этом примере две переменные s1 и s2 указывают на один и тот же объект в пуле строк, поэтому оператор == возвращает true. А переменная s3 указывает на новый объект, созданный с помощью ключевого слова new, поэтому оператор == возвращает false.

Метод equals(), с другой стороны, сравнивает содержимое объектов, а не ссылки на них. Реализация метода equals() может быть переопределена для классов, чтобы определить, как должно быть выполнено сравнение содержимого.

Например:
```java
String s1 = "hello";
String s2 = "hello";
String s3 = new String("hello");

System.out.println(s1.equals(s2));
// true

System.out.println(s1.equals(s3)); 
// true (как только переопределено для String)
```

Здесь вызов метода equals() вернет true, так как содержимое всех трех строк одинаково, несмотря на то, что две переменные (s1 и s2) указывают на один и тот же объект в пуле строк, а переменная s3 указывает на новый объект.

Таким образом, если вам нужно сравнить ссылки на объекты, используйте оператор `==`. Если вам нужно сравнить содержимое объектов, используйте метод equals().