# 全局阶段记忆库说明

## 一、定位

全局阶段记忆库用于沉淀跨需求、跨阶段、跨仓复用价值较高的阶段经验，包括坑点、模式与约束。

其职责不是替代具体 `REQ` 阶段目录下的局部记忆，而是将局部经验提炼为未来阶段默认消费的高价值输入。

## 二、与局部阶段记忆的区别

- 局部阶段记忆：保存在 `workspace/<phase>/REQ-.../` 下，保留完整上下文
- 全局阶段记忆：保存在 `knowledge/reference/stage-memory/` 下，保留可复用摘要、触发条件、规避动作和证据索引

## 三、内容类型

- `pitfalls.md`：高复用坑点与规避规则
- `patterns.md`：可复用成功模式
- `constraints.md`：稳定约束、禁止事项、必检项

建议目录结构如下：

```text
stage-memory/
  analyze/
    pitfalls.md
    patterns.md
    constraints.md
  design/
    pitfalls.md
    patterns.md
    constraints.md
  develop/
    pitfalls.md
    patterns.md
    constraints.md
  test/
    pitfalls.md
    patterns.md
    constraints.md
  deliver/
    pitfalls.md
    patterns.md
    constraints.md
  cross-stage/
    pitfalls.md
    patterns.md
    constraints.md
```

## 四、消费要求

每个阶段开始前，应按知识消费矩阵优先读取：

1. 对应阶段目录下的 `pitfalls.md`
2. 已建立的 `constraints.md`
3. 必要时读取 `patterns.md`
4. 若存在跨阶段风险，再读取 `cross-stage/` 目录内容

推荐默认消费顺序：

1. 上一阶段 OpenSpec 主交接文档（如 `spec.md`、`design.md`、`tasks.md`、`test-report.md`）
2. 当前阶段 `pitfalls.md`
3. 当前阶段 `constraints.md`
4. 当前阶段 `patterns.md`
5. `cross-stage/` 相关文件

## 五、证据要求

每条全局阶段记忆都必须能够回溯到：

- 来源需求
- 来源阶段
- 来源文件
- 证据路径

## 六、状态管理

全局记忆条目状态仅允许：

- `active`
- `watch`
- `superseded`
- `archived`
