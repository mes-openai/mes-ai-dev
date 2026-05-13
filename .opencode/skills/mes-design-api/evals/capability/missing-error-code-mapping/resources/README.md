# mes-design-api / missing-error-code-mapping 资源说明

## 场景类型
- 风险场景

## 模拟输入
- 接口设计中没有错误码定义，但场景明确要求可追踪错误码。

## 建议证据片段
- `.opencode/references/mes-ai-reference/templates/reference/response-conventions-template.md`
- `jalor/src/main/java/.../controller/`
- `mes-ai-dev/knowledge/reference/error-code-registry.md`

## 观察点
- 该用例模拟的核心异常/风险是：接口设计中没有错误码定义，但场景明确要求可追踪错误码。

## 期望检查动作
- 是否先回到真实事实源而不是沿用模板默认假设
- 是否识别出必须阻断、待确认或可继续的边界
- 是否给出与 Skill 原意一致的处理结论

## 期望结论
- 应要求补齐错误码映射。

## 回归判定提示
- 若未能命中该风险并输出“应要求补齐错误码映射。”，则说明该 Skill 对该类问题的回归覆盖仍不足。

## 补充说明
- 当前用例目标：验证错误码完整性。
- 本文件提供的是“证据片段样例方向”，不是固定唯一答案；执行时仍应以真实仓内容为准。
