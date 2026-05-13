# mes-handle-emergency-fix 索引

> 标题：紧急修复 Skill
> 描述：Handle emergency fix, hotfix, and rollback scenarios. Trigger: emergency, hotfix, rollback, urgent fix, production issue
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 紧急修复主线优先读取输出产物、硬性约束与异常处理模块。
- 修复分类、流程、问题描述、影响范围、原因分析与处理方案模块仅在当前任务需要时进入。
- GitNexus 类代码知识图谱可用于定位故障入口、最小修复点、调用链和冒烟路径；graphify 类图谱可用于事故关系导读，但不得替代事件报告、回流动作或最小验证结果。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-10.md` | 必读 | 输出产物。 |
| 2 | `modules/module-11.md` | 必读 | 硬性约束。 |
| 3 | `modules/module-12.md` | 必读 | 异常处理。 |
| 4 | `modules/module-01.md` ~ `modules/module-09.md` | 按需 | 角色定位、触发条件、紧急修复分类、流程、基本信息、问题描述、影响范围、原因分析与处理方案。 |

## 三、推荐最小读取集合

### 3.1 常规紧急修复收口
- `module-10` → `module-11` → `module-12`

### 3.2 需要补齐问题背景与处置方案时
- 按需追加：`module-01` ~ `module-09`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
