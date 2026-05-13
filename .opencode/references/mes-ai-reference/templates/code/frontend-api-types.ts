/**
 * XXX类型定义
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */

export interface XxxDTO {
  /** 主键ID（更新时必填） */
  id?: number;
  /** 字段名 */
  columnName: string;
  /** 创建人 */
  createdBy?: string;
  /** 创建时间 */
  createdTime?: string;
}

export interface XxxVO {
  /** 主键ID */
  id: number;
  /** 字段名 */
  columnName: string;
  /** 创建时间 */
  createdTime: string;
}

export interface XxxQueryDTO {
  /** 字段名（模糊查询） */
  columnName?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页大小 */
  pageSize?: number;
}

export interface PageVO<T> {
  /** 数据列表 */
  list: T[];
  /** 总记录数 */
  total: number;
  /** 当前页码 */
  pageNum: number;
  /** 每页大小 */
  pageSize: number;
  /** 总页数 */
  pages: number;
}

export interface Result<T> {
  /** 响应码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
}
