# 目标仓结构对齐要求

## 目标仓结构对齐要求
不得仅依据 `web/[module]`、`jalor/[service]`、`dbscript/[schema]` 等默认示例路径判定受影响仓。

仓识别必须基于以下优先级：
1. 初始化探测形成的真实路径映射
2. 已有 code-map / dependency graph / database-index
3. 目标仓实际结构
4. 默认示例路径（仅在前述均缺失时作为临时参考）
