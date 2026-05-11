# database-index 消费分片

## 一、主要资产

| 文件 | 消费场景 | 强制性 |
|---|---|---|
| `schema-xxx/index.md` | Schema 基础认知、风险画像 | 必读 |
| `schema-xxx/tables.md` | 表结构明细、核心表识别 | 按需读取 |
| `schema-xxx/relations.md` | 表关系、回归影响分析 | 按需读取 |

---

## 二、消费规则

1. `index.md` 是所有 Schema 的标准消费入口，不得缺失
2. `tables.md` 与 `relations.md` 属于深化消费对象，不要求基础建图阶段默认全量生成
3. 若未生成深化文件，`index.md` 必须明确记录当前知识边界与未覆盖范围

---

## 三、默认不加载

- 与当前任务无关的 Schema 深化明细
- 所有 Schema 的全量表结构与关系正文
