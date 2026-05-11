---
description: "团队接入引导，展示框架使用流程和角色职责"
---
# mes-onboard-team

## 功能说明

引导新团队成员了解 MES-AI-DEV 框架的使用方式。展示各角色的职责、Command 速查表和阶段交接规则。不执行任何开发操作，仅展示指南信息。

## 使用方式

```
/onboard
```

**适用场景**：
- 新团队成员加入，需要了解框架使用方式
- 团队首次使用框架，需要快速上手
- 回顾框架使用规范和角色职责

**前置条件**：无

**预期耗时**：5分钟（阅读时间）

**步骤级强制门禁**：每个步骤的产出在进入下一步骤前，必须先执行步骤级门禁审查；未通过时当前步骤打回重做，不得将未通过结果注入下一步骤。

## 执行步骤

### 步骤1：读取接入规范

1. 读取 `mes-ai-dev/knowledge/reference/team-onboarding-guide.md`
2. 提取角色职责、交接规则和 Command 速查表

**Step Gate A**：接入规范未读取完整或提取结果不可消费 → 打回步骤1重做

### 步骤2：检查框架状态

1. 检查知识库是否已初始化（`knowledge/code-map/backend-overview.md` 是否存在）
2. 如未初始化 → 提示先执行 `/mes-init-project`
3. 如已初始化 → 显示当前知识库状态摘要

**Step Gate B**：状态判断不准确或建议错误 → 打回步骤2重做

### 步骤3：输出定制化引导

根据当前状态输出引导信息：

**Step Gate C**：引导内容与当前状态不一致 → 打回步骤3重做

**未初始化状态**：
```
📋 MES-AI-DEV 框架引导
========================

⚠️ 知识库尚未初始化

首次使用请执行以下步骤：
1. 确认代码仓已就位（jalor/, web/, dbscript/）
2. 执行 /mes-init-project 生成知识库
3. 知识库验证通过后即可使用

详见：knowledge/reference/team-onboarding-guide.md
```

**已初始化状态**：
```
📋 MES-AI-DEV 框架引导
========================

✅ 知识库已初始化

## Command 速查表

| 命令 | 用途 | 前置条件 |
|------|------|---------|
| /mes-analyze-requirement | 需求分析 | 知识库已初始化 |
| /mes-design-detail | 详细设计 | 需求分析完成 |
| /mes-develop-code | 代码开发 | 设计完成 |
| /mes-test-verify | 测试验证 | 开发完成 |
| /deliver | 发布交付 | 测试通过 |
| /mes-refresh-knowledge | 更新知识库 | 代码仓有变更 |

## 标准使用流程

1. 业务团队提交需求 → /mes-analyze-requirement
2. 设计团队审核设计 → /mes-design-detail
3. 开发团队审查代码 → /mes-develop-code
4. 测试团队确认测试 → /mes-test-verify
5. 运维团队执行部署 → /deliver

## 各角色职责

- 业务团队：提供需求输入，确认需求规格
- 设计团队：确认技术方案，审核设计文档
- 开发团队：代码审查，确认开发产出
- 测试团队：审核测试用例，确认测试结果
- 运维团队：审核部署计划，执行部署

详见：knowledge/reference/team-onboarding-guide.md
```

### 步骤4：提示下一步

根据用户角色给出建议：
- 产品经理 → "建议先准备需求文档，然后执行 /mes-analyze-requirement"
- 开发工程师 → "建议先确认知识库已初始化，等待需求分析完成后执行 /mes-develop-code"
- 测试工程师 → "建议等待开发完成后执行 /mes-test-verify"
- 运维工程师 → "建议了解部署流程，等待测试通过后执行 /deliver"

**Step Gate D**：角色建议不匹配或存在误导 → 打回步骤4重做

## 注意事项

1. 本命令仅展示信息，不执行任何修改操作
2. 引导信息基于当前框架状态动态生成
3. 首次使用建议先执行 `/mes-init-project` 初始化知识库
4. 详细规范请参考 `knowledge/reference/team-onboarding-guide.md`
