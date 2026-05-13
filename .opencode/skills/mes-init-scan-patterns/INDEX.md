# mes-init-scan-patterns 索引

> 标题：实现模式与测试资产扫描 Skill
> 描述：Extract real implementation patterns, anti-patterns and test assets from codebase. Trigger: pattern catalog, anti-pattern, test asset
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 模式与测试资产扫描主线优先读取执行步骤、输入、输出、约束与审核模块。
- 角色定位、使用时机与批量异常模式检测结果模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤主线（上半段）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（下半段）。 |
| 3 | `modules/module-06.md` | 必读 | 输入要求。 |
| 4 | `modules/module-07.md` | 必读 | 输出要求。 |
| 5 | `modules/module-08.md` | 必读 | 约束规则。 |
| 6 | `modules/module-09.md` | 必读 | 审核要点。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 何时使用。 |
| 9 | `modules/module-05.md` | 按需 | 批量异常模式检测结果。 |

## 三、推荐最小读取集合

### 3.1 常规模式与测试资产扫描
- `module-03` → `module-04` → `module-06` → `module-07` → `module-08` → `module-09`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

### 3.3 需要补齐异常模式结论时
- 按需追加：`module-05`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
