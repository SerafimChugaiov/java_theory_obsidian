---
tags: Java/Исключения
---
> **Цель** — сделать стабильную, безопасную и расширяемую систему обработки ошибок в REST API.  
> Всё это реализовано и активно применяется в боевом проекте — API для управления резюме (CV Management System).
## 1. Почему мы внедрили кастомные исключения в проекте

В процессе разработки REST API мы столкнулись с проблемами:

- При возникновении ошибок возвращались **разные форматы ответа** (в зависимости от типа исключения).
    
- **HTTP-статусы не всегда соответствовали сути ошибки** (например, `500` вместо `404`, если пользователь не найден).
    
- На клиент улетали **стек-трейсы и внутренние детали**, что плохо с точки зрения безопасности.
    
- Отладка по логам была сложной, потому что **ошибки не логировались централизованно**.
    

### Решение:

Мы спроектировали **единый механизм обработки ошибок**, который включает:

- собственные исключения (все наследуются от общего класса),
    
- DTO-ответ с предсказуемой структурой,
    
- глобальный обработчик ошибок,
    
- централизованное логирование.
## 2. Создаём базовый класс исключений `BaseException`

**Реализация:**

```java
@Getter
public abstract class BaseException extends RuntimeException {

    private final int statusCode;
    private final String errorCode;

    public BaseException(int statusCode, String message) {
        this(statusCode, null, message, null);
    }

    public BaseException(int statusCode, String errorCode, String message) {
        this(statusCode, errorCode, message, null);
    }

    public BaseException(int statusCode, String message, Throwable cause) {
        this(statusCode, null, message, cause);
    }

    public BaseException(int statusCode, String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

```
### Зачем мы сделали именно так:

- **Наследуемся от `RuntimeException`**, чтобы исключения не нужно было явно обрабатывать везде (`unchecked`).
    
- Используем `int statusCode`, чтобы не тянуть `HttpStatus` везде в бизнес-логику.
    
- `errorCode` — короткий идентификатор ошибки (например, `"cv.not_found"`, `"auth.failed"`), который:
    
    - логируется,
        
    - помогает фронтенду отличать ошибки программно,
        
    - легко локализуется.
        
- Несколько конструкторов упрощают создание исключений в разных контекстах (например, с `Throwable`).
## 3. Создаём единый ответ об ошибке `BaseErrorResponse`

**Где:**  
В пакете `dto.response.error` или `common.dto`.

```java
@Builder
@Getter
@AllArgsConstructor
public class BaseErrorResponse {
    private String errorCode;  
	private String message;
}
```

### Как используется:
В глобальном обработчике ошибок мы формируем этот объект и возвращаем его клиенту.  
Это позволяет **фронтенду всегда получать один и тот же формат**, и он знает, что всегда может взять:

- `errorCode` — для внутренней обработки;
- `message` — для отображения пользователю;
### Почему именно такой формат:
- Минимализм: `errorCode` и `message` — основное, что нужно фронту.
    
- Клиент может по `errorCode` отобразить локализованное сообщение или произвести логику (например, `session.expired` → редирект на логин).
    
- Строится через `@Builder`, что удобно при возврате через `ResponseEntity`.
## 4. Добавляем конкретные исключения (примеры из проекта)

### Пример 1: пользователь не найден

**Где используется:** в сервисе, когда ищем пользователя по ID и не находим.

```java
public class UserNotFoundException extends BaseException {
    public UserNotFoundException(Long id) {
        super(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", "Пользователь с ID=" + id + " не найден");
    }
}
```

**Где вызывается:**

```java
public User getUserById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException(id));
}
```

### Пример 2: дублирующий навык (skill)

**Где используется:** при добавлении нового навыка к пользователю.

```java
public class SkillAlreadyExistsException extends BaseException {
    public SkillAlreadyExistsException(String skillName) {
        super(HttpStatus.CONFLICT, "SKILL_DUPLICATE", "Навык '" + skillName + "' уже добавлен");
    }
}
```

**Как помогает:**

- Упрощает читаемость бизнес-логики.
    
- Исключения несут смысловую нагрузку и используются как **контролируемый механизм сигнальных ошибок**, а не как сбои.
---
## Что мы достигли на этих этапах

- Система исключений стала **прозрачной и расширяемой**  
* Все исключения **имеют код и статус**, которые можно использовать на фронте и в логах  
- Каждый бизнес-кейс теперь может возвращать свою уникальную ошибку без дублирования логики  

---
## 5. Централизованный обработчик ошибок и логирование

