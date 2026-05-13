# analyze 阶段全局坑点库

## 一、使用说明

1. 本文件收录需求分析阶段高复用、高风险、可规避的坑点
2. 每条坑点必须能回溯到来源 REQ、来源阶段与证据路径

---

## 二、坑点条目

### MEM-ANALYZE-G-001 只看需求文本，不核对真实影响范围

- 阶段：analyze
- 类型：pitfall
- 状态：active
- 严重级别：high
- 触发条件：
  - 需求描述包含业务术语但未明确服务/模块边界
  - 直接从文本推断受影响仓与影响范围
- 问题表现：
  - 影响范围过窄或过宽
  - 漏掉历史迭代、依赖服务或数据库对象
- 根因：
  - 未先消费初始化索引、依赖图、业务链路和历史 handoff
- 规避要求：
  - 必须先核对真实服务/模块/Schema 归属
  - 必须结合 code-map、dependency graph、历史 REQ 交接记忆收敛范围
  - 迭代需求必须先做 requirement diff
- 必检项：
  - `backend-overview.md` / `frontend-overview.md`
  - `service-dependencies.md` / `frontend-backend-map.md`
  - 相关历史 REQ 的 `spec.md`
- 来源与证据：
  - 来源需求：后续按实际 REQ 补充
  - 来源阶段：analyze
  - 证据路径：后续按实际 REQ 补充
