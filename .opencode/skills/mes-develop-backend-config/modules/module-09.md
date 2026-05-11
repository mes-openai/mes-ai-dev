# 变更文件列表

## 变更文件列表

### 1. application.yml
**变更位置**：`jalor/service-xxx/src/main/resources/application.yml`

**变更内容**：
```yaml
# 新增：数据库连接配置
spring:
  datasource:
    xxx-datasource:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/schema_name
      username: ${DB_USER:root}
      password: ${DB_PASSWORD:password}
```

**变更说明**：新增XXX数据库连接配置，使用环境变量引用

---

### 2. restService.properties
**变更位置**：`jalor/service-xxx/src/main/resources/restService.properties`

**变更内容**：
```properties
# 新增：服务注册配置
other-service.name=other-service
other-service.url=http://${OTHER_SERVICE_HOST:localhost}:${OTHER_SERVICE_PORT:8080}
```

**变更说明**：新增调用other-service的注册配置

---
