---
tags: Java/ОсновыЯзыка
---
Тип Enum — специальный тип данных, который позволяет переменной быть набором предопределенных констант. Другими словами, он позволяет создать переменную, которая может принимать несколько значений (каждое из значений, объявленных в самом перечислении).
```java
enum Day{  

    MONDAY,  
    TUESDAY,  
    WEDNESDAY,  
    THURSDAY,  
    FRIDAY,  
    SATURDAY,  
    SUNDAY  
}
```


Внутри каждого перечисления можно объявить поля и методы, а также конструкторы (для этого надо передать аргументы в перечисление)


![[Пример работы с перечислением.png]]
## Методы перечислений

**name** - имя элемента перечисления
**ordinal** - число начиная с нуля, порядковый номер элемента
**values** - массив возможных значений перечисления
**finalize()**
**clone()**
**equals(), hashCode(), toString()**

valueof - ?

Наследоваться от enum нельзя

>[!note]
>Может быть объявлен как внутри, так и снаружи класса

### Что делает метод ordinal() в Enum?

`Метод ordinal()` в Enum возвращает порядковый номер константы перечисления (enum), начиная с 0. Порядковый номер - это позиция элемента перечисления в списке значений этого перечисления.

Например, если у вас есть перечисление Season со значениями WINTER, SPRING, SUMMER и FALL, то вызов метода WINTER.ordinal() вернет 0, метода SPRING.ordinal() вернет 1, метода SUMMER.ordinal() вернет 2 и метода FALL.ordinal() вернет 3.

Заметьте, что порядковый номер элемента может измениться, если новые элементы добавляются или удалены из перечисления. Поэтому порядковый номер не должен использоваться в качестве постоянных идентификаторов для элементов перечисления.

### Можно ли использовать Enum из TreeSet или TreeMap в Java?

Да, Enum можно использовать как ключи (keys) в TreeMap и как элементы (elements) в TreeSet в Java. Это возможно, потому что Enum реализует java.lang.Comparable интерфейс. Одним из преимуществ использования Enum в качестве ключей в TreeMap является то, что Enum константы определены и упорядочены по порядку определения, что обеспечивает естественный порядок сортировки элементов в TreeMap. Например:

```
enum Color {    RED, GREEN, BLUE}Map<Color, String> colorCodes = new TreeMap<>();colorCodes.put(Color.RED, "FF0000");colorCodes.put(Color.GREEN, "00FF00");colorCodes.put(Color.BLUE, "0000FF");System.out.println(colorCodes);
```

Результат будет выводиться в отсортированном порядке, как: {BLUE=0000FF, GREEN=00FF00, RED=FF0000}.

### Может ли Enum реализовывать (implement) интерфейс?

Да, в Java Enum может реализовывать (implement) интерфейс. Это означает, что каждая константа Enum будет иметь реализацию методов этого интерфейса.

Рассмотрим следующий пример кода:
```java
public interface MyInterface {
	void myMethod();
}
public enum MyEnum implements MyInterface {
	CONSTANT1 {
		@Override      
		public void myMethod() {
			System.out.println("Constant 1 implementation");      
		}   
	},   
	CONSTANT2 {      
		@Override      
		public void myMethod() {         
			System.out.println("Constant 2 implementation");      
		}   
	};   
// общие методы для всех констант   
	public void someMethod() {
		System.out.println("Some method implementation");   
	}
}
```

Здесь мы создаем интерфейс "MyInterface", который содержит метод "myMethod()". Далее мы создаем Enum "MyEnum", который реализует этот интерфейс. Внутри Enum мы создаем две константы - "CONSTANT1" и "CONSTANT2", которые обе реализуют метод "myMethod()" интерфейса "MyInterface".

Также в Enum мы можем определять свои собственные методы, которые будут доступны для всех констант.

В данном примере при вызове метода "myMethod()" для константы "CONSTANT1" будет выведено сообщение "Constant 1 implementation", а для "CONSTANT2" - "Constant 2 implementation". Вызов метода "someMethod()" для любой из констант Enum выведет сообщение "Some method implementation".

### Может ли Enum расширить (extends) класс?

