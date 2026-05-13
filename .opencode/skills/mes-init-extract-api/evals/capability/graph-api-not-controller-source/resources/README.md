# graph-api-not-controller-source 资源说明

本用例验证 `mes-init-extract-api` 对 API registry 事实源的要求。

评测重点：

- 确认 API 必须来自 Controller、注解、路由定义或等价代码定义点。
- GitNexus/graphify 发现的接口只能作为候选。
- 候选接口不得进入正式 API registry。
- converge 前不得覆盖共享最终 `api-registry.md`。
