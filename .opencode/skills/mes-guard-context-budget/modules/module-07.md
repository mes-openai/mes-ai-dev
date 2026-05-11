# 大仓模式判定逻辑（超大仓适配）

## 大仓模式判定逻辑（超大仓适配）

### 仓规模阈值与强制规则

**阈值定义与强制规则**：统一参考 `mes-ai-dev/knowledge/rules/repository-scale-rules.md`，该文件为单一权威来源。

本 Skill 在判定仓规模时优先读取 `mes-ai-dev/knowledge/state/state.yaml` 的 `initialization.repository_scale.scale_label`，兼容回退读取 `baseline.md`，并根据规则文件调整预算。

若当前阶段依赖全仓视角知识结果（如 `/mes-analyze-requirement` 需要直接消费 overview / hotspot 全局结论），应同时检查 `state.yaml.initialization.convergence.status`：
- `completed` 且 `accepted_as_global_baseline=true` → 可按全仓视角消费
- 其他状态 → 视为仅具备局部初始化结果，应提示用户可能需要先执行 `/mes-init-converge`

并根据规则文件调整预算：

| 仓规模标签 | 预算调整（本Skill执行） |
|-----------|---------|
| `small` | 默认预算 |
| `medium` | 默认预算 |
| `large` | detail上限降为2个，单服务预算降为6K token |
| `mega` | detail上限降为1个，单服务预算降为4K token，第0层改用summary |

### 判定执行流程

```
Step 1: 读取 `state/state.yaml` 获取仓规模标签；若缺失则回退读取 baseline.md
Step 1A: 若当前阶段依赖全仓视角结果，同时读取 `state.yaml.initialization.convergence`
Step 2: 读取 repository-scale-rules.md 获取对应强制规则
Step 3: 输出仓规模判定结果：
  ╔═══════════════════════════════════════╗
  ║ 📊 仓规模判定                          ║
  ╠═══════════════════════════════════════╣
  ║ 仓规模标签：[small/medium/large/mega]   ║
  ║ 收敛状态：[completed/failed/pending]     ║
  ║ 适用强制规则：见 repository-scale-rules ║
  ║ 预算调整：[本Skill调整内容]             ║
  ╚═══════════════════════════════════════╝
Step 4: 按仓规模标签对应的预算调整执行
Step 5: 在预算确认中体现仓规模影响
```

### 大仓/超大仓特殊阻断（基于规则文件）

| 阻断级别 | 阻断条件 | 阻断动作 |
|---------|---------|---------|
| 🔴 硬阻断3 | `mega`仓且未读取hot层 | 强制先读hot-services/hot-apis/hot-tables再执行（见规则LR-04/MR-03） |
| 🔴 硬阻断4 | `large`/`mega`仓且detail读取>上限 | 强制降级为summary模式，按批处理（见规则LR-06/MR-05） |
| 🟡 软阻断3 | `mega`仓单次涉及服务>3 | 提示拆分，建议按hot层优先级排序（见规则MR-07） |

### hot层优先读取规则（大仓/超大仓强制）

当仓规模标签为 `large` 或 `mega` 时，以下文件必须在读取第0层overview之前读取：

| 优先级 | 文件 | 用途 | 预估大小 |
|--------|------|------|---------|
| 1 | `knowledge/code-map/hot-services.md` | 高频服务排行，优先处理 | ~500 token |
| 2 | `knowledge/code-map/hot-apis.md` | 高频API排行，定位核心接口 | ~500 token |
| 3 | `knowledge/code-map/hot-tables.md` | 高频表排行，识别核心数据 | ~500 token |

读取hot层后，第0层overview可只读取摘要章节（跳过服务列表细节），节省上下文。
