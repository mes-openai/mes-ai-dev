# 执行步骤（2/3）

### 5. 路由设计

设计前端路由结构：

#### 5.1 路由配置规范
- 路由路径命名规范
- 路由懒加载方式
- 路由守卫配置
- 嵌套路由设计

#### 5.2 路由配置示例

```javascript
const routes = [
  {
    path: '/user',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'detail/:id',
        name: 'UserDetail',
        component: () => import('@/views/user/detail'),
        meta: { title: '用户详情', hidden: true }
      }
    ]
  }
]
```

### 6. 组件设计

#### 6.1 组件划分原则
- **页面组件**：路由对应的页面级组件
- **业务组件**：可复用的业务逻辑组件
- **公共组件**：通用的UI组件（使用现有组件库）

#### 6.2 组件列表

为每个组件定义：

| 组件名称 | 类型 | 所属模块 | 功能说明 | 复用性 |
|----------|------|----------|----------|--------|
| UserTable | 业务组件 | 系统管理 | 用户列表表格 | 中 |
| UserForm | 业务组件 | 系统管理 | 用户表单 | 中 |
| ... | ... | ... | ... | ... |

#### 6.3 组件设计详情

对每个组件进行详细设计：

**组件名称：[组件名]**

**Props定义**
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| userId | Number | 否 | - | 用户ID |
| mode | String | 否 | 'view' | 模式：view/edit/add |

**Events定义**
| 事件名 | 参数 | 说明 |
|--------|------|------|
| submit | formData | 表单提交 |
| cancel | - | 取消操作 |

**Slots定义**
| 插槽名 | 说明 |
|--------|------|
| header | 头部内容 |
| footer | 底部内容 |

**Step Gate B**：页面结构、路由或组件设计缺少关键信息 → 打回步骤3-6重做，不得进入数据流与交互流程设计。
