# test 阶段全局坑点库

## 一、使用说明

1. 本文件收录测试阶段高复用、高风险、可规避的坑点
2. 重点用于防止“测试通过假象”和证据链缺口

---

## 二、坑点条目

### MEM-TEST-G-001 只测 happy path，忽略高风险回归路径

- 阶段：test
- 类型：pitfall
- 状态：active
- 严重级别：high
- 触发条件：
  - 用例只覆盖主流程
  - 未结合历史 blocker、历史坑点和高风险对象做回归规划
- 问题表现：
  - P1 主流程通过，但上线后在边界、异常、回归场景失败
  - 测试报告无法解释未覆盖范围
- 根因：
  - 没有消费 development handoff 和记忆
  - 没有结合高风险表、共享表、热点服务与历史坑点规划测试
- 规避要求：
  - 必须显式说明未覆盖范围
  - 必须结合 active blocker、历史 pitfall 与高风险对象补充测试
  - 不得将门禁通过等同于验证完成
- 必检项：
  - `development/.../tasks.md`
  - `test-assets.md` / `testability-matrix.md`
  - 历史 test / cross-stage pitfall
- 来源与证据：
  - 来源需求：后续按实际 REQ 补充
  - 来源阶段：test
  - 证据路径：后续按实际 REQ 补充
