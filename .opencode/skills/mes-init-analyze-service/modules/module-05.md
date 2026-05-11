# 执行步骤（1/2）

## 执行步骤

### Step 1: 输出本次执行计划
在执行任何分析操作前，必须先向用户输出本次执行计划，包含：
- 分析目标：待分析的服务列表
- 预期产出：每个服务对应一个目录，包含 index/detail/file-summaries 与服务级局部片段
- 风险评估：大规模代码分析可能耗时
初始化阶段无需等待用户确认，计划输出后自动继续。

### Step 2: 读取服务总览
```
工具：Read
路径：mes-ai-dev/knowledge/state/state.yaml 或 `mes-ai-dev/knowledge/code-map/services/*/index.md`
目的：优先基于 fragments-first/局部索引模型获取需要分析的服务列表；已收拢场景可回退到 backend-overview.md
```

**Step Gate A**：服务总览读取不完整或服务列表识别错误 → 打回步骤2重做，不得进入服务包结构扫描。

### Step 3: 扫描服务包结构
对每个服务执行：
```
工具：Glob
路径：jalor/<service>/src/main/java/
模式：**/*
目的：识别包层级结构

解析规则：
- controller包 → Controller层
- service包 → Service层（含impl子包）
- dao/mapper包 → DAO层
- model/entity包 → 实体层
- dto/vo包 → 数据传输对象层
- config包 → 配置层
- util包 → 工具类
```

### Step 4: 统计各层代码文件
```
工具：Glob + 计数
对每个识别的层：
- 统计Java文件数量
- 识别关键类名模式
```

### Step 5: 读取配置文件
```
工具：Read
路径：
- jalor/<service>/src/main/resources/application.yml
- jalor/<service>/src/main/resources/bootstrap.yml
- jalor/<service>/src/main/resources/application-*.yml

提取信息：
- server.port（服务端口）
- spring.application.name（应用名称）
- 数据库配置（datasource）
- 中间件配置（redis、mq等）
- 自定义配置项
```

### Step 6: 读取服务调用配置
```
工具：Read
路径：jalor/<service>/src/main/resources/restService.properties
目的：识别该服务调用的其他服务
```
