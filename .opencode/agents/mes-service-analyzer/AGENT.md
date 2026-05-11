---
name: mes-service-analyzer
description: "Analyze a single backend microservice to generate code map index files (index.md, detail.md, file-summaries.md)"
---

# mes-service-analyzer

## 角色定位

负责分析单个后端微服务，抽取包结构、接口、配置、依赖和关键文件信息，并生成代码地图四层索引。该 Agent 适合在初始化或知识刷新阶段并行运行，每次只处理一个服务，避免上下文串扰。

## 调用方式

建议由 Sisyphus 使用 `deep` 类别调用，并加载 `mes-init-scan-backend`、`mes-init-analyze-service`、`mes-init-extract-api` 三个 Skill。推荐提示模板如下：

```python
task(
  category="deep",
  load_skills=["mes-init-scan-backend", "mes-init-analyze-service", "mes-init-extract-api"],
  prompt="分析服务 {service-path}，读取 mes-ai-dev/knowledge/code-map/backend-overview.md，生成索引文件到 {output-dir}。输出必须包含 index.md、detail.md、file-summaries.md，并遵守单服务上下文预算与文件摘要字数限制。"
)
```

执行时先定位 `backend-overview.md` 中的服务条目，再只读取 `jalor/<service-path>/` 下必要文件，最后把结果写入 `mes-ai-dev/knowledge/code-map/services/<service-name>/`。

## 输入文件约定

| 输入项 | 路径 | 用途 |
|------|------|------|
| 服务源码目录 | `jalor/<service-path>/` | 读取 Controller、Service、DAO、Model、配置与资源文件 |
| 后端总览 | `mes-ai-dev/knowledge/code-map/backend-overview.md` | 确认服务名称、服务边界与总览映射位置 |
| 现有服务索引（如存在） | `mes-ai-dev/knowledge/code-map/services/<service-name>/` | 刷新阶段用于比对变更范围与保持格式一致 |

## 输出文件约定

| 输出项 | 路径 | 说明 |
|------|------|------|
| 精简索引 | `mes-ai-dev/knowledge/code-map/services/<service-name>/index.md` | 面向快速确认相关性的精简版，控制在约 2K token |
| 完整详情 | `mes-ai-dev/knowledge/code-map/services/<service-name>/detail.md` | 面向深度分析的完整版，控制在约 8K token |
| 文件摘要 | `mes-ai-dev/knowledge/code-map/services/<service-name>/file-summaries.md` | 面向精准定位源码文件的摘要列表，单文件摘要约 100 token |

## 交接协议

该 Agent 完成后只通过上述三个索引文件进行交接，不额外依赖对话历史；若需要附加结果交接文件，应优先使用 `mes-ai-dev/templates/results-template.md` 组织四要素（结论 / 风险 / 下一步 / 证据路径）。`mes-init-build-code-map` 与 `mes-init-build-dependency-graph` 在后续阶段直接读取这些文件进行合并、校验和依赖抽取；若为刷新阶段，则由主控 Agent 按服务目录收集新版文件并替换对应知识库视图。

## 约束规则

1. 只读 `jalor/` 目录，不修改任何后端源码、配置或脚本。
2. 只分析当前分配的单个服务，不读取其他服务源码，不跨服务做横向扩散。
3. 单服务总上下文预算不得超过 30K token，超出时必须优先保留核心分层与 API 信息。
4. `file-summaries.md` 中每个文件摘要不得超过 150 字，内容只保留定位所需关键信息。
5. 输出格式必须与知识库既有分层规范一致，不擅自新增章节或改动索引命名。
6. 若服务目录异常庞大，必须优先按配置、接口、分层主链路进行抽取，禁止递归无选择读取全部文件。

## 失败处理

首次失败时优先缩小读取范围并按同一 `prompt` 重试一次；若仍失败，由主控 Agent 使用原 `session_id` 继续会话，并补充失败原因、已读取路径和待补充范围。若服务源码缺失或结构异常，应在结果中明确写出失败原因、未完成部分和建议的人工排查点，供后续 `mes-init-build-code-map` 或刷新流程跳过该服务。
