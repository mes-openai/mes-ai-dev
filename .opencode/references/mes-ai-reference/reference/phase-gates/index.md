---
title: 阶段门禁标准索引
doc_type: index
load_strategy: index-only
phase_scope: []
trigger:
  - phase-gate
cost_level: medium
summary_first: false
default_allowed: true
parent_index: .opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/common.md
  - .opencode/references/mes-ai-reference/rules/governance/review-report-standard.md
---

# 阶段门禁标准索引

> 本索引可作为默认门禁导航入口读取；具体阶段门禁正文必须按当前阶段按需进入，非当前阶段分片默认不加载。
> 本目录用于替代原 `.opencode/references/mes-ai-reference/reference/phase-gates.md` 的重型单文件结构。
> 默认先读本索引，再按当前阶段读取对应分片；非当前阶段分片默认不加载。

---

## 一、门禁分层模型

所有阶段门禁统一采用三层：

- **must-pass**：硬阻断项，不满足不得进入、消费或退出
- **should-check**：重要检查项，未满足时必须记录风险、补偿动作与后补计划
- **advisory**：建议项，不阻断流程，但应纳入评审或复盘关注范围

---

## 二、标准结论口径

阶段门禁或步骤门禁结论统一使用：

- ✅通过
- ⚠️有条件通过
- ❌不通过
- ⚠️最小可交付，可继续推进但不可视为完整通过

若命中 GSD Continue Exit，则还应结合 `gsd-continue-exit.md` 判断是否允许降级推进。

---

## 三、默认加载顺序

1. 先读本索引，确认门禁模型与结论口径
2. 再读 `common.md`，获取通用评审、步骤级门禁与 mandatory-record 要求
3. 然后只读取当前阶段分片：
   - 初始化：`init.md`
   - 需求分析：`analyze.md`
   - 详细设计：`design.md`
   - 代码开发：`develop.md`
   - 测试验证：`test.md`
   - 发布交付：`deliver.md`
   - 知识刷新：`refresh.md`
   - 紧急修复：`emergency.md`
4. 命中 GSD 时，再按需读取 `gsd-continue-exit.md`

---

## 四、默认不加载原则

以下内容默认不应随当前阶段一起加载：

- 非当前阶段门禁分片
- 初始化收敛消费细则（除非当前任务直接依赖收敛状态判断）
- 与当前阶段无关的 DB/发布/紧急修复专项门禁
- 历史兼容入口正文

---

## 四点五、当前高频专项门禁提示

以下专项门禁虽然不在本索引中展开正文，但当前骨架已将其视为高频重点：

- **空模板不可消费**：见 `common.md` 与 `init.md`
- **契约结论可追溯**：见 `common.md` 与 `init.md`
- **仓级责任边界**：见 `analyze.md`
- **provider 三分法（技术可达 / 架构允许 / 最终选定）**：见 `analyze.md` 与 `design.md`
- **服务链冻结与禁止路径**：见 `design.md`
- **开发阶段不得重拍仓边界 / provider / 私有契约**：见 `develop.md`

若当前任务命中 SDK / common / shared / integration 等业务仓外契约定义源，还应额外参考：
- `.opencode/references/mes-ai-reference/reference/knowledge-consumption/contracts.md`
- `.opencode/references/mes-ai-reference/rules/scenarios/scenario-external-contract-source.md`

---

## 四点六、阶段级关键 must-pass 摘要

以下内容是当前骨架中新增且高频命中的关键 must-pass 摘要，具体正文以对应 gate 分片为准：

### 初始化（init）
- 契约级知识已区分确认 / 候选 / 未知
- 公共契约源已确认来源类型、来源定位、获取方式
- 无源契约不得生成全局统一规范
- 空模板状态已校验，且未被误消费

### 需求分析（analyze）
- 仓级责任边界已形成
- 已区分候选仓 / 确认仓 / 待补证仓
- 已区分技术可达 provider / 架构允许 provider / 最终选定 provider
- 已完成 API 复用 / 扩展 / 新增判断

### 详细设计（design）
- 服务链已冻结
- provider 选择理由已记录
- 禁止路径已记录
- 私有契约已显式引用并可追溯

### 代码开发（develop）
- `tasks.md` 未重定义仓边界与 provider 选择
- 本次实现已引用项目私有契约/范式
- 若偏离范式，理由和影响已记录

---

## 五、与通用规则的边界

### 本索引负责什么
- 定义门禁分层模型
- 给出标准结论口径
- 指明默认加载路径

### 本索引不负责什么
- 各阶段具体 enter / step / exit 条件
- GSD 继续退出的完整判断细则
- 审查报告正文结构与目录落盘细则

这些内容以下沉文件为准：

- 通用门禁要求：`.opencode/references/mes-ai-reference/reference/phase-gates/common.md`
- GSD 继续退出：`.opencode/references/mes-ai-reference/reference/phase-gates/gsd-continue-exit.md`
- 各阶段门禁：`.opencode/references/mes-ai-reference/reference/phase-gates/*.md`
- 审查报告结构：`.opencode/references/mes-ai-reference/rules/governance/review-report-standard.md`

---

## 六、兼容说明

原 `.opencode/references/mes-ai-reference/reference/phase-gates.md` 仍保留为兼容导航入口。
若当前任务需要最小门禁加载，应优先使用本目录结构，而不是再整份读取旧总表。

---

## 七、相关约束说明

- 阶段加载矩阵见：`.opencode/references/mes-ai-reference/reference/skeleton-loading-matrix.md`
- 预算基线见：`.opencode/references/mes-ai-reference/rules/context-budget-baseline.md`
- 规则主定义边界见：`.opencode/references/mes-ai-reference/reference/rule-authority-matrix.md`

说明：
- 本索引负责阶段门禁入口与导航，不负责定义预算阈值。
- 进入具体阶段后，应结合加载矩阵、预算基线与主定义边界做按需加载判断。
