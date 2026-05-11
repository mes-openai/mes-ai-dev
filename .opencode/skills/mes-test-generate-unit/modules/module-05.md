# 执行步骤（1/2）

## 执行步骤

### 步骤1：分析待测试代码

1. 读取测试用例文档，确定需要测试的类和方法
2. 读取待测试的源代码文件
3. 识别类的依赖关系和注入方式
4. 分析方法的输入输出和边界条件

### 步骤2：分析现有测试风格

读取现有测试文件，分析：

```java
// 分析现有测试的组织结构
- 包命名规范：[如 com.xxx.service.test]
- 类命名规范：[如 XxxServiceTest]
- 注解使用：[如 @RunWith, @MockBean, @InjectMocks]
- 断言风格：[如 Assert.assertEquals, assertThat]
- Mock方式：[如 Mockito.when, @Mock]
- 测试方法命名：[如 methodName_condition_expectedResult]
```

**Step Gate A**：待测代码分析或现有测试风格分析不完整 → 打回步骤1-2重做，不得进入测试类框架生成。

### 步骤3：生成测试类框架

```java
package [包名];

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
// 其他必要导入

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 * [类名] 单元测试
 * 
 * 测试范围：
 * - [方法1]：正常流程、边界条件、异常场景
 * - [方法2]：...
 */
@RunWith(MockitoJUnitRunner.class)
public class [类名]Test {

    @InjectMocks
    private [类名] target;

    @Mock
    private [依赖类1] dependency1;

    @Mock
    private [依赖类2] dependency2;

    // 测试方法...
}
```

### 步骤4：生成测试方法

按测试用例逐一生成测试方法：

```java
/**
 * 测试用例：TC-XXX
 * 测试场景：[场景描述]
 * 优先级：P1/P2/P3
 */
@Test
public void [方法名]_[条件]_[期望结果]() {
    // Given: 准备测试数据
    [参数类型] input = [测试数据];
    [返回类型] expected = [期望结果];
    
    when([mock对象].[方法](any())).thenReturn([返回值]);
    
    // When: 执行测试
    [返回类型] actual = target.[方法](input);
    
    // Then: 验证结果
    assertEquals(expected, actual);
    verify([mock对象], times(1)).[方法](any());
}
```
