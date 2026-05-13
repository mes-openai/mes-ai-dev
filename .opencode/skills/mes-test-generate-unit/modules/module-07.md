# 代码规范

## 代码规范

### 命名规范

```java
// 测试类命名：被测类名 + Test
XxxServiceTest

// 测试方法命名：方法名_条件_期望结果
getUserById_validId_returnUser()
getUserById_invalidId_throwException()
saveUser_nullName_throwValidationException()
```

### 断言规范

```java
// 基本断言
assertEquals(expected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);

// 对象断言
assertEquals(expected.getId(), actual.getId());
assertEquals(expected.getName(), actual.getName());

// 异常断言
BusinessException exception = assertThrows(BusinessException.class, () -> target.methodName(invalidInput));
assertEquals("错误码", exception.getCode());

// 异常消息断言
try {
    target.methodName(invalidInput);
    fail("Should throw exception");
} catch (BusinessException e) {
    assertEquals("错误码", e.getCode());
}
```

- 对返回统一响应对象、Result、Response、AjaxResult 或类似结构的测试，必须同时验证状态码/结果标识和核心业务数据。
- 禁止只断言状态码、success 标识或非空对象就结束测试。
- 异常场景必须断言异常类型、关键错误码或错误消息。

### Mock规范

```java
// Mock返回值
when(mockService.method(any())).thenReturn(result);
when(mockService.method(any())).thenReturn(null);
when(mockService.method(any())).thenThrow(new Exception());

// 验证调用
verify(mockService, times(1)).method(any());
verify(mockService, never()).method(any());
verify(mockService, atLeast(1)).method(any());
verify(mockService, atMost(3)).method(any());

// 参数捕获
ArgumentCaptor<[类型]> captor = ArgumentCaptor.forClass([类型].class);
verify(mockService).method(captor.capture());
assertEquals(expected, captor.getValue());
```

必须 Mock 的依赖类型：

- 外部 API / 远程服务调用。
- DAO / Mapper / Repository 等数据操作层。
- 国际化工具：`I18nUtils`、`I18nUtil`。
- 唯一生成工具：`GuidUtil`。
- 文件系统、时间、随机数等不可控外部依赖。


### 路径兼容规范

```java
// 路径拼接：优先使用 Path / Paths，避免硬编码 \\ 或 /
Path file = tempDir.resolve("data").resolve("input.txt");

// 路径断言：比较前先规范化
assertEquals(expectedPath.normalize(), actualPath.normalize());
```

- 禁止硬编码盘符、用户目录、工作目录、`\\` 或 `/` 分隔符。
- 临时目录优先使用测试框架或 JDK 提供的跨平台机制。
- classpath 资源读取不得依赖 IDE 当前工作目录。

### Mockito 参数匹配规范

```java
// 正确：同一调用内 matcher 策略一致
when(repository.find(eq(siteCode), any(Date.class))).thenReturn(result);

// 复杂参数：优先捕获后断言
ArgumentCaptor<RequestDto> captor = ArgumentCaptor.forClass(RequestDto.class);
verify(service).submit(captor.capture());
assertEquals(expectedCode, captor.getValue().getCode());
```

- 同一个 mock 调用中不得混用裸值与 matcher。
- 固定值匹配优先使用 `eq(...)`。
- 复杂对象优先使用 `ArgumentCaptor` 或 `argThat(...)`，不得用过宽泛 `any()` 掩盖契约。
- stub 前必须初始化被测对象、mock 依赖、返回对象和嵌套字段，避免空指针式失败。

### 测试框架与组织结构

- 默认使用 JUnit 5 + Mockito + JDK8。
- 测试类使用 `@ExtendWith(MockitoExtension.class)`。
- 每个被测 public 方法必须对应一个 `@Nested` 内部类。
- `@Nested` 内部类中按正常、边界、异常、空值等场景组织测试方法。
- 禁止使用 JUnit 4 的 `@RunWith(MockitoJUnitRunner.class)` 和 `@Test(expected=...)` 作为新生成测试默认写法。

### Import 规范

- 禁止使用通配符导入，例如 `import java.util.*;`、`import static org.mockito.Mockito.*;`。
- 仅允许导入测试文件实际使用的类型和静态方法。
