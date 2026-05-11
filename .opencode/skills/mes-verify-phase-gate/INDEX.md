# mes-verify-phase-gate 索引

> 标题：阶段门禁自动校验 Skill
> 描述：Automatically verify phase entry/exit criteria before proceeding. Trigger: gate check, phase verify, enter phase, exit phase
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 阶段门禁校验主线优先读取输入依赖、输出产物、校验规则、执行步骤、硬性约束与异常处理模块。
- 角色定位与触发条件模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-05.md` ~ `modules/module-07.md` | 必读 | 校验规则（1/3 ~ 3/3）。 |
| 4 | `modules/module-08.md` | 必读 | 执行步骤。 |
| 5 | `modules/module-09.md` | 必读 | 硬性约束。 |
| 6 | `modules/module-10.md` | 必读 | 异常处理。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 触发条件。 |

## 三、推荐最小读取集合

### 3.1 常规阶段门禁校验
- `module-03` → `module-04` → `module-05` → `module-06` → `module-07` → `module-08` → `module-09` → `module-10`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
