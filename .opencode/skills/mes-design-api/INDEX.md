# mes-design-api 索引

> 标题：API接口设计 Skill
> 描述：Design REST API interfaces, request/response, error codes. Trigger: API design, interface, endpoint
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- API 接口设计主线优先读取核心入口、执行步骤、设计原则、接口列表、错误码、输入、输出、约束与审核模块。
- 需求概述、通用说明、注意事项与交接说明模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、触发场景、阶段记忆与目标仓结构要求。 |
| 2 | `modules/module-05.md` | 必读 | 执行步骤主线（上半段）。 |
| 3 | `modules/module-06.md` | 必读 | 执行步骤主线（下半段）。 |
| 4 | `modules/module-08.md` | 必读 | 设计原则。 |
| 5 | `modules/module-09.md` | 必读 | 接口列表。 |
| 6 | `modules/module-10.md` | 必读 | 错误码定义。 |
| 7 | `modules/module-13.md` | 必读 | 输入要求。 |
| 8 | `modules/module-14.md` | 必读 | 输出要求。 |
| 9 | `modules/module-15.md` | 必读 | 约束规则。 |
| 10 | `modules/module-16.md` | 必读 | 审核要点。 |
| 11 | `modules/module-07.md` | 按需 | 需求概述。 |
| 12 | `modules/module-11.md` | 按需 | 通用说明。 |
| 13 | `modules/module-12.md` | 按需 | 注意事项。 |
| 14 | `modules/module-17.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规 API 接口设计
- `module-01` → `module-05` → `module-06` → `module-08` → `module-09` → `module-10` → `module-13` → `module-14` → `module-15` → `module-16`

### 3.2 需要补齐背景与补充说明时
- 按需追加：`module-07`、`module-11`、`module-12`、`module-17`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
