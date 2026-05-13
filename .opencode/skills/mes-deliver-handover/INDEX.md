# mes-deliver-handover 索引

> 标题：交付交接 Skill
> 描述：Create handover document and deliverables checklist. Trigger: handover, delivery, turnover, knowledge transfer
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 交付交接主线优先读取输出增强、输入依赖、输出产物、执行步骤与异常处理模块。
- 项目概况、交付物清单、运维/回滚要点、后续待办、签署确认与检查清单模块仅在当前任务需要时进入。
- GitNexus 类代码知识图谱可用于核对交付对象、调用链、回滚影响面与知识刷新对象；graphify 类图谱可用于交接关系导读，但不得替代发布/验收/交接证据。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-04.md` | 必读 | 输出增强要求。 |
| 2 | `modules/module-05.md` | 必读 | 输入依赖。 |
| 3 | `modules/module-06.md` | 必读 | 输出产物。 |
| 4 | `modules/module-07.md` | 必读 | 执行步骤主线（上半段）。 |
| 5 | `modules/module-08.md` | 必读 | 执行步骤主线（下半段）。 |
| 6 | `modules/module-16.md` | 必读 | 异常处理。 |
| 7 | `modules/module-01.md` | 按需 | 角色定位。 |
| 8 | `modules/module-02.md` | 按需 | 触发条件。 |
| 9 | `modules/module-03.md` | 按需 | 阶段记忆消费要求。 |
| 10 | `modules/module-09.md` | 按需 | 项目概况。 |
| 11 | `modules/module-10.md` | 按需 | 交付物清单。 |
| 12 | `modules/module-11.md` | 按需 | 运维要点。 |
| 13 | `modules/module-12.md` | 按需 | 回滚操作指南。 |
| 14 | `modules/module-13.md` | 按需 | 后续待办。 |
| 15 | `modules/module-14.md` | 按需 | 签署确认。 |
| 16 | `modules/module-15.md` | 按需 | 审核检查清单。 |

## 三、推荐最小读取集合

### 3.1 常规交付交接
- `module-04` → `module-05` → `module-06` → `module-07` → `module-08` → `module-16`

### 3.2 需要补齐边界与记忆来源时
- 按需追加：`module-01`、`module-02`、`module-03`

### 3.3 需要形成交接配套资料时
- 按需追加：`module-09`、`module-10`、`module-11`、`module-12`、`module-13`、`module-14`、`module-15`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`.opencode/references/mes-ai-reference/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
