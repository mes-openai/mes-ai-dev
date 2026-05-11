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
@Test(expected = [异常类].class)
public void methodName_invalidInput_throwException() { ... }

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
