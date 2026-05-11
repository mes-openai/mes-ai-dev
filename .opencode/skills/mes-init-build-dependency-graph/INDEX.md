# mes-init-build-dependency-graph 索引

> 标题：依赖关系图构建
> 描述：Build complete dependency graph including service calls, API mappings, and database ownership. Trigger keywords: dependency graph, service dependencies, build dependencies.
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 依赖关系图构建主线优先读取执行步骤、输入、输出、约束、审核与异常处理模块。
- 服务依赖统计、映射关系、数据库归属与风险分析等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-06.md` | 必读 | 输入要求。 |
| 3 | `modules/module-07.md` | 必读 | 输出要求。 |
| 4 | `modules/module-14.md` | 必读 | 约束规则。 |
| 5 | `modules/module-15.md` | 必读 | 审核要点。 |
| 6 | `modules/module-16.md` | 必读 | 异常处理。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 何时使用。 |
| 9 | `modules/module-04.md` ~ `modules/module-05.md` | 按需 | 服务被依赖度统计与影响传导关系。 |
| 10 | `modules/module-08.md` ~ `modules/module-13.md` | 按需 | 服务调用、API 映射、数据库归属、依赖统计与风险点分析。 |

## 三、推荐最小读取集合

### 3.1 常规依赖关系图构建
- `module-03` → `module-06` → `module-07` → `module-14` → `module-15` → `module-16`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

### 3.3 需要形成依赖统计与风险画像时
- 按需追加：`module-04`、`module-05`、`module-08` ~ `module-13`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
