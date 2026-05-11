// 模板名称：Entity类模板
// 适用场景：创建JPA实体类，映射数据库表
// 使用说明：将 [xxx]、[Xxx]、[table_name]、[schema_name]、[column_name] 等占位符替换为实际值
// 参考来源：从 develop-backend-model Skill 提取

package com.jalor.[xxx].entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;
import lombok.Data;

/**
 * [XXX]实体类
 *
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
@Data
@Entity
@Table(name = "[table_name]", schema = "[schema_name]")
public class [Xxx]Entity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * [字段说明]
     */
    @Column(name = "[column_name]", length = 100, nullable = false)
    private String [columnName];

    /**
     * 创建人
     */
    @Column(name = "created_by", length = 50)
    private String createdBy;

    /**
     * 创建时间
     */
    @Column(name = "created_time")
    private Date createdTime;

    /**
     * 更新人
     */
    @Column(name = "updated_by", length = 50)
    private String updatedBy;

    /**
     * 更新时间
     */
    @Column(name = "updated_time")
    private Date updatedTime;
}