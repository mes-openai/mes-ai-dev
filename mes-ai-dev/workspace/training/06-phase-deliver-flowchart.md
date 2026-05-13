# 阶段六：发布交付 —— 流程图与关键活动说明

> 本文档用于培训，详细说明 MES-AI-DEV 骨架的发布交付阶段流程、Go/No-Go 决策、风险分层和门禁机制。

---

## 一、发布交付阶段定位

发布交付阶段将已完成设计、开发、测试并具备基本交付条件的结果，转化为可执行的发布动作、可审查的验收结论和可恢复的交接状态。

**核心原则**：
- 交付阶段不重新定义契约、provider 或仓边界，基于测试与回归结果做发布判断
- 必须形成明确的 Go/No-Go 倾向与回滚策略
- 发布后观察项与后补治理动作必须显式记录
- 编码前思考：发布前明确交付对象、Go/No-Go 标准、风险分层、回滚策略和观察指标
- 简洁优先：交付材料服务发布判断、回滚恢复和交接消费，不生成无关长文档
- 精准修改：不得在交付阶段重做需求、设计、测试或仓边界决策
- 目标驱动执行：以部署计划、验收结论、回滚路径和交接状态作为完成标准
- 可按需使用 GitNexus 类代码知识图谱核对发布包影响面、调用链、消费者和回滚路径
- 可按需使用 graphify 类能力表达需求项、测试结论、验收结论、发布风险与交接对象之间的关系

**触发命令**：`/mes-deliver-release`

**前置条件**：
- 测试验证已完成（执行过 `/mes-test-verify`）
- 测试报告确认通过
- 契约变更已完成回归验证

---

## 二、发布交付阶段整体流程图

```mermaid
flowchart TB
    START(["测试验证完成 可交付性已确认"]) --> GATE_ENTER{"进入门禁"}

    GATE_ENTER -->|"不通过"| FIX_ENTER["补齐前置条件"]
    FIX_ENTER --> GATE_ENTER
    GATE_ENTER -->|"通过"| STEP1

    subgraph S1 ["Step 1: 部署规划"]
        STEP1["mes-deliver-deploy-plan<br>制定部署策略与环境规划<br>确定回滚方案与发布窗口<br>识别发布依赖与前置条件<br>按需使用 GitNexus 核对发布影响面"]
    end

    STEP1 --> GATE_S1{"Step 1 门禁<br>回滚方案已制定?"}
    GATE_S1 -->|"不通过"| STEP1
    GATE_S1 -->|"通过"| STEP2

    subgraph S2 ["Step 2: 验收检查"]
        STEP2["mes-deliver-acceptance-check<br>验证交付物与需求规格一致性<br>检查测试结论完整性<br>确认风险与 blocker 状态"]
    end

    STEP2 --> GATE_S2{"Step 2 门禁<br>验收通过?"}
    GATE_S2 -->|"不通过"| STEP2
    GATE_S2 -->|"通过"| STEP3

    subgraph S3 ["Step 3: Go/No-Go 决策"]
        STEP3["Go/No-Go 决策<br>汇总所有风险与验证结论<br>形成发布倾向判断<br>记录决策理由与条件"]
    end

    STEP3 --> GONO_GO{"Go/No-Go?"}

    GONO_GO -->|"No-Go"| ROLLBACK["不发布 记录阻断原因<br>回流到开发或测试阶段"]
    GONO_GO -->|"Go"| STEP4

    subgraph S4 ["Step 4: 部署执行"]
        STEP4["mes-deliver-execute-deploy<br>按部署计划执行发布<br>监控发布过程<br>执行发布后验证"]
    end

    STEP4 --> GATE_S4{"Step 4 门禁<br>部署成功? 发布后验证通过?"}
    GATE_S4 -->|"不通过"| ROLLBACK_EXEC["执行回滚"]
    GATE_S4 -->|"通过"| STEP5

    subgraph S5 ["Step 5: 发布说明"]
        STEP5["mes-deliver-release-note<br>生成版本变更日志<br>记录功能变更与修复项<br>标注已知问题与观察项"]
    end

    STEP5 --> STEP6

    subgraph S6 ["Step 6: 交付交接"]
        STEP6["mes-deliver-handover<br>生成交接文档与交付物清单<br>记录知识刷新建议<br>记录 retrospective 建议<br>按需补充 graphify 交付关系导读"]
    end

    STEP6 --> GATE_EXIT{"退出门禁"}

    GATE_EXIT -->|"不通过"| STEP1
    GATE_EXIT -->|"通过"| SWEEP["Completion Sweep<br>已形成明确结论?<br>仍有未识别发布阻断?<br>回滚与发布后动作已明确?<br>refresh 与 retrospective 建议已给出?"]

    SWEEP --> FINAL["最终输出<br>交付目标 + 最小上线包状态 + Go/No-Go 倾向<br>+ 阻断发布风险 + 可带发布风险<br>+ 发布后动作 + refresh 建议"]

    FINAL --> DONE(["发布交付完成"])

    style START fill:#2196F3,color:white
    style DONE fill:#4CAF50,color:white
    style GATE_ENTER fill:#FF9800,color:white
    style GATE_S1 fill:#FF9800,color:white
    style GATE_S2 fill:#FF9800,color:white
    style GONO_GO fill:#FF9800,color:white
    style GATE_S4 fill:#FF9800,color:white
    style GATE_EXIT fill:#FF9800,color:white
    style ROLLBACK fill:#FFCDD2,stroke:#C62828
    style ROLLBACK_EXEC fill:#FFCDD2,stroke:#C62828
```

