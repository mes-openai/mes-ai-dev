# mes-init-analyze-routes 索引

> 标题：前端路由与映射分析
> 描述：Analyze frontend routes and page components mapping to backend APIs. Trigger keywords: analyze routes, page components, frontend backend map, route analysis.
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 路由与映射分析主线优先读取执行步骤、输入、输出、约束、审核与异常处理模块。
- 路由配置、页面详情、状态管理、API 列表与映射明细等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-05.md` | 必读 | 执行步骤主线（上半段）。 |
| 2 | `modules/module-06.md` | 必读 | 执行步骤主线（下半段）。 |
| 3 | `modules/module-07.md` | 必读 | 输入要求。 |
| 4 | `modules/module-08.md` | 必读 | 输出要求。 |
| 5 | `modules/module-20.md` | 必读 | 约束规则。 |
| 6 | `modules/module-21.md` | 必读 | 审核要点。 |
| 7 | `modules/module-22.md` | 必读 | 异常处理。 |
| 8 | `modules/module-01.md` ~ `modules/module-04.md` | 按需 | 角色定位、何时使用、目标仓结构适配要求、初始化补齐要求。 |
| 9 | `modules/module-09.md` ~ `modules/module-19.md` | 按需 | 基本信息、路由配置、页面详情、状态管理、API 列表、概览、模块-服务映射、API 映射明细、未映射 API、数据流图等扩展分析。 |

## 三、推荐最小读取集合

### 3.1 常规路由与映射分析
- `module-05` → `module-06` → `module-07` → `module-08` → `module-20` → `module-21` → `module-22`

### 3.2 需要补齐边界与仓适配时
- 按需追加：`module-01`、`module-02`、`module-03`、`module-04`

### 3.3 需要形成映射细节与未映射清单时
- 按需追加：`module-09` ~ `module-19`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