В Java Enum не может расширять (extends) классы, так как Enum уже является конечной реализацией класса. В Java каждый Enum наследуется от класса java.lang.Enum, который уже содержит реализацию методов, свойств и функциональности, необходимых для работы перечислений.

Также если мы попытаемся объявить перечисление, которое наследует другой класс, то компилятор выдаст ошибку. Например:

```java
public class MyClass {
// some code
}
public enum MyEnum extends MyClass {
// ОШИБКА КОМПИЛЯЦИИ!  
// some code
}
```

Компилятор сообщит об ошибке при объявлении Enum, наследующего MyClass, так как это не допустимо в Java.

Однако, класс может реализовать интерфейс, который уже реализован в Enum, чтобы добавить дополнительный функционал к Enum, но это будет реализация интерфейса, а не расширение класса.

### Можно ли создать Enum без экземпляров объектов?

Да, в Java можно создать перечисление (enum) без экземпляров объектов. Для этого нужно создать пустой список аргументов в определении перечисления, например:

```java
public enum MyEnum {  
	INSTANCE;  
// остальной код
}
```

Но у этого перечисления всё равно будет один экземпляр, INSTANCE. Этот подход используется часто при реализации паттерна Singleton.

### Можем ли мы переопределить метод toString() для Enum?

Да, вы можете переопределить метод toString() для Enum в Java. По умолчанию вызов toString() для экземпляра Enum возвращает значение его поля имени. Однако вы можете определить собственный метод toString() для класса Enum, чтобы возвращать другое строковое представление экземпляра. Вот пример:

```
public enum Day {  MONDAY("Monday"), TUESDAY("Tuesday"), WEDNESDAY("Wednesday"),   THURSDAY("Thursday"), FRIDAY("Friday"), SATURDAY("Saturday"), SUNDAY("Sunday");  private String displayName;  private Day(String displayName) {    this.displayName = displayName;  }  @Override  public String toString() {    return displayName;  }}
```

В этом примере перечисление Day имеет настраиваемое поле displayName и конструктор, который задает это поле для каждой константы перечисления. Затем метод toString() переопределяется, чтобы возвращать значение displayName вместо имени. Теперь вызов toString() для любого экземпляра Day вернет соответствующее отображаемое имя вместо постоянного имени.

Имейте в виду, что классы enum неизменяемы, а это означает, что вы не можете изменить существующий экземпляр или создать новые экземпляры во время выполнения. Таким образом, когда вы переопределяете метод toString() или любой другой метод, вы должны определить его в исходном определении класса перечисления, а не в подклассе или экземпляре класса перечисления.

### Что будет, если не будем переопределять метод toString() для Enum?

Если не переопределить метод toString() для Enum, то при вызове этого метода будет возвращаться строковое представление элемента Enum по умолчанию. По умолчанию toString() возвращает имя элемента Enum, которое задается в объявлении константы.

Например, для следующего объявления Enum:
```java
enum Day { 
	MONDAY, 
	TUESDAY,
	WEDNESDAY, 
	THURSDAY, 
	FRIDAY, 
	SATURDAY, 
	SUNDAY;
}
```

При вызове метода toString() для элемента Day.MONDAY будет возвращаться строка "MONDAY".

Однако, если поведение метода toString() для элементов Enum не соответствует требованиям вашей программы, то вы можете переопределить его и задать нужное поведение. Например, вы можете определить, что для каждого элемента Enum должно возвращаться уникальное значение или что метод toString() должен возвращать более информативную строку.

### Можем ли мы указать конструктор внутри Enum?

Да, в Java вы можете указывать конструкторы внутри перечислений (Enum). Конструкторы в Enum используются для инициализации значений элементов перечисления.

Конструктор Enum вызывается автоматически при создании каждого элемента перечисления. При определении конструктора следует учесть, что конструктор Enum всегда приватный (private) и не может быть объявлен как public или protected. Это означает, что конструктор Enum не может быть вызван снаружи класса перечисления.

Вот пример использования консруктора внутри Enum:

