# mes-develop-backend-controller 索引

> 标题：后端Controller层开发 Skill
> 描述：Develop REST controller endpoints. Trigger: controller, REST endpoint, API implementation
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- Controller 开发主线优先读取核心入口、执行步骤、输入、输出、约束与审核模块。
- 本 skill 的核心入口模块同时承接结构适配与阶段记忆相关提醒，应优先阅读。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、使用时机、阶段记忆与结构适配要求。 |
| 2 | `modules/module-06.md` | 必读 | 执行步骤主线（上半段）。 |
| 3 | `modules/module-07.md` | 必读 | 执行步骤主线（下半段）。 |
| 4 | `modules/module-08.md` | 必读 | 输入要求。 |
| 5 | `modules/module-09.md` | 必读 | 输出要求。 |
| 6 | `modules/module-10.md` | 必读 | 约束规则。 |
| 7 | `modules/module-11.md` | 必读 | 审核要点。 |

## 三、推荐最小读取集合

### 3.1 常规 Controller 开发
- `module-01` → `module-06` → `module-07` → `module-08` → `module-09` → `module-10` → `module-11`

### 3.2 需要重点复核输入输出契约时
- 在常规集合中重点复读：`module-08`、`module-09`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
