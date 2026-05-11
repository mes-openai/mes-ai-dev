# 阶段八：紧急修复 —— 流程图与关键活动说明

> 本文档用于培训，详细说明 MES-AI-DEV 骨架的紧急修复阶段流程、热修回流机制和门禁机制。

---

## 一、紧急修复阶段定位

紧急修复阶段是骨架中唯一允许绕过正常开发流程的阶段，以最短时间恢复服务。但它不是主治理链的替代路径，完成后必须回流到正常流程补充治理。

**核心原则**：
- 先恢复服务，再补治理
- 修复优先最小改动，不做额外重构
- 热修后必须明确回流到 analyze/design/develop/test/refresh
- 临时措施必须记录撤销条件与正式化条件

**触发命令**：`/mes-emergency-fix`

**前置条件**：无（紧急情况可绕过正常前置条件）

**适用场景**：
- 生产环境核心功能异常
- 发现紧急安全漏洞
- 需要快速回滚

---

## 二、紧急修复阶段整体流程图

```mermaid
flowchart TB
    START(["生产故障发生"]) --> STEP1

    subgraph S1 ["Step 1: 确认故障目标与影响范围"]
        STEP1["收集故障描述 现场症状<br>识别影响范围与严重程度<br>确定修复优先级与目标<br>评估是否需要紧急回滚"]
    end

    STEP1 --> GATE_S1{"Step 1 门禁<br>故障范围已确认?"}
    GATE_S1 -->|"不通过"| STEP1
    GATE_S1 -->|"通过"| ROLLBACK_CHECK

    ROLLBACK_CHECK{"是否需要紧急回滚?"}
    ROLLBACK_CHECK -->|"是 立即回滚"| ROLLBACK["执行紧急回滚<br>恢复到上一稳定版本"]
    ROLLBACK_CHECK -->|"否 可修复"| STEP2

    ROLLBACK --> STEP2

    subgraph S2 ["Step 2: 识别最小修复路径"]
        STEP2["定位根因<br>识别最小改动范围<br>确认修复方案<br>评估修复风险"]
    end

    STEP2 --> STRICT_CHECK{"命中 Strict 条件?"}

    STRICT_CHECK -->|"数据库不可逆变更"| STRICT["局部切回 Strict 子流程"]
    STRICT_CHECK -->|"高风险安全修复"| STRICT
    STRICT_CHECK -->|"关键状态模型修正"| STRICT
    STRICT_CHECK -->|"不命中 Strict"| STEP3

    STRICT --> STEP3

    subgraph S3 ["Step 3: 执行最小修复与最小验证"]
        STEP3["执行最小必要代码修改<br>执行最小必要验证<br>确认修复效果"]
    end

    STEP3 --> GATE_S3{"Step 3 门禁<br>故障已恢复? 验证通过?"}
    GATE_S3 -->|"不通过"| STEP2
    GATE_S3 -->|"通过"| STEP4

    subgraph S4 ["Step 4: 记录临时措施与回流动作"]
        STEP4["记录临时措施内容 适用范围<br>记录撤销条件与正式化条件<br>评估回流到各阶段的需要"]
    end

    STEP4 --> REFLOW["热修回流判断"]

    REFLOW --> R1["是否需要补需求范围收敛?"]
    REFLOW --> R2["是否需要补设计偏差修正?"]
    REFLOW --> R3["是否需要补开发正式自审?"]
    REFLOW --> R4["是否需要补测试追溯?"]
    REFLOW --> R5["是否需要补知识刷新?"]

    R1 --> STEP5
    R2 --> STEP5
    R3 --> STEP5
    R4 --> STEP5
    R5 --> STEP5

    subgraph S5 ["Step 5: 阶段收尾"]
        STEP5["生成事件报告与 postmortem<br>生成 refresh-hints.md<br>记录剩余风险与观察项<br>输出阶段完成产物报告"]
    end

    STEP5 --> GATE_EXIT{"退出门禁"}

    GATE_EXIT -->|"不通过"| STEP1
    GATE_EXIT -->|"通过"| SWEEP["Completion Sweep<br>恢复状态是否真实成立?<br>仍存在高风险未控制项?<br>refresh 与 retrospective 已明确?<br>观察期与回滚关注项已记录?"]

    SWEEP --> FINAL["最终输出<br>修复状态 + blocker + 最小可交付状态<br>+ 风险与观察项 + 后补动作<br>+ 回流判断结果"]

    FINAL --> DONE(["紧急修复完成<br>服务已恢复"])

    style START fill:#C62828,color:white
    style DONE fill:#4CAF50,color:white
    style GATE_S1 fill:#FF9800,color:white
    style GATE_S3 fill:#FF9800,color:white
    style GATE_EXIT fill:#FF9800,color:white
    style ROLLBACK_CHECK fill:#FF9800,color:white
    style STRICT_CHECK fill:#FF9800,color:white
    style ROLLBACK fill:#FFCDD2,stroke:#C62828
    style STRICT fill:#FFF9C4,stroke:#F57C00
```

---

## 三、热修回流主链

