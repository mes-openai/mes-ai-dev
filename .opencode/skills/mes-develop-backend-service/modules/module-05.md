# 真实性优先要求

## 真实性优先要求
- 所有包名、import、异常类、分页对象、返回包装、Converter、校验器、用户上下文工具类都必须先从目标服务真实代码中确认，再写入实现。
- 不得把模板中的 `BusinessException`、`PageVO`、`Converter`、`RestServiceClient`、`getCurrentUser()`、`validateCreateParam()` 等示例名当作项目事实直接落代码。
- 若同名能力在目标仓中不存在，必须改用真实已有实现，或显式回流 design 补充设计结论，不得直接臆造方法和依赖。
