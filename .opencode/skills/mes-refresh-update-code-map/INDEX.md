# mes-refresh-update-code-map 索引

> 标题：代码地图更新
> 描述：Update code map based on detected changes. Trigger: update code map, refresh overview, update index, refresh code map
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 代码地图更新主线优先读取输入依赖、输出产物、执行步骤与输出示例模块。
- 服务/模块概览、技术栈、结构、调用关系、更新报告、规范与质量检查等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤。 |
| 4 | `modules/module-25.md` | 必读 | 输出示例。 |
| 5 | `modules/module-01.md` | 按需 | 角色定位。 |
| 6 | `modules/module-02.md` | 按需 | 触发条件。 |
| 7 | `modules/module-06.md` | 按需 | 待更新服务/模块。 |
| 8 | `modules/module-07.md` ~ `modules/module-13.md` | 按需 | 服务概述、技术栈、包结构、API 端点、数据实体、服务依赖、配置项。 |
| 9 | `modules/module-14.md` ~ `modules/module-21.md` | 按需 | 模块概述、目录结构、页面路由、API 调用、服务总览、前端模块总览。 |
| 10 | `modules/module-22.md` | 按需 | 代码地图更新报告。 |
| 11 | `modules/module-23.md` | 按需 | 索引内容规范。 |
| 12 | `modules/module-24.md` | 按需 | 质量检查清单。 |
| 13 | `modules/module-26.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规代码地图更新
- `module-03` → `module-04` → `module-05` → `module-25`

### 3.2 需要补齐边界时
- 按需追加：`module-01`、`module-02`、`module-06`

### 3.3 需要形成更新视图与结构结论时
- 按需追加：`module-07` ~ `module-24`、`module-26`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
