# REQ 目录分类管理示例

> 本示例用于演示在不改变 `REQ-YYYYMMDD-XXX` 主目录结构的前提下，如何在阶段目录内组织 `deliverable / report / evidence / handoff / memory / working` 六类内容。

---

## 一、示例目录结构

```text
mes-ai-dev/workspace/designs/REQ-20260416-001/
  deliverable/
    design.md
    api-design.md
    database-design.md
  report/
    stage-output-report.md
    design-review-report.md
    step-gate-review-01.md
  evidence/
    dependency-trace.md
    api-consistency-check.md
  handoff/
    next-stage-handoff.md
    next-stage-handoff.md
  memory/
    pitfall-ledger.md
    decision-log.md
    blocker-log.md
    pattern-notes.md
  working/
    draft-options.md
    temporary-notes.md
```

---

## 二、每个目录放什么

### 1. `deliverable/`

放本阶段正式交付物，例如：

- `design.md`
- `api-design.md`
- `database-design.md`

判断标准：

> 这些文件应该可以直接被下一阶段消费，不需要再解释“这是草稿还是正式版”。

### 2. `report/`

放治理与审查类报告，例如：

- `stage-output-report.md`
- `design-review-report.md`
- `step-gate-review-01.md`

判断标准：

> 这些文件回答的是“本阶段是否达标”“哪些产物已生成”“能不能进入下一阶段”。

### 3. `evidence/`

放证据链与验证材料，例如：

- `dependency-trace.md`
- `api-consistency-check.md`
- 其他截图、验证结果、链路追踪记录

判断标准：

> 这些文件用来支撑审查结论，不应只在报告中口头提到而没有落盘证据。

### 4. `handoff/`

放阶段交接与恢复入口，例如：

- 当前阶段 OpenSpec 主交接文档
- `next-stage-handoff.md`

判断标准：

> 这些文件回答“下一阶段接手时必须知道什么”。

### 5. `memory/`

放阶段经验沉淀，例如：

- `pitfall-ledger.md`
- `decision-log.md`
- `blocker-log.md`
- `pattern-notes.md`

判断标准：

> 这些文件回答“本阶段踩过什么坑、做过哪些决策、还有哪些 blocker、哪些模式可复用”。

### 6. `working/`

放草稿与中间工作文件，例如：

- `draft-options.md`
- `temporary-notes.md`

判断标准：

> 这些文件是过程性材料，可以保留，但不能冒充正式产物。

---

## 三、最小闭环示例

如果只做一个最小闭环，至少建议有：

```text
REQ-20260416-001/
  deliverable/
    design.md
  report/
    stage-output-report.md
    design-review-report.md
  handoff/
    next-stage-handoff.md
  memory/
    pitfall-ledger.md
    decision-log.md
    blocker-log.md
```

这已经能形成：

- 正式产物闭环
- 审查闭环
- 交接闭环
- 阶段经验闭环

---

## 四、常见错误示例

### 错误 1：所有文件平铺在 REQ 根目录

问题：

- 看不出哪些是正式产物，哪些是报告，哪些是证据，哪些是草稿

### 错误 2：只有 deliverable，没有 handoff 和 memory

问题：

- 下一阶段接手时容易断层
- 历史坑点无法持续复用

### 错误 3：把草稿放进 deliverable

问题：

- 下游阶段会误把未定稿内容当正式输入

### 错误 4：报告里提到证据，但 evidence 目录没有文件

问题：

- 审查结论无法真正回溯

---

## 五、和模板的对应关系

建议优先参考：

- `mes-ai-dev/templates/governance/stage-output-report-template.md`
- `mes-ai-dev/templates/governance/detailed-review-report-template.md`
- `mes-ai-dev/templates/governance/stage-memory-template.md`
- `mes-ai-dev/templates/governance/pitfall-ledger-template.md`
- `mes-ai-dev/templates/governance/decision-log-template.md`
- `mes-ai-dev/templates/governance/blocker-log-template.md`

---

## 六、一句话说明

> `REQ` 目录分类管理的目标不是增加层级，而是让正式产物、治理报告、证据、交接和阶段记忆各归其位，降低阶段切换和后续复盘成本。
