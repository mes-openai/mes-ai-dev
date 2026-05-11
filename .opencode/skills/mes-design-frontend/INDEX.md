# mes-design-frontend 索引

> 标题：前端设计 Skill
> 描述：Design frontend interaction, components, routes. Trigger: frontend design, UI, Vue design
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 前端设计主线优先读取执行步骤、输入、输出、约束与审核模块。
- 页面结构、路由、组件、数据流、交互流程、API 调用清单与交接说明模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤主线（1/3）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（2/3）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤主线（3/3）。 |
| 4 | `modules/module-15.md` | 必读 | 输入要求。 |
| 5 | `modules/module-16.md` | 必读 | 输出要求。 |
| 6 | `modules/module-17.md` | 必读 | 约束规则。 |
| 7 | `modules/module-18.md` | 必读 | 审核要点。 |
| 8 | `modules/module-01.md` ~ `modules/module-02.md` | 按需 | 角色定位、何时使用。 |
| 9 | `modules/module-06.md` ~ `modules/module-14.md` | 按需 | 需求概述、前端架构说明、页面结构、路由设计、组件设计、数据流设计、交互流程设计、API 调用清单、注意事项。 |
| 10 | `modules/module-19.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规前端设计
- `module-03` → `module-04` → `module-05` → `module-15` → `module-16` → `module-17` → `module-18`

### 3.2 需要形成页面与交互设计细节时
- 按需追加：`module-01`、`module-02`、`module-06` ~ `module-14`、`module-19`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
