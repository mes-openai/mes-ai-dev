# 执行步骤（1/3）

## 执行步骤

### 1. 执行前输出计划（必须）
在执行任何操作前，先输出本次执行计划：
```
【执行计划】
目标：定位需求影响的服务、模块、数据表范围
步骤：
  1. 读取 raw-requirement.md 获取需求编号和要素
  2. 读取 baseline.md 获取仓规模标签（大仓/超大仓判定）
  3. [大仓/超大仓] 读取hot层：hot-services/hot-apis/hot-tables
  4. 读取第0层索引：backend-overview.md + frontend-overview.md（大仓/超大仓只读summary）
  5. 基于关键词匹配初步定位涉及的服务/模块
  6. 按需读取第1层索引：先读 `service-xxx/index.md` 做相关性确认，再读 `service-xxx/detail.md` 做深度影响分析
  7. 读取 service-dependencies.md 分析服务调用关系
  8. 读取 database-registry.md 识别涉及的数据表
  9. 生成影响范围报告
预期产出：影响范围报告（追加到 raw-requirement.md）
风险：关键词匹配可能遗漏，需人工确认
上下文预算控制：hot层约1K + 第0层约5K + 第1层按需约10K + 依赖图约3K ≈ 19K token
```

### 2. 读取需求解析结果
从文件交接路径读取：
```
mes-ai-dev/workspace/requirements/{REQ-ID}/raw-requirement.md
```

提取关键信息：
- 需求编号
- 核心功能点
- 业务场景关键词
- 用户角色
- 业务流程

**Step Gate A**：需求输入读取不完整或关键词提取不准确 → 打回步骤2重做，不得进入第0层索引加载。

### 3. 加载第0层索引（必须）
按需加载知识库，先读第0层总览：

#### 2.5 大仓模式前置检查（大仓/超大仓强制）

当 `mes-ai-dev/knowledge/state/state.yaml` 中的仓规模标签为 `large` 或 `mega` 时，**必须在读取第0层overview之前先读取hot层**；若统一状态源缺失，可兼容回退读取 `baseline.md`：

1. 优先读取 `mes-ai-dev/knowledge/state/state.yaml` 获取仓规模标签
2. 若标签为 `large` 或 `mega`：
   - 读取 `mes-ai-dev/knowledge/code-map/hot-services.md` — 高频服务排行
   - 读取 `mes-ai-dev/knowledge/code-map/hot-apis.md` — 高频API排行
   - 读取 `mes-ai-dev/knowledge/code-map/hot-tables.md` — 高频表排行
3. 基于hot层结果，在后续overview读取时可只读summary章节（跳过服务列表细节）
4. 将hot层信息用于后续定位优先级判断

#### 3.1 后端服务总览
读取文件：`mes-ai-dev/knowledge/code-map/backend-overview.md`

提取信息：
- 所有微服务列表
- 各服务的业务域划分
- 服务职责简介

#### 3.2 前端模块总览
读取文件：`mes-ai-dev/knowledge/code-map/frontend-overview.md`

提取信息：
- 所有前端模块列表
- 各模块对应的业务域
- 模块路由配置位置

- **业务参考知识（必须）**
  - 术语表：`mes-ai-dev/knowledge/reference/terminology-glossary.md` — 确认业务术语准确映射到技术组件
  - 领域模型：`mes-ai-dev/knowledge/reference/domain-model.md` — 识别需求涉及的领域实体边界
