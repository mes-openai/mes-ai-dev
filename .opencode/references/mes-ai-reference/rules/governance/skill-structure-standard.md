# Skill 结构治理标准

> 本文件定义骨架 Skill 的目录结构、强制文件、可选目录与维护约束。
> 仅在创建、迁移、重构、审核 Skill 目录结构时加载，不作为常驻总则全文展开。

---

## 一、适用范围

以下场景应读取本标准：

- 新建骨架 Skill。
- 将历史单文件 Skill 迁移为目录化结构。
- 审查 Skill 目录是否符合骨架规范。
- 重构 Skill 内容并拆分模块。

---

## 二、命名与根目录要求

- 所有骨架 Skill 必须使用 `mes-` 前缀。
- 命名格式：`mes-{动词}-{名词}`。
- 命名模式：`^mes-[a-z0-9]+(-[a-z0-9]+)*$`。
- Skill 根目录格式：`.opencode/skills/mes-{动词}-{名词}/`。

---

## 三、必需目录与文件

每个骨架 Skill 根目录下至少应包含：

- `SKILL.md`
- `INDEX.md`
- `modules/`
- `evals/`

说明：

- `SKILL.md`：仅承载元数据、触发条件、核心指令与最小执行约束。
- `INDEX.md`：目录导航页，用于说明模块分工、推荐读取顺序与使用提醒。
- `modules/`：第二层模块文档，承接详细执行规则。
- `evals/`：触发验证与能力回归资产，不得长期缺失。

---

## 四、正文体量与拆分原则

- `SKILL.md` 正文应控制在 200 行以内。
- `INDEX.md` 只做导航，不替代模块正文。
- `modules/*.md` 单文件应控制在 100 行以内；超出时继续拆分。
- 重构时不得改变原 Skill 的目标、边界与输出语义。

---

## 五、可选目录

以下目录可按需存在：

- `references/`
- `scripts/`
- `assets/`
- `examples/`
- `configuration/`

要求：

- 仅在确有内容时创建。
- 不得为了形式制造空壳目录。
- 可选目录不应取代 `modules/` 承载核心规则。

---

## 六、evals 约束

`evals/` 至少应包含以下结构：

- `trigger/evals.json`
- `capability/dataset.json`
- `capability/{eval-name}/evals.json`

补充要求：

- `compare.json` 可按需提供。
- 若 Skill 已进入正式使用，`evals/` 不得长期缺失。
- 迁移 Skill 时应同步迁移对应 evals 资产。

---

## 七、禁止事项

- 不得将目录化 Skill 回退为单文件 Skill。
- 不得把全部执行细则重新堆回 `SKILL.md`。
- 不得在没有目录职责说明的情况下随意新增层级。
- 不得删除 `evals/` 以规避触发验证与能力回归要求。

---

## 八、相关入口

- Skill 消费治理：`.opencode/references/mes-ai-reference/rules/governance/skill-consumption-standard.md`
- Governance 总索引：`.opencode/references/mes-ai-reference/rules/governance/index.md`
- 骨架修改治理：`.opencode/references/mes-ai-reference/rules/skeleton-change-governance.md`