```java
enum Day {
	MONDAY("Monday"),     
	TUESDAY("Tuesday"),     
	WEDNESDAY("Wednesday"),     
	THURSDAY("Thursday"),     
	FRIDAY("Friday"),     
	SATURDAY("Saturday"),     
	SUNDAY("Sunday");    
	
	private String displayName;
	
	private Day(String displayName) {        
		this.displayName = displayName;    
	}    
	
	public String getDisplayName() {        
		return displayName;    
	}
}
```

В этом примере мы определяем перечисление Day, которое имеет поле displayName и конструктор, который инициализирует это поле. Мы также определяем метод getDisplayName(), который позволяет получить значение поля displayName.

Теперь, при создании каждого элемента перечисления Day, нам нужно указывать значение поля displayName. Например, чтобы создать элемент MONDAY со значением Monday, мы можем использовать следующий код:

```java
	Day monday = Day.MONDAY;
	System.out.println(monday.getDisplayName()); 
// выведет "Monday"
```

### Как связаны методы ordinal() и compareTo() в Enum?

Метод ordinal() в Java Enum возвращает порядковый номер элемента Enum, начиная с 0. То есть, если у вас есть перечисление (enum) с именами "MONDAY", "TUESDAY", "WEDNESDAY" и т.д., то метод MONDAY.ordinal() вернет 0, TUESDAY.ordinal() вернет 1, и т.д.

Метод compareTo() определен в интерфейсе java.lang.Comparable, который реализуется всеми перечислениями (enums) в Java. Он используется для сравнения значений этих перечислений с другими значениями того же типа.

Для перечисления (enum) MyEnum метод compareTo() будет выглядеть примерно так:

```JAVA
public int compareTo(MyEnum other) {
	return this.ordinal() - other.ordinal();
}
```

Этот метод сравнивает порядковые номера двух элементов перечисления (enums) и возвращает отрицательное значение, если вызывающий элемент находится раньше аргумента метода в перечислении, положительное значение, если вызывающий элемент находится позже аргумента метода в перечислении, и ноль, если они находятся в одном и том же месте.

Таким образом, ordinal() используется для получения порядкового номера элемента Enum, а compareTo() используется для сравнения порядковых номеров двух элементов Enum. Оба метода работают вместе для обеспечения правильной работы перечислений (enums) в Java.

### Как получить все имеющиеся значения в экземпляре Enum?

Для того чтобы получить все значения перечисления (enum) в Java, можно использовать метод values() класса перечисления. Например:

```
public enum Fruit {
	APPLE,    
	BANANA,    ORANGE}
```

// Получение всех значений перечисления Fruit  
Fruit[] fruits = Fruit.values();  
Метод values() возвращает массив всех значений перечисления в том порядке, в котором они были объявлены.
### Можно ли использовать Enum в switch case?

Да, в Java можно использовать перечисления (Enum) в операторе switch case.

Пример:

```JAVA
enum DayOfWeek {
	MONDAY,    
	TUESDAY,    
	WEDNESDAY,    
	THURSDAY,    
	FRIDAY,    
	SATURDAY,    
	SUNDAY
}

public class Main {    
	public static void main(String[] args) {        
		DayOfWeek day = DayOfWeek.FRIDAY;        
		
		switch(day) {            
			case MONDAY:                
				System.out.println("It's Monday");
				break;            
			case TUESDAY:                
				System.out.println("It's Tuesday");                
				break;           
			case WEDNESDAY:                
				System.out.println("It's Wednesday");                
				break;            
			case THURSDAY:                
				System.out.println("It's Thursday");                
				break;            
			case FRIDAY:                
				System.out.println("It's Friday");                
				break;           
			case SATURDAY:                
				System.out.println("It's Saturday");                
				break;            
			case SUNDAY:                
			System.out.println("It's Sunday");                
				break;            
			default:                
				System.out.println("Invalid day of week.");                
				break;        
		}    
	}
}
```

Здесь мы создали перечисление DayOfWeek и используем его значениe в операторе switch case. Если значение day равно одному из значений перечисления, соответствующий код будет выполнен. Если значение day не совпадает ни со одним значением в switch case, то код в блоке default будет выполнен.

[Java | Перечисления enum](https://metanit.com/java/tutorial/3.8.php)
