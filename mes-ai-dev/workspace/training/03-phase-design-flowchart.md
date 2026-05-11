# 阶段三：详细设计 —— 流程图与关键活动说明

> 本文档用于培训，详细说明 MES-AI-DEV 骨架的详细设计阶段流程、技能链、门禁机制和核心产出。

---

## 一、详细设计阶段定位

详细设计阶段将需求分析产出的规格说明转化为 **可开发、可验证、可交接** 的技术设计文档。它是连接"需求是什么"与"代码怎么写"的关键桥梁。

**核心原则**：
- 设计文档必须对开发和测试阶段 **可直接消费**，不能只给抽象口号
- 所有设计对象必须绑定 **真实事实来源**，不得用模板或通用常识补洞
- 服务链必须在设计阶段 **冻结**，开发阶段不得自行改路线

**触发命令**：`/mes-design-detail`

**前置条件**：
- 需求分析已完成（执行过 `/mes-analyze-requirement`）
- 需求规格文档已生成并通过评审

---

## 二、详细设计阶段整体流程图

```mermaid
flowchart TB
    START([📐 需求分析完成<br/>spec.md 已通过评审]) --> PRECHECK{设计前加载检查}

    PRECHECK -->|知识库 overview 未读| ABORT_KB[⚠️ 先消费 code-map<br/>backend/frontend-overview]
    PRECHECK -->|服务定位不明| ABORT_SVC[⚠️ 先明确后端服务<br/>与前端模块定位]
    PRECHECK -->|检查全部通过| GATE_ENTER{进入门禁}

    GATE_ENTER -->|❌不通过| FIX_ENTER[补齐前置条件]
    FIX_ENTER --> GATE_ENTER
    GATE_ENTER -->|✅通过| STEP1

    subgraph S1["Step 1：确认设计目标与边界"]
        STEP1[明确设计范围<br/>━━━━━━━━━━━━━━━━<br/>本次设计覆盖什么？<br/>不覆盖什么？<br/>待确认边界在哪？]
    end

    STEP1 --> GATE_S1{Step 1 门禁}
    GATE_S1 -->|❌不通过| STEP1
    GATE_S1 -->|✅通过| STEP2

    subgraph S2["Step 2：消费上游输入并校准术语"]
        STEP2[消费 spec.md + 影响分析<br/>━━━━━━━━━━━━━━━━<br/>校准术语一致性<br/>识别职责归属冲突<br/>确认输入边界已收敛]
    end

    STEP2 --> GATE_S2{Step 2 门禁<br/>输入边界已收敛？}
    GATE_S2 -->|❌未收敛| REFLOW[回流 analyze 阶段<br/>补充输入]
    GATE_S2 -->|✅已收敛| STEP3

    subgraph S3["Step 3：形成方案骨架"]
        STEP3[mes-design-approach<br/>━━━━━━━━━━━━━━━━<br/>先形成设计主线<br/>再展开局部对象<br/>明确各维度设计范围]
    end

    STEP3 --> STEP3_OUT[产出：方案主路径<br/>API/数据/服务调用/前端<br/>是否在本轮设计范围]

    STEP3_OUT --> GATE_S3{Step 3 门禁}
    GATE_S3 -->|❌不通过| STEP3
    GATE_S3 -->|✅通过| STEP4

    subgraph S4["Step 4：展开关键设计对象"]
        direction TB
        STEP4A[mes-design-api<br/>━━━━━━━━━━━━━━━━<br/>接口设计<br/>请求/响应/错误码<br/>绑定真实 Controller 契约]
        STEP4B[mes-design-database<br/>━━━━━━━━━━━━━━━━<br/>数据库设计<br/>表/索引/迁移<br/>标注现有/修改/新增]
        STEP4C[mes-design-service-chain<br/>━━━━━━━━━━━━━━━━<br/>服务调用链设计<br/>冻结 Provider 选择<br/>记录禁止路径]
        STEP4D[mes-design-frontend<br/>━━━━━━━━━━━━━━━━<br/>前端交互设计<br/>组件/路由/状态管理<br/>对齐后端 API]
    end

    STEP4A --> STEP4_MERGE[四大设计维度合并<br/>交叉一致性检查]
    STEP4B --> STEP4_MERGE
    STEP4C --> STEP4_MERGE
    STEP4D --> STEP4_MERGE

    STEP4_MERGE --> GATE_S4{Step 4 门禁<br/>真实性专项审查}
    GATE_S4 -->|❌不通过| STEP4A
    GATE_S4 -->|✅通过| STEP5

    subgraph S5["Step 5：跨服务一致性检查"]
        STEP5[mes-design-check-consistency<br/>━━━━━━━━━━━━━━━━<br/>命名冲突检查<br/>接口契约一致性<br/>数据模型一致性<br/>服务链闭环验证]
    end

    STEP5 --> GATE_S5{Step 5 门禁<br/>服务链已冻结？<br/>禁止路径已记录？}
    GATE_S5 -->|❌不通过| STEP5
    GATE_S5 -->|✅通过| STEP6

    subgraph S6["Step 6：识别风险、约束与验证点"]
        STEP6[风险评估<br/>━━━━━━━━━━━━━━━━<br/>高风险点<br/>待确认项<br/>依赖项<br/>未来验证点<br/>回滚/迁移方案]
    end

    STEP6 --> GATE_S6{Step 6 门禁}
    GATE_S6 -->|❌不通过| STEP6
    GATE_S6 -->|✅通过| STEP7

    subgraph S7["Step 7：设计文档生成与评审"]
        STEP7A[mes-design-generate-doc<br/>━━━━━━━━━━━━━━━━<br/>生成完整设计文档<br/>design.md]
        STEP7B[mes-design-record-decisions<br/>━━━━━━━━━━━━━━━━<br/>记录 ADR<br/>决策背景/备选/理由/影响]
        STEP7C[mes-design-review-approach<br/>━━━━━━━━━━━━━━━━<br/>设计评审<br/>可行性/一致性/完整性]
    end

    STEP7A --> STEP7C
    STEP7B --> STEP7C
    STEP7C --> STEP7_OUT[产出：design.md + ADR +<br/>design-review-report.md]
    STEP7_OUT --> GATE_EXIT{退出门禁}

    GATE_EXIT -->|❌不通过| STEP1
    GATE_EXIT -->|✅通过| SWEEP[Completion Sweep<br/>━━━━━━━━━━━━━━━━<br/>开发已具备可消费输入？<br/>是否存在假完成状态？<br/>等待确认项已明确？]

    SWEEP --> FINAL[最终输出<br/>━━━━━━━━━━━━━━━━<br/>设计目标 + 方案主路径<br/>+ 关键变更点 + blocker<br/>+ 开发可先推进项 + 后补动作]

    FINAL --> DONE([✅ 详细设计完成<br/>可进入开发阶段])

    style START fill:#2196F3,color:white
    style DONE fill:#4CAF50,color:white
    style GATE_ENTER fill:#FF9800,color:white
    style GATE_S1 fill:#FF9800,color:white
    style GATE_S2 fill:#FF9800,color:white
    style GATE_S3 fill:#FF9800,color:white
    style GATE_S4 fill:#FF9800,color:white
    style GATE_S5 fill:#FF9800,color:white
    style GATE_S6 fill:#FF9800,color:white
    style GATE_EXIT fill:#FF9800,color:white
    style REFLOW fill:#FFCDD2,stroke:#C62828
```

