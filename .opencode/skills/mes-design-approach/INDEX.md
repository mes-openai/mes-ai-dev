# mes-design-approach 索引

> 标题：技术方案设计 Skill
> 描述：Design technical approach and architecture. Trigger: technical design, architecture, solution
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 技术方案设计主线优先读取核心入口、执行步骤、输入、输出、约束与审核模块。
- 需求概述、服务/模块清单、方案对比、决策、风险、应对策略、实施建议与交接说明模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、使用时机、阶段记忆与结构对齐要求。 |
| 2 | `modules/module-06.md` | 必读 | 执行步骤主线（上半段）。 |
| 3 | `modules/module-07.md` | 必读 | 执行步骤主线（下半段）。 |
| 4 | `modules/module-15.md` | 必读 | 输入要求。 |
| 5 | `modules/module-16.md` | 必读 | 输出要求。 |
| 6 | `modules/module-17.md` | 必读 | 约束规则。 |
| 7 | `modules/module-18.md` | 必读 | 审核要点。 |
| 8 | `modules/module-08.md` ~ `modules/module-14.md` | 按需 | 需求概述、涉及服务/模块、技术方案对比、最终决策、风险评估、应对策略、实施建议。 |
| 9 | `modules/module-19.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规技术方案设计
- `module-01` → `module-06` → `module-07` → `module-15` → `module-16` → `module-17` → `module-18`

### 3.2 需要形成方案分析与决策说明时
- 按需追加：`module-08` ~ `module-14`、`module-19`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
