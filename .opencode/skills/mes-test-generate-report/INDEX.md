# mes-test-generate-report 索引

> 标题：测试报告生成
> 描述：Generate test report with results and coverage. Trigger: test report, coverage report, test summary
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 测试报告生成主线优先读取核心入口、输入依赖、输出产物、执行步骤、覆盖矩阵、测试结论、质量检查与输出示例。
- 测试概况、结果汇总、缺陷清单、遗留风险与注意事项模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、触发条件、阶段记忆与更新要求。 |
| 2 | `modules/module-05.md` | 必读 | 输入依赖。 |
| 3 | `modules/module-06.md` | 必读 | 输出产物。 |
| 4 | `modules/module-07.md` | 必读 | 执行步骤。 |
| 5 | `modules/module-10.md` | 必读 | 测试覆盖矩阵。 |
| 6 | `modules/module-13.md` | 必读 | 测试结论。 |
| 7 | `modules/module-14.md` | 必读 | 质量检查清单。 |
| 8 | `modules/module-15.md` | 必读 | 输出示例。 |
| 9 | `modules/module-08.md` | 按需 | 测试概况。 |
| 10 | `modules/module-09.md` | 按需 | 测试结果汇总。 |
| 11 | `modules/module-11.md` | 按需 | 缺陷清单。 |
| 12 | `modules/module-12.md` | 按需 | 遗留风险。 |
| 13 | `modules/module-16.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规测试报告生成
- `module-01` → `module-05` → `module-06` → `module-07` → `module-10` → `module-13` → `module-14` → `module-15`

### 3.2 需要补齐结果细节时
- 按需追加：`module-08`、`module-09`

### 3.3 需要补齐问题与风险说明时
- 按需追加：`module-11`、`module-12`、`module-16`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
