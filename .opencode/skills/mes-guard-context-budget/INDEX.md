# mes-guard-context-budget 索引

> 标题：上下文预算守卫 Skill
> 描述：Guard context budget per phase to prevent overflow. Trigger: budget check, context guard, token limit
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 上下文预算守卫主线优先读取执行步骤、硬性约束与异常处理模块。
- 预算分配、硬阻断机制与大仓模式判定模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-04.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-05.md` | 必读 | 硬性约束。 |
| 3 | `modules/module-08.md` | 必读 | 异常处理。 |
| 4 | `modules/module-01.md` | 按需 | 角色定位。 |
| 5 | `modules/module-02.md` | 按需 | 触发条件。 |
| 6 | `modules/module-03.md` | 按需 | 上下文预算分配。 |
| 7 | `modules/module-06.md` | 按需 | 硬阻断机制。 |
| 8 | `modules/module-07.md` | 按需 | 大仓模式判定逻辑。 |

## 三、推荐最小读取集合

### 3.1 常规上下文预算守卫
- `module-04` → `module-05` → `module-08`

### 3.2 需要补齐预算策略与阻断逻辑时
- 按需追加：`module-01`、`module-02`、`module-03`、`module-06`、`module-07`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
