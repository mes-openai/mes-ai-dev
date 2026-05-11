# mes-design-review-approach 索引

> 标题：设计评审 Skill
> 描述：Review design for feasibility, consistency, completeness. Trigger: design review, architecture review
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 设计评审主线优先读取执行步骤、输入、输出、约束与审核模块。
- 评审结论、分项结果、问题汇总、风险评估、后续行动项与复审记录模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤（1/4）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤（2/4）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤（3/4）。 |
| 4 | `modules/module-06.md` | 必读 | 执行步骤（4/4）。 |
| 5 | `modules/module-18.md` | 必读 | 输入要求。 |
| 6 | `modules/module-19.md` | 必读 | 输出要求。 |
| 7 | `modules/module-20.md` | 必读 | 约束规则。 |
| 8 | `modules/module-21.md` | 必读 | 审核要点。 |
| 9 | `modules/module-01.md` | 按需 | 核心入口说明。 |
| 10 | `modules/module-07.md` ~ `modules/module-17.md` | 按需 | 评审信息、结论、分项结果、一致性检查、问题汇总、优化建议、风险评估、后续行动、证据路径、复审记录与附录。 |
| 11 | `modules/module-22.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规设计评审
- `module-03` → `module-04` → `module-05` → `module-06` → `module-18` → `module-19` → `module-20` → `module-21`

### 3.2 需要形成评审结论与问题清单时
- 按需追加：`module-01`、`module-07` ~ `module-17`、`module-22`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
