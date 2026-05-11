# 契约核验说明

- provider 真实返回：`RequestReturnVO<OrderDetailDTO>`
- 当前风险：实现默认按 `getData()` 直接解包，未核验项目对失败态、错误码、空值的约束
- 预期动作：先确认统一响应契约的真实读取方式，再决定 service 解包策略
