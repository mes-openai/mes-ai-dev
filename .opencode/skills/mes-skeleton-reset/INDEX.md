# mes-skeleton-reset 索引

> 标题：骨架清理 Skill
> 描述：清理骨架阶段产物，用于骨架迁移到新项目后从零开始初始化。Trigger: skeleton reset, clean skeleton, reset project, migrate skeleton, clear artifacts
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 骨架清理主线优先读取执行步骤、输入、输出、约束、异常处理与审核模块。
- 当前活跃需求、历史需求、清理范围白名单与后续建议模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤（1/3）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤（2/3）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤（3/3）。 |
| 4 | `modules/module-10.md` | 必读 | 输入要求。 |
| 5 | `modules/module-11.md` | 必读 | 输出要求。 |
| 6 | `modules/module-14.md` | 必读 | 约束规则。 |
| 7 | `modules/module-15.md` | 必读 | 异常处理。 |
| 8 | `modules/module-16.md` | 必读 | 审核要点。 |
| 9 | `modules/module-01.md` ~ `modules/module-02.md` | 按需 | 角色定位、何时使用。 |
| 10 | `modules/module-06.md` ~ `modules/module-09.md` | 按需 | 当前活跃需求、历史已完成需求、说明与历史清理记录。 |
| 11 | `modules/module-12.md` ~ `modules/module-13.md` | 按需 | 清理范围清单、保留文件白名单。 |
| 12 | `modules/module-17.md` | 按需 | 后续建议。 |

## 三、推荐最小读取集合

### 3.1 常规骨架清理
- `module-03` → `module-04` → `module-05` → `module-10` → `module-11` → `module-14` → `module-15` → `module-16`

### 3.2 需要补齐清理背景与范围时
- 按需追加：`module-01`、`module-02`、`module-06` ~ `module-13`

### 3.3 需要补齐清理后建议时
- 按需追加：`module-17`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
