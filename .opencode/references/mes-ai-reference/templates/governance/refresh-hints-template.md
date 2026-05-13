# 知识库刷新提示模板

> 本模板用于开发阶段完成后，生成知识库刷新提示，避免 `/mes-refresh-knowledge` 全局扫描。
> 输出至 `mes-ai-dev/workspace/development/{REQ-ID}/refresh-hints.md`。

---

## 基本信息

| 属性 | 值 |
|------|-----|
| 需求编号 | REQ-YYYYMMDD-XXX |
| 生成日期 | YYYY-MM-DD |
| 关联台账 | `impact-ledger.md` |

---

## 1. 变更点摘要

| 编号 | 变更点 | 变更类型 | 影响范围 |
|------|--------|---------|---------|
| CH-001 | [如：新增工单批量创建API] | 新增/修改/删除 | [服务名+模块名] |
| CH-002 | [如：修改work_order表新增priority列] | 新增/修改/删除 | [Schema+表名] |

---

## 2. 需要更新的 code-map

| 文件 | 更新原因 | 更新内容 |
|------|---------|---------|
| `code-map/services/service-xxx/index.md` | [原因] | [需更新的段落/章节] |
| `code-map/services/service-xxx/detail.md` | [原因] | [需更新的段落/章节] |
| `code-map/services/service-xxx/file-summaries.md` | [原因] | [新增/修改的文件摘要] |
| `code-map/modules/module-xxx/index.md` | [原因] | [需更新的段落/章节] |
| `code-map/backend-overview.md` | [如：新增了API，需更新API计数] | [更新内容] |
| `code-map/business-flows.md` | [如：链路变更] | [需更新的链路] |
| `code-map/ownership.md` | [如：实体归属变更] | [需更新的实体] |
| `code-map/patterns.md` | [如：新增了实现模式] | [需更新的模式] |

---

## 3. 需要更新的 dependency-graph

| 文件 | 更新原因 | 更新内容 |
|------|---------|---------|
| `dependency-graph/api-registry.md` | [如：新增API] | [新增的API注册信息] |
| `dependency-graph/service-dependencies.md` | [如：新增服务调用] | [新增的依赖关系] |
| `dependency-graph/database-registry.md` | [如：新增表/列] | [新增的表/列注册信息] |
| `dependency-graph/frontend-backend-map.md` | [如：前端新增调用] | [新增的映射关系] |

---

## 4. 需要更新的 database-index

| Schema | 表名 | 更新原因 | 更新内容 |
|--------|------|---------|---------|
| [schema] | [table] | [新增表/新增列/新增索引] | [具体更新内容] |

---

## 5. 需要更新的 reference

| 文件 | 更新原因 | 更新内容 |
|------|---------|---------|
| `reference/enum-registry.md` | [如：新增枚举值] | [新增的枚举定义] |
| `reference/data-dictionary.md` | [如：新增字段含义] | [新增的字段定义] |
| `reference/error-code-registry.md` | [如：新增错误码] | [新增的错误码] |

---

## 6. 无需更新的文件

> 以下文件经确认无需更新：

- `code-map/frontend-overview.md` — [原因：前端无变更]
- `code-map/runtime.md` — [原因：无定时任务/MQ/缓存变更]
- `code-map/test-assets.md` — [原因：无测试框架变更]

---

## 7. 刷新建议

### 7.1 优先级

| 优先级 | 文件 | 原因 |
|--------|------|------|
| 🔴 高 | [文件路径] | [原因] |
| 🟡 中 | [文件路径] | [原因] |
| 🟢 低 | [文件路径] | [原因] |

### 7.2 刷新方式

- **增量刷新**：[哪些文件只需追加/修改部分内容]
- **全量重新扫描**：[哪些文件需要重新扫描服务目录]

### 7.3 预估工作量

- 受影响文件数：[N]
- 预估刷新耗时：[如：5-10分钟]

---

## 处理规则

1. **开发完成必须生成**：本文件是开发阶段退出的必要产物
2. **`/mes-refresh-knowledge` 消费本文件**：刷新命令应优先读取 `refresh-hints.md`，按优先级定向刷新
3. **不依赖全局扫描**：本文件的目的是避免 `/mes-refresh-knowledge` 做全量扫描
4. **关联 impact-ledger**：本文件以 `impact-ledger.md` 的变更为基础生成
