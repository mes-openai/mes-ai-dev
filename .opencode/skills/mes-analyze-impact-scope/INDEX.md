# mes-analyze-impact-scope 索引

> 标题：影响范围分析
> 描述：Analyze impact scope identifying affected services, modules, tables. Trigger: impact analysis, scope
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 影响范围分析主线优先读取执行步骤、输入、输出、约束与审核模块。
- 分析依据、影响结论、协作补充等模块只在当前任务需要时进入。
- GitNexus 类代码知识图谱可作为影响范围、调用链、依赖链与复用路径的辅助导航；graphify 类图谱可作为关系导读补充，但二者都不得替代项目事实源、阶段门禁与分析结论。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤主线（1/3）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（2/3）。 |
| 3 | `modules/module-05.md` | 必读 | 执行步骤主线（3/3）。 |
| 4 | `modules/module-06.md` | 必读 | 输入要求。 |
| 5 | `modules/module-07.md` | 必读 | 输出要求。 |
| 6 | `modules/module-10.md` | 必读 | 约束规则。 |
| 7 | `modules/module-11.md` | 必读 | 审核要点。 |
| 8 | `modules/module-01.md` | 按需 | 角色定位。 |
| 9 | `modules/module-02.md` | 按需 | 何时使用。 |
| 10 | `modules/module-08.md` | 按需 | 影响范围分析结论。 |
| 11 | `modules/module-09.md` | 按需 | 分析依据。 |
| 12 | `modules/module-12.md` | 按需 | 与其他 Skill 的协作。 |

## 三、推荐最小读取集合

### 3.1 常规影响范围分析
- `module-03` → `module-04` → `module-05` → `module-06` → `module-07` → `module-10` → `module-11`

### 3.2 需要补齐使用边界时
- 在常规集合上按需追加：`module-01`、`module-02`

### 3.3 需要形成分析依据与结论时
- 按需追加：`module-08`、`module-09`

### 3.4 需要处理跨 Skill 协作时
- 按需追加：`module-12`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
