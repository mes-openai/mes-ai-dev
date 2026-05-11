# mes-design-service-chain / missing-transaction-boundary 资源说明

## 场景类型
- 风险场景

## 模拟输入
- 服务调用链有多步写操作，但没有事务边界说明。

## 建议证据片段
- `workspace/REQ-xxx/deliverable/service-chain-design.md`
- `resource/restService.properties`
- `mes-ai-dev/knowledge/dependency-graph/`

## 观察点
- 该用例模拟的核心异常/风险是：服务调用链有多步写操作，但没有事务边界说明。

## 期望检查动作
- 是否先回到真实事实源而不是沿用模板默认假设
- 是否识别出必须阻断、待确认或可继续的边界
- 是否给出与 Skill 原意一致的处理结论

## 期望结论
- 应指出事务边界缺失。

## 回归判定提示
- 若未能命中该风险并输出“应指出事务边界缺失。”，则说明该 Skill 对该类问题的回归覆盖仍不足。

## 补充说明
- 当前用例目标：验证事务边界设计。
- 本文件提供的是“证据片段样例方向”，不是固定唯一答案；执行时仍应以真实仓内容为准。
