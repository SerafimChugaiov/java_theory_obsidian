---
tags: Java/ООП
---
## Ключевое слово final
1. Для классов
От данного класса нельзя наследоваться.
2. Для методов
Данный метод не может быть переопределен в классах наследниках.
3. Для поля
Поле не может быть изменено, значение задается только 1 раз.
### Где может применяться final?
В объявлении:
- класса
- метода.
	- параметра метода (**значение присваивается только один раз**)
-  нестатического / статического поля класса.
-   локальной переменной.

## static + final
Используется для объявления констант. Имена констант принято называть в верхнем регистре, разделяя слова подчеркиваниями MIN_VALUE

