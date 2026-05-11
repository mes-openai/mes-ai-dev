# mes-test-plan-cases 索引

> 标题：测试用例规划
> 描述：Plan test cases from design and requirements. Trigger: test plan, test case, testing strategy, test scenario
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 用例规划主线优先读取核心入口、输入依赖、输出产物、执行步骤、质量检查与示例输出结构。
- 功能/接口/集成/数据/前端测试规划等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、触发条件、阶段记忆、高风险坑点与 TDD 前置要求。 |
| 2 | `modules/module-05.md` | 必读 | 输入依赖。 |
| 3 | `modules/module-06.md` | 必读 | 输出产物。 |
| 4 | `modules/module-07.md` | 必读 | 执行步骤。 |
| 5 | `modules/module-14.md` | 必读 | 质量检查清单。 |
| 6 | `modules/module-16.md` | 必读 | 示例输出结构。 |
| 7 | `modules/module-08.md` | 按需 | 功能测试规划。 |
| 8 | `modules/module-09.md` | 按需 | 接口测试规划。 |
| 9 | `modules/module-10.md` | 按需 | 集成测试规划。 |
| 10 | `modules/module-11.md` | 按需 | 数据测试规划。 |
| 11 | `modules/module-12.md` | 按需 | 前端测试规划。 |
| 12 | `modules/module-13.md` | 按需 | 优先级定义。 |
| 13 | `modules/module-15.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规测试用例规划
- `module-01` → `module-05` → `module-06` → `module-07` → `module-14` → `module-16`

### 3.2 需要扩展具体测试维度时
- 按需追加：`module-08`、`module-09`、`module-10`、`module-11`、`module-12`

### 3.3 需要补齐优先级与补充说明时
- 按需追加：`module-13`、`module-15`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
