# deliver 阶段全局坑点库

## 一、使用说明

1. 本文件收录交付阶段高复用、高风险、可规避的坑点
2. 重点用于防止“可发布”和“已闭环交付”被混淆

---

## 二、坑点条目

### MEM-DELIVER-G-001 交付只交文件，不交风险与后补动作

- 阶段：deliver
- 类型：pitfall
- 状态：active
- 严重级别：high
- 触发条件：
  - 交付时只汇总产物，不汇总 active 风险、active pitfall、未闭合 blocker
- 问题表现：
  - handover 文档存在，但接手方无法判断风险与后补边界
  - 上线后问题无人追踪，交付状态被误判为完整闭环
- 根因：
  - 交付阶段未消费 testing handoff 和记忆
  - 交接文档只面向“交文件”，没有面向“交状态、交风险、交后补动作”
- 规避要求：
  - handover 必须包含 active 风险、active pitfall、未闭合 blocker、后补动作
  - 交付结论必须区分“已发布 / 已验收 / 已闭环”
  - 未闭合项必须显式列入交付边界说明
- 必检项：
  - `testing/.../test-report.md`
  - `delivery-scope.md`
  - `handover-doc.md`
- 来源与证据：
  - 来源需求：后续按实际 REQ 补充
  - 来源阶段：deliver
  - 证据路径：后续按实际 REQ 补充
