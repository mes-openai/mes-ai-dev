# 执行步骤（1/3）

## 执行步骤

### Step 1: 输出清理计划并交互确认

**重要：本 Skill 必须等待用户确认后才能执行清理操作。**

输出清理范围清单，等待用户确认：

```
本次清理计划：

清理范围：
  【知识库索引】
  - knowledge/code-map/ 目录（清空，保留目录结构）
  - knowledge/dependency-graph/ 目录（清空，保留目录结构）
  - knowledge/database-index/ 目录（清空，保留目录结构）
  
  【状态文件】
  - knowledge/state/state.yaml（重置为初始模板）
  - knowledge/state/state-detail/*.yaml（清空）
  - knowledge/state/fragments/ 目录（清空）
  - knowledge/.sync-record.json（删除）
  - knowledge/.init-checkpoint.yaml（删除）
  
  【阶段产物】
  - workspace/requirements/ 目录（清空）
  - workspace/designs/ 目录（清空）
  - workspace/development/ 目录（清空）
  - workspace/testing/ 目录（清空）
  - workspace/delivery/ 目录（清空）
  - workspace/emergency/ 目录（清空）
  
  【刷新记录】
  - workspace/refresh/ 目录（保留 skeleton-change-log.md 和 README.md）
  
  【保留文件】
  - workspace/examples/ 目录（保留）
  - workspace/status-tracker.md（重置为初始模板）
  - workspace/locks/ 目录（保留）
  - workspace/delivery/README.md（保留）
  
  【规则与模板】
  - knowledge/rules/ 目录（保留）
  - knowledge/reference/ 目录（保留）
  - templates/ 目录（保留）
  
预期产出：清理报告（workspace/refresh/skeleton-reset-report-<date>.md）
风险评估：清理操作不可逆，请确认后再执行

请确认是否执行清理？（输入 '确认' 或 '取消'）
```

**Step Gate A**：用户未确认 → 不执行任何清理操作，结束 Skill。

### Step 2: 执行知识库索引清理

按照以下顺序执行清理：

#### 2.1 清空 knowledge/code-map/

```bash
# 保留目录结构，清空文件
rm -rf knowledge/code-map/services/*
rm -rf knowledge/code-map/modules/*
rm -f knowledge/code-map/*.md
```

清理后验证：
```
- services/ 目录存在但为空
- modules/ 目录存在但为空
- 所有 .md 文件已删除
```

#### 2.2 清空 knowledge/dependency-graph/

```bash
rm -f knowledge/dependency-graph/*.md
```

#### 2.3 清空 knowledge/database-index/

```bash
rm -rf knowledge/database-index/*
```

**Step Gate B**：知识库索引清理不完整 → 打回步骤2重做，不得进入状态文件清理。
