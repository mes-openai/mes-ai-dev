---
title: 开发阶段规则详版
doc_type: rule
load_strategy: explicit-only
phase_scope:
  - develop
trigger:
  - implement
  - fix
  - develop-detail
cost_level: medium
summary_first: false
default_allowed: false
parent_index: .opencode/references/mes-ai-reference/rules/phases/phase-develop.md
related_files:
  - .opencode/references/mes-ai-reference/reference/phase-gates/develop.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/rules.md
  - .opencode/references/mes-ai-reference/reference/knowledge-consumption/stage-memory.md
---

# 开发阶段规则详版（phase-develop-detail）

> 本文件承载开发阶段的详细执行步骤、扩展说明与技能入口。
> 日常阶段路由优先读取 `phase-develop.md` 最小包；仅在需要详细执行指引时进入本文件。

## 一、标准步骤

1. 确认范围与计划
2. 读取必要输入
3. 先生成 TDD 用例计划并等待用户补充确认
4. 实施改动
5. 执行验证
6. 自审与补强
7. 阶段收尾

## 二、详细执行要求

### 2.1 确认范围与计划
- 明确当前实现、修改或修复目标
- 确认已具备设计结论、修复目标或明确变更需求
- 若当前任务涉及多仓、多服务或 DB 结构调整，应在此阶段补充场景规则

### 2.2 读取必要输入
- 优先读取当前任务直接相关的规则、门禁与阶段记忆
- 不得因“可能有用”而整份读取旧总表或无关重型治理正文
- 若历史阶段已有 handoff / memory，应优先消费最小必要内容
- 在存量项目中，必须额外读取目标仓现有代码结构、分层、命名、依赖组织、测试组织与参考实现，再决定生成位置与实现方式

### 2.3 先生成 TDD 用例计划并等待用户补充确认
- 必须先基于需求、设计、验证对象变化和存量测试资产生成 `test-cases.md`
- `test-cases.md` 必须显式区分：AI 初始规划、用户补充区、确认后的最终计划
- 若用户补充了新场景、边界条件、风险路径或不允许覆盖的既有行为，必须先合并进最终计划
- 未收到用户确认前，不得进入代码生成
- 若存量项目已有测试组织方式、命名约定、夹具模式或断言风格，TDD 用例计划必须先贴合这些既有模式

### 2.4 实施改动
- 改动必须服务于当前明确目标
- Bugfix 场景优先最小修复，不扩大重构面
- 不得用类型压制、删除测试或跳过验证来伪造完成
- 代码生成必须反向对应已确认的 TDD 用例计划，不得脱离用例计划自由扩写
- 在存量项目中，优先复用既有目录、分层、命名、调用模式、异常模式、测试组织和实现骨架

### 2.4.1 开发真实性专项要求（新增）
- 生成任何后端代码前，必须先核对真实包路径、真实 import、真实类型、真实方法、真实返回值和真实异常体系。
- 生成任何 MyBatis 相关产物前，必须先核对 Mapper 接口、XML 目录、`namespace`、SQL `id`、`parameterType`、`resultType`、`resultMap` 的真实对应关系。
- 生成任何内部接口调用代码前，必须先读取 provider 的真实接口定义或现有 client 封装，核对参数、返回值、泛型和解包方式。
- 不得把模板中的示例类名、工具方法、分页对象、响应包装或异常类型直接当作项目事实落代码。
- 在存量项目中，不得为了迁就生成方便而新造一套并行目录结构、分层方式或测试组织方式。
- 真实性专项未闭环时，不得进入后续验证、自审或下游消费。

### 2.5 执行验证
- 至少执行与本次改动直接相关的验证
- 若项目已有编译、测试、lint 或审查基线，应按当前任务适用范围执行
- 验证失败时优先修复自身引入的问题，不顺手扩散到无关问题
- 验证应至少覆盖以下静态真实性检查（按适用范围）：Java 引用可解析性、MyBatis 映射一致性、provider 契约一致性
- 必须先验证本轮新生成测试用例全部通过，再继续后续收敛
- 必须复核本轮生成/修改并纳入验证范围的行覆盖率、分支覆盖率、方法覆盖率是否均达到 100%
- 覆盖率不足时，只允许追加测试用例与验证证据，不得删除已经生成且验证通过的测试用例

### 2.6 自审与补强
- 核对是否符合现有代码风格与阶段约束
- 核对是否遗漏必要产物、证据、风险说明与后补动作
- 若命中安全、跨仓、DB 迁移等高风险点，应补充专项审查或升级场景规则
- 若命中后端生成、MyBatis 生成或跨服务调用，必须单列真实性专项自审结论
- 必须单列 TDD 执行闭环结论：测试计划是否先行、用户是否补充、用户是否确认、测试是否全绿、覆盖率是否达标
- 必须单列存量结构贴合结论：本次代码是否遵循目标仓既有结构与实现模式

### 2.7 阶段收尾
- 补齐阶段产物
- 完成收尾扫描
- 确认可供测试或后续阶段消费的交接内容已齐备
- 开发阶段主交接文档固定采用 OpenSpec 命名 `tasks.md`，并在其中显式记录 TDD 用户补充、确认结论、测试全绿结论、覆盖率结论和存量结构贴合结论；历史 `task-plan.md` 仅作为兼容别名

## 三、推荐技能入口

- `mes-develop-plan-tasks`
- `mes-develop-backend-controller`
- `mes-develop-backend-service`
- `mes-develop-backend-dao`
- `mes-develop-backend-model`
- `mes-develop-backend-config`
- `mes-develop-frontend-api`
- `mes-develop-frontend-component`
- `mes-develop-frontend-page`
- `mes-develop-db-migration`
- `mes-develop-self-review`
- `mes-develop-security-review`

## 四、适用时机

以下场景建议进入本详版：

- 需要详细执行顺序与补强要求
- 需要判断自审、验证与收尾的细节边界
- 需要从阶段规则直接进入对应开发类 skill

以下场景通常不必进入本详版：

- 只需完成阶段路由与最小加载判断
- 只需确认进入条件、退出条件与默认加载卡
