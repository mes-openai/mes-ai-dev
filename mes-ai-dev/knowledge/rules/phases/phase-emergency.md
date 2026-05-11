---
title: 紧急修复阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - emergency
trigger:
  - emergency
  - hotfix
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/emergency.md
  - knowledge/reference/knowledge-consumption/stage-memory.md
---

# 紧急修复阶段规则（phase-emergency）

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/safety-redlines.md`
- `knowledge/rules/core/completion-baseline.md`
- `knowledge/rules/phases/phase-emergency.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`（按需）
- `knowledge/reference/phase-gates/emergency.md`（按需）
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`

### 按需加载
- `knowledge/rules/scenarios/scenario-db-migration.md`
- `knowledge/rules/scenarios/scenario-high-risk-release.md`
- `knowledge/rules/scenarios/scenario-gsd.md`

### 默认不加载
- 初始化收口细则全文
- 非当前阶段门禁分片
- 与当前故障范围无关的全局消费分片
- 模板正文与低频重型治理全文

### 预算提示
- 紧急修复优先最小加载与最小修复；仅在确实需要全局判断时再扩大消费范围

## 一、阶段目标
在明确故障影响与风险边界的前提下，快速定位、修复、验证并形成可追溯的紧急修复记录与回流动作。

## 一点五、进入条件
- 存在需要立即处理的生产问题或等价高优先级故障
- 已具备最小故障描述、影响范围或现场症状输入
- 已完成最小阶段计划并通过进入门禁

## 二、必读入口
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/emergency.md`（按需）
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/stage-memory.md`

## 三、标准步骤
1. 确认故障目标与影响范围
2. 识别最小修复路径
3. 执行最小修复与最小验证
4. 记录临时措施、风险与回流动作
5. 阶段收尾

## 三点五、基本要求
- 先定位关键阻断与影响范围
- 修复优先最小改动
- 修复后必须做最小必要验证
- 必须记录临时措施、剩余风险与后续补文档动作

## 三点六、热修回流主链要求

紧急修复不是主治理链的替代路径。完成热修后，必须明确回流到 analyze / design / develop / test / refresh 的适用产物或后补动作。

至少应判断：
- 是否需要补需求/范围收敛
- 是否需要补设计偏差或服务链修正
- 是否需要补开发阶段正式自审与安全审查
- 是否需要补测试追溯与回归说明
- 是否需要补知识刷新或规则补录

## 三点七、临时措施正式化要求

若本次热修采用了临时措施、降级逻辑、人工兜底或短期绕过方案，必须明确：
- 临时措施内容
- 适用范围
- 撤销条件或正式化条件
- 责任人与后补期限

## 四、最小产物要求
- 应形成事件报告、修复结论、最小验证结果与 postmortem
- 应具备临时措施说明、剩余风险说明与回流动作清单
- 若本次热修影响知识基线，应补 `refresh-hints.md` 或等价说明

## 五、硬约束
- 不得以紧急修复之名跳过最小验证
- 不得只修代码而不记录临时措施与剩余风险
- 不得将热修结果直接视为主治理链已完成闭环
- 不得遗漏回流 analyze/design/develop/test/refresh 的判断

## 六、退出条件
- 故障影响范围与修复结果已明确
- 最小必要验证已完成
- 事件报告、postmortem、风险与回流动作已落盘
- 已完成收尾扫描

## 七、条件加载
- DB 迁移：`scenario-db-migration.md`
- 高风险发布：`scenario-high-risk-release.md`
- GSD：`scenario-gsd.md`

## 八、统一引用写法
“紧急修复阶段的定位、最小修复、验证、风险暴露与回流要求，必须符合 `knowledge/rules/phases/phase-emergency.md`。”
