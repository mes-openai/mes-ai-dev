# mes-verify-state-migration 索引

> 标题：统一状态源迁移校验 Skill
> 描述：Verify migration completeness from legacy state files to unified state.yaml. Trigger: state migration, migrate state, yaml migration, state model verification
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 状态迁移校验主线优先读取输入依赖、输出产物、执行步骤、约束、审核与异常处理模块。
- 校验维度、相关 Skill 关系与变更记录模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-04.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-05.md` | 必读 | 输出产物。 |
| 3 | `modules/module-07.md` | 必读 | 执行步骤主线（上半段）。 |
| 4 | `modules/module-08.md` | 必读 | 执行步骤主线（下半段）。 |
| 5 | `modules/module-09.md` | 必读 | 约束规则。 |
| 6 | `modules/module-10.md` | 必读 | 审核要点。 |
| 7 | `modules/module-12.md` | 必读 | 异常处理。 |
| 8 | `modules/module-01.md` ~ `modules/module-03.md` | 按需 | 角色定位、触发条件、规则依赖。 |
| 9 | `modules/module-06.md` | 按需 | 校验维度。 |
| 10 | `modules/module-11.md` | 按需 | 与相关 Skill 的关系。 |
| 11 | `modules/module-13.md` | 按需 | 变更记录。 |

## 三、推荐最小读取集合

### 3.1 常规状态迁移校验
- `module-04` → `module-05` → `module-07` → `module-08` → `module-09` → `module-10` → `module-12`

### 3.2 需要补齐边界与规则依赖时
- 按需追加：`module-01`、`module-02`、`module-03`

### 3.3 需要形成维度说明与迁移记录时
- 按需追加：`module-06`、`module-11`、`module-13`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
