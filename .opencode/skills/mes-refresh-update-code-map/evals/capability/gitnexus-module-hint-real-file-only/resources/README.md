# gitnexus-module-hint-real-file-only 资源说明

## 场景目的

验证 code-map 刷新以真实文件变化为主，GitNexus 只用于提示候选模块或定位阅读入口。

## 输入证据

- `git diff`：仅一个服务层源码文件变化。
- `state.yaml`：仅需要局部刷新。
- `refresh-hints.md`：指向具体服务或层级。
- GitNexus：提示多个模块存在间接关系。

## 期望边界

- 只更新真实变更文件所属的 code-map 局部内容。
- 对图谱提示的其他模块仅记录候选复核。
- 不得把图谱推断关系写为确认模块职责、确认调用链或确认业务事实。
