# 输入依赖

## 输入依赖

| 输入项 | 路径 | 说明 |
|--------|------|------|
| 代码仓库 | `jalor/` 和 `web/` | 后端和前端代码仓库 |
| 统一状态源 | `mes-ai-dev/knowledge/state/state.yaml` | 上次同步的时间戳和提交记录（state.yaml.sync） |
| 渲染规范 | `.opencode/references/mes-ai-reference/rules/state-rendering-spec.md` | sync 节点到摘要/兼容视图的维护规则 |

> 本 Skill 运行在知识库**已收拢的全局视角**下，允许直接消费全局 state / overview / registry 结果；不适用于初始化局部片段阶段。
