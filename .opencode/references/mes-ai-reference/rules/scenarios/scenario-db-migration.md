---
title: 数据库迁移场景规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - db-migration
  - ddl
  - rollback
cost_level: low
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/common.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/rules.md
---

# 数据库迁移场景规则（scenario-db-migration）

## 一、触发条件
命中以下任一情形时视为数据库迁移场景：
- 变更表、字段、索引、约束、视图、存储对象
- 涉及 DDL / DML / 数据迁移 / 数据修复
- 代码改动依赖数据库结构变化才能成立
- 发布、回滚、兼容策略与数据库状态绑定

## 二、基本原则
- 数据库变更默认高于普通代码变更
- 先明确影响，再写脚本
- DDL、DML、状态迁移必须区分治理
- 回滚必须真实可执行
- 迁移必须与应用兼容策略联动

## 三、阶段附加要求
- 分析阶段：识别 schema / 表 / 字段 / 链路 / 风险等级
- 设计阶段：补充兼容策略、回填、回滚、发布顺序、测试点
- 开发阶段：补脚本、兼容处理、幂等/补偿逻辑
- 测试阶段：验结构、验数据、验回滚、验性能
- 交付阶段：补迁移窗口、执行顺序、回滚步骤、观察指标

## 四、风险分级
- 低风险：辅助索引、可空新增字段等
- 中风险：业务字段新增、数据回填、索引调整
- 高风险：删表删字段、字段语义变化、大规模迁移、不可逆回滚

## 五、硬约束
- 不得只改代码不说明数据库对象影响
- 不得只写 DDL 不说明数据与兼容影响
- 不得声称“可回滚”却不说明回滚边界
- 不得跳过迁移后验证与数据状态验证

## 六、统一引用写法
“涉及数据库结构、数据迁移、兼容策略、发布顺序与回滚边界时，必须符合 `.opencode/references/mes-ai-reference/rules/scenarios/scenario-db-migration.md`。”
