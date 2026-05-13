# dependency-graph 消费分片

## 一、主要资产

| 文件 | 消费场景 |
|---|---|
| `service-dependencies.md` | 服务间调用关系、全局依赖汇总 |
| `api-registry.md` | API 索引与按服务级片段定位 |
| `database-registry.md` | 数据库注册表、全局数据库汇总 |
| `frontend-backend-map.md` | 前后端映射、联动验证 |

---

## 二、消费规则

1. `service-dependencies.md` 优先读摘要，再按范围追溯
2. `api-registry.md` 只读全局索引；完整 API 明细必须按服务级片段按需加载
3. `database-registry.md` 用于确认库/Schema/表归属与影响范围
4. `frontend-backend-map.md` 用于联动需求、设计与测试判断

---

## 三、默认不加载

- 与当前阶段无关的 registry 细节正文
- 为了“保险起见”整份读取所有 API 明细
