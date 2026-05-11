// 模板名称：VO类模板
// 适用场景：创建视图对象，用于API响应返回
// 使用说明：将 [xxx]、[Xxx]、[columnName]、[字段说明] 等占位符替换为实际值
// 参考来源：从 develop-backend-model Skill 提取

package com.jalor.[xxx].vo;

import java.io.Serializable;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * [XXX]视图对象
 *
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
@Data
public class [Xxx]VO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    private Long id;

    /**
     * [字段说明]
     */
    private String [columnName];

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createdTime;
}