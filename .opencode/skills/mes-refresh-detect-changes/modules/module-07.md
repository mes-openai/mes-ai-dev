# 变更文件清单（1/2）

## 变更文件清单

### 后端代码变更

#### 新增文件

| 文件路径 | 类型 | 所属服务 | 影响范围 |
|----------|------|----------|----------|
| jalor/xxx-service/src/main/java/com/xxx/... | Controller | xxx-service | API变更 |
| jalor/xxx-service/src/main/java/com/xxx/... | Service | xxx-service | 业务逻辑 |
| jalor/xxx-service/src/main/java/com/xxx/... | Entity | xxx-service | 数据模型 |

#### 修改文件

| 文件路径 | 类型 | 所属服务 | 变更内容 |
|----------|------|----------|----------|
| jalor/xxx-service/src/main/java/com/xxx/... | Controller | xxx-service | 新增接口 |
| jalor/xxx-service/src/main/resources/application.yml | Config | xxx-service | 配置更新 |

#### 删除文件

| 文件路径 | 类型 | 所属服务 | 影响范围 |
|----------|------|----------|----------|
| jalor/xxx-service/src/main/java/com/xxx/... | Service | xxx-service | 移除功能 |

---

### 前端代码变更

#### 新增文件

| 文件路径 | 类型 | 所属模块 | 影响范围 |
|----------|------|----------|----------|
| web/src/views/xxx/... | Page | xxx-module | 页面变更 |
| web/src/components/xxx/... | Component | 公共组件 | 组件变更 |
| web/src/api/xxx/... | API | xxx-module | 接口调用 |

#### 修改文件

| 文件路径 | 类型 | 所属模块 | 变更内容 |
|----------|------|----------|----------|
| web/src/views/xxx/... | Page | xxx-module | UI调整 |

#### 删除文件

| 文件路径 | 类型 | 所属模块 | 影响范围 |
|----------|------|----------|----------|
| web/src/views/xxx/... | Page | xxx-module | 移除页面 |
```

**Step Gate B**：代码仓库变更获取不完整或变更分类不准确 → 打回步骤2-3重做，不得进入影响范围识别。

### 步骤4：识别影响范围

分析变更对知识库的影响：
