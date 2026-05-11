# 表列表

## 表列表

### t_user（用户表）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 用户ID |
| username | VARCHAR(50) | NOT NULL, UNIQUE | 用户名 |
| password | VARCHAR(100) | NOT NULL | 密码 |
| email | VARCHAR(100) | NULL | 邮箱 |
| phone | VARCHAR(20) | NULL | 手机号 |
| status | TINYINT | DEFAULT 1 | 状态（1正常 0禁用） |
| created_time | DATETIME | DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_time | DATETIME | ON UPDATE CURRENT_TIMESTAMP | 更新时间 |

**索引**：
- idx_username (username)
- idx_phone (phone)

**表注释**：存储系统用户信息

### t_role（角色表）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | BIGINT | PK, AUTO_INCREMENT | 角色ID |
| role_name | VARCHAR(50) | NOT NULL | 角色名称 |
| role_code | VARCHAR(50) | NOT NULL, UNIQUE | 角色编码 |

**表注释**：存储角色信息
