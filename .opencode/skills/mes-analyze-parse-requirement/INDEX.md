# mes-analyze-parse-requirement 索引

> 标题：需求解析
> 描述：Parse raw business requirement into structured elements. Trigger: requirement, business need, feature request
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再根据当前任务进入下表中的必读模块。
- 仅在命中对应场景时再进入按需模块，不默认全读。
- 若需要验证条件产物与触发链路，再进入 `evals/`。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-01.md` | 必读 | 核心入口说明，合并角色定位、使用时机与需求基础标识。 |
| 2 | `modules/module-03.md` | 必读 | 执行步骤主线（上半段）。 |
| 3 | `modules/module-04.md` | 必读 | 执行步骤主线（下半段）。 |
| 4 | `modules/module-05.md` | 必读 | 输入要求。 |
| 5 | `modules/module-06.md` | 必读 | 输出要求。 |
| 6 | `modules/module-18.md` | 必读 | 约束规则。 |
| 7 | `modules/module-19.md` | 必读 | 审核要点。 |
| 8 | `modules/module-21.md` | 必读 | exploration/proposal 条件产物触发、结构与收口要求。 |
| 9 | `modules/module-09.md` | 按需 | 业务背景。 |
| 10 | `modules/module-10.md` | 按需 | 功能描述。 |
| 11 | `modules/module-11.md` | 按需 | 业务规则。 |
| 12 | `modules/module-12.md` | 按需 | 用户角色。 |
| 13 | `modules/module-13.md` | 按需 | 业务流程。 |
| 14 | `modules/module-14.md` | 按需 | 非功能需求。 |
| 15 | `modules/module-15.md` | 按需 | 模糊点与待确认事项。 |
| 16 | `modules/module-16.md` | 按需 | 需求解析完成度。 |
| 17 | `modules/module-17.md` | 按需 | 下一步行动。 |
| 18 | `modules/module-20.md` | 按需 | 与其他 Skill 的协作。 |

## 三、推荐最小读取集合

### 3.1 基础解析
- `module-01` → `module-03` → `module-04` → `module-05` → `module-06` → `module-18` → `module-19`

### 3.2 需要补齐业务上下文时
- 在基础解析集合上按需追加：`module-09` ~ `module-14`

### 3.3 需要形成 exploration / proposal 条件产物时
- 在基础解析集合上追加：`module-21`

### 3.4 需要收口风险与后续动作时
- 按需追加：`module-15`、`module-16`、`module-17`、`module-20`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：按 `evals/capability/` 下对应子目录选择

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