### Проблема:
Даже после внедрения собственных исключений оставались проблемы:

- В некоторых случаях (например, валидация, ошибки Spring Security) вылетали **необработанные исключения**, нарушая единообразие ответа.
- Отсутствовал **единый механизм логирования ошибок**, особенно важных для аудита: кто вызвал, когда, что пошло не так.
- Пришлось бы вручную писать `try-catch` в каждом контроллере.
### Решение:
Мы добавили **глобальный обработчик ошибок**, который:

- ловит **все исключения** (`BaseException`, `Validation`, `Security`, `Generic`),
- возвращает **единый DTO-ответ `BaseErrorResponse`**,
- делает **централизованное логирование** ошибки в очередь `requestLogQueue` (асинхронно),
- фиксирует в логах: IP, URL, метод, текущего пользователя, стек-трейс.

## 6. Глобальный обработчик `ExceptionControllerHandler`

**Где:**  
В пакете `handler`, аннотирован `@RestControllerAdvice`.

### Главные задачи:

- Обрабатывать все типы ошибок — и бизнесовые, и системные.
- Возвращать единый ответ с `errorCode`, `message`, `status`.
- Логировать ошибки централизованно — **собираем всё в очередь логов**.
### Примеры обработчиков:

#### 🟥 `BaseException` — наши бизнес-исключения

```java
@ExceptionHandler(BaseException.class)
public ResponseEntity<BaseErrorResponse> handleBaseException(BaseException ex, HttpServletRequest request) {
    // Логгируем ошибку и кладём в очередь
    logToQueue(request, ex, ex.getStatusCode());

    // Возвращаем ответ клиенту
    BaseErrorResponse response = new BaseErrorResponse(
        ex.getErrorCode(), 
        ex.getMessage()
    );
    return ResponseEntity
        .status(HttpStatus.valueOf(ex.getStatusCode()))
        .body(response);
}
```

#### 🟧 `MethodArgumentNotValidException` — ошибки валидации

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<BaseErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
    List<String> errorMessages = ex.getBindingResult()
        .getAllErrors()
        .stream()
        .map(ObjectError::getDefaultMessage)
        .collect(Collectors.toList());

    String combinedMessage = String.join("; ", errorMessages);

    logToQueue(request, ex, 400);

    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(new BaseErrorResponse("validation.failed", combinedMessage));
}
```

#### 🟨 `Exception` — всё остальное (падения, NullPointer и т.д.)

```java
@ExceptionHandler(Exception.class)
public ResponseEntity<BaseErrorResponse> handleUnexpectedException(Exception ex, HttpServletRequest request) {
    logToQueue(request, ex, 500);

    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new BaseErrorResponse("error.server", "Server error occurred."));
}
```

---

## 7. Централизованное логирование через очередь

### Зачем:

- Все ошибки логируются **в едином формате** — без повторения логики по проекту.
    
- Можно в любой момент отследить: кто вызвал, когда, что произошло, какой IP, браузер.
    
- Логи попадают в очередь `requestLogQueue` → можно сохранять в БД, Kafka, мониторинг.
    

### Пример лог-записи:

```java
PortalsUserRequestLog.builder()
    .createdAt(dateTimeUtil.getCurrentLocalDateTime())
    .ipAddress(request.getRemoteAddr())
    .method(request.getMethod())
    .url(request.getRequestURI())
    .userAgent(request.getHeader("User-Agent"))
    .logContext(LogContext.EXCEPTION_HANDLER)
    .userId(currentUser != null ? currentUser.getId() : null)
    .email(currentUser != null ? currentUser.getEmail() : null)
    .responseStatus(statusCode)
    .errorStackTrace(getStackTraceAsString(ex))
    .build();
```

---

## 8. Что мы достигли

- Ошибки **не теряются**, а логируются детально.
    
- **Фронт всегда получает одинаковый формат** ошибки: можно предсказать и обрабатывать.
    
- Поведение системы в случае ошибок **предсказуемо и расширяемо**.
    
- Мы получили **единое место**, где можно централизованно:
    
    - логировать ошибки,
        
    - изменять формат,
        
    - добавлять новые типы исключений.
        

---

## Возможные улучшения в будущем:

- Добавить `traceId` или `requestId` в ответ и лог — для корреляции в логах.
    
- Интеграция с APM (например, Sentry, Elastic).
    
- Локализация сообщений ошибок по `errorCode`.
    

---

Если хочешь, я могу помочь оформить это как Markdown-документ для Wiki, или сделать диаграмму по этому механизму — просто скажи.