---

## 三、关键设计对象展开详解

### 3.1 四大设计维度关系

```mermaid
flowchart LR
    subgraph DESIGN_DIMENSIONS["四大设计维度"]
        API["接口设计<br/>mes-design-api<br/>━━━━━━━━━━<br/>REST 端点<br/>请求/响应模型<br/>错误码/状态码"]
        DB["数据库设计<br/>mes-design-database<br/>━━━━━━━━━━<br/>表结构/索引<br/>迁移策略<br/>现有/修改/新增"]
        SVC["服务链设计<br/>mes-design-service-chain<br/>━━━━━━━━━━<br/>调用链路<br/>Provider 冻结<br/>禁止路径"]
        FE["前端设计<br/>mes-design-frontend<br/>━━━━━━━━━━<br/>组件/路由<br/>状态管理<br/>API 对齐"]
    end

    API <-->|请求/响应对齐| SVC
    API <-->|数据模型对齐| DB
    API <-->|接口契约对齐| FE
    SVC <-->|数据流对齐| DB
    FE <-->|调用链对齐| SVC

    style API fill:#E3F2FD,stroke:#1976D2
    style DB fill:#FFF3E0,stroke:#F57C00
    style SVC fill:#E8F5E9,stroke:#388E3C
    style FE fill:#F3E5F5,stroke:#7B1FA2
```

