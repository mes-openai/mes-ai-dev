---
title: 发布交付阶段规则详版
doc_type: rule
load_strategy: explicit-only
phase_scope:
  - deliver
trigger:
  - deliver
  - release
  - deliver-detail
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/rules/phases/phase-deliver.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/deliver.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/state.md
---

# 发布交付阶段规则详版（phase-deliver-detail）

> 本文件承载交付阶段的详细执行步骤、交付结论判断与技能入口。
> 日常阶段路由优先读取 `phase-deliver.md` 最小包；仅在需要详细交付流程时进入本文件。

## 一、标准步骤

1. 确认交付目标与发布对象
2. 消费测试结论与关键输入
3. 形成交付判断
4. 形成部署与验收材料
5. 明确运行期关注点
6. 阶段收尾

## 二、详细执行要求

### 2.1 确认交付目标与发布对象
- 明确当前要交付的是哪个版本、哪个服务、哪个变更集合
- 明确本轮交付范围、排除范围与依赖对象
- 若存在 DB 迁移、高风险发布或多仓联动，应先识别并补齐场景规则

### 2.2 消费测试结论与关键输入
- 优先消费测试结论、关键产物、风险状态与 blocker 状态
- 判断当前输入是否足以支持“可发布 / 有条件可发布 / 不可发布”
- 若输入不完整，不得强行给出正向发布结论

### 2.3 形成交付判断
- 基于测试、风险、依赖、回滚边界与观察指标形成发布判断
- 明确当前交付结论适用于全量发布、局部发布还是仅适用于继续评估
- 对限制条件与未闭合问题保持显式记录

### 2.4 形成部署与验收材料
- 形成部署步骤、回滚边界、验收口径与必要的 release/handover 产物
- 对数据库变更、环境前置条件、发布窗口与依赖顺序给出清晰说明
- 不得只输出 release note 而遗漏验收、部署或交接材料

### 2.5 明确运行期关注点
- 说明发布后的观察指标、风险点、告警关注点与兜底动作
- 若存在高风险点，应显式标注观察窗口与回退触发条件
- 为运维、值班或后续交接提供足够的运行期提示

### 2.6 阶段收尾
- 补齐阶段产物、证据、验收与交接材料
- 确认可恢复的交接状态已建立
- 完成收尾扫描与必要 memory 更新

## 三、推荐技能入口

- `mes-deliver-deploy-plan`
- `mes-deliver-acceptance-check`
- `mes-deliver-execute-deploy`
- `mes-deliver-release-note`
- `mes-deliver-handover`

## 四、适用时机

以下场景建议进入本详版：

- 需要详细交付步骤、发布判断与运行期关注点
- 需要细化部署、验收、回滚与交接材料
- 需要从阶段规则直接进入交付类 skill

以下场景通常不必进入本详版：

- 只需完成交付阶段路由与最小加载判断
- 只需确认进入条件、退出条件与默认加载卡
