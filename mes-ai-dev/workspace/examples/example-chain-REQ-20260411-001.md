# 完整示例链路：REQ-20260411-001 工单报工增加不良品分类统计

> 本文档演示一个需求从提交到交付的完整链路，展示每个阶段的产出文件和关键内容。
> 路径：`mes-ai-dev/workspace/examples/example-chain-REQ-20260411-001.md`

---

## 需求背景

生产报工时需要记录不良品数量，目前只有一个总数字段。业务要求增加按不良品分类（划伤、变形、尺寸超差、其他）统计不良品，以便后续质量分析。

---

## 阶段1：需求提交

**执行命令**：无（人工操作）
**产出文件**：`workspace/requirements/REQ-20260411-001/raw-requirement.md`

**关键内容摘要**：
```markdown
## 功能需求
在报工录入页面增加不良品分类录入区域，包含4个分类：划伤、变形、尺寸超差、其他。
每个分类可输入数量，总数自动汇总。
报工记录保存时，分类数据一并保存。

## 验收标准
1. 报工页面展示4个不良品分类输入框
2. 分类数量之和等于不良品总数（自动校验）
3. 报工详情页可查看分类数据
4. 历史报工数据的分类字段为空（向后兼容）
```

---

## 阶段2：需求分析

**执行命令**：`/mes-analyze-requirement`
**产出文件**：
- `workspace/requirements/REQ-20260411-001/spec.md` — 需求规格
- `workspace/requirements/REQ-20260411-001/impact-scope.md` — 影响范围

**影响范围关键内容**：
```markdown
## 后端服务影响
### 服务：mes-production
- WorkReportController — 修改报工录入接口参数
- WorkReportService — 修改报工逻辑，增加分类数据保存
- WorkReportMapper — 修改SQL映射
- WorkReport 实体 — 新增分类字段

### 服务：mes-quality（间接影响）
- 不良品分类数据可能被质量分析模块消费

## 前端模块影响
### 模块：production-management
- 报工录入页面 — 增加4个分类输入框
- 报工详情页面 — 展示分类数据

## 数据库影响
### Schema：mes_production
- 修改表：t_production_work_report — 新增4个字段（scratch_qty, deform_qty, dimension_qty, other_defect_qty）
```

**门禁检查**：✅ 验收标准已定义 → 人工确认通过

---

## 阶段3：详细设计

**执行命令**：`/mes-design-detail`
**产出文件**：`workspace/designs/REQ-20260411-001/design.md`

**API设计关键内容**：
```markdown
## 修改API：POST /mes-production/work-reports
### 请求体变更（新增字段）：
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| scratchQty | Integer | 否 | 划伤数量 |
| deformQty | Integer | 否 | 变形数量 |
| dimensionQty | Integer | 否 | 尺寸超差数量 |
| otherDefectQty | Integer | 否 | 其他不良数量 |

### 校验规则：
scratchQty + deformQty + dimensionQty + otherDefectQty <= defectQty
```

**数据库设计关键内容**：
```sql
ALTER TABLE t_production_work_report
  ADD COLUMN scratch_qty INT DEFAULT 0 COMMENT '划伤数量',
  ADD COLUMN deform_qty INT DEFAULT 0 COMMENT '变形数量',
  ADD COLUMN dimension_qty INT DEFAULT 0 COMMENT '尺寸超差数量',
  ADD COLUMN other_defect_qty INT DEFAULT 0 COMMENT '其他不良数量';
```

**门禁检查**：✅ API设计符合规范 → 人工确认通过

---

## 阶段4：代码开发

**执行命令**：`/mes-develop-code`
**产出文件**：
- `workspace/development/REQ-20260411-001/task-plan.md` — 任务计划
- 修改的代码文件列表：
  - `WorkReport.java` — 实体新增4个字段
  - `WorkReportCreateDTO.java` — DTO新增4个字段
  - `WorkReportVO.java` — VO新增4个字段
  - `WorkReportMapper.xml` — SQL新增4个字段映射
  - `WorkReportServiceImpl.java` — 增加分类数量校验逻辑
  - `WorkReportController.java` — 接口参数扩展
  - `db-migration.md` — DDL脚本
  - 前端报工页面 — 增加4个输入框组件
  - 前端报工详情 — 增加分类展示
