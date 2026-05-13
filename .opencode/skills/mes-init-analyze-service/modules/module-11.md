# Model层

## Model层
- `com/xxx/entity/User.java` — 用户实体，对应t_user表
- `com/xxx/dto/UserDTO.java` — 用户数据传输对象
- `com/xxx/vo/UserVO.java` — 用户视图对象
```

### Step 7.5: 生成仓库画像
对每个服务生成仓库画像文档：
```
路径：mes-ai-dev/knowledge/code-map/services/service-<artifact-id>/repo-profile.md
模板参考：.opencode/references/mes-ai-reference/templates/repo-profile-template.md
```

**Step Gate B**：包结构、层级统计、配置/依赖分析或服务详情文档存在缺口 → 打回步骤3-7.5重做，不得交付下游初始化步骤。

**repo-profile.md 格式**（仓库画像，用于评估AI开发适配度）：
```markdown
# 仓库画像：<服务名称>
