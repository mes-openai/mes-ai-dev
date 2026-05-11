# code-map 消费分片

## 一、主要资产

| 文件 | 消费场景 |
|---|---|
| `backend-overview.md` | 第0层入口，定位涉及服务 |
| `frontend-overview.md` | 第0层入口，定位涉及模块 |
| `services/*/index.md` | 需求分析、设计 |
| `services/*/detail.md` | 设计、开发 |
| `services/*/file-summaries.md` | 开发精准定位 |
| `modules/*/index.md` | 需求分析、设计 |
| `modules/*/detail.md` | 设计、开发 |
| `business-flows.md` | 需求分析 |
| `ownership.md` | 需求分析 |
| `patterns.md` | 设计、开发 |
| `business-rules.md` | 分析、设计、开发 |
| `change-impact-memory.md` | 分析、设计、开发、测试 |
| `hot-services.md` / `hot-apis.md` / `hot-tables.md` | 大仓热点优先 |
| `legacy-debt.md` | 存量仓开发规避 |
| `test-assets.md` / `testability-matrix.md` / `e2e-chains.md` | 测试与验证规划 |
| `runtime.md` | 设计、开发、测试、交付 |

---

## 二、消费顺序

1. 先读 overview
2. 再读 index
3. 需要时再读 detail
4. 精准定位阶段再读 file-summaries
5. 最后才进入源码

---

## 三、强制边界

- 不得默认整份读取所有 service/module detail
- 大仓/超大仓下必须遵守 hot 层优先
- `business-rules.md` 应优先读取受影响规则分组，禁止用口头推断替代

---

## 四、默认不加载

- 与当前任务无关的 service/module detail
- 与当前范围无关的全局 patterns / ownership 全文
