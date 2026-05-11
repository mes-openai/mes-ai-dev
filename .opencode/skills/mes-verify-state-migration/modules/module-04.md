# 输入依赖

## 输入依赖

| 输入项 | 路径 | 说明 |
|--------|------|------|
| 统一状态源 | `mes-ai-dev/knowledge/state/state.yaml` | 唯一机器事实源 |
| 人工摘要 | `mes-ai-dev/knowledge/state/summary.md` | 人工阅读版摘要 |
| 渲染规范 | `mes-ai-dev/knowledge/rules/state-rendering-spec.md` | 字段映射与渲染顺序 |
| 兼容视图-baseline | `mes-ai-dev/knowledge/baseline.md` | 兼容摘要视图 |
| 兼容视图-coverage | `mes-ai-dev/knowledge/init-coverage.md` | 兼容清单视图 |
| 历史遗留-checkpoint | `mes-ai-dev/knowledge/.init-checkpoint.yaml` | 历史遗留进度文件，仅专项核查引用 |
| 历史遗留-sync | `mes-ai-dev/knowledge/.sync-record.json` | 历史遗留同步文件，仅专项核查引用 |
| 总规则 | `AGENTS.md` | 骨架总规则 |
| 迁移清单 | `mes-ai-dev/knowledge/state/migration-checklist.md` | 本次校验依据 |
| 命令文档 | `.opencode/commands/*.md` | 写入/读取协议检查范围 |
| Skill文档-核心入口 | `.opencode/skills/*/SKILL.md` | Skill 核心入口检查范围 |
| Skill文档-导航入口 | `.opencode/skills/*/INDEX.md` | Skill 导航与读取顺序检查范围 |
| Skill文档-模块正文 | `.opencode/skills/*/modules/*.md` | Skill 详细执行说明检查范围 |
