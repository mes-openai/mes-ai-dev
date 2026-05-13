// 模板名称：DTO类模板
// 适用场景：创建数据传输对象，用于接收API请求参数
// 使用说明：将 [xxx]、[Xxx]、[columnName]、[字段说明] 等占位符替换为实际值
// 参考来源：从 develop-backend-model Skill 提取

package com.jalor.[xxx].dto;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;
import javax.validation.constraints.*;

/**
 * [XXX]数据传输对象
 *
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
@Data
public class [Xxx]DTO implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID（更新时必填）
     */
    private Long id;

    /**
     * [字段说明]
     */
    @NotBlank(message = "[字段名]不能为空")
    @Size(max = 100, message = "[字段名]长度不能超过100")
    private String [columnName];

    /**
     * 创建人
     */
    private String createdBy;

    /**
     * 创建时间
     */
    private Date createdTime;
}