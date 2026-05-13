// 模板名称：分页VO模板
// 适用场景：创建分页结果封装对象
// 使用说明：直接使用，无需替换占位符（通用模板）
// 参考来源：从 develop-backend-service Skill 提取

package com.jalor.[xxx].vo;

import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 分页结果VO
 *
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
@Data
public class PageVO<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 数据列表
     */
    private List<T> list;

    /**
     * 总记录数
     */
    private Integer total;

    /**
     * 当前页码
     */
    private Integer pageNum;

    /**
     * 每页大小
     */
    private Integer pageSize;

    /**
     * 总页数
     */
    private Integer pages;
}