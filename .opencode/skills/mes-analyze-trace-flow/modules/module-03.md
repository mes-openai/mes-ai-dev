# 执行步骤（1/2）

## 执行步骤

### 1. 执行前输出计划（必须）
在执行任何操作前，先输出本次执行计划：
```
【执行计划】
目标：追踪从前端页面到数据库的完整调用链路
步骤：
  1. 读取 raw-requirement.md 获取影响范围和服务信息
  2. 读取 frontend-backend-map.md 了解前后端映射
  3. 读取 service-dependencies.md 分析服务调用链
  4. 读取 api-registry.md 获取API详细信息
  5. 按需读取第2层代码（仅读取涉及的文件）
  6. 绘制完整调用链路图
  7. 使用追踪报告模板生成业务流程追踪报告
预期产出：业务流程追踪报告
风险：调用链复杂可能遗漏分支流程
上下文预算控制：知识库约5K + 代码文件约20-40K ≈ 25-45K token
```

### 2. 读取影响范围分析结果
从文件交接路径读取：
```
mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md
```

提取关键信息：
- 需求编号
- 影响的后端服务列表
- 影响的前端模块列表
- 影响的数据库表
- 业务流程描述

**Step Gate A**：影响范围输入读取不完整或业务流程信息不足 → 打回步骤2重做，不得进入映射与依赖分析。

### 3. 分析前后端映射关系
读取文件：`mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md`

提取信息：
- 前端模块调用的后端服务
- 前端 API 路径与后端 Controller 映射
- API 请求方法（GET/POST/PUT/DELETE）
- 请求参数和响应格式

### 4. 分析服务调用链
读取文件：`mes-ai-dev/knowledge/dependency-graph/service-dependencies.md`

分析内容：
- 服务 A 调用服务 B 的哪些接口
- 同步调用还是异步调用（MQ）
- 调用依赖方向
- 循环依赖检查

### 5. 获取 API 详细信息
读取文件：`mes-ai-dev/knowledge/dependency-graph/api-registry.md`

提取信息：
- API 路径、方法、参数
- 所属 Controller 类
- 对应的 Service 方法
- 数据库操作类型

**Step Gate B**：前后端映射、服务依赖或 API 信息存在缺口 → 打回步骤3-5重做，不得进入第2层代码读取。

### 6. 按需读取第 2 层代码
**重要：只读取涉及的代码文件，不批量读取**

#### 6.1 前端代码读取
根据影响的前端模块，读取关键文件：
- 页面组件：`web/[module]/src/views/[Page].vue`
- API 定义：`web/[module]/src/api/[api].js`
- 路由配置：`web/[module]/src/router/index.js`
- 状态管理：`web/[module]/src/store/modules/[module].js`

读取目标：
- 确认 API 调用路径
- 确认请求参数构造
- 确认响应数据处理逻辑
- 确认用户交互流程

#### 6.2 后端代码读取
根据影响的后端服务，读取关键文件：
- Controller：`jalor/[service]/src/main/java/.../controller/[Controller].java`
- Service接口：`jalor/[service]/src/main/java/.../service/[Service].java`
- Service实现：`jalor/[service]/src/main/java/.../service/impl/[ServiceImpl].java`
- DAO/Mapper：`jalor/[service]/src/main/java/.../dao/[Dao].java`
- Entity/DTO：`jalor/[service]/src/main/java/.../model/[Entity].java`

读取目标：
- 确认 API 入口逻辑
- 确认业务处理流程
- 确认数据库操作
- 确认异常处理逻辑
