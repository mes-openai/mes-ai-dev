---
title: 阶段技能索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - skill-selection
cost_level: low
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/command-skill-artifact-map.md
---

# 阶段技能索引

> 本索引用于快速确认“当前阶段通常会用到哪些技能”。
> Skill 详细说明与具体执行约束应按目录化结构按需进入：先读 `SKILL.md`，再读 `INDEX.md`，再进入命中的 `modules/*.md`，不应把整组技能说明默认常驻。

## 读取规则
- 所有骨架 Skill 默认使用目录化结构：`.opencode/skills/<skill-name>/`。
- 每个 Skill 至少包含：`SKILL.md`、`INDEX.md`、`modules/`、`evals/`。
- `SKILL.md` 只承载元数据与核心指令；详细执行说明以下沉到 `modules/` 的正文为准。
- `evals/` 是 Skill 的正式组成部分，用于触发验证与能力回归。

## 一、初始化
- `mes-init-scan-backend`
- `mes-init-scan-frontend`
- `mes-init-index-database`
- `mes-init-extract-api`
- `mes-init-build-dependency-graph`
- `mes-init-build-code-map`
- `mes-init-extract-reference` — 提取术语、领域知识、错误码、API 规范，并解析业务仓外部契约源（SDK/common/shared/integration）
- `mes-init-scan-patterns` — 扫描真实实现模式、反模式与公共契约模式，区分推荐/遗留/反模式
- `mes-init-scan-flows`
- `mes-init-scan-hotspots`
- `mes-init-verify-knowledge` — 校验知识库完整性、空模板状态、契约来源类型与事实可追溯性

## 二、需求分析
- `mes-analyze-parse-requirement`
- `mes-analyze-impact-scope`
- `mes-analyze-identify-repos` — 识别确认仓/候选仓/待补证仓，并标出契约定义仓、能力提供仓、能力消费仓
- `mes-analyze-trace-flow` — 串联业务链/服务链/数据链，补 provider 选择点、API 复用判断与待补证断点
- `mes-analyze-generate-spec`
- `mes-analyze-review-spec`
- `mes-analyze-requirement-diff`

## 三、详细设计
- `mes-design-approach`
- `mes-design-api`
- `mes-design-database`
- `mes-design-frontend`
- `mes-design-service-chain`
- `mes-design-check-consistency`
- `mes-design-record-decisions`
- `mes-design-review-approach`
- `mes-design-generate-doc`

## 四、开发
- `mes-develop-plan-tasks`
- `mes-develop-backend-controller`
- `mes-develop-backend-service`
- `mes-develop-backend-dao`
- `mes-develop-backend-model`
- `mes-develop-backend-config`
- `mes-develop-database-script`
- `mes-develop-db-migration`
- `mes-develop-frontend-api`
- `mes-develop-frontend-component`
- `mes-develop-frontend-page`
- `mes-develop-self-review`
- `mes-develop-security-review`

## 五、测试
- `mes-test-plan-cases`
- `mes-test-generate-unit`
- `mes-test-generate-integration`
- `mes-test-performance-analysis`
- `mes-test-generate-report`

## 六、交付
- `mes-deliver-deploy-plan`
- `mes-deliver-acceptance-check`
- `mes-deliver-execute-deploy`
- `mes-deliver-release-note`
- `mes-deliver-handover`

## 七、骨架治理（跨阶段）
- `mes-skeleton-reset` — 骨架迁移清理，用于骨架迁移到新项目后从零开始初始化
- `mes-verify-state-migration` — 状态迁移校验
- `mes-verify-phase-gate` — 阶段门禁校验
- `mes-guard-context-budget` — 上下文预算守卫
- `mes-compact-stage-context` — 阶段上下文压缩（跨阶段交接）
- `mes-handle-emergency-fix` — 紧急修复（跨阶段）

> 骨架治理类 Skill 不属于特定研发阶段，用于骨架维护、状态管理、迁移校验等场景。
