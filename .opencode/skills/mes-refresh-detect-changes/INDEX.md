# mes-refresh-detect-changes 索引

> 标题：代码变更检测
> 描述：Detect code changes since last knowledge base update. Trigger: detect changes, code changes, repository changes, scan changes
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 代码变更检测主线优先读取输入依赖、输出产物、执行步骤与输出示例模块。
- 变更清单、影响范围分析、刷新计划、语义检测、质量检查与注意事项等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-06.md` | 必读 | 执行步骤。 |
| 4 | `modules/module-15.md` | 必读 | 输出示例。 |
| 5 | `modules/module-01.md` | 按需 | 角色定位。 |
| 6 | `modules/module-02.md` | 按需 | 触发条件。 |
| 7 | `modules/module-05.md` | 按需 | 规则依赖。 |
| 8 | `modules/module-07.md` ~ `modules/module-08.md` | 按需 | 变更文件清单。 |
| 9 | `modules/module-09.md` ~ `modules/module-12.md` | 按需 | 影响范围分析、刷新计划、语义变更检测结果、类结构变更检测。 |
| 10 | `modules/module-13.md` | 按需 | 文件类型识别规则。 |
| 11 | `modules/module-14.md` | 按需 | 质量检查清单。 |
| 12 | `modules/module-16.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规代码变更检测
- `module-03` → `module-04` → `module-06` → `module-15`

### 3.2 需要补齐规则与边界时
- 按需追加：`module-01`、`module-02`、`module-05`

### 3.3 需要形成变更范围与刷新结论时
- 按需追加：`module-07` ~ `module-14`、`module-16`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