### 3.2 服务链冻结机制

```mermaid
flowchart TB
    MULTI[需求涉及多个服务] --> ANALYZE[分析阶段：识别候选 Provider]
    ANALYZE --> PROVIDERS[技术可达 Provider<br/>架构允许 Provider]

    PROVIDERS --> DESIGN{设计阶段决策}
    DESIGN --> SELECT[最终选定 Provider<br/>记录选择理由]
    DESIGN --> FORBID[记录禁止路径<br/>标注绕行原因]

    SELECT --> FREEZE[🔒 服务链冻结]
    FORBID --> FREEZE

    FREEZE --> DEV[开发阶段<br/>只能沿冻结路径实现]
    FREEZE --> TEST[测试阶段<br/>基于冻结链路验证]

    DEV --> VIOLATE{发现需绕路？}
    VIOLATE -->|是| REFLOW_D[回流设计阶段<br/>不得在开发阶段<br/>直接拍板改路线]
    VIOLATE -->|否| CONTINUE[继续实现]

    style FREEZE fill:#C8E6C9,stroke:#388E3C
    style VIOLATE fill:#FFCDD2,stroke:#C62828
    style REFLOW_D fill:#FFCDD2,stroke:#C62828
```

### 3.3 真实性专项审查

```mermaid
flowchart TB
    TRUTH[真实性审查启动] --> DB_CHECK{数据库设计}
    DB_CHECK -->|每张表| DB_VERIFY[标注：现有/修改/新增<br/>标注：事实来源<br/>标注：证据路径]
    DB_VERIFY -->|无证据| STOP_DB[⛔ 停止展开<br/>回流 analyze 补充]
    DB_VERIFY -->|有证据| API_CHECK

    API_CHECK{接口设计} -->|每个接口| API_VERIFY[核对真实 Controller<br/>核对真实 SDK 模型<br/>核对真实错误码]
    API_VERIFY -->|无事实源| STOP_API[⛔ 不得套用<br/>通用 REST 假设]
    API_VERIFY -->|有事实源| CHAIN_CHECK

    CHAIN_CHECK{服务链设计} -->|每条链路| CHAIN_VERIFY[核对真实接口契约<br/>核对参数/返回值<br/>核对异常语义]
    CHAIN_VERIFY -->|不一致| STOP_CHAIN[⛔ 不得按接口名<br/>推测实现]
    CHAIN_VERIFY -->|一致| PASS([✅ 真实性审查通过])

    style STOP_DB fill:#FFCDD2,stroke:#C62828
    style STOP_API fill:#FFCDD2,stroke:#C62828
    style STOP_CHAIN fill:#FFCDD2,stroke:#C62828
    style PASS fill:#C8E6C9,stroke:#388E3C
```

---

## 四、详细设计阶段产物结构