---

## 三、Go/No-Go 决策流程

```mermaid
flowchart TB
    GATHER["收集决策输入<br>- 测试结论与覆盖率<br>- 缺陷分类与风险等级<br>- 契约回归结果<br>- 回滚方案就绪状态"] --> ASSESS{"风险评估"}

    ASSESS --> RISK_HIGH["高风险: 存在阻断发布风险"]
    ASSESS --> RISK_MED["中风险: 存在可带发布风险"]
    ASSESS --> RISK_LOW["低风险: 仅发布后观察项"]

    RISK_HIGH -->|"修复后重新评估"| NOGO["No-Go"]
    RISK_MED -->|"带风险发布 需留痕"| CONDITIONAL["有条件 Go"]
    RISK_LOW -->|"可发布"| GO["Go"]

    CONDITIONAL --> RECORD_RISK["记录风险与后补计划"]
    RECORD_RISK --> EXECUTE["执行发布"]

    GO --> EXECUTE
    NOGO --> ROLLBACK_PATH["回流到开发或测试"]

    style NOGO fill:#FFCDD2,stroke:#C62828
    style CONDITIONAL fill:#FFF9C4,stroke:#F57C00
    style GO fill:#C8E6C9,stroke:#388E3C
```

---

## 四、风险三分类

```mermaid
flowchart LR
    ALL_RISKS["发布风险识别"] --> R1["阻断发布风险<br>必须解决后才能发布"]
    ALL_RISKS --> R2["可带发布风险<br>允许发布但必须留痕"]
    ALL_RISKS --> R3["发布后观察项<br>上线后持续关注"]

    style R1 fill:#FFCDD2,stroke:#C62828
    style R2 fill:#FFF9C4,stroke:#F57C00
    style R3 fill:#E3F2FD,stroke:#1976D2
```

---

## 五、发布交付阶段产物结构

```
mes-ai-dev/workspace/delivery/{REQ-ID}/
├── deliverable/
│   ├── release-note.md            # 发布说明与版本变更日志
│   └── handover-doc.md            # 交接文档
├── report/
│   ├── stage-output-report.md     # 阶段完成产物报告
│   └── delivery-review-report.md  # 交付详细审查报告
├── evidence/
│   ├── acceptance-evidence.md     # 验收证据
│   ├── deploy-log.md              # 部署执行日志
│   └── go-nogo-record.md          # Go/No-Go 决策记录
├── memory/
│   ├── release-risk-register.md   # 发布风险登记表
│   └── retrospective-notes.md     # 回顾会议记录
├── handoff/
│   └── deliver-to-refresh-handoff.md # 交付到知识刷新交接
└── working/
    ├── deploy-plan-draft.md       # 部署计划草案
    └── rollback-plan.md           # 回滚方案
```

---

## 六、发布交付阶段门禁检查清单

### 6.1 进入门禁（Enter Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 测试验证已完成 | must-pass | test-review-report.md 已通过 |
| 可交付性已有结论 | must-pass | 测试阶段明确建议可交付 |
| 契约回归已完成 | must-pass | 变更已完成回归验证 |

### 6.2 步骤门禁（Step Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 回滚方案已制定 | must-pass | 可执行的回滚策略 |
| 验收检查已通过 | must-pass | 交付物与需求一致 |
| Go/No-Go 已决策 | must-pass | 明确发布倾向与理由 |
| 部署执行成功 | must-pass | 发布后验证通过 |

### 6.3 退出门禁（Exit Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 发布说明已生成 | must-pass | release-note.md |
| 交接文档已生成 | must-pass | handover-doc.md |
| 交付审查报告已生成 | must-pass | delivery-review-report.md |
| refresh 建议已给出 | must-pass | 知识刷新需求已识别 |
| 阶段完成产物报告 | must-pass | stage-output-report.md |

---

## 七、关键术语表

| 术语 | 含义 |
|------|------|
| **Go/No-Go** | 发布决策：Go 允许发布，No-Go 不允许发布 |
| **最小上线包** | 发布对象与范围 + Go/No-Go 倾向 + 风险 + 回滚 + 观察项 |
| **阻断发布风险** | 必须解决后才能发布的风险 |
| **可带发布风险** | 允许发布但必须留痕的风险 |
| **发布后观察项** | 上线后需持续关注的项 |
| **retrospective** | 发布后回顾，识别改进点 |
