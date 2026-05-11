# 收敛状态消费分片

## 一、状态与消费边界

| convergence 状态 | 可消费资产 | 仅可参考资产 | 禁止消费资产 | 输出约束 |
|---|---|---|---|---|
| completed | 全局 overview、全局 dependency graph、全局 hot 层、全局 ownership / patterns / business-flows、reference 聚合文件 | 无 | 无 | 可输出全局统一结论 |
| pending | 局部 service/module index/detail、局部 file-summaries、局部 database-index、对应 scope fragments | 未确认收敛的候选聚合结果 | 任何依赖全局可信基线的共享结论 | 必须标注局部视角 |
| failed | 可证实的局部原始资产 | 极少且不得作正式结论依据 | 所有全局共享聚合结果 | 不得进入依赖全局视角的阶段结论 |
| partial / local-only | 指定 scope 下局部资产 | 相关局部候选结果 | 全局共享结论 | 只能输出 scope 内结论 |

---

## 二、补充规则

1. 若全局知识被标记为 dirty，即使 convergence 为 `completed`，仍需额外检查当前消费资产是否受影响
2. 若当前任务要求跨服务统一判断，则 `pending`、`failed`、`partial / local-only` 均不得产出全局统一结论
3. 若当前任务只是单服务修复或定向验证，可在 `pending` 或 `partial / local-only` 下按局部或降级口径推进，但必须显式记录范围与风险

---

## 三、默认不加载

- 与当前任务无关的全局收敛补充说明
- 为了保险起见整份复读历史收敛状态正文
