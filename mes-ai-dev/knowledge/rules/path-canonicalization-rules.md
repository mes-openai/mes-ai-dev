---
title: 路径 canonical 化规则
doc_type: rule
load_strategy: explicit-only
phase_scope: []
trigger:
  - canonical-path
  - path-audit
cost_level: high
summary_first: true
default_allowed: false
parent_index: knowledge/reference/skeleton-loading-matrix.md
related_files:
  - knowledge/rules/path-canonicalization-rules-summary.md
  - knowledge/rules/state/state-rendering-index.md
---

# 路径 canonical 化规则

> 对应摘要：`knowledge/rules/path-canonicalization-rules-summary.md`
> 若当前任务不涉及路径、目录、状态片段、知识片段或路径审计，优先读取摘要并禁止默认整篇读取正文。
> **硬性规则**：违反本规则 = 缺陷。
> 本文件定义骨架内路径、目录、文件名的 canonical 命名与自动检查边界，用于阻断错误根目录、前缀缺失、命令名前缀混入等问题。

---

## 一、适用范围

本规则适用于以下骨架产物：

- 初始化阶段局部产物
- 状态片段
- 知识片段
- 服务 / 模块 / Schema 目录
- 索引示例、模板、门禁审查中引用的骨架路径

---

## 二、canonical 根目录规则

| 项目 | canonical 规则 | 禁止示例 |
|------|----------------|----------|
| 骨架根目录 | `mes-ai-dev/` | `mes-aiai-dev/`, `mesai-dev/`, `mes-aidev/` |

规则：
1. 所有骨架路径必须以 `mes-ai-dev/` 为根目录。
2. 根目录拼写变体一律视为错误路径。
3. 历史报告若保留旧路径表述，必须显式标注“历史口径说明”。

---

## 三、目录命名 canonical 规则

| 对象 | canonical 模式 | 禁止示例 |
|------|----------------|----------|
| 服务目录 | `knowledge/code-map/services/service-<service-name>/` | `services/<service-name>/`, `services/service<name>/` |
| 模块目录 | `knowledge/code-map/modules/module-<module-name>/` | `modules/<module-name>/` |
| Schema 目录 | `knowledge/database-index/schema-<schema-name>/` | `database-index/<schema-name>/` |

规则：
1. 服务目录必须带 `service-` 前缀。
2. 模块目录必须带 `module-` 前缀。
3. Schema 目录必须带 `schema-` 前缀。
4. 不允许同一类对象混用多种目录风格。

---

## 四、状态片段 canonical 规则

| 对象 | canonical 模式 | 禁止示例 |
|------|----------------|----------|
| 初始化状态片段 | `knowledge/state/fragments/<scope-type>-<scope-name>.yaml` | `messervice.yaml`, `mes-init-enrich-messervice.yaml` |

规则：
1. 片段文件名必须包含 scope 类型前缀，如 `repo-` / `module-` / `schema-` / `service-`。
2. 初始化命令名不得拼入片段文件名。
3. 自由别名或无法映射到 scope 的片段文件名一律视为违规。

---

## 五、知识片段 canonical 规则

| 片段类型 | canonical 模式 |
|----------|----------------|
| reference/terminology | `knowledge/fragments/reference/terminology/<scope>.md` |
| reference/domain-model | `knowledge/fragments/reference/domain-model/<scope>.md` |
| reference/data-dictionary | `knowledge/fragments/reference/data-dictionary/<scope>.md` |
| rules/api-conventions | `knowledge/fragments/rules/api-conventions/<scope>.md` |
| code-map/business-flows | `knowledge/fragments/code-map/business-flows/<scope>.md` |
| code-map/hot-apis | `knowledge/fragments/code-map/hot-apis/<scope>.md` |

规则：
1. 片段命名必须可映射到 `repo/module/schema/service/group` 等 scope。
2. 不允许混用旧式自由前缀与 canonical scope 命名。
3. 索引文件中引用的分片路径必须与 `knowledge/fragments/` 下实际 canonical 路径一致。

---

## 六、自动检查清单

在审查或自动化扫描时，至少检查以下项目：

1. 根目录是否为 `mes-ai-dev/`
2. 服务目录是否全部为 `service-<name>`
3. 模块目录是否全部为 `module-<name>`
4. Schema 目录是否全部为 `schema-<name>`
5. 状态片段是否全部为 `<scope-type>-<scope-name>.yaml`
6. 是否存在命令名前缀混入片段文件名
7. 索引示例与模板中引用的分片路径是否与 canonical 规则一致

---

## 七、与门禁/模板的关系

1. `phase-gates.md` 的 must-pass 项必须引用本规则。
2. 步骤级门禁与详细审查报告模板应显式包含“路径规范校验”检查项。
3. 历史报告不强制回改，但若保留旧路径口径，必须加“历史口径说明”。

---

## 八、证据与治理入口

- 门禁：`knowledge/reference/phase-gates.md`
- 状态规范：`knowledge/rules/state-rendering-spec.md`
- 模板导航：`mes-ai-dev/templates/template-index.md`
- 骨架日志：`mes-ai-dev/workspace/refresh/skeleton-change-log.md`
