# 与其他Skill的协作

## 与其他Skill的协作

### 上游输入
- `mes-analyze-parse-requirement` 输出：`raw-requirement.md`
- `mes-analyze-impact-scope` 输出：影响范围（追加在 raw-requirement.md）
- `mes-analyze-trace-flow` 输出：`business-flow-trace.md`
- `mes-analyze-identify-repos` 输出：仓库清单（追加在 raw-requirement.md）

### 下游输出
- 输出文件：`mes-ai-dev/workspace/requirements/{REQ-ID}/spec.md`
- 传递给：`mes-analyze-review-spec`（需求评审）
- 传递给：`mes-design-approach`（设计方案）

### 文件交接约定
本 Skill 生成独立的需求规格文档，后续 Skill 通过读取该文件获取完整的需求信息。
