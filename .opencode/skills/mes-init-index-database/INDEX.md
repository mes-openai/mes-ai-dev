# mes-init-index-database 索引

> 标题：数据库结构索引
> 描述：Parse database scripts to build table structure index. Trigger keywords: index database, table structure, schema index, database registry.
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 数据库结构索引主线优先读取输出模式说明、执行步骤、输入、输出、约束、审核与异常处理模块。
- Schema 画像、表清单、关联关系、外键/索引关系与统计类模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-05.md` | 必读 | 输出模式说明。 |
| 2 | `modules/module-06.md` | 必读 | 执行步骤。 |
| 3 | `modules/module-14.md` | 必读 | 输入要求。 |
| 4 | `modules/module-15.md` | 必读 | 输出要求。 |
| 5 | `modules/module-26.md` | 必读 | 约束规则。 |
| 6 | `modules/module-27.md` | 必读 | 审核要点。 |
| 7 | `modules/module-28.md` | 必读 | 异常处理。 |
| 8 | `modules/module-01.md` ~ `modules/module-04.md` | 按需 | 角色定位、何时使用、目标仓结构适配要求、初始化补齐要求。 |
| 9 | `modules/module-07.md` ~ `modules/module-13.md` | 按需 | Schema 基本信息、表清单、风险画像、热表/共享表/大表清单与 Schema 画像汇总。 |
| 10 | `modules/module-16.md` ~ `modules/module-25.md` | 按需 | 表列表、关联关系、外键关系、索引关系、ER 图、Schema 归属、表统计、跨 Schema 关联与异常列表。 |

## 三、推荐最小读取集合

### 3.1 常规数据库结构索引
- `module-05` → `module-06` → `module-14` → `module-15` → `module-26` → `module-27` → `module-28`

### 3.2 需要补齐边界与仓适配时
- 按需追加：`module-01`、`module-02`、`module-03`、`module-04`

### 3.3 需要形成 Schema 画像时
- 按需追加：`module-07` ~ `module-13`

### 3.4 需要形成详细表结构与关联信息时
- 按需追加：`module-16` ~ `module-25`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
