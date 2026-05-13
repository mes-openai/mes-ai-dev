# 执行步骤（2/2）

### 步骤5：覆盖测试场景

为每个方法生成完整的测试场景：

```java
// 正常场景
@Test
public void methodName_validInput_returnSuccess() { ... }

// 边界场景
@Test
public void methodName_boundaryInput_returnExpected() { ... }

// 异常场景
@Test
void invalidInput_throwException() {
    [异常类] exception = assertThrows([异常类].class, () -> target.methodName(invalidInput));
    assertEquals("[错误码]", exception.getCode());
}

// 空值场景
@Test
public void methodName_nullInput_handleGracefully() { ... }
```

### 步骤6：生成测试数据构建器

```java
/**
 * 测试数据构建器
 */
private [实体类] buildTestEntity() {
    [实体类] entity = new [实体类]();
    entity.setField1([值1]);
    entity.setField2([值2]);
    return entity;
}

private [DTO类] buildTestDTO() {
    [DTO类] dto = new [DTO类]();
    dto.setField1([值1]);
    dto.setField2([值2]);
    return dto;
}
```

**Step Gate B**：测试类框架、测试方法覆盖或测试数据构建器存在缺口 → 打回步骤3-6重做，不得交付单元测试代码。

### 步骤7：覆盖率与断言闭环

1. 行覆盖率必须达到 100%。
2. 分支覆盖率必须达到 100%。
3. 方法覆盖率必须达到 100%。
4. 对统一响应对象、Result、Response、AjaxResult 或类似结构，必须同时断言状态码/结果标识与核心业务数据。
5. 覆盖率不足时只能补充测试用例，不得删除已通过用例，不得为了测试通过而修改测试逻辑或业务逻辑。

**Step Gate C**：覆盖率任一维度未达 100%、断言只验证状态码、或存在为通过而放宽测试逻辑的情况 → 打回补测，不得交付。
