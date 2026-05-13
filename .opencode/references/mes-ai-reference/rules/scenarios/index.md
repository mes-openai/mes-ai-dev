# Scenario Rules Index

> 本文件用于导航特殊场景规则。
> 场景规则仅在命中特定条件时加载，不默认常驻全文。

---

## 一、使用原则

- 先判断当前任务是否命中特殊场景。
- 未命中特殊场景时，不加载对应 Scenario 文档。
- 同时命中多个场景时，按风险优先级与依赖顺序分批加载。

---

## 二、场景入口

### 1. GSD 模式
- 适用：需要目标驱动、效率优先推进时。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-gsd.md`

### 2. 多仓协同
- 适用：同时涉及后端、前端、数据库或多个仓库。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-multi-repo.md`

### 3. 数据库迁移
- 适用：DDL 变更、数据迁移、回滚设计。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-db-migration.md`

### 4. 状态迁移
- 适用：`state.yaml` 主状态模型迁移、历史状态文件并轨。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-state-migration.md`

### 5. 高风险发布
- 适用：关键发布路径、高影响上线。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-high-risk-release.md`

### 6. 锁冲突
- 适用：锁占用、强制接管、并行冲突协调。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-lock-conflict.md`

### 7. 共享知识收口
- 适用：多 Agent 并行结果收口、共享知识统一写入。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-shared-knowledge-converge.md`

### 8. 跨阶段变更
- 适用：中途变更需求、阶段间返工、范围漂移。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-cross-stage-change.md`

### 9. 外部契约来源
- 适用：需要从外部来源确认契约、接口或文档版本时。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/scenario-external-contract-source.md`

### 10. 数据库跨库访问
- 适用：存在跨库查询、共享表访问或数据归属争议时。
- 入口：`.opencode/references/mes-ai-reference/rules/scenarios/database-cross-access-rule.md`

---

## 三、加载提醒

- 数据库迁移、状态迁移、高风险发布默认按高风险处理。
- 多仓协同场景通常需要结合对应 Phase 文档一起读取。
- 共享知识收口只在并行结果准备合并时加载。
