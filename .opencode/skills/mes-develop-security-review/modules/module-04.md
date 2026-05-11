# 执行步骤（2/2）

### 7. 接口鉴权检查
检查Controller类：

**检查项**：
- 是否有统一的认证token校验机制
- 公开接口是否明确标注（如@Anonymous）
- 接口是否有防刷机制（限流）
- 登录状态是否正确校验

**风险等级**：
- **高**：无认证的敏感接口
- **中**：缺少限流机制
- **低**：公开接口标注不明确

### 8. 文件上传安全检查（如有文件上传功能）
检查相关代码：

**检查项**：
- 是否限制文件类型（白名单）
- 是否限制文件大小
- 是否校验文件内容（防止恶意文件）
- 文件名是否随机化（防止路径遍历）
- 存储路径是否安全（不在Web根目录）

**风险等级**：
- **高**：无任何限制的文件上传
- **中**：缺少文件内容校验
- **低**：文件名未随机化

### 9. CSRF防护检查
检查前端和后端：

**检查项**：
- 表单提交是否有CSRF Token
- 重要操作是否要求二次确认
- 是否校验请求来源（Referer）
- Cookie是否设置SameSite属性

**风险等级**：
- **高**：无CSRF防护的重要操作
- **中**：缺少二次确认
- **低**：Referer校验不完整

**Step Gate B**：SQL注入/XSS/越权/敏感数据/鉴权/上传/CSRF 任一检查维度未完成或证据不足 → 打回步骤3-9重做，不得生成安全审查报告。

### 10. 生成安全审查报告
将审查结果写入：`mes-ai-dev/workspace/development/REQ-YYYYMMDD-XXX/security-review-report.md`

统一约束：
- 必须符合 `mes-ai-dev/knowledge/rules/governance/review-report-standard.md`
- 若需要套用模板落盘，再使用 `mes-ai-dev/templates/governance/detailed-review-report-template.md`
- 不得只输出安全问题表，必须补齐审查范围、审查依据、风险评估、整改闭环、证据路径和复审状态

**报告格式**：
```markdown
