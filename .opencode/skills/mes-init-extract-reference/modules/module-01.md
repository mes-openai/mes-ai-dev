# 核心入口说明

## 功能说明

从代码仓提取业务参考知识，生成 `mes-ai-dev/knowledge/reference/` 目录下的 7 个参考文件，包括术语表、领域模型、数据字典、枚举注册表、错误码注册表、API 规范约定和编码规范。

> **初始化链路强制要求**：`terminology-glossary.md` 属于初始化/深化闭环必备产物。执行本 Skill 时不得跳过术语表生成，也不得以“后续需求分析再补充”替代当前产出。
> **共享文件并发要求**：本 Skill 产出的 mes-ai-dev/knowledge/reference/rules 文件均视为共享知识文件。多 session 或并行 Agent 不得直接同时覆盖最终文件，必须先写 scope 级局部结果或待汇总清单，再由主控串行合并。

## 角色定义

| 角色ID | 角色名称 | 说明 |
|--------|---------|------|
| ROLE_ADMIN | 系统管理员 | 全局管理权限 |
| ROLE_USER | 普通用户 | 基础操作权限 |
| [待补充] | [角色名] | [说明] |

## 命令权限映射

| 命令 | 需要角色 | 备注 |
|------|---------|------|
| /mes-analyze-requirement | ROLE_ADMIN, ROLE_BA | 需求分析权限 |
| /mes-design-detail | ROLE_ADMIN, ROLE_ARCHITECT | 设计权限 |
| /mes-develop-code | ROLE_ADMIN, ROLE_DEVELOPER | 开发权限 |
| /mes-test-verify | ROLE_ADMIN, ROLE_QA | 测试权限 |
| /mes-deliver-release | ROLE_ADMIN, ROLE_RELEASE | 发布权限 |
| [待补充] | [角色列表] | [备注] |

## 文件访问权限映射

| 文件路径 | 读权限角色 | 写权限角色 | 备注 |
|---------|-----------|-----------|------|
| workspace/requirements/ | ROLE_BA | ROLE_ADMIN | 需求文档 |
| workspace/designs/ | ROLE_ARCHITECT | ROLE_ADMIN | 设计文档 |
| workspace/development/ | ROLE_DEVELOPER | ROLE_ADMIN | 开发产出 |
| workspace/testing/ | ROLE_QA | ROLE_ADMIN | 测试产出 |
| workspace/delivery/ | ROLE_RELEASE | ROLE_ADMIN | 交付产出 |
| mes-ai-dev/knowledge/ | 所有角色 | ROLE_ADMIN | 知识库只读 |

## 置信度标注

- 角色定义：[置信度，如：从代码推断，中等置信度]
- 命令权限：[置信度，如：从业务流程推断，需人工确认]
- 文件权限：[置信度，如：从目录结构推断，需人工确认]
```

**Step Gate B**：参考知识文件或权限矩阵缺少来源依据、置信度或关键章节 → 打回步骤4-8重做，不得交付 reference 层使用。

**Step Gate B.5**：若输出统一响应/错误/认证/MQ 契约但缺少来源类型、来源定位或版本一致性说明，或将 `decompiled-jar` 默认标为高置信度 → 打回步骤6-8重做，不得交付 reference 层使用。
