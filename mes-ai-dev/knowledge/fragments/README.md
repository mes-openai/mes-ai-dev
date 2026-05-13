# 共享知识片段目录说明

> 本目录用于初始化/深化阶段的共享知识局部结果暂存。
> 这些片段**不直接作为下游消费事实源**，必须由主控 Agent 或 `/mes-init-converge` 串行收口后，才能写入 `.opencode/references/mes-ai-reference/reference/`、`.opencode/references/mes-ai-reference/rules/` 与 `knowledge/code-map/` 下的最终共享文件。

---

## 一、适用范围

以下共享知识文件在单仓、分批、多 session 初始化/深化场景下，不得直接写最终文件，必须先写片段：

- `mes-ai-dev/knowledge/reference/terminology-glossary.md`
- `mes-ai-dev/knowledge/reference/domain-model.md`
- `mes-ai-dev/knowledge/reference/data-dictionary.md`
- `mes-ai-dev/knowledge/reference/enum-registry.md`
- `mes-ai-dev/knowledge/reference/error-code-registry.md`
- `mes-ai-dev/knowledge/reference/permission-matrix.md`
- `mes-ai-dev/knowledge/rules/api-conventions.md`
- `mes-ai-dev/knowledge/rules/coding-standards.md`
- `knowledge/code-map/business-flows.md`
- `knowledge/code-map/ownership.md`
- `knowledge/code-map/patterns.md`
- `knowledge/code-map/legacy-debt.md`
- `knowledge/code-map/hot-services.md`
- `knowledge/code-map/hot-apis.md`
- `knowledge/code-map/hot-tables.md`

---

## 二、目录结构

```text
knowledge/fragments/
├── code-map/
│   ├── business-flows/
│   ├── ownership/
│   ├── patterns/
│   ├── legacy-debt/
│   ├── hot-services/
│   ├── hot-apis/
│   └── hot-tables/
├── reference/
│   ├── terminology/
│   ├── domain-model/
│   ├── data-dictionary/
│   ├── enum-registry/
│   ├── error-code/
│   └── permission-matrix/
└── rules/
    ├── api-conventions/
    └── coding-standards/
```

---

## 三、命名规范

片段文件必须按**知识类别 + 对象范围**命名，确保可追溯、可收口、可去重。

### reference 层示例

- `reference/terminology/service-mes-production.md`
- `reference/domain-model/service-mes-production.md`
- `reference/data-dictionary/schema-mes_main.md`
- `reference/enum-registry/service-mes-quality.md`
- `reference/error-code/service-mes-production.md`
- `reference/permission-matrix/repo-mes-production.md`

### rules 层示例

- `rules/api-conventions/repo-mes-production.md`
- `rules/coding-standards/repo-mes-quality.md`

### code-map 层示例

- `code-map/business-flows/service-mes-production.md`
- `code-map/ownership/service-mes-production.md`
- `code-map/patterns/repo-mes-production.md`
- `code-map/legacy-debt/repo-mes-production.md`
- `code-map/hot-services/repo-mes-production.md`
- `code-map/hot-apis/repo-mes-production.md`
- `code-map/hot-tables/schema-mes_main.md`

---

## 四、写入规则

1. 并行 Agent 与多 session 初始化/深化**只允许写片段**，不得直接覆盖最终共享文件。
2. 同一 scope 的片段命名必须稳定，禁止同一 session 使用多个别名命名同一对象。
3. 片段内容必须包含：结论、来源依据、置信度或差异说明（适用时）。
4. 片段若无法映射到具体 scope（repo/module/schema/service），不得进入收口流程。

---

## 五、收口规则

1. 仅主控 Agent 或 `/mes-init-converge` 可将片段合并到最终共享文件。
2. 收口前必须检查：
   - 命名是否可映射到 scope
   - 是否存在重复片段
   - 是否存在冲突条目
   - 是否满足最小可消费内容要求
3. 未收口前，片段不得被下游 analyze/design/develop 阶段直接消费。

---

## 六、与 state fragments 的区别

| 类型 | 路径 | 作用 | 是否可直接消费 |
|------|------|------|----------------|
| 状态片段 | `state/fragments/*.yaml` | 初始化状态暂存 | 否 |
| 知识片段 | `knowledge/fragments/**/*.md` | 共享知识局部结果、全局链路片段、热点候选结果暂存 | 否 |

两类片段都必须先经过主控串行合并，才能形成最终共享事实源或共享知识文件。
