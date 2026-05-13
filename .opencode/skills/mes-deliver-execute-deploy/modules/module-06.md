# 执行步骤（2/2）

### 8. 生成部署日志

1. 汇总所有步骤的执行记录
2. 生成部署日志文档
3. 写入 `workspace/delivery/{REQ-ID}/deploy-log.md`

**Step Gate D**：`deploy-log.md` 缺少执行记录、验证结果或回滚信息 → 打回步骤8重做，不得交付发布说明/交接阶段。