```
mes-ai-dev/workspace/designs/REQ-YYYYMMDD-XXX/
├── deliverable/
│   └── design.md                  # 详细设计文档（OpenSpec 格式）
├── report/
│   ├── stage-output-report.md     # 阶段完成产物报告
│   ├── design-review-report.md    # 设计详细审查报告
│   └── truth-review-report.md     # 真实性专项审查报告
├── memory/
│   ├── adr/                       # 架构决策记录
│   │   ├── adr-001-xxx.md
│   │   └── adr-002-xxx.md
│   └── risk-register.md           # 风险登记表
├── handoff/
│   └── design-to-develop-handoff.md  # 设计→开发交接
└── working/
    ├── api-design-draft.md         # 接口设计草案
    ├── db-design-draft.md          # 数据库设计草案
    ├── service-chain-draft.md      # 服务链设计草案
    └── frontend-design-draft.md    # 前端设计草案
```

---

## 五、详细设计阶段门禁检查清单

### 5.1 进入门禁（Enter Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 需求规格已生成 | must-pass | spec.md 已存在并通过评审 |
| 已加载 code-map overview | must-pass | backend/frontend-overview.md 已读取 |
| 后端服务已定位 | must-pass | 服务名称、代码仓、Schema 已明确 |
| 前端模块已定位 | must-pass | 模块名称、代码仓、路由路径已明确 |
| 已遵循现有模式 | must-pass | 参数开关、数据字典、既有接口等 |

### 5.2 步骤门禁（Step Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 服务链已冻结 | must-pass | Provider 选择理由已记录 |
| 禁止路径已记录 | must-pass | 绕行原因已标注 |
| 私有契约已引用 | must-pass | 可追溯到定义点 |
| 真实性专项完成 | must-pass | 每个关键对象有事实来源 |

### 5.3 退出门禁（Exit Gate）

| 检查项 | 层级 | 说明 |
|--------|------|------|
| 设计文档已生成 | must-pass | design.md 符合 OpenSpec 格式 |
| 详细审查报告已生成 | must-pass | design-review-report.md |
| ADR 已记录 | must-pass | 关键决策有背景/备选/理由/影响 |
| 开发可消费 | must-pass | 设计信息足以支撑开发阶段 |
| Completion Sweep 完成 | must-pass | 无假完成状态 |
| 阶段完成产物报告 | must-pass | stage-output-report.md |

---

## 六、GSD 模式下的并行开发识别

```mermaid
flowchart TB
    GSD_ENTER[GSD 模式启动] --> ANALYZE_MODULES[分析设计对象]

    ANALYZE_MODULES --> M1[可立即开发模块<br/>✅ 设计已完整]
    ANALYZE_MODULES --> M2[需等待确认模块<br/>⏳ 有 blocker]
    ANALYZE_MODULES --> M3[可 Mock 先推模块<br/>🔄 用草案先行]

    M1 --> PARALLEL[并行推进]
    M2 --> WAIT[等待确认后启动]
    M3 --> MOCK[Mock 先行<br/>后续替换]

    PARALLEL --> MIN_DESIGN[最小设计包<br/>方案主路径 + 关键变更点<br/>+ 核心接口边界 + blocker<br/>+ 开发可先推进项]
    WAIT --> MIN_DESIGN
    MOCK --> MIN_DESIGN

    style M1 fill:#C8E6C9
    style M2 fill:#FFF9C4
    style M3 fill:#E3F2FD
```

---

## 七、关键术语表

| 术语 | 含义 |
|------|------|
| **ADR** | Architecture Decision Record，架构决策记录 |
| **服务链冻结** | 设计阶段确定调用路径后不可在开发阶段擅自修改 |
| **禁止路径** | 架构上不允许使用的调用路径，需显式记录 |
| **真实性专项审查** | 确保每个设计对象都来自真实代码/契约，非模板/常识推断 |
| **最小设计包** | GSD 模式下足以支撑开发继续的最小设计结论集 |
| **假完成状态** | 写了很多文档但开发其实没法继续的状态 |
| **私有契约** | 项目特有的接口约定，需从定义点引用 |
