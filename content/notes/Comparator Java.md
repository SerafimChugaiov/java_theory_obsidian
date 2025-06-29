---
tags: Java 
---
Интерфейс Comparable содержит один единственный метод **int compareTo(E item)**, который сравнивает текущий объект с объектом, переданным в качестве параметра. Если этот метод возвращает отрицательное число, то текущий объект будет располагаться перед тем, который передается через параметр. Если метод вернет положительное число, то, наоборот, после второго объекта. Если метод возвратит ноль, значит, оба объекта равны.

Есть встроенные механизмы сравнения. Например, класс String
```java
    public int compareTo(Person p){
        return name.compareTo(p.getName());
    }
```

Также механизм сравнения можно переопределить
```java
public int compareTo(Person p){
     
    return name.length()-p.getName().length();
}
```

![[Пример реализации Comparable.png|400]]
## Интерфейс Comparator
Интерфейс **Comparator** содержит ряд методов, ключевым из которых является метод **compare()**, который возвращает числовое значение - если оно отрицательное, то объект a предшествует объекту b, иначе - наоборот. А если метод возвращает ноль, то объекты равны.

Для применения интерфейса нам сначала надо создать класс компаратора,
который реализует этот интерфейс.
![[Пример Comparator.png]]
![[Пример Comparator sort.png]]

### Разница между Comparable и Comparator
**Comparable** реализуется ВНУТРИ класса. По сути, определяет обычный/естественный порядок сравнения объектов. ОДИН метод compareTo(); 

**Comparator** - реализуется ВНЕ класса.
Можно реализовать разные варианты сортировки, основанные на сравнении различных полей (свойств объектов). Имеет РЯД методов, ключевой их них – compare();
