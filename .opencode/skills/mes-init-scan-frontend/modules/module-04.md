# 执行步骤（2/2）

### Step 8: 统计代码规模
```
工具：Glob
路径：web/src/
模式：**/*.vue
目的：统计Vue组件数量

工具：Glob
路径：web/src/
模式：**/*.js
目的：统计JavaScript文件数量
```

**Step Gate B**：目录结构、路由、组件、API层或代码规模统计存在缺口 → 打回步骤3-8重做，不得汇总输出。

### Step 9: 汇总输出
```
工具：Write
路径：mes-ai-dev/knowledge/state/fragments/*.yaml / modules/* 目录的后续输入
```

**Step Gate C**：前端总览缺少技术栈、模块、公共组件、API模块或异常列表 → 打回步骤9重做，不得交付后续初始化步骤。
