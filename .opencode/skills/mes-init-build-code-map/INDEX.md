# mes-init-build-code-map 索引

> 标题：代码地图构建
> 描述：Aggregate all analysis results to build complete code map. Trigger keywords: build code map, code map overview, aggregate analysis, code structure.
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 代码地图构建主线优先读取执行步骤、输入、输出、约束、审核与异常处理模块。
- 交叉引用、知识结构、使用指南、文件清单与更新记录等模块仅在当前任务需要时进入。
- GitNexus 类代码知识图谱可用于辅助构建代码结构、依赖与调用链视图；graphify 类图谱可用于 code map 导读，但不得替代初始化事实源、收口结果与门禁结论。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-04.md` | 必读 | 输入要求。 |
| 3 | `modules/module-05.md` | 必读 | 输出要求。 |
| 4 | `modules/module-12.md` | 必读 | 约束规则。 |
| 5 | `modules/module-13.md` | 必读 | 审核要点。 |
| 6 | `modules/module-14.md` | 必读 | 异常处理。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 何时使用。 |
| 9 | `modules/module-06.md` ~ `modules/module-11.md` | 按需 | 交叉引用、知识库结构、使用指南、文件清单、更新记录等辅助模块。 |

## 三、推荐最小读取集合

### 3.1 常规代码地图构建
- `module-03` → `module-04` → `module-05` → `module-12` → `module-13` → `module-14`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

### 3.3 需要补齐结构与更新附加信息时
- 按需追加：`module-06` ~ `module-11`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
