# cross-stage 阶段全局约束库

## 一、使用说明

1. 本文件记录跨阶段已稳定成立的统一约束

---

## 二、约束条目

### CON-CROSS-G-001 每阶段必须消费上一阶段 handoff

- 阶段：cross-stage
- 类型：constraint
- 状态：active
- 严重级别：high
- 触发条件：
  - 任意阶段开始前
- 必须动作：
  - 默认读取上一阶段 OpenSpec 主交接文档
  - 读取当前阶段适用的全局坑点/约束
- 禁止动作：
  - 跳过上一阶段交接直接开始新阶段

### CON-CROSS-G-002 active pitfall / active blocker 不得无说明跨阶段消失

- 阶段：cross-stage
- 类型：constraint
- 状态：active
- 严重级别：high
- 触发条件：
  - 阶段退出、阶段交接、handover 生成时
- 必须动作：
  - 说明 active pitfall / blocker 的当前状态、转移条件与后补动作
- 禁止动作：
  - 让风险、blocker、未闭合项在交接中消失
