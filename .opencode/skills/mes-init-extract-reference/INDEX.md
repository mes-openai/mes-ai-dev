# mes-init-extract-reference 索引

> 标题：业务参考知识提取
> 描述：Extract business reference knowledge from codebase (terminology, domain model, data dictionary, enums, error codes, API conventions, coding standards)
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 业务参考知识提取主线优先读取核心入口、执行步骤、输入、输出与约束模块。
- 上下文预算控制模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并功能说明、角色/权限映射与置信度标注。 |
| 2 | `modules/module-02.md` | 必读 | 执行步骤。 |
| 3 | `modules/module-07.md` | 必读 | 输入要求。 |
| 4 | `modules/module-08.md` | 必读 | 输出要求。 |
| 5 | `modules/module-10.md` | 必读 | 约束规则。 |
| 6 | `modules/module-09.md` | 按需 | 上下文预算控制。 |

## 三、推荐最小读取集合

### 3.1 常规业务参考提取
- `module-01` → `module-02` → `module-07` → `module-08` → `module-10`

### 3.2 需要补齐预算控制时
- 按需追加：`module-09`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
