# 执行步骤（2/2）

#### 5.3 缓存配置变更
如需配置Redis缓存：

```yaml
# application.yml 变更示例
spring:
  redis:
    host: ${REDIS_HOST:localhost}
    port: ${REDIS_PORT:6379}
    password: ${REDIS_PASSWORD:}
    database: 0
    timeout: 3000
    lettuce:
      pool:
        max-active: 20
        max-idle: 10
        min-idle: 5
        max-wait: 3000

# 缓存配置（如需要）
cache:
  xxx-cache:
    ttl: 3600
    max-size: 1000
```

#### 5.4 日志配置变更
如需调整日志配置：

```yaml
# application.yml 变更示例
logging:
  level:
    root: INFO
    com.jalor.xxx: DEBUG
    com.jalor.xxx.mapper: DEBUG
  file:
    name: logs/service-xxx.log
    max-size: 100MB
    max-history: 30
  pattern:
    file: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n"
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n"
```

#### 5.5 线程池配置变更
如需配置异步线程池：

```yaml
# application.yml 变更示例
spring:
  task:
    execution:
      pool:
        core-size: 5
        max-size: 20
        queue-capacity: 100
        keep-alive: 60s
        thread-name-prefix: xxx-async-
      shutdown:
        await-termination: true
        await-termination-period: 60s
```

### 6. 创建配置变更清单
创建文件：`mes-ai-dev/workspace/development/{REQ-ID}/backend/config-change-list.md`

**配置变更清单格式**：
```markdown
# 后端配置变更清单
