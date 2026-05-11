# Skill 消费治理标准

> 本文件定义目录化 Skill 的读取顺序、按需加载原则与消费边界。
> 仅在使用、审查、编排 Skill 时加载，不作为常驻总则全文展开。

---

## 一、适用范围

以下场景应读取本标准：

- 需要执行某个骨架 Skill。
- 需要审查 Skill 是否被正确消费。
- 需要控制 Skill 上下文预算与模块加载范围。
- 需要将 Skill 结果接入阶段执行链路。

---

## 二、默认读取顺序

目录化 Skill 的默认读取顺序为：

1. `SKILL.md`
2. `INDEX.md`
3. 命中的 `modules/*.md`
4. 按需进入 `references/`、`examples/`、`configuration/`、`evals/`

要求：

- 不得跳过 `SKILL.md` 直接进入模块正文。
- 不得以 `INDEX.md` 替代模块正文。
- 只有在当前任务命中某模块时，才进入对应 `modules/*.md`。

---

## 三、按需加载原则

- 不得把 `modules/` 下全部正文默认常驻。
- 应按当前任务范围精确加载命中模块。
- 多模块场景下，优先读取最小必要模块集合。
- 若模块已经足够支撑当前任务，不继续扩读无关参考内容。

---

## 四、消费边界

- `SKILL.md` 负责识别是否命中该 Skill。
- `INDEX.md` 负责导航与模块分工说明。
- `modules/` 负责详细执行约束与步骤规则。
- `references/` 用于背景资料与补充说明。
- `examples/` 仅作示例参考，不得覆盖正式规则。
- `configuration/` 用于配置化参数说明。
- `evals/` 用于触发验证与能力回归，不是可随意忽略的装饰目录。

---

## 五、上下文预算控制

- 先读索引，再决定是否深入模块。
- 命中多个模块时，按先主后辅顺序分批消费。
- 需要跨阶段协作时，将 Skill 结论收敛到交接文件，不依赖对话历史重复展开。
- 若已存在摘要产物，应优先消费摘要，再决定是否回读原文。

---

## 六、常见错误

- 把整个 Skill 目录一次性全读。
- 只读 `SKILL.md` 不读命中模块。
- 把示例文件当正式规则正文使用。
- 忽略 `evals/` 导致触发验证与回归链路缺失。

---

## 七、相关入口

- Skill 结构治理：`mes-ai-dev/knowledge/rules/governance/skill-structure-standard.md`
- Governance 总索引：`mes-ai-dev/knowledge/rules/governance/index.md`
- 知识消费入口：`mes-ai-dev/knowledge/reference/knowledge-consumption/index.md`
