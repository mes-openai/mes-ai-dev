# mes-design-database 索引

> 标题：数据库设计 Skill
> 描述：Design database schema changes, indexes, migration. Trigger: database design, DDL, schema
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 数据库设计主线优先读取表真实性要求、执行步骤、真实性核验、输入、输出、约束与审核模块。
- 需求概述、现有表结构、数据模型、DDL、迁移方案、性能影响、Schema 画像、注意事项与交接说明模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 表真实性优先要求。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（上半段）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤主线（下半段）。 |
| 4 | `modules/module-13.md` | 必读 | 表真实性核验。 |
| 5 | `modules/module-15.md` | 必读 | 输入要求。 |
| 6 | `modules/module-16.md` | 必读 | 输出要求。 |
| 7 | `modules/module-17.md` | 必读 | 约束规则。 |
| 8 | `modules/module-18.md` | 必读 | 审核要点。 |
| 9 | `modules/module-01.md` | 按需 | 核心入口说明。 |
| 10 | `modules/module-06.md` ~ `modules/module-12.md` | 按需 | 需求概述、现有表结构分析、数据模型设计、DDL 脚本、迁移方案、性能影响、Schema 归属与风险画像。 |
| 11 | `modules/module-14.md` | 按需 | 注意事项。 |
| 12 | `modules/module-19.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规数据库设计
- `module-03` → `module-04` → `module-05` → `module-13` → `module-15` → `module-16` → `module-17` → `module-18`

### 3.2 需要形成设计细节与迁移说明时
- 按需追加：`module-01`、`module-06` ~ `module-12`、`module-14`、`module-19`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
