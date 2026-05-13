# 执行步骤（1/2）

## 执行步骤

### 1. 执行前输出计划（必须）
在执行任何操作前，先输出本次执行计划：
```
【执行计划】
目标：识别所有需要修改的仓库、Schema、配置项，评估风险
步骤：
  1. 读取 raw-requirement.md 获取影响范围
  2. 读取 business-flow-trace.md 获取调用链路
  3. 汇总前端仓库列表
  4. 汇总后端仓库列表
  5. 识别数据库Schema和表
  6. 识别配置项（application.yml、bootstrap.yml等）
  7. 评估修改风险等级
  8. 生成仓库影响清单
预期产出：仓库影响清单（追加到 raw-requirement.md）
风险：跨仓库修改可能存在协调难度
上下文预算控制：约5K token（基于已有分析结果）
```

### 2. 读取上游分析结果
从文件交接路径读取：

#### 2.1 需求解析和影响范围
```
mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md
```

提取信息：
- 需求编号
- 影响的后端服务列表
- 影响的前端模块列表
- 影响的数据库表

#### 2.2 业务流程追踪
```
mes-ai-dev/workspace/requirements/{REQ-ID}/business-flow-trace.md
```

提取信息：
- 前端代码位置汇总
- 后端代码位置汇总
- 数据库操作链路
- 跨服务调用关系

**Step Gate A**：上游分析结果读取不完整或仓库边界提取不准确 → 打回步骤2重做，不得进入仓库汇总。

### 3. 汇总前端仓库
基于业务流程追踪报告，汇总前端仓库信息：

#### 3.1 仓库识别
从代码位置提取仓库信息：
```
web/[module]/src/views/[Page].vue  → 前端仓库：web/[module]
web/[module]/src/api/[api].js       → 前端仓库：web/[module]
```

#### 3.2 仓库详情
对每个前端仓库记录：
- 仓库路径：`web/[module]`
- 仓库类型：前端仓库（Vue）
- 涉及文件：
  - 页面组件：`src/views/[Page].vue`
  - API定义：`src/api/[api].js`
  - 路由配置：`src/router/index.js`
  - 状态管理：`src/store/modules/[module].js`
- 修改类型：新增/修改
- 修改内容：[具体说明]

### 4. 汇总后端仓库
基于业务流程追踪报告，汇总后端仓库信息：

#### 4.1 仓库识别
从代码位置提取仓库信息：
```
jalor/[service]/.../controller/[Controller].java → 后端仓库：jalor/[service]
jalor/[service]/.../service/[Service].java       → 后端仓库：jalor/[service]
```

#### 4.2 仓库详情
对每个后端仓库记录：
- 仓库路径：`jalor/[service]`
- 仓库类型：后端微服务（Java/Jalor框架）
- 涉及文件：
  - Controller：`src/main/java/.../controller/[Controller].java`
  - Service接口：`src/main/java/.../service/[Service].java`
  - Service实现：`src/main/java/.../service/impl/[ServiceImpl].java`
  - DAO：`src/main/java/.../dao/[Dao].java`
  - Model：`src/main/java/.../model/[Entity/DTO/VO].java`
  - Mapper：`src/main/resources/mapper/[Mapper].xml`
- 修改类型：新增/修改
- 修改内容：[具体说明]
- 服务依赖：[依赖的其他服务]