```mermaid
flowchart TB
    HOTFIX["热修完成"] --> REFLOW_ANALYZE{"需要补需求<br>范围收敛?"}
    HOTFIX --> REFLOW_DESIGN{"需要补设计<br>偏差修正?"}
    HOTFIX --> REFLOW_DEVELOP{"需要补开发<br>正式自审?"}
    HOTFIX --> REFLOW_TEST{"需要补测试<br>追溯?"}
    HOTFIX --> REFLOW_REFRESH{"需要补知识<br>刷新?"}

    REFLOW_ANALYZE -->|"是"| BACK_ANALYZE["回流 analyze 阶段"]
    REFLOW_ANALYZE -->|"否"| SKIP_A["跳过"]

    REFLOW_DESIGN -->|"是"| BACK_DESIGN["回流 design 阶段"]
    REFLOW_DESIGN -->|"否"| SKIP_D["跳过"]

    REFLOW_DEVELOP -->|"是"| BACK_DEVELOP["回流 develop 阶段"]
    REFLOW_DEVELOP -->|"否"| SKIP_V["跳过"]

    REFLOW_TEST -->|"是"| BACK_TEST["回流 test 阶段"]
    REFLOW_TEST -->|"否"| SKIP_T["跳过"]

    REFLOW_REFRESH -->|"是"| BACK_REFRESH["触发 refresh 阶段"]
    REFLOW_REFRESH -->|"否"| SKIP_R["跳过"]

    BACK_ANALYZE --> DONE_RFLOW["回流动作已记录"]
    BACK_DESIGN --> DONE_RFLOW
    BACK_DEVELOP --> DONE_RFLOW
    BACK_TEST --> DONE_RFLOW
    BACK_REFRESH --> DONE_RFLOW
    SKIP_A --> DONE_RFLOW
    SKIP_D --> DONE_RFLOW
    SKIP_V --> DONE_RFLOW
    SKIP_T --> DONE_RFLOW
    SKIP_R --> DONE_RFLOW

    DONE_RFLOW --> POSTMORTEM["生成 postmortem<br>事件报告与改进建议"]

    style BACK_ANALYZE fill:#E3F2FD,stroke:#1976D2
    style BACK_DESIGN fill:#E3F2FD,stroke:#1976D2
    style BACK_DEVELOP fill:#E3F2FD,stroke:#1976D2
    style BACK_TEST fill:#E3F2FD,stroke:#1976D2
    style BACK_REFRESH fill:#E3F2FD,stroke:#1976D2
```

---

## 四、紧急修复 blocker 分类

```mermaid
flowchart TB
    EMERGENCY_BLOCKER["紧急修复 blocker"] --> CLASSIFY{"是否阻碍恢复服务?"}

    CLASSIFY -->|"阻碍恢复服务"| HARD["硬阻塞<br>必须优先解决"]
    CLASSIFY -->|"不阻碍恢复服务<br>只影响完整治理"| SOFT["软阻塞或后补项<br>记录并安排后续"]
    CLASSIFY -->|"受外部环境限制<br>但存在临时缓解"| EXTERNAL["外部依赖阻塞<br>执行临时缓解措施"]

    style HARD fill:#FFCDD2,stroke:#C62828
    style SOFT fill:#FFF9C4,stroke:#F57C00
    style EXTERNAL fill:#E3F2FD,stroke:#1976D2
```

---

## 五、紧急修复阶段产物结构

```
mes-ai-dev/workspace/emergency/EMG-YYYYMMDD-XXX/
├── deliverable/
│   ├── incident-report.md         # 事件报告
│   └── postmortem.md              # 复盘报告
├── report/
│   ├── stage-output-report.md     # 阶段完成产物报告
│   └── emergency-review-report.md # 紧急修复审查报告
├── evidence/
│   ├── fix-evidence.md            # 修复证据
│   └── verification-evidence.md   # 验证证据
├── memory/
│   ├── temporary-measures.md      # 临时措施记录
│   ├── residual-risks.md          # 剩余风险说明
│   └── reflow-checklist.md        # 回流判断清单
├── handoff/
│   └── emergency-to-refresh-handoff.md # 紧急修复到知识刷新交接
└── working/
    ├── root-cause-analysis.md     # 根因分析
    └── refresh-hints.md           # 知识刷新提示
```

---

## 六、紧急修复阶段门禁检查清单

### 6.1 进入条件

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 存在需要立即处理的生产问题 | must-pass | 高优先级故障 |
| 已具备最小故障描述 | must-pass | 影响范围或现场症状 |

### 6.2 步骤门禁

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 故障影响范围已明确 | must-pass | 不盲目修复 |
| 修复方案为最小改动 | must-pass | 不做额外重构 |
| 最小必要验证已完成 | must-pass | 不得跳过验证 |
| 临时措施已记录 | must-pass | 含撤销条件 |

### 6.3 退出门禁

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 故障已恢复或显著缓解 | must-pass | 恢复状态真实成立 |
| 事件报告已生成 | must-pass | incident-report.md |
| 回流判断已完成 | must-pass | 五阶段回流评估 |
| refresh-hints 已生成 | must-pass | 知识刷新提示 |
| 剩余风险已记录 | must-pass | 观察期与关注项 |
| 阶段完成产物报告 | must-pass | stage-output-report.md |

---

## 七、硬约束

| 约束 | 说明 |
|------|------|
| 不得以紧急修复之名跳过最小验证 | 最小验证不可省略 |
| 不得只修代码而不记录临时措施 | 临时措施必须留痕 |
| 不得将热修结果视为已完成闭环 | 必须回流到主治理链 |
| 不得遗漏回流判断 | 五阶段回流评估不可省略 |
| 数据库不可逆变更必须切回 Strict | 不得以 GSD 绕过 |

---

## 八、关键术语表

| 术语 | 含义 |
|------|------|
| **热修回流** | 紧急修复后回流到正常治理链补充治理 |
| **临时措施** | 短期方案，含适用范围与撤销条件 |
| **postmortem** | 事后复盘，分析根因与改进点 |
| **硬阻塞** | 阻碍恢复服务，必须优先解决 |
| **软阻塞** | 不阻碍恢复但影响完整治理 |
| **Strict 局部切换** | 紧急修复中命中高风险场景时局部切回严格模式 |
| **refresh-hints.md** | 热修后产出的知识刷新提示 |
