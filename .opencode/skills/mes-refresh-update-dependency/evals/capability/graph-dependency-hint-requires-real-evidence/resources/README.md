# graph-dependency-hint-requires-real-evidence 资源说明

## 场景目的

验证 dependency graph 刷新必须由真实依赖变化驱动，不能由 GitNexus / graphify 弱关联直接驱动。

## 输入证据

- `git diff`：仅日志、注释或非依赖逻辑变化。
- `state.yaml`：dependency graph 当前有效。
- GitNexus：提示弱关联或潜在下游服务。
- graphify：展示潜在服务链导读。

## 期望边界

- 真实依赖证据包括调用点、配置、依赖声明、API 消费、消息主题、DB / Schema 或契约变化。
- 缺少真实证据时不得修改确认依赖边。
- 图谱输出只能形成候选复核项。
