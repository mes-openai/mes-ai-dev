# 业务流程追踪报告模板

> 本模板用于需求分析阶段，追踪从前端页面到后端服务，再到数据库的完整调用链路。

---

## 一、追踪概述

- **需求编号**：REQ-YYYYMMDD-XXX
- **追踪范围**：[前端模块] + [后端服务]
- **调用层级**：前端页面 → API → Controller → Service → DAO → 数据库
- **涉及接口**：[N]个
- **涉及数据表**：[N]张

---

## 二、前端调用链路

### 2.1 页面组件
| 页面路径 | 组件名称 | 业务功能 | 触发事件 |
|---------|---------|---------|---------|
| `/module/page1` | [ComponentName] | [功能描述] | [事件说明] |
| `/module/page2` | [ComponentName] | [功能描述] | [事件说明] |

### 2.2 页面流程
```
用户进入[页面A] → 执行[操作1] → 触发[API调用A]
             → 执行[操作2] → 触发[API调用B]
```

### 2.3 API调用
| API方法 | 接口路径 | HTTP方法 | 后端服务 | 用途 |
|--------|---------|---------|---------|------|
| queryList | `/api/service/query` | POST | [服务名] | 查询列表 |
| saveData | `/api/service/save` | POST | [服务名] | 保存数据 |

### 2.4 请求 / 响应示例
```javascript
// API: /api/service/query
{
  "param1": "value1",
  "param2": "value2"
}
```

```javascript
{
  "code": 200,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100
  }
}
```

### 2.5 状态管理
| Store模块 | State字段 | 用途 | 更新时机 |
|----------|----------|------|---------|
| [module] | [field1] | [说明] | [时机] |

---

## 三、后端调用链路

### 3.1 Controller层
| Controller类 | 方法名 | 接口路径 | HTTP方法 | 用途 |
|-------------|-------|---------|---------|------|
| [ControllerName] | [methodName] | `/api/xxx` | POST | [说明] |

**代码位置：**
```
jalor/[service]/src/main/java/.../controller/[ControllerName].java
```

**入口逻辑：**
```java
@PostMapping("/xxx")
public Result methodName(@RequestBody Param param) {
    // 1. 参数校验
    // 2. 调用Service
    // 3. 返回结果
}
```

### 3.2 Service层
| Service接口 | 实现类 | 业务逻辑 |
|-----------|--------|---------|
| [ServiceName] | [ServiceImpl] | [业务说明] |

**代码位置：**
```
接口：jalor/[service]/src/main/java/.../service/[ServiceName].java
实现：jalor/[service]/src/main/java/.../service/impl/[ServiceImpl].java
```

**业务流程：**
```
[Service方法] 开始
    ↓
[步骤1]：参数校验/数据准备
    ↓
[步骤2]：调用[其他Service]/执行业务逻辑
    ↓
[步骤3]：调用DAO进行数据操作
    ↓
[步骤4]：返回结果/抛出异常
```

### 3.3 跨服务调用
```
[Service A] --调用--> [Service B].[方法]
    ↓
同步调用：[调用方式说明]
异步调用：MQ Topic/Queue: [名称]
```

### 3.4 DAO/Mapper层
| DAO接口 | Mapper文件 | 操作表 | SQL类型 |
|--------|-----------|-------|---------|
| [DaoName] | [Mapper.xml] | [表名] | SELECT/INSERT/UPDATE/DELETE |

**代码位置：**
```
接口：jalor/[service]/src/main/java/.../dao/[DaoName].java
Mapper：jalor/[service]/src/main/resources/mapper/[Mapper].xml
```

**SQL示例：**
```sql
SELECT field1, field2 FROM table_name WHERE condition = ?
INSERT INTO table_name (field1, field2) VALUES (?, ?)
UPDATE table_name SET field1 = ? WHERE id = ?
DELETE FROM table_name WHERE id = ?
```

---

## 四、数据库操作链路

### 4.1 数据表
| Schema | 表名 | 操作类型 | 用途 | 关联表 |
|--------|-----|---------|------|--------|
| [schema1] | [table1] | SELECT | 查询 | - |
| [schema1] | [table2] | INSERT | 新增 | table1.id |

### 4.2 表关联关系
```
[table1] --主键--> [table2.foreign_key]
    ↓
[table3] --外键--> [table1.id]
```

### 4.3 数据流向
```
用户输入数据 → [Service处理] → [表1插入]
                        ↓
                   [表2更新] ← 触发器/应用逻辑
```

---

## 五、完整调用链路图

### 5.1 主流程调用链
```
┌─────────────────────────────────────────────────────────────┐
│ 前端层                                                       │
│  [页面组件] → 用户点击按钮 → 触发事件                          │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ API调用层                                                    │
│  [API方法] → 构造请求参数 → HTTP POST /api/service/xxx       │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Controller层                                                │
│  [Controller.method()] → 参数校验 → 调用Service              │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ Service层                                                   │
│  [ServiceImpl.method()] → 业务逻辑处理                       │
│    ↓                                                        │
│  [调用其他Service] → [ServiceImpl.otherMethod()]             │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ DAO层                                                       │
│  [DAO.method()] → MyBatis Mapper → 执行SQL                   │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│ 数据库层                                                     │
│  [MySQL/Oracle] → INSERT/UPDATE/SELECT/DELETE               │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 分支流程调用链
**异常流程1：[场景描述]**
```
[Service层] → 检测异常条件 → 抛出[异常类] → Controller捕获 → 返回错误响应
```

**异常流程2：[场景描述]**
```
[Service层] → 调用[其他服务]失败 → 重试/降级 → 记录日志 → 返回默认值
```

---

## 六、关键代码位置汇总

### 6.1 前端代码
| 类型 | 文件路径 | 关键内容 |
|-----|---------|---------|
| 页面 | `web/[module]/src/views/[Page].vue` | [说明] |
| API | `web/[module]/src/api/[api].js` | [说明] |
| 路由 | `web/[module]/src/router/index.js` | [说明] |

### 6.2 后端代码
| 类型 | 文件路径 | 关键内容 |
|-----|---------|---------|
| Controller | `jalor/[service]/.../controller/[Controller].java` | [说明] |
| Service | `jalor/[service]/.../service/[Service].java` | [说明] |
| ServiceImpl | `jalor/[service]/.../service/impl/[ServiceImpl].java` | [说明] |
| DAO | `jalor/[service]/.../dao/[Dao].java` | [说明] |
| Mapper | `jalor/[service]/.../resources/mapper/[Mapper].xml` | [说明] |

---

## 七、追踪依据

### 7.1 知识库引用
- 前后端映射：`mes-ai-dev/knowledge/dependency-graph/frontend-backend-map.md`
- 服务依赖：`mes-ai-dev/knowledge/dependency-graph/service-dependencies.md`
- API注册：`mes-ai-dev/knowledge/dependency-graph/api-registry.md`

### 7.2 代码文件引用
- 前端文件：[列出读取的文件路径]
- 后端文件：[列出读取的文件路径]

---

## 八、追踪完成度检查

- [ ] 前端页面流程已追踪
- [ ] API调用关系已梳理
- [ ] Controller入口已定位
- [ ] Service业务逻辑已分析
- [ ] DAO数据操作已确认
- [ ] 数据库表操作已识别
- [ ] 跨服务调用已标注
- [ ] 异常流程已梳理
- [ ] 代码位置已汇总

---

## 九、风险提示

- **跨服务调用复杂**：[描述风险点]
- **事务边界不清晰**：[描述风险点]
- **数据一致性风险**：[描述风险点]
- **性能瓶颈点**：[描述风险点]
