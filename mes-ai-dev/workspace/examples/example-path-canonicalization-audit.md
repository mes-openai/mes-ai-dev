# 路径 canonical 审计（示例）

> 示例文件，演示如何使用 `governance/path-canonicalization-audit-template.md` 对骨架路径、目录和文件名进行规范性审计。

## 一、审计目标与范围

| 字段 | 内容 |
|------|------|
| 审计范围 | 全仓骨架（初始化产物、状态片段、知识片段、索引示例） |
| 审计时间 | 2026-04-16T00:55:00+08:00 |
| 审计人 / Agent | Sisyphus |
| 适用规则 | `knowledge/rules/path-canonicalization-rules.md` |

## 二、检查总览

| 检查维度 | 结果 | 风险等级 | 说明 |
|----------|------|----------|------|
| 根目录拼写 | ✅ | 高 | 当前骨架主规则已统一使用 `mes-ai-dev/` |
| 服务目录前缀 | ✅ | 高 | 服务目录已统一为 `service-<service-name>` |
| 模块目录前缀 | ✅ | 中 | 模块目录已统一为 `module-<module-name>` |
| Schema 目录前缀 | ✅ | 高 | Schema 目录已统一为 `schema-<schema-name>` |
| 状态片段命名 | ✅ | 高 | 状态片段已统一为 `<scope-type>-<scope-name>.yaml` |
| 知识片段命名 | ✅ | 中 | `knowledge/fragments/` 下片段已采用 canonical 命名 |
| 索引/示例引用路径一致性 | ✅ | 中 | 术语/领域模型索引示例已回到 canonical 分片路径 |

## 三、详细检查项

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 不存在 `mes-aiai-dev/` 等错误根目录 | ✅ | 规则、示例、日志均未发现错误根目录 |
| 不存在缺 `service-` 前缀的服务目录 | ✅ | `service-mes-production` 等示例已与 canonical 规则一致 |
| 不存在缺 `module-` 前缀的模块目录 | ✅ | 当前骨架说明中未发现模块目录别名写法 |
| 不存在缺 `schema-` 前缀的 Schema 目录 | ✅ | `schema-mes_production`、`schema-mes_main` 等示例已统一 |
| 不存在 `mes-init-enrich-*.yaml` 之类命令名混入片段文件名 | ✅ | 主规则明确禁止且当前骨架示例已对齐 |
| 索引模板/示例引用的分片路径与实际 canonical 规则一致 | ✅ | 术语表与领域模型索引示例已回归 `knowledge/fragments/...` 路径 |

## 四、问题清单

| 编号 | 级别 | 问题类型 | 路径/文件 | 问题描述 | 整改建议 |
|------|------|----------|-----------|----------|----------|
| P-001 | 低 | 历史口径 | `workspace/refresh/*.md` 历史报告 | 旧报告可能引用历史路径口径 | 已补“历史口径说明”，后续保留统一标识 |

## 五、结论

- **审计结论**：✅通过
- **结论依据**：主规则、门禁、状态规范、示例文件与骨架日志已统一到 canonical 路径规则
- **是否需要阻断当前流程**：否

## 六、证据路径

| 编号 | 类型 | 路径/命令 | 说明 |
|------|------|-----------|------|
| E-01 | 规则 | `knowledge/rules/path-canonicalization-rules.md` | canonical 规则来源 |
| E-02 | 门禁 | `knowledge/reference/phase-gates/common.md` | must-pass 已引入路径规范要求 |
| E-03 | 示例 | `workspace/examples/example-terminology-glossary-index.md` | 索引示例已采用 canonical 分片路径 |
| E-04 | 日志 | `workspace/refresh/skeleton-change-log.md` | 相关治理修改留痕 |
