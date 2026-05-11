# mes-develop-backend-controller / nonexistent-service-call 资源说明

## 场景类型
- 风险场景

## 模拟输入
- Controller 调用了目标 service 中并不存在的方法。

## 建议证据片段
- `jalor/src/main/java/.../controller/`
- `jalor/src/main/java/.../dto/`
- `jalor/src/main/java/.../vo/`

## 观察点
- 该用例模拟的核心异常/风险是：Controller 调用了目标 service 中并不存在的方法。

## 期望检查动作
- 是否先回到真实事实源而不是沿用模板默认假设
- 是否识别出必须阻断、待确认或可继续的边界
- 是否给出与 Skill 原意一致的处理结论

## 期望结论
- 应阻断并要求核对真实 service 签名。

## 回归判定提示
- 若未能命中该风险并输出“应阻断并要求核对真实 service 签名。”，则说明该 Skill 对该类问题的回归覆盖仍不足。

## 补充说明
- 当前用例目标：验证服务签名真实性。
- 本文件提供的是“证据片段样例方向”，不是固定唯一答案；执行时仍应以真实仓内容为准。
