---
title: 详细设计阶段规则详版
doc_type: rule
load_strategy: explicit-only
phase_scope:
  - design
trigger:
  - design
  - design-detail
cost_level: medium
summary_first: false
default_allowed: false
parent_index: knowledge/rules/phases/phase-design.md
related_files:
  - knowledge/reference/phase-gates/design.md
  - knowledge/reference/knowledge-consumption/dependency-graph.md
  - knowledge/reference/knowledge-consumption/reference.md
---

# 详细设计阶段规则详版（phase-design-detail）

> 本文件承载设计阶段的详细执行步骤、关键设计对象展开要求与技能入口。
> 日常阶段路由优先读取 `phase-design.md` 最小包；仅在需要详细设计流程时进入本文件。

## 一、标准步骤

1. 确认设计目标与边界
2. 消费上游输入并校准术语
3. 形成方案骨架
4. 展开关键设计对象（API / 数据库 / 服务链 / 前端 / 配置）
5. 识别风险、约束与验证点
6. 审查与收敛
7. 阶段收尾

## 二、详细执行要求

### 2.1 确认设计目标与边界
- 明确当前设计服务于需求规格、修复目标还是专项变更
- 划清当前设计覆盖范围、非覆盖范围与待确认边界
- 若命中多仓、DB、发布风险或跨阶段回流，应先识别对应场景规则

### 2.2 消费上游输入并校准术语
- 优先消费 requirement spec、影响范围分析与相关术语/领域模型
- 发现术语不一致、职责归属不清或边界冲突时，应先校准再继续展开设计
- 不得在输入边界未收敛时直接输出实现型细节结论

### 2.3 形成方案骨架
- 先形成设计主线，再展开局部对象
- 明确 API、数据、服务调用、前端交互、配置变更等是否在本轮设计范围内
- 保持设计输出对开发和测试阶段可消费，而非只给抽象口号

### 2.4 展开关键设计对象
- 对关键接口、数据对象、服务链与配置边界给出可实现口径
- 若存在前端、数据库、服务编排等多维设计对象，应说明各自作用与衔接关系
- 不得遗漏兼容性、回滚性、迁移边界或关键约束

### 2.4.1 真实性专项要求（新增）
- 设计阶段所有关键对象都必须绑定真实事实来源，不得由模板、通用常识或需求表述直接补齐。
- **数据库设计**：每张表都必须标注现有/修改/新增类型、事实来源和证据路径；没有真实性证据或新增批准依据，不得写入设计文档。
- **接口设计**：请求/响应、错误码、返回包装必须来自真实 Controller、SDK、API 注册表或既有契约文件，不得套用通用 REST 假设。
- **服务链设计**：provider 选择、参数、返回值、异常语义必须与真实接口契约一致，不得只按接口名称推测。
- 若当前设计对象无法建立事实来源闭环，必须停止展开并回流 analyze 补充输入。

### 2.5 识别风险、约束与验证点
- 明确高风险点、待确认项、依赖项与未来验证点
- 对跨仓、DB 结构、发布链路等场景给出必要提醒
- 为开发、测试、交付阶段保留可直接消费的约束信息

### 2.6 审查与收敛
- 审查设计是否完整、可实现、可验证
- 审查与现有术语、规则、接口与数据结构是否冲突
- 将最终待确认项、限制条件与结论口径显式落盘
- 命中数据库、接口或服务链设计时，必须单列真实性专项审查结果，而不是仅给出“已检查”

### 2.7 阶段收尾
- 补齐设计文档、审查结论与阶段交接材料
- 确认开发与测试阶段可直接消费的设计信息已具备
- 完成收尾扫描与必要 memory 更新

## 三、推荐技能入口

- `mes-design-approach`
- `mes-design-api`
- `mes-design-database`
- `mes-design-frontend`
- `mes-design-service-chain`
- `mes-design-check-consistency`
- `mes-design-record-decisions`
- `mes-design-review-approach`
- `mes-design-generate-doc`

## 四、适用时机

以下场景建议进入本详版：

- 需要详细设计步骤与对象展开要求
- 需要区分 API / DB / 服务链 / 前端 / 配置 等设计维度
- 需要从阶段规则直接进入设计类 skill

以下场景通常不必进入本详版：

- 只需完成设计阶段路由与最小加载判断
- 只需确认进入条件、退出条件与默认加载卡
