# 规则依赖

## 规则依赖

- `.opencode/references/mes-ai-reference/rules/state-rendering-spec.md`：统一状态源与摘要/兼容视图的主从关系、一致性判断与冲突修复必须遵循

### 6. 内容格式合规性

抽样检查 3-5 个文件的内容格式：

| 检查项 | 规则 |
|--------|------|
| Markdown格式 | 标题层级正确，表格格式完整 |
| 中文内容 | 正文使用中文 |
| 无旧引用 | 不包含 `service-xxx.md`、`module-xxx.md`、`三层索引` 等旧模式 |
| 非空模板 | 文件不是空模板（行数>20） |

### 7. 生成质量报告

```markdown
# 知识库质量报告
