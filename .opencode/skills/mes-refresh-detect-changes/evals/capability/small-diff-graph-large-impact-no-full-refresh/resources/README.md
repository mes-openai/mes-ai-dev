# small-diff-graph-large-impact-no-full-refresh 资源说明

## 场景目的

验证刷新检测在面对“小 diff + 图谱大影响面提示”时，仍以真实变更证据为刷新边界主依据。

## 输入证据

- `git diff`：仅包含一个配置默认值调整和一处 README 说明更新。
- `state.yaml`：知识库已初始化，无全局刷新标记。
- `refresh-hints.md`：仅提示检查对应服务配置说明。
- GitNexus / graphify：提示多个间接消费者或潜在相关知识节点。

## 期望边界

- 图谱只用于提示候选影响面。
- 不得因弱关联或间接关系触发无边界全量刷新。
- 刷新范围必须回到 diff、状态源、刷新提示和真实代码 / 配置变化。
