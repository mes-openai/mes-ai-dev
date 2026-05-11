# mes-design-approach / no-comparison-options 资源说明

## 场景类型
- 风险场景

## 模拟输入
- 技术方案直接给结论，没有列出可比较的备选方案。

## 建议证据片段
- `workspace/REQ-xxx/deliverable/tech-approach.md`
- `mes-ai-dev/knowledge/dependency-graph/`
- `mes-ai-dev/knowledge/reference/`

## 观察点
- 该用例模拟的核心异常/风险是：技术方案直接给结论，没有列出可比较的备选方案。

## 期望检查动作
- 是否先回到真实事实源而不是沿用模板默认假设
- 是否识别出必须阻断、待确认或可继续的边界
- 是否给出与 Skill 原意一致的处理结论

## 期望结论
- 应要求补齐方案对比。

## 回归判定提示
- 若未能命中该风险并输出“应要求补齐方案对比。”，则说明该 Skill 对该类问题的回归覆盖仍不足。

## 补充说明
- 当前用例目标：验证方案对比完整性。
- 本文件提供的是“证据片段样例方向”，不是固定唯一答案；执行时仍应以真实仓内容为准。
