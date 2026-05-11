# 紧急修复流程

## 紧急修复流程

### 流程对比（正常 vs 紧急）

| 步骤 | 正常流程 | 紧急流程 |
|------|---------|---------|
| 需求分析 | /mes-analyze-requirement（完整） | 快速定位问题（最小分析） |
| 设计 | /mes-design-detail（完整） | 修复方案（仅修改范围） |
| 开发 | /mes-develop-code（完整） | 直接修改代码 |
| 测试 | /mes-test-verify（完整） | 冒烟测试 + 回归核心用例 |
| 交付 | /deliver（完整） | 快速部署 + 事后补文档 |

### 紧急修复步骤

#### 1. 问题登记

创建紧急修复记录：
- 路径：`workspace/emergency/EMG-YYYYMMDD-XXX/`
- 文件：`incident-report.md`

```markdown
# 紧急事件报告
