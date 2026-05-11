/*
模板名称：Controller类模板
适用场景：创建REST控制器，定义API端点
使用说明：
1. 必须先读取目标服务现有 Controller，确认真实返回包装、异常处理、校验注解和 URL 风格。
2. 本模板只提供结构骨架，不提供可直接复制的 Result / notFound / BusinessException 默认写法。
3. 所有响应包装、异常类型、分页对象、路径前缀都必须替换为真实项目实现。

----------- Controller骨架 -----------

package <真实Controller包路径>;

import <真实DTO导入>;
import <真实QueryDTO导入>;
import <真实Service导入>;
import <真实VO导入>;
import <真实分页对象导入，如项目确实存在>;
import <真实响应包装导入>;
import <真实异常类导入，如项目确实存在>;

@RestController
@RequestMapping("<真实URL前缀>")
@Validated
public class XxxController {

    @Autowired
    private XxxService xxxService;

    @PostMapping
    public <真实响应类型<Long>> create(@RequestBody @Valid XxxDTO dto) {
        // 成功返回、业务异常返回、系统异常返回都必须沿用真实 Controller 风格
    }

    @PutMapping
    public <真实响应类型<Boolean>> update(@RequestBody @Valid XxxDTO dto) {
        // 不得直接照搬 Result.success / Result.fail
    }

    @GetMapping("/{id}")
    public <真实响应类型<XxxVO>> getById(@PathVariable @NotNull Long id) {
        // 若项目存在 notFound / empty / success 不同写法，必须以真实代码为准
    }

    @GetMapping("/page")
    public <真实响应类型<真实分页返回类型>> getPage(XxxQueryDTO query) {
        // 先核对 Service 返回值与响应包装是否一致
    }
}

----------- 强制校验清单 -----------

- 真实响应包装类已确认
- 真实异常类型已确认
- URL 前缀与现有 Controller 风格一致
- Service 方法名、参数、返回值已确认
- 不存在直接照搬模板默认 Result 写法的情况
*/
