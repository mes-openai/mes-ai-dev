// 模板名称：Mapper接口模板
// 适用场景：创建MyBatis Mapper接口，定义数据访问方法
// 使用说明：将 [xxx]、[Xxx]、[columnName] 等占位符替换为实际值
// 参考来源：从 develop-backend-dao Skill 提取

package com.jalor.[xxx].mapper;

import com.jalor.[xxx].entity.[Xxx]Entity;
import com.jalor.[xxx].dto.[Xxx]QueryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * [XXX]数据访问接口
 *
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
@Mapper
public interface [Xxx]Mapper {

    /**
     * 插入记录
     *
     * @param entity 实体对象
     * @return 影响行数
     */
    int insert([Xxx]Entity entity);

    /**
     * 批量插入记录
     *
     * @param entities 实体列表
     * @return 影响行数
     */
    int batchInsert(@Param("list") List<[Xxx]Entity> entities);

    /**
     * 根据主键更新记录
     *
     * @param entity 实体对象
     * @return 影响行数
     */
    int updateById([Xxx]Entity entity);

    /**
     * 根据主键删除记录
     *
     * @param id 主键ID
     * @return 影响行数
     */
    int deleteById(@Param("id") Long id);

    /**
     * 根据主键查询记录
     *
     * @param id 主键ID
     * @return 实体对象
     */
    [Xxx]Entity selectById(@Param("id") Long id);

    /**
     * 根据条件查询列表
     *
     * @param query 查询条件
     * @return 实体列表
     */
    List<[Xxx]Entity> selectList([Xxx]QueryDTO query);

    /**
     * 根据条件查询总数
     *
     * @param query 查询条件
     * @return 总数
     */
    int selectCount([Xxx]QueryDTO query);

    /**
     * 根据条件分页查询
     *
     * @param query 查询条件
     * @return 实体列表
     */
    List<[Xxx]Entity> selectPage([Xxx]QueryDTO query);
}