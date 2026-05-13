# 执行步骤（1/2）

## 执行步骤

### 1. 输出执行计划
在执行前，必须输出本次计划：
```
本次执行计划：
目标：审查所有开发产出的代码质量
步骤：
  1. 读取任务计划和设计文档
  2. 核对 TDD 用例计划与用户确认结论
  3. 进行编译与测试验证
  4. 读取所有开发的代码文件
  5. 进行代码规范审查
  6. 进行逻辑正确性审查
  7. 进行一致性审查
  8. 进行完整性审查
  9. 进行安全性审查
  10. 进行性能审查
  11. 使用自审模板生成审查报告，并按需追加设计偏差记录
 预期产出：self-review-report.md（详细审查报告）
风险：审查遗漏、问题识别不准确
```

### 步骤0：编译验证（前置条件）

在代码审核之前，先验证代码是否能编译通过。

并且在进入六维审查前，必须先完成以下 TDD 闭环核对：
1. `test-cases.md` 是否已存在
2. 是否记录用户补充区与用户确认结论
3. 本轮新生成测试用例是否全部通过
4. 本轮生成/修改并纳入验证范围的行覆盖率、分支覆盖率、方法覆盖率是否均达到 100%

**后端验证**：
1. 检查生成的 Java 文件是否存在语法错误（括号匹配、分号、import 完整性）
2. 检查类名与文件名是否一致
3. 检查包声明是否与目录路径匹配
4. 检查引用的类是否存在于项目中（Entity、DTO、Service 间的引用）

**前端验证**：
1. 检查 Vue 文件的 `<template>`、`<script>`、`<style>` 标签是否闭合
2. 检查 import 路径是否存在
3. 检查 API 调用路径是否与后端 Controller 匹配
4. 检查组件引用是否已注册

**注意**：由于项目环境可能无法直接执行 `mvn compile` 或 `npm run build`，本步骤以静态分析为主。若项目环境支持编译命令，则优先执行实际编译。

**编译失败处理**：
- 编译错误 → 修复后重新验证（最多 2 次）
- 修复失败 → 在审核报告中标记为“编译不通过”，不进入后续审核

**Step Gate A**：编译验证不通过、TDD 闭环核对不通过或未形成明确结论 → 打回步骤0重做，不得进入任务/设计读取与六维审查。

### 2. 读取任务计划和设计文档
按顺序读取：
1. `mes-ai-dev/workspace/development/{REQ-ID}/tasks.md` - OpenSpec 开发任务主文档
2. `mes-ai-dev/workspace/designs/{REQ-ID}/design.md` - OpenSpec 详细设计主文档
3. `mes-ai-dev/workspace/designs/{REQ-ID}/api-design.md` - API设计
4. `mes-ai-dev/workspace/designs/{REQ-ID}/database-design.md` - 数据库设计
5. `mes-ai-dev/workspace/testing/{REQ-ID}/test-cases.md` - TDD 用例计划与用户确认结论

### 3. 读取所有开发的代码文件
根据任务计划，读取所有已完成的代码文件：
- 数据库脚本：`mes-ai-dev/workspace/development/{REQ-ID}/database/`
- 后端代码：`jalor/service-xxx/src/main/java/com/jalor/xxx/`
- 前端代码：`web/module-xxx/src/`

**Step Gate B**：审查范围不完整、代码文件遗漏或设计基线缺失 → 打回步骤2-3重做，不得进入六维审查。
