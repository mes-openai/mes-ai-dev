# mes-analyze-identify-repos 索引

> 标题：仓库影响识别
> 描述：Identify affected repositories, database schemas, configurations. Trigger: repository, schema mapping
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 仓库识别主线优先读取执行步骤、输入、输出增强、输出、约束与审核模块。
- 阶段记忆、目标仓对齐、外部事实源、影响清单与识别依据等模块只在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤主线（上半段）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（下半段）。 |
| 3 | `modules/module-05.md` | 必读 | 输入要求。 |
| 4 | `modules/module-08.md` | 必读 | 输出增强要求。 |
| 5 | `modules/module-11.md` | 必读 | 输出要求。 |
| 6 | `modules/module-15.md` | 必读 | 约束规则。 |
| 7 | `modules/module-16.md` | 必读 | 审核要点。 |
| 8 | `modules/module-01.md` | 按需 | 角色定位。 |
| 9 | `modules/module-02.md` | 按需 | 何时使用。 |
| 10 | `modules/module-06.md` | 按需 | 阶段记忆消费要求。 |
| 11 | `modules/module-07.md` | 按需 | 目标仓结构对齐要求。 |
| 12 | `modules/module-09.md` | 按需 | 外部事实源识别要求。 |
| 13 | `modules/module-10.md` | 按需 | 阶段记忆更新要求。 |
| 14 | `modules/module-12.md` | 按需 | 仓库影响清单（1/2）。 |
| 15 | `modules/module-13.md` | 按需 | 仓库影响清单（2/2）。 |
| 16 | `modules/module-14.md` | 按需 | 识别依据。 |
| 17 | `modules/module-17.md` | 按需 | 与其他 Skill 的协作。 |

## 三、推荐最小读取集合

### 3.1 常规仓库影响识别
- `module-03` → `module-04` → `module-05` → `module-08` → `module-11` → `module-15` → `module-16`

### 3.2 需要补齐仓定位与记忆边界时
- 在常规集合上按需追加：`module-01`、`module-02`、`module-06`、`module-07`、`module-10`

### 3.3 需要形成影响清单与识别依据时
- 按需追加：`module-12`、`module-13`、`module-14`

### 3.4 需要处理外部事实源或跨 Skill 协作时
- 按需追加：`module-09`、`module-17`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
