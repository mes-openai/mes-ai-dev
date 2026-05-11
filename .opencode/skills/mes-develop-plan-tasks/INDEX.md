# mes-develop-plan-tasks 索引

> 标题：开发任务规划 Skill
> 描述：Plan and decompose development tasks from design. Trigger: task plan, development plan, work breakdown
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 任务规划主线优先读取“输出增强要求、执行步骤、输入、输出、约束、审核”。
- 仓画像、依赖关系、并行建议等模块仅在当前任务确有需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-05.md` | 必读 | 输出增强要求。 |
| 2 | `modules/module-06.md` | 必读 | 执行步骤主线。 |
| 3 | `modules/module-07.md` | 必读 | 输入要求。 |
| 4 | `modules/module-08.md` | 必读 | 输出要求。 |
| 5 | `modules/module-14.md` | 必读 | 约束规则。 |
| 6 | `modules/module-15.md` | 必读 | 审核要点。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 何时使用。 |
| 9 | `modules/module-03.md` | 按需 | 阶段记忆消费要求。 |
| 10 | `modules/module-04.md` | 按需 | 拆分增强要求。 |
| 11 | `modules/module-09.md` | 按需 | 任务总览。 |
| 12 | `modules/module-10.md` | 按需 | 服务仓库画像摘要。 |
| 13 | `modules/module-11.md` | 按需 | 任务分组（按执行顺序）。 |
| 14 | `modules/module-12.md` | 按需 | 依赖关系图。 |
| 15 | `modules/module-13.md` | 按需 | 并行执行建议。 |

## 三、推荐最小读取集合

### 3.1 常规任务规划
- `module-05` → `module-06` → `module-07` → `module-08` → `module-14` → `module-15`

### 3.2 需要补齐任务背景与适用边界时
- 在常规集合上按需追加：`module-01`、`module-02`、`module-03`、`module-04`

### 3.3 需要输出完整任务编排视图时
- 在常规集合上按需追加：`module-09`、`module-11`、`module-12`、`module-13`

### 3.4 需要结合仓画像落地时
- 按需追加：`module-10`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
