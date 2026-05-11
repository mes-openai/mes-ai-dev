# 测试环境配置

## 测试环境配置

### 测试配置文件

```yaml
# application-integration-test.yml
spring:
  datasource:
    url: jdbc:mysql://test-db:3306/test_db
    username: test
    password: test
  jpa:
    show-sql: true

# Mock外部服务配置
external:
  service:
    mock-enabled: true
```

### 测试数据管理

```java
/**
 * 测试数据初始化
 */
@Component
public class TestDataInitializer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void initTestData() {
        // 初始化基础数据
        jdbcTemplate.execute("INSERT INTO ...");
    }

    public void cleanupTestData() {
        // 清理测试数据
        jdbcTemplate.execute("DELETE FROM ... WHERE test_flag = 1");
    }
}
```
