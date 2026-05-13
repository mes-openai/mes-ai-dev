# 初始化状态片段说明

## 目的

本目录用于存放初始化阶段的 scope 级状态片段，避免多个 session 并发直接覆盖 `state.yaml`。

## 使用规则

- `state.yaml` 仍是唯一已合并机器事实源
- 初始化阶段运行中状态先写入本目录
- 片段文件按 scope 命名，例如：
  - `repo-mes-production.yaml`
  - `module-production-management.yaml`
  - `schema-mes_main.yaml`
- `/mes-init-project` 全仓模式在最终收拢阶段串行合并这些片段
- `/mes-init-converge` 负责单仓/定向初始化后的片段合并
- 下游阶段不得直接消费本目录内容

## 推荐字段

```yaml
scope_type: repo
scope_name: mes-production
command: mes-init-project
status: running
coverage_delta: {}
checkpoint:
  current_phase: phase-3
pending_shared_files: []
updated_at: "2026-04-14T00:00:00+08:00"
```
