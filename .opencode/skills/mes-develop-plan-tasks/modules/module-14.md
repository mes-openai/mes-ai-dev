# 约束规则

## 约束规则

### 执行前必须输出计划
每次执行前必须输出执行计划，经用户确认后才可继续。

### 读取现有代码风格
在规划任务时，必须先读取目标模块的现有代码结构：
- 后端服务：先读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/index.md` 做快速范围判断，必要时再读取 `mes-ai-dev/knowledge/code-map/services/service-xxx/detail.md` 理解依赖与实现结构
- 前端模块：先读取 `mes-ai-dev/knowledge/code-map/modules/module-xxx/index.md` 做快速范围判断，必要时再读取 `mes-ai-dev/knowledge/code-map/modules/module-xxx/detail.md` 理解依赖与模块结构

### 开发顺序约束
严格遵循：数据库 → Model → DAO → Service → Controller → Config → 前端API → 组件 → 页面

### 代码注释规范
所有代码必须使用中文注释。

### 命名一致性
任务命名、变量命名、方法命名必须与现有代码保持一致，不得引入新的命名风格。

### 不硬编码服务名
在任务描述中引用服务时，使用设计文档中的服务名，不硬编码具体值。

### 图谱辅助边界
可按需使用 GitNexus 类代码知识图谱缩小实现范围、确认最小改动集合、消费者与回归路径；不得因为图谱发现非目标问题而扩大任务范围。

### 关系导读边界
可按需使用 graphify 类能力生成任务关系导读；导读不得替代设计结论、任务拆解、TDD 计划或用户确认。

### 精准修改约束
任务规划必须明确哪些文件/模块在范围内、哪些不在范围内；不得安排无关格式化、无关重命名、无关重构或顺手优化任务。

### 并发锁检查
在规划开发任务前，必须检查 `mes-ai-dev/workspace/locks/` 目录：
1. 对每个涉及的服务检查是否存在锁文件
2. 若有锁 → 在任务计划中标注"等待解锁：XXX服务被REQ-YYY占用"
3. 提示用户选择：等待/强制获取/跳过该服务
4. 任务开始时创建锁文件，完成或取消后删除
