---
title: 知识刷新阶段规则
doc_type: rule
load_strategy: phase
phase_scope:
  - refresh
trigger:
  - refresh
cost_level: medium
summary_first: false
default_allowed: true
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/reference/phase-gates/refresh.md
  - knowledge/reference/knowledge-consumption/code-map.md
---

# 知识刷新阶段规则（phase-refresh）

## 默认加载卡

### 必载
- `knowledge/rules/core/runtime-entry.md`
- `knowledge/rules/core/agent-core.md`
- `knowledge/rules/core/execution-baseline.md`
- `knowledge/rules/phases/phase-refresh.md`
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`（按需）
- `knowledge/reference/phase-gates/refresh.md`（按需）
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/code-map.md`
- `knowledge/reference/knowledge-consumption/dependency-graph.md`

### 按需加载
- `knowledge/rules/scenarios/scenario-shared-knowledge-converge.md`
- `knowledge/rules/scenarios/scenario-lock-conflict.md`
- `knowledge/rules/scenarios/scenario-gsd.md`
- `knowledge/reference/change-handoff-matrix.md`

### 默认不加载
- deliver/test 全阶段正文
- 非当前范围的 reference 与 database-index 深化正文
- 旧消费矩阵总表全文
- 模板正文与低频重型治理全文

### 预算提示
- 刷新阶段优先走增量消费；除非需要阶段裁决，不默认整份读取旧门禁/消费矩阵总表

## 一、阶段目标
识别代码与知识之间的差异，更新局部知识结果，并在需要时通过主控统一收口共享知识文件。

## 一点五、进入条件
- 当前存在明确的代码、配置、数据库、契约或交付事实变化
- 已具备最小变更输入（如 diff、变更清单、`refresh-hints.md` 或等价证据）
- 已完成阶段计划并通过进入门禁

## 二、必读入口
- `knowledge/reference/phase-gates/index.md`
- `knowledge/reference/phase-gates/common.md`
- `knowledge/reference/phase-gates/refresh.md`（按需）
- `knowledge/reference/knowledge-consumption/index.md`
- `knowledge/reference/knowledge-consumption/state.md`
- `knowledge/reference/knowledge-consumption/code-map.md`
- `knowledge/reference/knowledge-consumption/dependency-graph.md`
- `knowledge/reference/change-handoff-matrix.md`（按需）

## 三、标准步骤
1. 检测变化范围
2. 生成局部更新结果
3. 校验变化与证据
4. 触发共享收口（如需要）
5. 记录刷新结论与新鲜度状态

## 三点五、开发/交付回写消费要求

当 develop / deliver 阶段已产出 `refresh-hints.md` 或等价刷新提示时，refresh 阶段应优先将其作为增量刷新边界输入，而不是重新无边界推断全部受影响范围。

若开发/交付阶段已明确声明某些知识不受影响，refresh 阶段也应检查该判断依据是否成立。

## 四点五、最小产物要求
- 应形成与当前刷新目标匹配的变更检测结果或局部知识更新结果
- 应具备受影响知识文件清单、未更新原因与消费边界说明
- 若刷新将影响全局共享知识，应明确是否需要后续执行 `/mes-init-converge`

## 五、硬约束
- 不得在未识别变更范围时直接覆盖共享知识文件
- 不得在缺少证据时将“知识不受影响”写成确定事实
- 不得绕过 `refresh-hints.md` 或等价输入，重新无边界推断所有影响范围
- 不得在未说明未更新原因时直接结束刷新阶段

## 六、退出条件
- 变更范围已明确
- 受影响知识文件已更新或已明确记录未更新原因
- 刷新结论、消费边界与后续动作已落盘
- 已完成收尾扫描

## 七、条件加载
- 涉及共享知识收口：`scenario-shared-knowledge-converge.md`
- 涉及锁冲突：`scenario-lock-conflict.md`
- 采用 GSD：`scenario-gsd.md`

## 八、统一引用写法
“知识刷新阶段的目标边界、局部更新、共享收口与退出判断，必须符合 `knowledge/rules/phases/phase-refresh.md`。”
