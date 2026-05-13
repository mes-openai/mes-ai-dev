# graphify-map-not-confirmed-api-route 资源说明

本用例验证 `mes-init-analyze-routes` 对前后端映射的事实源边界。

评测重点：

- 前后端映射必须来自真实 router、页面组件与 API 调用层。
- graphify 关系图只能辅助导航。
- 未在代码中发现的映射必须标记候选或未知。
- 不得让图谱关系污染 `frontend-backend-map` 或后续分析阶段。
