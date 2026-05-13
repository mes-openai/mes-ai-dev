---
name: mes-test-generate-unit
description: "Generate unit test code for Java classes. Trigger: unit test, JUnit, mock test, Java test"
---

# 单元测试生成

## 核心说明
- 本文件仅保留 Skill 元数据、适用边界与最小读取入口。
- 详细导航统一以下层 `INDEX.md` 为准；执行说明以下层 `modules/` 正文为准。
- `evals/` 属于 Skill 的正式组成部分，用于触发验证与能力回归。
- 生成单元测试时必须优先满足 Windows / Linux 路径兼容、路径断言规范化和临时目录可移植性要求。
- Java 单元测试默认技术栈为 JUnit 5 + Mockito + JDK8；若目标项目已有更严格约束，应先显式说明并按项目事实源执行。
- Mockito 生成必须避免 matcher 混用、参数 mismatch 和空指针式 stub 问题；必要时优先使用 `eq(...)`、`ArgumentCaptor` 或 `argThat(...)`。
- 每个被测 public 方法必须对应一个 `@Nested` 内部类；测试必须同时验证状态码/结果标识与核心业务数据，不得只验证状态码。
- GitNexus / graphify 可作为回归范围和证据关系的辅助导读，但不得替代真实测试执行、覆盖率结论或阶段门禁。

## 适用场景
- Generate unit test code for Java classes. Trigger: unit test, JUnit, mock test, Java test

## 读取约束
- 读取顺序固定为：`SKILL.md` → `INDEX.md` → 命中的 `modules/*.md` → 按需进入 `evals/` 与其他可选目录。
- 不得把 `SKILL.md` 当作完整正文；`INDEX.md` 才是详细导航入口。
- 重构后的模块内容保持原意，不得擅自扩义或缩义。
