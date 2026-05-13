# cross-stage 阶段全局坑点库

## 一、使用说明

1. 本文件收录跨阶段重复出现、影响链路稳定性的坑点
2. 重点用于阶段交接、GSD 推进、未闭合项传递与历史经验升级

---

## 二、坑点条目

### MEM-CROSS-G-001 把“可继续推进”误判为“已完成”

- 阶段：cross-stage
- 类型：pitfall
- 状态：active
- 严重级别：high
- 触发条件：
  - 采用 GSD 模式推进
  - 存在 blocker 代偿动作
  - 阶段输出具备最小可继续结果但仍有未闭合项
- 问题表现：
  - 阶段报告写明可继续推进，但未写明未闭合项
  - 后续阶段误以为前阶段已完整完成
  - blocker、风险与后补动作在阶段切换时丢失
- 根因：
  - 混淆“Strict Exit”“GSD Continue Exit”“完整完成”
  - handoff 和记忆产物内容不足
- 规避要求：
  - 必须在当前阶段 OpenSpec 主交接文档中明确写明未闭合项和后补动作
  - 必须显式标记 `completed / partial / blocked` 状态
  - 不得用“可继续推进”替代“已完成”
- 必检项：
  - `mes-ai-dev/workspace/report/stage-output-report.md`
  - 当前阶段 OpenSpec 主交接文档
  - `mes-ai-dev/workspace/memory/blocker-log.md`
- 来源与证据：
  - 来源需求：后续按实际 REQ 补充
  - 来源阶段：cross-stage
  - 证据路径：后续按实际 REQ 补充
