# mes-test-generate-unit 索引

> 标题：单元测试生成
> 描述：Generate unit test code for Java classes. Trigger: unit test, JUnit, mock test, Java test
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 单元测试生成主线优先读取输入依赖、输出产物、执行步骤与输出示例模块。
- 触发边界、代码规范、质量检查与注意事项模块仅在当前任务需要时进入。
- 生成单元测试时必须优先满足 JUnit 5 + Mockito + JDK8、`@Nested` 方法分组、Windows / Linux 路径兼容与 Mockito 最佳实践；GitNexus / graphify 只可作为回归范围与证据关系导读，不得替代真实测试执行与覆盖率结论。
- 覆盖率门禁为行覆盖率 100%、分支覆盖率 100%、方法覆盖率 100%；断言必须覆盖状态码/结果标识与核心业务数据。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤主线（上半段）。 |
| 4 | `modules/module-06.md` | 必读 | 执行步骤主线（下半段）。 |
| 5 | `modules/module-09.md` | 必读 | 输出示例。 |
| 6 | `modules/module-01.md` | 按需 | 角色定位。 |
| 7 | `modules/module-02.md` | 按需 | 触发条件。 |
| 8 | `modules/module-07.md` | 按需 | 代码规范。 |
| 9 | `modules/module-08.md` | 按需 | 质量检查清单。 |
| 10 | `modules/module-10.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规单元测试生成
- `module-03` → `module-04` → `module-05` → `module-06` → `module-09`

### 3.2 需要补齐触发边界时
- 在常规集合上按需追加：`module-01`、`module-02`

### 3.3 需要补齐规范与质量要求时
- 按需追加：`module-07`、`module-08`、`module-10`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
