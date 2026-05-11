# deliver 阶段全局约束库

## 一、使用说明

1. 本文件记录交付阶段已稳定成立的执行约束

---

## 二、约束条目

### CON-DELIVER-G-001 交付前必须核对 active blocker 与 active risk

- 阶段：deliver
- 类型：constraint
- 状态：active
- 严重级别：high
- 触发条件：
  - 所有交付交接、发布说明、handover 输出场景
- 必须动作：
  - 核对 testing handoff
  - 核对 active blocker / active risk / active pitfall
  - 将未闭合项显式写入交付边界说明
- 禁止动作：
  - 以“已发布”替代“已闭环交付”
