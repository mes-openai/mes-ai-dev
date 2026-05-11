# mes-design-check-consistency 索引

> 标题：跨服务一致性校验 Skill
> 描述：Cross-service consistency validation during design phase. Trigger: consistency check, cross-service, naming conflict
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 跨服务一致性校验主线优先读取执行步骤、输入、输出、约束与审核模块。
- 阶段记忆消费/更新要求与角色定位模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-05.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-06.md` | 必读 | 输入要求。 |
| 3 | `modules/module-07.md` | 必读 | 输出要求。 |
| 4 | `modules/module-08.md` | 必读 | 约束规则。 |
| 5 | `modules/module-09.md` | 必读 | 审核要点。 |
| 6 | `modules/module-01.md` ~ `modules/module-04.md` | 按需 | 角色定位、何时使用、阶段记忆消费要求、阶段记忆更新要求。 |

## 三、推荐最小读取集合

### 3.1 常规跨服务一致性校验
- `module-05` → `module-06` → `module-07` → `module-08` → `module-09`

### 3.2 需要补齐上下文与记忆要求时
- 按需追加：`module-01` ~ `module-04`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
