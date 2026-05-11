# 影响范围分析

## 影响范围分析

### 代码地图影响

| 服务/模块 | 变更类型 | 需更新内容 |
|----------|----------|----------|
| xxx-service | 新增API | 更新 `service-xxx/index.md` 或 `service-xxx/detail.md` |
| xxx-module | 页面变更 | 更新 `module-xxx/index.md` 或 `module-xxx/detail.md` |

### 依赖关系影响

| 服务 | 变更类型 | 需更新内容 |
|------|----------|----------|
| xxx-service | 新增依赖 | 更新service-dependencies.md |
| xxx-service | 新增API | 更新api-registry.md |

### 数据库影响

| Schema | 变更类型 | 需更新内容 |
|--------|----------|----------|
| xxx_schema | 新增表 | 更新database-index |

### 前后端映射影响

| 前端模块 | 后端服务 | 变更类型 |
|----------|----------|----------|
| xxx-module | xxx-service | 新增API调用 |
```

### 步骤5：生成刷新计划

```markdown
