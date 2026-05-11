# mes-init-scan-hotspots 索引

> 标题：高频入口知识层扫描
> 描述：Scan high-frequency entry points: hot services, hot APIs, hot tables. Trigger: hotspot, high frequency, hot services, hot apis, hot tables
> 本索引只负责模块导航与使用优先级；目录职责、读取顺序与消费边界统一遵循骨架治理文档。

## 一、使用提醒
- 先读 `SKILL.md`，再进入当前任务命中的核心模块。
- 高频入口扫描主线优先读取执行步骤、输入、输出与约束模块。
- 角色定位与触发条件模块仅在当前任务需要时进入。

## 二、核心模块地图
| 顺序 | 文件 | 优先级 | 用途 |
|---|---|---|---|
| 1 | `modules/module-03.md` | 必读 | 执行步骤主线（上半段）。 |
| 2 | `modules/module-04.md` | 必读 | 执行步骤主线（下半段）。 |
| 3 | `modules/module-05.md` | 必读 | 输入要求。 |
| 4 | `modules/module-06.md` | 必读 | 输出要求。 |
| 5 | `modules/module-07.md` | 必读 | 约束规则。 |
| 6 | `modules/module-01.md` | 按需 | 角色定位。 |
| 7 | `modules/module-02.md` | 按需 | 触发条件。 |

## 三、推荐最小读取集合

### 3.1 常规高频入口扫描
- `module-03` → `module-04` → `module-05` → `module-06` → `module-07`

### 3.2 需要补齐使用边界时
- 按需追加：`module-01`、`module-02`

## 四、评测入口
- 触发评测：`evals/trigger/evals.json`
- 能力数据集：`evals/capability/dataset.json`
- 核心能力用例：`evals/capability/core-flow/evals.json`

## 五、相关治理入口
- Skill 结构治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Skill 消费治理：`../../../mes-ai-dev/knowledge/rules/governance/skill-consumption-standard.md`
