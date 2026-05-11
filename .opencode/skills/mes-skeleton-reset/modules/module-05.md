# 执行步骤（3/3）

### Step 5: 执行刷新记录清理

```bash
# 保留 skeleton-change-log.md 和 README.md
# 清空其他刷新审查报告
cd workspace/refresh/
# 删除所有 skeleton-change-review-* 文件
rm -f skeleton-change-review-*.md
# 删除 archive 目录（保留 README）
rm -rf archive/*.md
```

确保保留：
- `workspace/refresh/skeleton-change-log.md`
- `workspace/refresh/README.md`
- `workspace/refresh/archive/README.md`（如有）

**Step Gate E**：刷新记录清理不完整或保留文件被误删 → 打回步骤5重做，不得进入状态追踪器重置。

### Step 6: 重置状态追踪器

将 `workspace/status-tracker.md` 重置为初始模板：

```markdown
# 需求状态追踪器

> 本文件用于追踪所有需求的阶段进度、门禁结论与退回记录。
> 更新协议见：`knowledge/reference/status-tracker-governance.md`

---
