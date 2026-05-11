# 保留文件白名单

## 保留文件白名单

以下文件**绝对不清理**，即使在清理范围内：

| 文件路径 | 保留原因 |
|---------|---------|
| `workspace/refresh/skeleton-change-log.md` | 骨架治理历史记录 |
| `workspace/refresh/README.md` | 刷新目录说明 |
| `workspace/examples/` 整目录 | 示例文件供参考 |
| `workspace/locks/` 整目录（如有） | 锁文件用于并发控制 |
| `workspace/delivery/README.md`（如有） | 交付目录说明 |
| `knowledge/rules/` 整目录 | 骨架规则不应随项目迁移而清理 |
| `knowledge/reference/` 整目录 | 骨架参考不应随项目迁移而清理 |
| `templates/` 整目录 | 模板不应随项目迁移而清理 |
