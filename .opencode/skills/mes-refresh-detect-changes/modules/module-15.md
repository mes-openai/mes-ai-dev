# 输出示例

## 输出示例

```
mes-ai-dev/workspace/refresh/
└── change-list.md              # 变更文件清单
└── semantic-changes.md         # 语义变更检测结果

mes-ai-dev/knowledge/
└── state/
    ├── state.yaml              # 主写入：更新 sync 摘要字段
    └── state-detail/
        └── sync.yaml           # 双写兼容期：承接 sync 明细
└── .sync-record.json           # 兼容视图：从主文件摘要 + detail 明细联合渲染
```
