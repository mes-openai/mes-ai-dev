# mes-init-verify-e2e-chain 索引

> 标题：端到端业务链路验证 Skill
> 描述：Verify end-to-end business chains from UI to database. Trigger: e2e chain, end-to-end, business chain verification
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 端到端链路验证主线优先读取执行步骤、输入、输出、约束与审核模块。
- 验证概要与链路详情模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤。 |
| 2 | `modules/module-06.md` | 必读 | 输入要求。 |
| 3 | `modules/module-07.md` | 必读 | 输出要求。 |
| 4 | `modules/module-08.md` | 必读 | 约束规则。 |
| 5 | `modules/module-09.md` | 必读 | 审核要点。 |
| 6 | `modules/module-01.md` | 按需 | 角色定位。 |
| 7 | `modules/module-02.md` | 按需 | 何时使用。 |
| 8 | `modules/module-04.md` | 按需 | 验证概要。 |
| 9 | `modules/module-05.md` | 按需 | 链路详情。 |

## 三、推荐最小读取集合

### 3.1 常规端到端链路验证
- `module-03` → `module-06` → `module-07` → `module-08` → `module-09`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

### 3.3 需要形成验证摘要与链路明细时
- 按需追加：`module-04`、`module-05`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
