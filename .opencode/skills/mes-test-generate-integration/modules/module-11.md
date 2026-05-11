# 性能测试场景

## 性能测试场景

### 场景：[接口名称]性能测试

**测试目标**：验证接口响应时间满足要求

**测试参数**：
- 并发用户数：[数量]
- 持续时间：[时间]
- 预期响应时间：<[毫秒数]ms
- 预期TPS：>[数量]

**监控指标**：
- 响应时间（P50/P90/P99）
- 错误率
- CPU使用率
- 内存使用率
- 数据库连接数

**通过标准**：
- [ ] P99响应时间 < 预期值
- [ ] 错误率 < 1%
- [ ] 无内存泄漏
- [ ] 系统资源使用正常
```

**Step Gate B**：集成/一致性/异常/性能测试场景存在缺口 → 打回步骤2-5重做，不得生成集成测试代码框架或交付文档。

### 步骤6：生成集成测试代码框架

```java
/**
 * [功能名称]集成测试
 * 
 * 测试范围：
 * - 服务间调用正确性
 * - 数据一致性
 * - 异常处理
 */
@SpringBootTest
@RunWith(SpringRunner.class)
public class [功能名称]IntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private [Service] service;

    @MockBean
    private [外部服务] externalService;

    @Before
    public void setup() {
        // 初始化测试数据
    }

    @Test
    public void testNormalFlow() {
        // 测试正常流程
    }

    @Test
    public void testServiceFailure() {
        // 测试服务失败场景
    }

    @After
    public void cleanup() {
        // 清理测试数据
    }
}
```

**Step Gate C**：`integration-tests.md` 或测试代码框架缺少关键场景、验证点或数据准备说明 → 打回步骤6重做，不得交付测试执行阶段。
