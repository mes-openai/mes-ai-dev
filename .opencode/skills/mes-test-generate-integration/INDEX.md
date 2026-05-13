# mes-test-generate-integration 索引

> 标题：集成测试生成
> 描述：Generate integration test scenarios and procedures. Trigger: integration test, E2E test, end to end, service integration
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 集成测试生成主线优先读取输入依赖、输出产物、执行步骤与输出示例模块。
- E2E 链路、服务调用链、测试场景、测试环境与质量检查等模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤主线。 |
| 4 | `modules/module-14.md` | 必读 | 输出示例。 |
| 5 | `modules/module-01.md` | 按需 | 角色定位。 |
| 6 | `modules/module-02.md` | 按需 | 触发条件。 |
| 7 | `modules/module-06.md` | 按需 | E2E 链路参考分析。 |
| 8 | `modules/module-07.md` | 按需 | 服务调用链分析。 |
| 9 | `modules/module-08.md` | 按需 | 集成测试场景。 |
| 10 | `modules/module-09.md` | 按需 | 数据一致性测试。 |
| 11 | `modules/module-10.md` | 按需 | 异常场景测试。 |
| 12 | `modules/module-11.md` | 按需 | 性能测试场景。 |
| 13 | `modules/module-12.md` | 按需 | 测试环境配置。 |
| 14 | `modules/module-13.md` | 按需 | 质量检查清单。 |
| 15 | `modules/module-15.md` | 按需 | 注意事项。 |

## 三、推荐最小读取集合

### 3.1 常规集成测试生成
- `module-03` → `module-04` → `module-05` → `module-14`

### 3.2 需要补齐触发边界时
- 在常规集合上按需追加：`module-01`、`module-02`

### 3.3 需要形成链路与场景覆盖时
- 按需追加：`module-06`、`module-07`、`module-08`、`module-09`、`module-10`、`module-11`

### 3.4 需要补齐环境与质量约束时
- 按需追加：`module-12`、`module-13`、`module-15`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
