# graph-route-hint-not-api-change 资源说明

## 场景目的

验证 API registry 刷新不能由图谱关系导读直接触发，必须存在真实 API 变更证据。

## 输入证据

- `git diff`：仅有 service 内部实现或文档变化。
- `state.yaml`：API registry 当前有效。
- `refresh-hints.md`：未声明 API 契约变化。
- GitNexus / graphify：提示 Controller、route 或调用链可能相关。

## 期望边界

- 只有 Controller、route、API 注解、请求 / 响应契约、错误码等真实变化才能更新 API registry。
- 图谱只作为候选链路提示。
- 缺少真实证据时应记录不更新原因。
