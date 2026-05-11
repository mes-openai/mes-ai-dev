# mes-design-generate-doc 索引

> 标题：设计文档生成 Skill
> 描述：Generate complete design document. Trigger: design document, detailed design
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 设计文档生成主线优先读取执行步骤、输入、输出、约束与审核模块。
- 文档目录、需求概述、各分项设计、实施计划、附录与交接说明模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-15.md` | 必读 | 输入要求。 |
| 3 | `modules/module-16.md` | 必读 | 输出要求。 |
| 4 | `modules/module-17.md` | 必读 | 约束规则。 |
| 5 | `modules/module-18.md` | 必读 | 审核要点。 |
| 6 | `modules/module-01.md` ~ `modules/module-02.md` | 按需 | 角色定位、何时使用。 |
| 7 | `modules/module-04.md` ~ `modules/module-14.md` | 按需 | 文档信息、目录、需求概述、技术方案、数据库设计、API 设计、前端设计、服务调用链、实施计划与附录。 |
| 8 | `modules/module-19.md` | 按需 | 交接说明。 |

## 三、推荐最小读取集合

### 3.1 常规设计文档生成
- `module-03` → `module-15` → `module-16` → `module-17` → `module-18`

### 3.2 需要形成完整文档章节时
- 按需追加：`module-01`、`module-02`、`module-04` ~ `module-14`、`module-19`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
