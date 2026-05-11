# mes-develop-backend-config 索引

> 标题：后端配置开发 Skill
> 描述：Develop backend configuration changes. Trigger: configuration, application.yml, properties
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 配置开发主线优先读取执行步骤、输入、输出、约束与审核模块。
- 环境变量、变更文件、验证步骤、回滚方案与服务特定补充仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-06.md` | 必读 | 执行步骤主线（上半段）。 |
| 2 | `modules/module-07.md` | 必读 | 执行步骤主线（下半段）。 |
| 3 | `modules/module-13.md` | 必读 | 输入要求。 |
| 4 | `modules/module-14.md` | 必读 | 输出要求。 |
| 5 | `modules/module-15.md` | 必读 | 约束规则。 |
| 6 | `modules/module-16.md` | 必读 | 审核要点。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 何时使用。 |
| 9 | `modules/module-03.md` | 按需 | 阶段记忆消费要求。 |
| 10 | `modules/module-04.md` | 按需 | 目标仓结构适配要求。 |
| 11 | `modules/module-05.md` | 按需 | 阶段记忆更新要求。 |
| 12 | `modules/module-08.md` | 按需 | 变更服务信息。 |
| 13 | `modules/module-09.md` | 按需 | 变更文件列表。 |
| 14 | `modules/module-10.md` | 按需 | 环境变量清单。 |
| 15 | `modules/module-11.md` | 按需 | 验证步骤。 |
| 16 | `modules/module-12.md` | 按需 | 回滚方案。 |

## 三、推荐最小读取集合

### 3.1 常规配置变更
- `module-06` → `module-07` → `module-13` → `module-14` → `module-15` → `module-16`

### 3.2 需要补齐结构与记忆边界时
- 在常规集合上按需追加：`module-01` ~ `module-05`

### 3.3 需要形成发布与回滚配套信息时
- 按需追加：`module-08`、`module-09`、`module-10`、`module-11`、`module-12`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
