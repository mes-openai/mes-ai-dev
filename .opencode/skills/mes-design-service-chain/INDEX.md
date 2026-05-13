# mes-design-service-chain 索引

> 标题：服务调用链设计 Skill
> 描述：Design microservice call chain and data flow. Trigger: service chain, call chain, orchestration
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 服务调用链设计主线优先读取执行步骤、调用链设计、数据流设计、事务边界、异常处理、输入、输出、约束与审核模块。
- 需求概述、涉及服务列表、调用方式、性能优化、监控追踪与交接说明模块仅在当前任务需要时进入。
- GitNexus 类代码知识图谱可用于校验调用链、Provider 路径、依赖闭环与影响面；graphify 类图谱可用于关系导读，但不得替代设计主文档、服务链冻结结论与事实源。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤（1/4）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤（2/4）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤（3/4）。 |
| 4 | `modules/module-06.md` | 必读 | 执行步骤（4/4）。 |
| 5 | `modules/module-09.md` | 必读 | 服务调用链路设计。 |
| 6 | `modules/module-10.md` | 必读 | 数据流转设计。 |
| 7 | `modules/module-12.md` | 必读 | 事务边界设计。 |
| 8 | `modules/module-13.md` | 必读 | 异常处理设计。 |
| 9 | `modules/module-17.md` | 必读 | 输入要求。 |
| 10 | `modules/module-18.md` | 必读 | 输出要求。 |
| 11 | `modules/module-19.md` | 必读 | 约束规则。 |
| 12 | `modules/module-20.md` | 必读 | 审核要点。 |
| 13 | `modules/module-01.md` ~ `modules/module-02.md` | 按需 | 角色定位、何时使用。 |
| 14 | `modules/module-07.md` ~ `modules/module-08.md` | 按需 | 需求概述、涉及服务列表。 |
| 15 | `modules/module-11.md` | 按需 | 调用方式设计。 |
| 16 | `modules/module-14.md` ~ `modules/module-16.md` | 按需 | 性能优化设计、监控与追踪、注意事项。 |
| 17 | `modules/module-21.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规服务调用链设计
- `module-03` → `module-04` → `module-05` → `module-06` → `module-09` → `module-10` → `module-12` → `module-13` → `module-17` → `module-18` → `module-19` → `module-20`

### 3.2 需要补齐背景与服务范围时
- 按需追加：`module-01`、`module-02`、`module-07`、`module-08`

### 3.3 需要补齐实现细节与交接说明时
- 按需追加：`module-11`、`module-14`、`module-15`、`module-16`、`module-21`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
