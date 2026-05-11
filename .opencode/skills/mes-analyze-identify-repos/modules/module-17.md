# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- `mes-analyze-parse-requirement` 输出：`raw-requirement.md`
- `mes-analyze-impact-scope` 输出：影响范围（追加在 raw-requirement.md）
- `mes-analyze-trace-flow` 输出：`business-flow-trace.md`

### 下游输出
- 追加内容到：`mes-ai-dev/workspace/requirements/REQ-YYYYMMDD-XXX/raw-requirement.md`
- 传递给：`mes-analyze-generate-spec`（需求规格生成）
- 传递给：`mes-design-approach`（设计方案）

### 文件交接约定
本Skill将仓库影响清单追加到 `raw-requirement.md`，后续Skill通过读取该文件获取仓库和Schema信息。
