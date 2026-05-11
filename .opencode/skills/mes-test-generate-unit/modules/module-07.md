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
@Test(expected = BusinessException.class)
public void methodName_invalidInput_throwException() { }

// 异常消息断言
try {
    target.methodName(invalidInput);
    fail("Should throw exception");
} catch (BusinessException e) {
    assertEquals("错误码", e.getCode());
}
```

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
