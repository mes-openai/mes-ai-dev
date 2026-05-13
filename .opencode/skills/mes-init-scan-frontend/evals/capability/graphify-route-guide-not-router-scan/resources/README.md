# graphify-route-guide-not-router-scan 资源说明

本用例验证 `mes-init-scan-frontend` 对 graphify 页面关系导读的消费边界。

评测重点：

- graphify 只提供页面关系导读或候选线索。
- 确认页面与组件必须来自 `src/router/`、`src/views/`、`src/components/` 等真实文件扫描。
- 图谱导读不得替代前端 code-map 或路由扫描产物。
- 缺失 router/component 证据时必须标记候选或未知。
