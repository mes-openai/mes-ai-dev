# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：开发/修改后端配置文件
步骤：
  1. 读取设计文档和现有配置
  2. 定位目标服务和配置文件
  3. 分析现有配置结构
  4. 开发配置变更
  5. 验证配置正确性
预期产出：配置文件变更清单
风险：配置错误导致服务无法启动
```

### 2. 读取设计文档和现有配置
按顺序读取：
1. `mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/design.md` - OpenSpec 详细设计主文档（配置相关部分）
2. `mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md` - 服务配置信息

### 3. 定位配置文件路径
读取目标服务的配置文件：
- `jalor/service-xxx/src/main/resources/application.yml` - 主配置
- `jalor/service-xxx/src/main/resources/bootstrap.yml` - 启动配置（如存在）
- `jalor/service-xxx/src/main/resources/application-xxx.yml` - 环境配置（如存在）
- `jalor/service-xxx/src/main/resources/restService.properties` - 服务注册配置

**Step Gate A**：设计输入或配置文件路径识别不完整 → 打回步骤2-3重做，不得进入现有配置结构分析。

### 4. 分析现有配置结构
分析现有配置文件的结构和风格：
- **配置层级**：配置项的组织方式
- **命名规范**：配置项的命名风格
- **引用方式**：外部引用的处理方式
- **环境区分**：多环境配置的处理方式

### 5. 开发配置变更
根据设计文档，确定需要变更的配置：

#### 5.1 数据库配置变更
如需新增数据库连接或修改现有配置：

```yaml
# application.yml 变更示例
spring:
  datasource:
    # 新增数据库连接
    xxx-datasource:
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://${DB_HOST:localhost}:${DB_PORT:3306}/schema_name?useUnicode=true&characterEncoding=utf8&useSSL=false
      username: ${DB_USER:root}
      password: ${DB_PASSWORD:password}
      hikari:
        minimum-idle: 5
        maximum-pool-size: 20
        idle-timeout: 30000
        pool-name: XxxHikariPool
        max-lifetime: 1800000
        connection-timeout: 30000

# 数据源配置类（如需要多数据源）
```

#### 5.2 服务注册配置变更
如需调用新的微服务，修改 `restService.properties`：

```properties
# restService.properties 变更示例
# 新增服务注册
other-service.name=other-service
other-service.url=http://${OTHER_SERVICE_HOST:localhost}:${OTHER_SERVICE_PORT:8080}
other-service.timeout=30000
other-service.retryCount=3
```
