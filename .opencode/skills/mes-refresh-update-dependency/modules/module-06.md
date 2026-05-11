# 依赖更新分析

## 依赖更新分析

### 服务间依赖更新

| 变更服务 | 变更类型 | 影响分析 |
|----------|----------|----------|
| xxx-service | 新增API | 可能被其他服务调用 |
| xxx-service | 新增调用 | 增加对其他服务的依赖 |

### 前后端映射更新

| 变更模块 | 变更类型 | 影响分析 |
|----------|----------|----------|
| xxx-module | 新增页面 | 可能新增API调用 |
| xxx-module | 修改API调用 | 更新映射关系 |

### 数据库依赖更新

| 变更服务 | 变更类型 | 影响分析 |
|----------|----------|----------|
| xxx-service | 新增Entity | 可能新增表 |
| xxx-service | 修改Entity | 可能修改表结构 |
```

**Step Gate A**：依赖更新分析不完整或影响类型识别错误 → 打回步骤1重做，不得进入服务依赖更新。

### 步骤2：更新服务依赖关系

#### 分析新增服务依赖

读取服务的 `restService.properties` 和代码，识别服务间调用：

```properties
# restService.properties 示例
user.service.url=http://user-service
order.service.url=http://order-service
product.service.url=http://product-service
```

#### 分析代码中的服务调用

```java
// Controller或Service中的调用
@Autowired
private RestTemplate restTemplate;

// 调用其他服务
String result = restTemplate.getForObject("http://user-service/api/v1/users", String.class);
```

#### 更新服务依赖关系图

更新 `service-dependencies.md`：

```markdown
# 服务依赖关系图
