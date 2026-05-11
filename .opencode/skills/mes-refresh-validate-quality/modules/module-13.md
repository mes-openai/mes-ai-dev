# 异常处理

## 异常处理

| 异常场景 | 处理方式 |
|---------|---------|
| 文件缺失 | 标记为错误，建议重新执行对应的 init/refresh Skill |
| 交叉引用不一致 | 标记为警告，以 detail.md 为准修正 index.md |
| 同步状态过期 | 标记为警告，建议执行 /mes-refresh-knowledge（更新 state.yaml.sync 与允许视图） |
| state.yaml sync 摘要格式错误 | 标记为错误，建议重新初始化或修复 state.yaml |
| 历史遗留文件口径冲突 | 标记为警告，建议按 `state-rendering-spec.md` 与 `knowledge-consumption-matrix.md` 统一修正文档口径 |
