---
title: 参数开关模式
doc_type: reference
load_strategy: on-demand
phase_scope:
  - analyze
  - design
  - develop
trigger:
  - parameter-switch
  - feature-flag
  - data-dictionary
cost_level: low
summary_first: false
parent_index: .opencode/references/mes-ai-reference/reference/knowledge-consumption/index.md
related_files:
  - mes-ai-dev/knowledge/code-map/backend-overview.md
  - mes-ai-dev/knowledge/code-map/frontend-overview.md
  - mes-ai-dev/knowledge/reference/data-dictionary.md
  - mes-ai-dev/knowledge/reference/terminology-glossary.md
---

# 参数开关模式

> 本文件沉淀需求、设计、开发阶段对参数开关的统一复用口径。
> 目标：避免重复发明开关机制，避免不知道应落哪个仓/哪个服务/哪个模块，也避免脱离既有数据字典与参数体系另起一套。

---

## 一、适用范围

命中以下场景时，应优先读取本文件：

- 需求中出现“开关”“启停”“参数控制”“配置取值”“按参数决定行为”
- 设计方案需要决定取值来源、落库方式、前后端联动方式
- 需要判断应复用现有参数、数据字典、运行时配置还是新增机制

---

## 二、核心原则

1. **先复用，后扩展，最后新增**。
2. 任何参数开关设计都必须同时明确：
   - 后端服务定位
   - 前端模块定位
   - Schema / 表或配置载体定位
   - 取值来源与默认值
   - 知识来源
3. 不得因为实现方便而绕过既有参数体系、数据字典或配置模式。
4. 若新增独立机制，必须说明为何无法复用前两类模式。

---

## 三、三种模式

### 模式一：复用现有参数开关模式

适用条件：

- 已存在同类参数表、系统参数、业务参数或配置入口
- 既有取值方式足以承载本次需求
- 只需复用既有读取链路与校验规则

设计要求：

- 明确复用哪张表、哪个参数项或哪个配置键
- 明确由哪个后端服务负责读取/解释
- 明确由哪个前端模块负责展示/使用
- 明确默认值、可选值、异常值处理

### 模式二：在现有模式内扩展开关取值

适用条件：

- 已有参数体系存在，但取值范围不足
- 需要新增参数项、枚举值、字典值、配置键
- 不需要引入新的独立存储机制

设计要求：

- 明确扩展点位于哪一套既有参数/字典/配置结构内
- 明确新增值与旧值的兼容关系
- 明确前后端对新值的识别方式
- 明确是否需要补充数据字典或枚举定义

### 模式三：新增参数开关机制

适用条件：

- 模式一、模式二均无法满足需求
- 现有参数体系在职责、粒度、性能、隔离性或安全性上不适配

设计要求：

- 必须先给出“为何不能复用模式一/二”的证据
- 必须明确新机制落在哪个代码仓、哪个服务、哪个模块、哪个 Schema
- 必须说明是否新增表、字段、配置文件或接口
- 必须说明与既有参数体系、数据字典、缓存、权限的关系

---

## 四、设计阶段最小记录要求

设计文档中涉及参数开关时，至少应记录：

- 采用的模式（模式一 / 模式二 / 模式三）
- 后端服务名称
- 前端模块名称与路由路径
- Schema / 表 / 配置载体
- 参数键、默认值、候选值、来源
- 参考的知识文件清单

---

## 五、违规判定

命中以下任一情况，应视为违规：

1. 已存在可复用的参数模式，却未说明为何不复用。
2. 新增独立参数表、独立基表或并行配置机制，却未说明为何不能复用既有模式。
3. 未明确服务名称、模块名称、路由路径、Schema 或配置载体。
4. 未显式标注参考了哪些知识文件。

---

## 六、推荐消费顺序

1. `mes-ai-dev/knowledge/code-map/backend-overview.md`
2. `mes-ai-dev/knowledge/code-map/frontend-overview.md`
3. `mes-ai-dev/knowledge/reference/terminology-glossary.md`
4. `.opencode/references/mes-ai-reference/reference/parameter-switch-patterns.md`
5. 命中的服务 `index.md` / 模块 `index.md`
6. 必要时再进入 `file-summaries.md` 或精准源码

不得跳过前四步直接给出参数开关设计结论。
