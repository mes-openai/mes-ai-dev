# develop 阶段全局约束库

## 一、使用说明

1. 本文件记录开发阶段已稳定成立的执行约束与禁止事项

---

## 二、约束条目

### CON-DEVELOP-G-001 开发前必须消费设计 handoff 和记忆

- 阶段：develop
- 类型：constraint
- 状态：active
- 严重级别：high
- 触发条件：
  - 所有正式开发工作单元
- 必须动作：
  - 读取 `designs/.../design.md`
  - 读取 develop 与 cross-stage 全局坑点/约束
- 禁止动作：
  - 跳过 handoff 直接按设计文档或个人理解开始实现
