# 知识库结构说明

## 一、核心分层
- `mes-ai-dev/knowledge/code-map/`：代码地图与结构化索引
- `mes-ai-dev/knowledge/dependency-graph/`：服务、接口、数据库、前后端映射
- `mes-ai-dev/knowledge/database-index/`：Schema 级索引
- `mes-ai-dev/knowledge/state/`：统一状态源与状态片段
- `mes-ai-dev/knowledge/reference/`：业务语义、门禁、消费入口、手册
- `mes-ai-dev/knowledge/rules/`：硬性规则
- `mes-ai-dev/knowledge/fragments/`：待收口的局部知识片段

## 二、推荐先读的参考说明

对于“给人看的骨架说明”，建议优先阅读：

1. `mes-ai-dev/knowledge/reference/skeleton-maintainer-quick-reference.md`：一页式说明骨架维护时先看什么、先改什么、改完别漏什么。
1. `mes-ai-dev/knowledge/reference/skeleton-artifact-ownership-guide.md`：说明哪些内容通常由 AI 生成、哪些由人补充、哪些由人主导。
2. `mes-ai-dev/knowledge/reference/stage-artifact-guide.md`：说明各阶段产物、过程产物与最终产物的区别，以及人工阅读重点。
3. `mes-ai-dev/knowledge/reference/workspace-structure.md`：说明阶段目录、固定文件与人工阅读优先级。

## 三、消费顺序
优先遵循：overview → index → detail/file-summaries → 精准源码。

## 四、共享与局部边界
- 局部结果可并行生成
- 全局共享文件需由主控统一收口

## 五、Skill 结构说明
- `.opencode/skills/` 下的每个 Skill 都使用目录化结构，而不是单文件说明。
- 每个 Skill 根目录至少包含：`SKILL.md`、`INDEX.md`、`modules/`、`evals/`。
- `SKILL.md` 承载元数据与核心指令；`INDEX.md` 承载导航；`modules/` 承载详细执行说明；`evals/` 承载触发与能力评测样例。
- 默认读取顺序为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 或其他可选目录。
