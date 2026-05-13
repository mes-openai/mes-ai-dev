# 执行步骤（1/2）

## 执行步骤

### 步骤1：分析待测试代码

1. 读取测试用例文档，确定需要测试的类和方法
2. 读取待测试的源代码文件
3. 识别类的依赖关系和注入方式
4. 分析方法的输入输出、状态码/结果标识、核心业务数据和边界条件
5. 识别必须 Mock 的依赖：外部 API 调用、DAO 数据操作层、国际化工具 `I18nUtils` / `I18nUtil`、唯一生成工具 `GuidUtil`、文件系统或其他不可控外部依赖

### 步骤2：分析现有测试风格

读取现有测试文件，分析：

```java
// 分析现有测试的组织结构
- 包命名规范：[如 com.xxx.service.test]
- 类命名规范：[如 XxxServiceTest]
- 注解使用：[默认 JUnit 5 @ExtendWith(MockitoExtension.class)、@Mock、@InjectMocks、@Nested]
- 断言风格：[默认 org.junit.jupiter.api.Assertions]
- Mock方式：[Mockito.when / doReturn / verify / ArgumentCaptor]
- 测试方法命名：[如 condition_expectedResult]
```

**Step Gate A**：待测代码分析或现有测试风格分析不完整 → 打回步骤1-2重做，不得进入测试类框架生成。

### 步骤3：生成测试类框架

```java
package [包名];

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
// 其他必要导入

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

/**
 * [类名] 单元测试
 * 
 * 测试范围：
 * - [方法1]：正常流程、边界条件、异常场景
 * - [方法2]：...
 */
@ExtendWith(MockitoExtension.class)
public class [类名]Test {

    @InjectMocks
    private [类名] target;

    @Mock
    private [依赖类1] dependency1;

    @Mock
    private [依赖类2] dependency2;

    @Nested
    @DisplayName("[方法1] 方法")
    class [方法1]Tests {
        // 每个被测 public 方法一个 @Nested 内部类
    }
}
```

### 步骤4：生成测试方法

按测试用例逐一生成测试方法。每个被测 public 方法必须对应一个 `@Nested` 内部类，类内覆盖正常、边界、异常、空值等场景：

```java
/**
 * 测试用例：TC-XXX
 * 测试场景：[场景描述]
 * 优先级：P1/P2/P3
 */
@Test
@DisplayName("[场景描述]")
void [条件]_[期望结果]() {
    // Given: 准备测试数据
    [参数类型] input = [测试数据];
    [返回类型] expected = [期望结果];
    
    when([mock对象].[方法](any())).thenReturn([返回值]);
    
    // When: 执行测试
    [返回类型] actual = target.[方法](input);
    
    // Then: 验证结果
    assertEquals(expected.getCode(), actual.getCode());
    assertEquals(expected.getData().getId(), actual.getData().getId());
    verify([mock对象], times(1)).[方法](any());
}
```

断言不得只验证状态码、success 标识或异常类型；必须同时验证核心业务数据、关键错误码/错误消息或被 mock 依赖的关键入参。
