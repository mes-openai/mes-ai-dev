---
title: GSD 执行模式规则
doc_type: rule
load_strategy: scenario
phase_scope: []
trigger:
  - gsd
cost_level: low
summary_first: false
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/gsd-continue-exit.md
---

# GSD 执行模式规则（scenario-gsd）

## 一、目的
定义 GSD 模式的适用条件、blocker 分类、最小可交付要求与 GSD DoD，防止用“可继续”伪装“已完成”。

## 二、禁止进入 GSD 的场景
- 数据库结构破坏性变更
- `state.yaml` 主状态模型变更
- `/mes-init-converge` 或共享收口规则变更
- 高风险安全变更
- 关键发布路径
- 骨架主规则新增、删除或重构
- 用户明确要求严格按阶段执行

## 三、进入前检查
至少确认：
1. 当前目标明确
2. 范围局部可控
3. 可形成最小可交付结果
4. blocker 可分类
5. 风险可解释、可暴露、可治理

## 四、blocker 分类
- 硬阻塞：必须停
- 软阻塞：可代偿推进，但必须记录风险与后补动作
- 外部依赖阻塞：能代偿则继续，不能代偿则按硬阻塞处理

## 五、最小可交付标准
至少包含：
- 当前目标
- 当前边界
- 核心结果
- blocker 状态
- 风险说明
- 后补动作
- 下一步建议

## 六、DoD
- 完整完成
- GSD 完成
- 不完成

## 七、仍然强制的事项
- 关键门禁
- blocker 分类
- 风险说明
- 审查记录
- Completion Sweep
- handoff 与 memory 更新

## 八、统一引用写法
“当前工作采用 GSD 模式时，目标驱动、blocker 分类、最小可交付、GSD DoD 与退出判断，必须符合 `knowledge/rules/scenarios/scenario-gsd.md`。”
