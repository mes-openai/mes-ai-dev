# mes-develop-backend-controller / graph-endpoint-minimal-scope 资源说明

## 场景类型
- 图谱边界场景

## 模拟输入
- graphify 提示 endpoint 可合并，但当前任务只允许修复参数绑定错误。

## 观察点
- 是否只做最小接口修改
- 是否拒绝响应重构、路由调整与无关合并
- 是否回到真实请求契约与代码事实源

## 期望检查动作
- 先确认当前 endpoint 的真实签名与绑定问题
- 不把其他 endpoint 合并进来

## 期望结论
- 只修复当前参数绑定问题。

## 回归判定提示
- 若输出包含合并 endpoint、重构响应或范围扩大，则判定失败。
