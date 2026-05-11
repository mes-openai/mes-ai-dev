# 待更新服务/模块

## 待更新服务/模块

### 后端服务
- xxx-service：新增API、修改Service
- yyy-service：新增Entity

### 前端模块
- xxx-module：新增页面
- yyy-module：修改组件
```

**Step Gate A**：变更清单读取不完整或待更新服务/模块识别错误 → 打回步骤1重做，不得进入后端服务索引更新。

### 步骤2：更新后端服务索引

#### 新增服务处理

若变更清单中有新增服务，创建新的服务目录，并生成 `index.md`、`detail.md`、`file-summaries.md`：

```markdown
# service-[服务名]/index.md
