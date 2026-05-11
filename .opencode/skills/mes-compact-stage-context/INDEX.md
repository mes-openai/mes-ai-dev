# mes-compact-stage-context 索引

> 标题：阶段上下文压缩 Skill
> 描述：Compress stage context into fixed-size summary for cross-stage handoff. Trigger: compact, compress, summarize, handoff summary
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 阶段上下文压缩主线优先读取执行步骤、约束与审核模块。
- 结论、风险、下一步与证据路径模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-08.md` | 必读 | 约束规则。 |
| 3 | `modules/module-09.md` | 必读 | 审核要点。 |
| 4 | `modules/module-01.md` | 按需 | 角色定位。 |
| 5 | `modules/module-02.md` | 按需 | 触发条件。 |
| 6 | `modules/module-04.md` | 按需 | 结论。 |
| 7 | `modules/module-05.md` | 按需 | 风险。 |
| 8 | `modules/module-06.md` | 按需 | 下一步。 |
| 9 | `modules/module-07.md` | 按需 | 证据路径。 |

## 三、推荐最小读取集合

### 3.1 常规阶段上下文压缩
- `module-03` → `module-08` → `module-09`

### 3.2 需要形成压缩结论与证据链时
- 按需追加：`module-01`、`module-02`、`module-04`、`module-05`、`module-06`、`module-07`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
