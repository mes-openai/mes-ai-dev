/*
模板名称：Service接口+实现类模板
适用场景：创建业务逻辑层接口和实现类
使用说明：
1. 先读取目标服务真实存在的 Service / Impl / DTO / VO / Mapper / 异常 / 分页 / 转换代码。
2. 所有包名、import、返回包装、分页对象、异常类、Converter、上下文工具类都必须替换为真实项目实现。
3. 禁止直接照搬模板中的示例名称；本文件只提供结构骨架，不提供可直接落库的默认实现。

----------- Service接口骨架 -----------

package <真实Service包路径>;

import <真实DTO导入>;
import <真实QueryDTO导入>;
import <真实VO导入>;
import <真实分页对象导入，如项目确实存在>;
import java.util.List;

public interface XxxService {
    Long create(XxxDTO dto);

    int batchCreate(List<XxxDTO> dtos);

    boolean update(XxxDTO dto);

    boolean delete(Long id);

    XxxVO getById(Long id);

    List<XxxVO> getList(XxxQueryDTO query);

    <真实分页返回类型> getPage(XxxQueryDTO query);

    boolean existsByColumnName(String columnValue);
}

----------- Service实现类骨架 -----------

package <真实ServiceImpl包路径>;

import <真实DTO导入>;
import <真实QueryDTO导入>;
import <真实Entity导入>;
import <真实Mapper导入>;
import <真实Service导入>;
import <真实VO导入>;
import <真实分页对象导入，如项目确实存在>;
import <真实Converter/Assembler导入，如项目确实存在>;
import <真实异常类导入，如项目确实存在>;
import <真实上下文工具导入，如项目确实存在>;

@Service
public class XxxServiceImpl implements XxxService {

    @Autowired
    private XxxMapper xxxMapper;

    // 如需跨服务调用，替换为项目真实 client / facade / gateway
    // @Autowired
    // private RealRemoteClient remoteClient;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long create(XxxDTO dto) {
        // 1. 参数校验：使用真实存在的校验方式，不得默认写 validateCreateParam
        // 2. 业务校验：校验依赖的方法、字段、异常类型都必须真实存在
        // 3. 数据转换：使用真实 Converter / Assembler / 手工映射代码
        // 4. 审计字段：仅当实体和上下文工具真实存在时才设置
        // 5. 持久化：Mapper 方法名、返回值必须与真实接口一致
    }

    @Override
    public boolean update(XxxDTO dto) {
        // 先核对 dto.getXxx / entity.getXxx / mapper.updateById 等方法都真实存在
    }

    @Override
    public XxxVO getById(Long id) {
        // 先核对 Mapper 返回类型和 Converter 输出类型一致
    }

    @Override
    public <真实分页返回类型> getPage(XxxQueryDTO query) {
        // 先核对分页对象、分页字段、Mapper 方法和返回值包装都真实存在
    }
}

----------- 强制校验清单 -----------

- import 对应类真实存在
- 包声明与目录路径一致
- 调用的方法真实存在于 DTO / VO / Entity / Mapper / 工具类 / 客户端中
- 返回值类型、泛型和包装层与真实定义一致
- 异常类、分页对象、响应对象来自项目真实公共能力，而不是模板默认值
*/
