# mes-refresh-validate-quality 索引

> 标题：知识库质量校验 Skill
> 描述：Validate knowledge base quality after refresh. Trigger: validate knowledge, quality check, consistency check
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 知识库质量校验主线优先读取输入依赖、输出产物、执行步骤与异常处理模块。
- 规则依赖、校验时间、结论、检查结果、修复项与建议模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 输入依赖。 |
| 2 | `modules/module-04.md` | 必读 | 输出产物。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤。 |
| 4 | `modules/module-13.md` | 必读 | 异常处理。 |
| 5 | `modules/module-01.md` | 按需 | 核心入口说明。 |
| 6 | `modules/module-06.md` ~ `modules/module-12.md` | 按需 | 规则依赖、校验时间、总体结论、检查结果、修复项、建议与审核检查清单。 |

## 三、推荐最小读取集合

### 3.1 常规知识库质量校验
- `module-03` → `module-04` → `module-05` → `module-13`

### 3.2 需要补齐入口与结论细节时
- 按需追加：`module-01`、`module-06` ~ `module-12`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