- `workspace/development/REQ-20260411-001/self-review-report.md` — 自审报告

**自审报告关键内容**：
```markdown
## 审查结论：通过
- 代码规范：符合 coding-standards.md
- API规范：符合 api-conventions.md
- 编译状态：后端 mvn compile 通过，前端 npm run build 通过
- 发现问题：0 严重，1 一般（建议增加分类数量的正整数校验）
```

**门禁检查**：✅ 编译通过 + 自审无严重问题 → 人工确认通过

---

## 阶段5：测试验证

**执行命令**：`/mes-test-verify`
**产出文件**：
- `workspace/testing/REQ-20260411-001/test-cases.md` — 测试用例
- 单元测试代码：`WorkReportServiceTest.java`
- `workspace/testing/REQ-20260411-001/test-report.md` — 测试报告

**测试用例关键内容**：
```markdown
| 编号 | 用例 | 优先级 | 结果 |
|------|------|--------|------|
| TC-001 | 报工时输入4个分类数量，保存成功 | P1 | ✅ |
| TC-002 | 分类数量之和超过defectQty时，返回校验错误 | P1 | ✅ |
| TC-003 | 历史报工数据分类字段为空，不影响查询 | P1 | ✅ |
| TC-004 | 前端报工页面显示4个分类输入框 | P1 | ✅ |
| TC-005 | 前端自动汇总分类数量 | P2 | ✅ |
| TC-006 | 报工详情页展示分类数据 | P2 | ✅ |
```

**门禁检查**：✅ P1 4/4 通过，P2 2/2 通过 → 人工确认通过

---

## 阶段6：发布交付

**执行命令**：`/deliver`
**产出文件**：
- `workspace/delivery/REQ-20260411-001/deploy-plan.md`
- `workspace/delivery/REQ-20260411-001/acceptance-report.md`
- `workspace/delivery/REQ-20260411-001/deploy-log.md`
- `workspace/delivery/REQ-20260411-001/release-note.md`
- `workspace/delivery/REQ-20260411-001/handover-doc.md`

**验收报告关键内容**：
```markdown
## 验收结论：通过
- F-001 报工页面展示4个分类输入框 ✅
- F-002 分类数量之和等于不良品总数（自动校验）✅
- F-003 报工详情页可查看分类数据 ✅
- F-004 历史报工数据的分类字段为空（向后兼容）✅
```

**发布说明关键内容**：
```markdown
## 版本信息
版本号：1.3.0 | 发布日期：2026-04-15

## 功能变更
- MOD-001：报工录入增加不良品分类统计（4个分类）

## 数据库变更
- 修改表：t_production_work_report 新增4个字段

## 升级步骤
1. 执行DDL脚本添加4个字段（向下兼容，默认值0）
2. 部署后端服务
3. 部署前端页面
```

**门禁检查**：✅ 验收通过 → 部署确认 → 部署成功 → 交付完成

---

## 完整文件链路

```
workspace/status-tracker.md                              ← 需求状态总表
workspace/requirements/REQ-20260411-001/
├── raw-requirement.md                                   ← 阶段1产出
├── spec.md                                              ← 阶段2产出
└── impact-scope.md                                      ← 阶段2产出
workspace/designs/REQ-20260411-001/
└── design.md                                            ← 阶段3产出
workspace/development/REQ-20260411-001/
├── task-plan.md                                         ← 阶段4产出
├── db-migration.md                                      ← 阶段4产出
└── self-review-report.md                                ← 阶段4产出
workspace/testing/REQ-20260411-001/
├── test-cases.md                                        ← 阶段5产出
└── test-report.md                                       ← 阶段5产出
workspace/delivery/REQ-20260411-001/
├── deploy-plan.md                                       ← 阶段6产出
├── acceptance-report.md                                 ← 阶段6产出
├── deploy-log.md                                        ← 阶段6产出
├── release-note.md                                      ← 阶段6产出
└── handover-doc.md                                      ← 阶段6产出
```
