# 图谱关系不替代 Provider 与接口契约选择 eval 资源说明

本 eval 验证 `mes-design-api` 对图谱辅助信息的消费边界。

- GitNexus：仅用于定位候选 Provider、接口消费者和调用关系。
- graphify：仅用于接口关系导读。
- 正式结论：Provider 选择、契约边界、请求响应、错误码和兼容性必须写入 `design.md` 或 `api-design.md`。
- 拦截重点：不得用图谱推断新增未确认 Provider、聚合接口、网关接口或平行 API。
