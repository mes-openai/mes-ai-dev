# 执行步骤（1/2）

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何分析操作前，必须先向用户输出本次执行计划，包含：
- 分析目标：所有微服务的配置和依赖
- 预期产出：按服务命名的依赖片段
- 风险评估：配置文件较多，需系统性处理
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取服务列表
```
工具：Read
路径：mes-ai-dev/knowledge/state/state.yaml 或 `mes-ai-dev/knowledge/code-map/services/*/index.md`
目的：获取本次范围内需要分析的服务列表，避免依赖尚未收拢的共享总览
```

**Step Gate A**：服务列表读取不完整或范围判定错误 → 打回步骤2重做，不得进入 pom/config 解析。

### Step 3: 解析pom.xml依赖
对每个服务执行：
```
工具：Read
路径：jalor/<service>/pom.xml

提取信息：
1. 父工程依赖
2. 第三方库依赖（spring-boot, mybatis, redis等）
3. 内部服务依赖
4. 版本信息
```

### Step 4: 解析application.yml配置
```
工具：Read
路径：
- jalor/<service>/src/main/resources/application.yml
- jalor/<service>/src/main/resources/bootstrap.yml
- jalor/<service>/src/main/resources/application-*.yml（profile配置）

提取信息：
1. 服务配置
   - server.port
   - spring.application.name
   
2. 数据库配置
   - spring.datasource.url
   - spring.datasource.username
   - mybatis.configuration（MyBatis配置）
   
3. 缓存配置
   - spring.redis.host
   - spring.redis.port
   
4. 消息队列配置
   - spring.rabbitmq.host
   - spring.kafka.bootstrap-servers
   
5. 注册中心配置
   - eureka.client.service-url.defaultZone
   - spring.cloud.nacos.discovery.server-addr
   
6. 自定义配置
   - 识别项目特有的配置项
```

### Step 5: 解析服务调用配置
```
工具：Read
路径：jalor/<service>/src/main/resources/restService.properties

提取信息：
- 被调用的服务标识
- 服务调用URL模式
- 调用方式（同步/异步）

若文件不存在，标记为"无外部服务调用"
```

### Step 6: 检查其他配置文件
```
工具：Glob
路径：jalor/<service>/src/main/resources/
模式：*.properties, *.xml, *.json

检查：
- logback.xml（日志配置）
- mybatis-config.xml（MyBatis配置）
- 其他自定义配置
```

**Step Gate B**：pom、配置文件、服务调用配置解析存在缺口或脱敏不完整 → 打回步骤3-6重做，不得生成依赖关系图。
