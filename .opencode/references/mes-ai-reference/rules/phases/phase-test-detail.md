---
title: 测试阶段规则详版
doc_type: rule
load_strategy: explicit-only
phase_scope:
  - test
trigger:
  - test
  - verify
  - test-detail
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/rules/phases/phase-test.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/test.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/code-map.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/convergence.md
---

# 测试阶段规则详版（phase-test-detail）

> 本文件承载测试阶段的详细执行步骤、验证收敛要求与技能入口。
> 日常阶段路由优先读取 `phase-test.md` 最小包；仅在需要详细验证流程时进入本文件。

## 一、标准步骤

1. 确认测试目标与范围
2. 形成测试计划
3. 准备验证对象与验证路径
4. 执行验证
5. 收敛测试结论
6. 阶段收尾

## 二、详细执行要求

### 2.1 确认测试目标与范围
- 明确本轮测试验证的是需求结果、设计结果、开发结果还是专项修复结果
- 明确关键验证对象、边界对象与未覆盖范围
- 若测试结论将用于发布判断，应提前识别是否命中高风险发布或 DB 场景
- 若承接开发阶段 TDD 计划，必须先核对 `test-cases.md` 中的用户补充区、确认结论与最终测试范围

### 2.2 形成测试计划
- 根据当前验证对象选择合适的测试粒度
- 区分必须验证项、建议验证项与当前轮次可后补项
- 若已有历史失败点或阶段记忆，应优先纳入当前测试计划
- 若开发阶段已先形成 TDD 用例计划，测试阶段不得重置其范围，只能在保留既有通过用例的前提下补充缺失用例

### 2.3 准备验证对象与验证路径
- 优先使用现有 test-assets、testability-matrix、e2e-chains 等资产
- 若无现成资产，应明确本轮验证路径与证据获取方式
- 不得在输入不足时直接给出“已验证完成”结论
- 若验证对象来自 AI 生成代码，必须明确本轮新生成测试用例清单、执行路径与覆盖率统计口径

### 2.4 执行验证
- 至少完成关键路径验证
- 对未执行、无法执行或条件不足的部分必须明确记录原因
- 不得把未覆盖部分默认视为通过
- 必须优先验证本轮新生成测试用例全部通过
- 必须在测试报告中单列本轮生成/修改并纳入验证范围的代码行覆盖率结果
- 覆盖率不足 100% 时，必须补充测试用例，不得删除已经生成且验证通过的测试用例

#### 2.4.1 单元测试跨平台要求

生成或修改单元测试时，必须保证 Windows / Linux 平台兼容：

- 禁止硬编码 `\\`、`/`、盘符、用户目录或本机绝对路径。
- 路径拼接应使用 `Path`、`Paths`、`File.separator` 或项目既有跨平台工具。
- 路径断言前应进行规范化或转换为同一表达形式，避免分隔符差异导致失败。
- 临时文件、临时目录应使用测试框架或 JDK 提供的跨平台机制，不得依赖固定目录。
- 资源文件读取应基于 classpath、测试资源目录或项目既有工具，不得依赖 IDE 工作目录。

若某个测试确实依赖特定平台行为，必须显式说明原因、限制条件与替代验证方式。

#### 2.4.2 Mockito 生成规范

生成或修改 Mockito 单元测试时，必须遵循以下规则：

- 同一个 mock 调用中的参数匹配策略必须一致；不得混用裸值与 matcher 导致参数 mismatch。
- 需要匹配固定值时，优先使用 `eq(...)` 与其他 matcher 保持一致。
- 复杂对象参数优先使用 `ArgumentCaptor` 或 `argThat(...)`，不得用过宽泛的 `any()` 掩盖真实契约。
- stub 前必须保证被测对象、依赖 mock、返回对象和嵌套字段已初始化，避免空指针式测试失败。
- 对链式调用、嵌套返回或 Optional/集合返回，必须完整构造返回路径，不得只 mock 中间一段。
- 行为验证应聚焦公开契约、关键副作用和边界条件，不得过度耦合内部实现细节。
- 严禁通过删除断言、放宽 matcher、返回万能 mock 或吞掉异常来制造测试通过。

### 2.5 收敛测试结论
- 输出通过项、失败项、风险项、未覆盖项
- 明确当前结论是否足以支持后续交付或仅能支持局部推进
- 若命中 blocker，应说明阻断级别、影响范围与建议动作
- 必须单列 TDD 闭环结论：用户补充是否吸收、最终计划是否执行、新生成测试用例是否全绿、覆盖率是否达 100%

### 2.6 阶段收尾
- 补齐测试报告、证据链与阶段收尾材料
- 确认交付阶段可直接消费的结论、限制与风险已写清
- 对高风险、未覆盖或待补动作保持显式记录
- 测试阶段主交接文档固定采用 OpenSpec / 阶段主文档命名 `test-report.md`，并显式记录测试范围、TDD 闭环结论、覆盖率结论与未覆盖说明

## 三、推荐技能入口

- `mes-test-plan-cases`
- `mes-test-generate-integration`
- `mes-test-generate-unit`
- `mes-test-performance-analysis`
- `mes-test-generate-report`

## 四、适用时机

以下场景建议进入本详版：

- 需要详细测试步骤与验证边界
- 需要区分通过、风险、未覆盖和阻断的输出口径
- 需要从阶段规则直接进入测试类 skill

以下场景通常不必进入本详版：

- 只需完成测试阶段路由与最小加载判断
- 只需确认进入条件、退出条件与默认加载卡
